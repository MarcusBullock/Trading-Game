import { motion, Variants } from 'framer-motion';
import React from 'react';
import styles from './Loading.module.scss'; // Import the SCSS module

const Loading: React.FC = () => {
    const containerVariants: Variants = {
        start: {
            transition: {
                staggerChildren: 0.2,
            },
        },
        end: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const dotVariants: Variants = {
        start: {
            y: '0%',
        },
        end: {
            y: '100%',
        },
    };

    const dotTransition = {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
    };

    return (
        <motion.div
            className={styles.container}
            variants={containerVariants}
            initial="start"
            animate="end"
        >
            <motion.div
                className={styles.dot}
                variants={dotVariants}
                transition={dotTransition}
            />
            <motion.div
                className={styles.dot}
                variants={dotVariants}
                transition={dotTransition}
            />
            <motion.div
                className={styles.dot}
                variants={dotVariants}
                transition={dotTransition}
            />
        </motion.div>
    );
};

export default Loading;
