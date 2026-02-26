import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    return (
        <div className="bg-main min-h-[calc(100vh-4rem)] flex font-sans">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl space-y-8">

                    <header className="mb-8">
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome back, Rahul</h1>
                        <p className="text-gray-500 font-medium mt-1">Here is what's happening with your freelance projects today.</p>
                    </header>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase">Active Orders</h3>
                            <p className="text-3xl font-black text-primary mt-2">3</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase">Completed Tasks</h3>
                            <p className="text-3xl font-black text-green-600 mt-2">12</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase">Available Balance</h3>
                            <p className="text-3xl font-black text-gray-900 mt-2">₹1,450</p>
                        </div>
                    </div>

                    {/* Recent Activity / Orders Table (Fake Data) */}
                    <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden mt-8">
                        <div className="px-6 py-5 border-b border-border bg-gray-50/50 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                            <button className="text-sm font-medium text-accent hover:text-primary transition-colors">View All</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gig Title</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">React Frontend Fixes</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Buyer: John Doe</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">₹800</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                In Progress
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <button className="text-accent hover:text-primary transition-colors">Manage</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">Mathematics Tution</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Seller: Sarah Smith</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">₹300</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Completed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <button className="text-accent hover:text-primary transition-colors">View Details</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
