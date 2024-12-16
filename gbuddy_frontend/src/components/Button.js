import React from 'react';
import { motion } from 'framer-motion';

export const PrimaryButton = ({ children, className = '', ...props }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        className={`px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all ${className}`}
        {...props}
    >
        {children}
    </motion.button>
);

export const SecondaryButton = ({ children, className = '', ...props }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        className={`px-6 py-2.5 rounded-full border border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-50 transition-all ${className}`}
        {...props}
    >
        {children}
    </motion.button>
);
