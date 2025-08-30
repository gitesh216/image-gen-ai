import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, History, Settings, X } from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'History', href: '/history', icon: History },
    { name: 'Settings', href: '/settings', icon: Settings },
];

function Sidebar({ isOpen, onClose } : any) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 z-50 h-full w-64 transform border-r bg-background transition-transform duration-300 md:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full md:w-16'
                )}
            >
                <div className="flex h-14 items-center border-b px-4 md:px-6">
                    {/* Close button for mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden ml-auto"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                )
                            }
                            onClick={() => onClose()} // Close sidebar on mobile after navigation
                        >
                            <item.icon className="h-4 w-4 mr-3" />
                            <span className={cn(!isOpen && 'md:hidden')}>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
