import { motion } from 'framer-motion';
import styles from './Dashboard.module.scss';
import StartGame from './StartGame';

function Dashboard() {
    const headerVariants = {
        hidden: { y: '-100vh', opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: 0.2,
                duration: 1.5,
                ease: 'easeInOut',
            },
        },
    };

    // Animation for the text reveal (letters)
    const textReveal = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1, // Each letter appears with a small delay
            },
        }),
    };

    const title = 'The Trading Game';

    return (
        <div className={styles.dashboard}>
            <motion.div
                className={styles.header}
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <h1>
                    {title.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            custom={index}
                            variants={textReveal}
                            initial="hidden"
                            animate="visible"
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>
            </motion.div>
            <StartGame />
        </div>
    );
}

export default Dashboard;
