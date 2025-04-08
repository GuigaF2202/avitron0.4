import React from 'react';

const DMCAPolicyModal = ({ isOpen, onClose, onAccept }) => {
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
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 sm:mx-0 sm:h-14 sm:w-14">
              <svg className="h-6 w-6 text-purple-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-8 sm:text-left w-full"> {/* Alterado ml-4 para ml-8 */}
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                DMCA Policy for AVITRON MULTIVERSE
              </h3>
              <div className="mt-2">
                <div className="text-base leading-6 text-gray-500 max-h-[80vh] overflow-y-auto pr-2">
                  <p className="font-semibold mt-2">1. Policy Statement</p>
                  <p className="mb-2">ARP LAB respects the intellectual property rights of others and expects users of AVITRON MULTIVERSE to do the same. We will respond to valid DMCA takedown notices and take appropriate action, including removal of infringing content and termination of repeat infringers.</p>
                  
                  <p className="font-semibold mt-4">2. Submitting a DMCA Notice</p>
                  <p className="mb-2">To submit a DMCA notice, provide the following information:</p>
                  <ul className="list-disc pl-5 mb-2">
                    <li>Your full legal name and contact information.</li>
                    <li>A description of the copyrighted work.</li>
                    <li>The location of the infringing material in AVITRON MULTIVERSE.</li>
                    <li>A statement of good faith belief that the use is unauthorized.</li>
                    <li>A statement under penalty of perjury that the information is accurate and you are the copyright owner or authorized agent.</li>
                    <li>Your physical or electronic signature.</li>
                  </ul>
                  <p className="mb-2">Send DMCA notices to: Alex Ferraris, arpholdings@gmail.com</p>
                  
                  <p className="font-semibold mt-4">3. Counter-Notification</p>
                  <p className="mb-2">If you believe your content was removed in error, you may submit a counter-notification including:</p>
                  <ul className="list-disc pl-5 mb-2">
                    <li>Your name and contact information.</li>
                    <li>Identification of the removed content.</li>
                    <li>A statement under penalty of perjury that the content was removed in error.</li>
                    <li>Consent to jurisdiction of your local federal court.</li>
                    <li>Your physical or electronic signature.</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">4. Repeat Infringer Policy</p>
                  <p className="mb-2">Users who are subject to multiple valid DMCA notices may have their accounts permanently terminated.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button"
                onClick={onAccept}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-purple-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple transition ease-in-out duration-150 sm:text-sm sm:leading-5">
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

export default DMCAPolicyModal;