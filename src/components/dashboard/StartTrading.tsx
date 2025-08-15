import { FormEvent, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './StartTrading.module.scss';
import {
    GameInsert,
    GameUserInsert,
    useCreateGame,
    useCreateGameUser,
} from '../../services/gameApi';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

function StartTrading() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const {
        mutate: createNewGame,
        error: gameError,
        isPending: isGameLoading,
    } = useCreateGame();

    const {
        mutate: createNewGameUser,
        error: userError,
        isPending: isUserLoading,
    } = useCreateGameUser();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user: GameUserInsert = {
            name,
            finalScore: null,
        };

        try {
            const newUser = await new Promise<GameUserInsert>(
                (resolve, reject) => {
                    createNewGameUser(user, {
                        onSuccess: (data) => resolve(data[0]),
                        onError: (error) => reject(error),
                    });
                }
            );

            const gameData: GameInsert = {
                userId: newUser.id!,
            };

            const newGame = await new Promise<GameInsert[]>(
                (resolve, reject) => {
                    createNewGame(gameData, {
                        onSuccess: (data) => resolve(data),
                        onError: (error) => reject(error),
                    });
                }
            );

            if (newGame != null) navigate(`/game/${newGame[0].id}`);
        } catch (error) {
            console.error('Error creating game or user:', error);
        }
    };

    if (isGameLoading || isUserLoading) return <Loading />;
    if (gameError || userError)
        return (
            <div>
                Oops, {gameError?.message} ||
                {userError?.message}
            </div>
        );

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
            onSubmit={handleSubmit}
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

export default StartTrading;
