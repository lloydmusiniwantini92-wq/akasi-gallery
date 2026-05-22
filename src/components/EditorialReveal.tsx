import React from 'react';
import { motion } from 'motion/react';

interface EditorialRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export const EditorialReveal: React.FC<EditorialRevealProps> = ({ 
  children, 
  delay = 0, 
  className = "",
  yOffset = 100
}) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-15%" }}
    transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);
