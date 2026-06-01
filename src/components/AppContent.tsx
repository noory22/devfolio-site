import React, { useState } from "react";
import Globe from "react-globe.gl";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Brain, Code2, Zap, Server, ShieldCheck, ExternalLink, Smartphone, Cloud, Trophy, ClipboardList, ShieldCheckIcon } from "lucide-react";
import { div } from "three/src/nodes/math/OperatorNode";

const Container = ({ children, className = "", isActive, ...props }: { children: React.ReactNode, className?: string, isActive?: boolean, [key: string]: any }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className={`slide-container ${className}`} {...props}>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
                style={{ scaleX }}
            />
            {children}
        </div>
    );
};

const Heading = ({ children, gradient = false, className = "" }: { children: React.ReactNode, gradient?: boolean, className?: string }) => (
    <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`slide-heading ${gradient ? 'text-gradient' : ''} ${className}`}
    >
        {children}
    </motion.h2>
);

const Heading2 = ({ children, gradient = false, className = "" }: { children: React.ReactNode, gradient?: boolean, className?: string }) => (
    <motion.h3
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] uppercase mb-8 ${
            gradient ? 'text-gradient' : 'text-white/90'
        } ${className}`}
    >
        {children}
    </motion.h3>
);

const SubHeading = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className={`flex items-center gap-4 mb-6 ${className}`}
    >
        <div className="slide-subheading-line" />
        <span className="text-brand-cyan font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">{children}</span>
    </motion.div>
);

// 1. About Us
export const AboutUs = ({ ...props }) => (
    <Container {...props}>
        <SubHeading>About Us</SubHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <Heading>Empowering success amidst a digital revolution</Heading>
                <p className="text-xl text-white/60 font-light leading-relaxed">
                    Software division is at the forefront of this mission, offering a comprehensive suite of services designed to address the evolving needs of healthcare organizations worldwide. We empower our clients to stay ahead in an increasingly digital landscape.
                </p>
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="glass-dark p-8 rounded-4xl border border-white/10"
            >
                <div className="aspect-square bg-brand-blue/10 rounded-xl flex items-center justify-center border border-brand-blue/20 overflow-hidden">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                        className="w-2/3 h-2/3 border-2 border-dashed border-brand-blue/30 rounded-full flex items-center justify-center"
                    >
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="w-1/2 h-1/2 bg-brand-cyan/20 rounded-full"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    </Container>
);

// 2. AREAS OF EXPERTISE
export const Expertise = () => (
    <Container>
        <SubHeading>2. AREAS OF EXPERTISE</SubHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { title: "Data-Driven Solutions", desc: "Leverage data science, AI, and ML for actionable insights and improved patient outcomes." },
                { title: "Interface Engineering", desc: "Create high-performance mobile, desktop, and web applications with user-centric design." },
                { title: "AI Integration", desc: "Seamlessly embed artificial intelligence into existing systems to enhance automation, decision-making, and operational efficiency." },
                { title: "Software Quality Assurance", desc: "Ensure software reliability and performance through comprehensive SQA and SDLC management." }
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative group p-px rounded-3xl overflow-hidden bg-white/5 shadow-[0_0_20px_rgba(0,112,243,0.1)]"
                >
                    {/* Rotating Border - Always Visible */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_20%,#0070f3_40%,#00dfd8_60%,transparent_80%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="relative h-full w-full bg-[#080808] rounded-[calc(1.5rem-1px)] p-8 flex flex-col z-10 transition-colors group-hover:bg-black/80">
                        <div className="w-12 h-12 bg-white/5 rounded-xl mb-6 flex items-center justify-center group-hover:bg-brand-blue/20 transition-all border border-white/10 group-hover:border-brand-blue/30">
                            <span className="text-brand-cyan font-bold leading-none">{i + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 group-hover:text-brand-cyan transition-colors">{item.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{item.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </Container>
);

// New Intro Sections from PDF

// 3. Software Team
export const SoftwareTeam = () => {
    const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

    return (
        <Container>
            {/* <SubHeading>Software Team</SubHeading> */}
            <Heading gradient>RMT Software Center</Heading>
            <div className="text-left text-white/90 ">
                <Heading2>The Software Core</Heading2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                    { image: "WAK.jpg", name: "Wajahat Ali Khan", role: "Head Of Software Department" },
                    { image: "Istafa.png", name: "Istafa Malik", role: "Software Development Manager" },
                    { image: "M.Umer.png", name: "M. Umer", role: "Software Compliance Manager" },
                    { image: "M.Amir.jpg", name: "M. Amir Jamshaid", role: "AI Software Manager" }
                ].map((member, i) => (
                    <motion.div
                        key={i}
                        onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-dark p-6 rounded-3xl border border-white/10 text-center group hover:border-brand-cyan/30 transition-all duration-500 cursor-pointer"
                    >
                        <div className="w-32 h-32 md:w-44 md:h-44 mx-auto mb-4 rounded-full bg-brand-cyan/10 border-2 border-brand-cyan/20 overflow-hidden flex items-center justify-center group-hover:scale-105 group-hover:border-brand-cyan/50 transition-all duration-500 shadow-[0_0_15px_rgba(0,223,216,0.1)]">
                            <img
                                src={`/assets/${member.image}`}
                                alt={member.name}
                                className="w-full h-full object-cover transition-all duration-700 grayscale-0 opacity-100"
                            />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">{member.name}</h3>
                        <p className="text-xs md:text-sm text-white/50">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </Container>
    );
};

// CEO Intro Slide
export const CEOIntro = () => {
    const [isActive, setIsActive] = React.useState(false);

    return (
        <Container>
            {/* <SubHeading>LEADERSHIP</SubHeading> */}
            <Heading gradient>Chief Executive Officer</Heading>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="md:col-span-5 lg:col-span-4 relative group max-w-65 md:max-w-75 mx-auto w-full">
                    <div
                        className="relative rounded-2xl overflow-hidden bg-dark-surface cursor-pointer shadow-[0_0_20px_rgba(0,223,216,0.05)] group-hover:shadow-[0_0_30px_rgba(0,223,216,0.15)] transition-all duration-500 border border-white/10 flex flex-col"
                        onClick={() => setIsActive(!isActive)}
                    >
                        <div className="relative aspect-3/4 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent z-10" />
                            <img
                                src="/assets/dr.murtaza.jpg"
                                alt="Prof Dr Murtaza Najabat Ali"
                                className="w-full h-full object-cover transition-all duration-700 grayscale-0 opacity-100"
                            />
                        </div>
                        {/* Solid black credentials footer strip */}
                        <div className="bg-transparent py-4 px-3 border-t border-white/15 text-center flex flex-col gap-1.5 z-20">
                            <div className="text-white font-bold text-xs sm:text-sm tracking-wide leading-tight">
                                Founding CEO
                            </div>
                            <div className="text-white font-bold text-xs sm:text-sm tracking-wide leading-tight">
                                REVIVE MEDICAL TECHNOLOGIES Inc.
                            </div>
                            <div className="text-white/80 text-[10px] sm:text-xs tracking-wide leading-normal font-sans">
                                Professor at UNIVERSITY of JORDAN & RIPHAH
                            </div>
                            <div className="text-white/80 text-[10px] sm:text-xs tracking-wide leading-normal font-sans">
                                Distinguished Expert at COMSTECH
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-7 lg:col-span-8 px-4 lg:px-0">
                    <div className="space-y-6 md:space-y-8">
                        {[ 
                            { 
                                prefix: "20+", 
                                prefixColor: "text-white/90 font-bold", 
                                dotColor: "bg-white/90 group-hover:bg-white/90 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]",
                                text: " Years of Experience in Medical Device Design, Development, Production, Licensing and Technology Transfer" 
                            },
                            { 
                                text: "Founding HoD and Professor of Biomedical Engineering Dept. at NUST University Pakistan" 
                            },
                            { 
                                text: "Recipient of Mandate from PM Office of Pakistan to setup Country’s first Medical Device Industry" 
                            },
                            { 
                                text: "Founding CEO of Pakistan 1st State-owned Medical Device Industry ",
                                suffix: "(N-ovative Health Technologies)",
                                suffixColor: "text-white/90 italic font-semibold"
                            },
                            { 
                                text: "Founding Director of Medical Devices Development Center ",
                                suffix: "(A Center of Excellence)",
                                suffixColor: "italic text-white/90",
                                text2: " Pakistan"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="flex gap-4 md:gap-6 group"
                            >
                                <div className={`h-2 w-2 mt-2.5 rounded-full transition-all duration-500 shrink-0 ${
                                    item.dotColor || "bg-white/20 group-hover:bg-brand-cyan/80 group-hover:shadow-[0_0_10px_rgba(0,223,216,0.5)]"
                                } group-hover:scale-150`} />
                                <p className="text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed group-hover:text-white transition-colors">
                                    {item.prefix && <span className={item.prefixColor}>{item.prefix}</span>}
                                    {item.text}
                                    {item.suffix && <span className={item.suffixColor}>{item.suffix}</span>}
                                    {item.text2}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

// 4. RMT Background
export const RMTBackground = () => (
    <Container>
        {/* <SubHeading>BACKGROUND OF RMT</SubHeading> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
                <Heading gradient>Our Legacy</Heading>
                <div className="space-y-6 md:space-y-8 mt-6 md:mt-8">
                    {[
                        { color: "brand-cyan", text: "Rich history of setting up Pakistan's 1st State-owned Medical Device Industry." },
                        { color: "brand-blue", text: "Pioneer in the R&D, Production and Licensing of Medical Devices and Healthcare Technologies in Pakistan." },
                        { color: "white/20", text: "Involved for the last 02 decades in R&D of Medical Devices / Healthcare Technologies." },
                        { color: "brand-cyan", text: "Involved in Production of Medical Devices / Healthcare Technologies." },
                        { color: "brand-blue", text: "Involved in Regulatory Approvals of Medical Devices / Healthcare Technologies." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 md:gap-6">
                            <div className={`h-10 md:h-12 w-1 bg-${item.color} rounded-full shrink-0`} />
                            <p className="text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative group lg:h-full flex items-center">
                <div className="glass-dark rounded-4xl md:rounded-[3rem] border border-white/10 overflow-hidden w-full aspect-square md:aspect-video lg:aspect-auto lg:h-[80%] flex items-center justify-center relative">
                    <img src="/assets/leagacy.png" alt="RMT Legacy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute inset-4 border border-brand-cyan/20 rounded-3xl md:rounded-[2.5rem] pointer-events-none"
                    />
                </div>
            </div>
        </div>
    </Container>
);

// 5. Our Company
export const OurCompany = () => (
    <Container className="text-center items-center">
        {/* <SubHeading>Our Company</SubHeading> */}
        <Heading gradient>A One-Stop Shop for Health-Tech</Heading>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 font-light max-w-3xl mb-8 sm:mb-10 lg:mb-16 leading-relaxed">
            Turning <span className="text-brand-cyan font-bold">HEALTH-TECH IDEAS</span> into <span className="text-brand-blue font-bold">MARKETABLE PRODUCTS</span> by centralizing and streamlining diverse activities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {[
                { title: "R & D Wing", desc: "Advanced labs for biomaterials, software, AI, and medical device design." },
                { title: "Production Wing", desc: "ISO Class 5, 7 and 8 cleanrooms for medical grade manufacturing." },
                { title: "Regulatory Wing", desc: "Expert approvals including FDA, CE, UKCA, and SFDA." }
            ].map((wing, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="glass-dark p-8 md:p-10 rounded-4xl md:rounded-[2.5rem] border border-white/10 relative overflow-hidden group text-left sm:text-center"
                >
                    <div className="absolute top-0 right-0 p-6 md:p-8 text-4xl md:text-6xl font-bold text-white/3 group-hover:text-brand-cyan/10 transition-colors">0{i + 1}</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-brand-cyan">{wing.title}</h3>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed">{wing.desc}</p>
                </motion.div>
            ))}
        </div>
        {/* <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-12 mt-8 sm:mt-10 md:mt-12">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer"
            >
                <img
                    src="/assets/iso-certified.png"
                    alt="ISO 13485 Certified"
                    className="h-16 sm:h-20 md:h-24 w-auto object-contain relative z-10 transition-opacity duration-300 hover:opacity-100 opacity-90 filter drop-shadow-[0_0_15px_rgba(0,223,216,0.15)] rounded-2xl"
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer"
            >
                <img
                    src="/assets/drap-approved.png"
                    alt="DRAP Approved"
                    className="h-16 sm:h-20 md:h-24 w-auto object-contain relative z-10 transition-opacity duration-300 hover:opacity-100 opacity-90 filter drop-shadow-[0_0_15px_rgba(16,185,129,0.15)] rounded-2xl"
                />
            </motion.div>
        </div> */}
    </Container>
);

// 6. Global Locations
// export const GlobalLocations = () => (
//     <Container>
//         <div className="text-center mb-8 md:mb-12">
//             <SubHeading>OUR LOCATIONS</SubHeading>
//             {/* <Heading gradient className="text-3xl md:text-5xl">Global Strategic Presence</Heading> */}
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
//             {/* Pakistan Facility */}
//             <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="relative group h-full"
//             >
//                 <div className="glass-dark rounded-3xl md:rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col h-full transition-all duration-500 hover:border-brand-cyan/30">
//                     <div className="relative aspect-video overflow-hidden shrink-0">
//                         <img src="/assets/pak-facility.png" alt="Pakistan Facility" className="w-full h-full object-cover object-top-left opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" />
//                         <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
//                         <div className="absolute bottom-4 left-6 text-left pointer-events-none">
//                             <div className="text-brand-cyan text-2xl md:text-4xl mb-1">🇵🇰</div>
//                             <h3 className="text-xl md:text-2xl font-bold text-white">Islamabad</h3>
//                             <p className="text-brand-cyan/80 font-mono text-[10px] tracking-widest uppercase">R&D and Production Hub</p>
//                         </div>
//                     </div>
//                     <div className="p-6 md:p-8 flex flex-col grow justify-between">
//                         <div>
//                             <Heading gradient className="text-xl md:text-2xl mb-4">Pakistan R&D Facility</Heading>
//                             <p className="text-sm md:text-base text-white/50 font-light leading-relaxed mb-6">
//                                 Our primary off-shore R&D and production hub, featuring advanced laboratories and certified cleanrooms for medical device innovation.
//                             </p>
//                             <div className="grid grid-cols-2 gap-3">
//                                 {["Biomaterials Lab", "Software & AI Suite", "ISO Cleanrooms", "Mechanical Workshop"].map((item, i) => (
//                                     <div key={i} className="flex items-center gap-2 text-white/70">
//                                         <div className="w-1 h-1 rounded-full bg-brand-cyan" />
//                                         <span className="font-medium text-xs md:text-sm">{item}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>

//             {/* US Headquarters */}
//             <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="relative group h-full"
//             >
//                 <div className="glass-dark rounded-3xl md:rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col h-full transition-all duration-500 hover:border-brand-blue/30">
//                     <div className="relative aspect-video overflow-hidden shrink-0">
//                         <img src="/assets/us-facility.png" alt="United States Facility" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" />
//                         <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
//                         <div className="absolute bottom-4 left-6 text-left pointer-events-none">
//                             <div className="text-brand-blue text-2xl md:text-4xl mb-1">🇺🇸</div>
//                             <h3 className="text-xl md:text-2xl font-bold text-white">Minnesota</h3>
//                             <p className="text-brand-blue/80 font-mono text-[10px] tracking-widest uppercase">Global Headquarters</p>
//                         </div>
//                     </div>
//                     <div className="p-6 md:p-8 flex flex-col grow justify-between">
//                         <div>
//                             <Heading gradient className="text-xl md:text-2xl mb-4">United States Headquarters</Heading>
//                             <p className="text-sm md:text-base text-white/50 font-light leading-relaxed mb-6">
//                                 Our Minnesota-based headquarters oversees global operations, ensuring regulatory excellence and managing strategic international partnerships.
//                             </p>
//                             <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//                                 <h4 className="text-brand-blue font-bold uppercase tracking-widest text-[10px] mb-2">Primary Office</h4>
//                                 <p className="text-white/70 text-xs md:text-sm leading-relaxed">
//                                     Saint Cloud Office, Edgewater Business Centre<br />
//                                     Sartell, Minnesota, USA
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     </Container>
// );

// Animated Map Global Locations
// Animated Map Global Locations
// export const AnimatedMap = () => {
//     const globeEl = React.useRef<any>(null);
//     const containerRef = React.useRef<HTMLDivElement>(null);
//     const [dimensions, setDimensions] = React.useState({ width: 800, height: 400 });
//     const [show2DMap, setShow2DMap] = React.useState(false);
//     const [renderGlobeHTML, setRenderGlobeHTML] = React.useState(false);

//     React.useEffect(() => {
//         if (!containerRef.current) return;
//         const updateDimensions = () => {
//             if (containerRef.current) {
//                 setDimensions({
//                     width: containerRef.current.clientWidth,
//                     height: containerRef.current.clientHeight
//                 });
//             }
//         };
//         updateDimensions();
//         const timer = setTimeout(updateDimensions, 100);
//         window.addEventListener('resize', updateDimensions);
//         return () => {
//             clearTimeout(timer);
//             window.removeEventListener('resize', updateDimensions);
//         };
//     }, [show2DMap]);

//     React.useEffect(() => {
//         if (!show2DMap) {
//             if (globeEl.current) {
//                 globeEl.current.controls().autoRotate = true;
//                 globeEl.current.controls().autoRotateSpeed = 0.8;
//                 globeEl.current.controls().enableZoom = false;
//                 globeEl.current.pointOfView({ lat: 38, lng: -10, altitude: 2 }, 0);
//             }
//             const htmlTimer = setTimeout(() => setRenderGlobeHTML(true), 200);
//             return () => clearTimeout(htmlTimer);
//         } else {
//             setRenderGlobeHTML(false);
//         }
//     }, [dimensions.width, show2DMap]);

//     const gData = [
//         { lat: 45.6083, lng: -94.2069, label: 'Head Office (USA)', color: '#0070f3' },
//         { lat: 33.6844, lng: 73.0479, label: 'Off-shore R&D and Production Facility (Isb)', color: '#00dfd8' }
//     ];

//     const arcsData = [
//         { startLat: 45.6083, startLng: -94.2069, endLat: 33.6844, endLng: 73.0479 },
//         { startLat: 33.6844, startLng: 73.0479, endLat: 45.6083, endLng: -94.2069 }
//     ];

//     return (
//         <Container className="text-center items-center">
//             {!show2DMap && <Heading gradient>Global Presence</Heading>}
//             {/* <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
//                 Bridging innovation across continents with our 3D scalable architecture.
//             </p> */}

//             <AnimatePresence mode="wait">
//                 {!show2DMap ? (
//                     <motion.div
//                         key="globe-view"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         ref={containerRef}
//                         className="relative w-full h-[32vh] sm:h-[38vh] md:h-[45vh] lg:h-[50vh] max-w-4xl mx-auto mt-4 sm:mt-6 mb-8 sm:mb-12 md:mb-16 rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden glass-dark border border-white/10 shadow-[0_0_50px_rgba(0,112,243,0.15)] bg-black group"
//                     >
//                         <div className="absolute inset-x-0 bottom-0 top-1/2 bg-brand-cyan/20 blur-[100px] z-0 pointer-events-none" />
//                         {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                             <div className="bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 px-6 py-2 rounded-full backdrop-blur-sm text-sm font-semibold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,223,216,0.2)]">
//                                 DRAG TO ROTATE • CLICK TO EXPAND
//                             </div>
//                         </div> */}
//                         <div className="absolute inset-0 z-10">
//                             <Globe
//                                 ref={globeEl}
//                                 width={dimensions.width}
//                                 height={dimensions.height}
//                                 globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
//                                 bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
//                                 backgroundColor="rgba(0,0,0,0)"
//                                 onGlobeClick={() => setShow2DMap(true)}
//                                 arcsData={arcsData}
//                                 arcColor={() => ['#0070f3', '#00dfd8']}
//                                 arcDashLength={0.4}
//                                 arcDashGap={0.2}
//                                 arcDashInitialGap={() => Math.random()}
//                                 arcDashAnimateTime={2000}
//                                 arcStroke={1.5}
//                                 htmlElementsData={renderGlobeHTML ? gData : []}
//                                 htmlElement={(d: any) => {
//                                     const el = document.createElement('div');
//                                     el.innerHTML = `
//                                         <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); pointer-events: none;">
//                                             <div style="color: ${d.color}; font-weight: bold; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; white-space: nowrap; background: rgba(0,0,0,0.85); padding: 6px 14px; border-radius: 8px; border: 1px solid ${d.color}60; margin-bottom: 8px; backdrop-filter: blur(8px); box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
//                                                 ${d.label}
//                                             </div>
//                                             <div style="width: 16px; height: 16px; border-radius: 50%; background-color: ${d.color}; box-shadow: 0 0 20px ${d.color}, inset 0 0 5px #fff; border: 2px solid white;"></div>
//                                         </div>
//                                     `;
//                                     return el;
//                                 }}
//                             />
//                         </div>
//                     </motion.div>
//                 ) : (
//                     /* ── 2D MAP VIEW ──────────────────────────────────────────────────────
//                        Break out of Container width constraints by using negative margins
//                        so the panel stretches edge-to-edge relative to the viewport.
//                     ──────────────────────────────────────────────────────────────────── */
//                     <motion.div
//                         key="2d-map-view"
//                         initial={{ opacity: 0, scale: 0.95, y: 30 }}
//                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.95, y: 30 }}
//                         transition={{ duration: 0.5, ease: "easeOut" }}
//                         className="mt-4 sm:mt-6 mb-8 sm:mb-12 md:mb-16 w-full px-0 sm:px-4 md:px-8"
//                     >
//                         {/* ── Map Panel ─────────────────────────────────────────────────────
//                             Full viewport-width panel, tall enough to comfortably show everything.
//                             overflow-hidden keeps the rounded corners clean.
//                         ──────────────────────────────────────────────────────────────────── */}
//                         <div
//                             className="relative w-full rounded-2xl sm:rounded-3xl md:rounded-[3rem] glass-dark border border-white/10 shadow-[0_0_60px_rgba(0,223,216,0.15)] bg-black overflow-hidden min-h-[45vh] sm:min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh]"
//                         >
//                             {/* Glow */}
//                             <div className="absolute inset-x-0 bottom-0 top-1/2 bg-brand-cyan/20 blur-[120px] z-0 pointer-events-none" />

//                             {/* World map SVG — large and centred */}
//                             <div className="relative inset-0 flex items-center justify-center pointer-events-none z-10">
//                                 <img
//                                     src="/world-map.svg"
//                                     alt="World Map"
//                                     className="w-[75%] h-auto object-contain opacity-[0.4] invert drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
//                                 />
//                             </div>

//                             {/* Animated SVG arcs */}
//                             <svg
//                                 className="absolute inset-0 w-full h-full pointer-events-none z-20"
//                                 viewBox="0 0 1000 1000"
//                                 preserveAspectRatio="none"
//                             >
//                                 <defs>
//                                     <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
//                                         <stop offset="0%" stopColor="#0070f3" stopOpacity={0.2} />
//                                         <stop offset="50%" stopColor="#00dfd8" />
//                                         <stop offset="100%" stopColor="#0070f3" stopOpacity={0.2} />
//                                     </linearGradient>
//                                 </defs>
                                
//                                 {/* Single arc connecting US (300,450) to Pakistan (630,450) */}
//                                 <g>
//                                     <motion.path
//                                         d="M 310 220 Q 465 10 635 280"
//                                         fill="none"
//                                         stroke="url(#gradient-line)"
//                                         strokeWidth="2.5"
//                                         strokeDasharray="5 7"
//                                         initial={{ pathLength: 0, opacity: 0 }}
//                                         whileInView={{ pathLength: 1, opacity: 0.7 }}
//                                         transition={{ duration: 2, ease: "easeInOut", delay: 0 }}
//                                     />
//                                     <motion.circle r="3" fill="#fff" filter="drop-shadow(0 0 5px #fff)">
//                                         <animateMotion 
//                                             path="M 310 220 Q 465 10 635 280" 
//                                             dur="3s" 
//                                             repeatCount="indefinite" 
//                                         />
//                                     </motion.circle>
//                                 </g>
//                             </svg>

//                             {/* Back button */}
//                             <button
//                                 onClick={(e) => { e.stopPropagation(); setShow2DMap(false); }}
//                                 className="absolute z-50 top-6 right-6 md:top-8 md:right-8 bg-black/60 border border-white/20 text-white/70 hover:text-brand-cyan hover:border-brand-cyan rounded-full px-6 py-2.5 backdrop-blur-md transition-all duration-300 font-bold uppercase tracking-widest text-xs md:text-sm hover:scale-105 shadow-lg"
//                             >
//                                 Back
//                             </button>

//                             {/* ── US Card — left edge of panel ──────────────────────────────── */}
//                            <motion.div
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.7 }}
//                                 whileHover={{ 
//                                     scale: 1.05,
//                                     transition: { duration: 0.2, ease: "easeInOut" }
//                                 }}
//                                 className="absolute left-[2%] top-[40%] -translate-y-1/2 z-30 w-64 glass-dark rounded-2xl border border-brand-blue/30 overflow-hidden shadow-[0_0_30px_rgba(0,112,243,0.25)] hidden md:block cursor-pointer"
//                             >
//                                 <div className="relative h-32 overflow-hidden">
//                                     <img src="/assets/us-facility.png" alt="US Facility" className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700" />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                                     <div className="absolute bottom-2 left-3">
//                                         <div className="flex items-center gap-1.5">
//                                             <span className="text-sm">🇺🇸</span>
//                                             <p className="text-white font-bold text-sm">Minnesota</p>
//                                         </div>
//                                         <p className="text-brand-blue/80 font-mono text-[9px] tracking-widest uppercase">Global Headquarters</p>
//                                     </div>
//                                 </div>
//                                 <div className="p-4 flex flex-col gap-2">
//                                     <p className="text-brand-cyan font-bold text-sm text-left leading-tight">Headquarters</p>
//                                     <p className="text-white/60 text-[11px] text-left leading-relaxed">Oversees global operations, regulatory excellence & strategic international partnerships.</p>
//                                     <div className="grid grid-cols-2 gap-1.5 mt-1">
//                                         {["Regulatory Hub", "Strategic Ops", "Global Partnerships", "US Compliance"].map((item, i) => (
//                                             <div key={i} className="flex items-center gap-1.5">
//                                                 <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
//                                                 <span className="text-white/50 text-[10px]">{item}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </motion.div>

//                             {/* US Pin */}
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ delay: 0.5, type: "spring" }}
//                                 className="absolute top-[22%] left-[31%] -translate-x-1/2 -translate-y-1/2 z-30 group hidden md:block"
//                             >
//                                 {/* Connector line to card */}
//                                 <div className="absolute top-1/2 right-full -translate-y-1/2 flex items-center">
//                                     <div className="w-[3vw] h-px bg-gradient-to-l from-brand-cyan to-transparent" />
//                                     <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_10px_#00dfd8] shrink-0" />
//                                 </div>
//                                 <div className="relative flex items-center justify-center">
//                                     <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-1.5 border border-brand-cyan rounded-full" />
//                                     <div className="w-5 h-5 bg-red-600 rounded-full relative z-10 shadow-[0_0_20px_rgba(239,68,68,0.8)] border-[3px] border-white flex items-center justify-center group-hover:scale-125 transition-transform">
//                                         <div className="w-1.5 h-1.5 bg-white rounded-full" />
//                                     </div>
//                                 </div>
//                             </motion.div>

//                             {/* ── Pakistan Pin ──────────────────────────────────────────────── */}
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ delay: 0.8, type: "spring" }}
//                                 className="absolute top-[28%] left-[63.5%] -translate-x-1/2 -translate-y-1/2 z-30 group hidden md:block"
//                             >
//                                 {/* Connector line to card */}
//                                 <div className="absolute top-1/2 left-full -translate-y-1/2 flex items-center">
//                                     <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_10px_#00dfd8] shrink-0" />
//                                     <div className="w-[3vw] h-px bg-gradient-to-r from-brand-cyan to-transparent" />
//                                 </div>
//                                 <div className="relative flex items-center justify-center">
//                                     <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="absolute -inset-1.5 border border-brand-cyan rounded-full" />
//                                     <div className="w-5 h-5 bg-red-600 rounded-full relative z-10 shadow-[0_0_20px_rgba(239,68,68,0.8)] border-[3px] border-white flex items-center justify-center group-hover:scale-125 transition-transform">
//                                         <div className="w-1.5 h-1.5 bg-white rounded-full" />
//                                     </div>
//                                 </div>
//                             </motion.div>

//                             {/* ── Pakistan Card — right edge of panel ───────────────────────── */}
//                             <motion.div
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 1 }}
//                                 whileHover={{ 
//                                     scale: 1.05,
//                                     transition: { duration: 0.2, ease: "easeInOut" }
//                                 }}
//                                 className="absolute right-[2%] top-[45%] -translate-y-1/2 z-30 w-64 glass-dark rounded-2xl border border-brand-cyan/30 overflow-hidden shadow-[0_0_30px_rgba(0,223,216,0.25)] hidden md:block cursor-pointer"
//                             >
//                                 <div className="relative h-32 overflow-hidden">
//                                     <img src="/assets/pak-facility.png" alt="Pakistan Facility" className="w-full h-full object-cover object-top opacity-85 hover:scale-105 transition-transform duration-700" />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                                     <div className="absolute bottom-2 left-3">
//                                         <div className="flex items-center gap-1.5">
//                                             <span className="text-sm">🇵🇰</span>
//                                             <p className="text-white font-bold text-sm">Islamabad</p>
//                                         </div>
//                                         <p className="text-brand-cyan/80 font-mono text-[9px] tracking-widest uppercase">R&D and Production Hub</p>
//                                     </div>
//                                 </div>
//                                 <div className="p-4 flex flex-col gap-2">
//                                     <p className="text-brand-cyan font-bold text-sm text-left leading-tight">R&D Facility</p>
//                                     <p className="text-white/60 text-[11px] text-left leading-relaxed">Primary off-shore R&D and production hub with advanced laboratories and certified cleanrooms.</p>
//                                     <div className="grid grid-cols-2 gap-1 mt-1">
//                                         {["Biomaterials Lab", "Software & AI Suite", "ISO Cleanrooms", "Mechanical Workshop"].map((item, i) => (
//                                             <div key={i} className="flex items-center gap-1">
//                                                 <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
//                                                 <span className="text-white/50 text-[10px] whitespace-nowrap">{item}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </motion.div>

//                         </div>

//                         {/* Mobile / tablet: location details below map */}
//                         <div className="md:hidden grid grid-cols-1 gap-4 mt-4 w-full">
//                             <div className="glass-dark rounded-2xl border border-brand-blue/30 overflow-hidden">
//                                 <div className="relative h-28 overflow-hidden">
//                                     <img src="/assets/us-facility.png" alt="US Facility" className="w-full h-full object-cover opacity-85" />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                                     <div className="absolute bottom-2 left-3">
//                                         <div className="flex items-center gap-1.5">
//                                             <span className="text-sm">🇺🇸</span>
//                                             <p className="text-white font-bold text-sm">Minnesota</p>
//                                         </div>
//                                         <p className="text-brand-blue/80 font-mono text-[9px] tracking-widest uppercase">Global Headquarters</p>
//                                     </div>
//                                 </div>
//                                 <div className="p-4">
//                                     <p className="text-brand-cyan font-bold text-sm mb-1">Headquarters</p>
//                                     <p className="text-white/60 text-xs leading-relaxed">Oversees global operations, regulatory excellence & strategic international partnerships.</p>
//                                 </div>
//                             </div>
//                             <div className="glass-dark rounded-2xl border border-brand-cyan/30 overflow-hidden">
//                                 <div className="relative h-28 overflow-hidden">
//                                     <img src="/assets/pak-facility.png" alt="Pakistan Facility" className="w-full h-full object-cover object-top opacity-85" />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                                     <div className="absolute bottom-2 left-3">
//                                         <div className="flex items-center gap-1.5">
//                                             <span className="text-sm">🇵🇰</span>
//                                             <p className="text-white font-bold text-sm">Islamabad</p>
//                                         </div>
//                                         <p className="text-brand-cyan/80 font-mono text-[9px] tracking-widest uppercase">R&D and Production Hub</p>
//                                     </div>
//                                 </div>
//                                 <div className="p-4">
//                                     <p className="text-brand-cyan font-bold text-sm mb-1">R&D Facility</p>
//                                     <p className="text-white/60 text-xs leading-relaxed">Primary off-shore R&D and production hub with advanced laboratories and certified cleanrooms.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </Container>
//     );
// };

// 7.5 One Stop Destination
export const OneStopDestination = () => (
    <Container className="items-center justify-center">
        {/* Two Facility Images Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full mb-8 md:mb-10">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-[0_0_30px_rgba(0,223,216,0.08)]"
            >
                <img
                    src="/assets/pak-facility.png"
                    alt="Pakistan R&D Facility"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                    <img src="/assets/rmt-logo.png" alt="RMT Logo" className="h-8 sm:h-10 md:h-12 w-auto object-contain brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-[0_0_30px_rgba(0,112,243,0.08)]"
            >
                <img
                    src="/assets/us-facility.png"
                    alt="US Headquarters"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                    <img src="/assets/rmt-logo.png" alt="RMT Logo" className="h-8 sm:h-10 md:h-12 w-auto object-contain brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                </div>
            </motion.div>
        </div>

        {/* Bottom Section: Text Left, Badges Right */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between w-full gap-6">
            {/* Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-left"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-2 md:mb-3">
                    REVIVE MEDICAL TECHNOLOGIES INC.
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-white/50 font-semibold tracking-[0.15em] uppercase">
                    End-to-End Service Provider; From Ideation to Commercialization
                </p>
            </motion.div>

            {/* Certification Badges */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-row items-center gap-4 md:gap-6 shrink-0"
            >
                <img
                    src="/assets/drap-approved.png"
                    alt="DRAP Approved"
                    className="h-24 sm:h-28 md:h-36 w-auto object-contain rounded-xl filter drop-shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                />
                <img
                    src="/assets/iso-certified.png"
                    alt="ISO 13485 Certified"
                    className="h-24 sm:h-28 md:h-36 w-auto object-contain rounded-xl filter drop-shadow-[0_0_12px_rgba(0,223,216,0.15)]"
                />
            </motion.div>
        </div>
    </Container>
);

// 8. Services Intro
export const ServicesIntro = () => (
    <Container className="text-center items-center">
        <SubHeading>SERVICES</SubHeading>
        <Heading gradient>Empowering our clients amidst a digital revolution</Heading>
        <p className="max-w-4xl text-lg md:text-xl text-white/50 font-light leading-relaxed">
            At Revive Medical Technologies (RMT), we operate in the novel areas of healthcare innovation, providing cutting-edge software solutions designed to meet the diverse needs of the industry. Our services encompass a wide range of advanced technologies and applications, each meticulously crafted to enhance efficiency, accuracy, and patient care.
        </p>
    </Container>
);

// 12. Products Intro
// export const ProductsIntro = () => (
//     <Container className="text-center items-center">
//         <SubHeading>PRODUCTS</SubHeading>
//         <Heading gradient>Innovative Software Solutions for Modern Healthcare</Heading>
//         <p className="max-w-4xl text-lg md:text-xl text-white/50 font-light leading-relaxed">
//             Our suite of specialized products empowers medical professionals, streamlines clinical workflows, and enhances patient engagement. From care management software to advanced remote diagnostics, our platforms are engineered to meet the highest regulatory standards while delivering exceptional performance and reliability.
//         </p>
//     </Container>
// );

// 12.5 RPM Demo Showcase
// export const RPMDemo = () => (
//     <Container className="text-center items-center justify-center py-6">
//         <div className="mb-4">
//             <SubHeading>RPM DEMO</SubHeading>
//             <Heading gradient>Remote Patient Monitoring</Heading>
//         </div>

//         <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 max-w-7xl mx-auto w-full px-4 group h-auto">
//             {/* Desktop Dashboard Link - Left (Wider) */}
//             <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="w-full lg:w-[60%] flex flex-col"
//             >
//                 <a
//                     href="https://rpm-demo-eta.vercel.app/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 hover:border-brand-blue/40 hover:shadow-brand-blue/20 group/link h-full"
//                 >
//                     <div className="absolute inset-0 bg-linear-to-tr from-brand-blue/10 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 z-10" />
//                     <img
//                         src="/assets/rpm-img.png"
//                         alt="RPM Demo Dashboard"
//                         loading="eager"
//                         className="w-full h-auto max-h-[35vh] lg:max-h-[42vh] object-cover lg:object-fill transform transition-transform duration-1000 group-hover/link:scale-[1.02]"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/link:opacity-100 transition-all duration-500 z-20 scale-90 group-hover/link:scale-100">
//                         <div className="px-5 py-2.5 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-2.5 shadow-2xl">
//                             <span className="text-white font-bold tracking-[0.2em] uppercase text-[9px]">Dashboard Demo</span>
//                             <ExternalLink size={14} className="text-brand-blue" />
//                         </div>
//                     </div>
//                 </a>
//             </motion.div>

//             {/* Mobile App Link - Right (Narrower but increased) */}
//             <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="w-full lg:w-[35%] flex flex-col"
//             >
//                 <a
//                     href="https://proactivecare-rpm.vercel.app/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block relative transition-all duration-700 group/app h-full"
//                 >
//                     <img
//                         src="/assets/mobile-app.png"
//                         alt="RPM Mobile App"
//                         loading="eager"
//                         className="w-full h-auto max-h-[40vh] lg:max-h-[55vh] object-contain transform transition-transform duration-1000 group-hover/app:scale-[1.02]"
//                     />
//                     <div className="absolute inset-[20%] inset-x-[25%] flex items-center justify-center opacity-0 group-hover/app:opacity-100 transition-all duration-500 z-20 scale-90 group-hover/app:scale-100">
//                         <div className="px-5 py-2.5 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-2.5 shadow-2xl">
//                             <span className="text-white font-bold tracking-[0.2em] uppercase text-[9px]">Mobile App</span>
//                             <ExternalLink size={14} className="text-brand-cyan" />
//                         </div>
//                     </div>
//                 </a>
//             </motion.div>

//             {/* Ambient Background Glow */}
//             <div className="absolute -inset-20 bg-brand-cyan/5 blur-[120px] rounded-full -z-10 pointer-events-none opacity-50" />
//         </div>
//     </Container>
// );

// export const ServicesCategories = ({ onSelect }: { onSelect: (index: number) => void }) => {
//     const categories = [
//         { title: "Artificial Intelligence", subtitle: "Advanced Analytics", icon: Brain, color: "cyan" as const },
//         { title: "App Development", subtitle: "Platform Solutions", icon: Code2, color: "blue" as const },
//         { title: "Automation", subtitle: "Operational Efficiency", icon: Zap, color: "cyan" as const },
//         { title: "Software Compliance", subtitle: "Regulatory Standards", icon: ShieldCheck, color: "blue" as const },
//         { title: "Infrastructure", subtitle: "Lifecycle Management", icon: Server, color: "cyan" as const }
//     ];

//     return (
//         <Container className="justify-center py-4">
//             <div className="text-center mb-6 md:mb-10">
//                 <SubHeading className="text-[10px] md:text-xs">OUR EXPERTISE</SubHeading>
//                 <Heading gradient className="text-3xl md:text-5xl">Medical Solutions</Heading>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 w-full max-w-7xl">
//                 {categories.map((cat, i) => (
//                     <motion.div
//                         key={i}
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: i * 0.1 }}
//                         whileHover={{ y: -10, scale: 1.02 }}
//                         onClick={() => onSelect(9 + i)}
//                         className="group relative cursor-pointer flex flex-col h-full"
//                     >
//                         {/* Continuous Border Animation */}
//                         <div className="absolute inset-0 rounded-4xl p-0.5 overflow-hidden">
//                             <motion.div
//                                 animate={{ rotate: 360 }}
//                                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                                 className={`absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_20%,#0070f3_40%,#00dfd8_60%,transparent_80%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
//                             />
//                         </div>

//                         <div className="relative h-full glass-dark border border-white/5 rounded-4xl p-8 md:p-10 flex flex-col items-center text-center group-hover:border-brand-cyan/40 group-hover:bg-black/90 transition-all duration-500 shadow-2xl overflow-hidden z-10">
//                             {/* Animated Icon Container */}
//                             <div className={`mb-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-brand-${cat.color}/10 text-brand-${cat.color} border border-brand-${cat.color}/20 group-hover:bg-brand-${cat.color} group-hover:text-black transition-all duration-500 shadow-lg group-hover:shadow-brand-${cat.color}/40 relative overflow-hidden shrink-0`}>
//                                 <cat.icon size={32} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
//                                 <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
//                             </div>

//                             <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-brand-cyan transition-colors duration-300">
//                                 {cat.title}
//                             </h3>
//                             <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] mb-8 group-hover:text-white/60 transition-colors">
//                                 {cat.subtitle}
//                             </p>

//                             <div className="mt-auto px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-brand-cyan group-hover:text-black transition-all duration-300">
//                                 Explore Detail
//                             </div>

//                             {/* Decorative corner element */}
//                             <div className="absolute top-0 right-0 p-6 text-6xl font-bold text-white/2 group-hover:text-brand-cyan/5 transition-colors pointer-events-none">0{i + 1}</div>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </Container>
//     );
// };
// export const ServicesCategories = ({ onSelect }: { onSelect: (index: number) => void }) => {
//     const categories = [
//         {
//             title: "Artificial Intelligence",
//             subtitle: "Advanced Analytics",
//             icon: Brain,
//             gradient: "from-cyan-600 to-teal-500",
//             color: "#00dfd8",
//         },
//         {
//             title: "App Development",
//             subtitle: "Platform Solutions",
//             icon: Code2,
//             gradient: "from-blue-600 to-cyan-500",
//             color: "#0070f3",
//         },
//         {
//             title: "Automation",
//             subtitle: "Operational Efficiency",
//             icon: Zap,
//             gradient: "from-cyan-500 to-blue-600",
//             color: "#00dfd8",
//         },
//         {
//             title: "Software Compliance",
//             subtitle: "Regulatory Standards",
//             icon: ShieldCheck,
//             gradient: "from-blue-700 to-indigo-500",
//             color: "#0070f3",
//         },
//         {
//             title: "Infrastructure",
//             subtitle: "Lifecycle Management",
//             icon: Server,
//             gradient: "from-teal-600 to-cyan-400",
//             color: "#00dfd8",
//         },
//     ];

//     return (
//         <Container className="justify-center py-4">
//             {/* Header — kept exactly as original */}
//             <div className="text-center mb-6 md:mb-10">
//                 <SubHeading className="text-[10px] md:text-xs">OUR EXPERTISE</SubHeading>
//                 <Heading gradient className="text-3xl md:text-5xl">Medical Solutions</Heading>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 w-full max-w-7xl">
//                 {categories.map((cat, i) => (
//                     <motion.div
//                         key={i}
//                         initial={{ opacity: 0, scale: 1.6 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         viewport={{ once: true }}
//                         transition={{
//                             delay: i * 0.1,
//                             duration: 0.7,
//                             type: "spring",
//                             stiffness: 60,
//                             damping: 14,
//                         }}
//                         whileHover={{ y: -10, scale: 1.02 }}
//                         onClick={() => onSelect(9 + i)}
//                         className="group relative cursor-pointer flex flex-col h-full"
//                         style={{ perspective: "1000px" }}
//                     >
//                         {/* Continuous Border Animation */}
//                         <div className="absolute inset-0 rounded-4xl p-0.5 overflow-hidden">
//                             <motion.div
//                                 animate={{ rotate: 360 }}
//                                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                                 className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_20%,#0070f3_40%,#00dfd8_60%,transparent_80%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
//                             />
//                         </div>

//                         <div className="relative h-full glass-dark border border-white/10 rounded-4xl p-8 md:p-10 flex flex-col items-center text-center group-hover:border-white/20 group-hover:bg-black/90 transition-all duration-500 shadow-2xl overflow-hidden z-10">

//                             {/* Radial glow — same technique as Regulatory back face */}
//                             <div
//                                 className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
//                                 style={{ background: cat.color }}
//                             />

//                             {/* Gradient Icon Box — mirrors Regulatory.tsx flip card icon */}
//                             <motion.div
//                                 animate={{ rotate: [0, 5, -5, 0] }}
//                                 transition={{
//                                     duration: 5,
//                                     repeat: Infinity,
//                                     delay: i * 0.4,
//                                 }}
//                                 className={`mb-6 w-14 h-14 rounded-xl bg-linear-to-br ${cat.gradient} flex items-center justify-center shadow-lg shrink-0 relative overflow-hidden`}
//                             >
//                                 <cat.icon className="w-7 h-7 text-white relative z-10" />
//                                 {/* Shimmer sweep on hover */}
//                                 <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
//                             </motion.div>

//                             <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-brand-cyan transition-colors duration-300">
//                                 {cat.title}
//                             </h3>
//                             <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] mb-8 group-hover:text-white/60 transition-colors">
//                                 {cat.subtitle}
//                             </p>

//                             {/* Explore button — fills with accent color on hover */}
//                             <div
//                                 className="mt-auto px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group-hover:text-black group-hover:border-transparent"
//                                 style={{
//                                     // @ts-ignore
//                                     "--accent": cat.color,
//                                 }}
//                                 // Tailwind can't interpolate dynamic colors so we use inline style for the hover fill
//                                 onMouseEnter={(e) =>
//                                     ((e.currentTarget as HTMLDivElement).style.background = cat.color)
//                                 }
//                                 onMouseLeave={(e) =>
//                                     ((e.currentTarget as HTMLDivElement).style.background = "transparent")
//                                 }
//                             >
//                                 Explore Detail
//                             </div>

//                             {/* Decorative corner index — same as Regulatory */}
//                             <div
//                                 className="absolute top-0 right-0 p-6 text-6xl font-bold text-white/3 group-hover:text-white/6 transition-colors pointer-events-none"
//                                 style={{ color: cat.color + "08" }}
//                             >
//                                 0{i + 1}
//                             </div>

//                             {/* Top-right color corner accent — same as Regulatory front face */}
//                             <div
//                                 className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
//                                 style={{ background: cat.color }}
//                             />
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </Container>
//     );
// };

export const ServicesCategories = ({ onSelect }: { onSelect: (index: number) => void }) => {
    const categories = [
        {
            title: "Artificial Intelligence",
            subtitle: "Advanced Analytics",
            icon: Brain,
            gradient: "from-cyan-600 to-teal-500",
            color: "#00dfd8",
            description: "Leverage cutting-edge AI models to extract insights, automate decisions, and transform clinical data into actionable intelligence.",
        },
        {
            title: "App Development",
            subtitle: "Platform Solutions",
            icon: Code2,
            gradient: "from-blue-600 to-cyan-500",
            color: "#0070f3",
            description: "End-to-end medical application engineering — from architecture to deployment — built for scalability and compliance.",
        },
        {
            title: "Automation",
            subtitle: "Operational Efficiency",
            icon: Zap,
            gradient: "from-cyan-500 to-blue-600",
            color: "#00dfd8",
            description: "Streamline clinical workflows and eliminate manual overhead with intelligent process automation tailored for healthcare.",
        },
        {
            title: "Software Compliance",
            subtitle: "Regulatory Standards",
            icon: ShieldCheck,
            gradient: "from-blue-700 to-indigo-500",
            color: "#0070f3",
            description: "Navigate FDA, HIPAA, and ISO frameworks with confidence. We embed compliance into every layer of your software stack.",
        },
        {
            title: "Infrastructure",
            subtitle: "Lifecycle Management",
            icon: Server,
            gradient: "from-teal-600 to-cyan-400",
            color: "#00dfd8",
            description: "Robust, HIPAA-ready cloud infrastructure designed for uptime, security, and seamless scaling across your entire platform.",
        },
    ];

    return (
        <Container className="justify-center py-4">
            {/* Header — unchanged */}
            <div className="text-center mb-8 md:mb-14">
                <SubHeading className="text-[10px] md:text-xs">OUR EXPERTISE</SubHeading>
                <Heading gradient className="text-3xl md:text-5xl">Medical Solutions</Heading>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 w-full max-w-7xl">
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 1.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: i * 0.1,
                            duration: 0.7,
                            type: "spring",
                            stiffness: 60,
                            damping: 14,
                        }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => {
                            const slideIndices = [17, 23, 30, 34, 40];
                            onSelect(slideIndices[i]);
                        }}
                        className="group relative cursor-pointer flex flex-col"
                        style={{ perspective: "1000px" }}
                    >
                        {/* Animated conic border */}
                        <div className="absolute inset-0 rounded-3xl p-[1.5px] overflow-hidden">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_20%,#0070f3_40%,#00dfd8_60%,transparent_80%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>

                        {/* Card body */}
                        <div className="relative h-full glass-dark border border-white/8 rounded-3xl flex flex-col items-center text-center group-hover:border-white/20 group-hover:bg-black/90 transition-all duration-500 shadow-2xl overflow-hidden z-10 px-7 pt-10 pb-8 md:px-8 md:pt-12 md:pb-9">

                            {/* Radial top glow */}
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                                style={{ background: cat.color }}
                            />

                            {/* Corner index */}
                            <div
                                className="absolute top-4 right-5 text-5xl font-black pointer-events-none select-none leading-none transition-opacity duration-500 opacity-[0.04] group-hover:opacity-[0.09]"
                                style={{ color: cat.color }}
                            >
                                0{i + 1}
                            </div>

                            {/* Top-right corner accent patch */}
                            {/* <div
                                className="absolute top-0 right-0 w-20 h-20 rounded-bl-4xl opacity-[0.08] group-hover:opacity-[0.18] transition-opacity duration-500"
                                style={{ background: cat.color }}
                            /> */}

                            {/* Gradient icon box — Regulatory style */}
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
                                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${cat.gradient} flex items-center justify-center shadow-xl mb-6 shrink-0 relative overflow-hidden`}
                            >
                                <cat.icon className="w-8 h-8 text-white relative z-10" strokeWidth={1.6} />
                                {/* Shimmer sweep */}
                                <div className="absolute inset-0 bg-white/25 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-xl md:text-[1.35rem] font-bold mb-1.5 leading-tight group-hover:text-brand-cyan transition-colors duration-300">
                                {cat.title}
                            </h3>

                            {/* Subtitle badge — Regulatory code-pill style */}
                            <span
                                className="text-[9px] font-black uppercase tracking-[0.22em] px-3 py-1 rounded-full border mb-5 transition-all duration-300"
                                style={{
                                    color: cat.color,
                                    borderColor: cat.color + "40",
                                    background: cat.color + "10",
                                }}
                            >
                                {cat.subtitle}
                            </span>

                            {/* Description */}
                            <p className="text-[11px] md:text-xs text-white/40 leading-relaxed font-light mb-7 group-hover:text-white/65 transition-colors duration-400 max-w-[220px]">
                                {cat.description}
                            </p>

                            {/* Animated divider line */}
                            <div
                                className="w-10 h-px mb-6 opacity-20 group-hover:opacity-60 group-hover:w-16 transition-all duration-500"
                                style={{ background: cat.color }}
                            />

                            {/* Explore button */}
                            <div
                                className="mt-auto px-7 py-2.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.22em] transition-all duration-300 group-hover:text-black group-hover:border-transparent"
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.background = cat.color;
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${cat.color}60`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                                }}
                            >
                                Explore Detail
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Container>
    );
};

export const CategoryDetail = ({ title, items, categoryNum, description, onItemClick, clickableIndices = [] }: { title: string, items: { title: string, desc: string }[], categoryNum: string, description?: string, onItemClick?: (index: number) => void, clickableIndices?: number[] }) => (
    <Container className="justify-center py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 md:gap-8 mb-6 sm:mb-8 md:mb-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-brand-cyan leading-none shrink-0"
            >
                {categoryNum}
            </motion.div>
            <div>
                {/* <SubHeading className="text-[10px] md:text-xs mb-2">SERVICE CATEGORY</SubHeading> */}
                <Heading gradient className="text-2xl md:text-4xl leading-tight mb-0!">{title}</Heading>
            </div>
        </div>
        {description && (
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-white/60 text-sm md:text-base mb-8 max-w-2xl font-light"
            >
                {description}
            </motion.p>
        )}
        <div className={`grid gap-3 sm:gap-4 md:gap-5 items-stretch ${items.length <= 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : items.length <= 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
            {items.map((item, i) => {
                const isClickable = clickableIndices.includes(i) && !!onItemClick;

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        className="group relative flex flex-col h-full"
                    >
                    {/* Continuous Border Animation for detail cards */}
                    <div className="absolute inset-0 rounded-3xl p-[1.5px] overflow-hidden">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_20%,#0070f3_40%,#00dfd8_60%,transparent_80%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>

                        <button
                            type="button"
                            onClick={isClickable ? () => onItemClick?.(i) : undefined}
                            disabled={!isClickable}
                            className="relative h-full flex w-full flex-col bg-dark-surface/95 backdrop-blur-md rounded-3xl p-6 md:p-8 z-10 border border-white/5 transition-all duration-300 group-hover:border-brand-cyan/20 group-hover:shadow-[0_0_30px_rgba(0,223,216,0.15)] text-left cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70"
                            aria-label={isClickable ? `Open ${item.title} details` : item.title}
                        >
                        {/* Compact Decorative Number */}
                        <div className="absolute top-0 right-0 p-6 text-5xl font-bold text-white/1 group-hover:text-brand-cyan/3 transition-colors pointer-events-none">0{i + 1}</div>

                        <div className="mb-4 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 group-hover:bg-brand-cyan group-hover:text-black transition-all duration-500 shadow-lg relative overflow-hidden shrink-0">
                            <span className="text-xs font-bold z-10">{i + 1}</span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        </div>

                        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-brand-cyan transition-colors duration-300 leading-snug">
                            {item.title}
                        </h3>
                        <p className="text-white/40 text-xs md:text-sm leading-relaxed group-hover:text-white/80 transition-colors grow">
                            {item.desc}
                        </p>

                        {/* Minimal accent */}
                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <span className="text-[9px] uppercase tracking-widest font-bold text-brand-cyan/60">Module 0{i + 1}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/40" />
                        </div>
                        </button>
                    </motion.div>
                );
            })}
        </div>
    </Container>
);

// Detail Slides using the reusable component
export const Cat1Details = ({
    onOpenGenerativeAiDetail,
    onOpenClinicalDecisionSupportDetail,
    onOpenPredictiveHealthDetail,
    onOpenCustomAiDetail,
    onOpenBillingEfficiencyDetail
}: {
    onOpenGenerativeAiDetail?: () => void,
    onOpenClinicalDecisionSupportDetail?: () => void,
    onOpenPredictiveHealthDetail?: () => void,
    onOpenCustomAiDetail?: () => void,
    onOpenBillingEfficiencyDetail?: () => void
}) => {
    const handleItemClick = (index: number) => {
        if (index === 0) onOpenGenerativeAiDetail?.();
        else if (index === 1) onOpenClinicalDecisionSupportDetail?.();
        else if (index === 2) onOpenPredictiveHealthDetail?.();
        else if (index === 3) onOpenCustomAiDetail?.();
        else if (index === 4) onOpenBillingEfficiencyDetail?.();
    };

    return (
        <CategoryDetail
            categoryNum="01"
            title="Artificial Intelligence & Advanced Analytics"
            items={[
                { title: "Generative AI for Healthcare", desc: "Revolutionizing patient care with custom AI models that produce synthetic data, automate clinical notes, and create engaging patient education materials." },
                { title: "AI-Powered Clinical Decision Support", desc: "Harnessing real-time patient data to empower clinicians with intelligent, evidence-based diagnostic and treatment recommendations." },
                { title: "Predictive Health Analytics", desc: "Sophisticated algorithms identifying at-risk individuals early, transforming healthcare from reactive to proactive intervention." },
                { title: "Custom AI Solutions", desc: "Purpose-built AI systems that learn from your data, adapt to your processes, and evolve with your business needs for maximum impact." },
                { title: "AI-Enabled Billing Efficiency", desc: "Strategic automation of medical coding and billing, slashing denials and accelerating reimbursement cycles." }
            ]}
            clickableIndices={[0, 1, 2, 3, 4]}
            onItemClick={handleItemClick}
        />
    );
};

export const GenerativeAiDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">GENERATIVE AI FOR HEALTHCARE</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">Generative AI for Healthcare</Heading>
        <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Revolutionizing care with synthetic data, automated notes & patient education.
        </p>

        {/* Main Row — Two Stacked Images Left | All Content Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full"
        >
            {/* Left — Two Stacked Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/generative-ai/genai-notes-bg.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.18), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>

                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/generative-ai/image.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 70% 60%, rgba(0,112,243,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
                </div>
            </div>

            {/* Right — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Automated Clinical Notes</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">SOAP & Discharge — </span>Structured notes and discharge summaries generated from live or recorded clinician-patient transcripts.</li>
                        <li><span className="text-white/85 font-semibold">Fine-Tuned LLMs — </span>Domain-specific models trained on clinical language for accuracy and specialty context.</li>
                        <li><span className="text-white/85 font-semibold">70% Time Reduction — </span>Dramatically cut documentation burden so providers can focus on patient care.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Synthetic Data & Patient Education</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Synthetic Records — </span>Realistic de-identified patient data for training, testing, and research — HIPAA/GDPR compliant.</li>
                        <li><span className="text-white/85 font-semibold">Plain-Language Education — </span>Convert complex medical jargon into multilingual materials tailored to literacy level and condition.</li>
                        <li><span className="text-white/85 font-semibold">Visual Summaries — </span>Condition-specific visual explainers generated per patient for improved understanding and adherence.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Chatbots & Regulatory Guardrails</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Virtual Intake Assistants — </span>AI-powered chatbots that triage symptoms, answer pre-visit questions, and schedule appointments.</li>
                        <li><span className="text-white/85 font-semibold">Prompt Filtering — </span>Output validation and audit logging to ensure clinically safe, factually grounded responses.</li>
                        <li><span className="text-white/85 font-semibold">RAG Architecture — </span>Retrieval-augmented generation grounded in trusted medical sources for every AI response.</li>
                    </ul>
                </div>

            </div>
        </motion.div>

    </Container>
);

export const ClinicalDecisionSupportDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">AI-POWERED CLINICAL DECISION SUPPORT</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">AI-Powered Clinical Decision Support</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Real-time, evidence-based diagnostic & treatment recommendations for clinicians.
        </p> */}

        {/* Main Row — Two Stacked Images Left | All Content Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full"
        >
            {/* Left — Two Stacked Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/custom-medical/cds.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.18), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>

                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/custom-medical/cds-diagnostics.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 70% 60%, rgba(0,112,243,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
                </div>
            </div>

            {/* Right — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Real-time Data Fusion & Diagnostics</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Patient Data Fusion — </span>Live EHR vitals, labs, medications, imaging, and RPM data unified into a single point-of-care snapshot.</li>
                        <li><span className="text-white/85 font-semibold">Diagnostic Suggestions — </span>ML models (gradient boosting, deep learning) rank likely diagnoses by probability and urgency.</li>
                        <li><span className="text-white/85 font-semibold">Treatment Pathways — </span>Step-by-step options aligned with UpToDate and DynaMed guidelines; flags off-protocol orders.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Drug Alerts & Explainability</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Drug-drug & Allergy Alerts — </span>AI predicts nuanced risks like renal-adjusted dosing and rare reactions, reducing alert fatigue.</li>
                        <li><span className="text-white/85 font-semibold">Explainable AI (XAI) — </span>SHAP values and natural language explanations for every recommendation, enabling informed overrides.</li>
                        <li><span className="text-white/85 font-semibold">Clinician Trust — </span>Feature importance scores help providers understand and validate AI reasoning at the point of care.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Outcome Feedback Loop</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Continuous Retraining — </span>Models improve using de-identified outcomes like readmission rates and medication adherence.</li>
                        <li><span className="text-white/85 font-semibold">No Manual Re-annotation — </span>Automated feedback pipelines keep models current without labelling overhead.</li>
                        <li><span className="text-white/85 font-semibold">Performance Monitoring — </span>Drift detection and accuracy dashboards ensure model reliability across patient populations.</li>
                    </ul>
                </div>

            </div>
        </motion.div>

    </Container>
);

export const PredictiveHealthAnalyticsDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        <SubHeading className="text-[10px] md:text-xs mb-2 text-center">PREDICTIVE HEALTH ANALYTICS</SubHeading>
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">Predictive Health Analytics</Heading>
        <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            From reactive to proactive intervention — identify at-risk individuals early.
        </p>

        {/* Main Row — One Image Left | All Content Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full"
        >
            {/* Left — Single Image */}
            <div className="md:w-1/2 flex flex-col">
                <div className="relative rounded-xl overflow-hidden w-full h-full" style={{ minHeight: "340px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/custom-medical/predictive-analytics-bg.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.18), transparent 70%), radial-gradient(50% 50% at 75% 70%, rgba(0,112,243,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>
            </div>

            {/* Right — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Risk Stratification & Early Warning</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Risk Scoring — </span>Models assign readmission, sepsis, deterioration, and chronic disease exacerbation scores from longitudinal EHR data.</li>
                        <li><span className="text-white/85 font-semibold">Early Warning Systems — </span>Streaming vitals, lab trends, and nursing assessments trigger alerts hours before clinical deterioration.</li>
                        <li><span className="text-white/85 font-semibold">Inpatient & Remote — </span>Works across hospital floors and RPM-connected home care settings simultaneously.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Population Health & SDOH</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Population Segmentation — </span>Segment by predicted risk, cost, and utilization to target care management and preventive outreach.</li>
                        <li><span className="text-white/85 font-semibold">SDOH Integration — </span>ZIP-code and individual social determinants (housing, food, transport) improve prediction accuracy.</li>
                        <li><span className="text-white/85 font-semibold">Non-clinical Barriers — </span>Identify and flag social risk factors that drive avoidable admissions and care gaps.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Scenario Analysis & Operational Forecasting</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">What-if Simulation — </span>Model the impact of interventions like nurse navigators or mobile clinics before committing resources.</li>
                        <li><span className="text-white/85 font-semibold">Operational Forecasting — </span>Predict bed occupancy, ED wait times, no-show rates, and staffing needs in real time.</li>
                        <li><span className="text-white/85 font-semibold">Bottleneck Reduction — </span>Data-driven resource allocation recommendations to optimize throughput across departments.</li>
                    </ul>
                </div>

            </div>
        </motion.div>

    </Container>
);

export const CustomAiDetail = () => (
    <Container className="justify-center py-4">
        <SubHeading className="text-[10px] md:text-xs mb-2">CUSTOM AI SOLUTIONS</SubHeading>
        <Heading gradient className="text-2xl md:text-4xl leading-tight mb-2">Custom AI Solutions</Heading>
        <p className="text-brand-cyan/80 text-sm md:text-base font-semibold mb-6 md:mb-7 text-center">Purpose‑built AI that learns from your data, adapts to your processes, and evolves with your business</p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
            {/* Left: Single tall image */}
            <div className="relative w-full md:w-[42%] shrink-0 rounded-2xl overflow-hidden min-h-[280px] md:min-h-0">
                <img
                    src="/assets/custom-medical/tech-landscape-bg.png"
                    alt="Custom AI Solutions"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 mix-blend-soft-light opacity-70"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 223, 216, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 112, 243, 0.28), transparent 65%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
            </div>

            {/* Right: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Bespoke Model Development</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Deep Learning & Computer Vision —</span> Engineer models tailored to your specific clinical challenge, from detecting rare pathologies to automating prior auth.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">NLP & Classical ML —</span> Extract meaning from unstructured clinical notes, lab reports, and patient records at scale.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">OR Schedule Optimization —</span> Apply operational ML to reduce idle time, no-shows, and resource bottlenecks across departments.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Data‑Centric Approach & Process Integration</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Data Curation & Labeling —</span> Use active learning and expert‑in‑the‑loop pipelines to build high‑quality, representative datasets.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">EHR & Workflow Integration —</span> Embed AI outputs via EHR plugins, mobile apps, API calls, or real‑time dashboards without disrupting user experience.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Augmentation —</span> Expand limited datasets through synthetic data generation and domain‑specific augmentation strategies.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Adaptive Learning & Governance</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">MLOps & Continuous Retraining —</span> Automatically retrain on new data, monitor drift, and trigger human review when model confidence drops.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Evolution Roadmap —</span> Phased AI maturity plan: pilot in one department, then expand to new use cases as value is proven.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Full Governance —</span> Model cards, fairness audits, and FDA pre‑submission documentation for AI‑as‑a‑medical‑device compliance.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </Container>
);

export const BillingEfficiencyDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">AI-ENABLED BILLING EFFICIENCY</SubHeading> */}
        <Heading gradient className="text-2xl md:text-4xl leading-tight mb-2">AI-Enabled Billing Efficiency</Heading>
        {/* <p className="text-brand-cyan/80 text-sm md:text-base font-semibold mb-6 md:mb-7">Strategic automation of medical coding & billing – slash denials, accelerate reimbursements</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
            {/* Left: Single tall image */}
            <div className="relative w-full md:w-[42%] shrink-0 rounded-2xl overflow-hidden min-h-[280px] md:min-h-0">
                <img
                    src="/assets/custom-medical/medicalbilling.png"
                    alt="AI-Enabled Billing Efficiency"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 mix-blend-soft-light opacity-70"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 223, 216, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 112, 243, 0.28), transparent 65%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
            </div>

            {/* Right: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Automated Medical Coding & Claim Denial Prediction</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">NLP-Powered Coding —</span> Read clinical notes, operative reports, and discharge summaries to suggest or auto‑assign accurate ICD‑10, CPT, HCPCS, and modifiers with 95%+ initial accuracy.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Pre-Submission Denial Flagging —</span> Identify claims with high predicted denial risk before submission, highlighting missing documentation, coding mismatches, or authorization issues.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Dynamic Charge Capture —</span> Integrate with EHR to auto‑capture billable procedures and supplies; reduce missed charges and under‑coding.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Appeals Letter Generation</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Evidence-Based Appeals —</span> For denied claims, generate appeal letters using patient chart data, payer policies, and regulatory guidelines – cutting hours of manual work per denial.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Payer Policy Matching —</span> Automatically cross-reference denial reason codes against payer-specific coverage rules to identify the strongest appeal pathway.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Turnaround Acceleration —</span> Reduce appeal preparation time from days to minutes with templated, audit-ready letter generation at scale.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Reimbursement Cycle Analytics & Compliance</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Cycle Performance Monitoring —</span> Track days in AR, first‑pass acceptance rate, and denial reasons; surface payer‑specific patterns and systemic root causes for process redesign.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Audit Readiness —</span> Build full traceability from clinical documentation to final codes, with audit logs and justifications for every AI‑suggested change.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">RAC & Internal Audit Support —</span> Simplify Recovery Audit Contractor reviews with structured documentation trails and compliance reporting built into every workflow.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </Container>
);

export const Cat5Details = ({
    onOpenQaMedicalDetail,
    onOpenIec62304Detail,
    onOpenHipaaDetail,
    onOpenOncDetail,
    onOpenFhirDetail
}: {
    onOpenQaMedicalDetail?: () => void,
    onOpenIec62304Detail?: () => void,
    onOpenHipaaDetail?: () => void,
    onOpenOncDetail?: () => void,
    onOpenFhirDetail?: () => void
}) => {
    const handleItemClick = (index: number) => {
        if (index === 0) onOpenQaMedicalDetail?.();
        else if (index === 1) onOpenIec62304Detail?.();
        else if (index === 2) onOpenHipaaDetail?.();
        else if (index === 3) onOpenOncDetail?.();
        else if (index === 4) onOpenFhirDetail?.();
    };

    return (
        <CategoryDetail
            categoryNum="04"
            title="Software Compliance"
            items={[
                { title: "Quality Assurance (QA) for Medical Software", desc: "Ensuring software reliability and performance through comprehensive SQA and SDLC management." },
                { title: "IEC 62304 Compliance & Consultation (Medical Device Software)", desc: "Expert guidance on Medical Device Software lifecycle processes to meet international safety standards." },
                { title: "HIPAA Compliance & Security Implementation", desc: "Implementing enterprise-grade encryption and access controls for Protected Health Information (PHI)." },
                { title: "ONC Health IT Certification Support", desc: "Strategic assistance in navigating the certification process for health information technology." },
                { title: "FHIR Integration", desc: "Seamless integration of FHIR APIs with EHR systems using FHIR standards for structured health data exchange, secure real-time synchronization, interoperability, and scalable patient record management." }
            ]}
            clickableIndices={[0, 1, 2, 3, 4]}
            onItemClick={handleItemClick}
        />
    );
};

export const QaMedicalSoftwareDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">QUALITY ASSURANCE FOR MEDICAL SOFTWARE</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2">Quality Assurance (QA) for Medical Software</Heading>
        {/* <p className="text-brand-blue font-semibold mb-6 md:mb-7">Ensuring reliability, safety & performance through systematic SQA</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-blue/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">Comprehensive SQA Strategy & SDLC Management</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Full-Spectrum Test Planning —</span> Develop and execute test plans covering functional, integration, performance, security, and usability testing tailored to medical use cases (e.g., dose calculation, patient alerts).
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Traceability & CI/CD —</span> Implement traceability from requirements to test cases to defects; support Agile, Waterfall, or hybrid models with CI/CD integration for regulated environments.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Risk‑Based Testing —</span> Prioritize high‑risk functions (e.g., diagnostic algorithms, data persistence) using ISO 14971 principles to allocate QA resources efficiently.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-blue/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">Automation & Regression Testing</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Automated Test Scripts —</span> Build automated scripts for critical paths (login, data entry, report generation) to enable rapid regression testing after each build.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Continuous Regression Coverage —</span> Maintain a growing suite of automated regression tests that run on every commit, catching regressions before they reach production.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Real‑Device Testing —</span> Emulate clinical settings (low bandwidth, interruptions, multiple device models) to uncover production‑only failures.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">Documentation, Audits & Compliance</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Validated Test Protocols —</span> Produce summary reports and trace matrices that satisfy FDA (21 CFR 820) and EU MDR requirements.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Audit-Ready Documentation —</span> Maintain structured defect logs, test evidence, and sign-off records that streamline internal and regulatory audits.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Regulatory Alignment —</span> Align QA deliverables with IEC 62304, ISO 13485, and HIPAA security testing requirements for end-to-end compliance coverage.
                        </p>
                    </div>
                </div>

            </div>

            {/* Right: Two stacked images */}
            <div className="flex flex-col gap-4 w-full md:w-[38%] shrink-0">
                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/qa22.png"
                        alt="QA Medical Software"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 112, 243, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 223, 216, 0.25), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00142a]/40" aria-hidden />
                </div>

                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/qa33.png"
                        alt="QA Medical Software"
                        className="absolute inset-0 w-full h-full object-cover object-bottom"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 80% 85%, rgba(0, 112, 243, 0.35), transparent 65%), radial-gradient(60% 60% at 15% 20%, rgba(0, 223, 216, 0.25), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-tl from-[#02060d]/40 via-transparent to-[#00142a]/40" aria-hidden />
                </div>
            </div>

        </div>
    </Container>
);
export const Iec62304ComplianceDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">IEC 62304 COMPLIANCE & CONSULTATION</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2">IEC 62304 Compliance & Consultation</Heading>
        {/* <p className="text-brand-cyan font-semibold mb-6 md:mb-7">Expert guidance for medical device software lifecycle safety</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Lifecycle Coverage & Safety Classification</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Full Lifecycle Alignment —</span> Map your SDLC from planning through maintenance to IEC 62304:2006 + A1:2015 requirements.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Safety Class Determination —</span> Classify software as Class A, B, or C and tailor documentation, testing, and risk controls accordingly.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Risk Management —</span> Link ISO 14971 hazard analysis to requirements and test cases with full traceability to verification evidence.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Legacy Assessment & Gap Analysis</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Compliance Gap Analysis —</span> Evaluate existing software against 62304 requirements and identify remediation priorities.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Remediation Planning —</span> Build a structured path to compliance without a full rewrite, preserving existing architecture where possible.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Change Control —</span> Establish configuration management and change control processes that sustain compliance post-certification.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Audit-Ready Docs & Team Training</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Document Templates —</span> Deliver SDP, SRS, SDD, test reports, and release notes structured for notified body and FDA reviews.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Traceability Matrix —</span> Maintain end-to-end linkage from requirements to risk controls to verification evidence in a single artifact.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Team Enablement —</span> Train engineers on 62304 workflows so your team sustains compliance independently long-term.
                        </p>
                    </div>
                </div>

            </div>

            {/* Right: Two stacked images */}
            <div className="flex flex-col gap-4 w-full md:w-[38%] shrink-0">
                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/qa123.png"
                        alt="IEC 62304 Compliance"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 223, 216, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 112, 243, 0.25), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#001b26]/40" aria-hidden />
                </div>

                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/qa12.png"
                        alt="IEC 62304 Compliance"
                        className="absolute inset-0 w-full h-full object-cover object-bottom"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 80% 85%, rgba(0, 112, 243, 0.35), transparent 65%), radial-gradient(60% 60% at 15% 20%, rgba(0, 223, 216, 0.25), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-tl from-[#02060d]/40 via-transparent to-[#001b26]/40" aria-hidden />
                </div>
            </div>

        </div>
    </Container>
);

export const HipaaComplianceDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">HIPAA COMPLIANCE & SECURITY IMPLEMENTATION</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2">HIPAA Compliance & Security Implementation</Heading>
        {/* <p className="text-brand-blue font-semibold mb-6 md:mb-7">Enterprise‑grade protection for Protected Health Information (PHI)</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Single tall image */}
            <div className="relative w-full md:w-[42%] shrink-0 rounded-2xl overflow-hidden min-h-[280px] md:min-h-0">
                <img
                    src="/assets/custom-medical/hipaaa.png"
                    alt="HIPAA Compliance & Security"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 mix-blend-soft-light opacity-70"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 112, 243, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 223, 216, 0.25), transparent 65%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00142a]/40" aria-hidden />
            </div>

            {/* Right: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-blue/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">Encryption & Access Controls</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Encryption at Rest & Transit —</span> AES‑256 for stored PHI and TLS 1.3 for all network communications, including mobile‑to‑cloud and API endpoints.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Role-Based Access —</span> Enforce RBAC, least privilege, automatic logoff, and MFA for all administrative and clinical user access.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Audit Logging —</span> Immutable, time‑stamped logs of every PHI access or modification; SIEM integration for real‑time anomaly alerts.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-blue/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">BAAs, Breach Response & SRA</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">BAA Management —</span> Draft and manage Business Associate Agreements with cloud hosts, analytics providers, and all third-party subcontractors.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Security Risk Assessments —</span> Conduct regular HIPAA SRAs with prioritized remediation plans to address gaps before they become liabilities.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Incident Response —</span> Prepare ePHI-specific breach response playbooks covering containment, notification, and regulatory reporting.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">Physical & Device Security</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Workstation Policies —</span> Enforce screen lock, session timeout, and physical access controls for all clinical workstations handling PHI.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Device Encryption & MDM —</span> Deploy mobile device management for clinical staff with remote wipe capability and full-disk encryption.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Secure Media Disposal —</span> Enforce NIST 800-88 compliant sanitization and destruction procedures for all decommissioned storage media.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </Container>
);

export const OncCertificationDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">ONC HEALTH IT CERTIFICATION SUPPORT</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2">ONC Health IT Certification Support</Heading>
        {/* <p className="text-brand-cyan font-semibold mb-6 md:mb-7">Strategic navigation of certification for interoperability & usability</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Single tall image */}
            <div className="relative w-full md:w-[42%] shrink-0 rounded-2xl overflow-hidden min-h-[280px] md:min-h-0">
                <img
                    src="/assets/custom-medical/onc.png"
                    alt="ONC Health IT Certification"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 mix-blend-soft-light opacity-70"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 223, 216, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 112, 243, 0.25), transparent 65%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#001b26]/40" aria-hidden />
            </div>

            {/* Right: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Certification Roadmap & Test Suite</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Criteria Mapping —</span> Align your Health IT Module to applicable 2015 Edition Cures Update criteria — API, patient access, CDS, and e-prescribing.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Test Suite Preparation —</span> Self-validate using ONC-approved tools (Inferno for FHIR API, Surescripts for e-prescribing) and resolve failures proactively.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Real-World Testing —</span> Design test plans simulating clinical workflows (medication reconciliation, transitions of care) to satisfy § 170.315(g)(4).
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Documentation & ONC-ACB Submission</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Artifact Generation —</span> Produce technical explanations, user manuals, test reports, and attestations in the format required by certification bodies.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Submission Support —</span> Guide your team through ONC-ACB submission workflows, reducing back-and-forth and accelerating approval timelines.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Gap Analysis —</span> Review existing software against the latest criteria and deliver a prioritized backlog to close gaps with minimal dev overhead.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Post-Certification Surveillance</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Change Management —</span> Establish processes to assess every software update for certification impact before release.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Real-World Testing Logs —</span> Maintain required RWT logs and user feedback records to satisfy ongoing ONC surveillance obligations.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Continuous Compliance —</span> Monitor ONC rule updates and proactively adapt your certified module to maintain standing through regulatory changes.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </Container>
);

export const FhirIntegrationDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">FHIR INTEGRATION</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2">FHIR Integration</Heading>
        {/* <p className="text-brand-blue font-semibold mb-6 md:mb-7">Seamless, standards‑based health data exchange & interoperability</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Two stacked images */}
            <div className="flex flex-col gap-4 w-full md:w-[38%] shrink-0">
                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/fhir.png"
                        alt="FHIR Integration"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 112, 243, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 223, 216, 0.25), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00142a]/40" aria-hidden />
                </div>

                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/image.png"
                        alt="FHIR Integration"
                        className="absolute inset-0 w-full h-full object-cover object-bottom"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 80% 85%, rgba(0, 223, 216, 0.25), transparent 65%), radial-gradient(60% 60% at 15% 20%, rgba(0, 112, 243, 0.35), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-tl from-[#02060d]/40 via-transparent to-[#00142a]/40" aria-hidden />
                </div>
            </div>

            {/* Right: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-blue/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">FHIR API & EHR Integration</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">FHIR R4/R5 Endpoints —</span> Build RESTful APIs for Patient, Observation, Condition, MedicationRequest, and DiagnosticReport resources in JSON and XML.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">EHR Bidirectional Sync —</span> Integrate with Epic, Cerner, Allscripts, and athenahealth via FHIR sandboxes and SMART on FHIR launch contexts.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Real‑Time Subscriptions —</span> Push clinical updates (new labs, medication changes) to your app with millisecond latency via FHIR Subscriptions.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-blue/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">Structured Data Exchange</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Legacy Transformation —</span> Convert HL7 v2 messages and CDA documents into FHIR R4 bundles while preserving data fidelity and referential integrity.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Terminology Mapping —</span> Align clinical codes (SNOMED, LOINC, RxNorm) across source systems to produce consistent, interoperable FHIR resources.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Bulk Data Export —</span> Implement FHIR Bulk Data Access (§ 170.315(g)(10)) for population-level data extracts and analytics pipelines.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-blue mb-3">Security, Consent & Scalable Architecture</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">OAuth 2.0 & Consent —</span> Implement OpenID Connect authorization and granular FHIR Consent resources for patient and provider access control.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">FHIR Facade Layer —</span> Normalize relational DBs, NoSQL stores, and legacy HIS systems behind a single high‑throughput FHIR endpoint.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Scalable Infrastructure —</span> Design stateless, horizontally scalable FHIR server deployments with caching and load balancing for high concurrency.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </Container>
);
// export const Cat2Details = () => {
//     const items = [
//         { title: "Custom Medical Web Applications", desc: "Secure, scalable, and user-friendly web-based platforms for clinical, administrative, or patient use." },
//         { title: "Medical Mobile Apps", desc: "Native and cross-platform mobile applications for patients, providers, and field researchers." },
//         { title: "Remote Patient Monitoring (RPM)", desc: "Comprehensive platforms with patient-facing apps and provider dashboards for remote health tracking." },
//         { title: "Electronic Health Records (EHR)", desc: "Comprehensive EHR systems enabling seamless health data management, interoperability, and regulatory compliance." },
//         { title: "Medical Imaging & Analysis", desc: "Software for secure storage, viewing, annotation, and AI-powered analysis of medical images." },
//         // { title: "Drug Discovery Platforms", desc: "Specialized software to manage research data, streamline clinical trials, and support the drug lifecycle." }
//     ];

//     return (
//         <Container className="justify-center py-4">
//             <div className="flex items-center gap-5 md:gap-8 mb-8 md:mb-10">
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.5 }}
//                     whileInView={{ opacity: 0.3, scale: 1 }}
//                     className="text-6xl md:text-8xl font-black text-brand-cyan leading-none shrink-0"
//                 >
//                     02
//                 </motion.div>
//                 <div>
//                     <SubHeading className="text-[10px] md:text-xs mb-2">SERVICE CATEGORY</SubHeading>
//                     <Heading gradient className="text-2xl md:text-4xl leading-tight mb-0!">Application & Platform Development</Heading>
//                 </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-5 w-full">
//                 {items.map((item, i) => (
//                     <motion.div
//                         key={i}
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: i * 0.05 }}
//                         whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
//                         className={`group relative flex flex-col h-full ${
//                             items.length === 5 
//                                 ? (i < 3 ? 'md:col-span-2' : 'md:col-span-3') 
//                                 : 'md:col-span-2'
//                         } ${
//                             (i === items.length - 1 && items.length % 2 !== 0) ? 'col-span-2' : 'col-span-1'
//                         }`}
//                     >
//                         <div className="absolute inset-0 rounded-2xl p-[1.5px] overflow-hidden">
//                             <motion.div
//                                 animate={{ rotate: 360 }}
//                                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                                 className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_20%,#0070f3_40%,#00dfd8_60%,transparent_80%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
//                             />
//                         </div>
//                         <div className="relative h-full flex flex-col bg-dark-surface/95 backdrop-blur-md rounded-2xl p-5 md:p-6 z-10 border border-white/5 transition-all duration-300 group-hover:border-brand-cyan/20 group-hover:shadow-[0_0_30px_rgba(0,223,216,0.15)]">
//                             <div className="mb-3 w-9 h-9 flex items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shrink-0">
//                                 <span className="text-xs font-bold">{i + 1}</span>
//                             </div>
//                             <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-brand-cyan transition-colors duration-300 leading-snug">{item.title}</h3>
//                             <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/70 transition-colors grow">{item.desc}</p>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </Container>
//     );
// };

export const Cat2Details = ({ onOpenCustomMedicalDetail, onOpenMedicalMobileDetail, onOpenStoreDeploymentDetail, onOpenRpmDetail, onOpenEhrDetail, onOpenImagingDetail }: { onOpenCustomMedicalDetail?: () => void, onOpenMedicalMobileDetail?: () => void, onOpenStoreDeploymentDetail?: () => void, onOpenRpmDetail?: () => void, onOpenEhrDetail?: () => void, onOpenImagingDetail?: () => void }) => {
    const items = [
        { title: "Custom Medical Applications", desc: "Secure, scalable, and user-friendly web-based platforms for clinical, administrative, or patient use." },
        { title: "Medical Mobile Apps", desc: "Native and cross-platform mobile applications for patients, providers, and field researchers." },
        { title: "PlayStore & App Store Deployment", desc: "End-to-end app store submission, optimization, and compliance management for Google Play and Apple Store with accelerated approval." },
        { title: "Remote Patient Monitoring (RPM)", desc: "Comprehensive platforms with patient-facing apps and provider dashboards for remote health tracking." },
        { title: "Electronic Health Records (EHR)", desc: "Comprehensive EHR systems enabling seamless health data management, interoperability, and regulatory compliance." },
        { title: "Medical Imaging & Analysis", desc: "Software for secure storage, viewing, annotation, and AI-powered analysis of medical images." },
        // { title: "PlayStore & App Store Deployment", desc: "End-to-end app store submission, optimization, and compliance management for Google Play and Apple Store with accelerated approval." },
        // { title: "Drug Discovery Platforms", desc: "Specialized software to manage research data, streamline clinical trials, and support the drug lifecycle." }
    ];

    return (
        <Container className="justify-center py-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 md:gap-8 mb-6 sm:mb-8 md:mb-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.3, scale: 1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-brand-cyan leading-none shrink-0"
                >
                    02
                </motion.div>
                <div>
                    {/* <SubHeading className="text-[10px] md:text-xs mb-2">SERVICE CATEGORY</SubHeading> */}
                    <Heading gradient className="text-2xl md:text-4xl leading-tight mb-0!">Application & Platform Development</Heading>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 md:gap-5 w-full">
                {items.map((item, i) => {
                    const isCustomMedicalCard = i === 0;
                    const isMedicalMobileCard = i === 1;
                    const isStoreDeploymentCard = i === 2;
                    const isRpmCard = i === 3;
                    const isEhrCard = i === 4;
                    const isImagingCard = i === 5;
                    const cardContainerClass = `group relative flex flex-col h-full ${items.length === 5
                        ? (i < 3 ? 'md:col-span-2' : 'md:col-span-3')
                        : 'md:col-span-2'
                        } ${(i === items.length - 1 && items.length % 2 !== 0) ? 'col-span-2' : 'col-span-1'
                        }`;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                            className={cardContainerClass}
                        >
                            <div className="absolute inset-0 rounded-2xl p-[1.5px] overflow-hidden">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_20%,#0070f3_40%,#00dfd8_60%,transparent_80%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={
                                    isCustomMedicalCard
                                        ? onOpenCustomMedicalDetail
                                        : isMedicalMobileCard
                                            ? onOpenMedicalMobileDetail
                                            : isStoreDeploymentCard
                                                ? onOpenStoreDeploymentDetail
                                                : isRpmCard
                                                    ? onOpenRpmDetail
                                                    : isEhrCard
                                                        ? onOpenEhrDetail
                                                        : isImagingCard
                                                            ? onOpenImagingDetail
                                            : undefined
                                }
                                disabled={!isCustomMedicalCard && !isMedicalMobileCard && !isStoreDeploymentCard && !isRpmCard && !isEhrCard && !isImagingCard}
                                className="relative h-full flex w-full flex-col bg-dark-surface/95 backdrop-blur-md rounded-2xl p-5 md:p-6 z-10 border border-white/5 transition-all duration-300 group-hover:border-brand-cyan/20 group-hover:shadow-[0_0_30px_rgba(0,223,216,0.15)] text-left cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70"
                                aria-label={
                                    isCustomMedicalCard
                                        ? "Open custom medical applications details"
                                        : isMedicalMobileCard
                                            ? "Open medical mobile apps details"
                                            : isStoreDeploymentCard
                                                ? "Open PlayStore and App Store deployment details"
                                                : isRpmCard
                                                    ? "Open remote patient monitoring details"
                                                    : isEhrCard
                                                        ? "Open electronic health records details"
                                                        : isImagingCard
                                                            ? "Open medical imaging and analysis details"
                                            : item.title
                                }
                            >
                                <div className="mb-3 w-9 h-9 flex items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shrink-0">
                                    <span className="text-xs font-bold">{i + 1}</span>
                                </div>
                                <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-brand-cyan transition-colors duration-300 leading-snug">{item.title}</h3>
                                <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/70 transition-colors grow">{item.desc}</p>
                            </button>
                        </motion.div>
                    );
                })}
            </div>
        </Container>
    );
};


export const CustomMedicalApplicationsDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">CUSTOM MEDICAL APPLICATIONS</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">Custom Medical Applications</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Healthcare-grade applications — secure, scalable, and ready for real clinical workflows.
        </p> */}

        {/* Row 1 — Web Apps: Text Left | Image Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-5 md:gap-8 w-full mb-5"
        >
            {/* Text */}
            <div className="md:w-1/2 flex flex-col gap-2">
                <h3 className="text-base md:text-lg font-bold text-brand-cyan mb-1">Web Apps</h3>
                <ul className="space-y-1.5 text-white/65 text-sm leading-snug">
                    <li><span className="text-white/85 font-semibold">Tech Stack Strategy — </span>EMR/EHR modules, provider portals, admin panels, and patient dashboards.</li>
                    <li><span className="text-white/85 font-semibold">Core Technologies — </span>React, Next.js, TypeScript, Node.js, GraphQL, PostgreSQL, cloud-native.</li>
                    <li><span className="text-white/85 font-semibold">Intuitive UX — </span>Role-based workflows for doctors, nurses, admins, and patients.</li>
                    <li><span className="text-white/85 font-semibold">Security by Design — </span>Audit trails, encrypted data flows, and secure auth patterns.</li>
                    <li><span className="text-white/85 font-semibold">Interoperability Ready — </span>API-first integration with hospital systems and external services.</li>
                </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 relative rounded-xl overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: "url('/assets/custom-medical/web-apps-bg.png')" }}
                    aria-hidden
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.15), transparent 70%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
            </div>
        </motion.div>

        {/* Row 2 — Desktop Apps: Image Left | Text Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="flex flex-col-reverse md:flex-row items-center gap-5 md:gap-8 w-full mb-6"
        >
            {/* Image */}
            <div className="md:w-1/2 relative rounded-xl overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: "url('/assets/custom-medical/desktop.png')" }}
                    aria-hidden
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 70% 30%, rgba(0,112,243,0.15), transparent 70%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
            </div>

            {/* Text */}
            <div className="md:w-1/2 flex flex-col gap-2">
                <h3 className="text-base md:text-lg font-bold text-brand-blue mb-1">Desktop Apps</h3>
                <ul className="space-y-1.5 text-white/65 text-sm leading-snug">
                    <li><span className="text-white/85 font-semibold">Electron.js Engineering — </span>Cross-platform apps for Windows, macOS, and Linux, unified codebase.</li>
                    <li><span className="text-white/85 font-semibold">Offline-First Operations — </span>Local capture and sync for clinics with unstable connectivity.</li>
                    <li><span className="text-white/85 font-semibold">Advanced Workflows — </span>Barcode scanning, imaging handoff, and multi-step clinical task management.</li>
                    <li><span className="text-white/85 font-semibold">Enterprise Deployment — </span>Installer packaging, auto-updates, device policies, release channels.</li>
                    <li><span className="text-white/85 font-semibold">Data Protection — </span>Encrypted local storage and controlled access for sensitive records.</li>
                </ul>
            </div>
        </motion.div>

        {/* Tech Stack Logos — prominent */}
        <div className="w-full border-t border-white/8 pt-5">
            <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] text-center mb-5">Technology Stack</p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12"
            >
                {[
                    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                    { name: "Electron", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
                    { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
                    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                ].map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <img
                            src={tech.src}
                            alt={tech.name}
                            className="w-9 h-9 md:w-11 md:h-11 opacity-55 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,223,216,0.3)]"
                        />
                        <span className="text-[10px] md:text-[11px] text-white/40 group-hover:text-white/75 transition-colors duration-300 tracking-wide">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>

    </Container>
);

export const MedicalMobileAppsDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">MEDICAL MOBILE APPS</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">Medical Mobile Apps</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Tailored solutions for modern healthcare — built for patients, providers, and field teams.
        </p> */}

        {/* Row 1 — Three User Personas: Text Left | Image Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-5 md:gap-8 w-full mb-5"
        >
            {/* Text */}
            <div className="md:w-1/2 flex flex-col gap-2">
                <h3 className="text-base md:text-lg font-bold text-brand-cyan mb-1">Three User Personas</h3>
                <ul className="space-y-1.5 text-white/65 text-xs leading-snug">
                    <li><span className="text-white/85 font-semibold">Patients — </span>Appointment booking, telemedicine consultations, and medication reminders on the go.</li>
                    <li><span className="text-white/85 font-semibold">Providers — </span>EHR access, clinical workflow management, and real-time remote patient monitoring.</li>
                    <li><span className="text-white/85 font-semibold">Field Researchers — </span>Offline-capable data collection, trial protocol tracking, and automatic sync on reconnect.</li>
                    <li><span className="text-white/85 font-semibold">Role-Based Access — </span>Each persona gets a tailored interface with permissions scoped to their clinical role.</li>
                    <li><span className="text-white/85 font-semibold">Cross-Device Consistency — </span>Unified experience across iOS and Android with React Native, designed in Figma.</li>
                </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 relative rounded-xl overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: "url('/assets/custom-medical/3persona.png')" }}
                    aria-hidden
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.15), transparent 70%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
            </div>
        </motion.div>

        {/* Row 2 — Device Integration: Image Left | Text Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="flex flex-col-reverse md:flex-row items-center gap-5 md:gap-8 w-full mb-6"
        >
            {/* Image */}
            <div className="md:w-1/2 relative rounded-xl overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: "url('/assets/custom-medical/Integration.png')" }}
                    aria-hidden
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 70% 30%, rgba(0,112,243,0.15), transparent 70%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
            </div>

            {/* Text */}
            <div className="md:w-1/2 flex flex-col gap-2">
                <h3 className="text-base md:text-lg font-bold text-brand-blue mb-1">Device Integration</h3>
                <ul className="space-y-1.5 text-white/65 text-xs leading-snug">
                    <li><span className="text-white/85 font-semibold">Bluetooth Peripherals — </span>Native support for wearables, glucose monitors, pulse oximeters, and other medical devices.</li>
                    <li><span className="text-white/85 font-semibold">Real-Time Sync — </span>Continuous data streaming from connected devices into patient records and provider dashboards.</li>
                    <li><span className="text-white/85 font-semibold">Offline Resilience — </span>Local data capture persists through connectivity loss and syncs automatically on reconnect.</li>
                    <li><span className="text-white/85 font-semibold">HL7 / FHIR Ready — </span>Device data mapped to interoperability standards for seamless EHR integration.</li>
                    <li><span className="text-white/85 font-semibold">Low-Power Optimization — </span>Battery-aware polling and background sync tuned for field and clinical environments.</li>
                </ul>
            </div>
        </motion.div>

        {/* Tech Stack Logos */}
        <div className="w-full border-t border-white/8 pt-5">
            <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] text-center mb-5">Technology Stack</p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12"
            >
                {[
                    { name: "React Native", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                    { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
                    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                ].map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <img
                            src={tech.src}
                            alt={tech.name}
                            className="w-9 h-9 md:w-11 md:h-11 opacity-55 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,223,216,0.3)]"
                        />
                        <span className="text-[10px] md:text-[11px] text-white/40 group-hover:text-white/75 transition-colors duration-300 tracking-wide">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>

    </Container>
);


// export const StoreDeploymentDetail = () => (
//     <Container className="justify-center py-4">
//         <SubHeading className="text-[10px] md:text-xs mb-2">PLAYSTORE and APP STORE DEPLOYMENT</SubHeading>
//         <Heading gradient className="text-2xl md:text-4xl leading-tight mb-2">PlayStore & App Store Deployment</Heading>
//         <p className="text-brand-cyan/80 text-sm md:text-base font-semibold mb-6 md:mb-7">End-to-end launch and compliance management</p>

//         <div className="relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-dark-surface/90 p-6 md:p-7">
//             <div
//                 className="absolute inset-0 bg-cover bg-center opacity-45 scale-110"
//                 style={{ backgroundImage: "url('/assets/custom-medical/tech-landscape-bg.jpg')" }}
//                 aria-hidden
//             />
//             <div
//                 className="absolute inset-0 mix-blend-soft-light opacity-70"
//                 style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 112, 243, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 223, 216, 0.30), transparent 65%)" }}
//                 aria-hidden
//             />
//             <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/72 via-[#02060d]/58 to-[#00142a]/48" aria-hidden />

//             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
//                 <div className="rounded-xl border border-white/12 bg-white/4 p-4 md:p-5">
//                     <h4 className="text-base md:text-lg font-semibold text-brand-blue mb-2">Full Submission Lifecycle</h4>
//                     <p className="text-white/75 text-sm leading-relaxed">
//                         Handling of store accounts, metadata creation (descriptions, screenshots, keywords), and binary uploads for both Google Play and Apple App Store.
//                     </p>
//                 </div>

//                 <div className="rounded-xl border border-white/12 bg-white/4 p-4 md:p-5">
//                     <h4 className="text-base md:text-lg font-semibold text-brand-blue mb-2">Optimization (ASO)</h4>
//                     <p className="text-white/75 text-sm leading-relaxed">
//                         Keyword research, conversion rate optimization, and A/B testing for product pages to boost organic visibility.
//                     </p>
//                 </div>

//                 <div className="rounded-xl border border-white/12 bg-white/4 p-4 md:p-5">
//                     <h4 className="text-base md:text-lg font-semibold text-brand-blue mb-2">Compliance Management</h4>
//                     <p className="text-white/75 text-sm leading-relaxed">
//                         Pre-submission checks for policy adherence including privacy labels, data safety section, age ratings, and GDPR/CCPA disclosures.
//                     </p>
//                 </div>

//                 <div className="rounded-xl border border-white/12 bg-white/4 p-4 md:p-5">
//                     <h4 className="text-base md:text-lg font-semibold text-brand-blue mb-2">Accelerated Approval</h4>
//                     <p className="text-white/75 text-sm leading-relaxed">
//                         Proven strategies to reduce rejection risks and fast-track reviews, including expedited review requests for critical fixes.
//                     </p>
//                 </div>
//             </div>

//             <div className="relative z-10 mt-5 rounded-xl border border-white/12 bg-white/4 p-4 md:p-5">
//                 <h4 className="text-base md:text-lg font-semibold text-brand-blue mb-2">Ongoing Maintenance</h4>
//                 <p className="text-white/75 text-sm leading-relaxed">
//                     Manage version updates, phased rollouts, and store responses to user reviews.
//                 </p>
//             </div>
//         </div>
//     </Container>
// );

export const StoreDeploymentDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">PLAYSTORE AND APP STORE DEPLOYMENT</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">PlayStore & App Store Deployment</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            End-to-end launch and compliance management for Google Play and Apple App Store.
        </p> */}

        {/* Row 1 — Full Submission Lifecycle: Text Left | Image Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-5 md:gap-8 w-full mb-5"
        >
            {/* Text */}
            <div className="md:w-1/2 flex flex-col gap-2">
                <h3 className="text-base md:text-lg font-bold text-brand-blue mb-1">Full Submission Lifecycle</h3>
                <ul className="space-y-1.5 text-white/65 text-xs leading-snug">
                    <li><span className="text-white/85 font-semibold">Store Account Setup — </span>Developer account creation, team access configuration, and billing setup for both platforms.</li>
                    <li><span className="text-white/85 font-semibold">Metadata Creation — </span>Descriptions, screenshots, preview videos, and keyword-optimized titles for Google Play and App Store.</li>
                    <li><span className="text-white/85 font-semibold">Binary Uploads — </span>AAB/IPA packaging, signing, versioning, and upload via Play Console and App Store Connect.</li>
                    <li><span className="text-white/85 font-semibold">Release Tracks — </span>Staged rollouts using internal, alpha, beta, and production tracks for controlled launches.</li>
                    <li><span className="text-white/85 font-semibold">Review Coordination — </span>Submission timing, reviewer notes, and demo credentials to streamline first-pass approvals.</li>
                </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 relative rounded-xl overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: "url('/assets/custom-medical/submission.png')" }}
                    aria-hidden
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,112,243,0.18), transparent 70%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
            </div>
        </motion.div>

        {/* Row 2 — Compliance & ASO: Image Left | Text Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="flex flex-col-reverse md:flex-row items-center gap-5 md:gap-8 w-full mb-6"
        >
            {/* Image */}
            <div className="md:w-1/2 relative rounded-xl overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: "url('/assets/custom-medical/compliance.png')" }}
                    aria-hidden
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 70% 30%, rgba(0,223,216,0.15), transparent 70%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
            </div>

            {/* Text */}
            <div className="md:w-1/2 flex flex-col gap-2">
                <h3 className="text-base md:text-lg font-bold text-brand-cyan mb-1">Compliance, ASO & Approval</h3>
                <ul className="space-y-1.5 text-white/65 text-xs leading-snug">
                    <li><span className="text-white/85 font-semibold">Privacy & Policy Checks — </span>Privacy labels, data safety section, age ratings, and GDPR/CCPA disclosures before submission.</li>
                    <li><span className="text-white/85 font-semibold">ASO Keyword Strategy — </span>Keyword research and title/subtitle optimization to maximize organic search visibility.</li>
                    <li><span className="text-white/85 font-semibold">Conversion Optimization — </span>A/B testing for icons, screenshots, and descriptions to improve store page conversion rates.</li>
                    <li><span className="text-white/85 font-semibold">Accelerated Approval — </span>Proven strategies to reduce rejection risks and fast-track reviews for critical fixes.</li>
                    <li><span className="text-white/85 font-semibold">Ongoing Maintenance — </span>Version updates, phased rollouts, and managed responses to user reviews post-launch.</li>
                </ul>
            </div>
        </motion.div>

        {/* Tech Stack Logos */}
        {/* <div className="w-full border-t border-white/8 pt-5">
            <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] text-center mb-5">Technology Stack</p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12"
            >
                {[
                    { name: "React Native", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "Firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
                    { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
                    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                ].map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <img
                            src={tech.src}
                            alt={tech.name}
                            className="w-9 h-9 md:w-11 md:h-11 opacity-55 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,112,243,0.3)]"
                        />
                        <span className="text-[10px] md:text-[11px] text-white/40 group-hover:text-white/75 transition-colors duration-300 tracking-wide">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div> */}

    </Container>
);

export const RpmDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">REMOTE PATIENT MONITORING (RPM)</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">Remote Patient Monitoring (RPM)</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Comprehensive platforms for continuous care — connecting patients, providers, and devices.
        </p> */}

        {/* Main Row — All Content Left | Two Stacked Images Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full mb-6"
        >
            {/* Left — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Patient-Facing Apps</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Vitals Capture — </span>BP, glucose, SpO2, and weight logging via connected or manual entry flows.</li>
                        <li><span className="text-white/85 font-semibold">Medication Adherence — </span>Scheduled reminders, dosage tracking, and missed-dose alerts.</li>
                        <li><span className="text-white/85 font-semibold">Secure Messaging — </span>HIPAA-compliant in-app chat between patients and care teams.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Provider Dashboards</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Real-Time Alerts — </span>Risk scoring and threshold-based notifications for timely clinical interventions.</li>
                        <li><span className="text-white/85 font-semibold">Trend Visualization — </span>Longitudinal charts and heatmaps across patient cohorts and individual timelines.</li>
                        <li><span className="text-white/85 font-semibold">Telemedicine Integration — </span>Launch video consultations directly from the dashboard on triggered alerts.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Device Agnostic & Sync</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">FDA-Cleared Wearables — </span>Bluetooth and SDK integrations for monitors, patches, and sensors.</li>
                        <li><span className="text-white/85 font-semibold">Offline-First Sync — </span>Local storage with auto-sync on reconnect, built for rural and home-based care.</li>
                        <li><span className="text-white/85 font-semibold">Regulatory Ready — </span>HIPAA, GDPR, and MDR compliance with audit trails and role-based encryption.</li>
                    </ul>
                </div>

            </div>

            {/* Right — Two Stacked Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/rpm/rpm1.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>

                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/rpm/rpm2.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 70% 60%, rgba(0,112,243,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
                </div>
            </div>
        </motion.div>

        {/* Tech Stack Logos */}
        {/* <div className="w-full border-t border-white/8 pt-5">
            <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] text-center mb-5">Technology Stack</p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12"
            >
                {[
                    // { name: "React Native", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                    { name: "Firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
                    { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
                    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                ].map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <img
                            src={tech.src}
                            alt={tech.name}
                            className="w-9 h-9 md:w-11 md:h-11 opacity-55 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,223,216,0.3)]"
                        />
                        <span className="text-[10px] md:text-[11px] text-white/40 group-hover:text-white/75 transition-colors duration-300 tracking-wide">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div> */}

    </Container>
);

export const EhrDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">ELECTRONIC HEALTH RECORDS (EHR)</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">Electronic Health Records (EHR)</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Seamless health data management and interoperability — built for clinical precision and compliance.
        </p> */}

        {/* Main Row — All Content Left | Two Stacked Images Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full mb-6"
        >
            {/* Left — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-blue">Comprehensive Data Management</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Centralized Records — </span>Demographics, medical history, medications, lab results, and immunization records in one place.</li>
                        <li><span className="text-white/85 font-semibold">Progress Notes — </span>Structured clinical documentation with specialty-specific templates and voice-to-text support.</li>
                        <li><span className="text-white/85 font-semibold">Audit Trails — </span>Full access logs and change history for every patient record modification.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-blue">Interoperability & Clinical Workflows</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">HL7 / FHIR — </span>Standards-based data exchange with hospital systems, labs, pharmacies, and health registries.</li>
                        <li><span className="text-white/85 font-semibold">E-Prescribing — </span>Order entry, clinical decision support, and drug interaction checks at the point of care.</li>
                        <li><span className="text-white/85 font-semibold">Custom Templates — </span>Configurable workflows and documentation templates across multiple clinical specialties.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-blue">Compliance & Patient Portal</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Regulatory Ready — </span>HIPAA, GDPR, and 21 CFR Part 11 compliance with role-based access and encryption.</li>
                        <li><span className="text-white/85 font-semibold">Patient Portal — </span>Secure access for patients to view records, request refills, and message their care team.</li>
                        <li><span className="text-white/85 font-semibold">Regional Mandates — </span>E-prescribing and data retention rules configured per jurisdiction and facility type.</li>
                    </ul>
                </div>

            </div>

            {/* Right — Two Stacked Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/rpm/ehr1.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,112,243,0.18), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
                </div>

                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/rpm/ehr2.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 70% 60%, rgba(0,223,216,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>
            </div>
        </motion.div>

        {/* Tech Stack Logos */}
        {/* <div className="w-full border-t border-white/8 pt-5">
            <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] text-center mb-5">Technology Stack</p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12"
            >
                {[
                    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                    { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
                    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                ].map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <img
                            src={tech.src}
                            alt={tech.name}
                            className="w-9 h-9 md:w-11 md:h-11 opacity-55 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,112,243,0.3)]"
                        />
                        <span className="text-[10px] md:text-[11px] text-white/40 group-hover:text-white/75 transition-colors duration-300 tracking-wide">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div> */}

    </Container>
);

export const ImagingAnalysisDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">MEDICAL IMAGING AND ANALYSIS</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-center">Medical Imaging & Analysis</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Secure storage, viewing, annotation and AI-powered insights for clinical imaging workflows.
        </p> */}

        {/* Main Row — All Content Left | Two Stacked Images Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full mb-6"
        >
            {/* Left — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Secure Image Storage</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">DICOM-Compliant — </span>Role-based access, encryption at rest and in transit, and automated backup for all imaging data.</li>
                        <li><span className="text-white/85 font-semibold">Advanced Viewing — </span>Zero-footprint PACS viewer with zoom, pan, windowing, 3D reconstruction, and multi-planar reformatting.</li>
                        <li><span className="text-white/85 font-semibold">Cloud-Native Storage — </span>Scalable object storage with geo-redundancy and near-zero retrieval latency for large DICOM files.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Annotation & AI Analysis</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Annotation Tools — </span>Freehand drawing, measurement (length/angle/area), landmark placement, and radiologist reporting.</li>
                        <li><span className="text-white/85 font-semibold">AI-Powered Detection — </span>Computer-vision models for nodules, fractures, and hemorrhages with critical case prioritization.</li>
                        <li><span className="text-white/85 font-semibold">Segmentation — </span>Automated organ and lesion segmentation to support surgical planning and oncology workflows.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Interoperability & Compliance</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">DICOMweb & FHIR — </span>Imaging Study integration and HL7 data exchange with existing EHR and RIS systems.</li>
                        <li><span className="text-white/85 font-semibold">Regulatory Ready — </span>HIPAA, GDPR, and FDA/CE compliance with full audit trails and access logging.</li>
                        <li><span className="text-white/85 font-semibold">RIS Integration — </span>Worklist management, study routing, and report distribution across radiology departments.</li>
                    </ul>
                </div>

            </div>

            {/* Right — Two Stacked Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/rpm/imaging2.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.18), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>

                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/rpm/imaging1.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 70% 60%, rgba(0,112,243,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
                </div>
            </div>
        </motion.div>

        {/* Tech Stack Logos */}
        {/* <div className="w-full border-t border-white/8 pt-5">
            <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] text-center mb-5">Technology Stack</p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12"
            >
                {[
                    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                    { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
                    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                ].map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <img
                            src={tech.src}
                            alt={tech.name}
                            className="w-9 h-9 md:w-11 md:h-11 opacity-55 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,223,216,0.3)]"
                        />
                        <span className="text-[10px] md:text-[11px] text-white/40 group-hover:text-white/75 transition-colors duration-300 tracking-wide">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div> */}

    </Container>
);

export const Cat3Details = ({
    onOpenSchedulerDetail,
    onOpenWorkflowDetail,
    onOpenRecommendationDetail
}: {
    onOpenSchedulerDetail?: () => void,
    onOpenWorkflowDetail?: () => void,
    onOpenRecommendationDetail?: () => void
}) => {
    const handleItemClick = (index: number) => {
        if (index === 0) onOpenSchedulerDetail?.();
        else if (index === 1) onOpenWorkflowDetail?.();
        else if (index === 2) onOpenRecommendationDetail?.();
    };

    return (
        <CategoryDetail
            categoryNum="03"
            title="Operational Efficiency & Automation"
            items={[
                { title: "Intelligent Appointment & Resource Scheduler", desc: "Develops smart scheduling systems that optimize provider time, patient preferences, and resource allocation, including auto-scheduling features." },
                { title: "Automated Clinical Workflow Orchestration", desc: "Creates software that automates routine administrative and clinical tasks (e.g., referral processing, lab order tracking) to improve efficiency." },
                { title: "Medical Research & Recommendation Engines", desc: "Builds platforms that help researchers and clinicians quickly find relevant studies, guidelines, and clinical trial information." }
            ]}
            clickableIndices={[0, 1, 2]}
            onItemClick={handleItemClick}
        />
    );
};

export const SchedulerDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">INTELLIGENT APPOINTMENT AND RESOURCE SCHEDULER</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-left">Intelligent Appointment & Resource Scheduler</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Smart scheduling systems for optimized care delivery — built for providers, patients, and operations.
        </p> */}

        {/* Main Row — Two Stacked Images Left | All Content Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full"
        >
            {/* Left — Two Stacked Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/scheduler/schedular1.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.18), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>

                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/scheduler/schedular2.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 70% 60%, rgba(0,112,243,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
                </div>
            </div>

            {/* Right — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Provider Time Optimization</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Smart Balancing — </span>Algorithms that balance routine, urgent, and follow-up appointments while minimizing idle slots.</li>
                        <li><span className="text-white/85 font-semibold">Admin Blocking — </span>Automatically reserve time blocks for administrative tasks, breaks, and buffer periods.</li>
                        <li><span className="text-white/85 font-semibold">Patient Preferences — </span>Capture preferred dates, times, provider, and visit modality to reduce no-shows and increase satisfaction.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Resource Allocation</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Auto-Assignment — </span>Exam rooms, medical equipment, and nursing staff assigned based on real-time availability.</li>
                        <li><span className="text-white/85 font-semibold">Waitlist Auto-Fill — </span>One-click booking from reminders and automatic slot filling from waitlists on cancellations.</li>
                        <li><span className="text-white/85 font-semibold">Recurring Appointments — </span>Automated recurring scheduling for chronic care patients with configurable cadences.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Integration Ready</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">EHR Sync — </span>Real-time APIs to sync appointments, clinical notes, and patient data with existing EHR systems.</li>
                        <li><span className="text-white/85 font-semibold">Billing Integration — </span>Appointment data flows directly into billing and claims for end-to-end workflow continuity.</li>
                        <li><span className="text-white/85 font-semibold">Patient Portal — </span>Self-service booking, rescheduling, and cancellation via integrated patient-facing portals.</li>
                    </ul>
                </div>

            </div>
        </motion.div>

    </Container>
);

export const WorkflowOrchestrationDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">AUTOMATED CLINICAL WORKFLOW ORCHESTRATION</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-left">Automated Clinical Workflow Orchestration</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Eliminate routine tasks, accelerate care delivery — intelligent automation across every clinical touchpoint.
        </p> */}

        {/* Main Row — Two Stacked Images Left | All Content Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full"
        >
            {/* Left — Two Stacked Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/scheduler/cwf.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.18), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>

                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/scheduler/cwf1.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 70% 60%, rgba(0,112,243,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
                </div>
            </div>

            {/* Right — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Referral & Lab Processing</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Auto-Routing — </span>Incoming referrals routed to the right specialist with insurance validation and consultation scheduling.</li>
                        <li><span className="text-white/85 font-semibold">Lab Order Tracking — </span>Auto-generate requisitions, send to affiliated labs, and push results to the provider dashboard.</li>
                        <li><span className="text-white/85 font-semibold">No Manual Triage — </span>Rules-based logic handles routing decisions without staff intervention at each step.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Task Automation</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Prescription Renewals — </span>Automated renewal requests, prior auth submissions, and approval status tracking.</li>
                        <li><span className="text-white/85 font-semibold">Discharge Summaries — </span>Templated generation and delivery of discharge documentation to patients and care teams.</li>
                        <li><span className="text-white/85 font-semibold">Follow-Up Reminders — </span>Scheduled patient outreach via SMS, email, or portal message based on care plan triggers.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Inter-system Orchestration & Analytics</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Cross-System Sync — </span>Coordinate actions across EHR, LIS, pharmacy systems, and secure communication platforms.</li>
                        <li><span className="text-white/85 font-semibold">Real-Time Dashboards — </span>Throughput, bottleneck, and staff workload visibility for continuous process improvement.</li>
                        <li><span className="text-white/85 font-semibold">Audit & Compliance — </span>Full workflow logs with timestamps for regulatory review and operational accountability.</li>
                    </ul>
                </div>

            </div>
        </motion.div>

    </Container>
);

export const RecommendationEnginesDetail = () => (
    <Container className="justify-center py-4">

        {/* Header */}
        {/* <SubHeading className="text-[10px] md:text-xs mb-2 text-center">MEDICAL RESEARCH & RECOMMENDATION ENGINES</SubHeading> */}
        <Heading gradient className="text-xl md:text-2xl leading-tight mb-2 text-left">Medical Research & Recommendation Engines</Heading>
        {/* <p className="text-white/50 text-xs leading-relaxed max-w-xl mx-auto mb-6 text-center">
            Accelerate evidence-based decisions & discovery — AI-powered insights for researchers and clinicians.
        </p> */}

        {/* Main Row — Two Stacked Images Left | All Content Right */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 w-full"
        >
            {/* Left — Two Stacked Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/scheduler/research1.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 30% 30%, rgba(0,223,216,0.18), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-cyan/20 rounded-xl" aria-hidden />
                </div>

                <div className="relative rounded-xl overflow-hidden w-full flex-1" style={{ minHeight: "160px" }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/assets/scheduler/research2.png')" }}
                        aria-hidden
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 70% 60%, rgba(0,112,243,0.15), transparent 70%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 border border-brand-blue/20 rounded-xl" aria-hidden />
                </div>
            </div>

            {/* Right — All Content */}
            <div className="md:w-1/2 flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Smart Literature Discovery</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">AI-Powered Search — </span>Search PubMed, clinical trial registries, and guidelines ranked by relevance and recency.</li>
                        <li><span className="text-white/85 font-semibold">Personalized for Researchers — </span>Suggest studies based on past queries, publication history, and active projects.</li>
                        <li><span className="text-white/85 font-semibold">Personalized for Clinicians — </span>Surface matching guidelines and evidence directly from the patient presentation context.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">Clinical Trial Matching</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Eligibility Comparison — </span>Automatically match patient criteria against active trial databases in real time.</li>
                        <li><span className="text-white/85 font-semibold">Provider Alerts — </span>Notify clinicians and researchers of potential trial matches without manual searching.</li>
                        <li><span className="text-white/85 font-semibold">Trend & Gap Analysis — </span>Visualise research hotspots and understudied conditions via NLP on abstracts and full texts.</li>
                    </ul>
                </div>

                <div className="w-full h-px bg-white/8" />

                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-brand-cyan">EHR & Workflow Integration</h3>
                    <ul className="space-y-1 text-white/65 text-xs leading-snug">
                        <li><span className="text-white/85 font-semibold">Embedded Widgets — </span>Recommendation panels embedded directly into clinical dashboards and patient record views.</li>
                        <li><span className="text-white/85 font-semibold">Zero Context Switch — </span>Clinicians review evidence without leaving the EHR or interrupting their workflow.</li>
                        <li><span className="text-white/85 font-semibold">API-First — </span>Plug into existing hospital systems, portals, and research platforms via standard REST/FHIR APIs.</li>
                    </ul>
                </div>

            </div>
        </motion.div>

    </Container>
);

export const Cat4Details = ({
    onOpenDevOps,
    onOpenSaaS,
    onOpenQaValidation,
    onOpenMaintenance
}: {
    onOpenDevOps?: () => void,
    onOpenSaaS?: () => void,
    onOpenQaValidation?: () => void,
    onOpenMaintenance?: () => void
}) => {
    const handleItemClick = (index: number) => {
        if (index === 0) onOpenDevOps?.();
        else if (index === 1) onOpenSaaS?.();
        else if (index === 2) onOpenQaValidation?.();
        else if (index === 3) onOpenMaintenance?.();
    };

    return (
        <CategoryDetail
            categoryNum="05"
            title="Infrastructure & Lifecycle Management"
            items={[
                { title: "DevOps & Cloud Infrastructure", desc: "Automate deployments, manage cloud infrastructure (AWS, Azure, GCP), and ensure high availability and scalability." },
                { title: "SaaS Enablement & Modernization", desc: "Transform traditional medical software into modern, scalable Software-as-a-Service (SaaS) models." },
                { title: "Quality Assurance & Validation", desc: "Comprehensive testing including functionality, security, performance, and compliance validation (IQ/OQ/PQ)." },
                { title: "Ongoing Maintenance & Support", desc: "Reliable IT support, bug fixes, security patches, and continuous performance monitoring." }
            ]}
            clickableIndices={[0, 1, 2, 3]}
            onItemClick={handleItemClick}
        />
    );
};

export const DevOpsCloudInfrastructureDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">DEVOPS & CLOUD INFRASTRUCTURE</SubHeading> */}
        <Heading gradient className="text-2xl md:text-4xl leading-tight mb-2">DevOps & Cloud Infrastructure</Heading>
        {/* <p className="text-brand-cyan/80 text-sm md:text-base font-semibold mb-6 md:mb-7">Automated, scalable, and highly available medical software environments</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Multi‑Cloud & Infrastructure as Code</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Multi‑Cloud Expertise —</span> Architect on AWS (HealthLake), Azure (Healthcare APIs), or GCP (Healthcare API); hybrid and on‑prem supported.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Infrastructure as Code —</span> Provision auditable, repeatable dev/test/prod environments using Terraform, CloudFormation, or ARM templates.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">CI/CD Pipelines —</span> Automate build, test, and deploy via GitHub Actions or Azure DevOps with SAST/DAST and HIPAA compliance gates.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">High Availability & Observability</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">HA & Disaster Recovery —</span> Multi‑AZ/multi‑region deployments with auto‑scaling and warm standby strategies for 99.99% uptime SLAs.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Monitoring & Alerting —</span> Real‑time metrics via Prometheus/Grafana or Datadog with intelligent alerting on latency, errors, and resource usage.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Incident Response —</span> Automated runbooks and on-call escalation policies to minimize MTTR during production incidents.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Security Automation & Cost Optimization</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Security Automation —</span> Least-privilege IAM, continuous vulnerability scanning (Trivy, Snyk), and AWS Config rules for HIPAA compliance evidence.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Cost Optimization —</span> Right-size instances, leverage spot VMs for non-prod, and deliver monthly spend analytics with actionable savings recommendations.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">FinOps Governance —</span> Tag-based cost allocation and budget alerts to maintain full cloud spend visibility across teams and environments.
                        </p>
                    </div>
                </div>

            </div>

            {/* Right: Two stacked images */}
            <div className="flex flex-col gap-4 w-full md:w-[38%] shrink-0">
                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/devops.png"
                        alt="DevOps & Cloud Infrastructure"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 223, 216, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 112, 243, 0.28), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
                </div>

                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/tech.png"
                        alt="DevOps & Cloud Infrastructure"
                        className="absolute inset-0 w-full h-full object-cover object-bottom"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 80% 85%, rgba(0, 112, 243, 0.28), transparent 65%), radial-gradient(60% 60% at 15% 20%, rgba(0, 223, 216, 0.35), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-tl from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
                </div>
            </div>

        </div>
    </Container>
);

export const SaaSEnablementDetail = () => (
    <Container className="justify-center py-4">
        <Heading gradient className="text-2xl md:text-4xl leading-tight mb-2">SaaS Enablement & Modernization</Heading>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Legacy Assessment & Modernization</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Legacy Roadmap —</span> Audit monolithic EHR or PACS systems to identify refactoring candidates, dependencies, and migration complexity.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Microservices Decomposition —</span> Break monoliths into containerized services (Docker, Kubernetes) with well-defined APIs per domain.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Zero‑Downtime Migration —</span> Use strangler pattern and data sync strategies to cut over without disrupting clinical operations.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Multi‑Tenancy & API‑First Design</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Tenant Isolation —</span> Design database-per-tenant or schema-per-tenant models to securely serve multiple orgs from one codebase.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">API‑First Architecture —</span> Expose RESTful/GraphQL APIs with developer portals (Swagger/OpenAPI) and built-in usage analytics.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Subscription & Metering —</span> Integrate usage-based billing (per patient, per API call) with Stripe or Chargebee across tiered plans.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Compliance & SaaS Governance</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Built-In Compliance —</span> Embed audit trails, logging, and data residency controls for HIPAA and GDPR from day one.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">SOC 2 & HITRUST —</span> Prepare and obtain SOC 2 Type II and HITRUST certifications to meet enterprise customer procurement requirements.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Tenant Governance —</span> Enforce per-tenant access policies, data isolation audits, and compliance reporting dashboards at scale.
                        </p>
                    </div>
                </div>

            </div>

            {/* Right: Single tall image */}
            <div className="relative w-full md:w-[42%] shrink-0 rounded-2xl overflow-hidden min-h-[280px] md:min-h-0">
                <img
                    src="/assets/custom-medical/saas.png"
                    alt="SaaS Enablement & Modernization"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 mix-blend-soft-light opacity-70"
                    style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 223, 216, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 112, 243, 0.28), transparent 65%)" }}
                    aria-hidden
                />
                <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
            </div>

        </div>
    </Container>
);

export const QaValidationDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">QUALITY ASSURANCE & VALIDATION</SubHeading> */}
        <Heading gradient className="text-2xl md:text-4xl leading-tight mb-2">Quality Assurance & Validation</Heading>
        {/* <p className="text-brand-cyan/80 text-sm md:text-base font-semibold mb-6 md:mb-7">Comprehensive testing & compliance validation (IQ/OQ/PQ)</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Full Test Spectrum & Automation</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Full Test Coverage —</span> Functional, integration, system, performance, security, and usability testing aligned to IEC 62304 Class A/B/C risk levels.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Automated Regression —</span> Selenium/Cypress for UI, Postman/Newman for API, and JMeter for load — triggered on every CI commit.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Performance & Security —</span> Simulate 10k concurrent users and run SAST/DAST/pen testing with reports ready for HIPAA and FDA review.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Compliance Validation (IQ/OQ/PQ)</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">IQ (Installation) —</span> Verify correct installation across target environments including OS, network, and dependency configurations.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">OQ (Operational) —</span> Test all functional and boundary conditions under simulated real-world clinical use scenarios.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">PQ (Performance) —</span> Demonstrate consistent, repeatable performance within validated production clinical workflows.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Traceability, Docs & Test Environments</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Trace Matrix —</span> Link requirements → test cases → defects → validation results in a single audit-ready artifact for regulatory submissions.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Test Env Management —</span> Provision isolated, production-like environments with FHIR sandboxes and anonymized clinical data.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Audit-Ready Reporting —</span> Generate structured summary reports and sign-off documentation aligned to FDA 21 CFR 820 and EU MDR standards.
                        </p>
                    </div>
                </div>

            </div>

            {/* Right: Two stacked images */}
            <div className="flex flex-col gap-4 w-full md:w-[38%] shrink-0">
                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/qa1.png"
                        alt="Quality Assurance & Validation"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 223, 216, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 112, 243, 0.28), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
                </div>

                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/qa2.png"
                        alt="Quality Assurance & Validation"
                        className="absolute inset-0 w-full h-full object-cover object-bottom"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 80% 85%, rgba(0, 112, 243, 0.28), transparent 65%), radial-gradient(60% 60% at 15% 20%, rgba(0, 223, 216, 0.35), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-tl from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
                </div>
            </div>

        </div>
    </Container>
);

export const OngoingMaintenanceDetail = () => (
    <Container className="justify-center py-4">
        {/* <SubHeading className="text-[10px] md:text-xs mb-2">ONGOING MAINTENANCE & SUPPORT</SubHeading> */}
        <Heading gradient className="text-2xl md:text-4xl leading-tight mb-2">Ongoing Maintenance & Support</Heading>
        {/* <p className="text-brand-cyan/80 text-sm md:text-base font-semibold mb-6 md:mb-7">Reliable IT support, patches, monitoring, and continuous improvement</p> */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

            {/* Left: Stacked content sections */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 justify-center">

                {/* Section 1 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Tiered Support & Bug Management</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Tiered Support Model —</span> L1 helpdesk, L2 app troubleshooting, and L3 engineering escalation with defined SLAs (critical: 15 min, high: 4 hrs).
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Bug Fixes & Patches —</span> Security hotfixes within 24–48 hrs; severity-triaged defects resolved on scheduled monthly patch cycles.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Security Patch Automation —</span> Dependabot or AWS Patch Manager auto-applies OS and library patches in non-prod before validated promotion.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="border-b border-brand-cyan/15 pb-6 md:pb-8">
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Monitoring & Incident Management</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">24/7 Performance Monitoring —</span> Synthetic and real-user monitoring (RUM) on API latency, error rates, and DB query performance with proactive alerts.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Incident Management —</span> ITIL-aligned detection → diagnosis → resolution → post-mortem with on-call rotations and customer status pages.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Release Management —</span> Off-peak maintenance windows with blue-green or canary deployments to minimize clinical disruption.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h4 className="text-base md:text-lg font-bold text-brand-cyan mb-3">Continuous Improvement</h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Feedback Loop —</span> Aggregate support tickets, logs, and user surveys into a prioritized backlog each sprint.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Tech Debt Reduction —</span> Scheduled refactoring cycles to address code quality, dependency upgrades, and architectural drift.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Roadmap Alignment —</span> Quarterly reviews to align maintenance priorities with evolving regulatory requirements and product goals.
                        </p>
                    </div>
                </div>

            </div>

            {/* Right: Two stacked images */}
            <div className="flex flex-col gap-4 w-full md:w-[38%] shrink-0">
                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/it1.png"
                        alt="Ongoing Maintenance & Support"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 20% 15%, rgba(0, 223, 216, 0.35), transparent 65%), radial-gradient(60% 60% at 85% 80%, rgba(0, 112, 243, 0.28), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
                </div>

                <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                    <img
                        src="/assets/custom-medical/it2.png"
                        alt="Ongoing Maintenance & Support"
                        className="absolute inset-0 w-full h-full object-cover object-bottom"
                    />
                    <div
                        className="absolute inset-0 mix-blend-soft-light opacity-70"
                        style={{ backgroundImage: "radial-gradient(60% 60% at 80% 85%, rgba(0, 112, 243, 0.28), transparent 65%), radial-gradient(60% 60% at 15% 20%, rgba(0, 223, 216, 0.35), transparent 65%)" }}
                        aria-hidden
                    />
                    <div className="absolute inset-0 bg-linear-to-tl from-[#02060d]/40 via-transparent to-[#00192d]/40" aria-hidden />
                </div>
            </div>

        </div>
    </Container>
);

// 12. Products Intro
// export const CareManagement = () => (
//     <Container className="text-center items-center px-4 md:px-6">
//         <SubHeading>PRODUCTS</SubHeading>
//         <Heading gradient>CARE MANAGEMENT</Heading>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 className="relative group p-px rounded-4xl md:rounded-[2.5rem] overflow-hidden bg-white/5"
//             >
//                 <div className="relative card-content text-left bg-[#080808] h-full w-full rounded-[calc(2rem-1px)] md:rounded-[calc(2.5rem-1px)] z-10 p-6 md:p-10 group-hover:bg-black/80 transition-colors">
//                     <h3 className="text-2xl md:text-3xl font-bold mb-4 text-brand-blue">EHR</h3>
//                     <p className="text-white/50 text-sm md:text-base leading-relaxed">
//                         EHR solution simplifies patient data management, offering quick access to medical records, diagnosis, treatments, and test results. It enhances data sharing and improves coordination, streamlining patient care and reducing errors.
//                     </p>
//                     <div className="mt-6 md:mt-8 h-1 w-20 md:w-24 bg-brand-blue/30 rounded-full" />
//                 </div>
//             </motion.div>
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 className="relative group p-px rounded-4xl md:rounded-[2.5rem] overflow-hidden bg-white/5"
//             >
//                 <div className="relative card-content text-left bg-[#080808] h-full w-full rounded-[calc(2rem-1px)] md:rounded-[calc(2.5rem-1px)] z-10 p-6 md:p-10 group-hover:bg-black/80 transition-colors">
//                     <h3 className="text-2xl md:text-3xl font-bold mb-4 text-brand-cyan">AI AUTOMATION</h3>
//                     <p className="text-white/50 text-sm md:text-base leading-relaxed">
//                         AI Automation tool leverages advanced algorithms to streamline repetitive tasks, improve efficiency, and reduce human error. By integrating AI into workflows enhances the decision-making, boosts productivity and allow teams to focus on more strategic initiatives.
//                     </p>
//                     <div className="mt-6 md:mt-8 h-1 w-20 md:w-24 bg-brand-cyan/30 rounded-full" />
//                 </div>
//             </motion.div>
//         </div>
//     </Container>
// );

// 13. Remote Care
export const RemoteCare = () => (
    <Container>
        <SubHeading>REMOTE CARE & TELEHEALTH</SubHeading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8 md:space-y-12">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">TELEHEALTH</h3>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed">
                        Telehealth platform enables remote healthcare delivery, allowing patients to consult with doctors via secure video calls. It improves access to care, enhances patient convenience, and supports better health outcomes.
                    </p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tighter">REMOTE MONITORING & CARE</h3>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed">
                        Remote Monitoring & Care solutions allow healthcare providers to track patients' vital signs in real-time from any location. It ensures continuous care and reduces hospital visits.
                    </p>
                </motion.div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="w-full h-75 lg:h-100 glass shadow-2xl rounded-[3rem] border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-linear-to-br from-brand-blue/20 to-transparent" />
                    <div className="flex items-center justify-center h-full">
                        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="w-1/2 h-px bg-brand-cyan" />
                    </div>
                </motion.div>
            </div>
        </div>
    </Container>
);

// 14. Preventive Care
export const PreventiveCare = () => (
    <Container>
        <SubHeading>POSTOP / PREVENTIVE CARE</SubHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {[
                { title: "WELLBUDDY POSTOP CARE", color: "brand-blue", desc: "It is a comprehensive solution designed to support patients during their recovery after surgery. It provides remote monitoring of vital signs, medication tracking and personalized care instructions ensuring smooth recovery process and reducing hospital readmissions." },
                { title: "PREVENTIVE CARE", color: "brand-cyan", desc: "Our Preventive Care solution focuses on proactive health management by monitoring key health indicators and providing early alerts for potential risks. It helps individuals maintain optimal health and promoces long-term well-being." }
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                >
                    <div className={`absolute -inset-1 bg-linear-to-r ${item.color === 'brand-blue' ? 'from-brand-blue to-purple-600' : 'from-brand-cyan to-blue-500'} rounded-4xl opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`} />
                    <div className="relative p-6 md:p-10 glass-dark rounded-4xl border border-white/10 h-full flex flex-col justify-center">
                        <h3 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${item.color === 'brand-blue' ? 'text-brand-blue' : 'text-brand-cyan'}`}>{item.title}</h3>
                        <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
                            {item.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    </Container>
);


// 15. Medical Assistance
export const MedicalAssistance = () => (
    <Container>
        <SubHeading>MEDICAL ASSISTANCE</SubHeading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative group p-px rounded-4xl md:rounded-[3rem] overflow-hidden bg-white/5"
            >
                <div className="relative p-6 md:p-10 bg-dark-surface rounded-[calc(2rem-1px)] md:rounded-[calc(3rem-1px)] z-10 h-full transition-all duration-500 group-hover:bg-black/80">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-brand-blue flex items-center gap-3 text-left">
                        <div className="w-1 md:w-1.5 h-6 bg-brand-blue rounded-full shrink-0" />
                        CLINICAL DECISION SUPPORT
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed font-light group-hover:text-white transition-colors">
                        An intelligent support system designed to augment clinical expertise. By analyzing complex patient data in real-time, we deliver evidence-based recommendations that enhance diagnostic precision and optimize treatment planning.
                    </p>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative group p-px rounded-4xl md:rounded-[3rem] overflow-hidden bg-white/5"
            >
                <div className="relative p-6 md:p-10 bg-dark-surface rounded-[calc(2rem-1px)] md:rounded-[calc(3rem-1px)] z-10 h-full transition-all duration-500 group-hover:bg-black/80">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-brand-cyan flex items-center gap-3 text-left">
                        <div className="w-1 md:w-1.5 h-6 bg-brand-cyan rounded-full shrink-0" />
                        PRECISION MEDICINE
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed font-light group-hover:text-white transition-colors">
                        Our solution tailors treatments based on individual genetic profiles, lifestyle, and environment. By personalizing treatment effectiveness, minimizes side effects, and promotes better outcomes for patients.
                    </p>
                </div>
            </motion.div>
        </div>
    </Container>
);

// 16. Clients
export const ClientsSlide = () => (
    <Container className="items-center text-center">
        <SubHeading>CLIENTS</SubHeading>
        <Heading gradient>SATISFIED CLIENTS</Heading>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 md:mt-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-28 md:w-32 h-16 md:h-20 glass-dark rounded-xl border border-white/5 flex items-center justify-center font-bold text-white/20 uppercase tracking-widest text-[8px] md:text-[10px]">
                    Client Logo
                </div>
            ))}
        </div>
    </Container>
);

// 13. Pricing
// export const Pricing = () => {
//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//     const plans = [
//         {
//             tier: "Basic Plan / Patient",
//             price: "$25 - $30",
//             desc: "Essential remote monitoring for individual patients.",
//             features: ["Per Patient-Doctor Chat", "Adjustable Clinical Values", "High/Low Alert System", "Dual Notifications"]
//         },
//         {
//             tier: "Business Plan / Clinic",
//             price: "$500 - $700",
//             desc: "Comprehensive solutions for clinics to manage their practice.",
//             features: [
//                 "Unlimited Patient-Doctor Chat",
//                 "Adjustable Clinical Values",
//                 "High/Low Alert System",
//                 "Dual Notifications",
//                 "Clinic Integration",
//                 "Practice Dashboard",
//             ]
//         },
//         {
//             tier: "Premium Plan / Customized",
//             price: "$1k - $2k",
//             desc: "For hospitals and large scale organizations.",
//             features: [
//                 "Unlimited Patient-Doctor Chat",
//                 "Adjustable Clinical Values",
//                 "High/Low Alert System",
//                 "Dual Notifications",
//                 "Clinic Integration",
//                 "Practice Dashboard",
//                 "AI Extensions",
//                 "Custom Integration Options"
//             ]
//         }
//     ];

//     return (
//         <Container className="text-center items-center pt-16 pb-8 md:pt-20 md:pb-10 min-h-0! relative overflow-hidden">
//             <div className="w-full max-w-350 mx-auto px-4 flex flex-col items-center">
//                 <div className="mb-4 md:mb-6 text-center">
//                     <Heading gradient className="text-2xl md:text-3xl lg:text-5xl mb-2!">Subscription Models</Heading>
//                     <p className="max-w-2xl mx-auto text-xs md:text-sm lg:text-base text-white/50 font-light leading-relaxed px-4">
//                         Choose the perfect plan for your healthcare innovation journey, tailored to scale with your institution's needs.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full items-stretch max-md:max-w-md max-md:mx-auto">
//                     {plans.map((plan, i) => {
//                         const isHighlighted = hoveredIndex === i;
//                         return (
//                             <motion.div
//                                 key={i}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: i * 0.1 }}
//                                 onMouseEnter={() => setHoveredIndex(i)}
//                                 onMouseLeave={() => setHoveredIndex(null)}
//                                 className={`relative p-px rounded-4xl md:rounded-[2.5rem] overflow-hidden transition-all duration-500 flex flex-col ${isHighlighted ? 'bg-gradient-to-b from-brand-cyan/50 to-brand-blue/50 shadow-[0_0_40px_rgba(0,112,243,0.2)] scale-[1.01]' : 'bg-white/10 border border-white/5'}`}
//                             >
//                                 <div className="bg-[#080808]/95 backdrop-blur-sm rounded-[calc(2rem-1px)] md:rounded-[calc(2.5rem-1px)] px-5 py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 h-full flex flex-col items-center">
//                                     <h3 className={`text-sm md:text-base lg:text-lg font-bold tracking-tighter mb-1 transition-colors duration-300 ${isHighlighted ? 'text-brand-cyan' : 'text-white'} whitespace-nowrap`}>{plan.tier}</h3>
//                                     <div className="flex items-baseline gap-1 mb-2">
//                                         <span className="text-2xl md:text-3xl lg:text-5xl font-black text-white">{plan.price}</span>
//                                     </div>
//                                     <p className="text-white/40 text-[10px] md:text-xs lg:text-sm mb-4 leading-tight text-center h-8 md:h-10 flex items-center justify-center italic">{plan.desc}</p>

//                                     <div className="w-full space-y-1 md:space-y-1.5 lg:space-y-2 mb-6 border-t border-white/5 pt-4">
//                                         {plan.features.map((feature, idx) => (
//                                             <div key={idx} className="flex items-start gap-2 md:gap-3 text-left">
//                                                 <div className={`mt-1.5 w-1 h-1 rounded-full shrink-0 transition-colors duration-300 ${isHighlighted ? 'bg-brand-cyan' : 'bg-brand-cyan/40'}`} />
//                                                 <span className="text-[10px] md:text-[11px] lg:text-sm text-white/70 leading-tight">{feature}</span>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* <button className={`mt-auto w-full py-2.5 md:py-3 rounded-xl font-bold tracking-widest uppercase text-[10px] md:text-xs transition-all duration-300 ${isHighlighted ? 'bg-brand-cyan text-black hover:bg-white hover:scale-[1.02] shadow-[0_0_15px_rgba(0,223,216,0.2)]' : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20'}`}>
//                                         Choose Plan
//                                     </button> */}
//                                 </div>
//                             </motion.div>
//                         );
//                     })}
//                 </div>
//             </div>
//             {/* Background Glow */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-cyan/5 blur-[120px] -z-10 pointer-events-none opacity-50" />
//         </Container>
//     );
// };

export const Accomplishments = () => {
    const accomplishments = [
        {
            value: "2",
            label: "Mobile Apps",
            desc: "Published on PlayStore / App Store",
            icon: Smartphone,
            gradient: "from-cyan-600 to-teal-500",
            color: "#00dfd8",
            image: "/assets/accomplishments/mobile_apps_bg.png"
        },
        {
            value: "3",
            label: "IT Support Solutions",
            desc: "Enterprise SLA & cloud maintenance",
            icon: Cloud,
            gradient: "from-blue-600 to-cyan-500",
            color: "#0070f3",
            image: "/assets/cloud.png"
        },
        {
            value: "10+",
            label: "Projects Successfully Executed",
            desc: "Custom designs and systems delivered",
            icon: Trophy,
            gradient: "from-cyan-500 to-blue-600",
            color: "#00dfd8",
            image: "/assets/accomplishments/projects_bg.jpg"
        },
        {
            value: "1",
            label: "FDA Regulatory Compliance",
            desc: "IEC 62304 standard alignment",
            icon: ClipboardList,
            gradient: "from-blue-700 to-indigo-500",
            color: "#0070f3",
            image: "/assets/image.png"
        },
        {
            value: "1",
            label: "ONC Certified EHR",
            desc: "Electronic Health Records integration",
            icon: ShieldCheckIcon,
            gradient: "from-teal-600 to-cyan-400",
            color: "#00dfd8",
            image: "/assets/ONC.png"
        }
    ];

    return (
        <Container className="justify-center py-4">
            <div className="text-center mb-8 md:mb-12">
                <SubHeading className="text-[10px] md:text-xs">PROVEN TRACK RECORD</SubHeading>
                <Heading gradient className="text-3xl md:text-5xl">Our Achievements</Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6 w-full max-w-5xl mx-auto items-stretch">
                {accomplishments.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: i * 0.08,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 60,
                            damping: 14,
                        }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`group relative flex flex-col h-full ${i < 3 ? 'md:col-span-2' : 'md:col-span-3'
                            }`}
                        style={{ perspective: "1000px" }}
                    >
                        {/* Animated conic border */}
                        <div className="absolute inset-0 rounded-3xl p-[1.5px] overflow-hidden">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_20%,#0070f3_40%,#00dfd8_60%,transparent_80%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>

                        {/* Card body */}
                        <div className="relative h-full bg-slate-950/70 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col items-center text-center group-hover:border-white/25 group-hover:bg-slate-900/80 transition-all duration-500 shadow-2xl overflow-hidden z-10 px-6 py-8 md:px-8 md:py-10">
                            {/* Realistic background image with scale-on-hover and high transparency */}
                            <img
                                src={item.image}
                                alt={item.label}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-95 z-0 pointer-events-none"
                            />

                            {/* Gradient read-mask overlay to guarantee readability of stats/text (reference dark gradient) */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/20 z-0 pointer-events-none" />

                            {/* Radial top glow */}
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[70px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0"
                                style={{ background: item.color }}
                            />

                            {/* Decorative corner index */}
                            <div
                                className="absolute top-4 right-5 text-4xl font-black pointer-events-none select-none leading-none transition-opacity duration-500 opacity-10 group-hover:opacity-20 text-white z-10"
                            >
                                0{i + 1}
                            </div>

                            {/* Foreground content container to sit above background and overlay */}
                            <div className="relative z-10 flex flex-col items-center h-full w-full">
                                {/* Gradient icon box */}
                                <motion.div
                                    animate={{ rotate: [0, 3, -3, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
                                    className={`w-14 h-14 rounded-2xl bg-linear-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-5 shrink-0 relative overflow-hidden`}
                                >
                                    <item.icon className="w-7 h-7 text-white relative z-10" strokeWidth={1.6} />
                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                                </motion.div>

                                {/* Stat Value */}
                                <span className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-white group-hover:text-brand-cyan transition-colors duration-300">
                                    {item.value}
                                </span>

                                {/* Title / Label */}
                                <h3 className="text-lg md:text-xl font-bold mb-1 leading-snug text-white">
                                    {item.label}
                                </h3>

                                {/* Description */}
                                <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Container>
    );
};

// Testimonials Slide
export const Testimonials = () => {
    const reviews = [
        {
            name: "Dr. Babar Rao",
            company: "LegendEHR",
            quote: "Satisfactory IT support and fully ONC‑certified – exactly what you need for a reliable, audit‑ready EHR system.",
            role: "Dermatologist"
        },
        {
            name: "Ms. Rumana",
            company: "e-Vitals",
            quote: "The mobile app development and real-time remote monitoring dashboard exceeded our expectations. Robust, secure, and extremely user-friendly.",
            role: "Chief Executive Officer"
        },
        {
            name: "Sajol Ghoshal",
            company: "Cardio",
            quote: "RMT's team demonstrated absolute mastery in regulatory QA and Regulatory Compliance.",
            role: "Chief Executive Officer"
        },
        {
            name: "Dr. Amir Jamal",
            company: "Infuzamed",
            quote: "RMT tackled the complexity of our remote patient monitoring platform with precision — turning a challenging system into a reliable, production-ready solution.",
            role: "Chief Executive Officer"
        },
        {
            name: "Ricky Torres",
            company: "22-RPM",
            quote: "From design to deployment, RMT proved to be a reliable partner. Their expertise in healthcare IT and commitment to quality made them an invaluable asset in our product development journey.",
            role: "Chief Executive Officer"
        }
    ];

    const [currentIdx, setCurrentIdx] = useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [reviews.length]);

    const activeReview = reviews[currentIdx];

    const marqueeLogos = [
        { name: "LegendEHR", logoSrc: "/assets/legendEHR.jpg" },
        { name: "22-RPM", logoSrc: "/assets/22RPM.png" },
        { name: "Cardio", logoSrc: "/assets/cardio.png" },
        { name: "e-Vitals", logoSrc: "/assets/E-vitals.png" },
        { name: "Infuzamed", logoSrc: "/assets/infuzamed.png" },
    ];
    const doubleLogos = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos];

    return (
        <Container className="justify-center py-4">
            <div className="text-center mb-8 md:mb-12">
                <SubHeading className="text-[10px] md:text-xs justify-center">VALUED PARTNERS & CLIENTS</SubHeading>
                <Heading gradient className="text-3xl md:text-5xl">Testimonials</Heading>
            </div>

            {/* Testimonials Card */}
            <div className="relative w-full max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-20 px-1">
                {/* Decorative background glow behind the card */}
                <div className="absolute inset-0 bg-brand-cyan/5 blur-3xl rounded-full pointer-events-none" />

                <div className="glass-dark p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-4xl border border-white/10 relative overflow-hidden shadow-2xl min-h-48 sm:min-h-55 md:min-h-55 flex flex-col justify-between">
                    {/* Quotation icon */}
                    <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 text-white/5 font-serif text-6xl sm:text-8xl md:text-9xl select-none pointer-events-none">
                        “
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIdx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 flex flex-col justify-between h-full"
                        >
                            <p className="text-white/80 italic text-base md:text-lg lg:text-xl font-light leading-relaxed mb-6">
                                "{activeReview.quote}"
                            </p>
                            <div>
                                <h4 className="text-white font-bold text-base md:text-lg">
                                    {activeReview.name}
                                </h4>
                                <p className="text-brand-cyan text-xs md:text-sm font-medium">
                                    {/* {activeReview.role}  */}
                                     {activeReview.company}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination indicators inside the card */}
                    <div className="flex gap-2 justify-end mt-4 relative z-20">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIdx(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? "w-6 bg-brand-cyan" : "w-1.5 bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Continuous marquee slider for logos */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold mb-6">
                    TRUSTED BY HEALTHCARE INDUSTRY
                </p>
                <div className="relative w-full overflow-hidden py-4 border-y border-white/5">
                    {/* Fade gradients on edges */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-8 whitespace-nowrap animate-marquee"
                        animate={{ x: ["0%", "-33.333%"] }}
                        transition={{
                            ease: "linear",
                            duration: 20,
                            repeat: Infinity,
                        }}
                    >
                        {doubleLogos.map((logo, i) => (
                            <div
                                key={i}
                                className="inline-flex items-center justify-center w-48 h-20 sm:w-60 sm:h-24 shrink-0 p-4 rounded-xl bg-white shadow-md transition-all hover:scale-105 group"
                            >
                                <img
                                    src={logo.logoSrc}
                                    alt={logo.name}
                                    className="max-h-full max-w-full object-contain transition-opacity duration-300"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </Container>
    );
};

// Thank You Slide
export const ThankYou = () => (
    <Container className="text-center items-center justify-center p-6 md:p-12">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-dark p-6 md:p-10 lg:p-12 rounded-4xl md:rounded-[3rem] border border-white/10 max-w-2xl w-full relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-cyan to-transparent opacity-50" />

            <Heading gradient>THANK YOU</Heading>

            <div className="h-px w-24 bg-brand-cyan/30 mx-auto mb-6" />

            <p className="text-base md:text-lg text-white/60 font-light leading-relaxed mb-8 max-w-xl mx-auto">
                Your comprehensive software solution partner, guiding you from
                initial conceptualization to the realization of a full scale
                commercial reality.
            </p>

            <motion.a
                href="https://www.rmt-usa.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, color: '#00dfd8' }}
                className="text-sm md:text-base font-mono tracking-[0.3em] text-white/40 uppercase cursor-pointer hover:shadow-[0_0_20px_rgba(0,223,216,0.2)] px-6 py-2 rounded-full border border-white/5"
            >
                www.rmt-usa.com
            </motion.a>
        </motion.div>
    </Container>
);
