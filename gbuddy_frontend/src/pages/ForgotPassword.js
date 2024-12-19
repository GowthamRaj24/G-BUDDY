import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import axios from 'axios';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(600);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sentOTP, setSentOTP] = useState(0);

    useEffect(() => {
        if (step === 2) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post("http://localhost:4001/auth/sendOTP", { 
                email: formData.email 
            });
            setSentOTP(response.data.otp);
            setStep(2);
            setTimeLeft(600);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
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

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const enteredOTP = otp.join('');
            const response = await axios.post("http://localhost:4001/auth/verifyOTP", {
                email: formData.email,
                enteredotp: enteredOTP,
                sentotp: sentOTP.toString()
            });
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post("http://localhost:4001/auth/resetPassword", {
                email: formData.email,
                newPassword: formData.newPassword
            });
            navigate('/signin');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
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
                    <FaGraduationCap className="mx-auto h-12 w-12 text-emerald-600" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        {step === 1 ? 'Reset Password' : 
                         step === 2 ? 'Verify OTP' : 
                         'Create New Password'}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {step === 1 ? 'Enter your email to receive OTP' : 
                         step === 2 ? `We've sent a verification code to ${formData.email}` :
                         'Enter your new password'}
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

                    {step === 1 && (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
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
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Time remaining: {Math.floor(timeLeft / 60)}:
                                    {String(timeLeft % 60).padStart(2, '0')}
                                </p>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </motion.div>

                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/signin')}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        Back to Login
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
