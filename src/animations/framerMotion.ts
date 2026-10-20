import { motion } from 'framer-motion';

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideIn = (direction = 'left', type = 'tween', duration = 0.5, delay = 0) => {
  return {
    hidden: {
      x: direction === 'left' ? -100 : 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type,
        duration,
        delay,
      },
    },
  };
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const zoomIn = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};