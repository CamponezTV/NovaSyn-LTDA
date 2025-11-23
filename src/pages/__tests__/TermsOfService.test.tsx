import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import TermsOfService from '@/pages/TermsOfService';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

describe('TermsOfService', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <TermsOfService />
        </LanguageProvider>
      </BrowserRouter>
    );
  });

  it('should render page title', () => {
    expect(screen.getByRole('heading', { name: 'Termos de Serviço', level: 1 })).toBeInTheDocument();
  });

  it('should render back button', () => {
    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });

  it('should render last updated text', () => {
    expect(screen.getByText(/Última atualização:/)).toBeInTheDocument();
  });

  it('should render all main sections', () => {
    expect(screen.getByText('1. Aceitação dos Termos')).toBeInTheDocument();
    expect(screen.getByText('2. Descrição dos Serviços')).toBeInTheDocument();
    expect(screen.getByText('3. Obrigações do Usuário')).toBeInTheDocument();
    expect(screen.getByText('4. Propriedade Intelectual')).toBeInTheDocument();
    expect(screen.getByText('5. Limitação de Responsabilidade')).toBeInTheDocument();
    expect(screen.getByText('6. Modificações nos Termos')).toBeInTheDocument();
    expect(screen.getByText('7. Rescisão')).toBeInTheDocument();
    expect(screen.getByText('8. Lei Aplicável')).toBeInTheDocument();
  });

  it('should render acceptance text', () => {
    expect(screen.getByText(/Ao acessar e usar os serviços da Nova Syn LTDA/)).toBeInTheDocument();
  });
});
