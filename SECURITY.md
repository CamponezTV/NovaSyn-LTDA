# 🔒 Guia de Segurança - NovaSyn

Este documento detalha todas as medidas de segurança implementadas no site da NovaSyn.

## 📋 Índice

1. [Proteção contra Ataques](#proteção-contra-ataques)
2. [Rate Limiting](#rate-limiting)
3. [Sanitização de Dados](#sanitização-de-dados)
4. [Headers de Segurança](#headers-de-segurança)
5. [Configuração Coolify](#configuração-coolify)
6. [Integração Brevo](#integração-brevo)
7. [Boas Práticas](#boas-práticas)

---

## 🛡️ Proteção contra Ataques

### XSS (Cross-Site Scripting)

**Implementado:**
- Sanitização de HTML em todos os inputs
- Content Security Policy (CSP)
- Escape de caracteres especiais
- Validação de URLs

**Arquivos:**
- `src/lib/security.ts` - Funções de sanitização
- `nginx.conf` - Headers CSP

### SQL Injection

**Implementado:**
- Detecção de padrões SQL maliciosos
- Validação de entrada
- Sem acesso direto a banco de dados (API Brevo)

**Arquivos:**
- `src/lib/security.ts` - `validateFormData()`

### CSRF (Cross-Site Request Forgery)

**Implementado:**
- Geração de tokens CSRF
- Validação constant-time
- SameSite cookies

**Arquivos:**
- `src/lib/security.ts` - `generateCsrfToken()`, `validateCsrfToken()`

### Clickjacking

**Implementado:**
- `X-Frame-Options: DENY`
- CSP `frame-ancestors 'none'`

**Arquivos:**
- `nginx.conf` - Headers de segurança

---

## ⏱️ Rate Limiting

### Implementação Client-Side

**Limites padrão:**
- 10 requisições por minuto
- 50 requisições por hora
- Baseado em fingerprint do navegador

**Arquivos:**
- `src/lib/rate-limit.ts` - Lógica de rate limiting
- `src/services/email.ts` - Integração com envio de emails

**Configuração:**
```env
VITE_ENABLE_RATE_LIMIT=true
VITE_MAX_REQUESTS_PER_MINUTE=10
VITE_MAX_REQUESTS_PER_HOUR=50
```

### Implementação Server-Side (Nginx)

**Limites:**
- API: 10 req/min (burst 5)
- Geral: 100 req/min (burst 20)
- Login: 5 req/min

**Arquivos:**
- `nginx.conf` - Zonas de rate limiting

---

## 🧹 Sanitização de Dados

### Funções Disponíveis

#### `sanitizeHtml(input: string)`
Remove/escapa caracteres HTML perigosos.

#### `sanitizeText(input: string, maxLength: number)`
Remove caracteres de controle e limita tamanho.

#### `isValidEmail(email: string)`
Valida formato e detecta padrões maliciosos.

#### `isValidPhone(phone: string)`
Valida números de telefone (10-15 dígitos).

#### `validateFormData(data: Record<string, any>)`
Valida e sanitiza todos os campos de um formulário.

#### `checkHoneypot(value: string)`
Detecta bots através de campo honeypot.

**Uso:**
```typescript
import { validateFormData, sanitizeHtml } from '@/lib/security';

const validation = validateFormData(formData);
if (validation.isValid) {
  const safe = validation.sanitized;
  // Use dados sanitizados
}
```

---

## 🔐 Headers de Segurança

### Content Security Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.brevo.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https: blob:;
connect-src 'self' https://api.brevo.com https://*.brevo.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests;
```

### Outros Headers

| Header | Valor | Propósito |
|--------|-------|-----------|
| X-Frame-Options | DENY | Previne clickjacking |
| X-Content-Type-Options | nosniff | Previne MIME sniffing |
| X-XSS-Protection | 1; mode=block | XSS protection (legacy) |
| Referrer-Policy | strict-origin-when-cross-origin | Controla referrer |
| Strict-Transport-Security | max-age=31536000 | Force HTTPS |
| Permissions-Policy | camera=(), microphone=() | Desabilita APIs |

**Arquivos:**
- `nginx.conf` - Configuração dos headers
- `src/config/security-headers.ts` - Documentação

---

## 🚀 Configuração Coolify

### 1. Criar Projeto no Coolify

1. Acesse o painel do Coolify
2. Crie um novo projeto
3. Conecte ao repositório GitHub

### 2. Variáveis de Ambiente

Configure no Coolify:

```env
# Brevo
VITE_BREVO_API_KEY=seu_api_key_aqui
VITE_RECIPIENT_EMAIL=contato@novasyn.com.br
VITE_SENDER_EMAIL=noreply@novasyn.com.br

# Security
VITE_ENABLE_RATE_LIMIT=true
VITE_MAX_REQUESTS_PER_MINUTE=10
VITE_MAX_REQUESTS_PER_HOUR=50
VITE_ENABLE_HONEYPOT=true
```

### 3. Build Configuration

**Build Command:**
```bash
npm ci && npm run build
```

**Start Command:**
```bash
nginx -g "daemon off;"
```

**Port:** 80

### 4. Nginx Custom Config

O arquivo `nginx.conf` será usado automaticamente pelo Coolify.

### 5. SSL/TLS

Coolify configura automaticamente:
- Let's Encrypt certificates
- Auto-renewal
- HTTPS redirect

### 6. Health Checks

Configure no Coolify:
- **Path:** `/`
- **Interval:** 30s
- **Timeout:** 3s
- **Retries:** 3

### 7. Resource Limits

Configure no Coolify:
- **CPU:** 1 core
- **Memory:** 512 MB
- **Restart Policy:** unless-stopped

---

## 📧 Integração Brevo

### Configuração da API

1. Crie conta em [Brevo](https://www.brevo.com/)
2. Vá em Settings → API Keys
3. Crie uma nova API key
4. Configure no Coolify como `VITE_BREVO_API_KEY`

### Configuração de Sender

1. Vá em Settings → Senders
2. Adicione e verifique `noreply@novasyn.com.br`
3. Configure SPF/DKIM records:

**SPF Record:**
```
v=spf1 include:spf.brevo.com ~all
```

**DKIM:** Brevo fornece as chaves no painel

### Template de Email

O email é enviado com:
- HTML estilizado
- Dados sanitizados
- Timestamp em horário de Brasília
- Proteção contra XSS

**Arquivo:** `src/services/email.ts`

### Rate Limiting Brevo

Brevo tem limites próprios:
- Free: 300 emails/dia
- Lite: 10,000 emails/mês
- Configure alertas no painel

### Monitoramento

Brevo fornece:
- Dashboard de envios
- Taxa de entrega
- Bounces e complaints
- Logs detalhados

---

## ✅ Boas Práticas

### Desenvolvimento

- ✅ Nunca comite `.env` com chaves reais
- ✅ Use `.env.example` como template
- ✅ Valide TODOS os inputs do usuário
- ✅ Sanitize antes de renderizar
- ✅ Use HTTPS em produção
- ✅ Mantenha dependências atualizadas

### Produção

- ✅ Configure todos os headers de segurança
- ✅ Use rate limiting server-side
- ✅ Monitor logs regularmente
- ✅ Faça backups regulares
- ✅ Configure alertas de segurança
- ✅ Use secrets management (não env vars para dados sensíveis)

### Monitoramento

**Ferramentas recomendadas:**
- [Security Headers](https://securityheaders.com/) - Teste headers
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Teste SSL/TLS
- [OWASP ZAP](https://www.zaproxy.org/) - Scan de vulnerabilidades
- Coolify built-in monitoring

### Atualizações de Segurança

**Mensal:**
```bash
npm audit
npm audit fix
npm outdated
```

**Docker:**
```bash
docker scan novasyn-web:latest
```

### Backup

**O que fazer backup:**
- Código fonte (já no GitHub)
- Variáveis de ambiente (documentar)
- Configurações do Coolify
- Logs importantes

---

## 🔍 Checklist de Deploy

Antes de fazer deploy no Coolify:

- [ ] Todas as env vars configuradas
- [ ] API key do Brevo válida
- [ ] Sender email verificado no Brevo
- [ ] SPF/DKIM configurados no DNS
- [ ] `nginx.conf` revisado
- [ ] Dockerfile testado localmente
- [ ] Rate limiting configurado
- [ ] Headers de segurança ativos
- [ ] SSL/TLS configurado
- [ ] Health checks funcionando
- [ ] Logs configurados
- [ ] Backup realizado
- [ ] Teste de envio de email funcionando
- [ ] Teste de rate limiting funcionando
- [ ] Scan de segurança executado

---

## 🆘 Troubleshooting

### Email não está sendo enviado

1. Verifique API key do Brevo
2. Confirme sender email verificado
3. Cheque logs do Coolify
4. Verifique rate limiting
5. Teste no console do Brevo

### Rate limiting muito agressivo

1. Ajuste `VITE_MAX_REQUESTS_PER_MINUTE`
2. Modifique zonas no `nginx.conf`
3. Monitore logs de 429 errors

### Headers não aparecem

1. Verifique `nginx.conf` carregado
2. Teste com `curl -I https://seu-site.com`
3. Limpe cache do CDN se usar

### Build falha no Coolify

1. Teste build localmente primeiro
2. Verifique logs do Coolify
3. Confirme todas as dependências no package.json
4. Verifique espaço em disco

---

## 📞 Contato

Para questões de segurança, entre em contato:
- Email: security@novasyn.com.br
- GitHub Issues (para não-críticos)

---

**Última atualização:** Novembro 2025
**Versão:** 1.0.0
