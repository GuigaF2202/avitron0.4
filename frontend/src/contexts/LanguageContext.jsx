import React, { createContext, useState, useContext, useEffect } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Configuração inicial do i18next
i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    defaultNS: 'translation',
    fallbackNS: 'translation',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          language: {
            errors: {
              getting: 'Error getting language',
              saving: 'Could not save language to localStorage',
              changing: 'Error changing language',
              effect: 'Error in language effect',
              hook: 'Error in useLanguage hook'
            }
          },
          sections: {
            future: {
              eyebrow: "THE FUTURE",
              title: "Future of AI",
              description: "Experience the next generation of artificial intelligence, where innovation meets possibility.",
              button: "Learn More"
            },
            nomad: {
              eyebrow: "DIGITAL NOMAD",
              title: "Work Anywhere",
              description: "Transform your workspace into a borderless environment with our cutting-edge solutions.",
              button: "Discover More"
            },
            interface: {
              eyebrow: "INTERFACE",
              title: "Smart Interface",
              description: "Interact with AI through our intuitive and responsive interface design.",
              button: "See Details"
            }
          }
        }
      },
      pt: {
        translation: {
          language: {
            errors: {
              getting: 'Erro ao obter idioma',
              saving: 'Não foi possível salvar o idioma no localStorage',
              changing: 'Erro ao alterar idioma',
              effect: 'Erro no efeito de idioma',
              hook: 'Erro no hook useLanguage'
            }
          },
          sections: {
            future: {
              eyebrow: "O FUTURO",
              title: "Futuro da IA",
              description: "Experimente a próxima geração de inteligência artificial, onde inovação encontra possibilidade.",
              button: "Saiba Mais"
            },
            nomad: {
              eyebrow: "NÔMADE DIGITAL",
              title: "Trabalhe em Qualquer Lugar",
              description: "Transforme seu espaço de trabalho em um ambiente sem fronteiras com nossas soluções de ponta.",
              button: "Descubra Mais"
            },
            interface: {
              eyebrow: "INTERFACE",
              title: "Interface Inteligente",
              description: "Interaja com IA através do nosso design de interface intuitivo e responsivo.",
              button: "Ver Detalhes"
            }
          }
        }
      },
      es: {
        translation: {
          language: {
            errors: {
              getting: 'Error al obtener el idioma',
              saving: 'No se pudo guardar el idioma en localStorage',
              changing: 'Error al cambiar el idioma',
              effect: 'Error en el efecto de idioma',
              hook: 'Error en el hook useLanguage'
            }
          },
          sections: {
            future: {
              eyebrow: "EL FUTURO",
              title: "Futuro de la IA",
              description: "Experimente la próxima generación de inteligencia artificial, donde la innovación encuentra la posibilidad.",
              button: "Saber Más"
            },
            nomad: {
              eyebrow: "NÓMADA DIGITAL",
              title: "Trabaja en Cualquier Lugar",
              description: "Transforma tu espacio de trabajo en un entorno sin fronteras con nuestras soluciones de vanguardia.",
              button: "Descubrir Más"
            },
            interface: {
              eyebrow: "INTERFAZ",
              title: "Interfaz Inteligente",
              description: "Interactúa con IA a través de nuestro diseño de interfaz intuitivo y responsivo.",
              button: "Ver Detalles"
            }
          }
        }
      }
    }
  });

const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'];
const DEFAULT_LANGUAGE = 'en';

const defaultValue = {
  language: DEFAULT_LANGUAGE,
  changeLanguage: () => {},
  setLanguage: () => {}
};

// Exportando o contexto para permitir testes
export const LanguageContext = createContext(defaultValue);

/**
 * Provedor de contexto para gerenciamento de idiomas
 */
export const LanguageProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  
  const [language, setLanguage] = useState(() => {
    try {
      const savedLanguage = localStorage.getItem('i18nextLng');
      const browserLanguage = i18n.language;
      const validLanguage = [savedLanguage, browserLanguage].find(lang => 
        SUPPORTED_LANGUAGES.includes(lang)
      );
      
      return validLanguage || DEFAULT_LANGUAGE;
    } catch (e) {
      console.error(t('language.errors.getting'), e);
      return DEFAULT_LANGUAGE;
    }
  });

  const changeLanguage = async (lang) => {
    try {
      if (!lang || typeof lang !== 'string') {
        throw new Error('Invalid language provided');
      }

      if (!SUPPORTED_LANGUAGES.includes(lang)) {
        throw new Error(`Unsupported language: ${lang}`);
      }

      await i18n.changeLanguage(lang);
      setLanguage(lang);
      
      try {
        localStorage.setItem('i18nextLng', lang);
      } catch (e) {
        console.error(t('language.errors.saving'), e);
      }
    } catch (e) {
      console.error(t('language.errors.changing'), e);
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
      i18n.changeLanguage(language);
    } catch (e) {
      console.error(t('language.errors.effect'), e);
    }
  }, [language, i18n]);

  const value = {
    language: language || defaultValue.language,
    setLanguage: setLanguage || defaultValue.setLanguage,
    changeLanguage: changeLanguage || defaultValue.changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook personalizado para acessar o contexto de idioma
 */
export const useLanguage = () => {
  const { t } = useTranslation();
  
  try {
    const context = useContext(LanguageContext);
    if (!context) {
      throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
  } catch (e) {
    console.error(t('language.errors.hook'), e);
    return defaultValue;
  }
};