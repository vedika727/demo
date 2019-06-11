import { CmsHttpServiceProvider } from './data-service/cms-http-service/cms-http-service';
import { FitsenseServiceProvider } from "./homepage-module/fitsense-service/fitsense-service";
import { RegistrationProcessProvider } from "./registration-process-service/registration-process";
import { LoginServivceProvider } from "./login-module/login-service/login-service";
import { MyAccountServiceProvider } from "./my-account-service/my-account-service";
import { HeaderServiceProvider } from "./interceptor/header-service";
import { ToastServiceProvider } from "./ion-service/toast-service";
import { NgModule } from "@angular/core";
import { AlertServiceProvider } from "./ion-service/alert-service";
import { CacheServiceProvider } from "./ion-service/cache-service";
import { LoadingServiceProvider } from "./ion-service/loading-service";
import { LogServiceProvider } from "./data-service/log-service";
import { NetworkServiceProvider } from "./data-service/network-service";
import { ModalServiceProvider } from "./modal-service/modal-service";
import { SharedataProvider } from "./sharedata/sharedata";
import { Geolocation } from "@ionic-native/geolocation";
import { Network } from "@ionic-native/network";
import { BatteryStatus } from "@ionic-native/battery-status";
import { PushNotificationService } from "../providers/firebase-service/push-notification-service";
import { DynamicLinkService } from "../providers/firebase-service/dynamic-link-service";
import { PushNotificationDynamicLinkService } from "../providers/firebase-service/pnotification-dlink-service"
import { FirebaseAnalyticsService } from "../providers/firebase-service/firebase-analytics-service";
import { Sim } from "@ionic-native/sim";
import { AppVersion } from "@ionic-native/app-version";
import { Device } from "@ionic-native/device";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Globalization } from "@ionic-native/globalization";
import { TestServiceProvider } from "./test-module/test-service/test-service";
import { CameraServiceProvider } from "./ion-service/camera-service/camera-service";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { TouchID } from "@ionic-native/touch-id";
import { ISprintService } from "./isprint-service/isprint";
import { CmsServiceProvider } from './cms-service/cms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { OtpServicesProvider } from './otp-service/otp-process';
import { RegistrationServivceProvider } from './registration-service/registration-service';
import { PreAuthServivceProvider } from './preauth-service/preauth-service';
import { Broadcaster } from '@ionic-native/broadcaster';
import { AppErrorHandler } from '../common/errors/errorHandler';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PolicyDashboardServiceProvider } from './policy-dashboard-service/policy-dashboard-service';
import { HomePdServiceProvider } from '../providers/homepage-module/home-pd-service/home-pd-service';
import { DeviceInfoServiceProvider } from './deviceInfo-service/deviceInfo-service';
import { PermissionsServiceProvider } from './permissions-service/permissions-service';
import { LoginServivceAuthProvider } from './login-module/login-service.auth/login-service-auth';
import { LoginGetCustomerInfoProvider } from './login-module/login-get-customer-info-service/login-get-customer-info-service';
import { RegisterDeviceProvider } from './register-device/register-device';
import { SqlStorageProvider } from './sql-storage/sql-storage';
import { AppInit } from './app-init-service/appinit-service';
import { HttpErrorHandler } from './base-api-integration/http-error-handler.service';
import { ErrorService } from './base-api-integration/error.service';
import { PolicyLoanServicesProvider } from './policy-loan-services/policy-loan-services';
import { GlobalErrorProvider } from './global-error-handler/global-error-handler';
import { PaymentServiceProvider } from '../providers/payment-service/payment-service';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActivityLogServicesProvider } from './activity-log/activity-log-service';
import { TooltipServiceProvider } from './tooltip-service/tooltip-service';
import { TranslateServiceProvider } from './translate-service/translate-service';
import { ProductDetailServiceProvider } from './product-details/product-detail-service';
import { LoginAuthProvider } from "./login-module/login-service.auth/login-auth";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AlertServiceProvider,
    CacheServiceProvider,
    ToastServiceProvider,
    LoadingServiceProvider,
    LogServiceProvider,
    NetworkServiceProvider,
    ModalServiceProvider,
    PushNotificationDynamicLinkService,
    PushNotificationService,
    DynamicLinkService,
    FirebaseAnalyticsService,
    FitsenseServiceProvider,
    SharedataProvider,
    HeaderServiceProvider,
    TestServiceProvider,
    BatteryStatus,
    Network,
    Sim,
    AppVersion,
    Device,
    Geolocation,
    Diagnostic,
    Globalization,
    TestServiceProvider,
    LoginServivceProvider,
    MyAccountServiceProvider,
    CameraServiceProvider,
    AndroidFingerprintAuth,
    TouchID,
    TestServiceProvider,
    AndroidFingerprintAuth,
    RegistrationProcessProvider,
    ISprintService,
    OpenNativeSettings,
    CmsHttpServiceProvider,
    CmsServiceProvider,
    OtpServicesProvider,
    RegistrationServivceProvider,
    PreAuthServivceProvider,
    Broadcaster,
    AppErrorHandler,
    AndroidPermissions,
    PolicyDashboardServiceProvider,
    PaymentServiceProvider,
    HomePdServiceProvider,
    DeviceInfoServiceProvider,
    PermissionsServiceProvider,
    LoginServivceAuthProvider,
    MyAccountServiceProvider,
    LoginGetCustomerInfoProvider,
    RegisterDeviceProvider,
    SqlStorageProvider,
    AppInit,
    HttpErrorHandler,
    ErrorService,
    PolicyLoanServicesProvider,
    GlobalErrorProvider,
    StreamingMedia,
    SocialSharing,
    ActivityLogServicesProvider,
    TooltipServiceProvider,
    TranslateServiceProvider,
    ProductDetailServiceProvider,
    LoginAuthProvider
  ]
})
export class ProvidersModule { }
