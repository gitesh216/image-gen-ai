import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main Content Area */}
                <main
                    className={`flex-1 transition-all duration-300 ${
                        sidebarOpen ? 'md:ml-64' : 'md:ml-16'
                    }`}
                >
                    <div className="p-6">
                        {/* This is where child routes render */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;
