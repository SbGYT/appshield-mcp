INSERT INTO sdk_rules (
  package_name,
  ecosystem,
  apple_data_types,
  apple_required_reasons,
  google_play_data_types,
  requires_ai_consent_modal,
  privacy_policy_keywords
) VALUES
(
  'openai',
  'npm',
  '[{"data_type":"NSPrivacyCollectedDataTypeOtherUserContent","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics","NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_TEXT_MESSAGES","response_id":"OTHER_IN_APP_MESSAGES","response_value":"TRUE"},{"question_id":"PSL_DATA_USAGE_OTHER_IN_APP_MESSAGES","response_id":"COLLECTION_AND_SHARING","response_value":"COLLECTED_AND_SHARED"},{"question_id":"PSL_DATA_PURPOSE_OTHER_IN_APP_MESSAGES","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"}]',
  1,
  '["OpenAI","AI","artificial intelligence","third-party AI"]'
),
(
  '@anthropic-ai/sdk',
  'npm',
  '[{"data_type":"NSPrivacyCollectedDataTypeOtherUserContent","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_TEXT_MESSAGES","response_id":"OTHER_IN_APP_MESSAGES","response_value":"TRUE"},{"question_id":"PSL_DATA_USAGE_OTHER_IN_APP_MESSAGES","response_id":"COLLECTION_AND_SHARING","response_value":"COLLECTED_AND_SHARED"},{"question_id":"PSL_DATA_PURPOSE_OTHER_IN_APP_MESSAGES","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"}]',
  1,
  '["Anthropic","Claude","AI","artificial intelligence"]'
),
(
  '@sentry/react-native',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeCrashData","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypePerformanceData","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategorySystemBootTime","reasons":["35F9.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]},{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_PERFORMANCE","response_id":"CRASH_LOGS","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_PERFORMANCE","response_id":"DIAGNOSTICS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_CRASH_LOGS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Sentry","crash reporting","diagnostics","error tracking"]'
),
(
  'react-native-purchases',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypePurchaseHistory","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_FINANCIAL","response_id":"PURCHASE_HISTORY","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_PURCHASE_HISTORY","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_PURCHASE_HISTORY","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["RevenueCat","in-app purchases","subscriptions","purchase history"]'
),
(
  'expo-notifications',
  'expo',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"APP_FUNCTIONALITY","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"DEVELOPER_COMMUNICATIONS","response_value":"TRUE"}]',
  0,
  '["push notifications","notifications","device token"]'
),
(
  'posthog-react-native',
  'react-native',
  '[{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryDiskSpace","reasons":["E174.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_APP_ACTIVITY","response_id":"APP_INTERACTIONS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_APP_INTERACTIONS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["PostHog","analytics","product analytics","usage data"]'
),
(
  'firebase_core',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeProductInteraction","linked":false,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]},{"api_type":"NSPrivacyAccessedAPICategoryFileTimestamp","reasons":["C617.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ANALYTICS","response_value":"TRUE"}]',
  0,
  '["Firebase","Google Firebase","analytics"]'
),
(
  'google_mobile_ads',
  'flutter',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]},{"data_type":"NSPrivacyCollectedDataTypeCoarseLocation","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising"]},{"data_type":"NSPrivacyCollectedDataTypeAdvertisingData","linked":false,"tracking":true,"purposes":["NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising","NSPrivacyCollectedDataTypePurposeAnalytics"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_LOCATION","response_id":"APPROXIMATE_LOCATION","response_value":"TRUE"}]',
  0,
  '["AdMob","Google Mobile Ads","advertising","personalized ads"]'
),
(
  'shared_preferences',
  'flutter',
  '[]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[]',
  0,
  '["local storage","preferences"]'
),
(
  'onesignal-expo-plugin',
  'expo',
  '[{"data_type":"NSPrivacyCollectedDataTypeDeviceID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality","NSPrivacyCollectedDataTypePurposeDeveloperAdvertising"]},{"data_type":"NSPrivacyCollectedDataTypeUserID","linked":true,"tracking":false,"purposes":["NSPrivacyCollectedDataTypePurposeAppFunctionality"]}]',
  '[{"api_type":"NSPrivacyAccessedAPICategoryUserDefaults","reasons":["CA92.1"]}]',
  '[{"question_id":"PSL_DATA_COLLECTION","response_id":"COLLECTS_DATA","response_value":"TRUE"},{"question_id":"PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS","response_id":"DEVICE_OR_OTHER_IDS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"DEVELOPER_COMMUNICATIONS","response_value":"TRUE"},{"question_id":"PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS","response_id":"ADVERTISING_OR_MARKETING","response_value":"TRUE"}]',
  0,
  '["OneSignal","push notifications","messaging"]'
);
