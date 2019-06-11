export const routes = {
  sendOtp: {
    url: "public/mobile-easy/notification/v1/otp/"
  },
  mailOtp: {
    url: "public/mobile-easy/notification/v1/otp/email/"
  },
  verifyOtp: {
    url: "public/mobile-easy/notification/v1/otp"
  },
  customerInfo: {
    url: "public/mobile-easy/notification/v1/customer/"
  },
  changeEmail: {
    url: "public/mobile-easy/customers/v1/customer?field=email"
  },
  getSettings: {
    url: "public/mobile-easy/customers/v1/setting/"
  },
  setSettings: {
    url: "public/mobile-easy/customers/v1/updatesetting"
  },
  eLetterConsent: {
    url: "public/mobile-easy/customers/v1/eletter/consent"
  },
  prospectCustomer: {
    url: "public/mobile-easy/customers/v1/saveprospect"
  },
  sendFeedback: {
    url: "public/mobile-easy/customers/v1/savefeedback"
  },
  documentDownload: {
    url: "public/mobile-easy/documents/v1/download"
  },
  fitsenseRegisterUser: {
    url: "public/mobile-easy/notification/v1/fitSense/register"
  },
  rewardPoints: {
    url: "public/mobile-easy/notification/v1/fitSense/scbpoints"
  },
  fitsenseUserStatus: {
    url: "public/mobile-easy/v1/fitsense/status"
  },
  registerDevice: {
    url: "public/mobile-easy/users/v1/registerDevice"
  },
  getPhoneNumber: {
    //type is added every call depend on the condition wherever needed
    url: "public/mobile-easy/users/v1/register?type="
  },
  // registerUser: {
  //   url: "public/mobile-easy/users/v1/pin/update/?type=registration",
  //   header: {
  //     "X-IBM-Client-Id": "5e59296fe076f2ff4e94ce5aa1902f23",
  //     "Host": "apicapco-sit.scblife.co.th"
  //   }
  // },
  preAuthentication: {
    url: "public/api/auth/pre-authentication/v1"
  },
  oAuth: {
    url: "public/mobile-easy/OAuth/getToken"
  },
  setPin: {
    url: "public/mobile-easy/auth/v1/login/pin"
  },
  acknowledgeRef: {
    url: "public/mobile-easy/payments/v1/acknowledgerefid"
  },

  contactUsSales: {
    url: "public/api/salesforce/lead/v1"
  },

  logout: {
    url: "public/mobile-easy/auth/v1/login/?type=logout"
  },
  getPolicyDashboardData: {
    url: "public/mobile-easy/policies/v1/policydashboard/dashboard"
  },
  getPolicyList: {
    url: "public/mobile-easy/policies/v1/policydashboard/policies"
  },
  getPolicyByNumber: {
    url: "public/mobile-easy/policies/v1/policydashboard/policies/"
  },
  login: {
    url: "public/mobile-easy/auth/v1/login"
  },
  getLoggedUserInfo: {
    url: "public/mobile-easy/customers/v1/customer"
  },

  //claims routes
  getClaims: {
    url: "public/mobile-easy/claim/status/v1"
  },

  // CMS Routes...
  getPrivacyPolicy: {
    url: "public/mobile-easy/cms/v1/privacypolicy?_format=json"
  },
  getTermsAndConditions: {
    url: "public/mobile-easy/cms/v1/termsconditions?_format=json"
  },
  getTermsAndConditionsConsent: {
    url: "public/mobile-easy/cms/v1/termsconditions/email?_format=json"
  },
  getTermsAndConditionsLoans: {
    url: "public/mobile-easy/cms/v1/termsconditions/loansubmission"
  },
  getSecuritytips: {
    url: "public/mobile-easy/cms/v1/securitytips?_format=json"
  },
  getHospitallist: {
    url: "public/mobile-easy/cms/v1/hospitallist?_format=json"
  },
  getAboutus: {
    url: "public/mobile-easy/cms/v1/aboutus?_format=json"
  },
  getAvailableLoan: {
    url: "public/mobile-easy/loan/v1/dashboard"
  },
  confirmLoan: {
    url: "public/mobile-easy/loan/v1/confirm"
  },
  submitLoan: {
    url: "public/mobile-easy/loan/v1/register"
  },
  getPaymentDues: {
    url: "public/mobile-easy/payments/v1/payment/policies/"
  },
  getMultiplePoliciesPaymetDues: {
    url: "public/mobile-easy/payments/v1/payment/policies"
  },
  rewards: {
    url: "public/mobile-easy/cms/v1/rewards?_format=json"
  },
  challenges: {
    url: "public/mobile-easy/cms/v1/challenges?_format=json"
  },
  promotions: {
    url: "public/mobile-easy/cms/v1/promotional?_format=json"
  },
  weeklyContent: {
    url: "public/mobile-easy/cms/v1/weeklycontent?_format=json"
  },
  stories: {
    url: "public/mobile-easy/cms/v1/stories?_format=json"
  },
  qrcode: {
    url: "public/mobile-easy/payments/v1/qrcode"
  },
  paymentEasy: {
    url: "public/mobile-easy/scbpayment/v1/easynet/webpay"
  },
  updateCreditCard: {
    url: "public/mobile-easy/payments/v1/payment/update/creditcard"
  },
  acknowledgementRefId: {
    url: "public/mobile-easy/payments/v1/acknowledgerefid"
  },
  creditCardInfo: {
    url: "public/mobile-easy/payments/1/creditcardinfo"
  },
  emailTnC: {
    url: "public/mobile-easy/cms/v1/termsconditions/email?_format=json"
  },
  paymentTnC: {
    url: "public/mobile-easy/cms/v1/termsconditions/payment/creditcard?_format=json"
  },
  getActivityLog: {
    url: "public/mobile-easy/notification/v1/useractivity?"
  },
  outstandingLoan: {
    url: "public/mobile-easy/loan/v1/outstanding"
  },
  updateActivityLog:{
    url: "public/mobile-easy/notification/v1/useractivity"
  },
  loanRepayment:{
    url:"public/mobile-easy/payments/v1/loanrepayment"
  }
};
