import React from 'react';

const Home = () => {
    return (
        <div className="bg-main min-h-screen font-sans">

            {/* Hero Section */}
            <section className="bg-hero border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center lg:py-32">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                        Campus Micro-Freelance <span className="text-primary block mt-2">Marketplace</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 font-medium">
                        Hire verified students for quick tasks, tutoring, and freelance jobs safely through our escrow-protected environment.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <button className="bg-primary hover:bg-blue-800 text-white px-8 py-3.5 rounded-lg text-lg font-bold shadow-md transition-colors hover:shadow-lg">
                            Browse Tasks
                        </button>
                        <button className="bg-white border-2 border-primary text-primary hover:bg-gray-50 px-8 py-3.5 rounded-lg text-lg font-bold shadow-sm transition-colors">
                            Post a Gig
                        </button>
                    </div>
                </div>
            </section>

            {/* Feature Grid Section */}
            <section className="py-20 bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Earnify?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="text-center p-6 border border-border rounded-xl bg-main/30 shadow-sm hover:shadow-md transition-shadow">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-primary mb-6">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
                            <p className="text-gray-600 font-medium">100% secure checkout via Razorpay integration with multiple localized payment options.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-6 border border-border rounded-xl bg-main/30 shadow-sm hover:shadow-md transition-shadow">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Escrow Protection</h3>
                            <p className="text-gray-600 font-medium">Funds are safely held in a digital vault until the buyer formally approves the delivered work.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-6 border border-border rounded-xl bg-main/30 shadow-sm hover:shadow-md transition-shadow">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mb-6">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Student Verified</h3>
                            <p className="text-gray-600 font-medium">Community is monitored to ensure trusted peers only via rigorous email domain verifications.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
