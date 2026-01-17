import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { adminAPI, plantAPI, BASE_URL } from '../utils/api';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [dashboard, setDashboard] = useState(null);
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [plantToDelete, setPlantToDelete] = useState(null);
    const [editingPlant, setEditingPlant] = useState(null);
    const [formData, setFormData] = useState({
        localName: '',
        scientificName: '',
        familyName: '',
        habit: 'Herb',
        uses: '',
        description: '',
        location: '',
        mapLink: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            await Promise.all([fetchDashboardData(), fetchPlants()]);
            setLoading(false);
        };
        loadInitialData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await adminAPI.getDashboard();
            setDashboard(response.data.dashboard);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            }
        }
    };

    const fetchPlants = async () => {
        try {
            const response = await plantAPI.getAll({ limit: 100 });
            setPlants(response.data.plants);
        } catch (error) {
            console.error('Error fetching plants:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('localName', formData.localName);
        data.append('scientificName', formData.scientificName);
        data.append('familyName', formData.familyName);
        data.append('habit', formData.habit);
        data.append('description', formData.description);
        data.append('location', formData.location);
        data.append('mapLink', formData.mapLink);

        // Convert uses to array
        const usesArray = formData.uses.split('\n').filter(use => use.trim());
        data.append('uses', JSON.stringify(usesArray));

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingPlant) {
                await adminAPI.updatePlant(editingPlant._id, data);
            } else {
                await adminAPI.createPlant(data);
            }

            setShowModal(false);
            resetForm();
            fetchDashboardData();
            fetchPlants();
        } catch (error) {
            console.error('Error saving plant:', error);
            alert('Error saving plant. Please try again.');
        }
    };

    const handleEdit = (plant) => {
        setEditingPlant(plant);
        setFormData({
            localName: plant.localName,
            scientificName: plant.scientificName,
            familyName: plant.familyName,
            habit: plant.habit,
            uses: plant.uses ? plant.uses.join('\n') : '',
            description: plant.description || '',
            location: plant.location || '',
            mapLink: plant.mapLink || '',
            image: null,
        });
        setImagePreview(`${BASE_URL}${plant.image}`);
        setShowModal(true);
    };

    const handleDeleteClick = (plant) => {
        setPlantToDelete(plant);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!plantToDelete) return;
        try {
            await adminAPI.deletePlant(plantToDelete._id);
            setShowDeleteModal(false);
            setPlantToDelete(null);
            fetchDashboardData();
            fetchPlants();
        } catch (error) {
            console.error('Error deleting plant:', error);
            alert('Failed to delete species.');
        }
    };

    const resetForm = () => {
        setEditingPlant(null);
        setFormData({
            localName: '',
            scientificName: '',
            familyName: '',
            habit: 'Herb',
            uses: '',
            description: '',
            location: '',
            mapLink: '',
            image: null,
        });
        setImagePreview(null);
    };

    const handleLogout = () => {
        const isLoggingOut = window.confirm(t('terminate_session'));
        if (isLoggingOut) {
            localStorage.removeItem('adminToken');
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 md:mb-16">
                    <div>
                        <span className="text-xs font-bold text-primary-500 uppercase tracking-[0.3em] mb-3 block">
                            {t('administration')}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] font-serif">{t('curator_portal')}</h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 bg-[#F5F8F5] p-2 rounded-2xl border border-[#EDF1ED] w-full md:w-auto overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'dashboard'
                                ? 'bg-white text-[#1B4332] shadow-sm'
                                : 'text-[#525C52] hover:text-[#1B4332]'
                                }`}
                        >
                            {t('dashboard')}
                        </button>
                        <button
                            onClick={() => setActiveTab('plants')}
                            className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'plants'
                                ? 'bg-white text-[#1B4332] shadow-sm'
                                : 'text-[#525C52] hover:text-[#1B4332]'
                                }`}
                        >
                            {t('species_archive')}
                        </button>
                        <Link
                            to="/"
                            className="flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold text-[#1B4332] hover:bg-white transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>{t('back_to_site')}</span>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="h-[50vh] flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#1B4332] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {activeTab === 'dashboard' && dashboard && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                <div className="p-6 md:p-8 bg-white border border-[#EDF1ED] rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow group">
                                    <span className="text-[10px] font-bold text-[#8BA18B] uppercase tracking-[0.2em] block mb-4">{t('total_species')}</span>
                                    <div className="flex items-end gap-3">
                                        <span className="text-3xl md:text-4xl font-bold text-[#1B4332] font-serif">{dashboard.totalPlants}</span>
                                        <span className="text-[#8BA18B] mb-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider">{t('stat_species')}</span>
                                    </div>
                                    <div className="mt-8 w-10 md:w-12 h-10 md:h-12 bg-[#F5F8F5] rounded-xl flex items-center justify-center text-xl group-hover:bg-[#1B4332] group-hover:text-white transition-colors">🌿</div>
                                </div>

                                <div className="p-6 md:p-8 bg-white border border-[#EDF1ED] rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow group">
                                    <span className="text-[10px] font-bold text-[#8BA18B] uppercase tracking-[0.2em] block mb-4">{t('scientific_families')}</span>
                                    <div className="flex items-end gap-3">
                                        <span className="text-3xl md:text-4xl font-bold text-[#1B4332] font-serif">{dashboard.totalFamilies}</span>
                                        <span className="text-[#8BA18B] mb-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider">{t('stat_families')}</span>
                                    </div>
                                    <div className="mt-8 w-10 md:w-12 h-10 md:h-12 bg-[#F5F8F5] rounded-xl flex items-center justify-center text-xl group-hover:bg-[#1B4332] group-hover:text-white transition-colors">🧬</div>
                                </div>

                                {Object.entries(dashboard.habitStats || {}).slice(0, 2).map(([habit, count]) => (
                                    <div key={habit} className="p-6 md:p-8 bg-white border border-[#EDF1ED] rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow group">
                                        <span className="text-[10px] font-bold text-[#8BA18B] uppercase tracking-[0.2em] block mb-4">{t(`habit_${habit}`)} {t('forms')}</span>
                                        <div className="flex items-end gap-3">
                                            <span className="text-3xl md:text-4xl font-bold text-[#1B4332] font-serif">{count}</span>
                                            <span className="text-[#8BA18B] mb-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider">{t('classified')}</span>
                                        </div>
                                        <div className="mt-8 w-10 md:w-12 h-10 md:h-12 bg-[#F5F8F5] rounded-xl flex items-center justify-center text-xl group-hover:bg-[#1B4332] group-hover:text-white transition-colors">📊</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'plants' && (
                            <div className="space-y-6 md:space-y-8">
                                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 md:p-6 rounded-3xl border border-[#EDF1ED] gap-4 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 md:w-12 h-10 md:h-12 bg-[#F5F8F5] rounded-2xl flex items-center justify-center text-xl">🎋</div>
                                        <h2 className="text-lg md:text-xl font-bold text-[#1B4332]">{t('archived_species')} ({plants.length})</h2>
                                    </div>
                                    <button
                                        onClick={() => { resetForm(); setShowModal(true); }}
                                        className="btn-primary w-full sm:w-auto py-3 px-6 text-sm"
                                    >
                                        + {t('enroll_new_species')}
                                    </button>
                                </div>

                                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-[#EDF1ED] overflow-hidden shadow-sm overflow-x-auto no-scrollbar">
                                    <table className="w-full text-left min-w-[800px]">
                                        <thead>
                                            <tr className="bg-[#F5F8F5]">
                                                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold text-[#8BA18B] uppercase tracking-widest">{t('image_label')}</th>
                                                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold text-[#8BA18B] uppercase tracking-widest">{t('local_name_label')}</th>
                                                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold text-[#8BA18B] uppercase tracking-widest">{t('scientific_label')}</th>
                                                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold text-[#8BA18B] uppercase tracking-widest">{t('family_label')}</th>
                                                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold text-[#8BA18B] uppercase tracking-widest">{t('actions_label')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#EDF1ED]">
                                            {plants.map((plant) => (
                                                <tr key={plant._id} className="hover:bg-[#F5F8F5]/30 transition-colors">
                                                    <td className="px-6 md:px-8 py-4">
                                                        <div className="w-12 md:w-16 h-12 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-[#EDF1ED]">
                                                            {plant.image ? (
                                                                <img
                                                                    src={`${BASE_URL}${plant.image}`}
                                                                    alt={plant.localName}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-[#F5F8F5] flex items-center justify-center text-xl">🌿</div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 md:px-8 py-4">
                                                        <span className="font-bold text-[#1B4332] font-serif text-base md:text-lg">{plant.localName}</span>
                                                    </td>
                                                    <td className="px-6 md:px-8 py-4">
                                                        <span className="text-xs md:text-sm italic text-[#525C52]">{plant.scientificName}</span>
                                                    </td>
                                                    <td className="px-6 md:px-8 py-4">
                                                        <span className="px-3 md:px-4 py-1 md:py-1.5 bg-[#F5F8F5] text-[#1B4332] rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-[#EDF1ED]">
                                                            {plant.familyName}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 md:px-8 py-4">
                                                        <div className="flex gap-4">
                                                            <button
                                                                onClick={() => handleEdit(plant)}
                                                                className="text-[#1B4332] hover:text-primary-600 transition-colors"
                                                            >
                                                                <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(plant)}
                                                                className="text-[#E0E7E0] hover:text-red-500 transition-colors"
                                                            >
                                                                <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#0A1A0F]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 font-sans"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 md:p-14">
                                <div className="flex justify-between items-start mb-8 md:mb-12">
                                    <div>
                                        <span className="text-[10px] md:text-xs font-bold text-primary-500 uppercase tracking-[0.3em] mb-2 block">{t('curation')}</span>
                                        <h2 className="text-2xl md:text-3xl font-bold text-[#1B4332] font-serif tracking-tight">
                                            {editingPlant ? t('update_species') : t('enroll_species')}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-[#EDF1ED] flex items-center justify-center hover:bg-[#F5F8F5] transition-colors"
                                    >
                                        <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div>
                                            <label className="label">{t('local_archive_name')}</label>
                                            <input
                                                type="text"
                                                name="localName"
                                                placeholder="e.g. Lavender"
                                                value={formData.localName}
                                                onChange={handleInputChange}
                                                required
                                                className="input-field py-3 md:py-3.5"
                                            />
                                        </div>

                                        <div>
                                            <label className="label">{t('scientific_name_label')}</label>
                                            <input
                                                type="text"
                                                name="scientificName"
                                                placeholder="e.g. Lavandula"
                                                value={formData.scientificName}
                                                onChange={handleInputChange}
                                                required
                                                className="input-field py-3 md:py-3.5"
                                            />
                                        </div>

                                        <div>
                                            <label className="label">{t('family_group')}</label>
                                            <input
                                                type="text"
                                                name="familyName"
                                                placeholder="e.g. Lamiaceae"
                                                value={formData.familyName}
                                                onChange={handleInputChange}
                                                required
                                                className="input-field py-3 md:py-3.5"
                                            />
                                        </div>

                                        <div>
                                            <label className="label">{t('biologic_habit')}</label>
                                            <select
                                                name="habit"
                                                value={formData.habit}
                                                onChange={handleInputChange}
                                                className="input-field py-3 md:py-3.5"
                                            >
                                                {['Herb', 'Shrub', 'Tree', 'Aquatic', 'Grass', 'Climber'].map(h => (
                                                    <option key={h} value={h}>{t(`habit_${h}`)}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">{t('primary_documentation_area')}</label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="e.g. Mediterranean Region"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            required
                                            className="input-field py-3 md:py-3.5"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">{t('map_link_label')}</label>
                                        <input
                                            type="text"
                                            name="mapLink"
                                            placeholder="https://goo.gl/maps/..."
                                            value={formData.mapLink}
                                            onChange={handleInputChange}
                                            className="input-field py-3 md:py-3.5"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">{t('detailed_botanical_description')}</label>
                                        <textarea
                                            name="description"
                                            rows="4"
                                            placeholder="Physical characteristics and morphology..."
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="input-field py-4 resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">{t('medicinal_benefits')}</label>
                                        <textarea
                                            name="uses"
                                            rows="4"
                                            placeholder="Anti-inflammatory\nAnalgesic..."
                                            value={formData.uses}
                                            onChange={handleInputChange}
                                            className="input-field py-4 resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">{t('botanical_illustration')}</label>
                                        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 md:p-6 bg-[#F5F8F5] rounded-3xl border border-[#EDF1ED]">
                                            <div className="w-20 md:w-24 h-20 md:h-24 rounded-2xl overflow-hidden bg-white shadow-sm border border-[#EDF1ED] flex-shrink-0">
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-3xl">📸</div>
                                                )}
                                            </div>
                                            <div className="flex-grow w-full sm:w-auto">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    id="image-upload"
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="image-upload"
                                                    className="cursor-pointer inline-block w-full sm:w-auto text-center py-3 px-6 bg-white border border-[#EDF1ED] rounded-xl text-sm font-bold text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all shadow-sm"
                                                >
                                                    {t('select_file')}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 md:pt-8 flex flex-col sm:flex-row gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="order-2 sm:order-1 flex-1 py-4 px-6 border border-[#EDF1ED] rounded-2xl font-bold text-[#525C52] hover:bg-[#F5F8F5] transition-all"
                                        >
                                            {t('discard_changes')}
                                        </button>
                                        <button
                                            type="submit"
                                            className="order-1 sm:order-2 flex-[2] py-4 px-6 bg-[#1B4332] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-[#1B4332]/20"
                                        >
                                            {editingPlant ? t('update_archive') : t('enroll_species')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#0A1A0F]/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 md:p-8 text-center">
                                <div className="w-16 md:w-20 h-16 md:h-20 bg-red-50 rounded-2xl md:rounded-3xl flex items-center justify-center text-3xl md:text-4xl mx-auto mb-6">
                                    🗑️
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#1B4332] font-serif mb-2">
                                    {t('end_documentation')}
                                </h3>
                                <p className="text-[#525C52] text-[13px] md:text-sm leading-relaxed mb-8">
                                    {t('remove_warning', { name: plantToDelete?.localName })}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="order-2 sm:order-1 flex-1 py-3 md:py-4 px-6 border border-[#EDF1ED] rounded-xl md:rounded-2xl font-bold text-[#525C52] hover:bg-[#F5F8F5] transition-all"
                                    >
                                        {t('keep_records')}
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="order-1 sm:order-2 flex-1 py-3 md:py-4 px-6 bg-red-500 text-white rounded-xl md:rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                                    >
                                        {t('confirm_delete')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
