import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Portfolio from '@/components/Portfolio';

describe('Portfolio', () => {
  it('should render section title', () => {
    render(
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Portfólio')).toBeInTheDocument();
  });

  it('should render subtitle', () => {
    render(
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Conheça alguns dos projetos que desenvolvemos')).toBeInTheDocument();
  });

  it('should render all portfolio items', () => {
    render(
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Vende.AI')).toBeInTheDocument();
    expect(screen.getByText('Novabuild')).toBeInTheDocument();
    expect(screen.getByText('Sistema de Gestão E-commerce')).toBeInTheDocument();
  });

  it('should show "In Development" badge for VendeAI', () => {
    render(
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Em Desenvolvimento')).toBeInTheDocument();
  });

  it('should show "Coming Soon" button for in-development projects', () => {
    render(
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Em Breve')).toBeInTheDocument();
  });

  it('should show "View Project" button for available projects', () => {
    render(
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    );
    
    const viewProjectButtons = screen.getAllByText('Ver Projeto');
    expect(viewProjectButtons.length).toBe(1); // Only Xmetal
  });

  it('should render project tags', () => {
    render(
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    );
    
    expect(screen.getByText('IA')).toBeInTheDocument();
    expect(screen.getByText('Automação')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Engenharia')).toBeInTheDocument();
  });
});
