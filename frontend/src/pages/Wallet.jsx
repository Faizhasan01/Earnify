import React from 'react';
import Sidebar from '../components/Sidebar';

const Wallet = () => {
    return (
        <div className="bg-main min-h-[calc(100vh-4rem)] flex font-sans">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl space-y-8">

                    <header>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Wallet & Earnings</h1>
                        <p className="text-gray-500 font-medium mt-1">Manage your escrow funds, payments, and transaction history safely.</p>
                    </header>

                    {/* Main Balance Card */}
                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Available Escrow Balance</p>
                            <h2 className="text-5xl font-black text-gray-900 mt-2">₹1,450<span className="text-2xl text-gray-400">.00</span></h2>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <button className="flex-1 md:flex-none bg-primary hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-colors ring-2 ring-transparent ring-offset-2 hover:ring-primary/50">
                                Withdraw Funds
                            </button>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-border bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {/* Positive Transaction */}
                            <div className="p-6 hover:bg-gray-50/50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Escrow Release (Completed Order)</p>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">Oct 24, 2023 • 10% Platform fee deducted</p>
                                    </div>
                                </div>
                                <span className="text-lg font-black text-green-600">+₹450</span>
                            </div>

                            {/* Negative Transaction */}
                            <div className="p-6 hover:bg-gray-50/50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Payment for "Math Tutoring"</p>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">Oct 21, 2023 • Order #69a031</p>
                                    </div>
                                </div>
                                <span className="text-lg font-black text-gray-900">-₹300</span>
                            </div>

                            {/* Positive Transaction */}
                            <div className="p-6 hover:bg-gray-50/50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Escrow Release (Completed Order)</p>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">Oct 15, 2023 • 10% Platform fee deducted</p>
                                    </div>
                                </div>
                                <span className="text-lg font-black text-green-600">+₹1,300</span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Wallet;
