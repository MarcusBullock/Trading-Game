import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import Dashboard from './components/dashboard/Dashboard';
import Game from './components/game/Game';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './query';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="/game/:id" element={<Game />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
