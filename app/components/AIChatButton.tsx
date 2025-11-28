'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function AIChatButton() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 260, damping: 20 }}
                className="fixed bottom-24 right-8 z-50"
            >
                <motion.button
                    onClick={toggleChat}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                    <img
                        src="/ai-assistant-icon.png"
                        alt="AI Assistant"
                        className="w-7 h-7 object-contain"
                    />
                </motion.button>
            </motion.div>

            {/* Chat Box - Positioned near button */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-44 right-8 z-50 bg-white rounded-2xl shadow-2xl w-[380px] h-[500px] overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        {/* Chat Content */}
                        <div className="h-full">
                            <iframe
                                src="https://www.chatbase.co/chatbot-iframe/Vgdm6QxQQQzhjan0gjMPE"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                className="w-full h-full"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
