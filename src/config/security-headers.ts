// Security Headers Configuration for Coolify deployment

export const securityHeaders = {
  // Content Security Policy - Prevents XSS attacks
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://api.brevo.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.brevo.com https://*.brevo.com https://www.gstatic.com blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; '),

  // Prevents clickjacking attacks
  'X-Frame-Options': 'DENY',

  // Prevents MIME type sniffing
  'X-Content-Type-Options': 'nosniff',

  // XSS Protection (legacy browsers)
  'X-XSS-Protection': '1; mode=block',

  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions Policy
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
    'payment=()',
    'usb=()'
  ].join(', '),

  // HSTS - Force HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // CORS - Restrict origins
  'Access-Control-Allow-Origin': process.env.VITE_ALLOWED_ORIGIN || 'https://novasyn.com.br',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Nginx configuration for Coolify
export const nginxConfig = `
# Security Headers
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://api.brevo.com https://static.cloudflareinsights.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.brevo.com https://*.brevo.com https://www.gstatic.com blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests" always;

# Rate Limiting
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/m;
limit_req_zone $binary_remote_addr zone=general_limit:10m rate=100r/m;

# Block common bot user agents
if ($http_user_agent ~* (bot|crawler|spider|scraper)) {
    return 403;
}

# Block suspicious patterns
location ~* (eval\\(|base64_decode|gzinflate|\\.\\./) {
    return 403;
}

# API rate limiting
location /api/ {
    limit_req zone=api_limit burst=5 nodelay;
    limit_req_status 429;
}

# General rate limiting
location / {
    limit_req zone=general_limit burst=20 nodelay;
    limit_req_status 429;
}

# Disable access to hidden files
location ~ /\\. {
    deny all;
    access_log off;
    log_not_found off;
}

# Disable access to sensitive files
location ~* \\.(env|git|gitignore|htaccess)$ {
    deny all;
    access_log off;
    log_not_found off;
}

# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

# Security: Hide Nginx version
server_tokens off;

# Timeout settings
client_body_timeout 10s;
client_header_timeout 10s;
keepalive_timeout 5s 5s;
send_timeout 10s;

# Buffer overflow prevention
client_body_buffer_size 1k;
client_header_buffer_size 1k;
client_max_body_size 1k;
large_client_header_buffers 2 1k;
`;

// Docker security recommendations for Coolify
export const dockerSecurityTips = `
# Dockerfile Security Best Practices

1. Use non-root user:
   RUN addgroup -S appgroup && adduser -S appuser -G appgroup
   USER appuser

2. Minimize image layers and use multi-stage builds

3. Don't include sensitive data in image

4. Use specific image versions (not 'latest')

5. Scan images for vulnerabilities:
   docker scan your-image:tag

6. Limit container resources in docker-compose.yml:
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
       reservations:
         cpus: '0.25'
         memory: 256M

7. Use read-only root filesystem when possible:
   read_only: true

8. Drop unnecessary capabilities:
   cap_drop:
     - ALL
   cap_add:
     - NET_BIND_SERVICE
`;
