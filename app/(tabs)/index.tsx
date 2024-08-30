import { Stack } from 'expo-router';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const [localAssets, setLocalAssets] = useState<MediaLibrary.Asset[]>([]);
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
    const localAssets = await MediaLibrary.getAssetsAsync();
    setLocalAssets(localAssets.assets);
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
        // columnWrapperStyle={{ gap: 2 }} // React native style
        columnWrapperClassName="gap-[2px]" // Nativewind Style
        // contentContainerStyle={{ gap: 2 }} // React native style
        contentContainerClassName="gap-[2px]" // Nativewind Style
      />
    </>
  );
}
