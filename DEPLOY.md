# 🚀 Deploy no Coolify - Nova Syn

Guia completo para fazer deploy do site Nova Syn no Coolify com máxima segurança.

## 📋 Pré-requisitos

- [ ] Conta no Coolify configurada
- [ ] Domínio registrado (ex: novasyn.com.br)
- [ ] Conta Brevo ativa com API key
- [ ] Sender email verificado no Brevo
- [ ] DNS configurado

## 🔧 Passo 1: Configuração do Cloudflare

**⚠️ IMPORTANTE:** Configure o Cloudflare ANTES do Coolify para melhor performance e segurança.

### 1.1 Criar conta e adicionar domínio

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com/sign-up)
2. Clique em **Add a Site**
3. Digite: `novasyn.com.br`
4. Escolha plano: **Free** (R$ 0/mês)
5. Siga o wizard de configuração

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
4. Substitua pelos nameservers do Cloudflare
5. Aguarde 24-48h para propagação

**Verificar propagação:**
```powershell
nslookup novasyn.com.br
```
Deve retornar IPs do Cloudflare (104.x.x.x ou 172.x.x.x)

### 1.3 Configurar DNS Records no Cloudflare

**IMPORTANTE:** Configure após obter IP do Coolify (Passo 3)

```
# A Records - Proxy ATIVO (☁️ laranja)
A     @     IP_DO_COOLIFY     ✅ Proxied
A     www   IP_DO_COOLIFY     ✅ Proxied

# SPF Record - Proxy DESATIVADO (☁️ cinza)
TXT   @     v=spf1 include:_spf.brevo.com ~all     ❌ DNS Only

# DKIM Record - Proxy DESATIVADO (☁️ cinza)
TXT   mail._domainkey   (copie do Brevo)     ❌ DNS Only

# DMARC Record - Proxy DESATIVADO (☁️ cinza)
TXT   _dmarc   v=DMARC1; p=quarantine; rua=mailto:contato@novasyn.com.br     ❌ DNS Only

# MX Record - Proxy DESATIVADO (☁️ cinza)
MX    @     mx.brevo.com     ❌ DNS Only
```

**Dica:** Consulte `cloudflare.md` para configuração completa de segurança e performance.

**Tempo de propagação:** 5-15 minutos (Cloudflare é muito rápido!)

## 📧 Passo 2: Configuração do Brevo

### 2.1 Criar conta e verificar email

1. Acesse [Brevo](https://www.brevo.com/)
2. Crie uma conta
3. Vá em **Settings → Senders**
4. Adicione `noreply@novasyn.com.br`
5. Verifique o email clicando no link enviado

### 2.2 Configurar SPF e DKIM

1. Vá em **Settings → Senders**
2. Clique no sender adicionado
3. Configure os registros DNS conforme instruções
4. Aguarde verificação (pode levar algumas horas)

### 2.3 Obter API Key

1. Vá em **Settings → API Keys**
2. Clique em **Create a new API key**
3. Nome: `NovaSyn Production`
4. Versão: `v3`
5. Copie a chave (só será mostrada uma vez!)

## 🏗️ Passo 3: Configuração no Coolify

### 3.1 Criar novo projeto

1. Acesse o painel do Coolify
2. Clique em **New Project**
3. Nome: `Nova Syn Website`
4. Clique em **Create**

### 3.2 Adicionar aplicação

1. Clique em **New Resource**
2. Selecione **Application**
3. Escolha **GitHub**
4. Selecione o repositório: `CamponezTV/NovaSyn-LTDA`
5. Branch: `main`

### 3.3 Configurar build

**Build Pack:** Docker

**Dockerfile location:** `./Dockerfile`

**Build Command:**
```bash
npm ci && npm run build
```

**Start Command:**
```bash
nginx -g "daemon off;"
```

**Port:** `80`

### 3.4 Configurar variáveis de ambiente

No Coolify, vá em **Environment Variables** e adicione:

```env
# Brevo Configuration
VITE_BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_RECIPIENT_EMAIL=contato@novasyn.com.br
VITE_SENDER_EMAIL=noreply@novasyn.com.br

# Security Settings
VITE_ENABLE_RATE_LIMIT=true
VITE_MAX_REQUESTS_PER_MINUTE=10
VITE_MAX_REQUESTS_PER_HOUR=50
VITE_ENABLE_HONEYPOT=true

# Environment
NODE_ENV=production
```

**⚠️ IMPORTANTE:** Marque todas as variáveis como **Secret** (ícone do olho)

### 3.5 Configurar domínio

1. Vá em **Domains**
2. Adicione: `novasyn.com.br`
3. Adicione: `www.novasyn.com.br`
4. Ative **Force HTTPS**
5. Ative **Generate SSL Certificate** (Let's Encrypt automático)

### 3.6 Configurar recursos

**Resources:**
- **CPU:** 1 core
- **Memory:** 512 MB
- **Storage:** 2 GB

**Restart Policy:** `unless-stopped`

### 3.7 Health Check

**Path:** `/`
**Port:** `80`
**Interval:** `30s`
**Timeout:** `3s`
**Retries:** `3`

## 🔒 Passo 4: Verificação de Segurança

### 4.1 Teste local antes do deploy

```bash
# Instalar dependências
npm install

# Rodar security check
npm run security:audit
npm run security:check

# Build e teste
npm run build
npm run preview
```

### 4.2 Testar email localmente

1. Copie `.env.example` para `.env`
2. Adicione sua API key do Brevo
3. Execute `npm run dev`
4. Teste o formulário de waitlist
5. Verifique se recebeu o email

### 4.3 Verificar headers de segurança

Após deploy, teste em:
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

**Resultado esperado:** Grade A ou A+ em todos

## 🚀 Passo 5: Deploy

### 5.1 Fazer commit das mudanças

```bash
git add .
git commit -m "chore: setup production configuration"
git push origin main
```

### 5.2 Deploy no Coolify

1. No Coolify, vá na aplicação
2. Clique em **Deploy**
3. Aguarde o build terminar (5-10 minutos)
4. Verifique os logs para erros

### 5.3 Verificar deploy

Acesse `https://novasyn.com.br` e verifique:

- [ ] Site carrega corretamente
- [ ] SSL ativo (cadeado verde)
- [ ] Todas as páginas funcionando
- [ ] Formulário de waitlist funciona
- [ ] Email é recebido no Brevo
- [ ] Rate limiting ativo (teste enviando múltiplos forms)
- [ ] Headers de segurança ativos (use curl)

## 🔍 Passo 6: Monitoramento

### 6.1 Logs no Coolify

1. Vá em **Logs**
2. Ative **Real-time logs**
3. Monitore erros

### 6.2 Dashboard do Brevo

1. Acesse Brevo dashboard
2. Vá em **Statistics**
3. Monitore:
   - Emails enviados
   - Taxa de entrega
   - Bounces
   - Complaints

### 6.3 Alertas

Configure no Coolify:
- **Health Check Failed** → Notificação por email
- **High CPU Usage** → Alert
- **High Memory Usage** → Alert

### 6.4 Uptime Monitoring

Use serviços externos:
- [UptimeRobot](https://uptimerobot.com/) - Free
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

## 🛠️ Troubleshooting

### Deploy falha

**Erro:** `npm ci failed`
```bash
# Solução: Limpar cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Erro:** `nginx: [emerg] bind() to 0.0.0.0:80 failed`
```bash
# Solução: Porta já em uso
# Verifique conflitos de porta no Coolify
```

### SSL não ativa

1. Verifique DNS propagação: [DNS Checker](https://dnschecker.org/)
2. Aguarde 15-30 minutos
3. Force regeneração no Coolify
4. Verifique se porta 80 e 443 estão abertas

### Email não envia

1. Verifique API key no Brevo
2. Confirme sender email verificado
3. Cheque logs do Coolify
4. Teste rate limiting (aguarde 1 minuto)
5. Verifique SPF/DKIM no DNS

### Rate limiting muito agressivo

```env
# Ajuste no Coolify:
VITE_MAX_REQUESTS_PER_MINUTE=20
VITE_MAX_REQUESTS_PER_HOUR=100
```

Depois, redeploy.

### Site lento

1. Verifique recursos no Coolify (CPU/Memory)
2. Aumente limites se necessário
3. Verifique CDN (Cloudflare recomendado)
4. Otimize imagens

## 📊 Otimizações Pós-Deploy

### 1. CDN (Cloudflare)

1. Crie conta no [Cloudflare](https://www.cloudflare.com/)
2. Adicione domínio
3. Aponte nameservers
4. Ative:
   - Auto Minify (CSS, JS, HTML)
   - Brotli compression
   - Rocket Loader
   - HTTP/3
   - Caching Level: Standard

### 2. Monitoramento de Performance

Use [Google PageSpeed Insights](https://pagespeed.web.dev/):
- Meta: Score > 90
- Core Web Vitals: Todos verdes

### 3. Analytics

Configure:
- Google Analytics 4
- Google Search Console
- Plausible Analytics (privacy-friendly)

### 4. Backups

Configure no Coolify:
- **Backup Frequency:** Daily
- **Retention:** 7 days
- **Include:** Config + Environment Variables

## 🔄 CI/CD Automático

### GitHub Actions (Opcional)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Coolify

on:
  push:
    branches: [main]

jobs:
  security-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm audit --audit-level=high
      - run: npm run build:check
      - run: npm test

  deploy:
    needs: security-check
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Coolify Deploy
        run: |
          curl -X POST ${{ secrets.COOLIFY_WEBHOOK_URL }}
```

Configure no Coolify:
- Vá em **Webhooks**
- Copie URL
- Adicione como secret no GitHub: `COOLIFY_WEBHOOK_URL`

## ✅ Checklist Final

Antes de considerar deploy completo:

- [ ] Site acessível via HTTPS
- [ ] SSL válido (A+ no SSL Labs)
- [ ] Headers de segurança (A no Security Headers)
- [ ] Email funciona (teste real)
- [ ] Rate limiting ativo
- [ ] Logs sem erros
- [ ] Health check verde
- [ ] DNS propagado
- [ ] SPF/DKIM verificados
- [ ] Backups configurados
- [ ] Monitoramento ativo
- [ ] CDN configurado (opcional)
- [ ] Analytics configurado

## 📞 Suporte

**Problemas com deploy:**
- Documentação Coolify: https://coolify.io/docs
- Discord Coolify: https://discord.gg/coolify

**Problemas com Brevo:**
- Suporte Brevo: https://help.brevo.com/
- Status: https://status.brevo.com/

**Problemas com o código:**
- GitHub Issues: https://github.com/CamponezTV/NovaSyn-LTDA/issues

---

**Boa sorte com o deploy! 🚀**
