export interface AppleDataTypeEntry {
  data_type: string;
  linked: boolean;
  tracking: boolean;
  purposes: string[];
}

export interface AppleRequiredReasonEntry {
  api_type: string;
  reasons: string[];
}

export interface GooglePlayDataEntry {
  question_id: string;
  response_id: string;
  response_value: string;
}

export interface SdkRule {
  package_name: string;
  ecosystem: string;
  apple_data_types: string;
  apple_required_reasons: string;
  google_play_data_types: string;
  requires_ai_consent_modal: number;
  privacy_policy_keywords: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function safeParseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function generateApplePrivacyManifestXml(sdks: SdkRule[]): string {
  const dataTypesMap = new Map<
    string,
    { linked: boolean; tracking: boolean; purposes: Set<string> }
  >();
  const requiredReasonsMap = new Map<string, Set<string>>();
  let usesTracking = false;

  for (const sdk of sdks) {
    const parsedDataTypes = safeParseJson<AppleDataTypeEntry[]>(
      sdk.apple_data_types,
      []
    );
    for (const entry of parsedDataTypes) {
      if (!entry || !entry.data_type) continue;
      if (entry.tracking) {
        usesTracking = true;
      }
      const existing = dataTypesMap.get(entry.data_type);
      if (existing) {
        existing.linked = existing.linked || Boolean(entry.linked);
        existing.tracking = existing.tracking || Boolean(entry.tracking);
        for (const purpose of entry.purposes || []) {
          existing.purposes.add(purpose);
        }
      } else {
        dataTypesMap.set(entry.data_type, {
          linked: Boolean(entry.linked),
          tracking: Boolean(entry.tracking),
          purposes: new Set(entry.purposes || []),
        });
      }
    }

    const parsedReasons = safeParseJson<AppleRequiredReasonEntry[]>(
      sdk.apple_required_reasons,
      []
    );
    for (const reasonEntry of parsedReasons) {
      if (!reasonEntry || !reasonEntry.api_type) continue;
      let reasonSet = requiredReasonsMap.get(reasonEntry.api_type);
      if (!reasonSet) {
        reasonSet = new Set<string>();
        requiredReasonsMap.set(reasonEntry.api_type, reasonSet);
      }
      for (const code of reasonEntry.reasons || []) {
        reasonSet.add(code);
      }
    }
  }

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    "<dict>",
    "\t<key>NSPrivacyTracking</key>",
    usesTracking ? "\t<true/>" : "\t<false/>",
    "\t<key>NSPrivacyTrackingDomains</key>",
    "\t<array/>",
    "\t<key>NSPrivacyCollectedDataTypes</key>",
  ];

  if (dataTypesMap.size === 0) {
    lines.push("\t<array/>");
  } else {
    lines.push("\t<array>");
    for (const [dataType, config] of dataTypesMap.entries()) {
      lines.push("\t\t<dict>");
      lines.push("\t\t\t<key>NSPrivacyCollectedDataType</key>");
      lines.push(`\t\t\t<string>${escapeXml(dataType)}</string>`);
      lines.push("\t\t\t<key>NSPrivacyCollectedDataTypeLinked</key>");
      lines.push(config.linked ? "\t\t\t<true/>" : "\t\t\t<false/>");
      lines.push("\t\t\t<key>NSPrivacyCollectedDataTypeTracking</key>");
      lines.push(config.tracking ? "\t\t\t<true/>" : "\t\t\t<false/>");
      lines.push("\t\t\t<key>NSPrivacyCollectedDataTypePurposes</key>");
      lines.push("\t\t\t<array>");
      for (const purpose of config.purposes) {
        lines.push(`\t\t\t\t<string>${escapeXml(purpose)}</string>`);
      }
      lines.push("\t\t\t</array>");
      lines.push("\t\t</dict>");
    }
    lines.push("\t</array>");
  }

  lines.push("\t<key>NSPrivacyAccessedAPITypes</key>");
  if (requiredReasonsMap.size === 0) {
    lines.push("\t<array/>");
  } else {
    lines.push("\t<array>");
    for (const [apiType, reasons] of requiredReasonsMap.entries()) {
      lines.push("\t\t<dict>");
      lines.push("\t\t\t<key>NSPrivacyAccessedAPIType</key>");
      lines.push(`\t\t\t<string>${escapeXml(apiType)}</string>`);
      lines.push("\t\t\t<key>NSPrivacyAccessedAPITypeReasons</key>");
      lines.push("\t\t\t<array>");
      for (const reason of reasons) {
        lines.push(`\t\t\t\t<string>${escapeXml(reason)}</string>`);
      }
      lines.push("\t\t\t</array>");
      lines.push("\t\t</dict>");
    }
    lines.push("\t</array>");
  }

  lines.push("</dict>");
  lines.push("</plist>");

  return lines.join("\n");
}

function escapeCsvCell(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function generateGooglePlayCsv(sdks: SdkRule[]): string {
  const rows: string[] = ["Question ID,Response ID,Response Value"];
  const seenKeys = new Set<string>();

  for (const sdk of sdks) {
    const entries = safeParseJson<GooglePlayDataEntry[]>(
      sdk.google_play_data_types,
      []
    );
    for (const entry of entries) {
      if (!entry || !entry.question_id) continue;
      const compositeKey = `${entry.question_id}|${entry.response_id}|${entry.response_value}`;
      if (!seenKeys.has(compositeKey)) {
        seenKeys.add(compositeKey);
        rows.push(
          `${escapeCsvCell(entry.question_id)},${escapeCsvCell(
            entry.response_id
          )},${escapeCsvCell(entry.response_value)}`
        );
      }
    }
  }

  if (seenKeys.size === 0) {
    rows.push("PSL_DATA_COLLECTION,COLLECTS_DATA,FALSE");
  }

  return rows.join("\n");
}

export interface AppleNutritionLabelItem {
  data_type: string;
  category: "Data Used to Track You" | "Data Linked to You" | "Data Not Linked to You";
  linked_to_identity: boolean;
  used_for_tracking: boolean;
  purposes: string[];
  source_sdks: string[];
}

export function generateAppleNutritionLabelsGuide(sdks: SdkRule[]): {
  requires_att_prompt: boolean;
  items: AppleNutritionLabelItem[];
  markdown_summary: string;
} {
  const merged = new Map<
    string,
    {
      linked: boolean;
      tracking: boolean;
      purposes: Set<string>;
      sdks: Set<string>;
    }
  >();

  for (const sdk of sdks) {
    const parsedDataTypes = safeParseJson<AppleDataTypeEntry[]>(
      sdk.apple_data_types,
      []
    );
    for (const entry of parsedDataTypes) {
      if (!entry || !entry.data_type) continue;
      let existing = merged.get(entry.data_type);
      if (!existing) {
        existing = {
          linked: false,
          tracking: false,
          purposes: new Set<string>(),
          sdks: new Set<string>(),
        };
        merged.set(entry.data_type, existing);
      }
      existing.linked = existing.linked || Boolean(entry.linked);
      existing.tracking = existing.tracking || Boolean(entry.tracking);
      for (const p of entry.purposes || []) {
        existing.purposes.add(p);
      }
      existing.sdks.add(sdk.package_name);
    }
  }

  const items: AppleNutritionLabelItem[] = [];
  let requiresAtt = false;

  for (const [dataType, info] of merged.entries()) {
    if (info.tracking) requiresAtt = true;
    const category = info.tracking
      ? "Data Used to Track You"
      : info.linked
      ? "Data Linked to You"
      : "Data Not Linked to You";

    items.push({
      data_type: dataType,
      category,
      linked_to_identity: info.linked,
      used_for_tracking: info.tracking,
      purposes: Array.from(info.purposes),
      source_sdks: Array.from(info.sdks),
    });
  }

  const mdLines: string[] = [
    "# Apple App Store Privacy Nutrition Labels Guide",
    "",
    `- **App Tracking Transparency (ATT) Required**: ${requiresAtt ? "YES" : "NO"}`,
    `- **Total Declared Data Types**: ${items.length}`,
    "",
  ];

  for (const item of items) {
    mdLines.push(`## ${item.data_type}`);
    mdLines.push(`- **Section**: ${item.category}`);
    mdLines.push(`- **Linked to User Identity**: ${item.linked_to_identity ? "Yes" : "No"}`);
    mdLines.push(`- **Used for Tracking**: ${item.used_for_tracking ? "Yes" : "No"}`);
    mdLines.push(`- **Purposes**: ${item.purposes.join(", ")}`);
    mdLines.push(`- **Triggered by SDKs**: ${item.source_sdks.join(", ")}`);
    mdLines.push("");
  }

  return {
    requires_att_prompt: requiresAtt,
    items,
    markdown_summary: mdLines.join("\n"),
  };
}
