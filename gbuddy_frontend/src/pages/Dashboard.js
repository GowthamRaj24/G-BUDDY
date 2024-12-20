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


            <section className="py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
    <div className="max-w-5xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
        >
            {/* Background Decorations */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
            
            {/* Main Content Card */}
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column - Profile Info */}
                    <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="relative mb-6"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse"></div>
                            <img 
                                src={image}
                                alt="Gowtham Raj" 
                                className="w-40 h-40 rounded-full relative border-4 border-white shadow-xl object-cover"
                            />
                        </motion.div>

                        <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">
                            Gowtham Raj
                        </h3>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                Full Stack Developer
                            </span>
                            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                AI Enthusiast
                            </span>
                        </div>

                        <p className="text-gray-600 text-center lg:text-left mb-6">
                        Open to full-time roles and freelance collaborations. Let’s connect and explore how I can add value to your team or project!
                        </p>

                        <div className="flex gap-4 mb-8">
                            <motion.a 
                                whileHover={{ y: -2 }}
                                href="https://github.com/GowthamRaj24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-gray-900 text-white rounded-xl hover:shadow-lg transition-all"
                            >
                                <FaGithub className="w-5 h-5" />
                            </motion.a>
                            <motion.a 
                                whileHover={{ y: -2 }}
                                href="https://www.linkedin.com/in/gowtham-raj-1061a5272/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </motion.a>
                            <motion.a 
                                whileHover={{ y: -2 }}
                                href="https://gowthamraj24n.netlify.app"
                                target="_blank"
                                className="p-3 bg-emerald-500 text-white rounded-xl hover:shadow-lg transition-all"
                            >
                                <FaBriefcase className="w-5 h-5" />
                            </motion.a>
                            <motion.a 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="mailto:mgowthamraj9491@gmail.com"
                                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                            >
                                <FaEnvelope className="w-5 h-5" />
                                <span>Contact</span>
                            </motion.a>


                        </div>
                    </div>

                    {/* Right Column - Skills */}
                    <div className="lg:w-2/3">
    <h4 className="text-2xl font-bold text-gray-800 mb-6">Ready to Transform Your Ideas</h4>
    
    <div className="space-y-8">


        {/* Web Technologies */}
        <div>
            <h5 className="text-lg font-semibold text-emerald-600 mb-4">Web Technologies</h5>
            <div className="flex flex-wrap gap-3">
                {[
                    { icon: <FaReact />, name: 'React.js', color: 'bg-blue-100 text-blue-600' },
                    { icon: <FaNodeJs />, name: 'Node.js', color: 'bg-green-100 text-green-600' },
                    { icon: <SiExpress />, name: 'Express.js', color: 'bg-gray-100 text-gray-600' },
                    { icon: <FaHtml5 />, name: 'HTML5', color: 'bg-orange-100 text-orange-600' },
                    { icon: <FaCss3 />, name: 'CSS3', color: 'bg-blue-100 text-blue-600' },
                    { icon: <SiTailwindcss />, name: 'TailwindCSS', color: 'bg-teal-100 text-teal-600' },
                    { icon: <FaServer />, name: 'RESTful APIs', color: 'bg-indigo-100 text-indigo-600' }
                ].map((tool, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${tool.color}`}
                    >
                        {tool.icon}
                        <span>{tool.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Databases */}
        <div>
            <h5 className="text-lg font-semibold text-blue-600 mb-4">Databases</h5>
            <div className="flex flex-wrap gap-3">
                {[
                    { icon: <SiPostgresql />, name: 'PostgreSQL', color: 'bg-blue-100 text-blue-600' },
                    { icon: <SiMongodb />, name: 'MongoDB', color: 'bg-green-100 text-green-600' },
                    { icon: <SiMysql />, name: 'MySQL', color: 'bg-orange-100 text-orange-600' }
                ].map((tool, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${tool.color}`}
                    >
                        {tool.icon}
                        <span>{tool.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Tools & Platforms */}
        <div>
            <h5 className="text-lg font-semibold text-gray-600 mb-4">Tools & Platforms</h5>
            <div className="flex flex-wrap gap-3">
                {[
                    { icon: <FaGit />, name: 'Git', color: 'bg-orange-100 text-orange-600' },
                    { icon: <FaGithub />, name: 'GitHub', color: 'bg-gray-100 text-gray-700' },
              
                    { icon: <SiCloudflare />, name: 'Cloudflare', color: 'bg-orange-100 text-orange-600' },
                    { icon: <SiPostman />, name: 'Postman', color: 'bg-orange-100 text-orange-600' },
                    
                ].map((tool, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${tool.color}`}
                    >
                        {tool.icon}
                        <span>{tool.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
</div>

                   
                    
                </div>
            </div>
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
