# Configuração Cloudflare para NovaSyn

## 1. Configuração Inicial

### 1.1 Criar Conta e Adicionar Domínio
1. Acesse https://dash.cloudflare.com/sign-up
2. Clique em "Add a Site"
3. Digite: `novasyn.com.br`
4. Escolha plano: **Free** (R$ 0/mês)

### 1.2 Atualizar Nameservers
Cloudflare fornecerá 2 nameservers. Exemplo:
```
alice.ns.cloudflare.com
bob.ns.cloudflare.com
```

**No Registro.br:**
1. Acesse https://registro.br
2. Login → Meus Domínios → novasyn.com.br
3. DNS → Alterar Servidores DNS
4. Remova os nameservers atuais
5. Adicione os nameservers do Cloudflare
6. Aguarde 24-48h para propagação completa

### 1.3 Verificar Propagação
```bash
# Windows PowerShell
nslookup novasyn.com.br
```

Deve retornar IPs do Cloudflare (104.x.x.x ou 172.x.x.x)

## 2. Configuração DNS

### 2.1 Records Essenciais
Configure em: **DNS → Records**

| Type  | Name | Content              | Proxy | TTL  |
|-------|------|----------------------|-------|------|
| A     | @    | IP_DO_COOLIFY        | ✅    | Auto |
| A     | www  | IP_DO_COOLIFY        | ✅    | Auto |
| CNAME | *    | novasyn.com.br       | ✅    | Auto |
| TXT   | @    | v=spf1 include:_spf.brevo.com ~all | ❌ | Auto |
| TXT   | _dmarc | v=DMARC1; p=quarantine; rua=mailto:contato@novasyn.com.br | ❌ | Auto |

**Importante:** Proxy (☁️ laranja) = Ativado para performance e segurança

### 2.2 Email Records (Brevo)
Configure em: **DNS → Records**

| Type | Name              | Content                           | Proxy | TTL  |
|------|-------------------|-----------------------------------|-------|------|
| TXT  | mail._domainkey   | v=DKIM1; k=rsa; p=SUA_CHAVE_BREVO | ❌    | Auto |
| MX   | @                 | mx.brevo.com                      | ❌    | Auto |

**Obter chave DKIM:** Brevo → Settings → Senders & Domains → Add Domain

## 3. SSL/TLS

### 3.1 Configuração SSL
**SSL/TLS → Overview**
- Modo: **Full (strict)** ✅
  - Criptografa comunicação Cloudflare ↔️ Coolify
  - Requer certificado SSL válido no Coolify (Let's Encrypt)

### 3.2 Edge Certificates
**SSL/TLS → Edge Certificates**
- ✅ Always Use HTTPS: ON
- ✅ Automatic HTTPS Rewrites: ON
- ✅ Minimum TLS Version: TLS 1.2
- ✅ Opportunistic Encryption: ON
- ✅ TLS 1.3: ON
- ✅ HSTS: Enabled
  - Max Age: 12 months
  - Include subdomains: YES
  - Preload: YES

## 4. Speed (Performance)

### 4.1 Optimization
**Speed → Optimization**
- ✅ Auto Minify
  - ✅ JavaScript
  - ✅ CSS
  - ✅ HTML
- ✅ Brotli: ON
- ✅ Early Hints: ON
- ✅ Rocket Loader: ON (carrega JS assíncrono)
- ✅ Mirage: ON (otimiza imagens mobile)

### 4.2 Caching
**Caching → Configuration**

**Browser Cache TTL:** 4 hours
```
Controla quanto tempo arquivos ficam no cache do navegador
```

**Cache Rules:**
1. Criar regra: **Cache Everything**
```
Field: URI Path
Operator: starts with
Value: /assets/
Then: Cache Level: Cache Everything
Edge Cache TTL: 1 month
Browser Cache TTL: 1 month
```

2. Criar regra: **Bypass API**
```
Field: URI Path
Operator: starts with
Value: /api/
Then: Cache Level: Bypass
```

3. Criar regra: **Cache Static**
```
Field: File Extension
Operator: matches
Value: jpg,jpeg,png,gif,ico,css,js,svg,woff,woff2,ttf,eot,webp
Then: Cache Level: Cache Everything
Edge Cache TTL: 1 year
Browser Cache TTL: 1 year
```

### 4.3 Page Rules (Alternativa se Cache Rules não disponível)
**Rules → Page Rules**

1. `novasyn.com.br/assets/*`
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 month
   - Browser Cache TTL: 4 hours

2. `novasyn.com.br/api/*`
   - Cache Level: Bypass

3. `*.novasyn.com.br/*`
   - Always Use HTTPS: ON
   - Automatic HTTPS Rewrites: ON

## 5. Security

### 5.1 Firewall Rules
**Security → WAF**

**Criar Custom Rules:**

1. **Block Bots**
```
Field: User Agent
Operator: contains
Value: bot|crawler|spider|scraper
Action: Block
```

2. **Rate Limiting - Contact Form**
```
Field: URI Path
Operator: equals
Value: /api/contact
Then: 
- Rate limit: 5 requests per 5 minutes
- Action: Block
- Duration: 1 hour
```

3. **Block SQL Injection**
```
Field: URI Query String
Operator: contains
Value: union select|insert into|drop table
Action: Block
```

4. **Block XSS**
```
Field: URI Query String
Operator: contains
Value: <script|javascript:|onerror=
Action: Block
```

5. **Allow Brazil Only (Opcional)**
```
Field: Country
Operator: not equals
Value: BR
Action: Challenge (CAPTCHA)
```

### 5.2 Security Level
**Security → Settings**
- Security Level: **Medium** (recomendado)
- Challenge Passage: 30 minutes
- ✅ Browser Integrity Check: ON

### 5.3 Bot Fight Mode
**Security → Bots**
- ✅ Bot Fight Mode: ON (Free)
  - Bloqueia bots maliciosos automaticamente
  - Não afeta Google Bot, Bing Bot (bots bons)

## 6. Analytics e Monitoring

### 6.1 Web Analytics
**Analytics → Web Analytics**
- ✅ Enable Analytics: ON
- Métricas disponíveis:
  - Page views
  - Unique visitors
  - Bandwidth
  - Threats blocked
  - Response time

### 6.2 Real-Time Monitoring
**Analytics → Traffic**
- Monitorar em tempo real:
  - Requests per second
  - Bandwidth usage
  - Cache hit ratio (meta: >85%)
  - Origin response time

## 7. Variáveis de Ambiente

### 7.1 Atualizar .env no Coolify
Adicione variáveis relacionadas ao Cloudflare:

```bash
# Cloudflare Configuration
CLOUDFLARE_ENABLED=true
CLOUDFLARE_ZONE_ID=seu_zone_id_aqui
CLOUDFLARE_API_TOKEN=seu_api_token_aqui

# Trusted Proxies (para detectar IP real do usuário)
TRUSTED_PROXIES=173.245.48.0/20,103.21.244.0/22,103.22.200.0/22,103.31.4.0/22,141.101.64.0/18,108.162.192.0/18,190.93.240.0/20,188.114.96.0/20,197.234.240.0/22,198.41.128.0/17,162.158.0.0/15,104.16.0.0/13,104.24.0.0/14,172.64.0.0/13,131.0.72.0/22

# Real IP Headers
HTTP_CF_CONNECTING_IP=true
HTTP_X_FORWARDED_FOR=true
```

### 7.2 Obter Zone ID e API Token

**Zone ID:**
1. Dashboard Cloudflare → Selecione novasyn.com.br
2. Overview → API (coluna direita)
3. Copie **Zone ID**

**API Token:**
1. Profile → API Tokens → Create Token
2. Template: **Edit Zone DNS**
3. Permissions:
   - Zone - DNS - Edit
   - Zone - Cache Purge - Purge
4. Zone Resources: Include - Specific zone - novasyn.com.br
5. Create Token → Copie token (só aparece uma vez!)

## 8. Headers HTTP do Nginx

### 8.1 Detectar IP Real do Usuário
O Cloudflare adiciona headers especiais. Atualize `nginx.conf`:

```nginx
# Real IP Configuration (Cloudflare)
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;

real_ip_header CF-Connecting-IP;
```

### 8.2 Remover Headers Duplicados
Cloudflare já adiciona security headers. Remova do nginx para evitar duplicação:

```nginx
# REMOVER estas linhas (Cloudflare já adiciona):
# add_header Strict-Transport-Security ...
# add_header X-Frame-Options ...
# add_header X-Content-Type-Options ...
```

## 9. Testes e Validação

### 9.1 Teste de Performance
```bash
# Teste 1: Tempo de resposta
curl -w "@curl-format.txt" -o /dev/null -s https://novasyn.com.br

# Teste 2: Headers de segurança
curl -I https://novasyn.com.br

# Teste 3: Compressão
curl -H "Accept-Encoding: br, gzip" -I https://novasyn.com.br
```

**Espera-se:**
- ✅ Time to first byte (TTFB): <200ms
- ✅ Header `cf-cache-status: HIT` (cache funcionando)
- ✅ Header `content-encoding: br` (Brotli ativo)
- ✅ Header `cf-ray: ...` (Cloudflare ativo)

### 9.2 Ferramentas de Teste

**1. GTmetrix** (https://gtmetrix.com)
- Meta: Grade A, Performance Score >90%
- Verificar: TTFB, LCP, CLS, FID

**2. PageSpeed Insights** (https://pagespeed.web.dev)
- Meta: Score >90 (Mobile e Desktop)
- Verificar: Core Web Vitals

**3. Security Headers** (https://securityheaders.com)
- Meta: Grade A+
- Verificar: HSTS, CSP, X-Frame-Options

**4. SSL Labs** (https://www.ssllabs.com/ssltest/)
- Meta: Grade A+
- Verificar: TLS 1.3, HSTS, Certificate chain

### 9.3 Cache Hit Ratio
Monitorar no Dashboard Cloudflare:
- Meta: **>85%** cache hit ratio
- Se <85%: Revisar Cache Rules
- Se >95%: Excelente! 🎉

## 10. Troubleshooting

### 10.1 Cache não está funcionando
**Sintoma:** `cf-cache-status: MISS` sempre

**Soluções:**
1. Verificar Page Rules/Cache Rules criadas
2. Verificar se headers `Cache-Control` do Coolify permitem cache
3. Purge Cache: Caching → Configuration → Purge Everything

### 10.2 Site lento após Cloudflare
**Sintoma:** TTFB aumentou de 100ms para 500ms

**Soluções:**
1. Verificar SSL mode: Deve ser **Full (strict)**
2. Verificar se Rocket Loader não está quebrando JS
3. Desativar Mirage se imagens não carregam
4. Verificar response time no Coolify (pode ser servidor)

### 10.3 IP real do usuário não detectado
**Sintoma:** Rate limiting não funciona, todos requests vêm do mesmo IP

**Soluções:**
1. Adicionar `set_real_ip_from` ranges no nginx.conf
2. Usar `real_ip_header CF-Connecting-IP;`
3. Verificar se proxy (☁️ laranja) está ativo no DNS

### 10.4 Email não funciona após Cloudflare
**Sintoma:** Emails do Brevo não chegam

**Soluções:**
1. Verificar se MX/TXT records têm proxy **DESATIVADO** (☁️ cinza)
2. Verificar SPF record incluindo Brevo
3. Testar em: https://mxtoolbox.com

## 11. Custo-Benefício

### 11.1 Economia com Cloudflare Free
```
Bandwidth mensal: ~10GB (estimado 1000 visitas/mês)
Requests mensais: ~50.000

Sem Cloudflare:
- Bandwidth Coolify: R$ 50/mês (cobrado por GB)
- Total: R$ 50/mês

Com Cloudflare Free:
- Bandwidth Cloudflare: Ilimitado
- Bandwidth Coolify: ~1GB (cache 90%)
- Total: R$ 5/mês
- Economia: R$ 45/mês (90%)
```

### 11.2 Benefícios Adicionais (Grátis)
- ✅ DDoS Protection: Até 10Tbps
- ✅ SSL/TLS: Certificado grátis
- ✅ CDN: 300+ datacenters globais
- ✅ Bot Protection: Bloqueia 90% dos bots maliciosos
- ✅ Analytics: Métricas em tempo real
- ✅ Uptime: SLA 99.99%

**ROI:** Infinito (R$ 0 investido, R$ 45/mês economizado)

## 12. Próximos Passos

### Fase 1: Setup Inicial (Hoje)
1. ✅ Criar conta Cloudflare
2. ✅ Adicionar domínio novasyn.com.br
3. ✅ Atualizar nameservers no Registro.br
4. ⏳ Aguardar propagação (24-48h)

### Fase 2: Configuração (Dia 2)
1. ✅ Configurar DNS records
2. ✅ Ativar SSL Full (strict)
3. ✅ Configurar Cache Rules
4. ✅ Ativar Auto Minify + Brotli

### Fase 3: Segurança (Dia 3)
1. ✅ Criar Firewall Rules (bots, rate limiting)
2. ✅ Ativar Bot Fight Mode
3. ✅ Configurar HSTS
4. ✅ Atualizar nginx.conf (real IP)

### Fase 4: Otimização (Dia 4)
1. ✅ Testar performance (GTmetrix, PageSpeed)
2. ✅ Ajustar Cache Rules baseado em analytics
3. ✅ Monitorar cache hit ratio
4. ✅ Purge cache se necessário

### Fase 5: Monitoramento (Contínuo)
1. 📊 Verificar Web Analytics diariamente
2. 📊 Monitorar cache hit ratio (meta >85%)
3. 📊 Revisar threats blocked
4. 📊 Otimizar baseado em dados

## 13. Checklist Final

Antes de marcar como concluído, verificar:

- [ ] Nameservers atualizados no Registro.br
- [ ] DNS propagado (nslookup retorna IP Cloudflare)
- [ ] SSL mode: Full (strict) ativo
- [ ] Always Use HTTPS: ON
- [ ] Cache Rules criadas (3 regras)
- [ ] Auto Minify ativo (CSS, JS, HTML)
- [ ] Brotli ativo
- [ ] Firewall Rules criadas (5 regras)
- [ ] Bot Fight Mode: ON
- [ ] Real IP configurado no nginx.conf
- [ ] Security headers removidas do nginx (duplicação)
- [ ] Zone ID e API Token no .env do Coolify
- [ ] Teste GTmetrix: Grade A
- [ ] Teste PageSpeed: >90
- [ ] Teste Security Headers: Grade A+
- [ ] Cache hit ratio: >85%
- [ ] Emails funcionando (Brevo)

## 14. Suporte

**Documentação Cloudflare:**
- https://developers.cloudflare.com

**Comunidade:**
- https://community.cloudflare.com

**Status:**
- https://www.cloudflarestatus.com

**Emergência:**
- Purge Cache: Dashboard → Caching → Purge Everything
- Development Mode: Dashboard → Caching → Development Mode (desativa cache por 3h)
