import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/History';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Routes>
            {/* Layout route with nested routes */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="history" element={<History />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            {/* Route without layout (if needed) */}
            <Route path="/login" element={<History />} />

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
