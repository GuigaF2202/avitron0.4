import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import TermsOfServiceModal from './TermsOfServiceModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import DMCAPolicyModal from './DMCAPolicyModal';

const Footer = () => {
  const { t } = useTranslation();
  const [terminalLines, setTerminalLines] = useState([]);
  const [connectionCount, setConnectionCount] = useState(237);
  const [isTyping, setIsTyping] = useState(false);
  const isMountedRef = useRef(true);
  
  // Estados para controlar a abertura dos modais
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDMCAModal, setShowDMCAModal] = useState(false);

  // Atualizando os comandos para usar traduções
  const possibleCommands = [
    {
      command: 'scan --dimensional-anomalies',
      responses: [
        { type: 'response', content: t('footer.terminal.scanning') },
        { type: 'response-success', content: t('footer.terminal.noAnomalies') }
      ]
    },
    {
      command: 'status --network',
      responses: [
        { type: 'response', content: t('footer.terminal.analyzingNetwork') },
        { type: 'response-success', content: t('footer.terminal.stableConnections') }
      ]
    },
    {
      command: 'query users --active --location="nexus-prime"',
      responses: [
        { type: 'response', content: t('footer.terminal.queryingUsers') },
        { type: 'response-success', content: t('footer.terminal.activeCreators') }
      ]
    },
    {
      command: 'monitor --creative-flow',
      responses: [
        { type: 'response', content: t('footer.terminal.monitoringFlow') },
        { type: 'response-success', content: t('footer.terminal.activityPeak') }
      ]
    },
    {
      command: 'check --updates',
      responses: [
        { type: 'response', content: t('footer.terminal.checkingUpdates') },
        { type: 'response-success', content: t('footer.terminal.systemUpdated') }
      ]
    }
  ];

  useEffect(() => {
    isMountedRef.current = true;

    const initialLines = [
      { type: 'command', content: 'connect --multiverse', delay: 500 },
      { type: 'response', content: t('footer.terminal.establishing'), delay: 1200 },
      { type: 'response-success', content: t('footer.terminal.accessGranted'), delay: 2000 },
      { type: 'command', content: 'navigate', delay: 3000 }
    ];

    let timeoutId;
    initialLines.forEach((line, index) => {
      timeoutId = setTimeout(() => {
        if (isMountedRef.current) {
          setTerminalLines(prev => [...prev, line]);
        }
      }, line.delay);
    });

    const connectionInterval = setInterval(() => {
      if (isMountedRef.current) {
        setConnectionCount(prev => Math.floor(Math.random() * 50) + 220);
      }
    }, 5000);

    const commandInterval = setInterval(() => {
      if (isMountedRef.current && !isTyping) {
        triggerRandomCommand();
      }
    }, 15000);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timeoutId);
      clearInterval(connectionInterval);
      clearInterval(commandInterval);
    };
  }, [isTyping, t]);

  const triggerRandomCommand = () => {
    if (isTyping) return;

    setIsTyping(true);

    const randomCommandSet = possibleCommands[Math.floor(Math.random() * possibleCommands.length)];

    setTerminalLines(prev => {
      const trimmedPrev = prev.length > 8 ? prev.slice(prev.length - 8) : prev;
      return [...trimmedPrev, { type: 'command', content: randomCommandSet.command }];
    });

    randomCommandSet.responses.forEach((response, index) => {
      setTimeout(() => {
        if (isMountedRef.current) {
          setTerminalLines(prev => [...prev, response]);

          if (index === randomCommandSet.responses.length - 1) {
            setTimeout(() => {
              if (isMountedRef.current) {
                setIsTyping(false);
              }
            }, 1000);
          }
        }
      }, 1000 + (index * 1500));
    });
  };

  // Atualizando os itens do multiverso para usar traduções
  const multiverseItems = [
    {
      id: 1,
      imageUrl: "./images/city-streets.jpg",
      title: t('footer.multiverse.items.1.title'),
      date: t('footer.multiverse.items.1.date'),
      category: t('footer.multiverse.items.1.category'),
      colorClass: "text-cyan-400"
    },
    {
      id: 2,
      imageUrl: "./images/digital-mind.jpg",
      title: t('footer.multiverse.items.2.title'),
      date: t('footer.multiverse.items.2.date'),
      category: t('footer.multiverse.items.2.category'),
      colorClass: "text-purple-400"
    },
    {
      id: 3,
      imageUrl: "./images/future-city.jpg",
      title: t('footer.multiverse.items.3.title'),
      date: t('footer.multiverse.items.3.date'),
      category: t('footer.multiverse.items.3.category'),
      colorClass: "text-amber-400"
    }
  ];

  const MultiverseItem = ({ imageUrl, title, date, category, colorClass }) => (
    <div className="w-full flex flex-col mt-4 group hover:transform hover:scale-102 transition-all duration-300">
      <div className="w-full flex gap-3">
        <div className="relative overflow-hidden rounded-sm">
          <img 
            className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] object-cover opacity-80 group-hover:opacity-100 transition-opacity xs:outline xs:outline-[1px] xs:outline-gray-800 group-hover:outline-gray-700" 
            src={imageUrl} 
            alt={title} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <div className="absolute bottom-1 left-2">
            <span className={`text-xs font-medium ${colorClass}`}>{category}</span>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h3 className={`xs:text-lg text-sm font-semibold group-hover:${colorClass} transition-colors`}>
            {title}
          </h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );

  // Função para lidar com aceitação de termos e políticas
  const handlePolicyAccept = (policyType) => {
    console.log(`${policyType} aceito!`);
    // Aqui você pode implementar lógica adicional como salvar em localStorage
    
    // Fechar o modal correspondente
    if (policyType === 'terms') setShowTermsModal(false);
    if (policyType === 'privacy') setShowPrivacyModal(false);
    if (policyType === 'dmca') setShowDMCAModal(false);
  };

  return (
    <div className="w-full h-full">
      <footer className="w-full h-fit bg-black text-white relative bottom-0">
        <div className="w-full mx-auto sm:px-10 px-4 pb-10">
          {/* Grid container com ajustes de centralização */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center pt-12">
            {/* Coluna 1 - Logo */}
            <div className="lg:w-full w-full mt-16 mb-8 lg:mb-0 flex flex-col items-center text-center">
              <div className="flex justify-center">
                <img 
                  className="w-[5rem] h-auto" 
                  src="./images/logo.png" 
                  alt={t('footer.logo.alt')} 
                />
              </div>
              <p className="mt-4 text-sm text-gray-300 max-w-[250px]">
                {t('footer.description')}
              </p>
            </div>
            
            {/* Coluna 2 - Itens do Multiverso - Ajustada 15% para direita */}
            <div className="lg:w-full w-full flex flex-col items-center">
              <div className="w-full max-w-md lg:translate-x-[15%]">
                <h2 className="text-white text-xl font-medium mb-5 border-l-2 border-cyan-400 pl-3">
                  {t('footer.multiverse.title')}
                </h2>
                
                {multiverseItems.map(item => (
                  <MultiverseItem 
                    key={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    date={item.date}
                    category={item.category}
                    colorClass={item.colorClass}
                  />
                ))}
              </div>
            </div>
            
            {/* Coluna 3 - About Us - Agora centralizada */}
            <div className="lg:w-full w-full flex flex-col items-center relative">
  <div className="w-full max-w-md lg:translate-x-1/2">
    <h2 className="text-white text-xl font-medium mb-5 border-l-2 border-[#00C1E8] pl-3">
      About Us
    </h2>
    <ul className="space-y-3">
      <li>
        <button 
          onClick={() => setShowTermsModal(true)} 
          className="text-gray-300 hover:text-[#00C1E8] transition-colors duration-300 flex items-center"
        >
          <span className="w-1.5 h-1.5 bg-[#00C1E8] mr-2 rounded-full"></span>
          Terms & Conditions
        </button>
      </li>
                  <li>
                    <button 
                      onClick={() => setShowPrivacyModal(true)} 
                      className="text-gray-300 hover:text-[#00C1E8] transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-[#00C1E8] mr-2 rounded-full"></span>
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setShowDMCAModal(true)} 
                      className="text-gray-300 hover:text-[#00C1E8] transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-[#00C1E8] mr-2 rounded-full"></span>
                      DMCA Policy
                    </button>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-300 hover:text-[#00C1E8] transition-colors duration-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#00C1E8] mr-2 rounded-full"></span>
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-300 hover:text-[#00C1E8] transition-colors duration-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#00C1E8] mr-2 rounded-full"></span>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Coluna 4 - Ícones Sociais e Terminal */}
            <div className="lg:w-full w-full flex flex-col items-center">
              {/* Ícones Sociais */}
              <div className="flex justify-center gap-4 mb-6 w-full">
                <a href="#" aria-label={t('footer.social.facebook')} className="transition-transform hover:scale-110">
                  <div className="flex items-center justify-center p-2 border border-gray-700 rounded-full hover:bg-blue-500 transition-colors duration-300">
                    <FaFacebook className="text-lg" />
                  </div>
                </a>
                <a href="#" aria-label={t('footer.social.instagram')} className="transition-transform hover:scale-110">
                  <div className="flex items-center justify-center p-2 border border-gray-700 rounded-full hover:bg-pink-500 transition-colors duration-300">
                    <FaInstagram className="text-lg" />
                  </div>
                </a>
                <a href="#" aria-label={t('footer.social.whatsapp')} className="transition-transform hover:scale-110">
                  <div className="flex items-center justify-center p-2 border border-gray-700 rounded-full hover:bg-green-500 transition-colors duration-300">
                    <FaWhatsapp className="text-lg" />
                  </div>
                </a>
                <a href="#" aria-label={t('footer.social.tiktok')} className="transition-transform hover:scale-110">
                  <div className="flex items-center justify-center p-2 border border-gray-700 rounded-full hover:bg-gray-900 transition-colors duration-300">
                    <FaTiktok className="text-lg" />
                  </div>
                </a>
              </div>
              
              {/* Terminal de Acesso Dimensional */}
              <div className="w-full max-w-[336px] border border-gray-800 rounded-md overflow-hidden bg-black/60">
                {/* Cabeçalho do terminal */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-1.5 px-3 flex items-center justify-between border-b border-gray-700">
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-1.5"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-1.5"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">avitron_terminal::v1.2.5</span>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-1 h-1 bg-cyan-400 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Conteúdo do terminal */}
                <div className="terminal-content p-3 font-mono text-xs min-h-[160px] max-h-[200px] overflow-y-auto">
                  {terminalLines.map((line, index) => (
                    <div key={index} className={`terminal-line ${index > 0 ? 'mt-1' : ''}`}>
                      {line.type === 'command' && (
                        <div className="flex">
                          <span className="text-green-400 mr-2">visitor@avitron:~$</span>
                          <span className="text-gray-300">{line.content}</span>
                          {index === terminalLines.length - 1 && isTyping && (
                            <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-blink"></span>
                          )}
                        </div>
                      )}
                      {line.type === 'response' && (
                        <div className="text-cyan-400">
                          {line.content}
                        </div>
                      )}
                      {line.type === 'response-success' && (
                        <div className="text-purple-400">
                          {line.content}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Links de navegação */}
                  {terminalLines.length >= 4 && terminalLines.some(line => line.content === 'navigate') && (
                    <div className="terminal-destinations mt-2 ml-4">
                      <a href="#explorar" className="block text-amber-400 hover:underline hover:text-amber-300 mb-1 transition-colors">
                        &gt; {t('footer.terminal.navigation.explore')}
                      </a>
                      <a href="#criar" className="block text-cyan-400 hover:underline hover:text-cyan-300 mb-1 transition-colors">
                        &gt; {t('footer.terminal.navigation.create')}
                      </a>
                      <a href="#comunidade" className="block text-purple-400 hover:underline hover:text-purple-300 transition-colors">
                        &gt; {t('footer.terminal.navigation.connect')}
                      </a>
                    </div>
                  )}
                  
                  {/* Cursor */}
                  {!isTyping && (
                    <div className="terminal-line mt-2 flex">
                      <span className="text-green-400 mr-2">visitor@avitron:~$</span>
                      <span className="inline-block w-2 h-4 bg-white/70 animate-blink"></span>
                    </div>
                  )}
                  
                  {/* Barra de status do terminal */}
                  <div className="terminal-status mt-4 flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-800 pt-2">
                    <div>{t('footer.terminal.status.connections')}: <span className="text-green-400">{connectionCount} {t('footer.terminal.status.active')}</span></div>
                    <div>{t('footer.terminal.status.status')}: <span className="text-green-400">{t('footer.terminal.status.online')}</span></div>
                    <div className="flex items-center">
                      pulse <span className="inline-block w-8 h-1 bg-gradient-to-r from-green-500 to-transparent ml-1"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-800 mt-12 mb-6" />

          {/* Seção de Copyright */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} AviTron Multiverse
            </div>
            <div className="text-xs text-gray-600">
              {t('footer.copyright')}
            </div>
          </div>
        </div>
      </footer>

      {/* Modais de Termos e Políticas */}
      <TermsOfServiceModal 
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => handlePolicyAccept('terms')}
      />
      
      <PrivacyPolicyModal 
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onAccept={() => handlePolicyAccept('privacy')}
      />
      
      <DMCAPolicyModal 
        isOpen={showDMCAModal}
        onClose={() => setShowDMCAModal(false)}
        onAccept={() => handlePolicyAccept('dmca')}
      />
    </div>
  );
};

export default Footer;