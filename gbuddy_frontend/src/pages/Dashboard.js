import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image from "./developer-avatar.jpg";
import { 
    FaPython, FaJava, FaHtml5, FaCss3, FaServer, 
    FaLightbulb,  FaCode ,FaStore , FaCalendarAlt, FaCloud, FaRobot
} from 'react-icons/fa';
import { 
    SiTypescript, SiC, SiMysql, SiPostgresql, 
     SiCloudflare, SiPostman
} from 'react-icons/si';

import { 
    FaGraduationCap, FaBook,  
     FaChalkboardTeacher, FaLaptopCode, 
     FaSearch
} from 'react-icons/fa';
import  Navbar  from '../components/Navbar';
import { 
    FaGithub, 
    FaLinkedin, 
    FaEnvelope, 
    FaReact, 
    FaJs, 
    FaNodeJs, 
    FaGit
} from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb } from 'react-icons/si';
import "./main.css"

import { PrimaryButton, SecondaryButton } from '../components/Button';
import { FeatureCard } from '../components/Card';

const Dashboard = () => {


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

            {/* Developer Section */}
<section className="py-16 px-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
    <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left Column - Profile */}
                <div className="md:w-1/4 flex flex-col items-center text-center">
                    <div className="relative w-40 h-40">
                        <img 
                            src={image} 
                            alt="Gowtham Raj" 
                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                        />
                        
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mt-6">Gowtham Raj</h3>
                    <p className="text-emerald-600 text-base font-medium">Full Stack Developer</p>
                    <p className="text-gray-600 text-sm mb-6">B.Tech CSE - AI & ML</p>
                    
                    <div className="flex gap-4 mb-4">
                        {[
                            { icon: <FaGithub className="w-5 h-5" />, url: "https://github.com/GowthamRaj24" },
                            { icon: <FaCode className="w-5 h-5" />, url: "https://leetcode.com/Gowtham_Raj24" },
                            { icon: <FaLinkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/gowtham-raj-1061a5272/" },
                            { icon: <FaEnvelope className="w-5 h-5" />, url: "mailto:mgowthamraj9491@gmail.com" }
                        ].map((social, index) => (
                            <a 
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all hover:scale-105"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                    <button 
                        onClick={() => window.location.href = 'mailto:mgowthamraj9491@gmail.com'}
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-xl hover:bg-emerald-700 transition-colors text-sm font-medium"
                    >
                        Contact Me
                    </button>
                </div>

                {/* Right Column - Skills & Projects */}
                <div className="md:w-3/4">
                    {/* Skills Section */}
<div className="mb-8">
    <h4 className="text-lg font-semibold text-gray-700 mb-4">Technical Skills</h4>
    <div className="flex flex-wrap gap-2">
        {[
            { icon: <FaPython />, label: "Python" },
            { icon: <FaJs />, label: "JavaScript ES6+" },
            { icon: <SiTypescript />, label: "TypeScript" },
            { icon: <FaJava />, label: "Java" },
            { icon: <SiC />, label: "C" },
            { icon: <SiMysql />, label: "SQL" },
            { icon: <FaReact />, label: "React.js" },
            { icon: <FaNodeJs />, label: "Node.js" },
            { icon: <SiExpress />, label: "Express.js" },
            { icon: <FaHtml5 />, label: "HTML5" },
            { icon: <FaCss3 />, label: "CSS3" },
            { icon: <SiTailwindcss />, label: "TailwindCSS" },
            { icon: <FaServer />, label: "RESTful APIs" },
            { icon: <SiPostgresql />, label: "PostgreSQL" },
            { icon: <SiMongodb />, label: "MongoDB" },
            { icon: <SiMysql />, label: "MySQL" },
            { icon: <FaGit />, label: "Git" },
            { icon: <FaGithub />, label: "GitHub" },
            { icon: <SiCloudflare />, label: "Cloudflare" },
            { icon: <SiPostman />, label: "Postman" },
            { icon: <FaLaptopCode />, label: "VS Code" },
            { icon: <FaCloud />, label: "AWS Basics" },
            { icon: <FaRobot />, label: "Chatbot Integration" },
            { icon: <FaLightbulb />, label: "Machine Learning" }
        ].map((skill, index) => (
            <span key={index} 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-emerald-50 rounded-lg text-sm transition-colors">
                <span className="text-emerald-600">{skill.icon}</span>
                {skill.label}
            </span>
        ))}
    </div>
</div>

                    
                    
                      

                    {/* Projects Grid */}
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Featured Projects</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            {
                                title: "G-BUDDY",
                                desc: "Resource Sharing Platform with Google Drive Integration",
                                url: "https://g-buddy.vercel.app"
                            },
                            {
                                title: "BlogX",
                                desc: "Scalable Blog Platform with Cloudflare",
                                url: "https://blogx1.netlify.app"
                            },
                            {
                                title: "Portfolio",
                                desc: "Personal Portfolio Showcase",
                                url: "https://gowthamraj24n.netlify.app"
                            },
                            {
                                title: "Explore More",
                                desc: "Check out more projects on GitHub →",
                                url: "https://github.com/GowthamRaj24"
                            }
                        ].map((project, index) => (
                            <a 
                                key={index}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group"
                            >
                                <h5 className="font-medium text-emerald-600 text-base group-hover:text-emerald-700">{project.title}</h5>
                                <p className="text-sm text-gray-600">{project.desc}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
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
