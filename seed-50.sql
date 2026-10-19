INSERT OR REPLACE INTO sdk_rules (
  package_name,
  ecosystem,
  apple_data_types,
  apple_required_reasons,
  google_play_data_types,
  requires_ai_consent_modal,
  privacy_policy_keywords
) VALUES
-- 1. React Native & Expo (18 SDKs)
(
  '@react-native-firebase/analytics',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeCoarseLocation","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_ACTIVITY","response_id":"APP_INTERACTIONS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_APP_INTERACTIONS","response_id":"ANALYTICS","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"}]',
  0,
  '["Firebase Analytics","Google Analytics","analytics","usage data"]'
),
(
  '@react-native-firebase/crashlytics',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeCrashData","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypePerformanceData","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]},{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_PERFORMANCE","response_id":"CRASH_LOGS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_CRASH_LOGS","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_CRASH_LOGS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Crashlytics","Firebase Crashlytics","crash reporting","crash logs"]'
),
(
  '@react-native-firebase/auth',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeEmailAddress","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypePhoneNumber","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PERSONAL_INFO","response_id":"EMAIL_ADDRESS","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PERSONAL_INFO","response_id":"USER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_USER_IDS","response_id":"ACCOUNT_MANAGEMENT","response_value":"TRUE"}]',
  0,
  '["Firebase Auth","authentication","email address","account"]'
),
(
  'expo-location',
  'expo',
  '[{"data_type":"NSPrivacyCollectedDataTypePreciseLocation","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeCoarseLocation","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_LOCATION","response_id":"PRECISE_LOCATION","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_LOCATION","response_id":"APPROXIMATE_LOCATION","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_PRECISE_LOCATION","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"}]',
  0,
  '["location","GPS","precise location","geographic location"]'
),
(
  'expo-camera',
  'expo',
  '[{"data_type":"NSPrivacyCollectedDataTypePhotosorVideos","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PHOTOS_AND_VIDEOS","response_id":"PHOTOS","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PHOTOS_AND_VIDEOS","response_id":"VIDEOS","response_value":"TRUE"}]',
  0,
  '["camera","photos","videos"]'
),
(
  'expo-contacts',
  'expo',
  '[{"data_type":"NSPrivacyCollectedDataTypeContacts","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_CONTACTS","response_id":"CONTACTS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_CONTACTS","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"}]',
  0,
  '["contacts","address book","phonebook"]'
),
(
  'expo-media-library',
  'expo',
  '[{"data_type":"NSPrivacyCollectedDataTypePhotosorVideos","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]},{"api_type":"NSPrivacyAccessedAPICategoryDiskSpace","reasons":["E174.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PHOTOS_AND_VIDEOS","response_id":"PHOTOS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_PHOTOS","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"}]',
  0,
  '["media library","photo library","gallery","photos"]'
),
(
  'expo-tracking-transparency',
  'expo',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"}]',
  0,
  '["App Tracking Transparency","IDFA","advertising identifier","tracking"]'
),
(
  'expo-secure-store',
  'expo',
  '[]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[]',
  0,
  '["secure storage","keychain","encrypted storage"]'
),
(
  'expo-file-system',
  'expo',
  '[]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]},{"api_type":"NSPrivacyAccessedAPICategoryDiskSpace","reasons":["E174.1"]}]',
  '[]',
  0,
  '["file system","local files","storage"]'
),
(
  'stripe-react-native',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypePaymentInfo","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypePurchaseHistory","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_FINANCIAL","response_id":"USER_PAYMENT_INFO","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_FINANCIAL","response_id":"PURCHASE_HISTORY","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_USER_PAYMENT_INFO","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_USER_PAYMENT_INFO","response_id":"FRAUD_PREVENTION","response_value":"TRUE"}]',
  0,
  '["Stripe","payment processing","payment information","credit card"]'
),
(
  'react-native-appsflyer',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeDeveloperAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeAdvertisingData","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypePurchaseHistory","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["AppsFlyer","attribution","advertising","marketing analytics"]'
),
(
  'react-native-adjust',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeAdvertisingData","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"}]',
  0,
  '["Adjust","mobile attribution","advertising","tracking"]'
),
(
  'react-native-onesignal',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeDeveloperAdvertising"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"DEVELOPER_COMMUNICATIONS","response_value":"TRUE"}]',
  0,
  '["OneSignal","push notifications","notifications"]'
),
(
  '@amplitude/analytics-react-native',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_ACTIVITY","response_id":"APP_INTERACTIONS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_APP_INTERACTIONS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Amplitude","product analytics","analytics","event tracking"]'
),
(
  'mixpanel-react-native',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeCoarseLocation","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_ACTIVITY","response_id":"APP_INTERACTIONS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_APP_INTERACTIONS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Mixpanel","analytics","usage analytics","user interactions"]'
),
(
  '@Datadog/mobile-react-native',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeCrashData","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypePerformanceData","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]},{"api_type":"NSPrivacyAccessedAPICategoryDiskSpace","reasons":["E174.1"]},{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_PERFORMANCE","response_id":"CRASH_LOGS","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_PERFORMANCE","response_id":"DIAGNOSTICS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DIAGNOSTICS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Datadog","monitoring","crash reporting","performance diagnostics"]'
),
(
  '@google/generative-ai',
  'npm',
  '[{"data_type":"NSPrivacyCollectedDataTypeOtherUserContent","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_TEXT_MESSAGES","response_id":"OTHER_IN_APP_MESSAGES","response_value":"TRUE"},{"question_id":"PSL_DATA_USAGE_OTHER_IN_APP_MESSAGES","response_id":"COLLECTION_AND_SHARING","response_value":"COLLECTED_AND_SHARED"},{"question_id":"PSL_DATA_PURPOSE_OTHER_IN_APP_MESSAGES","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"}]',
  1,
  '["Gemini","Google AI","Generative AI","AI","artificial intelligence"]'
),

-- 2. Flutter (pub.dev) (14 SDKs)
(
  'firebase_analytics',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_ACTIVITY","response_id":"APP_INTERACTIONS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_APP_INTERACTIONS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Firebase Analytics","Google Analytics","analytics"]'
),
(
  'firebase_crashlytics',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypeCrashData","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypePerformanceData","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]},{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_PERFORMANCE","response_id":"CRASH_LOGS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_CRASH_LOGS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Crashlytics","Firebase Crashlytics","crash logs","crash reporting"]'
),
(
  'firebase_auth',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypeEmailAddress","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PERSONAL_INFO","response_id":"EMAIL_ADDRESS","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PERSONAL_INFO","response_id":"USER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_USER_IDS","response_id":"ACCOUNT_MANAGEMENT","response_value":"TRUE"}]',
  0,
  '["Firebase Auth","authentication","user account","email"]'
),
(
  'firebase_messaging',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"DEVELOPER_COMMUNICATIONS","response_value":"TRUE"}]',
  0,
  '["Firebase Cloud Messaging","FCM","push notifications","notifications"]'
),
(
  'purchases_flutter',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypePurchaseHistory","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_FINANCIAL","response_id":"PURCHASE_HISTORY","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_PURCHASE_HISTORY","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"}]',
  0,
  '["RevenueCat","in-app purchases","subscriptions","purchase history"]'
),
(
  'sentry_flutter',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypeCrashData","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypePerformanceData","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]},{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_PERFORMANCE","response_id":"CRASH_LOGS","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_PERFORMANCE","response_id":"DIAGNOSTICS","response_value":"TRUE"}]',
  0,
  '["Sentry","crash reporting","error tracking","diagnostics"]'
),
(
  'geolocator',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypePreciseLocation","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeCoarseLocation","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_LOCATION","response_id":"PRECISE_LOCATION","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_LOCATION","response_id":"APPROXIMATE_LOCATION","response_value":"TRUE"}]',
  0,
  '["location","geolocation","GPS","precise location"]'
),
(
  'image_picker',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypePhotosorVideos","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PHOTOS_AND_VIDEOS","response_id":"PHOTOS","response_value":"TRUE"}]',
  0,
  '["camera","photos","photo library","images"]'
),
(
  'permission_handler',
  'flutter',
  '[]',
  '[]',
  '[]',
  0,
  '["device permissions","permissions"]'
),
(
  'flutter_secure_storage',
  'flutter',
  '[]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[]',
  0,
  '["secure storage","encrypted storage","keychain"]'
),
(
  'sqflite',
  'flutter',
  '[]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]},{"api_type":"NSPrivacyAccessedAPICategoryDiskSpace","reasons":["E174.1"]}]',
  '[]',
  0,
  '["local database","SQLite","local storage"]'
),
(
  'dio',
  'flutter',
  '[]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]}]',
  '[]',
  0,
  '["network requests","API communication"]'
),
(
  'package_info_plus',
  'flutter',
  '[]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]}]',
  '[]',
  0,
  '["app version","package information"]'
),
(
  'device_info_plus',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"}]',
  0,
  '["device information","device model","operating system"]'
),

-- 3. iOS & Android Native (8 SDKs)
(
  'Alamofire',
  'ios-native',
  '[]',
  '[{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]}]',
  '[]',
  0,
  '["network communication","HTTP requests"]'
),
(
  'AppsFlyerFramework',
  'ios-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeAdvertisingData","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"}]',
  0,
  '["AppsFlyer","attribution","advertising"]'
),
(
  'Adjust',
  'ios-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeAdvertisingData","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"}]',
  0,
  '["Adjust","attribution","advertising identifier"]'
),
(
  'AmplitudeSwift',
  'ios-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_ACTIVITY","response_id":"APP_INTERACTIONS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_APP_INTERACTIONS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Amplitude","analytics","product analytics"]'
),
(
  'BrazeKit',
  'ios-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics","NSPrivacyCollectedDataTypePurposeDeveloperAdvertising"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"DEVELOPER_COMMUNICATIONS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Braze","customer engagement","push notifications","marketing"]'
),
(
  'FacebookCore',
  'ios-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeAdvertisingData","linked":true,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":true,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"}]',
  0,
  '["Facebook","Meta","Facebook SDK","advertising","tracking"]'
),
(
  'GoogleSignIn',
  'ios-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeEmailAddress","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeName","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PERSONAL_INFO","response_id":"NAME","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_PERSONAL_INFO","response_id":"EMAIL_ADDRESS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_EMAIL_ADDRESS","response_id":"ACCOUNT_MANAGEMENT","response_value":"TRUE"}]',
  0,
  '["Google Sign-In","Google authentication","email address","profile"]'
),
(
  'com.facebook.android:facebook-android-sdk',
  'android-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_ACTIVITY","response_id":"APP_INTERACTIONS","response_value":"TRUE"}]',
  0,
  '["Facebook","Meta","Facebook SDK","advertising"]'
);
