import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MyApp } from "./app.component";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { ComponentsModule } from "../components/components.module";
import { ProvidersModule } from "../providers/providers.module";
import { Push } from "@ionic-native/push";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { IonicStorageModule } from "@ionic/storage";
import { AppErrorHandler } from "../common/errors/errorHandler";
import { Geolocation } from "@ionic-native/geolocation";
import { CallNumber } from "@ionic-native/call-number";
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from "ng2-translate";
import { Http } from "@angular/http";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { LaunchNavigator } from "@ionic-native/launch-navigator";
import { Camera } from "@ionic-native/camera";
import { SharedataProvider } from "../providers/sharedata/sharedata";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { CodePush } from "@ionic-native/code-push";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Broadcaster } from "@ionic-native/broadcaster";
import { Screenshot } from "@ionic-native/screenshot";
import { NgCircleProgressModule } from "ng-circle-progress";

//Storage related imports
import { NativeStorage } from '@ionic-native/native-storage';
import { SecureStorageProvider } from "../providers/secure-storage/secure-storage";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery";
import { Crop } from "@ionic-native/crop";
import { File } from "@ionic-native/file";
import { DirectivesModule } from "../directives/directives.module";
import { CommonModule } from "@angular/common";
import { MyHttpLogInterceptor } from "../providers/interceptor/interceptor";
import { HttpServiceProvider } from "../providers/data-service/http-service";
import { ThaiDateConversionProvider } from '../providers/thai-date-conversion/thai-date-conversion';
import { TooltipServiceProvider } from '../providers/tooltip-service/tooltip-service';
import { Ng5SliderModule } from 'ng5-slider';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, "./assets/i18n", ".json");
}
@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ProvidersModule,
    ComponentsModule,
    PipesModule,
    DirectivesModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    CommonModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    Ng5SliderModule,
    NgCircleProgressModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LaunchNavigator,
    BarcodeScanner,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true },
    Push,
    FirebaseDynamicLinks,
    FirebaseAnalytics,
    Camera,
    AndroidFingerprintAuth,
    CallNumber,
    SharedataProvider,
    Broadcaster,
    CodePush,
    Screenshot,
    NativeStorage,
    SecureStorageProvider,
    Base64ToGallery,
    Crop,
    InAppBrowser,
    File,
    HttpServiceProvider,
    ThaiDateConversionProvider,
    TooltipServiceProvider
  ]
})
export class AppModule {}
