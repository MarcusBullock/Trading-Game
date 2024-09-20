import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    GameRow,
    GameUser,
    getGame,
    getGameUser,
} from '../../services/gameApi';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Game.module.scss';
import Instructions from './Instructions';

function Game() {
    const { id } = useParams<{ id: string }>();

    const [game, setGame] = useState<GameRow>();
    const [user, setUser] = useState<GameUser>();
    const [showInstructions, setShowInstructions] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGameAndUser() {
            try {
                if (!id) throw new Error('Invalid game ID');
                setLoading(true);

                const gameData = await getGame(id!);
                if (!gameData) throw new Error('No game data found');
                setGame(gameData);

                const userData = await getGameUser(gameData.userId);
                if (!userData) throw new Error('No game user found');
                setUser(userData);
            } catch (err: any) {
                console.error('Error:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchGameAndUser();
    }, [id]);

    if (loading) return <div>Loading</div>;
    if (error) return <div>Ooops... {error}</div>;
    if (user == null || game == null) return <div>Invalid URL</div>;

    const title = `Hi ${user.name}, welcome to the Trading Game.`;
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

    const textReveal = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
            },
        }),
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: 0.5, // Delay to sync with header reveal
            },
        },
    };

    // Instructions?

    // Button to start game properly

    // Timer until next update

    return (
        <div className={styles.game}>
            <motion.div
                className={styles.header}
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className={styles.header}>
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
            <motion.div
                className={styles.actions}
                initial="hidden"
                animate="visible"
            >
                <motion.button
                    className={styles.button}
                    onClick={() => setShowInstructions(!showInstructions)}
                    variants={buttonVariants}
                >
                    Instructions
                </motion.button>
                <motion.button
                    className={styles.button}
                    variants={buttonVariants}
                >
                    Start Game
                </motion.button>
            </motion.div>
            <AnimatePresence>
                {showInstructions && (
                    <Instructions className={styles.instructions} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Game;
