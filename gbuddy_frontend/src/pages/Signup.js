import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaGoogle, FaGithub } from 'react-icons/fa';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Signup form, 2: OTP verification
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(600);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (step === 2) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step]);

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post("http://localhost:4001" + "/auth/sendOTP", { email: formData.email });
            if (res.success) {
                setStep(2);
                console.log("OTP sent successfully");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
            console.log(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.value && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            if (e.target.previousSibling) {
                e.target.previousSibling.focus();
            }
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);
        try {
            await axios.post("http://localhost:4001" + "/auth/sendOTP", { email: formData.email });
            setTimeLeft(600);
        } catch (err) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const enteredOTP = otp.join('');
            await axios.post("http://localhost:4001" + "/auth/verifyOTP", {
                email: formData.email,
                enteredotp: enteredOTP
            });

            const response = await axios.post("http://localhost:4001" + "/auth/signup", formData);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data));
                navigate('/home');
            }
        } catch (err) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <FaGraduationCap className="h-8 w-8 text-emerald-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            G-BUDDY
                        </span>
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        {step === 1 ? 'Create your account' : 'Verify your email'}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {step === 1 ? 'Join our community of learners' : `We've sent a verification code to ${formData.email}`}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-2xl shadow-xl"
                >
                    {error && (
                        <div className="mb-4 p-3 rounded bg-red-100 text-red-600">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        // Signup Form
                        <form onSubmit={handleSignupSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your Username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 hover:border-emerald-500 hover:shadow-lg transition-all">
                                        <FaGoogle className="text-red-500" />
                                        <span className="ml-2">Google</span>
                                    </button>
                                    <button className="flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 hover:border-emerald-500 hover:shadow-lg transition-all">
                                        <FaGithub className="text-gray-900" />
                                        <span className="ml-2">GitHub</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        // OTP Verification Form
                        <form onSubmit={handleVerifySubmit} className="space-y-6">
                            <div className="flex justify-center gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target, index)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                        className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || timeLeft === 0}
                                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Verify Email'}
                            </button>

                            <div className="text-center space-y-4">
                                <p className="text-sm text-gray-600">
                                    Time remaining: {Math.floor(timeLeft / 60)}:
                                    {String(timeLeft % 60).padStart(2, '0')}
                                </p>

                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={loading || timeLeft > 0}
                                    className="text-emerald-600 hover:text-emerald-700 font-medium disabled:opacity-50"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>

                <p className="mt-8 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="font-medium text-emerald-600 hover:text-emerald-700">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;
