import rawPlaceholders from '../data/placeholders.json';

export type PlaceholderDef = {
  type: string;
  default: string;
  description: string;
  options?: string[];
};

export type FieldGroup = {
  label: string;
  keys: string[];
};

// Support both structured { fields, groups } and legacy flat format
const raw = rawPlaceholders as Record<string, unknown>;
const defs: Record<string, PlaceholderDef> =
  (raw.fields as Record<string, PlaceholderDef>) || (rawPlaceholders as Record<string, PlaceholderDef>);
export const FIELD_GROUPS: FieldGroup[] =
  (raw.groups as FieldGroup[]) ||
  (Object.keys(defs).length > 0 ? [{ label: 'Settings', keys: Object.keys(defs) }] : []);

export { defs as placeholderDefs };

function getStorageKey(): string {
  if (typeof window === 'undefined') return 'f5xc-placeholders';
  const segment = window.location.pathname.split('/')[1] || 'default';
  return `f5xc-placeholders-${segment}`;
}

const cidrToMask: Record<string, string> = {
  '/24 (256 IPs)': '255.255.255.0',
  '/23 (512 IPs)': '255.255.254.0',
  '/22 (1024 IPs)': '255.255.252.0',
  '/21 (2048 IPs)': '255.255.248.0',
};

const cidrToShort: Record<string, string> = {
  '/24 (256 IPs)': '/24',
  '/23 (512 IPs)': '/23',
  '/22 (1024 IPs)': '/22',
  '/21 (2048 IPs)': '/21',
};

export function getDefaults(): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const [key, def] of Object.entries(defs)) {
    defaults[key] = def.default;
  }
  return defaults;
}

export function loadValues(): Record<string, string> {
  try {
    const stored = localStorage.getItem(getStorageKey());
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }
  return getDefaults();
}

export function saveValues(values: Record<string, string>) {
  localStorage.setItem(getStorageKey(), JSON.stringify(values));
}

export function clearValues() {
  localStorage.removeItem(getStorageKey());
}

export function getComputedValues(values: Record<string, string>): Record<string, string> {
  if (!defs.PROTECTED_CIDR_V4) return {};
  const cidr = values.PROTECTED_CIDR_V4 || '/24 (256 IPs)';
  const mask = cidrToMask[cidr] || '255.255.255.0';
  const short = cidrToShort[cidr] || '/24';
  const net = values.PROTECTED_NET_V4 || '192.0.2.0';
  return {
    PROTECTED_MASK_V4: mask,
    PROTECTED_PREFIX_V4: `${net}${short}`,
  };
}

export function getAllValues(values: Record<string, string>): Record<string, string> {
  return { ...values, ...getComputedValues(values) };
}

export function emitChange(values: Record<string, string>) {
  document.dispatchEvent(new CustomEvent('placeholder-change', { detail: getAllValues(values) }));
}
