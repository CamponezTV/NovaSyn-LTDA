import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import FAQ from '@/components/FAQ';

describe('FAQ', () => {
  it('should render section title', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Dúvidas Frequentes')).toBeInTheDocument();
  });

  it('should render subtitle', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Encontre respostas para as principais questões sobre nossos serviços')).toBeInTheDocument();
  });

  it('should render badge', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Perguntas Frequentes')).toBeInTheDocument();
  });

  it('should render all FAQ questions', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Quanto tempo leva para desenvolver um site ou sistema?')).toBeInTheDocument();
    expect(screen.getByText('Vocês oferecem suporte após a entrega do projeto?')).toBeInTheDocument();
    expect(screen.getByText('Como funciona o processo de desenvolvimento?')).toBeInTheDocument();
  });

  it('should render CTA text', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Não encontrou a resposta que procurava?')).toBeInTheDocument();
    expect(screen.getByText('Entre em contato conosco')).toBeInTheDocument();
  });
});
