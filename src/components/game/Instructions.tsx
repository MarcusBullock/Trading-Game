import classNames from 'classnames';
import styles from './Instructions.module.scss';
import { motion } from 'framer-motion';

type InstructionsProps = {
    className?: string;
};

function Instructions({ className }: InstructionsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className={classNames(styles.instructions, className)}
        >
            <h2>How to play</h2>
            <p>Welcome to the trading game! The rules are simple.</p>
            <p>You get $10,000.</p>
            <p>Buy stocks low.</p>
            <p>Sell stocks high.</p>
            <p>
                The market will update automatically every 60 seconds, and
                stocks will change price.
            </p>
            <p>If you go bankrupt before the timer finishes, you lose.</p>
            <p>
                See how much profit you can make and try and get on our
                leaderboard!
            </p>
        </motion.div>
    );
}

export default Instructions;
