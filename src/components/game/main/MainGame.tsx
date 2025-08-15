import Chart from './Chart';
import styles from './MainGame.module.scss';
import TopBar from './TopBar';

type MainGameProps = {
    name: string | null;
    startTime: Date | null;
};

function MainGame({ name, startTime }: MainGameProps) {
    return (
        <div className={styles.mainGame}>
            <TopBar name={name} startTime={startTime} balance={10000} />
            <div className={styles.chart}>
                <Chart />
            </div>
        </div>
    );
}

export default MainGame;
