import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <FaGraduationCap className="h-8 w-8 text-emerald-600" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                G-BUDDY
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your ultimate college companion for academic success.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" icon={<FaGithub />} />
                            <SocialLink href="#" icon={<FaLinkedin />} />
                            <SocialLink href="#" icon={<FaTwitter />} />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
                        <FooterLinks links={['Notes Sharing', 'Marketplace', 'Study Groups', 'Resources']} />
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                        <FooterLinks links={['About Us', 'Contact', 'Privacy Policy', 'Terms of Service']} />
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
                        <FooterLinks links={['Help Center', 'FAQs', 'Community', 'Contact Us']} />
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} G-BUDDY. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ href, icon }) => (
    <a 
        href={href}
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-500 hover:text-white transition-all"
    >
        {icon}
    </a>
);

const FooterLinks = ({ links }) => (
    <ul className="space-y-3">
        {links.map((link, index) => (
            <li key={index}>
                <Link 
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                    {link}
                </Link>
            </li>
        ))}
    </ul>
);


export default Footer;
