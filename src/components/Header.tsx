import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

function Header({ onMenuClick, sidebarOpen }: any) {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4">
                {/* Mobile Menu Button */}
                <Button

                    variant="ghost"
                    size="icon"
                    className="md:hidden mr-4"
                    onClick={onMenuClick}
                >
                    <Menu className="h-4 w-4" />
                </Button>

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl">AI Images Gen</span>
                </Link>

                <div className="flex-1" />

                {/* Header Actions */}
                <div className="flex items-center space-x-2">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>

                    {/* User Menu */}
                    <Button variant="ghost" size="sm">
                        Account
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
