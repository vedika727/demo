import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { Crop } from '../../../../node_modules/@ionic-native/crop';
/**
 * @author - Sumit Lokhande and Manish Khedekar
 * @description - This Provider contains the methods related to Camera 
 */
@Injectable()
export class CameraServiceProvider {
  constructor(private camera: Camera, private crop: Crop) {
  }
  /**@description -This functions return image taken through camera */
  getPictureFromCamera() {
    return this.getImage(this.camera.PictureSourceType.CAMERA);
  }
  /**@description -This functions return image selected through gallary */
  getPictureFromPhotoLibrary() {
    return this.getImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
  }

  /**
   * @author Manish Khedekar
   */
  // This method takes optional parameters to make it more customizable
  getImage(pictureSourceType, quality = 50) {
    const options = {
      quality,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: pictureSourceType,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation:true
    };

    // If set to crop, restricts the image to a square of 600 by 600

    return this.camera.getPicture(options).then(
      (imagePath) => {
        return this.crop.crop(imagePath, { quality: 50 }).then(
          (sourcePath) => {

            console.log("This is shared path for cropped file",sourcePath);
            return sourcePath;
          },
          (err)=>{
            return err;
          });
      },
      (error) => {
        return JSON.stringify(error);
      });
    }
  }