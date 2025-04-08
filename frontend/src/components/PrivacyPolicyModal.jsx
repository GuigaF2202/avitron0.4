import React from 'react';

const PrivacyPolicyModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[80%] sm:w-[80%] sm:p-6"
          style={{ maxHeight: '150vh' }}
        >
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 sm:mx-0 sm:h-14 sm:w-14">
              <svg className="h-6 w-6 text-blue-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-8 sm:text-left w-full"> {/* Alterado ml-4 para ml-8 */}
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Privacy Policy for AVITRON MULTIVERSE
              </h3>
              <div className="mt-2">
                <div className="text-base leading-6 text-gray-500 max-h-[80vh] overflow-y-auto pr-2">
                  <p className="font-semibold mb-2">Effective Date: 2025</p>
                  
                  <p className="font-semibold mt-4">1. Information We Collect</p>
                  <ul className="list-disc pl-5 mb-2">
                    <li><span className="font-medium">Account Information:</span> Name, email address, age confirmation.</li>
                    <li><span className="font-medium">Usage Data:</span> IP address, device type, interaction logs.</li>
                    <li><span className="font-medium">Communications:</span> Chat logs, voice data (if applicable), support communications.</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">2. How We Use Your Information</p>
                  <ul className="list-disc pl-5 mb-2">
                    <li>To provide and improve our services.</li>
                    <li>To enforce our Terms of Service.</li>
                    <li>To communicate with you regarding updates, issues, or changes.</li>
                    <li>For safety and moderation purposes.</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">3. Sharing and Disclosure</p>
                  <p className="mb-2">We do not sell or share your information with third parties except:</p>
                  <ul className="list-disc pl-5 mb-2">
                    <li>To comply with legal obligations.</li>
                    <li>To protect the rights and safety of users and ARP LAB.</li>
                    <li>With vendors or service providers working on our behalf under strict confidentiality.</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">4. Data Security</p>
                  <p className="mb-2">We use commercially reasonable measures to protect your data but cannot guarantee absolute security.</p>
                  
                  <p className="font-semibold mt-4">5. User Rights</p>
                  <p className="mb-2">You may request to access, correct, or delete your personal data by contacting us at support@avitronmultiverse.com.</p>
                  
                  <p className="font-semibold mt-4">6. Data Retention</p>
                  <p className="mb-2">We retain your data only as long as necessary to fulfill the purposes outlined above or as required by law.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button"
                onClick={onAccept}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Accept
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button type="button"
                onClick={onClose}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;