// Input sanitization utilities

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Additional checks
  if (!emailRegex.test(email)) return false;
  if (email.length > 254) return false; // RFC 5321
  
  const [localPart, domain] = email.split('@');
  if (localPart.length > 64) return false; // RFC 5321
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /<script/i,
    /onerror=/i,
    /onclick=/i,
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(email)) return false;
  }
  
  return true;
}

/**
 * Validate phone number (WhatsApp format)
 */
export function isValidPhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check length (10-15 digits for international numbers)
  if (cleaned.length < 10 || cleaned.length > 15) return false;
  
  // Check for suspicious patterns (all same digits)
  if (/^(\d)\1+$/.test(cleaned)) return false;
  
  return true;
}

/**
 * Sanitize general text input
 */
export function sanitizeText(input: string, maxLength = 1000): string {
  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');
  
  // Limit length
  sanitized = sanitized.substring(0, maxLength);
  
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  return sanitized.trim();
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    
    // Only allow http and https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    
    // Check for dangerous patterns
    const dangerousPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /<script/i,
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(url)) return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate and sanitize form data
 */
export function validateFormData(data: Record<string, any>): {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized: Record<string, any>;
} {
  const errors: Record<string, string> = {};
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Sanitize string values
      sanitized[key] = sanitizeText(value);
      
      // Validate specific fields
      if (key === 'email' && !isValidEmail(value)) {
        errors[key] = 'Email inválido';
      }
      
      if ((key === 'whatsapp' || key === 'phone') && !isValidPhone(value)) {
        errors[key] = 'Telefone inválido';
      }
      
      // Check for SQL injection patterns
      const sqlPatterns = [
        /(\bunion\b.*\bselect\b)/i,
        /(\bselect\b.*\bfrom\b)/i,
        /(\binsert\b.*\binto\b)/i,
        /(\bdelete\b.*\bfrom\b)/i,
        /(\bdrop\b.*\btable\b)/i,
        /(\bupdate\b.*\bset\b)/i,
        /(--|;|\/\*|\*\/)/,
      ];
      
      for (const pattern of sqlPatterns) {
        if (pattern.test(value)) {
          errors[key] = 'Conteúdo inválido detectado';
          break;
        }
      }
    } else {
      sanitized[key] = value;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

/**
 * Check for honeypot (anti-bot)
 */
export function checkHoneypot(honeypotValue: string): boolean {
  // Honeypot should always be empty (filled only by bots)
  return honeypotValue === '';
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate CSRF token
 */
export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  if (token.length !== storedToken.length) return false;
  
  // Constant-time comparison to prevent timing attacks
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i);
  }
  
  return result === 0;
}
