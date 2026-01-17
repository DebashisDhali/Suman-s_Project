import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectDetails = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const students = [
        { name: "Nandini Barai", id: "20BOT009", session: "2020-2021" },
        { name: "Taskia Khandokar", id: "20BOT015", session: "2020-2021" },
        { name: "Suman Chowdhury", id: "20BOT018", session: "2020-2021" },
        { name: "Md. Nurul Huda Badhon", id: "20BOT023", session: "2020-2021" },
        { name: "Momtaz Alam Bithi", id: "20BOT027", session: "2020-2021" },
        { name: "Raihana Rashed", id: "20BOT035", session: "2020-2021" },
    ];

    return (
        <div className="min-h-screen bg-[#F0F2F0] pattern-grid-lg grayscale-[0.5]">
            <Navbar />

            {/* Background decoration */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1B4332] rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[4px] overflow-hidden border border-[#e5e5e5] relative"
                >
                    {/* Paper texture overlay */}
                    <div className="absolute inset-0 bg-[#fffdf5] opacity-40 pointer-events-none mix-blend-multiply" />

                    {/* Decorative binding line */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#1B4332] opacity-80" />

                    {/* Cover Page Header */}
                    <section className="relative p-10 md:p-20 border-b border-slate-100 text-center">

                        {/* University Logo Placeholder - Optional */}
                        <motion.div variants={itemVariants} className="flex justify-center mb-8">
                            <div className="w-24 h-24 bg-[#1B4332]/5 rounded-full flex items-center justify-center border border-[#1B4332]/10">
                                <span className="text-4xl">🎓</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-12">
                            <div className="inline-block px-4 py-1.5 border border-[#1B4332]/20 rounded-full bg-[#1B4332]/5 mb-6">
                                <span className="text-[#1B4332] font-bold tracking-[0.2em] uppercase text-xs">Academic Dissertation</span>
                            </div>
                            <h1 className="text-2xl md:text-4xl lg:text-[2.75rem] font-serif font-bold text-[#1B4332] leading-[1.3] tracking-tight max-w-4xl mx-auto">
                                AN INVESTIGATION ON LISTING, UTILIZATION AND ANALYSIS OF PLANTS AVAILABLE IN CHARPATHALIYA AND EASTERN SITE OF GOPALGANJ SCIENCE AND TECHNOLOGY UNIVERSITY, GOPALGANJ
                            </h1>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-3 text-[#404940] mb-16">
                            <p className="text-lg md:text-xl font-light italic">A Project Submitted to the</p>
                            <div className="py-2">
                                <p className="text-2xl md:text-3xl font-bold text-[#1B4332] font-serif">Gopalganj Science and Technology University</p>
                            </div>
                            <p className="max-w-xl mx-auto text-sm md:text-base opacity-80 leading-relaxed font-serif">
                                In partial fulfillment of the requirements for the degree of<br />
                                <span className="font-bold border-b border-[#1B4332]/20 pb-0.5">Bachelor of Science (Honors) in Botany</span>
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex justify-center mb-16">
                            <div className="w-16 h-1 bg-[#1B4332]/10 rounded-full" />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-8">
                            <h3 className="text-xs font-bold text-[#8BA18B] uppercase tracking-[0.3em] mb-8">Submitted By</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                                {students.map((student, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5, borderColor: 'rgba(27, 67, 50, 0.2)' }}
                                        className="p-6 rounded-xl bg-[#F9FBF9] border border-[#1B4332]/5 hover:shadow-lg hover:shadow-[#1B4332]/5 transition-all duration-300 group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white text-[#1B4332] flex items-center justify-center font-serif font-bold text-sm shadow-sm border border-[#1B4332]/10">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#1B4332] group-hover:text-primary-600 transition-colors mb-1">{student.name}</p>
                                                <div className="space-y-0.5">
                                                    <p className="text-xs text-[#525C52] font-medium bg-white inline-block px-1.5 py-0.5 rounded border border-[#e5e5e5]">ID: {student.id}</p>
                                                    <p className="text-[10px] text-[#8BA18B] uppercase tracking-wider font-bold mt-1">Session: {student.session}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-20 flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#1B4332] text-white rounded-full flex items-center justify-center mb-5 shadow-xl shadow-[#1B4332]/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <p className="text-lg font-bold text-[#1B4332] uppercase tracking-widest font-serif">Department of Botany</p>
                            <p className="text-[#525C52] text-sm mt-1">Gopalganj Science and Technology University</p>
                            <p className="text-[#8BA18B] text-xs font-mono mt-1">EST. 2001 • Gopalganj-8105</p>
                            <div className="mt-6 px-6 py-2 border-t border-b border-[#1B4332]/10">
                                <p className="font-serif font-bold text-[#1B4332]">February 2026</p>
                            </div>
                        </motion.div>
                    </section>

                    {/* Declaration */}
                    <section className="relative p-10 md:p-20 border-b border-slate-100 bg-[#F5F8F5]/50">
                        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px flex-1 bg-[#1B4332]/20"></div>
                                <h2 className="text-2xl font-bold text-[#1B4332] font-serif tracking-widest uppercase">Declaration</h2>
                                <div className="h-px flex-1 bg-[#1B4332]/20"></div>
                            </div>

                            <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#1B4332]/5 relative">
                                <span className="absolute top-4 left-4 text-6xl text-[#1B4332]/5 font-serif">“</span>
                                <p className="text-[#404940] leading-[1.8] text-justify font-light text-sm md:text-base relative z-10">
                                    We, the undersigned students of the Department of Botany, Gopalganj Science and Technology University, hereby certify that the submitted project work entitled <span className="font-semibold text-[#1B4332] italic">“AN INVESTIGATION ON LISTING, UTILIZATION AND ANALYSIS OF PLANTS AVAILABLE IN CHARPATHALIYA AND EASTERN SITE OF GOPALGANJ SCIENCE AND TECHNOLOGY UNIVERSITY, GOPALGANJ”</span> submitted towards the partial fulfillment of the degree of Bachelor of Science (Honors) in Botany, has been prepared by us under the prescribed guidelines. This project work has not been submitted, either in whole or in part, to any other university or institution for the award of any degree. Except where stated otherwise by reference or acknowledgement, the work presented in this project is entirely our own.
                                </p>
                                <span className="absolute bottom-4 right-4 text-6xl text-[#1B4332]/5 font-serif rotate-180">“</span>
                            </div>

                            <div className="mt-16 flex flex-col md:flex-row justify-between items-end gap-12">
                                <div className="w-full md:w-auto">
                                    <div className="border-t border-[#1B4332] pt-4 w-full md:w-72">
                                        <p className="font-bold text-[#1B4332] mb-3 font-serif">Signature of the Students</p>
                                        <div className="pl-4 border-l-2 border-[#1B4332]/10">
                                            <p className="text-xs text-[#525C52] font-bold uppercase tracking-wider mb-2">Department of Botany</p>
                                            <div className="space-y-1 text-[11px] text-[#8BA18B] font-mono">
                                                {students.map(s => <p key={s.id}>{s.id}</p>)}
                                                <p className="mt-2 pt-1 border-t border-dashed border-[#1B4332]/10">Session: 2020-2021</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-auto">
                                    <div className="border-t border-[#1B4332] pt-4 w-full md:w-48 text-right md:text-left">
                                        <p className="font-bold text-[#1B4332] font-serif">Date</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Certificate of Supervisor */}
                    <section className="relative p-10 md:p-20 border-b border-slate-100">
                        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px flex-1 bg-[#1B4332]/20"></div>
                                <h2 className="text-2xl font-bold text-[#1B4332] font-serif tracking-widest uppercase">Certificate of Supervisor</h2>
                                <div className="h-px flex-1 bg-[#1B4332]/20"></div>
                            </div>

                            <div className="bg-[#F0F4F0]/30 p-8 md:p-10 rounded-xl border border-[#1B4332]/5">
                                <p className="text-[#404940] leading-[1.8] text-justify font-light text-sm md:text-base">
                                    This is to certify that the submitted project work entitled <span className="font-semibold text-[#1B4332] italic">“AN INVESTIGATION ON LISTING, UTILIZATION AND ANALYSIS OF PLANTS AVAILABLE IN CHARPATHALIYA AND EASTERN SITE OF GOPALGANJ SCIENCE AND TECHNOLOGY UNIVERSITY, GOPALGANJ”</span> has been carried out by the members of the project group of the Department of Botany, Gopalganj Science and Technology University, during the Session: 2020–2021, under my supervision. This project work is the original collective effort of the group members and has been prepared in accordance with the guidelines prescribed by the Department of Botany, GSTU, Gopalganj-8105.
                                </p>
                            </div>

                            <div className="mt-16 flex flex-col md:flex-row justify-between items-end gap-12">
                                <div className="w-full md:w-auto">
                                    <div className="border-t border-[#1B4332] pt-4 w-full md:w-80">
                                        <p className="font-bold text-lg text-[#1B4332] font-serif">Dr. Nahmina Begum</p>
                                        <p className="text-[#2D6A4F] font-bold text-xs uppercase tracking-wider mb-1">Chairman</p>
                                        <p className="text-sm text-[#525C52]">Department of Botany</p>
                                        <p className="text-sm text-[#525C52]">Gopalganj Science and Technology University</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-auto">
                                    <div className="border-t border-[#1B4332] pt-4 w-full md:w-48 text-right md:text-left">
                                        <p className="font-bold text-[#1B4332] font-serif">Date</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Approval */}
                    <section className="relative p-10 md:p-20 bg-[#1B4332] text-white overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>

                        <motion.div variants={itemVariants} className="max-w-3xl mx-auto relative z-10">
                            <div className="flex items-center gap-4 mb-10 justify-center">
                                <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                                <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-widest uppercase">Approval</h2>
                                <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                            </div>

                            <p className="text-white/90 leading-[1.8] text-justify font-light text-sm md:text-lg mb-12">
                                The project work entitled <span className="font-semibold italic text-white">“AN INVESTIGATION ON LISTING, UTILIZATION AND ANALYSIS OF PLANTS AVAILABLE IN CHARPATHALIYA AND THE EASTERN SITE OF GOPALGANJ SCIENCE AND TECHNOLOGY UNIVERSITY, GOPALGANJ”</span>, carried out by the members of the project group of the Department of Botany, Gopalganj Science and Technology University, Session: 2020–2021, submitted in partial fulfillment of the requirements for the degree of Bachelor of Science (Honors) in Botany, has been examined and found satisfactory in respect of its style, format, and content.
                            </p>

                            <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-8 border-t border-white/20">
                                <div className="w-full md:w-auto">
                                    <p className="font-bold text-xl font-serif mb-1">Dr. Nahmina Begum</p>
                                    <p className="text-white/70 font-bold text-xs uppercase tracking-wider mb-2">Chairman, Examination Committee</p>
                                    <div className="text-sm text-white/60 space-y-0.5">
                                        <p>4th year, 1st semester</p>
                                        <p>Department of Botany</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-auto">
                                    <div className="border-t border-white/40 pt-4 w-full md:w-48 text-right md:text-left">
                                        <p className="font-bold font-serif">Date</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetails;
