import React from 'react';
import { useTranslation } from 'react-i18next';

const PricingCards = () => {
  const { t } = useTranslation();
  
  // Premium membership details with 10% price increase
  const premiumMembership = {
    title: t('pricing.premiumMembership.title'),
    price: 18.36, // $15 increased by 10%
    benefits: [
      t('pricing.premiumMembership.benefits.trons'),
      t('pricing.premiumMembership.benefits.island'),
      t('pricing.premiumMembership.benefits.support'),
      t('pricing.premiumMembership.benefits.perks')
    ]
  };

  // Island upgrades data with 10% price increase
  const islandUpgrades = [
    { tier: t('pricing.islandUpgrades.tiers.included'), prims: '10,000', price: 'Free (w/ Premium)' },
    { tier: t('pricing.islandUpgrades.tiers.tier1'), prims: '20,000', price: 8.64 },
    { tier: t('pricing.islandUpgrades.tiers.tier2'), prims: '30,000', price: 18.36 },
    { tier: t('pricing.islandUpgrades.tiers.tier4x4'), prims: '80,000', price: '$42,12 - $47,52' }
  ];

  // Extra regions data with 10% price increase
  const extraRegions = [
    { type: t('pricing.extraRegions.types.basic'), prims: '10,000', price: 7.56, setupFee: 5.50 },
    { type: t('pricing.extraRegions.types.medium'), prims: '20,000', price: 15.12, setupFee: 5.50 },
    { type: t('pricing.extraRegions.types.large'), prims: '30,000', price: 24.84, setupFee: 5.50 },
    { type: t('pricing.extraRegions.types.mega'), prims: '80,000', price: 48.60, setupFee: 5.50 }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0f0f1f] to-[#1a1a2e] min-h-screen font-sans text-white">

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">{t('pricing.title')}</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{t('pricing.headline')}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Premium Membership Card */}
          <div className="relative bg-gradient-to-br from-[#1f1f3a] to-[#2a2a4a] rounded-xl p-8 shadow-xl border border-[#292945] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,216,255,0.3)] hover:translate-y-[-5px] overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#00d8ff] text-[#1f1f3a] py-1 px-4 text-sm font-bold rounded-bl-lg">MOST POPULAR</div>
            <div className="h-20 w-20 mx-auto bg-gradient-to-br from-[#00d8ff] to-[#00a8ff] rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🌟</span>
            </div>
            <h2 className="text-2xl font-bold text-center text-[#00d8ff] mb-4">
              {premiumMembership.title}
            </h2>
            <div className="text-center mb-6">
              <span className="text-4xl font-extrabold text-white">${premiumMembership.price.toFixed(2)}</span>
              <span className="text-gray-300 ml-2">/{t('pricing.premiumMembership.month')}</span>
            </div>
            <div className="border-t border-b border-[#292945] py-6 mb-6">
              <ul className="space-y-4">
                {premiumMembership.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-gray-200">
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-gradient-to-r from-[#00d8ff] to-[#00a8ff] hover:from-[#00c4e8] hover:to-[#0098e8] text-[#1f1f3a] font-bold py-3 rounded-lg transition-colors duration-300 shadow-lg">
              {t('pricing.buttons.subscribe')}
            </button>
          </div>

          {/* Tron Economy Card */}
          <div className="relative bg-gradient-to-br from-[#1f1f3a] to-[#2a2a4a] rounded-xl p-8 shadow-xl border border-[#292945] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,216,255,0.3)] hover:translate-y-[-5px] overflow-hidden">
            <div className="h-20 w-20 mx-auto bg-gradient-to-br from-[#00d8ff] to-[#00a8ff] rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">⚖️</span>
            </div>
            <h2 className="text-2xl font-bold text-center text-[#00d8ff] mb-4">{t('pricing.tronEconomy.title')}</h2>
            <div className="text-center mb-6">
              <div className="bg-[#292945] rounded-lg p-4 mb-4">
                <p className="text-2xl font-bold text-[#00d8ff]">{t('pricing.tronEconomy.exchangeRate')}</p>
              </div>
            </div>
            <div className="border-t border-b border-[#292945] py-6 mb-6">
              <p className="mb-3">{t('pricing.tronEconomy.uses')}</p>
              <p className="text-gray-300">{t('pricing.tronEconomy.premium')}</p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#00d8ff] to-[#00a8ff] hover:from-[#00c4e8] hover:to-[#0098e8] text-[#1f1f3a] font-bold py-3 rounded-lg transition-colors duration-300 shadow-lg">
              {t('pricing.buttons.purchaseTrons')}
            </button>
          </div>
        </div>

        <div className="text-center my-16">
          <h2 className="text-3xl font-bold text-white">{t('pricing.title')}</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{t('pricing.headline')}</p>
        </div>

        {/* Island Upgrades Card */}
        <div className="bg-gradient-to-br from-[#1f1f3a] to-[#2a2a4a] rounded-xl p-8 shadow-xl border border-[#292945] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,216,255,0.3)] mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#00d8ff]">{t('pricing.islandUpgrades.title')}</h2>
            <span className="text-sm bg-[#292945] py-1 px-3 rounded-full text-gray-300">{t('pricing.islandUpgrades.subtitle')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-[#292945] p-4 text-left text-lg font-bold text-[#00d8ff]">{t('pricing.islandUpgrades.columns.tier')}</th>
                  <th className="border-b-2 border-[#292945] p-4 text-center text-lg font-bold text-[#00d8ff]">{t('pricing.islandUpgrades.columns.prims')}</th>
                  <th className="border-b-2 border-[#292945] p-4 text-center text-lg font-bold text-[#00d8ff]">{t('pricing.islandUpgrades.columns.price')}</th>
                  <th className="border-b-2 border-[#292945] p-4 text-center text-lg font-bold text-[#00d8ff]">{t('pricing.islandUpgrades.columns.action')}</th>
                </tr>
              </thead>
              <tbody>
                {islandUpgrades.map((upgrade, idx) => (
                  <tr key={idx} className="hover:bg-[#292945] transition-colors duration-200">
                    <td className="border-b border-[#292945] p-4">{upgrade.tier}</td>
                    <td className="border-b border-[#292945] p-4 text-center">{upgrade.prims}</td>
                    <td className="border-b border-[#292945] p-4 text-center">
                      {typeof upgrade.price === 'number' ? `$${upgrade.price.toFixed(2)}` : upgrade.price}
                    </td>
                    <td className="border-b border-[#292945] p-4 text-center">
                      {upgrade.tier === t('pricing.islandUpgrades.tiers.included') ? (
                        <span className="text-gray-400">{t('pricing.islandUpgrades.tiers.includedWithPremium')}</span>
                      ) : (
                        <button className="bg-gradient-to-r from-[#00d8ff] to-[#00a8ff] hover:from-[#00c4e8] hover:to-[#0098e8] text-[#1f1f3a] font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm">
                          {t('pricing.buttons.purchase')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Extra Regions Card */}
        <div className="bg-gradient-to-br from-[#1f1f3a] to-[#2a2a4a] rounded-xl p-8 shadow-xl border border-[#292945] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,216,255,0.3)]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#00d8ff]">{t('pricing.extraRegions.title')}</h2>
            <span className="text-sm bg-[#292945] py-1 px-3 rounded-full text-gray-300">{t('pricing.extraRegions.subtitle')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-[#292945] p-4 text-left text-lg font-bold text-[#00d8ff]">{t('pricing.extraRegions.columns.type')}</th>
                  <th className="border-b-2 border-[#292945] p-4 text-center text-lg font-bold text-[#00d8ff]">{t('pricing.extraRegions.columns.prims')}</th>
                  <th className="border-b-2 border-[#292945] p-4 text-center text-lg font-bold text-[#00d8ff]">{t('pricing.extraRegions.columns.price')}</th>
                  <th className="border-b-2 border-[#292945] p-4 text-center text-lg font-bold text-[#00d8ff]">{t('pricing.extraRegions.columns.setupFee')}</th>
                  <th className="border-b-2 border-[#292945] p-4 text-center text-lg font-bold text-[#00d8ff]">{t('pricing.extraRegions.columns.action')}</th>
                </tr>
              </thead>
              <tbody>
                {extraRegions.map((region, idx) => (
                  <tr key={idx} className="hover:bg-[#292945] transition-colors duration-200">
                    <td className="border-b border-[#292945] p-4">{region.type}</td>
                    <td className="border-b border-[#292945] p-4 text-center">{region.prims}</td>
                    <td className="border-b border-[#292945] p-4 text-center">${region.price.toFixed(2)}</td>
                    <td className="border-b border-[#292945] p-4 text-center">${region.setupFee.toFixed(2)}</td>
                    <td className="border-b border-[#292945] p-4 text-center">
                      <button className="bg-gradient-to-r from-[#00d8ff] to-[#00a8ff] hover:from-[#00c4e8] hover:to-[#0098e8] text-[#1f1f3a] font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm">
                        {t('pricing.buttons.purchase')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center py-10 bg-gradient-to-br from-[#1f1f3a] to-[#2a2a4a] rounded-xl border border-[#292945] shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">{t('pricing.callToAction.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('pricing.callToAction.description')}
          </p>
          <button className="bg-gradient-to-r from-[#00d8ff] to-[#00a8ff] hover:from-[#00c4e8] hover:to-[#0098e8] text-[#1f1f3a] font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg shadow-lg">
            {t('pricing.callToAction.button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;