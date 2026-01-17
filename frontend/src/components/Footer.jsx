import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();

    return (
        <footer className="bg-[#1B4332] text-white overflow-hidden relative">
            {/* Decorative leaf texture overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <img
                    src="https://www.transparenttextures.com/patterns/leaf.png"
                    alt="Leaf texture"
                    className="w-full h-full object-repeat"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center space-x-3 mb-8 group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:rotate-6">
                                🌿
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tight">
                                    {i18n.language === 'bn' ? 'উদ্ভিদ তথ্যকেন্দ্র' : 'Plant Database'}
                                </span>
                                <span className="text-[10px] text-primary-200/60 uppercase tracking-[0.3em] font-bold">
                                    {t('scientific_archive')}
                                </span>
                            </div>
                        </Link>
                        <p className="text-primary-100/70 leading-relaxed max-w-sm text-lg font-light mb-8">
                            {t('footer_tagline')}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-8">{t('navigation')}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: t('home'), path: '/' },
                                { name: t('gallery'), path: '/plants' },
                                { name: t('admin_panel'), path: '/admin/login' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="text-primary-100 hover:text-white transition-colors flex items-center group font-medium"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact/Support */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-8">{t('research')}</h4>
                        <div className="space-y-4">
                            <p className="text-primary-100/70 text-sm leading-relaxed font-light">
                                {t('academic_inquiries')}
                            </p>
                            <Link to="/" className="inline-block py-3 px-6 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all border border-white/5">
                                research@plantdb.org
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-primary-200/40 text-xs font-bold uppercase tracking-widest">
                        {t('copyright', { year: new Date().getFullYear() })}
                    </div>
                    <div className="flex gap-8">
                        <span className="text-primary-200/40 text-xs font-bold uppercase tracking-widest cursor-default">{t('privacy_policy')}</span>
                        <span className="text-primary-200/40 text-xs font-bold uppercase tracking-widest cursor-default">{t('terms_of_data')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
