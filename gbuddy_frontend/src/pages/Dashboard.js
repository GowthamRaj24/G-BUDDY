import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image from "./developer-avatar.jpg";
import { useNavigate } from 'react-router-dom';
import { 
    FaPython, FaJava, FaHtml5, FaCss3, FaServer, 
    FaLightbulb, FaUsers, FaCode ,FaStore , FaCalendarAlt
} from 'react-icons/fa';
import { 
    SiTypescript, SiC, SiMysql, SiPostgresql, 
     SiCloudflare, SiPostman
} from 'react-icons/si';

import { 
    FaGraduationCap, FaBook,  
    FaRocket, FaChalkboardTeacher, FaLaptopCode, 
    FaBriefcase, FaSearch, FaCloudUploadAlt, FaTrophy
} from 'react-icons/fa';
import  Navbar  from '../components/Navbar';
import { 
    FaGithub, 
    FaLinkedin, 
    FaEnvelope, 
    FaReact, 
    FaJs, 
    FaNodeJs, 
    FaGit, 
    FaDocker, 
} from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb } from 'react-icons/si';
import "./main.css"

import { PrimaryButton, SecondaryButton } from '../components/Button';
import { FeatureCard } from '../components/Card';
import axios from 'axios';
import { BACKEND_URL } from './backendURL';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            try {
                const response = await axios.get(BACKEND_URL+`/users/fetchUser/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    navigate('/home');  // Using React Router's navigate
                }
            } catch (error) {
                console.log('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);


    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <FaGraduationCap className="w-20 h-20 mx-auto text-emerald-600" />
                    </motion.div>
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Your Ultimate College Companion
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Join thousands of students achieving academic excellence with smart collaboration tools and resources
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/signup">
                            <PrimaryButton className="flex items-center gap-2">
                                Get Started Free
                            </PrimaryButton>
                        </Link>
                        <Link to="/signin">
                            <SecondaryButton>
                                Learn More
                            </SecondaryButton>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Everything You Need to Excel
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-emerald-500 to-teal-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6 text-white">
                            Ready to Excel Your Academic Journey?
                        </h2>
                        <p className="text-xl mb-8 text-emerald-50">
                            Join G-BUDDY today and experience the difference
                        </p>
                        <Link to="/">
                            <PrimaryButton className="" onClick={()=> window.location.href="/signin"}>   
                                Get Started Free
                            </PrimaryButton>
                        </Link>
                    </motion.div>
                </div>
            </section>





            {/* <Footer /> */}
        </div>
        </>
    );
};

const features = [
    {
        icon: <FaBook className="w-6 h-6" />,
        title: "Centralized Study Resources",
        description: "Upload and access PDFs, notes, and study guides in one place."
    },
    {
        icon: <FaSearch className="w-6 h-6" />,
        title: "Advanced Search",
        description: "Quickly find resources by subject, keywords, or contributors."
    },
    {
        icon: <FaGraduationCap className="w-6 h-6" />,
        title: "Smart Learning Hub",
        description: "Access curated study materials, learning resources tailored to your curriculum."
    },
    {
        icon: <FaStore className="w-6 h-6" />,
        title: "Student Marketplace",
        description: "Buy, sell, or exchange academic resources, study materials, and educational tools with fellow students."
    },
    {
        icon: <FaCalendarAlt className="w-6 h-6" />,
        title: "Smart Roadmaps",
        description: "Empowering learners with community-driven roadmaps to master new tech skills and accelerate their career growth."
    },
    {
        icon: <FaChalkboardTeacher className="w-6 h-6" />,
        title: "Peer Tutoring",
        description: "Find or become a peer tutor, share expertise, and grow together academically."
    }
];



const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Notes Shared" },
    { number: "5K+", label: "Study Groups" },
    { number: "15K+", label: "Success Stories" }
];

export default Dashboard;
