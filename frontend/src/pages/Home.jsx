import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { plantAPI } from '../utils/api';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t, i18n } = useTranslation();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await plantAPI.getStats();
                setStats(response.data.stats);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-20 -right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary-100/30 rounded-full blur-[60px] md:blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -30, 0],
                            y: [0, 50, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 -left-20 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-earth-100/40 rounded-full blur-[50px] md:blur-[80px]"
                    />
                    <div className="absolute top-1/4 left-10 opacity-[0.03] select-none pointer-events-none hidden lg:block">
                        <span className="text-[200px] font-serif font-black italic">{t('hero_bg_text')}</span>
                    </div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <span className="inline-flex items-center gap-2 px-5 py-2 md:px-6 md:py-2 bg-white rounded-full shadow-sm border border-[#1B4332]/5 text-[#1B4332] text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">
                                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow"></span>
                                {t('hero_badge')}
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className={`mb-8 font-serif ${i18n.language === 'bn'
                                ? 'text-4xl md:text-6xl lg:text-7xl leading-[1.2] md:leading-tight'
                                : 'text-4xl md:text-7xl lg:text-8xl display-title uppercase tracking-tighter'}`}
                        >
                            {t('hero_title')}
                            <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332]">{t('hero_title_accent')}</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg lg:text-xl text-[#525C52] max-w-2xl mx-auto mb-12 font-light leading-relaxed px-4"
                        >
                            {t('hero_subtitle')}
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4"
                        >
                            <Link to="/plants" className="btn-primary w-full sm:min-w-[200px] py-4">
                                {t('browse_collections')}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <a href="#about" className="btn-secondary w-full sm:min-w-[200px] py-4">
                                {t('project_details')}
                            </a>
                        </motion.div>

                        {/* Quick Stats Overlay */}
                        {stats && (
                            <motion.div
                                variants={itemVariants}
                                className="mt-20 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-4 max-w-5xl mx-auto"
                            >
                                {[
                                    { label: t('stat_species'), value: `${stats.total}+` },
                                    { label: t('stat_families'), value: stats.topFamilies?.length || 0 },
                                    { label: t('stat_habitats'), value: stats.byHabit?.length || 0 },
                                    { label: t('stat_locations'), value: t('stat_locations_val') }
                                ].map((stat, idx) => (
                                    <div key={idx} className="glass-card rounded-[2rem] p-5 md:p-6 text-center group hover:bg-white transition-all duration-500">
                                        <div className="text-2xl md:text-3xl font-black text-[#1B4332] mb-1 group-hover:scale-110 transition-transform duration-500">
                                            {stat.value}
                                        </div>
                                        <div className="text-[9px] md:text-[10px] text-[#525C52] font-bold uppercase tracking-widest opacity-60">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Vertical Indicator */}
                <div className="absolute right-10 bottom-20 flex-col items-center gap-4 hidden lg:flex">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1B4332]/40 [writing-mode:vertical-lr] mb-4">
                        {t('scroll_to_explore')}
                    </span>
                    <motion.div
                        animate={{ height: [20, 60, 20], opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-[2px] bg-[#1B4332]/20 rounded-full"
                    />
                </div>
            </section>

            {/* Core Mission Section */}
            <section id="about" className="py-20 md:py-32 relative bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Lush Greenhouse"
                                    className="w-full h-full object-cover shadow-inner"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/40 to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 md:w-64 h-48 md:h-64 bg-[#F5F8F5] rounded-[2.5rem] -z-0" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-6 -left-6 w-24 md:w-32 h-24 md:h-32 bg-white shadow-xl rounded-full flex items-center justify-center z-20"
                            >
                                <span className="text-3xl md:text-4xl">🌿</span>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <span className="text-xs font-bold text-primary-500 uppercase tracking-[0.4em] mb-4 block">
                                {t('mission_badge')}
                            </span>
                            <h2 className="section-title text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight">{t('mission_title')}</h2>
                            <p className="text-base md:text-lg text-[#525C52] leading-relaxed mb-10 font-light px-1">
                                {t('mission_desc')}
                            </p>

                            <div className="space-y-6 md:space-y-8">
                                {[
                                    { icon: '🌱', title: t('mission_point1_title'), desc: t('mission_point1_desc') },
                                    { icon: '🔬', title: t('mission_point2_title'), desc: t('mission_point2_desc') },
                                    { icon: '📍', title: t('mission_point3_title'), desc: t('mission_point3_desc') }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-5 md:gap-6 group">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F5F8F5] rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl md:text-3xl shadow-sm group-hover:bg-[#1B4332] group-hover:text-white transition-colors duration-500">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-[#1B4332] mb-1">{feature.title}</h4>
                                            <p className="text-[#525C52] text-[13px] md:text-sm leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Interactive Grid Section */}
            <section className="py-20 md:py-32 bg-[#F5F8F5] relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-4">{t('grid_title')}</h2>
                        <div className="w-20 md:w-24 h-1.5 bg-[#1B4332] mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {[
                            { title: t('why_point1_title'), icon: '🌍', desc: t('why_point1_desc') },
                            { title: t('why_point2_title'), icon: '💻', desc: t('why_point2_desc') },
                            { title: t('why_point3_title'), icon: '🏺', desc: t('why_point3_desc') }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="glass-card p-8 md:p-10 rounded-[2.5rem] group hover:bg-white border-2 border-transparent hover:border-[#1B4332]/5 shadow-xl shadow-transparent hover:shadow-[#1B4332]/5 transition-all duration-500"
                            >
                                <div className="text-4xl md:text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#1B4332] mb-4 font-serif">{item.title}</h3>
                                <p className="text-[#525C52] leading-relaxed font-light text-sm md:text-base">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 md:py-40 bg-[#1B4332] relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://www.transparenttextures.com/patterns/leaf.png"
                        alt="Background Texture"
                        className="w-full h-full object-repeat"
                    />
                </div>
                {/* Decorative particles */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white/10 rounded-full animate-pulse-slow" />

                <div className="relative z-10 px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className={`font-bold text-white mb-10 font-serif leading-tight ${i18n.language === 'bn' ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-6xl lg:text-7xl'}`}>
                            {t('final_cta_title')}
                            <br className="hidden sm:block" />
                            <span className="text-white/40">{t('final_cta_title_accent')}</span>
                        </h2>
                        <Link
                            to="/plants"
                            className="inline-flex items-center gap-4 bg-white text-[#1B4332] px-10 md:px-14 py-4 md:py-6 rounded-full font-bold text-base md:text-xl hover:bg-[#F0F4F0] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 group"
                        >
                            {t('visit_gallery')}
                            <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
