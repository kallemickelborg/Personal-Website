import React from 'react';
import { motion } from 'framer-motion';

const fadeInDownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

const FadeInDown = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInDownVariants}
    >
      {children}
    </motion.div>
  );
};

export default FadeInDown;
