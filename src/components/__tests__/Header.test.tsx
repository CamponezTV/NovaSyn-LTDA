import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

describe('Header', () => {
  it('should render logo', () => {
    render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
    
    const logo = screen.getByAltText('NovaSyn Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Portfólio')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('should render CTA button', () => {
    render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Fale Conosco')).toBeInTheDocument();
  });

  it('should render theme and language toggles', () => {
    render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
    
    // Theme toggle and language toggle buttons exist
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});
