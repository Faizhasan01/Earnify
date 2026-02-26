import React from 'react';

const TaskCard = ({ title, category, price, sellerName }) => {
    return (
        <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
            <div className="h-32 bg-gray-100 relative group overflow-hidden">
                {/* Placeholder Image Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-primary/30 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-700 uppercase tracking-wider shadow-sm">
                    {category}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                        {title}
                    </h3>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold uppercase">
                            {sellerName ? sellerName.charAt(0) : 'S'}
                        </div>
                        <span className="text-sm text-gray-500 font-medium truncate max-w-[100px]">{sellerName}</span>
                    </div>
                    <div className="text-lg font-black text-gray-900">
                        ₹{price}
                    </div>
                </div>
            </div>

            {/* View Button Footer */}
            <div className="px-5 pb-5 mt-2">
                <button className="w-full bg-white border border-border text-primary font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
