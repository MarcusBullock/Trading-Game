import { FormEvent, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './StartGame.module.scss';
import { createGame, createGameUser } from '../../services/gameApi';
import { useNavigate } from 'react-router-dom';

function StartGame() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    async function handleStartGame(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = await createGameUser({
            name,
            finalScore: null,
        });

        console.log('DATA', data);

        if (data === null || data === undefined)
            throw new Error('Failed to create game user');

        console.log('created user');

        // Create game session with new user ID
        const newGame = await createGame({
            userId: data[0].id,
        });

        console.log('created game');
        // Redirect user to new game page
        if (newGame != null) navigate(`/game/${newGame[0].id}`);
    }

    const formVariants: Variants = {
        hidden: { x: '100vw', rotate: 20, opacity: 0 },
        visible: {
            x: 0,
            rotate: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                mass: 2.5,
                duration: 3.8,
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
                    transition={{ delay: 1, duration: 3.8 }}
                >
                    <input
                        type="text"
                        placeholder="Your name..."
                        maxLength={17}
                        onChange={(e) => setName(e.target.value)}
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
