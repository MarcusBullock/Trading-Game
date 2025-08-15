import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    GamePhaseInsert,
    useCompanies,
    useCreateGamePhases,
    useGame,
    useUpdateGame,
} from '../../services/gameApi';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Game.module.scss';
import Instructions from './Instructions';
import MainGame from './main/MainGame';
import generateGamePhase from '../../services/gamePhaseGenerator';

function Game() {
    const { id } = useParams<{ id: string }>();
    const [showInstructions, setShowInstructions] = useState(false);
    const { data, isLoading, error } = useGame(id!);
    const updateGame = useUpdateGame();
    const createGamePhases = useCreateGamePhases();
    const { data: companies } = useCompanies();

    if (data == null) return <div>Invalid URL</div>;
    if (isLoading) return <div>Loading</div>;
    if (error) return <div>Ooops... {error.message}</div>;

    const { game, user } = data;
    const gameHasStarted = game.startTime != null;
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
                delay: 0.5,
            },
        },
    };

    async function updateGameStartTime() {
        const handleUpdate = () => {
            updateGame.mutate({
                gameId: id!,
                gameUpdates: { startTime: new Date() },
            });
        };
        handleUpdate();

        if (companies) {
            const gamePhases: GamePhaseInsert[] = companies.map((company) =>
                generateGamePhase(id!, company)
            );

            const handleCreateGamePhases = () => {
                createGamePhases.mutate(gamePhases);
            };

            handleCreateGamePhases();
        } else {
            console.error('Companies not available');
        }
    }

    if (gameHasStarted)
        return <MainGame name={user.name} startTime={game.startTime} />;

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
                    onClick={updateGameStartTime}
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
