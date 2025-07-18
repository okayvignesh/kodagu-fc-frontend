import React, { useState } from 'react';
import Pitch from '../../public/images/publicpitch.png';

const Mission = () => {
    const [activeTab, setActiveTab] = useState('problem');

    const tabs = [
        {
            id: 'problem',
            label: 'The Problem',
            color: 'text-red-600 bg-red-50 border-red-200',
            activeColor: 'text-red-700 bg-red-100 border-red-300'
        },
        {
            id: 'solution',
            label: 'The Solution',
            color: 'text-green-600 bg-green-50 border-green-200',
            activeColor: 'text-green-700 bg-green-100 border-green-300'
        },
        {
            id: 'mission',
            label: 'Our Mission',
            color: 'text-blue-600 bg-blue-50 border-blue-200',
            activeColor: 'text-blue-700 bg-blue-100 border-blue-300'
        }
    ];

    const [expandedProblem, setExpandedProblem] = useState(null);
    const [expandedSolution, setExpandedSolution] = useState(null);


    const problemCategories = [
        {
            id: 'development',
            title: 'Disrupts Player Development & Skill Progression',
            points: [
                '<b>Inconsistent Training</b>: Long gaps in training hinder skill acquisition and development',
                '<b>Loss of Momentum</b>: Young players struggle to maintain fitness, technique, and tactical awareness',
                '<b>Delayed Learning Curve</b>: Players take longer to grasp essential footballing principles due to interruptions'
            ]
        },
        {
            id: 'physical',
            title: 'Physical & Tactical Setbacks',
            points: [
                '<b>Reduced Match Readiness</b>: Players lose sharpness, match fitness, and confidence',
                '<b>Limited Tactical Growth</b>: Lack of regular practice hampers team coordination and game understanding',
                '<b>Injury Risks Increase</b>: Players returning after long breaks are more prone to injuries due to sudden workload'
            ]
        },
        {
            id: 'grassroots',
            title: 'Weakens Grassroots & Youth Football Pipeline',
            points: [
                '<b>Fewer Scouting & Exposure Opportunities</b>: Without consistent training and matches, young talents miss chances to be identified',
                '<b>Reduced Player Retention</b>: Extended breaks may lead to loss of interest and motivation among young players',
                '<b>Lack of Competitive Spirit</b>: Without regular matches, players struggle to develop a winning mentality'
            ]
        },
        {
            id: 'ecosystem',
            title: 'Affects Growth & Football Ecosystem',
            points: [
                '<b>Training Disruptions</b>: make it harder to develop a competitive spirit',
                '<b>Difficulty in Maintaining a Structured Program</b>: Long breaks make it challenging to implement a well-planned football curriculum',
                '<b>Lower Attraction for Coaches & Scouts</b>: Inconsistent training environments deter high-level coaching and scouting opportunities'
            ]
        }
    ];

    const solutionCategories = [
        {
            id: 'year-round',
            title: 'Year-Round Training & Uninterrupted Development',
            points: [
                '<b>Continuous Programs</b>: Enables continuous grassroots and youth football programs despite Kodagu’s 6-month monsoon.',
                '<b>Consistent Surface</b>: Provides a consistent, high-quality surface for player development at all levels.',
                '<b>Fitness & Awareness</b>: Ensures players maintain fitness, technical skills, and tactical awareness throughout the year.'
            ]
        },
        {
            id: 'professional-standards',
            title: 'Professional-Quality Playing Conditions',
            points: [
                '<b>Top-Tier Surface</b>: Meets international standards for training and matches.',
                '<b>Injury Reduction</b>: Reduces injury risks compared to uneven or poorly maintained grass fields.',
                '<b>Competitive Readiness</b>: Allows players to train like professionals, preparing them for higher levels of competition.'
            ]
        },
        {
            id: 'talent-attraction',
            title: 'Attracting & Retaining Talent',
            points: [
                '<b>Inspiration</b>: Encourages more young players to take up football seriously with world-class infrastructure.',
                '<b>Quality Coaching</b>: Attracts better coaches, trainers, and scouts from across the country.',
                '<b>Local Motivation</b>: Retains and motivates local talent, reducing the need to travel to other cities for better facilities.'
            ]
        },
        {
            id: 'tournament-hosting',
            title: 'Hosting High-Quality Matches & Tournaments',
            points: [
                '<b>Event Hosting</b>: Enables state and national-level tournaments to be hosted in Kodagu.',
                '<b>Home Ground</b>: Provides Kodagu with a home ground for competitive matches.',
                '<b>Player Exposure</b>: Inspires young players by letting them watch top-level football in their own region.'
            ]
        },
        {
            id: 'ecosystem',
            title: 'Strengthening Mofussil Football Ecosystem',
            points: [
                '<b>Development Hub</b>: Establishes Kodagu as a football development hub in the country.',
                '<b>Footballing Destination</b>: Positions Kodagu as a footballing destination, boosting local sports culture.'
            ]
        },
        {
            id: 'sustainability',
            title: 'Long-Term Sustainability & Growth',
            points: [
                '<b>Lower Maintenance</b>: Reduces maintenance costs compared to natural grass fields.',
                '<b>Maximized Usage</b>: Ensures higher utilization rates for training, matches, and events.',
                '<b>Self-Sustaining Ecosystem</b>: Benefits players, coaches, and the broader community.'
            ]
        }
    ];

    const renderProblemContent = () => (
        <div className="space-y-6">
            <div className="text-start">
                <p className="text-base md:text-lg text-gray-800 mb-4">
                    Despite being home to generations of athletic talent and a rich sporting culture, Kodagu faces
                    a critical barrier in nurturing its young footballers. The region's intense five to six-month
                    monsoon season renders natural grounds and grass fields unplayable. This disruption every
                    year hurts the aspirations of talented young footballers of the province.
                </p>
                <p className="text-gray-800 text-base md:text-lg">
                    The lack of infrastructure which supports training under all weather conditions, not only
                    widens the gap between rural and urban football ecosystems but also robs local talent of their
                    chance to compete on equal footing. It limits access, breaks momentum, discourages quality
                    coaching, and hampers Kodagu's emergence as a serious contender in national football.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-red-50 bg-opacity-70 border border-red-200 rounded-lg p-4 text-center backdrop-blur-md">
                    <div className="text-2xl md:text-3xl font-bold text-red-600">5-6</div>
                    <div className="text-xs md:text-sm text-red-700 font-medium">Months of Disruption by Monsoon</div>
                </div>
                <div className="bg-red-50 bg-opacity-70 border border-red-200 rounded-lg p-4 text-center backdrop-blur-md">
                    <div className="text-2xl md:text-3xl font-bold text-red-600">100%</div>
                    <div className="text-xs md:text-sm text-red-700 font-medium">Fields Unplayable</div>
                </div>
            </div>

            <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-1 h-6 bg-red-500 rounded-full mr-3"></div>
                    The Scale of Set Back
                </h3>
                <div className="space-y-3">
                    {problemCategories.map((category, index) => (
                        <div key={category.id} className="bg-white bg-opacity-70 border border-red-200 pointer rounded-lg overflow-hidden backdrop-blur-md">
                            <button
                                onClick={() => setExpandedProblem(expandedProblem === category.id ? null : category.id)}
                                className="w-full px-4 py-3 flex items-center hover:bg-red-50 hover:bg-opacity-80 transition-colors duration-200"
                            >
                                <span className="text-red-500 text-lg md:text-xl font-bold mr-3">
                                    {expandedProblem === category.id ? '−' : '+'}
                                </span>
                                <span className="font-semibold text-gray-800 cursor-pointer text-left">{category.title}</span>
                            </button>
                            {expandedProblem === category.id && (
                                <div className="px-4 pb-4 border-t border-red-100">
                                    <div className="space-y-2 pt-3">
                                        {category.points.map((point, pointIndex) => (
                                            <div key={pointIndex} className="flex items-start space-x-3">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span
                                                    className="text-gray-700 text-sm"
                                                    dangerouslySetInnerHTML={{ __html: point }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSolutionContent = () => (
        <div className="space-y-6">
            <div className="text-start">
                <p className="text-base md:text-lg text-gray-800 mb-4">
                    A FIFA-certified artificial football turf will transform Kodagu's football landscape
                    by providing consistent, world-class training conditions year-round.
                </p>
            </div>

            <div className="bg-green-50 bg-opacity-70 border border-green-200 rounded-lg p-4 md:p-6 backdrop-blur-md">
                <h3 className="text-base md:text-lg font-semibold text-green-800 mb-3">Expected Outcomes</h3>
                <p className="text-green-700 text-sm md:text-base">
                    The all-weather facility will enable continuous player development, attract better
                    coaching talent, and position Kodagu as a premier footballing destination in the region.
                </p>
            </div>

            <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
                    The Solution: Key Areas of Impact
                </h3>

                <div className="space-y-3">
                    {solutionCategories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white bg-opacity-70 border border-green-200 pointer rounded-lg overflow-hidden backdrop-blur-md"
                        >
                            <button
                                onClick={() =>
                                    setExpandedSolution(expandedSolution === category.id ? null : category.id)
                                }
                                className="w-full px-4 py-3 flex items-center hover:bg-green-50 hover:bg-opacity-80 transition-colors duration-200"
                            >
                                <span className="text-green-500 text-lg md:text-xl font-bold mr-3">
                                    {expandedSolution === category.id ? '−' : '+'}
                                </span>
                                <span className="font-semibold text-gray-800 cursor-pointer text-left">
                                    {category.title}
                                </span>
                            </button>
                            {expandedSolution === category.id && (
                                <div className="px-4 pb-4 border-t border-green-100">
                                    <div className="space-y-2 pt-3">
                                        {category.points.map((point, pointIndex) => (
                                            <div key={pointIndex} className="flex items-start space-x-3">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span
                                                    className="text-gray-700 text-sm"
                                                    dangerouslySetInnerHTML={{ __html: point }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

    const renderMissionContent = () => (
        <div className="bg-gray-50 bg-opacity-70 border border-gray-200 rounded-lg p-4 md:p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">Our Mission</h3>
            <p className="text-gray-700 text-sm md:text-base text-justify">
                To upgrade and build our existing natural grass football field into a world-class, FIFA-standard,
                all-weather football facility that enables the youth of Kodagu to access year-round, world-class training.
            </p>
            <p className="text-gray-700 text-sm md:text-base text-justify">
                It's about providing aspiring youth with a consistent, safe, and professional-grade environment
                to train and compete, regardless of the season. Our goal is to remove seasonal disruptions and
                enable year-round development for hundreds of young footballers in the province.
            </p>
            <p className="text-gray-700 text-sm md:text-base text-justify">
                We aim to achieve this vision with the support of all well-wishers of humanity and the collective
                strength of communities that believe in nurturing and promoting a strong sporting and footballing culture.
            </p>
        </div>
    );




    const renderContent = () => {
        switch (activeTab) {
            case 'problem':
                return renderProblemContent();
            case 'solution':
                return renderSolutionContent();
            case 'mission':
                return renderMissionContent();
            default:
                return renderProblemContent();
        }
    };

    return (
        <div
            className="h-fit min-h-screen py-20 px-4 md:px-10"
            style={{
                backgroundImage: `url('/images/publicpitch.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                        About the Project
                    </h1>
                    <h3 className="text-xl lg:text-3xl font-semibold text-white">
                        Why This Matters?
                    </h3>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? 'border-b-2 border-green-500 text-green-700 bg-green-50'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-sm sm:text-base">{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10">
                        <div className="transition-all duration-300 ease-in-out">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mission;