import React from 'react';

const DonationSite = () => {
  return (
    <div className="relative overflow-hidden border-b w-full bg-zinc-900 dark:border-gray-700">
      <div className="px-6 py-8 sm:px-6 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-base font-semibold text-yellow-400 dark:text-pink-300 tracking-wide uppercase">
            Support the AVITRON MULTIVERSE
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-white dark:text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
            AVITRON 
            <span className="px-2 py-1 relative inline-block">
              <svg className="stroke-current bottom-0 absolute text-yellow-300 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none" fillRule="evenodd" strokeLinecap="round" />
              </svg>
              <span className="relative">MULTIVERSE</span>
            </span>
          </p>
          <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-300">
            A space where creativity, freedom, and community thrive. Your donations keep AVITRON open and evolving for everyone!
          </p>
          <p className="max-w-3xl mt-5 mx-auto text-lg text-gray-300">
            This is more than a world — it's a movement. And you are part of it.
          </p>
          <p className="max-w-3xl mt-5 mx-auto text-lg text-gray-300">
            Every Tron helps expand our servers, develop new features, and support the creators who bring AVITRON to life!
          </p>
          <a 
            href="https://www.paypal.com/donate/?hosted_button_id=2ZSY777XJ39P4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 mt-8 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-700 transition-all duration-300"
          >
            Donate Today
          </a>
        </div>
      </div>
      <svg 
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default DonationSite;