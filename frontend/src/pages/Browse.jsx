import React from 'react';
import TaskCard from '../components/TaskCard';

// FAKE DATA FOR UI PHASE
const HARDCODED_TASKS = [
    {
        _id: '1',
        title: 'Complete CN Lab Manual',
        category: 'academic',
        price: 500,
        sellerName: 'Rahul Verma',
    },
    {
        _id: '2',
        title: 'Math Calculus Tutoring Session',
        category: 'tutoring',
        price: 300,
        sellerName: 'Simran Kaur',
    },
    {
        _id: '3',
        title: 'Hostel Late Night Food Delivery',
        category: 'errand',
        price: 150,
        sellerName: 'Amit Shah',
    },
    {
        _id: '4',
        title: 'Fullstack React Bug Fixes',
        category: 'technical',
        price: 1200,
        sellerName: 'Alex Smith',
    }
];

const Browse = () => {
    return (
        <div className="bg-main min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Browse Active Tasks</h1>
                        <p className="mt-2 text-gray-500 font-medium">Find the perfect student freelancer for your needs.</p>
                    </div>

                    <div className="mt-4 md:mt-0 flex gap-4">
                        <select className="bg-white border border-border text-gray-700 rounded-lg px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium">
                            <option>All Categories</option>
                            <option>Academic</option>
                            <option>Tutoring</option>
                            <option>Errand</option>
                            <option>Technical</option>
                        </select>
                        <select className="bg-white border border-border text-gray-700 rounded-lg px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium">
                            <option>Sort by: Newest</option>
                            <option>Sort by: Price Low to High</option>
                            <option>Sort by: Price High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Task Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {HARDCODED_TASKS.map(task => (
                        <TaskCard
                            key={task._id}
                            title={task.title}
                            category={task.category}
                            price={task.price}
                            sellerName={task.sellerName}
                        />
                    ))}
                </div>

                {/* Empty State Fallback (Not displayed unless array is empty) */}
                {HARDCODED_TASKS.length === 0 && (
                    <div className="text-center py-20 bg-card rounded-xl border border-border">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
                        <p className="mt-1 text-gray-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Browse;
