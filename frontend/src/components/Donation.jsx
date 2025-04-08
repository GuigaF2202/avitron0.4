import React, { useState, useEffect } from 'react';

const Donation = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Abre o modal automaticamente quando o componente montar
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDonation = () => {
    window.open('https://www.paypal.com/donate/?hosted_button_id=2ZSY777XJ39P4', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-[9999]">
      <div 
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        onClick={handleClose}
      />

      <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg z-[10000] overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Support the AVITRON MULTIVERSE
            </p>
            <button 
              onClick={handleClose}
              className="modal-close cursor-pointer z-50 hover:text-gray-600"
            >
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
              </svg>
            </button>
          </div>

          <div className="mt-4 space-y-4 text-gray-600">
            <p>AVITRON MULTIVERSE was built on the belief that everyone deserves a place in the future of virtual worlds — a space where creativity, freedom, and community thrive.</p>

            <p>Many of you have received free land as part of our vision to build a vibrant, user-driven digital universe. Whether you're a pioneer landowner or a passionate supporter, your contributions help us grow, innovate, and keep AVITRON open and evolving for everyone.</p>

            <div>
              <p className="font-bold mb-2">Your donations go directly toward:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Expanding server infrastructure to support more users</li>
                <li>Developing new features, tools, and in-world experiences</li>
                <li>Supporting artists, builders, and developers who bring AVITRON to life</li>
                <li>Keeping the platform free and accessible for all dreamers and creators</li>
              </ul>
            </div>

            <p className="font-bold">This is more than a world — it's a movement. And you are part of it.</p>

            <div>
              <p className="font-bold mb-2">Ways You Can Help:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Donate any amount — every Tron helps!</li>
                <li>Support monthly to help us scale sustainably</li>
                <li>Share AVITRON with others and grow our community</li>
              </ul>
            </div>

            <p className="font-bold">Thank you for believing in the future we're building — together.</p>
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleDonation}
              className="px-6 py-3 bg-purple-500 rounded-lg text-white font-bold hover:bg-purple-400 transition duration-300"
            >
              DONATE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;