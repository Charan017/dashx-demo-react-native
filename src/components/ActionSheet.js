import React, {useEffect, useRef} from 'react';
import ActionSheet from 'react-native-actionsheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showToast} from '../utils/LocalStorage';
import {checkStorageReadPermission} from '../utils/PermissionUtils';
import {getRealPathFromURI} from 'react-native-get-real-path';

export const FilePickerActionSheet = ({
  onPickFile,
  setDisplayActionSheet,
  setShowActionSheet,
  mediaType,
}) => {
  const refActionSheet = useRef(null);
  const actions = [launchCamera, launchImageLibrary];

  useEffect(() => {
    // Start showing action sheet as soon as the ref is active
    if (refActionSheet.current) {
      refActionSheet.current.show();
    }
  }, [refActionSheet]);

  const onPressAction = async index => {
    if (mediaType === 'image') {
      try {
        if (await checkStorageReadPermission()) {
          const {
            assets: [imagePickerResponse],
          } = await actions[index]?.();
          onPickFile(imagePickerResponse);
        }
      } catch (error) {
        setShowActionSheet(false);

        setDisplayActionSheet(false);
        console.log('Upload error: ', error);
        showToast(`Upload asset error: ${JSON.stringify(error)}`);
      }
    } else {
      try {
        if (await checkStorageReadPermission()) {
          const {
            assets: [imagePickerResponse],
          } = await actions[index]?.({mediaType: 'video', includeBase64: true});
          if (imagePickerResponse.uri.startsWith('content://')) {
            // imagePickerResponse.uri1 = imagePickerResponse.uri;

            imagePickerResponse.uri = `file://${await getRealPathFromURI(
              imagePickerResponse.uri,
            )}`;
            // imagePickerResponse.uri = `file://${imagePickerResponse.fileName}`;
          }
          onPickFile(imagePickerResponse);
        }
      } catch (error) {
        setShowActionSheet(false);
        console.log('Upload error: ', error);
        showToast(`Upload asset error: ${JSON.stringify(error)}`);
      }
    }
  };

  return (
    <ActionSheet
      ref={refActionSheet}
      title={'Choose an option'}
      options={['Camera', 'Gallery', 'Cancel']}
      cancelButtonIndex={2}
      onPress={onPressAction}
    />
  );
};
