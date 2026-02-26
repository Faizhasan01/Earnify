import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    // Helper to apply active styles based on route
    const getLinkClass = (path) => {
        const baseClass = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ";
        if (location.pathname === path) {
            return baseClass + "border-primary text-primary";
        }
        return baseClass + "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
    };
    return (
        <nav className="bg-card text-gray-900 border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left: Logo and Primary Links */}
                    <div className="flex items-center space-x-8">
                        <div className="flex-shrink-0 flex items-center cursor-pointer">
                            <span className="text-2xl font-bold text-primary tracking-tight">Earnify</span>
                        </div>
                        <div className="hidden md:ml-6 md:flex md:space-x-8">
                            <Link to="/" className={getLinkClass('/')}>
                                Home
                            </Link>
                            <Link to="/browse" className={getLinkClass('/browse')}>
                                Browse Tasks
                            </Link>
                            <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                                Dashboard
                            </Link>
                            <Link to="/wallet" className={getLinkClass('/wallet')}>
                                Wallet
                            </Link>
                        </div>
                    </div>

                    {/* Right: Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
                            Login
                        </button>
                        <button className="bg-accent hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors">
                            Register
                        </button>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center ml-4">
                            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
