import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';

export function usePhotoGallery(){
    const [blobUrl,setBlobUrl] = useState()
    try{
        const takePhoto = async () => {
            const cameraPhoto = await Camera.getPhoto({
                resultType:CameraResultType.Uri,
                source:CameraSource.Photos,
                quality:70,
            });
            setBlobUrl(cameraPhoto.webPath)
        }

    return{
        takePhoto,
        blobUrl
    }
}catch(e){
    console.log("fd")
}
}