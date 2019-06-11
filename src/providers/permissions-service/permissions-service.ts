import { Platform } from "ionic-angular";
import { DeviceInfoServiceProvider } from "./../deviceInfo-service/deviceInfo-service";
import { Injectable } from "@angular/core";
import { Diagnostic } from "@ionic-native/diagnostic";
import { AndroidPermissions } from "@ionic-native/android-permissions";

@Injectable()
export class PermissionsServiceProvider {
  constructor(
    private diagnostic: Diagnostic,
    private androidPermissions: AndroidPermissions,
    private deviceInfoService: DeviceInfoServiceProvider,
    private platform: Platform
  ) {}

  getPhoneStatePermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    return new Promise((resolve, reject) => {
        this.androidPermissions
          .checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
          .then(
            res => {
              console.log('this is checkpermission result', res);
              this.androidPermissions
                .requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
                .then(response => {
                  console.log('request permission result', response);
                  if (response.hasPermission) {
                    resolve();
                    console.log("device persfnajs");
                  } else {
                    reject();
                  }
                })
                .catch(error => {
                  // Request not accepted.
                  reject();
                });
            },
            err => {
              console.log("phone state err - ", err);
            }
          );

        // ios permission
        resolve();
    });
  }
}
