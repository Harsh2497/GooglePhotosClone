import { Stack } from 'expo-router';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import { ScreenContent } from '~/components/ScreenContent';
import { useMedia } from '~/providers/MediaProvider';

export default function Home() {
  const { localAssets, loadLocalAssets, isLoading } = useMedia();
 
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
