import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

describe('LanguageContext', () => {
  it('should provide default language as Portuguese', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });
    
    expect(result.current.language).toBe('pt');
  });

  it('should translate Portuguese keys correctly', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });
    
    expect(result.current.t('nav.services')).toBe('Serviços');
    expect(result.current.t('nav.about')).toBe('Sobre');
    expect(result.current.t('hero.title')).toBe('Transforme seu negócio com');
  });

  it('should change language to English', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });
    
    act(() => {
      result.current.setLanguage('en');
    });
    
    expect(result.current.language).toBe('en');
  });

  it('should translate English keys correctly', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });
    
    act(() => {
      result.current.setLanguage('en');
    });
    
    expect(result.current.t('nav.services')).toBe('Services');
    expect(result.current.t('nav.about')).toBe('About');
    expect(result.current.t('hero.title')).toBe('Transform your business with');
  });

  it('should return key if translation not found', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });
    
    expect(result.current.t('non.existent.key')).toBe('non.existent.key');
  });

  it('should handle portfolio translations', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });
    
    expect(result.current.t('portfolio.title')).toBe('Portfólio');
    expect(result.current.t('portfolio.inDevelopment')).toBe('Em Desenvolvimento');
    expect(result.current.t('portfolio.comingSoon')).toBe('Em Breve');
  });

  it('should handle FAQ translations', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    });
    
    expect(result.current.t('faq.title')).toBe('Dúvidas Frequentes');
    expect(result.current.t('faq.badge')).toBe('Perguntas Frequentes');
  });
});
