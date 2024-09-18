import { Outlet } from 'react-router-dom';
import Container from './components/container/Container';
import styles from './AppLayout.module.scss';

function AppLayout() {
    return (
        <div className={styles.appLayout}>
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}

export default AppLayout;
