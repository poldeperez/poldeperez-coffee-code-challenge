'use client';

import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  message: string | null;
  onClose: () => void;
};

export function ErrorBanner({ message, onClose }: Props) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed top-6 right-6 z-[100] bg-[#FF4949] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          <span>{message}</span>
          <button onClick={onClose} className="hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}