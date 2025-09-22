import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const Footer = () => (
  <footer className="mt-auto bg-white border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 md:grid-cols-3">
      <div>
        <div className="flex items-center gap-2 font-semibold text-primary">
          <FaLeaf />
          <span>GreenQuest</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Sustainable farming made engaging and rewarding.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Contact</h4>
        <p className="text-sm text-gray-600">support@greenquest.io</p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Follow</h4>
        <div className="flex gap-3 text-gray-600">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-primary">X</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary">IG</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-primary">YT</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
