import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateGig from './pages/CreateGig';
import GigDetails from './pages/GigDetails';
import Orders from './pages/Orders';
import Wallet from './pages/Wallet';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/gigs/:id" element={<GigDetails />} />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/create-gig" element={<CreateGig />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/wallet" element={<Wallet />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
