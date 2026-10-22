const memoryStore = {};

export const storage = {
  getItem(key, defaultValue = null) {
    try {
      if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
        const raw = globalThis.localStorage.getItem(key);
        if (raw !== null) {
          return JSON.parse(raw);
        }
      }
      if (Object.prototype.hasOwnProperty.call(memoryStore, key)) {
        return memoryStore[key];
      }
    } catch {
      // Ignore storage read errors and return fallback
    }
    return defaultValue;
  },

  setItem(key, value) {
    try {
      memoryStore[key] = value;
      if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
        globalThis.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {
      // Ignore storage write errors
    }
  },

  removeItem(key) {
    try {
      delete memoryStore[key];
      if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
        globalThis.localStorage.removeItem(key);
      }
    } catch {
      // Ignore storage removal errors
    }
  },
};

export function formatINR(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return '₹0';
  }
  try {
    return '₹' + Math.round(num).toLocaleString('en-IN');
  } catch {
    return '₹' + Math.round(num).toString();
  }
}

export function calculateDiscount(originalPrice, price) {
  const orig = Number(originalPrice);
  const curr = Number(price);
  if (!Number.isFinite(orig) || !Number.isFinite(curr) || orig <= curr || orig <= 0) {
    return 0;
  }
  return Math.round(((orig - curr) / orig) * 100);
}

export function formatReviewCount(count) {
  const num = Number(count);
  if (!Number.isFinite(num) || num <= 0) {
    return '0';
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(num);
}

export function generateOrderId() {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `STY-${randomPart}`;
}
