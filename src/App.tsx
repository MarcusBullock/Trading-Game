import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import Dashboard from './components/dashboard/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route
                        index
                        element={<Navigate replace to="dashboard" />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
