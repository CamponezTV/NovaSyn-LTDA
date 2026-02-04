# Testes Unitários - Nova Syn

## 📋 Visão Geral

Este projeto possui cobertura de testes unitários para os principais componentes e funcionalidades usando **Vitest** e **React Testing Library**.

## 🛠️ Tecnologias de Teste

- **Vitest** - Framework de testes rápido e moderno
- **React Testing Library** - Testes focados no comportamento do usuário
- **@testing-library/jest-dom** - Matchers customizados para DOM
- **jsdom** - Ambiente DOM para testes
- **@vitest/ui** - Interface visual para testes

## 📦 Instalação

Instale as dependências de teste:

```bash
npm install
# ou
bun install
```

## 🧪 Executando os Testes

### Todos os testes
```bash
npm run test
# ou
bun test
```

### Interface visual
```bash
npm run test:ui
# ou
bun test:ui
```

### Com cobertura de código
```bash
npm run test:coverage
# ou
bun test:coverage
```

### Modo watch (desenvolvimento)
```bash
npm run test -- --watch
```

## 📁 Estrutura de Testes

```
src/
├── components/
│   ├── __tests__/
│   │   ├── Header.test.tsx
│   │   ├── Hero.test.tsx
│   │   ├── Portfolio.test.tsx
│   │   ├── FAQ.test.tsx
│   │   ├── Footer.test.tsx
│   │   └── Team.test.tsx
├── contexts/
│   └── __tests__/
│       └── LanguageContext.test.tsx
├── lib/
│   └── __tests__/
│       └── utils.test.ts
├── pages/
│   └── __tests__/
│       ├── PrivacyPolicy.test.tsx
│       └── TermsOfService.test.tsx
└── test/
    └── setup.ts
```

## ✅ Cobertura de Testes

### Componentes Testados

#### Header
- ✅ Renderização da logo
- ✅ Links de navegação
- ✅ Botão CTA
- ✅ Toggles de tema e idioma

#### Hero
- ✅ Título e subtítulo
- ✅ Badges
- ✅ Botões CTA
- ✅ Logos de clientes

#### Portfolio
- ✅ Listagem de projetos (Vende.AI, Novabuild, Xmetal)
- ✅ Badge "Em Desenvolvimento" em Vende.AI e Novabuild
- ✅ Botão "Em Breve" para projetos em desenvolvimento
- ✅ Botão "Ver Projeto" apenas para Xmetal (único disponível)
- ✅ Tags de tecnologias (IA, Automação, WhatsApp, Dashboard, Engenharia, E-commerce, Analytics)
- ✅ Estados visuais (opacidade, grayscale)

#### FAQ
- ✅ Renderização de perguntas
- ✅ Seção de contato
- ✅ Accordion funcionando

#### Footer
- ✅ Logo e copyright
- ✅ Links de políticas
- ✅ Ano dinâmico

#### Team
- ✅ Membros da equipe
- ✅ Cargos e descrições
- ✅ Missão da empresa

### Contexts

#### LanguageContext
- ✅ Idioma padrão (Português)
- ✅ Mudança de idioma
- ✅ Traduções pt/en
- ✅ Fallback para chaves inexistentes
- ✅ Traduções de portfolio e FAQ

### Utils

#### cn (class names)
- ✅ Merge de classes
- ✅ Classes condicionais
- ✅ Override de classes Tailwind
- ✅ Tratamento de valores null/undefined

### Pages

#### PrivacyPolicy
- ✅ Título da página
- ✅ Botão voltar
- ✅ Todas as 8 seções
- ✅ Data de atualização

#### TermsOfService
- ✅ Título da página
- ✅ Botão voltar
- ✅ Todas as 8 seções
- ✅ Data de atualização

## 🎯 Padrões de Teste

### Estrutura de Teste

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Component from '@/components/Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(
      <LanguageProvider>
        <Component />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Mocks Configurados

```typescript
// next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

// window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});
```

## 📊 Relatório de Cobertura

Após executar `npm run test:coverage`, você terá:

- **Console**: Resumo da cobertura
- **HTML**: Relatório detalhado em `coverage/index.html`
- **JSON**: Dados brutos em `coverage/coverage-final.json`

### Métricas de Cobertura

O projeto visa manter:
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## � Atualizações Fevereiro 2026

### Testes Atualizados

#### Hero.test.tsx
- ✅ Novo teste para `hero.partners` ("Empresas parceiras")
- ✅ Valida que texto está traduzido e renderizado

#### Portfolio.test.tsx
- ✅ Atualizado para refletir 3 projetos: Vende.AI, Novabuild, Xmetal
- ✅ Novabuild é item2 (em desenvolvimento)
- ✅ Xmetal é item3 (disponível) com tags corretas
- ✅ Apenas 1 botão "Ver Projeto" (Xmetal)
- ✅ Tags atualizadas com Novabuild (Dashboard, Engenharia)

### Componentes Testados com Success

#### Hero
- ✅ Renderização de título
- ✅ Renderização de subtítulo
- ✅ Botões CTA
- ✅ Logos de parceiros (Xmetal, NovaSyn)
- ✅ Texto "Empresas parceiras" traduzido

#### Logo3D
- 🔧 Novo componente (renderização 3D com Three.js)
- 📝 Testes recomendados: snapshot, carregamento do modelo, renderização

## �🔧 Configuração

### vitest.config.ts

```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### setup.ts

Configurações globais para todos os testes:
- Cleanup automático após cada teste
- Mocks de APIs do browser (matchMedia, IntersectionObserver)
- Importação de matchers do jest-dom

## 🚀 Boas Práticas

1. **Teste comportamento, não implementação**
   - Foque no que o usuário vê e interage
   - Evite testar detalhes internos

2. **Use queries semânticas**
   - Prefira `getByRole`, `getByLabelText`
   - Use `getByText` como último recurso

3. **Mantenha testes isolados**
   - Cada teste deve ser independente
   - Use `beforeEach` para setup comum

4. **Nomes descritivos**
   - Use "should" nos nomes dos testes
   - Seja específico sobre o que está testando

5. **Arrange-Act-Assert**
   - Setup (arrange)
   - Ação (act)
   - Verificação (assert)

## 🐛 Debugging

### Visualizar DOM do teste
```typescript
import { render, screen } from '@testing-library/react';
const { debug } = render(<Component />);
debug(); // Imprime o DOM
```

### Ver queries disponíveis
```typescript
screen.debug(); // Mostra todas as queries disponíveis
```

### Pausar execução
```typescript
import { vi } from 'vitest';
vi.debug(); // Pausa a execução
```

## 📝 Adicionando Novos Testes

1. Crie arquivo `ComponentName.test.tsx` em `__tests__`
2. Importe dependências necessárias
3. Envolva componente com providers necessários
4. Escreva casos de teste
5. Execute `npm run test`

### Exemplo

```typescript
// src/components/__tests__/NewComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import NewComponent from '@/components/NewComponent';

describe('NewComponent', () => {
  it('should render title', () => {
    render(
      <LanguageProvider>
        <NewComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
```

## 🔗 Recursos

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Última atualização**: Fevereiro 2026
