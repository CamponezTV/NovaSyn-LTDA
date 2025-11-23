import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('should render logo', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );

    const logo = screen.getByAltText('NovaSyn Logo');
    expect(logo).toBeInTheDocument();
  });  it('should render copyright with current year', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`©️ ${currentYear}`))).toBeInTheDocument();
  });

  it('should render privacy policy link', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    
    const privacyLink = screen.getByText('Política de Privacidade');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy');
  });

  it('should render terms of service link', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    
    const termsLink = screen.getByText('Termos de Serviço');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink.closest('a')).toHaveAttribute('href', '/terms');
  });

  it('should render rights reserved text', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Todos os direitos reservados')).toBeInTheDocument();
  });
});
