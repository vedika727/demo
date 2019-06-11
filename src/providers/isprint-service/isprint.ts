import { Injectable } from '@angular/core';

let pk: string = '811472C4D5572C12840FE5FA19F31DF824608BC0B11B54205A711463439325A947352F5AF3AA6B9E2355E546EDFFEDC4D89BA9F41459ED6EECF9109AAB48F31DFFD014964F56C1A01803EA43D2C57FF5BD147F3545B79B09355766CC08D7F89423E4158E3CBC387C5977598D5D6FF19FEB65046DF9DF9794C6D7A7427F0BDF3D,010001';
let ra: string = '1234567890123456';
let encryptedString: string;
let cipherparams_nohash = '{\"hash\":false}';
let cipherparams_hash = '{\"hash\":true,\"hashAlgo\":\"SHA-1\"}';
let cipherparams_sym_hash = '{\"symmetric\":true,\"symmetricKeyLength\":128,\"symmetricAlgo\":\"AES\",\"hash\":true,\"hashAlgo\":\"SHA-256\"}';
declare var amdp;
declare var ame2eea;

@Injectable()
export class ISprintService {

    /**
     * @description  this method accepts plaintext(password) and returns encrypted string(password)
     * @param e2eesid -
     * @param pk - public key
     * @param sera  - random server
     * @param plaintText  - password
     * @param oaep_hash - hash Alg
     */
    encryptPassword(e2eesid: string, pk: string, sera: string, plaintText: string, oaep_hash: string) {
        //for iSprint encryption
        return new Promise((resolve, reject) => {
            if (e2eesid && pk && sera && plaintText && oaep_hash) {
                encryptedString = ame2eea.encryptPinForAM(e2eesid, pk, sera, plaintText, oaep_hash);
                resolve(encryptedString);
                //console.log(encryptedText);
            } else {
                reject("Error while encrypting")
            }
        });
    }

    /**
     * @description  this method accepts oldPlaintext(password),newPlaintext(password) and returns encrypted string(password)
     * @param e2eesid 
     * @param pk - public key
     * @param sera  -randreom
     * @param oldPlaintText 
     * @param newPlainText 
     * @param oaep_hash 
     */
    encryptChangePassword(e2eesid: string, pk: string, sera: string, oldPlaintText: string, newPlainText, oaep_hash: string) {
        //for iSprint encryption
        return new Promise((resolve, reject) => {
            if (e2eesid && pk && sera && oldPlaintText && newPlainText && oaep_hash) {
                encryptedString = ame2eea.encryptChangePinForAM(e2eesid, pk, sera, oldPlaintText, newPlainText, oaep_hash);
                resolve(encryptedString);
                //console.log(encryptedText);
            } else {
                reject("Error while encrypting")
            }
        });
    }

    /**
     * @description - this method accepts plain string and returns encrypted string
     * @param hashType - this params decide whether hashing should be used 1.
     * @param pk 
     * @param ra 
     * @param plaintText 
     */
    encryptData(hashType: number, pk: string, ra: string, plaintText: string) {
        return new Promise((resolve, reject) => {
            var hash: string;
            switch (hashType) {
                //with hash
                case 1:
                    hash = cipherparams_hash;
                    break;
                //with no hash    
                case 2:
                    hash = cipherparams_nohash;
                    break;
                //with sym and hash
                case 3:
                    hash = cipherparams_sym_hash;
                    break;
                default:
            }
            if (hash && pk && ra && plaintText) {
                encryptedString = amdp.encrypt(hash, pk, ra, plaintText);
                resolve(encryptedString);
                //console.log(encryptedText);
            } else {
                reject("Error while encrypting")
            }
        });
    }
}
