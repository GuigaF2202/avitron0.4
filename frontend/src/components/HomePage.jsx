import React from 'react';
import Newsletter from './Newsletter';
import { useTranslation } from 'react-i18next';
import HeroVideo from './HeroVideo';
import Donation from './Donation';
import AnimatedImageGallery from './AnimatedImageGallery';
import Team from './Team';
import '../i18n';
import '../index.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import DonationSite from './DonationSite';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <LanguageProvider>
      <div className="flex flex-col">
        {/* HeroVideo */}
        <div className="w-full h-[85vh] relative">
          <HeroVideo />
        </div>
        {/* Donation Section */}
        <Donation />
        {/* AnimatedImageGallery */}
        <div className="w-full py-16 bg-zinc-900">
          <h2 className="text-3xl font-bold text-center text-white mb-10">
            {t('homePage.galleryTitle', 'Image Gallery')}
          </h2>
          <AnimatedImageGallery />
        </div>
           <DonationSite />
        {/* Team Section */}
        <div className="w-full">
          <Team />
        </div>

        {/* Newsletter */}
        <div className="w-full bg-[#0A0A0B] flex justify-center items-center py-24 px-8">
          <div className="w-full max-w-4xl">
            <Newsletter />
          </div>
        </div>

        {/* Barra no final */}
        <div className="w-full bg-zinc-900 py-8"></div>
      </div>
    </LanguageProvider>
  );
};

export default HomePage;