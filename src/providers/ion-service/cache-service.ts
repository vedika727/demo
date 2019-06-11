import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SecureStorageProvider } from '../secure-storage/secure-storage';

/**
 * @author Sandesh Uttarwar
 * @description All the methods related to cache will be added here.
 */
@Injectable()
export class CacheServiceProvider {

  constructor(
    private secureStorage:SecureStorageProvider,
    //private secureStorage:Storage
  ) {

  }

  /**
   * @param key {string}
   * @description It will return the value stored in cache
   */
  getCache(key: string) {
    return new Promise((resolve, reject) => {
      let val = this.secureStorage.get(key);
      if (val != undefined) {
        resolve(JSON.parse(val));
      } else {
        reject({'msg':'value not found'});        }
      });
  }

  /**
   * @param key {string}
   * @param value {any}
   * @description This method will store the value in cache with the key name.
   */
  setCache(key: string, value: any) {
    this.secureStorage.set(key,JSON.stringify(value));
  }

  // /**
  //  * @param key {string}
  //  * @description This will remove the perticular record with key name
  //  */
  removeCache(key: string) {
    this.secureStorage.remove(key);
  }

  // /**
  //  * @description This will clear all the cache storage.
  //  */
  clearCache() {
    this.secureStorage.clear();
  }
}