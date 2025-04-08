import React, { useState, useEffect } from "react";
import "./HeroVideo.css"; // Arquivo CSS para os estilos personalizados

const HeroVideo = () => {
  const phrases = [
    "Dive into Dimensions Beyond Reality.",
    "Unlock Infinite Realms of Possibility.",
    "Experience the Extraordinary in Every Pixel.",
    "Where Imagination Meets Immersive Reality.",
    "Step Beyond Boundaries into Virtual Wonders.",
    "Transforming Dreams into Digital Experiences.",
    "Journey Through Worlds Crafted by Creativity.",
    "Embrace the Future: Live the Virtual Adventure.",
    "Redefine Reality: Explore the Unseen.",
    "Enter a Universe Where Fantasy Feels Real.",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showFinalPhrase, setShowFinalPhrase] = useState(false);

  useEffect(() => {
    let typingInterval;
    let charIndex = 0;

    // Função para digitar a frase atual
    const typePhrase = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      if (charIndex < currentPhrase.length) {
        setTypedText((prev) => prev + currentPhrase[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Avança para a próxima frase após um pequeno atraso
        setTimeout(() => {
          setTypedText("");
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 2000); // 2 segundos de pausa antes de digitar a próxima frase
      }
    };

    // Inicia o efeito de digitação
    typingInterval = setInterval(typePhrase, 30); // 100ms por caractere

    return () => clearInterval(typingInterval); // Limpa o intervalo ao desmontar o componente
  }, [currentPhraseIndex]);

  useEffect(() => {
    // Exibe a última frase após 2:50 (170 segundos)
    const finalPhraseTimer = setTimeout(() => {
      setShowFinalPhrase(true);
    }, 170000); // 170000ms = 2 minutos e 50 segundos

    return () => clearTimeout(finalPhraseTimer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center text-white">
      {/* Contêiner do vídeo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          className="min-w-full min-h-full absolute object-cover"
          src="/video/hero.mp4"
          type="video/mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>

      {/* Conteúdo sobreposto */}
      <div className="space-y-5 z-10">
        <h1 className="font-light text-6xl">AviTron: Where your imagination meets reality</h1>
        {!showFinalPhrase && (
          <h3 className="font-light text-3xl my-6">{typedText}</h3>
        )}
      </div>

      {/* Última frase fixa no final, exibida após 2:50 */}
      {showFinalPhrase && (
        <div
          className="absolute w-full text-center text-xl font-light text-gray-300"
          style={{ bottom: "2rem" }}
        >
          Enter a Universe Where Fantasy Feels Real.
        </div>
      )}
    </section>
  );
};

export default HeroVideo;