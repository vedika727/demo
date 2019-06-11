import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

/*
  Generated class for the SecureStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SecureStorageProvider {

  secret: string = '';
  localData: Object = {};
  storekey: string = "secretdata";

  constructor(
      private storage: NativeStorage
  ) { }

  initStorage(secret) {
      this.secret = secret;
     return this.storage.getItem(this.storekey)
                 .then(data => {
                      this.localData={};
                      if (data != null) {
                         this.localData = this.decrypt(data, this.secret);
                         return true
                     } else return false
                 });
 }

 encrypt(data, key) {
     return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
 }

 decrypt(data, key) {
     let bytes = CryptoJS.AES.decrypt(data, key);
     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 }

 setOnly(key, data) {
     this.localData[key] = this.encrypt(data ? data : '', this.secret);
     return Promise.resolve(true);
 }

 get(key) {
    return this.decrypt(this.localData[key], this.secret)
 }

 changeSecret(newsecret) {
     this.secret = newsecret;
     return this.storage.setItem(this.storekey,this.encrypt(this.localData ? this.localData : '', this.secret));
 }

 set(key, data) {
     this.setOnly(key, data);
     return this.storage.setItem(this.storekey,this.encrypt(this.localData ? this.localData : '', this.secret));
 }

 remove(key:any){
     if (this.localData.hasOwnProperty(key)){
         delete this.localData[key]; 
         this.storage.setItem(this.storekey,
         this.encrypt(this.localData ? this.localData : '', this.secret));
         return Promise.resolve(this.localData[key]);
     }else{
         return Promise.resolve(null);
     }
 }

  clear()
  {
      this.storage.clear();
  }
}
