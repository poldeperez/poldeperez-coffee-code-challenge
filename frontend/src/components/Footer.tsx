'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const imageUrl = '/footer.png';

  const layerVariants = {
    hidden: { y: -180, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        bounce: 0.5,
        duration: 1.5,
        delay: 1 - i * 0.02,
      },
    }),
  };

  return (
    <footer className="relative bg-[#101011] h-[400px] overflow-hidden flex items-center justify-center">
      {/* Back layers */}
      <motion.div
        custom={0}
        variants={layerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 bg-repeat-x bg-top opacity-60"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <motion.div
        custom={1}
        variants={layerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-x-0 top-[100px] h-full bg-repeat-x bg-top opacity-70"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Text */}
      <div className="relative z-10 text-center">
        <span className="text-[54px] md:text-[108px] text-white">MVST</span>
        <span className="text-[32px] md:text-[60px] ml-1 text-white">Coffee</span>
      </div>

      {/* Front layers */}
      {[
        'inset-0 bg-center',
        'inset-x-0 bottom-0 bg-bottom',
        'inset-x-0 top-[250px] left-10 h-[200px] bg-top',
        'inset-x-0 top-[300px] left-4 h-[200px] bg-top',
        'inset-x-0 top-[330px] h-[200px] bg-top',
      ].map((classes, i) => (
        <motion.div
          key={i}
          custom={i + 2}
          variants={layerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className={`absolute z-20 bg-repeat-x pointer-events-none ${classes}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ))}
    </footer>
  );
}
