# ✅ Checklist de Deploy - NovaSyn + Cloudflare

Use este checklist para garantir que todos os passos de configuração foram concluídos.

## 📋 Pré-Produção

### 1. Cloudflare Setup
- [ ] Conta Cloudflare criada
- [ ] Domínio novasyn.com.br adicionado ao Cloudflare
- [ ] Nameservers atualizados no Registro.br
- [ ] DNS propagado (verificar com `nslookup novasyn.com.br`)
- [ ] SSL/TLS configurado como **Full (strict)**
- [ ] Always Use HTTPS: **ON**
- [ ] HSTS ativo com preload

### 2. DNS Records (Cloudflare)
- [ ] A record @ → IP_DO_COOLIFY (☁️ Proxy ON)
- [ ] A record www → IP_DO_COOLIFY (☁️ Proxy ON)
- [ ] TXT @ → SPF record Brevo (☁️ Proxy OFF)
- [ ] TXT mail._domainkey → DKIM Brevo (☁️ Proxy OFF)
- [ ] TXT _dmarc → DMARC policy (☁️ Proxy OFF)
- [ ] MX @ → mx.brevo.com (☁️ Proxy OFF)

### 3. Cloudflare Performance
- [ ] Auto Minify ativo (CSS, JS, HTML)
- [ ] Brotli compression: **ON**
- [ ] Early Hints: **ON**
- [ ] Rocket Loader: **ON**
- [ ] Cache Rules criadas (3 regras):
  - [ ] Cache Everything para /assets/*
  - [ ] Bypass para /api/*
  - [ ] Cache static files (jpg, png, css, js, etc.)
- [ ] Browser Cache TTL: **4 hours**

### 4. Cloudflare Security
- [ ] Bot Fight Mode: **ON**
- [ ] Security Level: **Medium**
- [ ] Browser Integrity Check: **ON**
- [ ] Firewall Rules criadas:
  - [ ] Block malicious bots
  - [ ] Rate limiting contact form (5 req/5min)
  - [ ] Block SQL injection
  - [ ] Block XSS attempts
  - [ ] (Opcional) Geo-blocking (só Brasil)

### 5. Brevo Email
- [ ] Conta Brevo criada
- [ ] Sender noreply@novasyn.com.br verificado
- [ ] SPF record configurado
- [ ] DKIM record configurado
- [ ] DMARC record configurado
- [ ] API Key gerada
- [ ] Test email enviado e recebido

### 6. Google Analytics
- [ ] Conta Google Analytics 4 criada
- [ ] Property "NovaSyn" criada
- [ ] Data Stream configurado
- [ ] Measurement ID copiado (G-XXXXXXXXXX)
- [ ] Event tracking testado

## 🚀 Deploy no Coolify

### 7. Coolify Setup
- [ ] Servidor provisionado
- [ ] Coolify instalado e acessível
- [ ] IP do servidor anotado
- [ ] SSH access configurado
- [ ] Docker instalado

### 8. Aplicação no Coolify
- [ ] New Resource → Application criado
- [ ] GitHub repository conectado (CamponezTV/NovaSyn-LTDA)
- [ ] Branch: **main**
- [ ] Build command: `npm ci && npm run build`
- [ ] Start command: `nginx -g "daemon off;"`
- [ ] Port: **80**

### 9. Variáveis de Ambiente (Coolify)
- [ ] VITE_BREVO_API_KEY=xkeysib-xxxxx
- [ ] VITE_RECIPIENT_EMAIL=contato@novasyn.com.br
- [ ] VITE_SENDER_EMAIL=noreply@novasyn.com.br
- [ ] VITE_ENABLE_RATE_LIMIT=true
- [ ] VITE_MAX_REQUESTS_PER_MINUTE=10
- [ ] VITE_MAX_REQUESTS_PER_HOUR=50
- [ ] VITE_ENABLE_HONEYPOT=true
- [ ] CLOUDFLARE_ENABLED=true
- [ ] CLOUDFLARE_ZONE_ID=seu_zone_id
- [ ] CLOUDFLARE_API_TOKEN=seu_api_token
- [ ] VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
- [ ] VITE_SITE_URL=https://novasyn.com.br

### 10. Domínio e SSL (Coolify)
- [ ] Domain: novasyn.com.br adicionado
- [ ] Domain: www.novasyn.com.br adicionado
- [ ] Let's Encrypt SSL configurado
- [ ] SSL certificado válido
- [ ] HTTPS redirecionamento ativo

### 11. Resources e Limits (Coolify)
- [ ] CPU limit: **1 core**
- [ ] Memory limit: **512 MB**
- [ ] Memory reservation: **256 MB**
- [ ] Restart policy: **unless-stopped**
- [ ] Health check path: **/**
- [ ] Health check interval: **30s**

## 🧪 Testes Pós-Deploy

### 12. Testes Funcionais
- [ ] Site acessível via https://novasyn.com.br
- [ ] Site acessível via https://www.novasyn.com.br
- [ ] HTTP redireciona para HTTPS
- [ ] Certificado SSL válido (cadeado verde)
- [ ] Todas as seções carregam corretamente
- [ ] Navegação entre páginas funciona
- [ ] Formulário de contato envia email
- [ ] Email recebido no VITE_RECIPIENT_EMAIL
- [ ] Rate limiting funciona (testar 11 envios seguidos)
- [ ] Honeypot bloqueia bots

### 13. Testes de Performance
- [ ] Script: `.\test-cloudflare.ps1 -Domain novasyn.com.br`
- [ ] TTFB < 200ms ✅
- [ ] Header cf-ray presente ✅
- [ ] Header cf-cache-status presente ✅
- [ ] Compression Brotli ativo ✅
- [ ] GTmetrix Grade: **A** ✅
- [ ] PageSpeed Mobile: **>90** ✅
- [ ] PageSpeed Desktop: **>90** ✅

### 14. Testes de Segurança
- [ ] Security Headers Grade: **A+** (https://securityheaders.com)
- [ ] SSL Labs Grade: **A+** (https://www.ssllabs.com/ssltest/)
- [ ] Bot bloqueado (testar com User-Agent: sqlmap)
- [ ] SQL injection bloqueado
- [ ] XSS bloqueado
- [ ] Content Security Policy ativo

### 15. Testes de SEO
- [ ] Meta tags presentes (title, description, keywords)
- [ ] Open Graph tags presentes
- [ ] Twitter Cards presentes
- [ ] Schema.org JSON-LD presente
- [ ] Sitemap.xml acessível (https://novasyn.com.br/sitemap.xml)
- [ ] Robots.txt acessível (https://novasyn.com.br/robots.txt)
- [ ] Google Search Console verificado
- [ ] Sitemap submetido ao Google

### 16. Testes de Analytics
- [ ] Google Analytics rastreando (verificar Real-Time)
- [ ] Event form_submit funcionando
- [ ] Cloudflare Analytics mostrando tráfego
- [ ] Cache hit ratio > 85%

## 📊 Monitoramento Contínuo

### 17. Cloudflare Dashboard
- [ ] Bookmark: https://dash.cloudflare.com
- [ ] Verificar diariamente:
  - [ ] Requests blocked
  - [ ] Cache hit ratio
  - [ ] Bandwidth savings
  - [ ] Threats mitigated
- [ ] Alertas configurados:
  - [ ] Downtime detection
  - [ ] DDoS attack
  - [ ] SSL expiration

### 18. Google Analytics
- [ ] Bookmark: https://analytics.google.com
- [ ] Verificar semanalmente:
  - [ ] Usuários ativos
  - [ ] Páginas mais visitadas
  - [ ] Taxa de rejeição
  - [ ] Conversões (form_submit)
  - [ ] Origem do tráfego

### 19. Coolify Dashboard
- [ ] Verificar diariamente:
  - [ ] CPU usage < 80%
  - [ ] Memory usage < 80%
  - [ ] Logs sem erros
  - [ ] Uptime 99.9%+

### 20. Email Brevo
- [ ] Verificar diariamente:
  - [ ] Emails enviados
  - [ ] Taxa de entrega
  - [ ] Bounces
  - [ ] Créditos restantes

## 🎯 Otimizações Futuras

### 21. Imagens
- [ ] Converter logo_1.png para WebP (~80% menor)
- [ ] Converter fotos da equipe para WebP
- [ ] Criar og-image.png (1200x630px)
- [ ] Criar twitter-image.png (1200x600px)
- [ ] Implementar lazy loading avançado

### 22. Performance
- [ ] Implementar Service Worker avançado
- [ ] Cache offline para páginas críticas
- [ ] Preload critical resources
- [ ] Code splitting por rota
- [ ] Tree shaking otimizado

### 23. SEO
- [ ] Publicar blog (content marketing)
- [ ] Backlinks de qualidade
- [ ] Schema.org Article markup
- [ ] Internal linking strategy
- [ ] Alt texts otimizados

### 24. Analytics Avançado
- [ ] Heatmaps (Hotjar)
- [ ] Session recording
- [ ] Conversion funnel tracking
- [ ] A/B testing
- [ ] User feedback widget

## 🚨 Troubleshooting

### Problemas Comuns

**Site não carrega:**
- [ ] Verificar DNS propagou (nslookup)
- [ ] Verificar Coolify está rodando
- [ ] Verificar logs do container
- [ ] Verificar Cloudflare Proxy está ON

**Emails não chegam:**
- [ ] Verificar API Key Brevo válida
- [ ] Verificar sender verificado
- [ ] Verificar SPF/DKIM/DMARC
- [ ] Testar em https://mxtoolbox.com

**Performance ruim:**
- [ ] Verificar cache hit ratio Cloudflare
- [ ] Purge cache e testar novamente
- [ ] Verificar recursos do servidor Coolify
- [ ] Verificar logs de erro nginx

**Bot protection muito agressivo:**
- [ ] Ajustar Security Level para Low/Medium
- [ ] Revisar Firewall Rules
- [ ] Desativar temporariamente Bot Fight Mode
- [ ] Verificar User-Agent dos bots legítimos

## ✅ Deploy Completo!

Quando todos os checkboxes estiverem marcados, seu site está pronto para produção!

**Status Final:**
- [ ] **READY FOR PRODUCTION** ✅

---

**Última atualização:** 23 de novembro de 2025  
**Versão:** 1.0.0  
**Mantenedor:** Equipe NovaSyn
