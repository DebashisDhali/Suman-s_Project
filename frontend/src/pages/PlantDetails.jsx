import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { plantAPI, BASE_URL } from '../utils/api';
import { useTranslation } from 'react-i18next';

const PlantDetails = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlant();
    }, [id]);

    const fetchPlant = async () => {
        setLoading(true);
        try {
            const response = await plantAPI.getById(id);
            setPlant(response.data.plant);
        } catch (error) {
            console.error('Error fetching plant:', error);
        } finally {
            setTimeout(() => setLoading(false), 600);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <div className="skeleton aspect-[4/5] lg:h-[600px] rounded-[2rem] md:rounded-[3rem]" />
                        <div className="space-y-8 py-4 lg:py-10">
                            <div className="skeleton h-4 w-32" />
                            <div className="skeleton h-16 md:h-20 w-full" />
                            <div className="skeleton h-8 md:h-10 w-2/3" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="skeleton h-20 md:h-24 rounded-2xl" />
                                <div className="skeleton h-20 md:h-24 rounded-2xl" />
                            </div>
                            <div className="skeleton h-32 md:h-40 rounded-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!plant) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
                    <div className="w-20 md:w-24 h-20 md:h-24 bg-[#F5F8F5] rounded-full flex items-center justify-center text-4xl md:text-5xl mx-auto mb-8 shadow-inner">🔭</div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B4332] mb-4">{t('species_not_found')}</h2>
                    <p className="text-[#525C52] mb-10 font-light text-sm md:text-base">{t('record_not_exist')}</p>
                    <Link to="/plants" className="btn-primary inline-flex">{t('return_to_collections')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:pb-32">
                {/* Breadcrumb Navigation */}
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#8BA18B] mb-8 md:mb-12 bg-white/50 p-4 rounded-2xl border border-[#EDF1ED] lg:bg-transparent lg:p-0 lg:border-0"
                >
                    <Link to="/" className="hover:text-[#1B4332] transition-colors">{t('archive')}</Link>
                    <span className="opacity-30">/</span>
                    <Link to="/plants" className="hover:text-[#1B4332] transition-colors">{t('botanical_list')}</Link>
                    <span className="opacity-30">/</span>
                    <span className="text-[#1B4332] truncate max-w-[150px] md:max-w-none">{plant.localName}</span>
                </motion.nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-start">
                    {/* Visual Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="col-span-1 lg:col-span-5 lg:sticky lg:top-24"
                    >
                        <div className="relative group">
                            <div className="aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#F5F8F5] border-4 md:border-8 border-white">
                                {plant.image ? (
                                    <img
                                        src={`${BASE_URL}${plant.image}`}
                                        alt={plant.localName}
                                        className="w-full h-full object-cover reveal-img"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-7xl md:text-9xl p-10 md:p-20 opacity-20">
                                        🍃
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            {/* Habit Floating Badge */}
                            <div className="absolute top-6 left-6 md:top-8 md:left-8">
                                <span className="glass-card px-5 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#1B4332] border border-white/50">
                                    {t(`habit_${plant.habit}`)}
                                </span>
                            </div>

                            {/* Location Context Overlay */}
                            <div className="absolute -bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                                <div className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between border border-white/40 shadow-2xl backdrop-blur-2xl">
                                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1B4332] rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center text-lg shadow-lg">
                                            📍
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className="text-[8px] md:text-[10px] font-bold text-[#1B4332]/60 uppercase tracking-widest block mb-0.5 whitespace-nowrap">{t('primary_location')}</span>
                                            <h4 className="font-bold text-[#1B4332] text-sm md:text-lg truncate">{plant.location}</h4>
                                        </div>
                                    </div>
                                    {plant.mapLink && (
                                        <a
                                            href={plant.mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center hover:bg-[#F5F8F5] transition-colors shadow-md border border-[#EDF1ED]"
                                        >
                                            <svg className="w-5 h-5 text-[#1B4332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Data Section */}
                    <div className="col-span-1 lg:col-span-7 space-y-10 lg:pl-4 pt-10 lg:pt-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif text-[#1B4332] mb-4 tracking-tight leading-tight">
                                {plant.localName}
                            </h1>
                            <div className="flex items-center gap-4 mb-10 overflow-hidden">
                                <p className="text-base md:text-xl font-light italic text-[#525C52] whitespace-nowrap">
                                    {plant.scientificName}
                                </p>
                                <div className="h-px bg-[#EDF1ED] flex-grow min-w-[20px]" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-6 md:p-8 bg-white rounded-[2rem] border border-[#EDF1ED] shadow-sm group hover:bg-[#1B4332] transition-all duration-500">
                                    <span className="text-[10px] md:text-xs font-bold text-[#8BA18B] uppercase tracking-widest block mb-1 group-hover:text-white/60">{t('family_classification')}</span>
                                    <span className="text-xl md:text-2xl font-bold text-[#1B4332] group-hover:text-white transition-colors font-serif">
                                        {plant.familyName}
                                    </span>
                                </div>
                                <div className="p-6 md:p-8 bg-white rounded-[2rem] border border-[#EDF1ED] shadow-sm group hover:bg-[#1B4332] transition-all duration-500">
                                    <span className="text-[10px] md:text-xs font-bold text-[#8BA18B] uppercase tracking-widest block mb-1 group-hover:text-white/60">{t('biologic_habit')}</span>
                                    <span className="text-xl md:text-2xl font-bold text-[#1B4332] group-hover:text-white transition-colors font-serif">
                                        {t(`habit_${plant.habit}`)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description Reveal */}
                        {plant.description && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="relative bg-white/50 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-[#EDF1ED]"
                            >
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B4332] mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                                    {t('botanical_analysis')}
                                </h2>
                                <p className="text-base md:text-lg text-[#525C52] leading-relaxed font-light first-letter:text-5xl md:first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#1B4332] first-letter:font-bold italic lg:not-italic">
                                    {plant.description}
                                </p>
                            </motion.div>
                        )}

                        {/* Medicinal Intelligence */}
                        {plant.uses && plant.uses.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-[#1B4332] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-[#1B4332]/20"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <div className="relative z-10">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
                                        {t('therapeutic_applications')}
                                    </h2>
                                    <div className="space-y-4 md:space-y-6">
                                        {plant.uses.map((use, idx) => (
                                            <div key={idx} className="flex gap-4 items-start group">
                                                <div className="w-8 h-8 md:w-9 md:h-9 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center text-base md:text-lg group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
                                                    🍃
                                                </div>
                                                <p className="text-sm md:text-base font-light leading-relaxed text-white/90 group-hover:text-white transition-colors">
                                                    {use}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="pt-10 flex"
                        >
                            <Link to="/plants" className="btn-secondary w-full md:w-auto text-center justify-center py-5 px-12 text-sm md:text-base group font-bold">
                                <svg className="w-5 h-5 mr-3 rotate-180 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                {t('back_to_gallery')}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PlantDetails;
