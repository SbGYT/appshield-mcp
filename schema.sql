DROP TABLE IF EXISTS sdk_rules;
DROP TABLE IF EXISTS api_keys;
DROP TABLE IF EXISTS unlock_intents;

CREATE TABLE sdk_rules (
  package_name TEXT PRIMARY KEY,
  ecosystem TEXT,
  apple_data_types TEXT,
  apple_required_reasons TEXT,
  google_play_data_types TEXT,
  requires_ai_consent_modal INTEGER DEFAULT 0,
  privacy_policy_keywords TEXT
);

CREATE TABLE api_keys (
  key_hash TEXT PRIMARY KEY,
  plan TEXT,
  credits_remaining INTEGER DEFAULT 5,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE unlock_intents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  app_name TEXT,
  detected_sdks_count INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payment_id TEXT UNIQUE,
  order_id TEXT,
  buyer_email TEXT,
  iid TEXT,
  plan TEXT,
  amount_usd REAL,
  credits INTEGER,
  api_key TEXT,
  key_hash TEXT,
  payment_status TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

