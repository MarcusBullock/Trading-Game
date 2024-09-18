import { FormEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './StartGame.module.scss';

function StartGame() {
    function handleStartGame(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('Starting game...');
    }

    const formVariants: Variants = {
        hidden: { x: '100vw', rotate: 20, opacity: 0 }, // Starts off-screen to the right with a slight rotation
        visible: {
            x: 0,
            rotate: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                mass: 2.5,
                duration: 3.8, // Slow down as it "skids" to a stop
                ease: 'easeOut',
            },
        },
    };

    return (
        <motion.form
            onSubmit={handleStartGame}
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className={styles.startGame}>
                <motion.div
                    className={styles.name}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 3.8 }} // Input field fades in after the form settles
                >
                    <input
                        type="text"
                        placeholder="Your name..."
                        maxLength={17}
                    />
                </motion.div>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    Start trading
                </motion.button>
            </motion.div>
        </motion.form>
    );
}

export default StartGame;
