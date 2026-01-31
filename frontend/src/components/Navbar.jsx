import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const isAdmin = localStorage.getItem('adminToken');

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'bn' : 'en';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { path: '/', label: t('home') },
        { path: '/plants', label: t('gallery') },
        // { path: '/project-details', label: t('project_details') },
    ];

    if (isAdmin) {
        navLinks.push({ path: '/admin/dashboard', label: t('admin_panel') });
    }

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('adminToken');
        setShowLogoutModal(false);
        window.location.href = '/';
    };

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-[#1B4332]/5 sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="w-9 h-9 bg-[#1B4332] rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                                <span className="text-white text-xl font-bold">🌿</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-[#1B4332] tracking-tight leading-none">
                                    {i18n.language === 'bn' ? 'উদ্ভিদ তথ্যকেন্দ্র' : 'Plant Database'}
                                </span>
                                <span className="text-[10px] text-[#525C52] uppercase tracking-[0.2em] font-semibold mt-1">
                                    {i18n.language === 'bn' ? 'জীববৈচিত্র্য গবেষণা' : 'Biodiversity Research'}
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link text-sm uppercase tracking-widest font-bold ${location.pathname === link.path ? 'active-nav-link' : ''
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="h-6 w-[1px] bg-gray-200"></div>

                        {/* Language Switcher */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#1B4332]/10 hover:bg-[#F5F8F5] transition-all"
                        >
                            <span className={`text-[10px] font-black uppercase tracking-widest ${i18n.language === 'en' ? 'text-[#1B4332]' : 'text-gray-400'}`}>EN</span>
                            <div className="w-8 h-4 bg-[#EDF1ED] rounded-full relative p-0.5">
                                <motion.div
                                    animate={{ x: i18n.language === 'en' ? 0 : 16 }}
                                    className="w-3 h-3 bg-[#1B4332] rounded-full shadow-sm"
                                />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${i18n.language === 'bn' ? 'text-[#1B4332]' : 'text-gray-400'}`}>বাংলা</span>
                        </button>

                        <div className="h-6 w-[1px] bg-gray-200"></div>

                        {isAdmin ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/admin/dashboard"
                                    className="bg-[#1B4332]/5 text-[#1B4332] text-[10px] uppercase tracking-widest font-bold px-6 py-3 rounded-full hover:bg-[#1B4332]/10 transition-all"
                                >
                                    {t('portal')}
                                </Link>
                                <button
                                    onClick={handleLogoutClick}
                                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-500 hover:text-red-600 transition-all px-2"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/admin/login"
                                className="bg-[#1B4332] text-white text-[10px] uppercase tracking-widest font-bold px-6 py-3 rounded-full hover:bg-[#2D6A4F] shadow-md transition-all active:scale-95"
                            >
                                {t('admin_access')}
                            </Link>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-1.5 rounded-lg border border-[#1B4332]/10 text-[10px] font-black uppercase tracking-widest text-[#1B4332]"
                        >
                            {i18n.language === 'en' ? 'BN' : 'EN'}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-xl bg-[#F0F4F0] text-[#1B4332] hover:bg-[#E0E7E0] transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
                        >
                            <div className="py-6 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-3 rounded-2xl text-base font-bold tracking-wide transition-all ${location.pathname === link.path
                                            ? 'bg-[#1B4332] text-white shadow-lg'
                                            : 'text-[#404940] hover:bg-[#F0F4F0]'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {isAdmin ? (
                                    <div className="space-y-3 pt-4 border-t border-gray-50">
                                        <Link
                                            to="/admin/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-3 rounded-2xl text-center text-sm font-bold bg-[#F5F8F5] text-[#1B4332]"
                                        >
                                            {t('portal')}
                                        </Link>
                                        <button
                                            onClick={handleLogoutClick}
                                            className="w-full px-4 py-3 rounded-2xl text-sm font-bold text-red-500 bg-red-50"
                                        >
                                            {t('logout')}
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/admin/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-4 rounded-2xl text-center text-base font-bold bg-[#1B4332] text-white shadow-lg font-sans"
                                    >
                                        {t('admin_access')}
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Premium Logout Modal */}
            <AnimatePresence>
                {showLogoutModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#0A1A0F]/60 backdrop-blur-md flex items-center justify-center z-[1000] p-4"
                        onClick={() => setShowLogoutModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, rotateX: 10 }}
                            animate={{ scale: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F8F5] rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="p-10 text-center relative z-10">
                                <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
                                    🚪
                                </div>
                                <h3 className="text-2xl font-bold text-[#1B4332] font-serif mb-3 tracking-tight">
                                    {t('terminate_session')}
                                </h3>
                                <p className="text-[#525C52] text-sm leading-relaxed mb-10 font-light italic">
                                    {i18n.language === 'bn'
                                        ? 'আপনি কি নিশ্চিত যে আপনার বর্তমান সেশনটি শেষ করতে চান?'
                                        : 'Are you sure you want to end your current administrative session?'}
                                </p>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={confirmLogout}
                                        className="w-full py-4 px-6 bg-[#1B4332] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-[#1B4332]/20 active:scale-[0.98]"
                                    >
                                        {i18n.language === 'bn' ? 'হ্যাঁ, লগআউট করুন' : 'Yes, Log Out'}
                                    </button>
                                    <button
                                        onClick={() => setShowLogoutModal(false)}
                                        className="w-full py-4 px-6 border border-[#EDF1ED] rounded-2xl font-bold text-[#525C52] hover:bg-[#F5F8F5] transition-all active:scale-[0.98]"
                                    >
                                        {i18n.language === 'bn' ? 'না, ফিরে যান' : 'Stay Signed In'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
