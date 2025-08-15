import Countdown from 'react-countdown';
import { addMinutes } from 'date-fns';
import styles from './TopBar.module.scss';

type TopBarProps = {
    name: string | null;
    startTime: Date | null;
    balance: number | null;
};

function TopBar({ name, balance, startTime }: TopBarProps) {
    const targetDate = new Date(startTime!);
    const newDate = addMinutes(targetDate, 10);

    const renderer = ({ minutes, seconds, completed }: any) => {
        if (minutes < 1 && completed) {
            return <span className={styles.gameOver}>GAME OVER</span>;
        } else {
            return (
                <div className={styles.countdown}>
                    <span className={styles.minutes}>
                        {minutes < 10 ? '0' : ''}
                        {minutes}
                    </span>
                    <span className={styles.colon}>:</span>
                    <span className={styles.seconds}>
                        {seconds < 10 ? '0' : ''}
                        {seconds}
                    </span>
                </div>
            );
        }
    };

    return (
        <div className={styles.topBar}>
            <div className={styles.textRow}>
                <div className={styles.player}>
                    <span className={styles.lbl}>Player:</span>
                    <span className={styles.name}>{name}</span>
                </div>
                <div className={styles.timer}>
                    <Countdown date={newDate} renderer={renderer} />
                </div>
                <div className={styles.balance}>
                    <span className={styles.lbl}>Balance:</span>
                    <span className={styles.name}>
                        ${balance?.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
