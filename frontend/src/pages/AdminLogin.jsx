import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAPI } from '../utils/api';
import { useTranslation } from 'react-i18next';

const AdminLogin = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await adminAPI.login(formData);

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin/dashboard');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B4332]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1B4332]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full relative z-10"
            >
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="inline-block bg-white rounded-3xl p-5 mb-6 shadow-xl border border-[#EDF1ED]"
                    >
                        <span className="text-5xl">🌿</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-2 font-serif">
                        {t('admin_login')}
                    </h1>
                    <p className="text-[#525C52] text-sm uppercase tracking-[0.2em] font-bold">
                        {t('mission_badge')}
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">
                        {t('sign_in')}
                    </h2>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="label">{t('username')}</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder={t('username')}
                            />
                        </div>

                        <div>
                            <label className="label">{t('password')}</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder={t('password')}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed justify-center"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <div className="loader mr-2"></div>
                                    {t('signing_in')}
                                </span>
                            ) : (
                                t('sign_in')
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-sm text-[#1B4332] hover:text-[#2D6A4F] font-bold transition-colors"
                        >
                            ← {t('home')}
                        </a>
                    </div>
                </div>

                {/* Info Note */}
                <div className="mt-6 text-center text-[#1B4332]/50 text-xs font-bold uppercase tracking-widest">
                    <p>🔒 {t('admin_access')} Only</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
