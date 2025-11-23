import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Team from '@/components/Team';

describe('Team', () => {
  it('should render section title', () => {
    render(
      <LanguageProvider>
        <Team />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Nossa Equipe')).toBeInTheDocument();
  });

  it('should render all team members', () => {
    render(
      <LanguageProvider>
        <Team />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Arthur')).toBeInTheDocument();
    expect(screen.getByText('Paulo')).toBeInTheDocument();
    expect(screen.getByText('Giovanni')).toBeInTheDocument();
  });

  it('should render team member roles', () => {
    render(
      <LanguageProvider>
        <Team />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Dev & Product')).toBeInTheDocument();
    expect(screen.getByText('Automação & IA')).toBeInTheDocument();
    expect(screen.getByText('Vendas & Estratégia')).toBeInTheDocument();
  });

  it('should render team member descriptions', () => {
    render(
      <LanguageProvider>
        <Team />
      </LanguageProvider>
    );
    
    expect(screen.getByText(/Transforma ideias em realidade/)).toBeInTheDocument();
    expect(screen.getByText(/Conecta tudo, integra sistemas/)).toBeInTheDocument();
    expect(screen.getByText(/Cuida das vendas, marketing/)).toBeInTheDocument();
  });

  it('should render mission statement', () => {
    render(
      <LanguageProvider>
        <Team />
      </LanguageProvider>
    );
    
    expect(screen.getByText(/Vimos como a tecnologia pode transformar negócios/)).toBeInTheDocument();
  });
});
