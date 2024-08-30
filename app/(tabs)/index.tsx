import { Stack } from 'expo-router';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const [localAssets, setLocalAssets] = useState<MediaLibrary.Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (permissionResponse?.status !== 'granted') {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (permissionResponse?.status === 'granted') {
      loadLocalAssets();
    }
  }, [permissionResponse]);

  const loadLocalAssets = async () => {
    if (isLoading || !hasNextPage) {
      return;
    }
    setIsLoading(true);
    const mediaAssets = await MediaLibrary.getAssetsAsync({ after: endCursor });
    setLocalAssets((existingItems) => [...existingItems, ...mediaAssets.assets]);
    setHasNextPage(mediaAssets.hasNextPage);
    setEndCursor(mediaAssets.endCursor);
    setIsLoading(false);
  };

  const renderLocalItem = ({ item }: { item: MediaLibrary.Asset }) => {
    return (
      <Image key={item.id} source={{ uri: item.uri }} style={{ width: '25%', aspectRatio: 1 }} />
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Photos' }} />
      <FlatList
        numColumns={4}
        data={localAssets}
        renderItem={renderLocalItem}
        columnWrapperClassName="gap-[2px]" // Nativewind Style of columnWrapperStyle
        contentContainerClassName="gap-[2px]" // Nativewind Style of contentContainerStyle
        onEndReached={loadLocalAssets}
        refreshing={isLoading}
        onEndReachedThreshold={1}
      />
    </>
  );
}
