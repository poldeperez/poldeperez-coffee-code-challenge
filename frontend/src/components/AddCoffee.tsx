'use client';

import { useState } from 'react';
import { Item } from '@/types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (coffee: Omit<Item, 'id'>) => void;
};

export function AddCoffee({ isOpen, onClose, onConfirm }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState<'arabic' | 'robusta'>('arabic');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleDiscard = () => {
    setName('');
    setPrice('');
    setType('arabic');
    setImageUrl('');
    setDescription('');
    onClose();
  };

  const handleConfirm = () => {
    onConfirm({
      title: name.trim(),
      price: price.trim(),
      type,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
    });
    handleDiscard();
  };

  const isFormIncomplete =
    !name.trim() ||
    !price.trim() ||
    !imageUrl.trim() ||
    !description.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70"
            onClick={handleDiscard}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 bg-[#191919] rounded-lg p-10 w-full max-w-[714px] mx-4 flex flex-col items-center"
            initial={{ y: -80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          >
            <div className="hidden md:block absolute left-0 bottom-0 z-0">
              <Image
                src="/popup.png"
                alt=""
                width={192}
                height={192}
                className="pointer-events-none select-none"
                aria-hidden="true"
                priority
                style={{ height: 'auto' }} 
              />
            </div>
            {/* Close button */}
            <button 
              onClick={handleDiscard}
              className="absolute top-10 right-10 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-bebas text-[50px] text-white mt-8 mb-6">Create new</h2>

            <form className="flex flex-col w-full gap-4 max-w-[442px]">
              {/* Name and Price */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-[14px] text-[#9B9B9B] mb-1 block">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#2D2D2D] border border-[#838382] text-[14px] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#BA8039]"
                    placeholder="Name your coffee here"
                  />
                </div>
                <div className="w-full md:w-32">
                  <label className="text-[14px] text-[#9B9B9B] mb-1 block">Price</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={price}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                          setPrice(value);
                        }
                      }}
                      className="w-full bg-[#2D2D2D] border border-[#838382] text-[14px] text-white rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#BA8039]"
                      placeholder="0.00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[14px]">€</span>
                  </div>
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="text-[14px] text-[#9B9B9B] mb-1 block">Type</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setType('arabic')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors bg-transparent border ${
                      type === 'arabic'
                        ? 'border-white text-white'
                        : 'border-[#838382] text-[#838382] hover:border-white hover:text-white'
                    }`}
                  >
                    Arabic
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('robusta')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors bg-transparent border ${
                      type === 'robusta'
                        ? 'border-white text-white'
                        : 'border-[#838382] text-[#838382] hover:border-white hover:text-white'
                    }`}
                  >
                    Robusta
                  </button>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="text-[14px] text-[#9B9B9B] mb-1 block">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#2D2D2D] border border-[#838382] text-[14px] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#BA8039]"
                  placeholder="Paste image URL here"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[14px] text-[#9B9B9B] mb-1 block">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#2D2D2D] border border-[#838382] text-[14px] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#BA8039] resize-none h-16"
                  placeholder="Add a description"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="px-10 py-3 rounded-full border border-[#BA8039] text-white hover:text-white hover:border-white transition-colors"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isFormIncomplete}
                  className={`px-10 py-3 rounded-full bg-[#BA8039] text-white hover:bg-amber-700 transition-colors ${
                    isFormIncomplete ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Confirm
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}