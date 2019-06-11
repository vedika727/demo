import { FirebaseAnalyticsService } from './../../providers/firebase-service/firebase-analytics-service';
import { File } from '@ionic-native/file';
import { CameraServiceProvider } from './../../providers/ion-service/camera-service/camera-service';
import {IonicPage, NavController,  NavParams,  ActionSheetController} from 'ionic-angular';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { Component } from '@angular/core';
import { BaseApp } from '../../app/base';
import { Platform } from 'ionic-angular';

/**
 * @author Sumit Lokhande and Manish Khedekar
 * @description This file contains functions related to profile-image page
 */

@IonicPage()

@Component({
  selector: 'page-profile-image',
  templateUrl: 'profile-image.html',
})
export class ProfileImagePage extends BaseApp {
  /** Page Variables Declaration */
  public croppedFileName:string;
  public croppedDirectory:string;
  placeholder = "assets/imgs/avatar1.png";
  isPicChanged:boolean;
  chosenPicture: any = "assets/imgs/avatar1.png";
  headerInputs: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(private fba :FirebaseAnalyticsService,private platform:Platform,private file: File, public loginService: LoginServivceProvider, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, private cameraProvider: CameraServiceProvider) {
    super();
    this.isPicChanged = false;
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;
  }
  /** @description This function availability of profile image in service and cache  */
  ionViewDidLoad() {
    if (this.loginService.profilePic != "assets/imgs/avatar1.png") {
      this.chosenPicture = this.loginService.profilePic;
    }
  }
  /** @description This function provides actionsheet for user to choose upload method  */
  uploadProfilePicture() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'เพิ่มไฟล์ภาพ',
      buttons: [
        {
          text: 'ถ่ายรูป',
          role: 'Take photo',
          cssClass: 'text-bold',
          handler: () => {
            this.openCamera();
          }
        }, {
          text: 'อัปโหลด',
          role: 'Upload',
          cssClass: 'text-bold',
          handler: () => {
            this.openGallary();
          }
        }
      ]
    });
    actionSheet.present();
  }
  /** @description This function uploades  profile image through camera  */
  openCamera() {
    this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
        this.getFileData(picture);
      }
    }, error => {
      alert(error);
    });
  }
  /** @description This function uploades  profile image through gallary  */
  openGallary() {
    this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        console.log("cameraProvider.getPictureFromPhotoLibrary");
        this.getFileData(picture);
      }
    }, error => {
      alert(error);
    });
  }

  cropImage(){

  }

  rotateImage(){
    
  }
  /** @description This function saves profile image in service and cache */
  saveProfileImage() {
    this.loginService.profilePic = this.chosenPicture;
    let  fileName = "scb_profile.jpg";  

    if (this.platform.is("ios")){
      this.file.moveFile(this.croppedDirectory,this.croppedFileName,this.file.documentsDirectory, fileName).then(
        (res)=>{
          console.log("File moved",res);
    this.fba.logEvent("profile_update_image","Click save profile image");

          this.file.removeFile(this.croppedDirectory,this.croppedFileName);
          console.log("File Removed",res);
                },
        (err)=>{
          console.log("File saving error",err);
                });
    }
    if (this.platform.is("android")){
      this.file.moveFile(this.croppedDirectory,this.croppedFileName,this.file.dataDirectory, fileName).then(
        (res)=>{
          console.log("File moved",res);
          this.file.removeFile(this.croppedDirectory,this.croppedFileName);
          console.log("File Removed",res);
                },
        (err)=>{
          console.log("File saving error",err);
                });
    }             
    this.navCtrl.pop();
  }

  /** @author Manish Khedekar
   * @param DataURI of image
   * @description This function returns a blob by dataURI */
  getFileData(sourcePath:string){
    this.platform.ready().then(() => {
    if (this.platform.is("ios")) {
      this.croppedFileName = sourcePath.substring(sourcePath.lastIndexOf("/") + 1, sourcePath.length)
      this.croppedDirectory = sourcePath.substring(0, sourcePath.lastIndexOf("/") + 1);
    }
    else if (this.platform.is("android")) {
      this.croppedFileName = sourcePath.substring(sourcePath.lastIndexOf("/") + 1, sourcePath.lastIndexOf("?"))
      this.croppedDirectory = sourcePath.substring(0, sourcePath.lastIndexOf("/") + 1);
    }

    this.file.readAsDataURL(this.croppedDirectory, this.croppedFileName).then(
      (image) => {
        this.chosenPicture =  image;
        this.isPicChanged = true;
      },
      (err) => {
        return err;
      });
  });

}
}
