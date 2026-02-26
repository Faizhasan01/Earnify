import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-main flex flex-col font-sans">
                <Navbar />

                {/* Main Routed Content Area */}
                <div className="flex-1 flex flex-col">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/wallet" element={<Wallet />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
