//******************************************************************
// AM data protection js
// depends on am crypto js
// By i-Sprint
// Updated on 20160120
//******************************************************************

// ******************************************************************
// Functions used for AccessMatrix end-to-end encryption for data protection
// ******************************************************************

// Encrypt data
// amdp.encrypt(cipherParams, publicKey, randomNumber, plaintext, e2eeSesToken)
//   - cipherParams is JSON-format cipher parameters (must match server-side data protection module configuration):
//     -- hash (default: false)
//        Whether to add hash of the plaintext before the encryption
//     -- hashAlgo (default: SHA-256)
//        Hash algorithm used
//     -- symmetric (default: false)
//        Whether to generate a symmetric key and encrypt the plaintext with symmetric key. The symmetric key will then be encrypted using RSA algorithm
//     -- symmetricAlgo (default: AES)
//        Symmetric encryption algorithm
//     -- symmetricKeyLength (default: 128)
//        Symmetric key length
//   - publicKey is public key "<modulus>,<exponent>"
//   - randomNumber is server random
//   - plaintext is the data to be protected
//   - e2eeSesToken is AM5-managed E2EEDP sessionToken (optional, normally not required)
//******************************************************************
// AM crypto js
// By i-Sprint
// Updated on 20141030
//******************************************************************

//******************************************************************
// RSA, BigInteger, and RNG
//******************************************************************
/* 
 * Copyright (c) 2003-2005  Tom Wu
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 */
 
//******************************************************************
// AES
//******************************************************************
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES implementation in JavaScript (c) Chris Veness 2005-2011                                   */
/*   - http://www.movable-type.co.uk/scripts/aes.html                                             */
/*   - License under Creative Commons 3.0 (CC By 3.0) http://creativecommons.org/licenses/by/3.0/ */
/*   - see http://csrc.nist.gov/publications/PubsFIPS.html#197                                    */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

//******************************************************************
// SHA and HMAC
//******************************************************************
/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as defined in FIPS
 * PUB 180-2 as well as the corresponding HMAC implementation as defined in
 * FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2012
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnson
 */

//******************************************************************
// Base64 encoder
//******************************************************************
// The code is part of Closure Library API
// http://stackoverflow.com/questions/15149997/read-and-base64-encode-a-binary-file
// http://docs.closure-library.googlecode.com/git/closure_goog_crypt_base64.js.html

// Copyright 2007 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var amdp={};
amdp.encrypt=function(_1,_2,_3,_4,_5){
var _6={};
if(typeof _1=="string"){
try{
_6=JSON.parse(_1);
}
catch(err){
amdp.log(err);
throw err;
}
}
if(typeof _6.hash=="undefined"){
_6.hash=false;
}
if(typeof _6.hashAlgo=="undefined"||_6.hashAlgo.length==0){
_6.hashAlgo="SHA-256";
}
if(typeof _6.symmetric=="undefined"){
_6.symmetric=false;
}
if(typeof _6.symmetricAlgo=="undefined"||_6.symmetricAlgo.length==0){
_6.symmetricAlgo="AES";
}
if(typeof _6.symmetricKeyLength=="undefined"||_6.symmetricKeyLength==0){
_6.symmetricKeyLength=128;
}
amdp.log(_6.hash);
amdp.log(_6.hashAlgo);
amdp.log(_6.symmetric);
amdp.log(_6.symmetricAlgo);
amdp.log(_6.symmetricKeyLength);
if(_6.hash&&_6.symmetric&&_6.symmetricAlgo=="AES"){
return amdp._encrypt_aes_sha(_6,_2,_3,_4,_5);
}
var _7=_2.split(",",2);
var _8=amUtil.str2bin(_4);
var _9=[];
if(_6.hash){
_9=amHash.sha256(_8);
amdp.log("hash="+amUtil.hexEncode(_9));
_8=_8.concat(_9);
}
var _a=amUtil.hexDecode(_3);
_8=_8.concat(_a);
var _b;
try{
_b=amRsa.oaep.encryptAndGenLabel(_7[0],_7[1],_8,"SHA-1");
amdp.log("rsaCipherText="+_b);
}
catch(err){
amdp.log("Exception when encrypting using RSA-OAEP, msg="+err);
throw err;
}
var _c=_b;
if(_5!==undefined&&_5!==null&&_5.length>0){
_c=_5+","+_c;
}
return _c;
};
amdp._encrypt_aes_sha=function(_d,_e,_f,_10,_11){
var _12=_e.split(",",2);
var _13=amUtil.str2bin(_10);
var _14=amUtil.hexDecode(_f);
amdp.log("modulus="+_12[0]);
amdp.log("modulusLength(bits)="+(_12[0].length*8/2));
amdp.log("exponent="+_12[1]);
amdp.log("rn="+_f);
var _15=new Array(_d.symmetricKeyLength/8);
var rnd=new amUtil.SecureRandom();
rnd.nextBytes(_15);
var iv=new Array(16);
rnd=new amUtil.SecureRandom();
rnd.nextBytes(iv);
var _16;
var _17;
try{
_16=amAes.CbcPkcs7.encrypt(_13,_15,iv);
_17=amUtil.hexEncode(_16);
amdp.log("symCipherText="+_17);
}
catch(err){
amdp.log("Exception when encrypting using AES, msg="+err);
throw err;
}
var _18=iv.concat(_16);
var _19;
try{
_19=amHash.sha256(_18);
var _1a=amUtil.hexEncode(_19);
amdp.log("hash="+_1a);
}
catch(err){
amdp.log("Exception when generating hash, msg="+err);
throw err;
}
var _1b=_15;
_1b=_1b.concat(_19);
_1b=_1b.concat(_14);
_1b=_1b.concat(iv);
var _1c;
try{
_1c=amRsa.oaep.encryptAndGenLabel(_12[0],_12[1],_1b,"SHA-1");
amdp.log("rsaCipherText="+_1c);
var _1d=_1c.split(":",2);
var _1e=_1d[0];
_1c=_1d[1];
}
catch(err){
amdp.log("Exception when encrypting using RSA-OAEP, msg="+err);
throw err;
}
var _1f="02";
_1f=_1f.concat(amUtil.hexEncode(amUtil.int2bin(_1e.length/2,1)));
_1f=_1f.concat(_1e);
_1f=_1f.concat(amUtil.hexEncode(amUtil.int2bin(_1c.length/2,2)));
_1f=_1f.concat(_1c);
_1f=_1f.concat(_17);
if(_11!==undefined&&_11!==null&&_11.length>0){
_1f=_11+","+_1f;
}
return _1f;
};
amdp.multivalues=new Array();
amdp.addValue=function(_20){
amdp.multivalues[amdp.multivalues.length]=_20;
};
amdp.clearMultiValues=function(_21){
amdp.multivalues.splice(amdp.multivalues.length);
amdp.multivalues=new Array();
};
amdp.encryptMultiValues=function(_22,_23,_24){
var _25=JSON.stringify(amdp.multivalues);
return amdp.encrypt(_22,_23,_24,_25);
};
amdp.log=function(log){
try{
document.testform.debug.value=document.testform.debug.value+log+"\n";
}
catch(err){
}
};
var amHash={};
amHash.encodeSHA1=function(_26){
return amHash.sha1(_26);
};
amHash.sha1=function(_27){
return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_27),"HEX").getHash("SHA-1","HEX"));
};
amHash.sha224=function(_28){
return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_28),"HEX").getHash("SHA-224","HEX"));
};
amHash.sha256=function(_29){
return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_29),"HEX").getHash("SHA-256","HEX"));
};
amHash.sha384=function(_2a){
return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_2a),"HEX").getHash("SHA-384","HEX"));
};
amHash.sha512=function(_2b){
return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_2b),"HEX").getHash("SHA-512","HEX"));
};
var amRsa={};
amRsa.RSAKey=function(){
this.n=null;
this.e=0;
this.d=null;
this.p=null;
this.q=null;
this.dmp1=null;
this.dmq1=null;
this.coeff=null;
};
amRsa.RSASetPublic=function(N,E){
if(N!=null&&E!=null&&N.length>0&&E.length>0){
this.n=amUtil.parseBigInt(N,16);
this.e=parseInt(E,16);
}else{
throw "Invalid RSA public key";
}
};
amRsa.RSADoPublic=function(x){
var y=x.modPowInt(this.e,this.n);
return y;
};
amRsa.RSAEncrypt=function(m){
if(m==null){
return null;
}
var c=this.doPublic(m);
if(c==null){
return null;
}
var h=c.toString(16);
if((h.length&1)==0){
return h;
}else{
return "0"+h;
}
};
amRsa.RSAKey.prototype.doPublic=amRsa.RSADoPublic;
amRsa.RSAKey.prototype.setPublic=amRsa.RSASetPublic;
amRsa.RSAKey.prototype.encrypt=amRsa.RSAEncrypt;
amRsa.oaepEncode=function(_2c,_2d,_2e,_2f){
var _30;
var _31;
if(_2f=="SHA-1"){
_30=20;
_31=amHash.sha1;
}else{
if(_2f=="SHA-224"){
_30=28;
_31=amHash.sha224;
}else{
if(_2f=="SHA-256"){
_30=32;
_31=amHash.sha256;
}else{
if(_2f=="SHA-384"){
_30=48;
_31=amHash.sha384;
}else{
if(_2f=="SHA-512"){
_30=64;
_31=amHash.sha512;
}else{
throw "OAEP: HASH algorithm is not recognized, hashAlgo="+_2f;
}
}
}
}
}
var _32=_2e.length;
if(_32>(_2c-(2*_30)-2)){
throw "The message to be encrypted is too long";
}
var _33=[];
var _34=_2c-_32-(2*_30)-2;
for(var i=0;i<_34;i++){
_33[i]=0;
}
var _35=_31(_2d);
var _36=[];
_36=_36.concat(_35,_33,1,_2e);
var _37=amUtil.generateRandom(_30);
var _38=amRsa._MGF1(_37,_2c-_30-1,_2f);
var _39=amUtil.xor(_36,_38);
var _3a=amRsa._MGF1(_39,_30,_2f);
var _3b=amUtil.xor(_37,_3a);
var _3c=[0].concat(_3b,_39);
return _3c;
};
amRsa._MGF1=function(Z,l,_3d){
var cnt=[];
var _3e=[];
var _3f=[];
var _40=0;
var _41;
if(_3d=="SHA-1"){
_41=amHash.sha1;
}else{
if(_3d=="SHA-224"){
_41=amHash.sha224;
}else{
if(_3d=="SHA-256"){
_41=amHash.sha256;
}else{
if(_3d=="SHA-384"){
_41=amHash.sha384;
}else{
if(_3d=="SHA-512"){
_41=amHash.sha512;
}else{
throw "MGF: HASH algorithm is not recognized, hashAlgo="+_3d;
}
}
}
}
}
for(var i=0;_40<l;i++){
cnt[0]=((i>>24)&255);
cnt[1]=((i>>16)&255);
cnt[2]=((i>>8))&255;
cnt[3]=(i&255);
var _42=Z.concat(cnt);
_3f=_41(_42);
for(var j=0;j<_3f.length&&_40<l;j++,_40++){
_3e[_40]=_3f[j];
}
}
return _3e;
};
amRsa.oaep={};
amRsa.oaep.encryptAndGenLabel=function(_43,_44,_45,_46){
var _47=16;
var _48=new Array(_47);
var rnd=new amUtil.SecureRandom();
rnd.nextBytes(_48);
sLabel=amUtil.hexEncode(_48);
sLabel=amUtil.zeroPad(sLabel,_47*2);
var _49=amRsa.oaep.encrypt(_43,_44,_48,_45,_46);
return sLabel+":"+_49;
};
amRsa.oaep.encrypt=function(_4a,_4b,_4c,_4d,_4e){
var _4f=new amRsa.RSAKey();
_4f.setPublic(_4a,_4b);
var _50=amRsa.oaepEncode(_4a.length/2,_4c,_4d,_4e);
var _51=_4f.encrypt(new BigInteger(_50));
_51=amUtil.zeroPad(_51,_4a.length);
return _51.toUpperCase();
};
amRsa.pkcs1={};
amRsa.pkcs1.encrypt=function(_52,_53,_54){
var _55=new amRsa.RSAKey();
_55.setPublic(_52,_53);
var _56=amRsa.pkcs1pad2(_54,_52.length/2);
var _57=_55.encrypt(new BigInteger(_56));
_57=amUtil.zeroPad(_57,_52.length);
return _57.toUpperCase();
};
amRsa.pkcs1pad2=function(_58,_59){
if(_59<_58.length+11){
throw "Message too long for RSA";
}
var _5a=new Array(2);
_5a[0]=0&255;
_5a[1]=2&255;
var _5b=_59-_58.length-2;
var _5c=new Array(_5b);
var rng=new amUtil.SecureRandom();
var x=new Array();
for(var i=0;i<_5b-1;i++){
x[0]=0;
while(x[0]==0){
rng.nextBytes(x);
}
_5c[i]=x[0];
}
_5c[_5b-1]=0&255;
_5a=_5a.concat(_5c,_58);
return _5a;
};
var amAes={};
amAes.cipher=function(_5d,w){
var Nb=4;
var Nr=w.length/Nb-1;
var _5e=[[],[],[],[]];
for(var i=0;i<4*Nb;i++){
_5e[i%4][Math.floor(i/4)]=_5d[i];
}
_5e=amAes.addRoundKey(_5e,w,0,Nb);
for(var _5f=1;_5f<Nr;_5f++){
_5e=amAes.subBytes(_5e,Nb);
_5e=amAes.shiftRows(_5e,Nb);
_5e=amAes.mixColumns(_5e,Nb);
_5e=amAes.addRoundKey(_5e,w,_5f,Nb);
}
_5e=amAes.subBytes(_5e,Nb);
_5e=amAes.shiftRows(_5e,Nb);
_5e=amAes.addRoundKey(_5e,w,Nr,Nb);
var _60=new Array(4*Nb);
for(var i=0;i<4*Nb;i++){
_60[i]=_5e[i%4][Math.floor(i/4)];
}
return _60;
};
amAes.keyExpansion=function(key){
var Nb=4;
var Nk=key.length/4;
var Nr=Nk+6;
var w=new Array(Nb*(Nr+1));
var _61=new Array(4);
for(var i=0;i<Nk;i++){
var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];
w[i]=r;
}
for(var i=Nk;i<(Nb*(Nr+1));i++){
w[i]=new Array(4);
for(var t=0;t<4;t++){
_61[t]=w[i-1][t];
}
if(i%Nk==0){
_61=amAes.subWord(amAes.rotWord(_61));
for(var t=0;t<4;t++){
_61[t]^=amAes.rCon[i/Nk][t];
}
}else{
if(Nk>6&&i%Nk==4){
_61=amAes.subWord(_61);
}
}
for(var t=0;t<4;t++){
w[i][t]=w[i-Nk][t]^_61[t];
}
}
return w;
};
amAes.subBytes=function(s,Nb){
for(var r=0;r<4;r++){
for(var c=0;c<Nb;c++){
s[r][c]=amAes.sBox[s[r][c]];
}
}
return s;
};
amAes.shiftRows=function(s,Nb){
var t=new Array(4);
for(var r=1;r<4;r++){
for(var c=0;c<4;c++){
t[c]=s[r][(c+r)%Nb];
}
for(var c=0;c<4;c++){
s[r][c]=t[c];
}
}
return s;
};
amAes.mixColumns=function(s,Nb){
for(var c=0;c<4;c++){
var a=new Array(4);
var b=new Array(4);
for(var i=0;i<4;i++){
a[i]=s[i][c];
b[i]=s[i][c]&128?s[i][c]<<1^283:s[i][c]<<1;
}
s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];
s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];
s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];
s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3];
}
return s;
};
amAes.addRoundKey=function(_62,w,rnd,Nb){
for(var r=0;r<4;r++){
for(var c=0;c<Nb;c++){
_62[r][c]^=w[rnd*4+c][r];
}
}
return _62;
};
amAes.subWord=function(w){
for(var i=0;i<4;i++){
w[i]=amAes.sBox[w[i]];
}
return w;
};
amAes.rotWord=function(w){
var tmp=w[0];
for(var i=0;i<3;i++){
w[i]=w[i+1];
}
w[3]=tmp;
return w;
};
amAes.sBox=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
amAes.rCon=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];
amAes.CbcPkcs7={};
amAes.CbcPkcs7.encrypt=function(_63,key,iv){
var _64=16;
var _65=key.length;
var _66=key.length*8;
if(!(_66==128||_66==192||_66==256)){
return "";
}
var _67=amAes.keyExpansion(key);
var _68=amUtil.pkcs7Type1(_63,_64);
var _69=Math.ceil(_68.length/_64);
var _6a=new Array(_69*_64);
var _6b=iv.slice(0);
for(var b=0;b<_69;b++){
var _6c=new Array(_64);
for(var i=0;i<_64;i++){
_6c[i]=_6b[i]^_68[b*16+i];
}
var _6d=amAes.cipher(_6c,_67);
_6b=_6d;
for(var i=0;i<_64;i++){
_6a[b*16+i]=_6d[i];
}
}
return _6a;
};
var amUtf8={};
amUtf8.encode=function(_6e){
var _6f=_6e.replace(/[\u0080-\u07ff]/g,function(c){
var cc=c.charCodeAt(0);
return String.fromCharCode(192|cc>>6,128|cc&63);
});
_6f=_6f.replace(/[\u0800-\uffff]/g,function(c){
var cc=c.charCodeAt(0);
return String.fromCharCode(224|cc>>12,128|cc>>6&63,128|cc&63);
});
return _6f;
};
amUtf8.decode=function(_70){
var _71=_70.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c){
var cc=((c.charCodeAt(0)&15)<<12)|((c.charCodeAt(1)&63)<<6)|(c.charCodeAt(2)&63);
return String.fromCharCode(cc);
});
_71=_71.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){
var cc=(c.charCodeAt(0)&31)<<6|c.charCodeAt(1)&63;
return String.fromCharCode(cc);
});
return _71;
};
var dbits;
var canary=244837814094590;
var j_lm=((canary&16777215)==15715070);
function BigInteger(a,b,c){
if(a!=null){
if("number"==typeof a){
this.fromNumber(a,b,c);
}else{
if(b==null&&"string"!=typeof a){
this.fromString(a,256);
}else{
this.fromString(a,b);
}
}
}
};
function nbi(){
return new BigInteger(null);
};
function am1(i,x,w,j,c,n){
while(--n>=0){
var v=x*this[i++]+w[j]+c;
c=Math.floor(v/67108864);
w[j++]=v&67108863;
}
return c;
};
function am2(i,x,w,j,c,n){
var xl=x&32767,xh=x>>15;
while(--n>=0){
var l=this[i]&32767;
var h=this[i++]>>15;
var m=xh*l+h*xl;
l=xl*l+((m&32767)<<15)+w[j]+(c&1073741823);
c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);
w[j++]=l&1073741823;
}
return c;
};
function am3(i,x,w,j,c,n){
var xl=x&16383,xh=x>>14;
while(--n>=0){
var l=this[i]&16383;
var h=this[i++]>>14;
var m=xh*l+h*xl;
l=xl*l+((m&16383)<<14)+w[j]+c;
c=(l>>28)+(m>>14)+xh*h;
w[j++]=l&268435455;
}
return c;
};
if(j_lm&&(navigator.appName=="Microsoft Internet Explorer")){
BigInteger.prototype.am=am2;
dbits=30;
}else{
if(j_lm&&(navigator.appName!="Netscape")){
BigInteger.prototype.am=am1;
dbits=26;
}else{
BigInteger.prototype.am=am3;
dbits=28;
}
}
BigInteger.prototype.DB=dbits;
BigInteger.prototype.DM=((1<<dbits)-1);
BigInteger.prototype.DV=(1<<dbits);
var BI_FP=52;
BigInteger.prototype.FV=Math.pow(2,BI_FP);
BigInteger.prototype.F1=BI_FP-dbits;
BigInteger.prototype.F2=2*dbits-BI_FP;
var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC=new Array();
var rr,vv;
rr="0".charCodeAt(0);
for(vv=0;vv<=9;++vv){
BI_RC[rr++]=vv;
}
rr="a".charCodeAt(0);
for(vv=10;vv<36;++vv){
BI_RC[rr++]=vv;
}
rr="A".charCodeAt(0);
for(vv=10;vv<36;++vv){
BI_RC[rr++]=vv;
}
function int2char(n){
return BI_RM.charAt(n);
};
function intAt(s,i){
var c=BI_RC[s.charCodeAt(i)];
return (c==null)?-1:c;
};
function bnpCopyTo(r){
for(var i=this.t-1;i>=0;--i){
r[i]=this[i];
}
r.t=this.t;
r.s=this.s;
};
function bnpFromInt(x){
this.t=1;
this.s=(x<0)?-1:0;
if(x>0){
this[0]=x;
}else{
if(x<-1){
this[0]=x+DV;
}else{
this.t=0;
}
}
};
function nbv(i){
var r=nbi();
r.fromInt(i);
return r;
};
function bnpFromString(s,b){
var k;
if(b==16){
k=4;
}else{
if(b==8){
k=3;
}else{
if(b==256){
k=8;
}else{
if(b==2){
k=1;
}else{
if(b==32){
k=5;
}else{
if(b==4){
k=2;
}else{
this.fromRadix(s,b);
return;
}
}
}
}
}
}
this.t=0;
this.s=0;
var i=s.length,mi=false,sh=0;
while(--i>=0){
var x=(k==8)?s[i]&255:intAt(s,i);
if(x<0){
if(s.charAt(i)=="-"){
mi=true;
}
continue;
}
mi=false;
if(sh==0){
this[this.t++]=x;
}else{
if(sh+k>this.DB){
this[this.t-1]|=(x&((1<<(this.DB-sh))-1))<<sh;
this[this.t++]=(x>>(this.DB-sh));
}else{
this[this.t-1]|=x<<sh;
}
}
sh+=k;
if(sh>=this.DB){
sh-=this.DB;
}
}
if(k==8&&(s[0]&128)!=0){
this.s=-1;
if(sh>0){
this[this.t-1]|=((1<<(this.DB-sh))-1)<<sh;
}
}
this.clamp();
if(mi){
BigInteger.ZERO.subTo(this,this);
}
};
function bnpClamp(){
var c=this.s&this.DM;
while(this.t>0&&this[this.t-1]==c){
--this.t;
}
};
function bnToString(b){
if(this.s<0){
return "-"+this.negate().toString(b);
}
var k;
if(b==16){
k=4;
}else{
if(b==8){
k=3;
}else{
if(b==2){
k=1;
}else{
if(b==32){
k=5;
}else{
if(b==4){
k=2;
}else{
return this.toRadix(b);
}
}
}
}
}
var km=(1<<k)-1,d,m=false,r="",i=this.t;
var p=this.DB-(i*this.DB)%k;
if(i-->0){
if(p<this.DB&&(d=this[i]>>p)>0){
m=true;
r=int2char(d);
}
while(i>=0){
if(p<k){
d=(this[i]&((1<<p)-1))<<(k-p);
d|=this[--i]>>(p+=this.DB-k);
}else{
d=(this[i]>>(p-=k))&km;
if(p<=0){
p+=this.DB;
--i;
}
}
if(d>0){
m=true;
}
if(m){
r+=int2char(d);
}
}
}
return m?r:"0";
};
function bnNegate(){
var r=nbi();
BigInteger.ZERO.subTo(this,r);
return r;
};
function bnAbs(){
return (this.s<0)?this.negate():this;
};
function bnCompareTo(a){
var r=this.s-a.s;
if(r!=0){
return r;
}
var i=this.t;
r=i-a.t;
if(r!=0){
return r;
}
while(--i>=0){
if((r=this[i]-a[i])!=0){
return r;
}
}
return 0;
};
function nbits(x){
var r=1,t;
if((t=x>>>16)!=0){
x=t;
r+=16;
}
if((t=x>>8)!=0){
x=t;
r+=8;
}
if((t=x>>4)!=0){
x=t;
r+=4;
}
if((t=x>>2)!=0){
x=t;
r+=2;
}
if((t=x>>1)!=0){
x=t;
r+=1;
}
return r;
};
function bnBitLength(){
if(this.t<=0){
return 0;
}
return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
};
function bnpDLShiftTo(n,r){
var i;
for(i=this.t-1;i>=0;--i){
r[i+n]=this[i];
}
for(i=n-1;i>=0;--i){
r[i]=0;
}
r.t=this.t+n;
r.s=this.s;
};
function bnpDRShiftTo(n,r){
for(var i=n;i<this.t;++i){
r[i-n]=this[i];
}
r.t=Math.max(this.t-n,0);
r.s=this.s;
};
function bnpLShiftTo(n,r){
var bs=n%this.DB;
var cbs=this.DB-bs;
var bm=(1<<cbs)-1;
var ds=Math.floor(n/this.DB),c=(this.s<<bs)&this.DM,i;
for(i=this.t-1;i>=0;--i){
r[i+ds+1]=(this[i]>>cbs)|c;
c=(this[i]&bm)<<bs;
}
for(i=ds-1;i>=0;--i){
r[i]=0;
}
r[ds]=c;
r.t=this.t+ds+1;
r.s=this.s;
r.clamp();
};
function bnpRShiftTo(n,r){
r.s=this.s;
var ds=Math.floor(n/this.DB);
if(ds>=this.t){
r.t=0;
return;
}
var bs=n%this.DB;
var cbs=this.DB-bs;
var bm=(1<<bs)-1;
r[0]=this[ds]>>bs;
for(var i=ds+1;i<this.t;++i){
r[i-ds-1]|=(this[i]&bm)<<cbs;
r[i-ds]=this[i]>>bs;
}
if(bs>0){
r[this.t-ds-1]|=(this.s&bm)<<cbs;
}
r.t=this.t-ds;
r.clamp();
};
function bnpSubTo(a,r){
var i=0,c=0,m=Math.min(a.t,this.t);
while(i<m){
c+=this[i]-a[i];
r[i++]=c&this.DM;
c>>=this.DB;
}
if(a.t<this.t){
c-=a.s;
while(i<this.t){
c+=this[i];
r[i++]=c&this.DM;
c>>=this.DB;
}
c+=this.s;
}else{
c+=this.s;
while(i<a.t){
c-=a[i];
r[i++]=c&this.DM;
c>>=this.DB;
}
c-=a.s;
}
r.s=(c<0)?-1:0;
if(c<-1){
r[i++]=this.DV+c;
}else{
if(c>0){
r[i++]=c;
}
}
r.t=i;
r.clamp();
};
function bnpMultiplyTo(a,r){
var x=this.abs(),y=a.abs();
var i=x.t;
r.t=i+y.t;
while(--i>=0){
r[i]=0;
}
for(i=0;i<y.t;++i){
r[i+x.t]=x.am(0,y[i],r,i,0,x.t);
}
r.s=0;
r.clamp();
if(this.s!=a.s){
BigInteger.ZERO.subTo(r,r);
}
};
function bnpSquareTo(r){
var x=this.abs();
var i=r.t=2*x.t;
while(--i>=0){
r[i]=0;
}
for(i=0;i<x.t-1;++i){
var c=x.am(i,x[i],r,2*i,0,1);
if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){
r[i+x.t]-=x.DV;
r[i+x.t+1]=1;
}
}
if(r.t>0){
r[r.t-1]+=x.am(i,x[i],r,2*i,0,1);
}
r.s=0;
r.clamp();
};
function bnpDivRemTo(m,q,r){
var pm=m.abs();
if(pm.t<=0){
return;
}
var pt=this.abs();
if(pt.t<pm.t){
if(q!=null){
q.fromInt(0);
}
if(r!=null){
this.copyTo(r);
}
return;
}
if(r==null){
r=nbi();
}
var y=nbi(),ts=this.s,ms=m.s;
var nsh=this.DB-nbits(pm[pm.t-1]);
if(nsh>0){
pm.lShiftTo(nsh,y);
pt.lShiftTo(nsh,r);
}else{
pm.copyTo(y);
pt.copyTo(r);
}
var ys=y.t;
var y0=y[ys-1];
if(y0==0){
return;
}
var yt=y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
var d1=this.FV/yt,d2=(1<<this.F1)/yt,e=1<<this.F2;
var i=r.t,j=i-ys,t=(q==null)?nbi():q;
y.dlShiftTo(j,t);
if(r.compareTo(t)>=0){
r[r.t++]=1;
r.subTo(t,r);
}
BigInteger.ONE.dlShiftTo(ys,t);
t.subTo(y,y);
while(y.t<ys){
y[y.t++]=0;
}
while(--j>=0){
var qd=(r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){
y.dlShiftTo(j,t);
r.subTo(t,r);
while(r[i]<--qd){
r.subTo(t,r);
}
}
}
if(q!=null){
r.drShiftTo(ys,q);
if(ts!=ms){
BigInteger.ZERO.subTo(q,q);
}
}
r.t=ys;
r.clamp();
if(nsh>0){
r.rShiftTo(nsh,r);
}
if(ts<0){
BigInteger.ZERO.subTo(r,r);
}
};
function bnMod(a){
var r=nbi();
this.abs().divRemTo(a,null,r);
if(this.s<0&&r.compareTo(BigInteger.ZERO)>0){
a.subTo(r,r);
}
return r;
};
function Classic(m){
this.m=m;
};
function cConvert(x){
if(x.s<0||x.compareTo(this.m)>=0){
return x.mod(this.m);
}else{
return x;
}
};
function cRevert(x){
return x;
};
function cReduce(x){
x.divRemTo(this.m,null,x);
};
function cMulTo(x,y,r){
x.multiplyTo(y,r);
this.reduce(r);
};
function cSqrTo(x,r){
x.squareTo(r);
this.reduce(r);
};
Classic.prototype.convert=cConvert;
Classic.prototype.revert=cRevert;
Classic.prototype.reduce=cReduce;
Classic.prototype.mulTo=cMulTo;
Classic.prototype.sqrTo=cSqrTo;
function bnpInvDigit(){
if(this.t<1){
return 0;
}
var x=this[0];
if((x&1)==0){
return 0;
}
var y=x&3;
y=(y*(2-(x&15)*y))&15;
y=(y*(2-(x&255)*y))&255;
y=(y*(2-(((x&65535)*y)&65535)))&65535;
y=(y*(2-x*y%this.DV))%this.DV;
return (y>0)?this.DV-y:-y;
};
function Montgomery(m){
this.m=m;
this.mp=m.invDigit();
this.mpl=this.mp&32767;
this.mph=this.mp>>15;
this.um=(1<<(m.DB-15))-1;
this.mt2=2*m.t;
};
function montConvert(x){
var r=nbi();
x.abs().dlShiftTo(this.m.t,r);
r.divRemTo(this.m,null,r);
if(x.s<0&&r.compareTo(BigInteger.ZERO)>0){
this.m.subTo(r,r);
}
return r;
};
function montRevert(x){
var r=nbi();
x.copyTo(r);
this.reduce(r);
return r;
};
function montReduce(x){
while(x.t<=this.mt2){
x[x.t++]=0;
}
for(var i=0;i<this.m.t;++i){
var j=x[i]&32767;
var u0=(j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
j=i+this.m.t;
x[j]+=this.m.am(0,u0,x,i,0,this.m.t);
while(x[j]>=x.DV){
x[j]-=x.DV;
x[++j]++;
}
}
x.clamp();
x.drShiftTo(this.m.t,x);
if(x.compareTo(this.m)>=0){
x.subTo(this.m,x);
}
};
function montSqrTo(x,r){
x.squareTo(r);
this.reduce(r);
};
function montMulTo(x,y,r){
x.multiplyTo(y,r);
this.reduce(r);
};
Montgomery.prototype.convert=montConvert;
Montgomery.prototype.revert=montRevert;
Montgomery.prototype.reduce=montReduce;
Montgomery.prototype.mulTo=montMulTo;
Montgomery.prototype.sqrTo=montSqrTo;
function bnpIsEven(){
return ((this.t>0)?(this[0]&1):this.s)==0;
};
function bnpExp(e,z){
if(e>4294967295||e<1){
return BigInteger.ONE;
}
var r=nbi(),r2=nbi(),g=z.convert(this),i=nbits(e)-1;
g.copyTo(r);
while(--i>=0){
z.sqrTo(r,r2);
if((e&(1<<i))>0){
z.mulTo(r2,g,r);
}else{
var t=r;
r=r2;
r2=t;
}
}
return z.revert(r);
};
function bnModPowInt(e,m){
var z;
if(e<256||m.isEven()){
z=new Classic(m);
}else{
z=new Montgomery(m);
}
return this.exp(e,z);
};
BigInteger.prototype.copyTo=bnpCopyTo;
BigInteger.prototype.fromInt=bnpFromInt;
BigInteger.prototype.fromString=bnpFromString;
BigInteger.prototype.clamp=bnpClamp;
BigInteger.prototype.dlShiftTo=bnpDLShiftTo;
BigInteger.prototype.drShiftTo=bnpDRShiftTo;
BigInteger.prototype.lShiftTo=bnpLShiftTo;
BigInteger.prototype.rShiftTo=bnpRShiftTo;
BigInteger.prototype.subTo=bnpSubTo;
BigInteger.prototype.multiplyTo=bnpMultiplyTo;
BigInteger.prototype.squareTo=bnpSquareTo;
BigInteger.prototype.divRemTo=bnpDivRemTo;
BigInteger.prototype.invDigit=bnpInvDigit;
BigInteger.prototype.isEven=bnpIsEven;
BigInteger.prototype.exp=bnpExp;
BigInteger.prototype.toString=bnToString;
BigInteger.prototype.negate=bnNegate;
BigInteger.prototype.abs=bnAbs;
BigInteger.prototype.compareTo=bnCompareTo;
BigInteger.prototype.bitLength=bnBitLength;
BigInteger.prototype.mod=bnMod;
BigInteger.prototype.modPowInt=bnModPowInt;
BigInteger.ZERO=nbv(0);
BigInteger.ONE=nbv(1);
var amUtil={};
amUtil.byte2dword=function(bin){
var _72=new Array();
for(var i=0;i<bin.length;i++){
_72[i>>2]|=(bin[i]<<(24-((i%4)*8)));
}
return _72;
};
amUtil.dword2byte=function(_73){
var _74=new Array();
for(var i=0;i<_73.length*4;i++){
_74[i]=(_73[i>>2]>>(24-(i%4)*8))&255;
}
return _74;
};
amUtil.hexDecode=function(_75){
var wrt=0;
var rd=0;
var tmp=new Array(1);
var _76=" ";
var ch=0;
while(rd<_75.length){
if(_75.charCodeAt(rd)==_76.charCodeAt(0)){
++rd;
continue;
}
ch=(amUtil.HexToNib(_75.charCodeAt(rd))<<4)+amUtil.HexToNib(_75.charCodeAt(rd+1));
if(wrt>=tmp.length){
tmp.push(ch);
}else{
tmp[wrt]=ch;
}
++wrt;
rd+=2;
}
return tmp;
};
amUtil.HexToNib=function(h){
if(h>=65&&h<=70){
return h-55;
}
if(h>=97&&h<=102){
return h-87;
}else{
return h-48;
}
};
amUtil.int2bin=function(num,_77){
var _78=[];
for(var i=_77-1;i>=0;i--){
_78[_77-1-i]=(num>>>(i*8))&255;
}
return _78;
};
amUtil.str2bin=function(_79){
var _7a=[];
var _7b=unescape(encodeURIComponent(_79));
for(var i=0;i<_7b.length;i++){
_7a[i]=_7b.charCodeAt(i)&255;
}
return _7a;
};
amUtil.bin2str=function(_7c){
var str="";
for(var i=0;i<_7c.length;i++){
str=str+String.fromCharCode(_7c[i]);
}
return decodeURIComponent(escape(str));
};
amUtil.hex2b64=function(_7d){
return amUtil.base64Encode(amUtil.hexDecode(_7d));
};
amUtil.hexEncode=function(_7e){
var ctr=0;
var tmp="";
var _7f=[];
ctr=0;
while(ctr<_7e.length){
_7f[ctr]=amUtil.addHex(_7e[ctr]);
++ctr;
}
tmp=_7f.join("");
return tmp;
};
amUtil.addHex=function(val){
var x=(val>>>4)&15;
if(x>9){
x+=55;
}else{
x+=48;
}
var s=String.fromCharCode(x);
x=val&15;
if(x>9){
x+=55;
}else{
x+=48;
}
s=s+String.fromCharCode(x);
return s;
};
amUtil.pkcs7Type1=function(_80,_81){
var _82=0;
if(_80.length<_81){
_82=_81-_80.length;
}else{
_82=_81-(_80.length%_81);
}
var _83=[];
for(var i=1;i<=_82;i++){
_83[i-1]=_82&255;
}
return _80.concat(_83);
};
amUtil.pkcs7GetPaddingCount=function(_84,_85){
var _86=_84[_84.length-1];
if(_86>_84.length||_86==0){
throw "pad block corrupted";
}
for(var i=1;i<=_86;i++){
if(_84[_84.length-i]!=_86){
throw "pad block corrupted";
}
}
return _86;
};
amUtil.zeroPad=function(_87,_88){
var _89=_87;
for(;_89.length<_88;){
_89="0"+_89;
}
return _89;
};
amUtil.parseBigInt=function(str,r){
return new BigInteger(str,r);
};
amUtil.xor=function(_8a,_8b){
var _8c=[];
if(_8a.length!=_8b.length){
throw "XOR failure: two binaries have different lengths";
}
for(var i=0;i<_8a.length;i++){
_8c[i]=_8a[i]^_8b[i];
}
return _8c;
};
amUtil.generateRandom=function(_8d){
var a=[];
if(window.crypto&&window.crypto.getRandomValues){
var ua=new Uint8Array(_8d);
window.crypto.getRandomValues(ua);
for(i=0;i<_8d;i++){
a[i]=ua[i];
}
}else{
for(i=0;i<_8d;i++){
a[i]=(Math.floor(256*Math.random()));
}
}
return a;
};
amUtil.base64Encode=function(_8e){
return Base64.encodeByteArray(_8e);
};
amUtil.Arcfour=function(){
this.i=0;
this.j=0;
this.S=new Array();
};
amUtil.ARC4init=function(key){
var i,j,t;
for(i=0;i<256;++i){
this.S[i]=i;
}
j=0;
for(i=0;i<256;++i){
j=(j+this.S[i]+key[i%key.length])&255;
t=this.S[i];
this.S[i]=this.S[j];
this.S[j]=t;
}
this.i=0;
this.j=0;
};
amUtil.ARC4next=function(){
var t;
this.i=(this.i+1)&255;
this.j=(this.j+this.S[this.i])&255;
t=this.S[this.i];
this.S[this.i]=this.S[this.j];
this.S[this.j]=t;
return this.S[(t+this.S[this.i])&255];
};
amUtil.Arcfour.prototype.init=amUtil.ARC4init;
amUtil.Arcfour.prototype.next=amUtil.ARC4next;
amUtil.prng_newstate=function(){
return new amUtil.Arcfour();
};
amUtil.rng_psize=256;
amUtil.rng_state;
amUtil.rng_pool;
amUtil.rng_pptr;
amUtil.rng_seed_int=function(x){
amUtil.rng_pool[amUtil.rng_pptr++]^=x&255;
amUtil.rng_pool[amUtil.rng_pptr++]^=(x>>8)&255;
amUtil.rng_pool[amUtil.rng_pptr++]^=(x>>16)&255;
amUtil.rng_pool[amUtil.rng_pptr++]^=(x>>24)&255;
if(amUtil.rng_pptr>=amUtil.rng_psize){
amUtil.rng_pptr-=amUtil.rng_psize;
}
};
amUtil.rng_seed_time=function(){
amUtil.rng_seed_int(new Date().getTime());
};
if(amUtil.rng_pool==null){
amUtil.rng_pool=new Array();
amUtil.rng_pptr=0;
var t;
if(window.crypto&&window.crypto.getRandomValues){
var ua=new Uint8Array(32);
window.crypto.getRandomValues(ua);
for(t=0;t<32;++t){
amUtil.rng_pool[amUtil.rng_pptr++]=ua[t];
}
}
if(navigator.appName=="Netscape"&&navigator.appVersion<"5"&&window.crypto){
var z=window.crypto.random(32);
for(t=0;t<z.length;++t){
amUtil.rng_pool[amUtil.rng_pptr++]=z.charCodeAt(t)&255;
}
}
while(amUtil.rng_pptr<amUtil.rng_psize){
t=Math.floor(65536*Math.random());
amUtil.rng_pool[amUtil.rng_pptr++]=t>>>8;
amUtil.rng_pool[amUtil.rng_pptr++]=t&255;
}
amUtil.rng_pptr=0;
amUtil.rng_seed_time();
}
amUtil.rng_get_byte=function(){
if(amUtil.rng_state==null){
amUtil.rng_seed_time();
amUtil.rng_state=amUtil.prng_newstate();
amUtil.rng_state.init(amUtil.rng_pool);
for(amUtil.rng_pptr=0;amUtil.rng_pptr<amUtil.rng_pool.length;++amUtil.rng_pptr){
amUtil.rng_pool[amUtil.rng_pptr]=0;
}
amUtil.rng_pptr=0;
}
return amUtil.rng_state.next();
};
amUtil.rng_get_bytes=function(ba){
var i;
for(i=0;i<ba.length;++i){
var _8f=amUtil.rng_get_byte();
while(i==0&&(_8f&128)!=0){
_8f=amUtil.rng_get_byte();
}
ba[i]=_8f;
}
};
amUtil.SecureRandom=function(){
};
amUtil.SecureRandom.prototype.nextBytes=amUtil.rng_get_bytes;
amUtil.log=function(log){
try{
document.testform.debug.value=document.testform.debug.value+log+"\n";
}
catch(err){
}
}(function(_90){
"use strict";
var _91=4|2|1;
function _92(_93,_94){
this.highOrder=_93;
this.lowOrder=_94;
};
function _95(str,_96){
var bin=[],_97=(1<<_96)-1,_98=str.length*_96,i;
for(i=0;i<_98;i+=_96){
bin[i>>>5]|=(str.charCodeAt(i/_96)&_97)<<(32-_96-(i%32));
}
return {"value":bin,"binLen":_98};
};
function _99(str){
var bin=[],_9a=str.length,i,num;
if(0!==(_9a%2)){
throw "String of HEX type must be in byte increments";
}
for(i=0;i<_9a;i+=2){
num=parseInt(str.substr(i,2),16);
if(!isNaN(num)){
bin[i>>>3]|=num<<(24-(4*(i%8)));
}else{
throw "String of HEX type contains invalid characters";
}
}
return {"value":bin,"binLen":_9a*4};
};
function _9b(str){
var _9c=[],_9d=0,_9e,i,j,_9f,_a0,_a1,_a2="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
if(-1===str.search(/^[a-zA-Z0-9=+\/]+$/)){
throw "Invalid character in base-64 string";
}
_a1=str.indexOf("=");
str=str.replace(/\=/g,"");
if((-1!==_a1)&&(_a1<str.length)){
throw "Invalid '=' found in base-64 string";
}
for(i=0;i<str.length;i+=4){
_a0=str.substr(i,4);
_9f=0;
for(j=0;j<_a0.length;j+=1){
_9e=_a2.indexOf(_a0[j]);
_9f|=_9e<<(18-(6*j));
}
for(j=0;j<_a0.length-1;j+=1){
_9c[_9d>>2]|=((_9f>>>(16-(j*8)))&255)<<(24-(8*(_9d%4)));
_9d+=1;
}
}
return {"value":_9c,"binLen":_9d*8};
};
function _a3(_a4,_a5){
var _a6="0123456789abcdef",str="",_a7=_a4.length*4,i,_a8;
for(i=0;i<_a7;i+=1){
_a8=_a4[i>>>2]>>>((3-(i%4))*8);
str+=_a6.charAt((_a8>>>4)&15)+_a6.charAt(_a8&15);
}
return (_a5["outputUpper"])?str.toUpperCase():str;
};
function _a9(_aa,_ab){
var str="",_ac=_aa.length*4,i,j,_ad,_ae="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(i=0;i<_ac;i+=3){
_ad=(((_aa[i>>>2]>>>8*(3-i%4))&255)<<16)|(((_aa[i+1>>>2]>>>8*(3-(i+1)%4))&255)<<8)|((_aa[i+2>>>2]>>>8*(3-(i+2)%4))&255);
for(j=0;j<4;j+=1){
if(i*8+j*6<=_aa.length*32){
str+=_ae.charAt((_ad>>>6*(3-j))&63);
}else{
str+=_ab["b64Pad"];
}
}
}
return str;
};
function _af(_b0){
var _b1={"outputUpper":false,"b64Pad":"="};
try{
if(Object.prototype.hasOwnProperty(_b0,"outputUpper")){
_b1["outputUpper"]=_b0["outputUpper"];
}
if(Object.prototype.hasOwnProperty(_b0,"b64Pad")){
_b1["b64Pad"]=_b0["b64Pad"];
}
}
catch(e){
}
if("boolean"!==typeof (_b1["outputUpper"])){
throw "Invalid outputUpper formatting option";
}
if("string"!==typeof (_b1["b64Pad"])){
throw "Invalid b64Pad formatting option";
}
return _b1;
};
function _b2(x,n){
return (x<<n)|(x>>>(32-n));
};
function _b3(x,n){
return (x>>>n)|(x<<(32-n));
};
function _b4(x,n){
var _b5=null,tmp=new _92(x.highOrder,x.lowOrder);
if(32>=n){
_b5=new _92(((tmp.highOrder>>>n)&4294967295)|((tmp.lowOrder<<(32-n))&4294967295),((tmp.lowOrder>>>n)&4294967295)|((tmp.highOrder<<(32-n))&4294967295));
}else{
_b5=new _92(((tmp.lowOrder>>>(n-32))&4294967295)|((tmp.highOrder<<(64-n))&4294967295),((tmp.highOrder>>>(n-32))&4294967295)|((tmp.lowOrder<<(64-n))&4294967295));
}
return _b5;
};
function _b6(x,n){
return x>>>n;
};
function _b7(x,n){
var _b8=null;
if(32>=n){
_b8=new _92(x.highOrder>>>n,x.lowOrder>>>n|((x.highOrder<<(32-n))&4294967295));
}else{
_b8=new _92(0,x.highOrder>>>(n-32));
}
return _b8;
};
function _b9(x,y,z){
return x^y^z;
};
function _ba(x,y,z){
return (x&y)^(~x&z);
};
function _bb(x,y,z){
return new _92((x.highOrder&y.highOrder)^(~x.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(~x.lowOrder&z.lowOrder));
};
function _bc(x,y,z){
return (x&y)^(x&z)^(y&z);
};
function _bd(x,y,z){
return new _92((x.highOrder&y.highOrder)^(x.highOrder&z.highOrder)^(y.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(x.lowOrder&z.lowOrder)^(y.lowOrder&z.lowOrder));
};
function _be(x){
return _b3(x,2)^_b3(x,13)^_b3(x,22);
};
function _bf(x){
var _c0=_b4(x,28),_c1=_b4(x,34),_c2=_b4(x,39);
return new _92(_c0.highOrder^_c1.highOrder^_c2.highOrder,_c0.lowOrder^_c1.lowOrder^_c2.lowOrder);
};
function _c3(x){
return _b3(x,6)^_b3(x,11)^_b3(x,25);
};
function _c4(x){
var _c5=_b4(x,14),_c6=_b4(x,18),_c7=_b4(x,41);
return new _92(_c5.highOrder^_c6.highOrder^_c7.highOrder,_c5.lowOrder^_c6.lowOrder^_c7.lowOrder);
};
function _c8(x){
return _b3(x,7)^_b3(x,18)^_b6(x,3);
};
function _c9(x){
var _ca=_b4(x,1),_cb=_b4(x,8),_cc=_b7(x,7);
return new _92(_ca.highOrder^_cb.highOrder^_cc.highOrder,_ca.lowOrder^_cb.lowOrder^_cc.lowOrder);
};
function _cd(x){
return _b3(x,17)^_b3(x,19)^_b6(x,10);
};
function _ce(x){
var _cf=_b4(x,19),_d0=_b4(x,61),_d1=_b7(x,6);
return new _92(_cf.highOrder^_d0.highOrder^_d1.highOrder,_cf.lowOrder^_d0.lowOrder^_d1.lowOrder);
};
function _d2(a,b){
var lsw=(a&65535)+(b&65535),msw=(a>>>16)+(b>>>16)+(lsw>>>16);
return ((msw&65535)<<16)|(lsw&65535);
};
function _d3(a,b,c,d){
var lsw=(a&65535)+(b&65535)+(c&65535)+(d&65535),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(lsw>>>16);
return ((msw&65535)<<16)|(lsw&65535);
};
function _d4(a,b,c,d,e){
var lsw=(a&65535)+(b&65535)+(c&65535)+(d&65535)+(e&65535),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16)+(lsw>>>16);
return ((msw&65535)<<16)|(lsw&65535);
};
function _d5(x,y){
var lsw,msw,_d6,_d7;
lsw=(x.lowOrder&65535)+(y.lowOrder&65535);
msw=(x.lowOrder>>>16)+(y.lowOrder>>>16)+(lsw>>>16);
_d6=((msw&65535)<<16)|(lsw&65535);
lsw=(x.highOrder&65535)+(y.highOrder&65535)+(msw>>>16);
msw=(x.highOrder>>>16)+(y.highOrder>>>16)+(lsw>>>16);
_d7=((msw&65535)<<16)|(lsw&65535);
return new _92(_d7,_d6);
};
function _d8(a,b,c,d){
var lsw,msw,_d9,_da;
lsw=(a.lowOrder&65535)+(b.lowOrder&65535)+(c.lowOrder&65535)+(d.lowOrder&65535);
msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(lsw>>>16);
_d9=((msw&65535)<<16)|(lsw&65535);
lsw=(a.highOrder&65535)+(b.highOrder&65535)+(c.highOrder&65535)+(d.highOrder&65535)+(msw>>>16);
msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(lsw>>>16);
_da=((msw&65535)<<16)|(lsw&65535);
return new _92(_da,_d9);
};
function _db(a,b,c,d,e){
var lsw,msw,_dc,_dd;
lsw=(a.lowOrder&65535)+(b.lowOrder&65535)+(c.lowOrder&65535)+(d.lowOrder&65535)+(e.lowOrder&65535);
msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e.lowOrder>>>16)+(lsw>>>16);
_dc=((msw&65535)<<16)|(lsw&65535);
lsw=(a.highOrder&65535)+(b.highOrder&65535)+(c.highOrder&65535)+(d.highOrder&65535)+(e.highOrder&65535)+(msw>>>16);
msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e.highOrder>>>16)+(lsw>>>16);
_dd=((msw&65535)<<16)|(lsw&65535);
return new _92(_dd,_dc);
};
function _de(_df,_e0){
var W=[],a,b,c,d,e,T,ch=_ba,_e1=_b9,maj=_bc,_e2=_b2,_e3=_d2,i,t,_e4=_d4,_e5,H=[1732584193,4023233417,2562383102,271733878,3285377520],K=[1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1518500249,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,1859775393,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,2400959708,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782,3395469782];
_df[_e0>>>5]|=128<<(24-(_e0%32));
_df[(((_e0+65)>>>9)<<4)+15]=_e0;
_e5=_df.length;
for(i=0;i<_e5;i+=16){
a=H[0];
b=H[1];
c=H[2];
d=H[3];
e=H[4];
for(t=0;t<80;t+=1){
if(t<16){
W[t]=_df[t+i];
}else{
W[t]=_e2(W[t-3]^W[t-8]^W[t-14]^W[t-16],1);
}
if(t<20){
T=_e4(_e2(a,5),ch(b,c,d),e,K[t],W[t]);
}else{
if(t<40){
T=_e4(_e2(a,5),_e1(b,c,d),e,K[t],W[t]);
}else{
if(t<60){
T=_e4(_e2(a,5),maj(b,c,d),e,K[t],W[t]);
}else{
T=_e4(_e2(a,5),_e1(b,c,d),e,K[t],W[t]);
}
}
}
e=d;
d=c;
c=_e2(b,30);
b=a;
a=T;
}
H[0]=_e3(a,H[0]);
H[1]=_e3(b,H[1]);
H[2]=_e3(c,H[2]);
H[3]=_e3(d,H[3]);
H[4]=_e3(e,H[4]);
}
return H;
};
function _e6(_e7,_e8,_e9){
var a,b,c,d,e,f,g,h,T1,T2,H,_ea,_eb,i,t,_ec,_ed,_ee,_ef,_f0,_f1,_f2,_f3,_f4,ch,maj,Int,K,W=[],_f5,_f6;
if((_e9==="SHA-224"||_e9==="SHA-256")&&(2&_91)){
_ea=64;
_eb=(((_e8+65)>>>9)<<4)+15;
_ec=16;
_ed=1;
Int=Number;
_ee=_d2;
_ef=_d3;
_f0=_d4;
_f1=_c8;
_f2=_cd;
_f3=_be;
_f4=_c3;
maj=_bc;
ch=_ba;
K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];
if("SHA-224"===_e9){
H=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428];
}else{
H=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];
}
}else{
if((_e9==="SHA-384"||_e9==="SHA-512")&&(4&_91)){
_ea=80;
_eb=(((_e8+128)>>>10)<<5)+31;
_ec=32;
_ed=2;
Int=_92;
_ee=_d5;
_ef=_d8;
_f0=_db;
_f1=_c9;
_f2=_ce;
_f3=_bf;
_f4=_c4;
maj=_bd;
ch=_bb;
K=[new Int(1116352408,3609767458),new Int(1899447441,602891725),new Int(3049323471,3964484399),new Int(3921009573,2173295548),new Int(961987163,4081628472),new Int(1508970993,3053834265),new Int(2453635748,2937671579),new Int(2870763221,3664609560),new Int(3624381080,2734883394),new Int(310598401,1164996542),new Int(607225278,1323610764),new Int(1426881987,3590304994),new Int(1925078388,4068182383),new Int(2162078206,991336113),new Int(2614888103,633803317),new Int(3248222580,3479774868),new Int(3835390401,2666613458),new Int(4022224774,944711139),new Int(264347078,2341262773),new Int(604807628,2007800933),new Int(770255983,1495990901),new Int(1249150122,1856431235),new Int(1555081692,3175218132),new Int(1996064986,2198950837),new Int(2554220882,3999719339),new Int(2821834349,766784016),new Int(2952996808,2566594879),new Int(3210313671,3203337956),new Int(3336571891,1034457026),new Int(3584528711,2466948901),new Int(113926993,3758326383),new Int(338241895,168717936),new Int(666307205,1188179964),new Int(773529912,1546045734),new Int(1294757372,1522805485),new Int(1396182291,2643833823),new Int(1695183700,2343527390),new Int(1986661051,1014477480),new Int(2177026350,1206759142),new Int(2456956037,344077627),new Int(2730485921,1290863460),new Int(2820302411,3158454273),new Int(3259730800,3505952657),new Int(3345764771,106217008),new Int(3516065817,3606008344),new Int(3600352804,1432725776),new Int(4094571909,1467031594),new Int(275423344,851169720),new Int(430227734,3100823752),new Int(506948616,1363258195),new Int(659060556,3750685593),new Int(883997877,3785050280),new Int(958139571,3318307427),new Int(1322822218,3812723403),new Int(1537002063,2003034995),new Int(1747873779,3602036899),new Int(1955562222,1575990012),new Int(2024104815,1125592928),new Int(2227730452,2716904306),new Int(2361852424,442776044),new Int(2428436474,593698344),new Int(2756734187,3733110249),new Int(3204031479,2999351573),new Int(3329325298,3815920427),new Int(3391569614,3928383900),new Int(3515267271,566280711),new Int(3940187606,3454069534),new Int(4118630271,4000239992),new Int(116418474,1914138554),new Int(174292421,2731055270),new Int(289380356,3203993006),new Int(460393269,320620315),new Int(685471733,587496836),new Int(852142971,1086792851),new Int(1017036298,365543100),new Int(1126000580,2618297676),new Int(1288033470,3409855158),new Int(1501505948,4234509866),new Int(1607167915,987167468),new Int(1816402316,1246189591)];
if("SHA-384"===_e9){
H=[new Int(3418070365,3238371032),new Int(1654270250,914150663),new Int(2438529370,812702999),new Int(355462360,4144912697),new Int(1731405415,4290775857),new Int(41048885895,1750603025),new Int(3675008525,1694076839),new Int(1203062813,3204075428)];
}else{
H=[new Int(1779033703,4089235720),new Int(3144134277,2227873595),new Int(1013904242,4271175723),new Int(2773480762,1595750129),new Int(1359893119,2917565137),new Int(2600822924,725511199),new Int(528734635,4215389547),new Int(1541459225,327033209)];
}
}else{
throw "Unexpected error in SHA-2 implementation";
}
}
_e7[_e8>>>5]|=128<<(24-_e8%32);
_e7[_eb]=_e8;
_f5=_e7.length;
for(i=0;i<_f5;i+=_ec){
a=H[0];
b=H[1];
c=H[2];
d=H[3];
e=H[4];
f=H[5];
g=H[6];
h=H[7];
for(t=0;t<_ea;t+=1){
if(t<16){
W[t]=new Int(_e7[t*_ed+i],_e7[t*_ed+i+1]);
}else{
W[t]=_ef(_f2(W[t-2]),W[t-7],_f1(W[t-15]),W[t-16]);
}
T1=_f0(h,_f4(e),ch(e,f,g),K[t],W[t]);
T2=_ee(_f3(a),maj(a,b,c));
h=g;
g=f;
f=e;
e=_ee(d,T1);
d=c;
c=b;
b=a;
a=_ee(T1,T2);
}
H[0]=_ee(a,H[0]);
H[1]=_ee(b,H[1]);
H[2]=_ee(c,H[2]);
H[3]=_ee(d,H[3]);
H[4]=_ee(e,H[4]);
H[5]=_ee(f,H[5]);
H[6]=_ee(g,H[6]);
H[7]=_ee(h,H[7]);
}
if(("SHA-224"===_e9)&&(2&_91)){
_f6=[H[0],H[1],H[2],H[3],H[4],H[5],H[6]];
}else{
if(("SHA-256"===_e9)&&(2&_91)){
_f6=H;
}else{
if(("SHA-384"===_e9)&&(4&_91)){
_f6=[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder];
}else{
if(("SHA-512"===_e9)&&(4&_91)){
_f6=[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder,H[6].highOrder,H[6].lowOrder,H[7].highOrder,H[7].lowOrder];
}else{
throw "Unexpected error in SHA-2 implementation";
}
}
}
}
return _f6;
};
var _f7=function(_f8,_f9,_fa){
var _fb=null,_fc=null,_fd=null,_fe=null,_ff=null,_100=0,_101=[0],_102=0,_103=null;
_102=("undefined"!==typeof (_fa))?_fa:8;
if(!((8===_102)||(16===_102))){
throw "charSize must be 8 or 16";
}
if("HEX"===_f9){
if(0!==(_f8.length%2)){
throw "srcString of HEX type must be in byte increments";
}
_103=_99(_f8);
_100=_103["binLen"];
_101=_103["value"];
}else{
if(("ASCII"===_f9)||("TEXT"===_f9)){
_103=_95(_f8,_102);
_100=_103["binLen"];
_101=_103["value"];
}else{
if("B64"===_f9){
_103=_9b(_f8);
_100=_103["binLen"];
_101=_103["value"];
}else{
throw "inputFormat must be HEX, TEXT, ASCII, or B64";
}
}
}
this.getHash=function(_104,_105,_106){
var _107=null,_108=_101.slice(),_109="";
switch(_105){
case "HEX":
_107=_a3;
break;
case "B64":
_107=_a9;
break;
default:
throw "format must be HEX or B64";
}
if(("SHA-1"===_104)&&(1&_91)){
if(null===_fb){
_fb=_de(_108,_100);
}
_109=_107(_fb,_af(_106));
}else{
if(("SHA-224"===_104)&&(2&_91)){
if(null===_fc){
_fc=_e6(_108,_100,_104);
}
_109=_107(_fc,_af(_106));
}else{
if(("SHA-256"===_104)&&(2&_91)){
if(null===_fd){
_fd=_e6(_108,_100,_104);
}
_109=_107(_fd,_af(_106));
}else{
if(("SHA-384"===_104)&&(4&_91)){
if(null===_fe){
_fe=_e6(_108,_100,_104);
}
_109=_107(_fe,_af(_106));
}else{
if(("SHA-512"===_104)&&(4&_91)){
if(null===_ff){
_ff=_e6(_108,_100,_104);
}
_109=_107(_ff,_af(_106));
}else{
throw "Chosen SHA variant is not supported";
}
}
}
}
}
return _109;
};
this.getHMAC=function(key,_10a,_10b,_10c,_10d){
var _10e,_10f,_110,_111,i,_112,_113,_114,_115,_116=[],_117=[],_103=null;
switch(_10c){
case "HEX":
_10e=_a3;
break;
case "B64":
_10e=_a9;
break;
default:
throw "outputFormat must be HEX or B64";
}
if(("SHA-1"===_10b)&&(1&_91)){
_110=64;
_115=160;
}else{
if(("SHA-224"===_10b)&&(2&_91)){
_110=64;
_115=224;
}else{
if(("SHA-256"===_10b)&&(2&_91)){
_110=64;
_115=256;
}else{
if(("SHA-384"===_10b)&&(4&_91)){
_110=128;
_115=384;
}else{
if(("SHA-512"===_10b)&&(4&_91)){
_110=128;
_115=512;
}else{
throw "Chosen SHA variant is not supported";
}
}
}
}
}
if("HEX"===_10a){
_103=_99(key);
_114=_103["binLen"];
_10f=_103["value"];
}else{
if(("ASCII"===_10a)||("TEXT"===_10a)){
_103=_95(key,_102);
_114=_103["binLen"];
_10f=_103["value"];
}else{
if("B64"===_10a){
_103=_9b(key);
_114=_103["binLen"];
_10f=_103["value"];
}else{
throw "inputFormat must be HEX, TEXT, ASCII, or B64";
}
}
}
_111=_110*8;
_113=(_110/4)-1;
if(_110<(_114/8)){
if(("SHA-1"===_10b)&&(1&_91)){
_10f=_de(_10f,_114);
}else{
if(6&_91){
_10f=_e6(_10f,_114,_10b);
}else{
throw "Unexpected error in HMAC implementation";
}
}
_10f[_113]&=4294967040;
}else{
if(_110>(_114/8)){
_10f[_113]&=4294967040;
}
}
for(i=0;i<=_113;i+=1){
_116[i]=_10f[i]^909522486;
_117[i]=_10f[i]^1549556828;
}
if(("SHA-1"===_10b)&&(1&_91)){
_112=_de(_117.concat(_de(_116.concat(_101),_111+_100)),_111+_115);
}else{
if(6&_91){
_112=_e6(_117.concat(_e6(_116.concat(_101),_111+_100,_10b)),_111+_115,_10b);
}else{
throw "Unexpected error in HMAC implementation";
}
}
return _10e(_112,_af(_10d));
};
};
_90["jsSHA"]=_f7;
}(window));
Base64={};
Base64.byteToCharMap_=null;
Base64.charToByteMap_=null;
Base64.byteToCharMapWebSafe_=null;
Base64.charToByteMapWebSafe_=null;
Base64.ENCODED_VALS_BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"abcdefghijklmnopqrstuvwxyz"+"0123456789";
Base64.ENCODED_VALS=Base64.ENCODED_VALS_BASE+"+/=";
Base64.ENCODED_VALS_WEBSAFE=Base64.ENCODED_VALS_BASE+"-_.";
Base64.encodeByteArray=function(_118,_119){
Base64.init_();
var _11a=_119?Base64.byteToCharMapWebSafe_:Base64.byteToCharMap_;
var _11b=[];
for(var i=0;i<_118.length;i+=3){
var _11c=_118[i];
var _11d=i+1<_118.length;
var _11e=_11d?_118[i+1]:0;
var _11f=i+2<_118.length;
var _120=_11f?_118[i+2]:0;
var _121=_11c>>2;
var _122=((_11c&3)<<4)|(_11e>>4);
var _123=((_11e&15)<<2)|(_120>>6);
var _124=_120&63;
if(!_11f){
_124=64;
if(!_11d){
_123=64;
}
}
_11b.push(_11a[_121],_11a[_122],_11a[_123],_11a[_124]);
}
return _11b.join("");
};
Base64.init_=function(){
if(!Base64.byteToCharMap_){
Base64.byteToCharMap_={};
Base64.charToByteMap_={};
Base64.byteToCharMapWebSafe_={};
Base64.charToByteMapWebSafe_={};
for(var i=0;i<Base64.ENCODED_VALS.length;i++){
Base64.byteToCharMap_[i]=Base64.ENCODED_VALS.charAt(i);
Base64.charToByteMap_[Base64.byteToCharMap_[i]]=i;
Base64.byteToCharMapWebSafe_[i]=Base64.ENCODED_VALS_WEBSAFE.charAt(i);
Base64.charToByteMapWebSafe_[Base64.byteToCharMapWebSafe_[i]]=i;
}
}
};

