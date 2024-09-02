import { Link, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { FlatList, Pressable } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import { useMedia } from '~/providers/MediaProvider';

export default function Home() {
  const { localAssets, loadLocalAssets, isLoading } = useMedia();

  const renderLocalItem = ({ item }: { item: MediaLibrary.Asset }) => {
    return (
      <Link href={`/asset?id=${item.id}`} asChild>
        <Pressable style={{ width: '25%' }}>
          <Image
            key={item.id}
            source={{ uri: item.uri }}
            style={{ width: '100%', aspectRatio: 1 }}
          />
        </Pressable>
      </Link>
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
