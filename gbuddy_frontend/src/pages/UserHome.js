import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FaBook, FaShoppingCart, FaCalendarAlt, 
    FaArrowRight, FaGraduationCap, FaLightbulb,
    FaChartLine, FaRocket, FaCheck , FaBrain , FaCloud , FaShieldAlt
} from 'react-icons/fa';
import Header from '../components/Header';

const UserHome = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-6 mt-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Boost Your Academic Success
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Access smart tools designed for modern students. Learn better, achieve more.
                        </p>
                    </motion.div>

                    {/* Main Features */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {mainFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="relative group"
                            >
                                <Link to={feature.path}>
                                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                        <p className="text-gray-600 mb-6">{feature.description}</p>
                                        <span className="flex items-center text-emerald-600 font-medium group-hover:gap-2 transition-all">
                                            Explore Now <FaArrowRight className="ml-2" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>


                <section className="py-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl mb-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Powered by Technologies
                            </h2>
                            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                                Experience the future of learning with our cutting-edge tech stack
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {techFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 mb-4">{feature.description}</p>
                                    <ul className="space-y-2">
                                        {feature.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                                <FaCheck className="text-emerald-500" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>



                    

                    {/* Study Tips Section */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Ready to Excel?</h3>
                                <p className="text-emerald-50 mb-6">
                                    Get personalized study tips and track your progress with our smart learning tools.
                                </p>
                                <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all" onClick={scrollToTop}>
                                    Get Started
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {studyTips.map((tip, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                                        {tip.icon}
                                        <p className="mt-2 text-sm">{tip.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const mainFeatures = [
    {
        icon: <FaBook className="w-8 h-8" />,
        title: "Smart Notes",
        description: "Access and share high-quality study materials. Learn from top performers in your class.",
        path: "/notes"
    },
    {
        icon: <FaShoppingCart className="w-8 h-8" />,
        title: "Student Marketplace",
        description: "Buy and sell study materials, books, and academic resources at student-friendly prices.",
        path: "/marketplace"
    },
    {
        icon: <FaCalendarAlt className="w-8 h-8" />,
        title: "Study Scheduler",
        description: "Plan your study sessions, set reminders, and track your progress effectively.",
        path: "/schedule"
    }
];

const stats = [
    {
        icon: <FaGraduationCap className="w-6 h-6" />,
        value: "15K+",
        label: "Active Students"
    },
    {
        icon: <FaBook className="w-6 h-6" />,
        value: "25K+",
        label: "Study Materials"
    },
    {
        icon: <FaShoppingCart className="w-6 h-6" />,
        value: "5K+",
        label: "Resources Shared"
    },
    {
        icon: <FaChartLine className="w-6 h-6" />,
        value: "92%",
        label: "Success Rate"
    }
];


const techFeatures = [
    {
        icon: <FaBrain className="w-6 h-6 text-white" />,
        title: "AI-Powered Learning",
        description: "Advanced artificial intelligence to enhance your learning experience",
        benefits: [
            "Personalized study recommendations",
            "Smart content organization",
            "Automated study patterns analysis",
            "Intelligent doubt resolution"
        ]
    },
    {
        icon: <FaCloud className="w-6 h-6 text-white" />,
        title: "Cloud Infrastructure",
        description: "Secure and scalable AWS cloud infrastructure",
        benefits: [
            "AWS S3 for resource storage",
            "Fast content delivery",
            "Automatic backups",
            "Unlimited storage capacity"
        ]
    },
    {
        icon: <FaShieldAlt className="w-6 h-6 text-white" />,
        title: "Enhanced Security",
        description: "Multi-layer security protocols for your data protection",
        benefits: [
            "Two-factor authentication",
            "End-to-end encryption",
            "Regular security audits",
            "GDPR compliance"
        ]
    }
];

const studyTips = [
    {
        icon: <FaLightbulb className="w-6 h-6" />,
        text: "Create study schedules"
    },
    {
        icon: <FaBook className="w-6 h-6" />,
        text: "Share & learn together"
    },
    {
        icon: <FaRocket className="w-6 h-6" />,
        text: "Track your progress"
    },
    {
        icon: <FaGraduationCap className="w-6 h-6" />,
        text: "Achieve your goals"
    }
];

export default UserHome;
