export class preauthenticationModel {
    challengeToken:string;
    authenticationCode:number;
    params: {
        pubKeyIndex: string,
        expiredAt: number,
        e2eeSid: string,
        serverRandom: string,
        expirySecs: number,
        pubKey: string
    }
}