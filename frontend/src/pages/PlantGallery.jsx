import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { plantAPI, BASE_URL } from '../utils/api';
import { useTranslation } from 'react-i18next';

const PlantGallery = () => {
    const { t, i18n } = useTranslation();
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        habit: 'all',
        family: 'all',
        search: '',
    });
    const [families, setFamilies] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

    const habits = ['all', 'Herb', 'Shrub', 'Tree', 'Aquatic', 'Grass', 'Climber'];

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPlants();
        }, 300); // Small debounce to prevent too many requests while typing search
        return () => clearTimeout(timer);
    }, [filters.habit, filters.family, filters.search, pagination.page]);

    useEffect(() => {
        fetchFamilies();
    }, []);

    const fetchPlants = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page: pagination.page,
                limit: 12,
            };

            if (filters.habit !== 'all') params.habit = filters.habit;
            if (filters.family !== 'all') params.family = filters.family;
            if (filters.search) params.search = filters.search;

            const response = await plantAPI.getAll(params);
            if (response.data.success) {
                setPlants(response.data.plants);
                setPagination(response.data.pagination);
            } else {
                throw new Error(response.data.message || 'Failed to fetch plants');
            }
        } catch (error) {
            console.error('Error fetching plants:', error);
            setError(error.message || 'Could not connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchFamilies = async () => {
        try {
            const response = await plantAPI.getFamilies();
            setFamilies(response.data.families);
        } catch (error) {
            console.error('Error fetching families:', error);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
        setPagination({ ...pagination, page: 1 });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, page: 1 });
        // fetchPlants() is not needed here as the useEffect with pagination.page dependency will catch it
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl"
                    >
                        <span className="text-[10px] md:text-xs font-bold text-primary-500 uppercase tracking-[0.3em] mb-4 block">
                            {t('botanical_collection')}
                        </span>
                        <h1 className="section-title text-3xl md:text-5xl lg:text-6xl mb-0 tracking-tight">{t('discover_flora')}</h1>
                        <p className="text-[#525C52] mt-4 font-light text-base md:text-lg">
                            {t('exploring_species', { count: pagination.total })}
                        </p>
                    </motion.div>

                    {/* Quick Search */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full md:w-80 lg:w-96"
                    >
                        <form onSubmit={handleSearch} className="relative group">
                            <input
                                type="text"
                                placeholder={t('search_placeholder_gallery')}
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="input-field pr-12 group-hover:border-primary-300 transition-colors shadow-lg shadow-[#1B4332]/5"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1B4332] opacity-50 hover:opacity-100 transition-opacity">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1 space-y-10 md:space-y-12">
                        <div className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-[#EDF1ED] shadow-sm">
                            <h4 className="label mb-6 text-[#1B4332]">{t('plant_habit')}</h4>
                            <div className="flex flex-wrap lg:flex-col gap-2.5 md:gap-3">
                                {habits.map((habit) => (
                                    <button
                                        key={habit}
                                        onClick={() => handleFilterChange('habit', habit)}
                                        className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all text-left whitespace-nowrap lg:whitespace-normal ${filters.habit === habit
                                            ? 'bg-[#1B4332] text-white shadow-lg'
                                            : 'bg-white text-[#525C52] border border-[#EDF1ED] hover:border-primary-200 hover:bg-[#F5F8F5]'
                                            }`}
                                    >
                                        {t(`habit_${habit}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-[#EDF1ED] shadow-sm">
                            <h4 className="label mb-6 text-[#1B4332]">{t('plant_families')}</h4>
                            <select
                                value={filters.family}
                                onChange={(e) => handleFilterChange('family', e.target.value)}
                                className="input-field bg-white border-[#EDF1ED]"
                            >
                                <option value="all">{t('filter_family')}</option>
                                {families.map((family) => (
                                    <option key={family} value={family}>{family}</option>
                                ))}
                            </select>
                        </div>

                        <div className="p-8 bg-[#1B4332] rounded-[2rem] text-white relative overflow-hidden group shadow-xl shadow-[#1B4332]/10">
                            <div className="relative z-10">
                                <h5 className="font-serif text-xl md:text-2xl mb-3">{t('find_it')}</h5>
                                <p className="text-white/70 text-xs md:text-sm mb-6 font-light leading-relaxed">
                                    {t('team_adds')}
                                </p>
                                <Link to="/" className="inline-block text-xs font-bold border-b-2 border-primary-400 pb-1 hover:text-primary-400 transition-colors">
                                    {t('request_species')}
                                </Link>
                            </div>
                            <span className="absolute -bottom-6 -right-6 text-7xl md:text-8xl opacity-10 group-hover:scale-110 transition-transform duration-700 select-none">🌿</span>
                        </div>
                    </aside>

                    {/* Main Gallery Area */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="skeleton"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
                                >
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="card p-4 h-full flex flex-col gap-4">
                                            <div className="skeleton aspect-[4/5] w-full rounded-2xl" />
                                            <div className="skeleton h-8 w-3/4" />
                                            <div className="skeleton h-4 w-1/2" />
                                            <div className="mt-auto skeleton h-10 w-full" />
                                        </div>
                                    ))}
                                </motion.div>
                            ) : error ? (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-red-50 rounded-[3rem] border border-red-100"
                                >
                                    <div className="w-20 md:w-24 h-20 md:h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-xl mb-8">
                                        ⚠️
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-4 font-serif">Something went wrong</h3>
                                    <p className="text-red-600 max-w-sm font-light text-sm md:text-base leading-relaxed mb-8">
                                        {error}
                                    </p>
                                    <button
                                        onClick={fetchPlants}
                                        className="btn-primary bg-red-800 hover:bg-red-900 border-none px-10"
                                    >
                                        Try Again
                                    </button>
                                </motion.div>
                            ) : plants.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-[#F5F8F5] rounded-[3rem] border border-[#EDF1ED]"
                                >
                                    <div className="w-20 md:w-24 h-20 md:h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-xl mb-8">
                                        🍃
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#1B4332] mb-4 font-serif">{t('no_results')}</h3>
                                    <p className="text-[#525C52] max-w-sm font-light text-sm md:text-base leading-relaxed">
                                        {t('no_results_desc')}
                                    </p>
                                    <button
                                        onClick={() => setFilters({ habit: 'all', family: 'all', search: '' })}
                                        className="btn-primary mt-10 px-10"
                                    >
                                        {t('reset_filters')}
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10"
                                >
                                    {plants.map((plant) => (
                                        <motion.div
                                            key={plant._id}
                                            variants={{
                                                hidden: { opacity: 0, y: 30 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            className="group"
                                        >
                                            <Link to={`/plants/${plant._id}`} className="block h-full transition-transform duration-500 group-hover:-translate-y-3">
                                                <div className="card h-full flex flex-col card-hover bg-white border border-[#E0E7E0] hover:border-primary-100 p-3 md:p-4 rounded-[2rem]">
                                                    {/* Image Container */}
                                                    <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-5">
                                                        {plant.image ? (
                                                            <img
                                                                src={plant.image?.startsWith('http') ? plant.image : `${BASE_URL}${plant.image}`}
                                                                alt={plant.localName}
                                                                className="w-full h-full object-cover reveal-img transition-transform duration-700 group-hover:scale-110"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#F5F8F5] flex items-center justify-center text-7xl">
                                                                🎋
                                                            </div>
                                                        )}
                                                        <div className="absolute top-4 left-4 flex gap-2">
                                                            <span className="glass-card px-4 py-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full text-[#1B4332] border border-white/40">
                                                                {t(`habit_${plant.habit}`)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Card Content */}
                                                    <div className="px-3 pb-4 flex-grow flex flex-col">
                                                        <h3 className="text-xl md:text-2xl font-bold text-[#1B4332] mb-1 line-clamp-1 font-serif tracking-tight">
                                                            {plant.localName}
                                                        </h3>
                                                        <p className="text-xs md:text-sm font-light italic text-[#525C52] mb-6">
                                                            {plant.scientificName}
                                                        </p>

                                                        <div className="mt-auto pt-6 border-t border-[#EDF1ED] flex items-center justify-between">
                                                            <div>
                                                                <span className="text-[9px] md:text-[10px] uppercase font-bold text-[#8BA18B] block tracking-[0.2em] mb-1">
                                                                    {t('plant_family_label')}
                                                                </span>
                                                                <span className="text-xs md:text-sm font-bold text-[#1B4332]">
                                                                    {plant.familyName}
                                                                </span>
                                                            </div>
                                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5F8F5] flex items-center justify-center text-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-white transition-all duration-500 shadow-sm border border-[#EDF1ED]">
                                                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pagination Area */}
                        {!loading && pagination.pages > 1 && (
                            <div className="mt-16 md:mt-24 flex flex-col items-center gap-6">
                                <div className="p-2 md:p-3 bg-white/50 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2rem] border border-[#EDF1ED] shadow-sm flex items-center gap-1.5 md:gap-2">
                                    <button
                                        onClick={() => {
                                            setPagination({ ...pagination, page: pagination.page - 1 });
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        disabled={pagination.page === 1}
                                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-[1.5rem] bg-white hover:bg-[#F5F8F5] text-[#1B4332] disabled:opacity-20 transition-all border border-transparent hover:border-[#E0E7E0]"
                                    >
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <div className="flex gap-1.5 md:gap-2 px-3 md:px-4 border-l border-r border-[#EDF1ED]">
                                        {[...Array(pagination.pages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setPagination({ ...pagination, page: i + 1 });
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-[1.5rem] text-xs md:text-sm font-bold transition-all ${pagination.page === i + 1
                                                    ? 'bg-[#1B4332] text-white shadow-lg'
                                                    : 'text-[#1B4332] hover:bg-[#F5F8F5] border border-transparent hover:border-[#E0E7E0]'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => {
                                            setPagination({ ...pagination, page: pagination.page + 1 });
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        disabled={pagination.page === pagination.pages}
                                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-[1.5rem] bg-white hover:bg-[#F5F8F5] text-[#1B4332] disabled:opacity-20 transition-all border border-transparent hover:border-[#E0E7E0]"
                                    >
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <span className="text-[10px] md:text-xs font-bold text-[#8BA18B] uppercase tracking-[0.2em] bg-white/50 px-4 py-1.5 rounded-full border border-[#EDF1ED]">
                                    {t('page_info', { page: pagination.page, pages: pagination.pages })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PlantGallery;
