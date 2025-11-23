// Rate limiting utility
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry>;
  private maxRequestsPerMinute: number;
  private maxRequestsPerHour: number;

  constructor(maxPerMinute = 10, maxPerHour = 50) {
    this.storage = new Map();
    this.maxRequestsPerMinute = maxPerMinute;
    this.maxRequestsPerHour = maxPerHour;
  }

  private getKey(identifier: string, window: 'minute' | 'hour'): string {
    return `${identifier}:${window}`;
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime) {
        this.storage.delete(key);
      }
    }
  }

  isAllowed(identifier: string): boolean {
    this.cleanup();
    const now = Date.now();

    // Check minute limit
    const minuteKey = this.getKey(identifier, 'minute');
    const minuteEntry = this.storage.get(minuteKey);

    if (minuteEntry) {
      if (now < minuteEntry.resetTime) {
        if (minuteEntry.count >= this.maxRequestsPerMinute) {
          return false;
        }
      } else {
        this.storage.delete(minuteKey);
      }
    }

    // Check hour limit
    const hourKey = this.getKey(identifier, 'hour');
    const hourEntry = this.storage.get(hourKey);

    if (hourEntry) {
      if (now < hourEntry.resetTime) {
        if (hourEntry.count >= this.maxRequestsPerHour) {
          return false;
        }
      } else {
        this.storage.delete(hourKey);
      }
    }

    return true;
  }

  recordRequest(identifier: string): void {
    const now = Date.now();

    // Record minute
    const minuteKey = this.getKey(identifier, 'minute');
    const minuteEntry = this.storage.get(minuteKey);

    if (minuteEntry && now < minuteEntry.resetTime) {
      minuteEntry.count++;
    } else {
      this.storage.set(minuteKey, {
        count: 1,
        resetTime: now + 60 * 1000, // 1 minute
      });
    }

    // Record hour
    const hourKey = this.getKey(identifier, 'hour');
    const hourEntry = this.storage.get(hourKey);

    if (hourEntry && now < hourEntry.resetTime) {
      hourEntry.count++;
    } else {
      this.storage.set(hourKey, {
        count: 1,
        resetTime: now + 60 * 60 * 1000, // 1 hour
      });
    }
  }

  getTimeUntilReset(identifier: string): number {
    const minuteKey = this.getKey(identifier, 'minute');
    const minuteEntry = this.storage.get(minuteKey);

    if (minuteEntry && minuteEntry.count >= this.maxRequestsPerMinute) {
      return Math.max(0, minuteEntry.resetTime - Date.now());
    }

    const hourKey = this.getKey(identifier, 'hour');
    const hourEntry = this.storage.get(hourKey);

    if (hourEntry && hourEntry.count >= this.maxRequestsPerHour) {
      return Math.max(0, hourEntry.resetTime - Date.now());
    }

    return 0;
  }
}

// Singleton instance
const maxPerMinute = parseInt(import.meta.env.VITE_MAX_REQUESTS_PER_MINUTE || '10');
const maxPerHour = parseInt(import.meta.env.VITE_MAX_REQUESTS_PER_HOUR || '50');
export const rateLimiter = new RateLimiter(maxPerMinute, maxPerHour);

// Get client identifier (IP would be better but not available in browser)
export function getClientIdentifier(): string {
  // Use multiple browser fingerprinting techniques
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
    !!window.sessionStorage,
    !!window.localStorage,
    canvas.toDataURL(),
  ].join('|');

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash.toString(36);
}
