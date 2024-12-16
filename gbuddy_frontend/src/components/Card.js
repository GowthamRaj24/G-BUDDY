import React from 'react';
import { motion } from 'framer-motion';

export const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all"
    >
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

export const ResourceCard = ({ title, description, link }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
    >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
            href={link}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
            Learn More →
        </a>
    </motion.div>
);
