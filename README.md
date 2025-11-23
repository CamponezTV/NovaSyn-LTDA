# Nova Syn Digital Hub

> Uma landing page moderna e responsiva para empresa de tecnologia especializada em IA, automação e desenvolvimento web.

![Nova Syn](https://img.shields.io/badge/Nova_Syn-Digital_Hub-00A896?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes](#componentes)
- [Animações](#animações)
- [Temas](#temas)
- [Internacionalização](#internacionalização)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Configuração](#configuração)

## 🚀 Sobre o Projeto

O Nova Syn Digital Hub é uma landing page premium desenvolvida para apresentar serviços de tecnologia, IA e automação. O projeto conta com design moderno, animações suaves, modo escuro/claro e suporte a múltiplos idiomas.

### ✨ Características Principais

- **Design Moderno**: Interface clean com efeito liquid glass e glassmorphism
- **Totalmente Responsivo**: Adaptado para desktop, tablet e mobile
- **Dark Mode**: Alternância suave entre tema claro e escuro
- **Animações Premium**: Transições e efeitos visuais sofisticados
- **Internacionalização**: Suporte para português e inglês
- **Otimizado**: Performance otimizada com lazy loading e code splitting

## 🛠️ Tecnologias

### Core
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.8.3** - Superset tipado do JavaScript
- **Vite 5.4.19** - Build tool e dev server ultra-rápido

### UI & Styling
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **shadcn/ui** - Componentes React de alta qualidade
- **Radix UI** - Primitivos acessíveis para componentes
- **next-themes** - Gerenciamento de temas dark/light
- **lucide-react** - Ícones modernos

### Roteamento & State
- **React Router DOM 6.30.1** - Roteamento SPA
- **TanStack Query 5.83.0** - Gerenciamento de estado assíncrono

### Formulários & Validação
- **React Hook Form 7.61.1** - Gerenciamento de formulários
- **Zod 3.25.76** - Validação de schemas TypeScript-first

## 📁 Estrutura do Projeto

```
novasyn-digital-hub-main/
├── public/                      # Arquivos estáticos
│   └── robots.txt
├── src/
│   ├── components/              # Componentes React
│   │   ├── ui/                  # Componentes shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (30+ componentes)
│   │   ├── About.tsx            # Seção Sobre
│   │   ├── Contact.tsx          # Seção Contato
│   │   ├── Footer.tsx           # Rodapé
│   │   ├── Header.tsx           # Cabeçalho com navegação
│   │   ├── Hero.tsx             # Seção Hero/Banner
│   │   ├── LanguageToggle.tsx   # Alternador de idioma
│   │   ├── Portfolio.tsx        # Seção Portfólio
│   │   ├── Products.tsx         # Seção Produtos
│   │   ├── Services.tsx         # Seção Serviços
│   │   ├── Team.tsx             # Seção Equipe
│   │   └── ThemeToggle.tsx      # Alternador de tema
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Context para i18n
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Hook para detectar mobile
│   │   └── use-toast.ts         # Hook para toasts
│   ├── lib/
│   │   └── utils.ts             # Funções utilitárias
│   ├── pages/
│   │   ├── Index.tsx            # Página principal
│   │   └── NotFound.tsx         # Página 404
│   ├── App.tsx                  # Componente raiz
│   ├── index.css                # Estilos globais e animações
│   └── main.tsx                 # Entry point
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Componentes

### Header
Navbar fixa com efeito liquid glass, navegação centralizada e transparência adaptativa.

**Características:**
- Layout com grid de 3 colunas (logo, nav, actions)
- Glassmorphism com backdrop-blur
- Links com animação de underline
- Responsivo com menu hambúrguer (mobile)

### Hero
Seção principal com call-to-action e elementos flutuantes animados.

**Características:**
- Título com gradiente animado
- Badge com efeito glow pulsante
- Botões com hover effects
- Background com elementos flutuantes

### Services
Grid de cards apresentando os serviços oferecidos.

**Características:**
- 3 cards responsivos
- Ícones com animação de rotação
- Hover lift effect
- Background decorativo com blur

### About
Seção sobre a empresa com estatísticas e benefícios.

**Características:**
- Layout de 2 colunas
- Cards de estatísticas animados
- Checkmarks para benefícios
- Elementos flutuantes decorativos

### Team
Apresentação dos membros da equipe.

**Características:**
- Grid de 3 colunas com fotos
- Overlay com ícones no hover
- Animações staggered
- Cards com hover lift

### Products
Grid de produtos/serviços destacados.

**Características:**
- Cards com ícones animados
- Efeito glow nos ícones
- Links com transição suave
- Backdrop blur nos cards

### Portfolio
Showcase de projetos realizados.

**Características:**
- Grid responsivo de projetos
- Imagens com zoom e rotação
- Tags de categorias
- Overlay gradient nas imagens

### Contact
Formulário de contato com validação.

**Características:**
- Inputs com animação de focus
- Validação em tempo real
- Toast de confirmação
- Background decorativo

### Footer
Rodapé minimalista e centralizado.

**Características:**
- Logo centralizado
- Links de políticas
- Copyright
- Design clean e compacto

## ✨ Animações

### Keyframes Personalizados

```css
- fade-in, fade-up, fade-down, fade-left, fade-right
- scale-in, scale-up
- glow-pulse
- float
- slide-in-bottom
- shimmer
- gradient (animated)
```

### Classes Utilitárias

```css
- animate-fade-up
- animate-scale-in
- animate-glow-pulse
- animate-float
- hover-lift
- transition-smooth
- transition-bounce
- animation-delay-{100-600}
```

### Efeitos Visuais

- **Glassmorphism**: Efeito de vidro com backdrop-blur
- **Liquid Glass**: Overlays com gradientes sutis
- **Hover Lift**: Cards elevam no hover
- **Staggered Animations**: Animações escalonadas
- **Glow Effects**: Brilhos em elementos importantes

## 🌓 Temas

### Light Mode
- Background: Tons claros de roxo e verde
- Textos: Roxo escuro
- Cards: Branco com sombra suave
- Borders: Roxo claro

### Dark Mode
- Background: Roxo escuro profundo
- Textos: Branco/cinza claro
- Cards: Roxo médio com transparência
- Borders: Roxo médio

### Variáveis CSS

```css
--primary: 160 100% 33% (Verde)
--secondary: 270 72% 50% (Roxo)
--brand-purple-dark: 270 72% 20%
--gradient-hero
--gradient-primary
--gradient-secondary
--shadow-soft
--shadow-glow
```

## 🌍 Internacionalização

Sistema de i18n implementado com Context API.

### Idiomas Suportados
- Português (pt-BR)
- Inglês (en)

### Estrutura de Tradução

```typescript
translations = {
  nav: { services, about, products, portfolio, contact, cta },
  hero: { badge, title, titleHighlight, subtitle, cta, demo },
  services: { title, subtitle, items... },
  about: { title, subtitle, descriptions, benefits, stats },
  // ... demais seções
}
```

### Uso

```tsx
const { t, language, setLanguage } = useLanguage();
<h1>{t("hero.title")}</h1>
```

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ e npm/bun
- Git

### Passo a Passo

```bash
# Clone o repositório
git clone https://github.com/your-username/novasyn-digital-hub.git

# Entre na pasta
cd novasyn-digital-hub-main

# Instale as dependências
npm install
# ou
bun install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
bun dev
```

O projeto estará disponível em `http://localhost:8080`

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor dev com hot reload

# Build
npm run build        # Build de produção otimizado
npm run build:dev    # Build em modo desenvolvimento

# Preview
npm run preview      # Preview do build de produção

# Linting
npm run lint         # Executa ESLint
```

## ⚙️ Configuração

### Tailwind CSS

O projeto usa configuração customizada com:
- Dark mode baseado em classe
- Cores personalizadas da marca
- Animações customizadas
- Plugins: tailwindcss-animate

### Vite

Configuração otimizada com:
- React SWC para builds rápidos
- Path aliases (@/)
- Hot Module Replacement (HMR)

### TypeScript

Configurações strict para type safety:
- Strict mode habilitado
- Path mapping configurado
- Type checking rigoroso

## 🎯 Otimizações

- **Code Splitting**: Componentes carregados sob demanda
- **Tree Shaking**: Remoção de código não utilizado
- **Asset Optimization**: Imagens e fontes otimizadas
- **CSS Purging**: Remoção de CSS não utilizado
- **Lazy Loading**: Componentes e rotas carregados quando necessário

## 📱 Responsividade

Breakpoints Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto é propriedade da Nova Syn LTDA. Todos os direitos reservados.

## 👥 Equipe

- **Arthur** - Dev & Product
- **Paulo** - Automação & IA  
- **Giovanni** - Vendas & Estratégia

---

## 📅 Atualizações Recentes (Novembro 2025)

### 🎨 Melhorias Visuais e UX

#### Portfólio
- ✅ **Sistema de i18n completo** - Todos os itens do portfólio traduzidos (pt/en)
- ✅ **Logos customizadas** - Vende.AI, Xmetal e NovaSyn nos cards
- ✅ **Status de desenvolvimento** - Badge "Em Desenvolvimento" / "In Development" com animação
- ✅ **Visual de indisponibilidade** - Opacidade reduzida e grayscale em projetos em desenvolvimento
- ✅ **Botão "Em Breve"** - Substituição do botão "Ver Projeto" por "Em Breve" / "Coming Soon" para projetos indisponíveis

#### Header
- ✅ **Scroll behavior inteligente** - Header esconde ao rolar para baixo, reaparece ao rolar para cima
- ✅ **Animação de entrada** - Fade-down animation no carregamento da página
- ✅ **Logo da NovaSyn** - Integração da logo_1.png no header
- ✅ **Link "Produtos" removido** - Simplificação da navegação (comentado no código)

#### Hero
- ✅ **Animações de background** - Orbs animados com blur-3xl e efeitos de luz
- ✅ **Logos de clientes** - Xmetal e NovaSyn exibidas como bolinhas antes do texto de companies
- ✅ **Botão VendeAI comentado** - Badge promocional do VendeAI removido temporariamente
- ✅ **Redirecionamento atualizado** - Botão "Ver Produtos" agora direciona para Portfolio

#### Footer & Team
- ✅ **Footer totalmente bilíngue** - Copyright, direitos, políticas em pt/en
- ✅ **Equipe internacionalizada** - Nomes, cargos e descrições traduzidos
- ✅ **Favicon atualizado** - Usando logo_1.png da NovaSyn

### 📄 Páginas Legais

#### Política de Privacidade (/privacy)
- ✅ **Conteúdo completo** - 8 seções detalhando coleta, uso, cookies, direitos, segurança
- ✅ **Bilíngue (pt/en)** - Sistema de tradução completo
- ✅ **Header customizado** - Botão "Voltar" / "Back" no lugar da logo
- ✅ **Design consistente** - Visual alinhado com o resto do site

#### Termos de Serviço (/terms)
- ✅ **Conteúdo completo** - 8 seções sobre aceitação, serviços, obrigações, propriedade intelectual
- ✅ **Bilíngue (pt/en)** - Sistema de tradução completo
- ✅ **Header customizado** - Botão "Voltar" / "Back" no lugar da logo
- ✅ **Links atualizados** - Footer com links funcionais para /privacy e /terms

### ❓ FAQ (Perguntas Frequentes)

#### Nova Seção
- ✅ **8 perguntas estratégicas** - Baseadas em dúvidas reais de clientes
  - Tempo de desenvolvimento
  - Suporte pós-entrega
  - Processo de desenvolvimento
  - Investimento necessário
  - Tipos de projetos
  - Diferenciais da Nova Syn
  - Acesso ao código-fonte
  - Atendimento por tamanho de empresa
- ✅ **Accordion component** - Interface expansível com shadcn/ui
- ✅ **Totalmente bilíngue** - Perguntas e respostas em pt/en
- ✅ **CTA de contato** - Link direto para a seção de contato
- ✅ **Animações e efeitos** - Hover lift, borders animadas, background decorativo

### 🎨 Assets e Ícones

#### Logos Criadas
- ✅ **novasyn-icon.svg** - Ícone circular com letra "N" em gradiente roxo
- ✅ **vendeai-logo.svg** - Logo completa do produto VendeAI (já existente)
- ✅ **vendeai-icon.svg** - Versão ícone do VendeAI (já existente)

### 🔧 Melhorias Técnicas

#### Rotas
- ✅ **Nova rota /privacy** - Página de Política de Privacidade
- ✅ **Nova rota /terms** - Página de Termos de Serviço
- ✅ **Rota /whatsapp** - Produto VendeAI (já existente)

#### Internacionalização
- ✅ **90+ novas chaves de tradução** - Privacy policy, terms, FAQ, team
- ✅ **Sistema escalável** - Fácil adicionar novos idiomas
- ✅ **Tradução nav.back** - "Voltar" / "Back" para páginas legais

#### Componentes
- ✅ **FAQ.tsx** - Novo componente de perguntas frequentes
- ✅ **PrivacyPolicy.tsx** - Página de política de privacidade
- ✅ **TermsOfService.tsx** - Página de termos de serviço
- ✅ **Portfolio.tsx** - Sistema de status de desenvolvimento
- ✅ **About.tsx** - Botão de consultoria direcionando para #contato

### 🎯 Funcionalidades

#### Estados Visuais
- ✅ **inDevelopment flag** - Sistema para marcar projetos em desenvolvimento
- ✅ **Conditional rendering** - Botões e estilos diferentes para projetos disponíveis/indisponíveis
- ✅ **Dark mode support** - Todos os novos componentes com suporte a tema escuro

#### Navegação
- ✅ **Links internos otimizados** - Smooth scroll para seções
- ✅ **Links externos seguros** - target="_blank" com rel="noopener noreferrer"
- ✅ **Breadcrumb visual** - Headers customizados com botão voltar

## 🚀 Deploy e Produção

### Cloudflare Integration

Este projeto está otimizado para integração com Cloudflare:

#### 🌐 Benefícios do Cloudflare (Plano Free)
- **CDN Global**: 300+ datacenters para latência ultra-baixa
- **DDoS Protection**: Proteção até 10Tbps sem custo adicional
- **SSL/TLS**: Certificado HTTPS grátis e automático
- **Cache Inteligente**: Reduz carga do servidor em 90%
- **Bot Protection**: Bloqueia bots maliciosos automaticamente
- **Analytics**: Métricas em tempo real de tráfego e segurança
- **Auto Minify**: Compressão automática de CSS, JS e HTML
- **Brotli Compression**: Compressão superior ao Gzip

#### 📊 Performance Esperada
- **TTFB**: <200ms (Time to First Byte)
- **Cache Hit Ratio**: >85%
- **PageSpeed Score**: >90 (Mobile e Desktop)
- **Economia de Bandwidth**: ~90% (com cache ativo)

#### 🔧 Arquivos de Configuração
- `cloudflare.md` - Guia completo de configuração Cloudflare
- `nginx.conf` - Nginx otimizado com Real IP do Cloudflare
- `test-cloudflare.ps1` - Script de testes automatizados
- `purge-cloudflare-cache.ps1` - Script para limpar cache

### Deploy no Coolify

Guia completo de deploy disponível em `DEPLOY.md`:
- Configuração de DNS
- Integração Brevo (emails)
- Variáveis de ambiente
- Docker e segurança
- CI/CD com GitHub

### Scripts de Teste

```powershell
# Testar configuração Cloudflare
.\test-cloudflare.ps1 -Domain novasyn.com.br

# Limpar cache completo
.\purge-cloudflare-cache.ps1 -PurgeAll

# Limpar cache de arquivos específicos
.\purge-cloudflare-cache.ps1 -Files "https://novasyn.com.br/index.html,https://novasyn.com.br/assets/style.css"
```

### Segurança em Produção

✅ **Implementado:**
- Rate Limiting (10 req/min por formulário)
- Honeypot anti-bot
- Sanitização de inputs (XSS/SQL Injection)
- CSRF Token validation
- Security Headers (CSP, HSTS, X-Frame-Options)
- Real IP detection via Cloudflare
- Bot Fight Mode (Cloudflare)

📚 **Documentação:**
- `SECURITY.md` - Guia de segurança completo
- `TESTING.md` - Guia de testes e qualidade
- `IMPROVEMENTS.md` - Melhorias implementadas e roadmap

### Variáveis de Ambiente

Configure no Coolify (ou `.env` local):

```env
# Brevo Email
VITE_BREVO_API_KEY=xkeysib-xxxxx
VITE_RECIPIENT_EMAIL=contato@novasyn.com.br
VITE_SENDER_EMAIL=noreply@novasyn.com.br

# Cloudflare
CLOUDFLARE_ENABLED=true
CLOUDFLARE_ZONE_ID=your_zone_id
CLOUDFLARE_API_TOKEN=your_api_token

# Google Analytics
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Site
VITE_SITE_URL=https://novasyn.com.br
```

### Monitoramento

**Ferramentas Recomendadas:**
- [Google Analytics](https://analytics.google.com) - Tráfego e conversões
- [Cloudflare Analytics](https://dash.cloudflare.com) - Performance e segurança
- [GTmetrix](https://gtmetrix.com) - Performance testing
- [PageSpeed Insights](https://pagespeed.web.dev) - Core Web Vitals
- [Security Headers](https://securityheaders.com) - Análise de segurança

---

Desenvolvido com ❤️ pela equipe Nova Syn
