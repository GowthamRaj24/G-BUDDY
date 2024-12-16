import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FaGraduationCap, FaBook, FaUsers, 
    FaRocket, FaChalkboardTeacher, FaLaptopCode , FaGithub , FaLinkedin
} from 'react-icons/fa';
import  Navbar  from '../components/Navbar';
// import  Footer  from '../components/Footer';
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
                            Ready to Transform Your Academic Journey?
                        </h2>
                        <p className="text-xl mb-8 text-emerald-50">
                            Join G-BUDDY today and experience the difference
                        </p>
                        <Link to="/">
                            <PrimaryButton className="">
                                Get Started Free
                            </PrimaryButton>
                        </Link>
                    </motion.div>
                </div>
            </section>


<section className="py-16 px-6 bg-white/80 backdrop-blur-sm">
    <div className="max-w-4xl mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-xl"
        >
            <div className="mb-6">
                <img 
                    src="/developer-avatar.jpg" 
                    alt="Developer" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-emerald-400"
                />
                <h3 className="text-2xl font-bold text-gray-800">Gowtham Raj</h3>
                <p className="text-emerald-600">Full Stack Developer</p>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Building G-BUDDY to revolutionize how students collaborate and learn together. Let's make education more accessible and enjoyable.
            </p>
            <div className="flex justify-center space-x-4">
                <Link 
                    to="https://github.com/yourusername" 
                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                    <FaGithub className="w-6 h-6" />
                </Link>
                <Link 
                    to="https://linkedin.com/in/yourusername" 
                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                    <FaLinkedin className="w-6 h-6" />
                </Link>
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
        title: "Smart Notes Sharing",
        description: "Share and access quality study materials with your peers instantly"
    },
    {
        icon: <FaUsers className="w-6 h-6" />,
        title: "Study Groups",
        description: "Form and join subject-specific study groups for better collaboration"
    },
    {
        icon: <FaChalkboardTeacher className="w-6 h-6" />,
        title: "Expert Connect",
        description: "Connect with subject matter experts and mentors"
    },
    {
        icon: <FaRocket className="w-6 h-6" />,
        title: "Career Resources",
        description: "Access internship opportunities and career guidance"
    },
    {
        icon: <FaLaptopCode className="w-6 h-6" />,
        title: "Online Workshops",
        description: "Participate in skill-building workshops and webinars"
    },
    {
        icon: <FaBook className="w-6 h-6" />,
        title: "Resource Library",
        description: "Access a vast library of study materials and previous papers"
    }
];

const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Notes Shared" },
    { number: "5K+", label: "Study Groups" },
    { number: "15K+", label: "Success Stories" }
];

export default Dashboard;
