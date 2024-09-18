import styles from './Container.module.scss';

type ContainerProps = {
    children: JSX.Element;
};

function Container({ children }: ContainerProps) {
    return <div className={styles.container}>{children}</div>;
}

export default Container;
