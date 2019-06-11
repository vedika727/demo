

export const responseContentType = 'application/json';
export const responseAcceptType = "application/json";
export const applicationChannel = "ez01";
export const encrytionType = "SHA-1";
export const xIBMClientId = "c9b047027b6e21999e33d1b1d8081dc5";
export const loginModuleType = {
    PIN: "E2EEPIN",
    BIO: "E2EEBIO"
};
export const loginModuleId = "E2EEPIN";

// Assign translation keys here
export const NETWORK_ERROR = { status: 0, message: "Network not Available" }

// Request Timeout
export const REQUEST_TIMEOUT = 10000;

// http host name
export const SCB_HOST = "apicapco-sit.scblife.co.th";

// default Lanugage
export const DEFAULT_APP_LANGUAGE = "th";

// Default profile image path
export const DEFAULT_PROFILE_IMAGE = "assets/scbl-icons/add.svg";

// 
export const KEY_URM_ID = "urmid";

//LOGIN
export const KEY_LOGIN_IS_USER_LOCKED = "isUserLocked";

// STORAGE KEYS
export const KEY_IS_DEVICE_REGISTERED = "isDeviceRegistered";
export const KEY_IS_CUSTOMER_REGISTERED = "isRegistered";
export const KEY_IS_SCB_CUSTOMER = "isSCBCustomer";
export const KEY_PROFILE_IMAGE = "userProfileImage";
export const KEY_REGISTERED_USER = "loggedInUserDetails";
export const KEY_LOGGED_IN_USER_DETAILS = "loggedInUserDetails";
export const DEVICEID_AND_RANDOM_SIX_DIGIT_NUMBER = "sixDigitRandomNumber";
export const KEY_IS_FITSENSE_REGISTERED = "isFitsenseRegister";

// SUBSCRIPTION_KEYS
export const SUB_NOTIFICATION_RECEIVED = "notificationReceived";
export const SUB_REGISTRATION = "registration";

// App Open State Count
export const KEY_IS_FIRST_TIME = "firstTimeAppOpen";
export const KEY_IS_BIO_ENABLED = "isBiometricEnabled";
export const KEY_BIOMETRIC_TYPE = "biometricType";
export const KEY_POP_UP = "showPopup";
export const KEY_USER_PROFILE_IMAGE = "userProfileImage";
export const KEY_LOCKING_TIME = "lockingTime";
export const KEY_PROFILE_PIC = "profilePic";
export const KEY_PUSH_TOKEN = "pushToken";
export const KEY_FITSENSE_ONBOARDING_SCREEN = "Onboarding";

var PUSH_ID = "";
var URM_ID = "";
export const BROWSER_PUSH_ID = "dBlcgVrQDn8:APA91bGYiaeTK47tnCe1kmqfDyxibLGXqG7fpOU3llFOGXZBaWrQoXu5dc0zIyqbJnrcMmhcLjI4esuOOJJRCrbAaV6R7J8u85z106R3ftwrkr3tOLFjoPhaJG_iQgj6W_XaLglU1j-6";



///  STATUS CODE ..

/**
 * File Contains Status code which are come from Servers for error and success.
 * CODE_E_ a short meaning 
 * CODE is the defination of comes from status code
 * E is for error code 
 * S for success
 */

export const CODE_E_INVALID_THAI_ID = '701002';
export const CODE_E_NO_MOBILE_NUMBER = '701003';
export const CODE_USER_ID_ALREADY_REGISTERED = '1113';
export const CODE_E_EMAIL_ID_ALREADY_REGISTERED = '1121';
// export const CODE_E_THAI_ID_INVALID_IN_FORGOT_PIN = '1208';
export const CODE_E_BLOCKED_THAI_ID = '1114';
export const CODE_E_USER_REGISTERD_AS_SCB_CUSTOMER = '1117';
export const CODE_E_USER_DIFF_USER_REGISTERD = '1149';
export const CODE_E_USER_REGISTERED_ON_ANOTHER_DEVICE = '1012';
// export const CODE_E_CANNOT_CONNECT_SERVER = '710002';
export const CODE_E_THAI_ID_INVALID_IN_FORGOT_PIN = '710002';

//used in copmparing push notification data for starting fitsensse screen
export const FITSENSE ="FitsensePage";
export const REGISTER ="RegisterUserPage";
export const FEEDBACK="FeedbackPage";
export const EMAIL="EmailVerificationPopupPage";
export const POLICY_DASHBOARD_FULL_VIEW="DashboardFullViewAccidentPage";
export const TOOL_TIPS_STATUS ="ToolTipsStatus";

//used in dynamic link and push notification 
export const DY_LINK_OBJ="dyLinkOBJ";


// My Account Settings 
export const KEY_NOTIFICATION_STATUS = "notificationStatus";
export const SESSION_TIME_OUT="SESSION TIME_OUT"
