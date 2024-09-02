import { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

type MediaContextType = {
  localAssets: MediaLibrary.Asset[];
  loadLocalAssets: () => void;
  isLoading: boolean;
};

const MediaContext = createContext<MediaContextType>({
  localAssets: [],
  loadLocalAssets: () => {},
  isLoading: false,
});

const MediaContextProvider = ({ children }: PropsWithChildren) => {
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

  return (
    <MediaContext.Provider value={{ localAssets, loadLocalAssets, isLoading }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;

export const useMedia = () => useContext(MediaContext);
