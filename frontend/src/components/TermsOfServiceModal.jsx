import React from 'react';

const TermsOfServiceModal = ({ isOpen, onClose, onAccept }) => {
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
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-green-100 sm:mx-0 sm:h-14 sm:w-14">
              <svg className="h-6 w-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Terms of Service (TOS) for AVITRON MULTIVERSE
              </h3>
              <div className="mt-2">
                <div className="text-base leading-6 text-gray-500 max-h-[80vh] overflow-y-auto pr-2">
                  <p className="font-semibold mb-2">Effective Date: 2025</p>
                  
                  <p className="font-semibold mt-4">1. Introduction</p>
                  <p className="mb-2">Welcome to AVITRON MULTIVERSE, a virtual world created and operated by ARP LAB ("we," "us," or "our"). By accessing or using AVITRON MULTIVERSE ("Platform"), you agree to be bound by these Terms of Service ("TOS"). If you do not agree to these terms, do not use the Platform.</p>
                  
                  <p className="font-semibold mt-4">2. Eligibility</p>
                  <p className="mb-2">You must be at least 18 years old to access or use the Platform. Use of the Platform by minors under the age of 18, or users who present themselves as children (i.e., child avatars), is strictly prohibited and will result in account termination.</p>
                  
                  <p className="font-semibold mt-4">3. User Conduct</p>
                  <p className="mb-2">By using the Platform, you agree:</p>
                  <ul className="list-disc pl-5 mb-2">
                    <li>Not to harass, abuse, or harm others.</li>
                    <li>Not to engage in hate speech, threats, or discrimination.</li>
                    <li>Not to impersonate others or misrepresent your identity.</li>
                    <li>Not to engage in or promote illegal activities, including but not limited to gambling.</li>
                    <li>To follow all community guidelines and rules posted within the Platform.</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">4. Intellectual Property and Copyright</p>
                  <p className="mb-2">All content within AVITRON MULTIVERSE is either the property of ARP LAB or used with appropriate permissions. The use or import of copyrighted content from other virtual worlds, including but not limited to Second Life (SL), without explicit permission from the copyright holder, is strictly prohibited.</p>
                  <p className="mb-2">If such content is found or reported, it will be removed immediately in compliance with our DMCA policy. Repeat violations may result in permanent account termination.</p>
                  
                  <p className="font-semibold mt-4">5. Virtual Economy and Transactions</p>
                  <p className="mb-2">The Platform may support a virtual economy. Users may buy, sell, or trade virtual goods or currency. All transactions are subject to the rules and regulations outlined in our Commerce Policy (see Appendix A).</p>
                  
                  <p className="font-semibold mt-4">6. Account Suspension and Termination</p>
                  <p className="mb-2">ARP LAB reserves the right to suspend or terminate accounts that violate these TOS or engage in behavior deemed harmful to the community.</p>
                  
                  <p className="font-semibold mt-4">7. Changes to Terms</p>
                  <p className="mb-2">We reserve the right to modify these TOS at any time. We will notify users of significant changes through in-world notices or by email. Continued use of the Platform after such changes constitutes acceptance of the new terms.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button"
                onClick={onAccept}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
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

export default TermsOfServiceModal;