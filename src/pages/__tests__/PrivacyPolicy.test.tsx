import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

describe('PrivacyPolicy', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <PrivacyPolicy />
        </LanguageProvider>
      </BrowserRouter>
    );
  });

  it('should render page title', () => {
    expect(screen.getByRole('heading', { name: 'Política de Privacidade', level: 1 })).toBeInTheDocument();
  });

  it('should render back button', () => {
    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });

  it('should render last updated text', () => {
    expect(screen.getByText(/Última atualização:/)).toBeInTheDocument();
  });

  it('should render all main sections', () => {
    expect(screen.getByText('1. Introdução')).toBeInTheDocument();
    expect(screen.getByText('2. Informações que Coletamos')).toBeInTheDocument();
    expect(screen.getByText('3. Como Usamos Suas Informações')).toBeInTheDocument();
    expect(screen.getByText('4. Cookies e Tecnologias Semelhantes')).toBeInTheDocument();
    expect(screen.getByText('5. Compartilhamento de Informações')).toBeInTheDocument();
    expect(screen.getByText('6. Segurança dos Dados')).toBeInTheDocument();
    expect(screen.getByText('7. Seus Direitos')).toBeInTheDocument();
    expect(screen.getByText('8. Contato')).toBeInTheDocument();
  });

  it('should render NovaSyn commitment text', () => {
    expect(screen.getByText(/NovaSyn LTDA está comprometida em proteger sua privacidade/)).toBeInTheDocument();
  });
});
