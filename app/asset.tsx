import { Stack, useLocalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { Text } from 'react-native';
import { useMedia } from '~/providers/MediaProvider';

export const AssetPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getAssetById } = useMedia();

  const asset = getAssetById(id);

  if (!asset) {
    return <Text>Asset Not found</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Photo',
          headerRight: () => <AntDesign name="cloudupload" size={24} color="black" />,
        }}
      />
      <Image
        source={{ uri: asset.uri }}
        style={{ width: '100%', height: '100%' }}
        contentFit="contain"
      />
    </>
  );
};

export default AssetPage;
