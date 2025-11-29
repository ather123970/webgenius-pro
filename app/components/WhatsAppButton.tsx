'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    const phoneNumber = '923434153736';
    const message = encodeURIComponent("Hi AtherTechy, I'm interested in your web services");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
                <img
                    src="/whatsapp-icon.png"
                    alt="WhatsApp"
                    className="w-7 h-7 object-contain"
                />
            </motion.a>
        </motion.div>
    );
}
