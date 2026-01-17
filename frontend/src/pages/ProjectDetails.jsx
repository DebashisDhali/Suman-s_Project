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
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
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
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white shadow-2xl rounded-2xl overflow-hidden"
                >
                    {/* Cover Page Header */}
                    <section className="p-8 md:p-16 border-b border-slate-100 text-center">
                        <motion.div variants={itemVariants} className="mb-8">
                            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">Academic Project</span>
                            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                                AN INVESTIGATION ON LISTING, UTILIZATION AND ANALYSIS OF PLANTS AVAILABLE IN CHARPATHALIYA AND EASTERN SITE OF GOPALGANJ SCIENCE AND TECHNOLOGY UNIVERSITY, GOPALGANJ
                            </h1>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4 text-slate-600">
                            <p className="text-xl font-medium">A Project Submitted to the</p>
                            <p className="text-2xl font-bold text-slate-800">Gopalganj Science and Technology University</p>
                            <p className="max-w-2xl mx-auto italic">
                                In Partial Fulfilment of the Requirements For the Degree of B.Sc. Honours In Botany
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                                {students.map((student, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                                        <p className="font-bold text-slate-900">{student.name}</p>
                                        <p className="text-sm text-slate-500">ID: {student.id}</p>
                                        <p className="text-sm text-slate-500">Session: {student.session}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <p className="text-xl font-bold text-slate-800 uppercase tracking-wide">Department of Botany</p>
                            <p className="text-slate-600">Gopalganj Science and Technology University</p>
                            <p className="text-slate-500">Gopalganj-8105</p>
                            <p className="mt-4 font-semibold text-emerald-700">February 2026</p>
                        </motion.div>
                    </section>

                    {/* Declaration */}
                    <section className="p-8 md:p-16 border-b border-slate-100 bg-emerald-50/30">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className="w-8 h-1 bg-emerald-500 mr-3 hidden md:block"></span>
                                DECLARATION
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-justify">
                                We, the undersigned students of the Department of Botany, Gopalganj Science and Technology University, hereby certify that the submitted project work entitled <span className="font-semibold italic">“AN INVESTIGATION ON LISTING, UTILIZATION AND ANALYSIS OF PLANTS AVAILABLE IN CHARPATHALIYA AND EASTERN SITE OF GOPALGANJ SCIENCE AND TECHNOLOGY UNIVERSITY, GOPALGANJ”</span> submitted towards the partial fulfillment of the degree of Bachelor of Science (Honors) in Botany, has been prepared by us under the prescribed guidelines. This project work has not been submitted, either in whole or in part, to any other university or institution for the award of any degree. Except where stated otherwise by reference or acknowledgement, the work presented in this project is entirely our own.
                            </p>
                            <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
                                <div className="text-slate-800">
                                    <div className="border-t-2 border-dotted border-slate-400 pt-4 w-72">
                                        <p className="font-bold mb-2">Signature of the Students</p>
                                        <div className="text-xs text-slate-500 space-y-1">
                                            <p>Department of Botany</p>
                                            <p>Student Id: 20BOT009</p>
                                            <p>Student Id: 20BOT015</p>
                                            <p>Student Id: 20BOT018</p>
                                            <p>Student Id: 20BOT023</p>
                                            <p>Student Id: 20BOT027</p>
                                            <p>Student Id: 20BOT035</p>
                                            <p>Session: 2020-2021</p>
                                            <p>Gopalganj Science and Technology University</p>
                                            <p>Gopalganj- 8105</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-slate-800">
                                    <div className="border-t-2 border-dotted border-slate-400 pt-4 w-64">
                                        <p className="font-bold">Date</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Certificate of Supervisor */}
                    <section className="p-8 md:p-16 border-b border-slate-100">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className="w-8 h-1 bg-emerald-500 mr-3 hidden md:block"></span>
                                CERTIFICATE OF SUPERVISOR
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-justify">
                                This is to certify that the submitted project work entitled <span className="font-semibold italic">“AN INVESTIGATION ON LISTING, UTILIZATION AND ANALYSIS OF PLANTS AVAILABLE IN CHARPATHALIYA AND EASTERN SITE OF GOPALGANJ SCIENCE AND TECHNOLOGY UNIVERSITY, GOPALGANJ”</span> has been carried out by the members of the project group of the Department of Botany, Gopalganj Science and Technology University, during the Session: 2020–2021, under my supervision. This project work is the original collective effort of the group members and has been prepared in accordance with the guidelines prescribed by the Department of Botany, GSTU, Gopalganj-8105.
                            </p>
                            <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
                                <div className="text-slate-800">
                                    <div className="border-t-2 border-dotted border-slate-400 pt-4 w-72">
                                        <p className="font-bold">Dr. Nahmina Begum</p>
                                        <p className="text-emerald-700 font-medium">Chairman</p>
                                        <p className="text-sm text-slate-600">Department of Botany</p>
                                        <p className="text-sm text-slate-600">Gopalganj Science and Technology University</p>
                                    </div>
                                </div>
                                <div className="text-slate-800">
                                    <div className="border-t-2 border-dotted border-slate-400 pt-4 w-64">
                                        <p className="font-bold">Date</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Approval */}
                    <section className="p-8 md:p-16 bg-slate-50/50">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className="w-8 h-1 bg-emerald-500 mr-3 hidden md:block"></span>
                                APPROVAL
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-justify">
                                The project work entitled <span className="font-semibold italic">“AN INVESTIGATION ON LISTING, UTILIZATION AND ANALYSIS OF PLANTS AVAILABLE IN CHARPATHALIYA AND THE EASTERN SITE OF GOPALGANJ SCIENCE AND TECHNOLOGY UNIVERSITY, GOPALGANJ”</span>, carried out by the members of the project group of the Department of Botany, Gopalganj Science and Technology University, Session: 2020–2021, submitted in partial fulfillment of the requirements for the degree of Bachelor of Science (Honors) in Botany, has been examined and found satisfactory in respect of its style, format, and content.
                            </p>
                            <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
                                <div className="text-slate-800">
                                    <div className="border-t-2 border-dotted border-slate-400 pt-4 w-72">
                                        <p className="font-bold text-lg">Dr. Nahmina Begum</p>
                                        <p className="text-emerald-700 font-medium">Chairman, Examination Committee</p>
                                        <p className="text-sm text-slate-600">4th year, 1st semester</p>
                                        <p className="text-sm text-slate-600">Department of Botany</p>
                                    </div>
                                </div>
                                <div className="text-slate-800">
                                    <div className="border-t-2 border-dotted border-slate-400 pt-4 w-64">
                                        <p className="font-bold">Date</p>
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
