import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

/** 
 * @author Sandesh Uttarwar
 * @description This is to check whether device is connected to network or not
*/
@Injectable()
export class NetworkServiceProvider{

    constructor(private network: Network) {
        console.log('Hello LogServiceProvider Provider');
    }

    /** 
     * @description This will return true if network is created
    */
    checkNetwork(): boolean {
        console.log('network check called');

        if (this.network.type != 'none') {
            console.log('network true');
            return true;
        }
        console.log('network false');
        return false;
    }

    /** 
     * @description This method will return the strength of network
     * @returns {string}
    */
    getNetworkStrength(): string {
        return this.network.downlinkMax;
    } Î
}
