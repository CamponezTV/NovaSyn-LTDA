import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Hero from '@/components/Hero';

describe('Hero', () => {
  it('should render main title', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Transforme seu negócio com')).toBeInTheDocument();
    expect(screen.getByText('tecnologia inteligente')).toBeInTheDocument();
  });

  it('should render subtitle', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    );
    
    expect(screen.getByText(/Desenvolvemos sites, sistemas e IAs de automação/)).toBeInTheDocument();
  });

  it('should render CTA buttons', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Quero Iniciar um Projeto')).toBeInTheDocument();
    expect(screen.getByText('Portfólio')).toBeInTheDocument();
  });

  it('should render badge', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Soluções em Tecnologia e IA')).toBeInTheDocument();
  });

  it('should render company logos', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    );

    const xmetalLogo = screen.getByAltText('Xmetal');
    const novasynLogo = screen.getByAltText('NovaSyn');

    expect(xmetalLogo).toBeInTheDocument();
    expect(novasynLogo).toBeInTheDocument();
  });
});
