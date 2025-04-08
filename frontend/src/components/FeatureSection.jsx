import React from 'react';
import { useTranslation } from 'react-i18next';

const FeatureSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: "🌐",
      title: "Mundos Infinitos",
      description: "Explore ambientes gerados proceduralmente que evoluem com o tempo e interações da comunidade.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: "🏛️",
      title: "Propriedades Virtuais",
      description: "Adquira, construa e personalize seu espaço no metaverso com ferramentas intuitivas.",
      color: "from-purple-500 to-indigo-400"
    },
    {
      icon: "👤",
      title: "Avatares Personalizáveis",
      description: "Crie seu alter ego digital com milhares de opções e expressões únicas.",
      color: "from-pink-500 to-rose-400"
    },
    {
      icon: "💎",
      title: "Ativos Digitais",
      description: "Colecione, crie e negocie itens digitais exclusivos protegidos por blockchain.",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: "🎮",
      title: "Experiências Imersivas",
      description: "Participe de eventos, jogos e atividades sociais em realidade aumentada e virtual.",
      color: "from-orange-500 to-amber-400"
    },
    {
      icon: "🔄",
      title: "Ecosistema Aberto",
      description: "Conecte-se com outras plataformas e traga seus ativos para o AviTron Metaverse.",
      color: "from-teal-500 to-green-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="bg-black/40 backdrop-blur-sm border border-blue-500/10 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`w-14 h-14 flex items-center justify-center rounded-lg mb-4 bg-gradient-to-br ${feature.color}`}>
            <span className="text-2xl">{feature.icon}</span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
          
          <button className="mt-4 group flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            <span>{t('features.learnMore', 'Saiba mais')}</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
