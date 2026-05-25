import React from "react";
import { motion } from "motion/react";
import { 
  Brain, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  ShieldAlert, 
  Scale, 
  Users, 
  Settings, 
  BookOpen, 
  Layers, 
  Lock, 
  UserCheck, 
  FileText, 
  ShieldCheck, 
  ActivitySquare
} from "lucide-react";

// Reusable components matching the design system
const Container = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => {
  return (
    <div className={`slide-container ${className}`} {...props}>
      {children}
    </div>
  );
};

const Heading = ({ children, gradient = false, className = "" }: { children: React.ReactNode, gradient?: boolean, className?: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className={`slide-heading !text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl mb-4 md:mb-6 ${gradient ? 'text-gradient' : ''} ${className}`}
  >
    {children}
  </motion.h2>
);

const SubHeading = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className={`flex items-center gap-3 mb-4 md:mb-6 ${className}`}
  >
    <div className="slide-subheading-line" />
    <span className="text-brand-cyan font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs">{children}</span>
  </motion.div>
);

// Slide 2: How AI is Shaping Healthcare – The Core Roles
export const AIShapingHealthcare = () => {
  const roles = [
    {
      icon: TrendingUp,
      title: "Predictive & Preventive Care",
      desc: "AI forecasts disease risk (e.g., Delphi-2M, BlueDot) enabling early intervention and preemptive healthcare routing."
    },
    {
      icon: Activity,
      title: "Diagnostic Accuracy",
      desc: "AI matches or exceeds human experts in analyzing X-rays, MRIs, and CT scans for cancer, TB, and retinopathy."
    },
    {
      icon: Settings,
      title: "Operational Efficiency",
      desc: "Automates admin workflows, optimizes doctor scheduling, simplifies medical billing, and enhances resource allocation."
    },
    {
      icon: Brain,
      title: "Personalized Medicine",
      desc: "Integrates patient genomics, pathology imaging, and longitudinal EHRs to synthesize personalized patient treatments."
    }
  ];

  return (
    <Container>
      <SubHeading>AI IN HEALTHCARE</SubHeading>
      <Heading gradient>How AI is Shaping Healthcare – The Core Roles</Heading>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column - Intro and Graphic */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
            AI is transitioning medicine from a historical reactive model to a proactive, continuous, and highly personalized paradigm.
          </p>
          
          <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-4/3 bg-dark-surface border border-white/10 group shadow-[0_0_30px_rgba(0,112,243,0.1)]">
            <img 
              src="/assets/custom-medical/tech.png" 
              alt="AI Core Roles" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-brand-cyan/80">
              [SYSTEM ACTIVE] Neural Network Analysis Engine
            </div>
          </div>
        </div>

        {/* Right Column - Roles Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-[1.5px] rounded-2xl overflow-hidden group h-full"
            >
              {/* Border sweep animation */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 via-white/5 to-white/5 group-hover:from-brand-blue group-hover:to-brand-cyan transition-all duration-500 rounded-2xl" />
              
              <div className="relative bg-dark-surface/95 rounded-2xl p-5 md:p-6 flex flex-col h-full z-10 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-4 border border-brand-cyan/20 group-hover:bg-brand-cyan group-hover:text-black transition-all duration-500">
                  <role.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-brand-cyan transition-colors duration-300">
                  {role.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed font-light grow">
                  {role.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

// Slide 3: Key Real-World Applications Already Delivering Value
export const AIKeyApplications = () => {
  const apps = [
    {
      title: "Drug Discovery",
      desc: "Accelerating discovery timelines from decades to months by identifying viable molecular candidates and repurposing established drugs."
    },
    {
      title: "Patient Monitoring & Wearables",
      desc: "Utilizing Apple Watch ECG, Fitbit, and Garmin to track continuous biometrics and catch cardiovascular or physiological anomalies in real time."
    },
    {
      title: "Robotic & AI-Assisted Surgery",
      desc: "Systems like the da Vinci surgical assistant enhance surgeon precision, eliminate physical fatigue tremors, and drastically shorten patient recovery."
    },
    {
      title: "Agentic AI (Multi-Agent Systems)",
      desc: "Advanced cognitive models like MedAgents, TriageAgent, and EHRFlow simulate expert teams to automate electronic health record queries."
    }
  ];

  return (
    <Container>
      <SubHeading>REAL-WORLD VALUE</SubHeading>
      <Heading gradient>Key Real-World Applications Already Delivering Value</Heading>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column - Showcases */}
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-5">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 p-4 rounded-xl hover:bg-white/3 border border-transparent hover:border-white/5 transition-all duration-300 group"
            >
              <div className="text-brand-cyan font-mono text-sm md:text-base font-bold shrink-0 mt-0.5">
                0{i + 1}.
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {app.title}
                </h4>
                <p className="text-white/50 text-xs md:text-sm font-light mt-1 leading-relaxed">
                  {app.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column - Stats Callout & Wearing Image */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-dark-surface border border-white/10 group shadow-[0_0_30px_rgba(0,223,216,0.05)]">
            <img 
              src="/assets/rpm/rpm2.png" 
              alt="Wearables and monitoring" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-[1.5px] rounded-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/40 to-brand-cyan/40" />
            <div className="relative bg-black/95 rounded-2xl p-6 flex flex-col gap-4 border border-white/5 z-10">
              <div className="flex items-center gap-2 text-brand-cyan">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest font-mono">Market Impact Summary</span>
              </div>
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
                <div className="flex flex-col border-r border-white/10 pr-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-gradient">95%</span>
                  <span className="text-[10px] text-white/55 leading-tight mt-1">Healthcare leaders expect GenAI transformation.</span>
                </div>
                <div className="flex flex-col pl-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-gradient">54%</span>
                  <span className="text-[10px] text-white/55 leading-tight mt-1">Already realizing ROI within 1 year of deployment.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

// Slide 4: The ETHICS Framework – Core Challenges After AI Adoption
export const AIEthicsFramework = () => {
  const letters = [
    {
      letter: "E",
      title: "Environmental",
      desc: "High energy consumption, massive carbon footprint, and intensive server water cooling requirements of large model compute clusters.",
      color: "from-emerald-500 to-teal-500",
      accent: "text-emerald-400"
    },
    {
      letter: "T",
      title: "Transparency",
      desc: "Deep neural networks behave as black-box models, making it difficult for clinicians to reverse-engineer or explain the logic behind AI suggestions.",
      color: "from-blue-500 to-indigo-500",
      accent: "text-blue-400"
    },
    {
      letter: "H",
      title: "Hallucinations",
      desc: "Large language models hallucinating plausible-sounding but medically false clinical statements, posing patient risk.",
      color: "from-purple-500 to-fuchsia-500",
      accent: "text-purple-400"
    },
    {
      letter: "I",
      title: "Inclusiveness",
      desc: "Algorithmic bias stemming from historical training data, along with inconsistencies and cultural insensitivity across patient demographics.",
      color: "from-pink-500 to-rose-500",
      accent: "text-rose-400"
    },
    {
      letter: "C",
      title: "Cost",
      desc: "Substantial capital expenditure required for computational infra and challenges integrating models smoothly into clinical staff workflows.",
      color: "from-amber-500 to-orange-500",
      accent: "text-amber-400"
    },
    {
      letter: "S",
      title: "Safety",
      desc: "Security vulnerabilities surrounding sensitive patient health information, including hacking, data breaches, and model poisoning attacks.",
      color: "from-red-500 to-orange-600",
      accent: "text-red-400"
    }
  ];

  return (
    <Container>
      <SubHeading>CHALLENGES</SubHeading>
      <Heading gradient>The ETHICS Framework – Challenges After AI Adoption</Heading>
      
      <p className="text-white/60 font-light text-xs md:text-sm max-w-2xl mb-6 leading-relaxed">
        Medical progress is no longer measured solely by model accuracy. True integration depends on how we address the critical barriers defined by the <span className="font-bold text-brand-cyan">ETHICS</span> framework:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {letters.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group bg-dark-surface/90 rounded-2xl p-4 md:p-5 border border-white/5 flex flex-col h-full transition-all duration-300 hover:border-brand-cyan/20 hover:shadow-[0_0_25px_rgba(0,223,216,0.08)] cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center text-xl md:text-2xl font-black text-white shadow-lg mb-4 shrink-0`}>
              {item.letter}
            </div>
            
            <h4 className={`text-xs md:text-sm font-black uppercase tracking-wider mb-2 ${item.accent}`}>
              {item.title}
            </h4>
            
            <p className="text-white/40 text-[10px] md:text-xs leading-relaxed font-light grow group-hover:text-white/80 transition-colors">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/20 border border-red-500/20 text-red-400 text-[10px] md:text-xs tracking-wider uppercase font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          These are not minor issues – they represent critical barriers to safe deployment.
        </div>
      </div>
    </Container>
  );
};

// Slide 5: Data & Algorithmic Failures
export const AIDataAlgorithmicFailures = () => {
  const failures = [
    {
      title: "Bias & Inequity",
      desc: "Models trained on non-representative datasets fail to generalize. For example, pulse oximetry algorithms perform worse on patients with darker skin tones, directly amplifying medical disparities.",
      icon: Scale
    },
    {
      title: "Hallucinations",
      desc: "In generative models, a confident wrong diagnosis, fake medical citations, or fictitious drug-to-drug interactions are not harmless errors—they present immediate patient safety risks.",
      icon: ShieldAlert
    },
    {
      title: "The Black Box",
      desc: "Clinicians cannot audit the mathematical pathways behind neural net outputs. Ethically and legally, providers cannot rely on decisions they cannot explain or defend in court.",
      icon: Lock
    }
  ];

  return (
    <Container>
      <SubHeading>RISKS & FAILURES</SubHeading>
      <Heading gradient>Data & Algorithmic Failures</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column - Detailed Cards */}
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
          {failures.map((fail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 md:gap-5 p-5 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-brand-blue/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20 group-hover:bg-red-500 group-hover:text-black transition-all duration-500">
                <fail.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {fail.title}
                </h3>
                <p className="text-white/55 text-xs md:text-sm font-light mt-1.5 leading-relaxed">
                  {fail.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column - Reference Visual & Warning Quote */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-dark-surface border border-white/10 group shadow-[0_0_30px_rgba(239,68,68,0.05)]">
            <img 
              src="/assets/custom-medical/compliance.png" 
              alt="Data Failures" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="relative bg-linear-to-r from-red-950/30 to-red-900/10 p-5 rounded-2xl border border-red-500/20 text-center">
            <span className="text-3xl font-serif text-red-500/40 block mb-1">“</span>
            <p className="text-xs md:text-sm text-red-200 font-medium italic leading-relaxed">
              &quot;Garbage in, garbage out&quot; is not an academic minor warning when lives are at stake.
            </p>
            <span className="text-3xl font-serif text-red-500/40 block leading-none mt-2">”</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

// Slide 6: Human & Systemic Barriers
export const AIHumanSystemicBarriers = () => {
  const barriers = [
    {
      title: "Workflow Integration",
      desc: "Poorly designed AI tools disrupt clinician care patterns. Adding fragmented software panels increases administrative overhead rather than streamlining patient bedside engagement."
    },
    {
      title: "Trust & Literacy Gap",
      desc: "The majority of frontline nurses, clinical assistants, and physicians lack formal training in medical AI, fueling professional skepticism and high public distrust."
    },
    {
      title: "Accountability & Liability",
      desc: "If a multi-agent diagnostic suite recommends a false treatment direction, it remains unclear who carries the legal liability—the software company, the hospital, or the licensed doctor."
    },
    {
      title: "Cost & Infrastructure",
      desc: "Premium clinical systems require astronomical budgets. A single multi-agent healthcare pilot using GPT-4 cost $172,705 in API queries—making it unattainable for smaller community clinics."
    }
  ];

  return (
    <Container>
      <SubHeading>RISKS & FAILURES</SubHeading>
      <Heading gradient>Human & Systemic Barriers</Heading>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column - Graphic/Personas */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-4/3 bg-dark-surface border border-white/10 group shadow-[0_0_30px_rgba(0,112,243,0.05)]">
            <img 
              src="/assets/custom-medical/3persona.png" 
              alt="Systemic Barriers" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/20 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-[11px] md:text-xs text-orange-300/80 leading-relaxed font-light">
              Without active mitigation, advanced medical AI risks creating a <span className="font-bold text-orange-400">two-tiered healthcare system</span> where elite institutions benefit from AI co-pilots while resource-limited settings are left behind.
            </p>
          </div>
        </div>

        {/* Right Column - Barriers List */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {barriers.map((bar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-white/3 border border-white/5 hover:border-orange-500/30 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="text-orange-400 font-mono text-xs font-bold mb-2">
                BARRIER 0{i + 1}
              </div>
              <h4 className="text-sm md:text-base font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                {bar.title}
              </h4>
              <p className="text-white/50 text-xs leading-relaxed font-light grow">
                {bar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

// Slide 7: Solution 1 – Technical Mitigations
export const AITechnicalMitigations = () => {
  const solutions = [
    {
      challenge: "Bias & Inequity",
      solution: "Diverse & Representative Datasets",
      details: "Enforce multi-institutional data curation from ethnically diverse pools, backed by routine algorithmic equity audits to monitor drift across patient demographics.",
      gradient: "from-blue-500/20 to-cyan-500/5",
      border: "hover:border-cyan-500/35"
    },
    {
      challenge: "Hallucinations",
      solution: "RAG & Human-in-the-Loop",
      details: "Utilize Retrieval-Augmented Generation grounded in certified clinical knowledge bases. Force mandatory expert verification checkpoints before final record execution.",
      gradient: "from-purple-500/20 to-fuchsia-500/5",
      border: "hover:border-purple-500/35"
    },
    {
      challenge: "Black Box",
      solution: "Explainable AI (XAI)",
      details: "Deploy SHAP and feature relevance visualizers. Co-design UI dashboards alongside clinicians to display clear, plain-language reasoning for deep network alerts.",
      gradient: "from-emerald-500/20 to-teal-500/5",
      border: "hover:border-emerald-500/35"
    },
    {
      challenge: "Security Risks",
      solution: "Federated Learning & Crypto",
      details: "Train algorithms collaboratively across hospitals using federated structures, keeping patient records secure inside local firewall environments.",
      gradient: "from-red-500/20 to-orange-500/5",
      border: "hover:border-red-500/35"
    }
  ];

  return (
    <Container>
      <SubHeading>MITIGATION STRATEGIES</SubHeading>
      <Heading gradient>Solution 1 – Technical Mitigations</Heading>
      
      <p className="text-white/50 font-light text-xs md:text-sm max-w-2xl mb-6">
        Technology alone is not a silver bullet, but without implementing these engineering guardrails, healthcare AI remains unsafe for clinical deployment:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {solutions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-white/5 ${item.border} transition-all duration-500 flex flex-col justify-between`}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-white/40 tracking-wider uppercase font-mono">Challenge: {item.challenge}</span>
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-white mb-2">
                {item.solution}
              </h3>
              <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
                {item.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center text-xs text-brand-cyan/60 font-mono">
        [REASSESSMENT REQUIRED] Automated Drift & Compliance Audits Enabled
      </div>
    </Container>
  );
};

// Slide 8: Solution 2 – Human & Workflow Integration
export const AIHumanWorkflowIntegration = () => {
  const steps = [
    {
      level: "High Confidence",
      action: "Autonomous Action with Logging",
      desc: "For routine, administrative, or low-risk transactions, the AI proceeds autonomously while generating detailed audit logs.",
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    },
    {
      level: "Medium Confidence",
      action: "Flag for Clinician Review",
      desc: "AI presents its reasoning, SHAP metrics, and references, prompting the human doctor to review and verify the findings.",
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30"
    },
    {
      level: "Low Confidence",
      action: "Block & Escalate with Context",
      desc: "AI automatically blocks its action, avoids sending alert notifications, and passes the clinical file to senior staff.",
      color: "bg-red-500/20 text-red-400 border-red-500/30"
    }
  ];

  return (
    <Container>
      <SubHeading>MITIGATION STRATEGIES</SubHeading>
      <Heading gradient>Solution 2 – Human & Workflow Integration</Heading>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column - Spacing, Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0 border border-brand-cyan/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white">Mandatory AI Literacy Programs</h4>
                <p className="text-white/50 text-xs md:text-sm font-light mt-1 leading-relaxed">
                  Establish certified education paths for nurses, pharmacists, and surgeons to understand decision outputs and confidently spot algorithmic errors.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/20">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white">Ethical Leadership Oversight</h4>
                <p className="text-white/50 text-xs md:text-sm font-light mt-1 leading-relaxed">
                  Appoint a Chief AI Officer and form independent oversight boards to review software metrics, verify fairness, and govern deployment guidelines.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video bg-dark-surface border border-white/10 group shadow-[0_0_30px_rgba(0,112,243,0.05)]">
            <img 
              src="/assets/custom-medical/it2.png" 
              alt="Workflow Integration" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <p className="text-xs text-brand-cyan/80 font-mono italic">
            &quot;AI should operate as a supportive co-pilot, not an autopilot. The licensed human provider always stays in charge.&quot;
          </p>
        </div>

        {/* Right Column - Confidence-Based Escalation Flow */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h4 className="text-xs md:text-sm font-black uppercase tracking-widest text-brand-cyan mb-2 font-mono">
            Confidence-Based Escalation Flow
          </h4>
          
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-stretch group">
                {/* Timeline: circle + connector centered on the number */}
                <div className="flex flex-col items-center shrink-0 w-12">
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-white/10 flex items-center justify-center font-mono text-sm text-white/40 shrink-0 z-10 transition-colors duration-500 group-hover:border-brand-cyan/50 group-hover:text-brand-cyan">
                    0{i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-4 bg-white/10 mt-2" aria-hidden />
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex-1 min-w-0 p-5 rounded-2xl bg-white/3 border border-white/5 hover:border-brand-blue/35 transition-all duration-300 group"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${step.color}`}>
                      {step.level}
                    </span>
                    <h5 className="text-sm md:text-base font-bold text-white">
                      {step.action}
                    </h5>
                  </div>
                  <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

// Slide 9: Solution 3 – Regulatory & Structural Roadmap
export const AIRegulatoryRoadmap = () => {
  const steps = [
    {
      title: "Prospective Clinical Trials",
      desc: "Mandate prospective clinical validations in real clinical workflows—not just retrospective dataset studies—before FDA or CE approval."
    },
    {
      title: "Continuous Post-Market Monitoring",
      desc: "Implement automated data auditing systems to watch for model drift, verify output quality, and safely sunset outdated models."
    },
    {
      title: "Interoperability Standards",
      desc: "Enforce secure, standard data schemas like FHIR and secure APIs to ensure seamless clinical records transfer and multi-hospital integrations."
    },
    {
      title: "Support for Resource-Limited Settings",
      desc: "Lobby for government grants and foundations to subsidize modern AI access in community clinics and low-and-middle-income countries (LMICs)."
    }
  ];

  return (
    <Container>
      <SubHeading>MITIGATION STRATEGIES</SubHeading>
      <Heading gradient>Solution 3 – Regulatory & Structural Roadmap</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column - Roadmap items */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-brand-blue/35 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center font-bold text-xs mb-3 border border-brand-cyan/20">
                0{i + 1}
              </div>
              <h4 className="text-sm md:text-base font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                {step.title}
              </h4>
              <p className="text-white/50 text-xs leading-relaxed font-light grow">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right Column - Compliance image & callout */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-dark-surface border border-white/10 group shadow-[0_0_30px_rgba(0,112,243,0.05)]">
            <img 
              src="/assets/custom-medical/compliance.png" 
              alt="Compliance Roadmap" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="relative p-[1.5px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/40 to-brand-blue/40" />
            <div className="relative bg-black/95 rounded-2xl p-5 border border-white/5 z-10 flex flex-col items-center text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-2">Equity Integration</span>
              <p className="text-xs md:text-sm text-white/80 font-light leading-relaxed">
                Health equity must be actively engineered into models from day one, not treated as a compliance afterthought.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// Slide 10: CEO Call to Action – Strategic Summary
export const AICeocallToAction = () => {
  const commitments = [
    { title: "People over profits", desc: "Actively prevent patient inequity by design, auditing systems to protect underserved communities." },
    { title: "Invest in data infrastructure", desc: "Build standard, secure, and interoperable data foundations under strict governance protocols." },
    { title: "Demand transparency", desc: "Decline and reject black-box models in safety-critical medical decision workflows." },
    { title: "Commit to continuous learning", desc: "Constantly audit models, retrain on fresh patient data, and upskill frontline staff." },
    { title: "Collaborate on regulation", desc: "Partner alongside policymakers to structure agile, evidence-based regulatory rules." }
  ];

  return (
    <Container>
      <SubHeading>RESPONSIBLE AI ADOPTION</SubHeading>
      <Heading gradient>Summary</Heading>
      
      <p className="text-white/60 font-light text-xs md:text-sm max-w-2xl mb-6 md:mb-8 leading-relaxed">
        To guide our healthcare institutions safely through the AI revolution, we pledge five strategic commitments:
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column - Pledges */}
        <div className="lg:col-span-7 flex flex-col gap-3 md:gap-4">
          {commitments.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 items-start p-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-brand-blue/35 transition-all duration-300 group"
            >
              <div className="w-6 h-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan flex items-center justify-center shrink-0 text-xs font-bold font-mono group-hover:bg-brand-cyan group-hover:text-black transition-colors duration-300 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h4>
                <p className="text-white/50 text-xs md:text-sm font-light mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column - Final Tagline Box */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-dark-surface border border-white/10 group shadow-[0_0_30px_rgba(0,112,243,0.05)]">
            <img 
              src="/assets/custom-medical/Integration.png" 
              alt="CEO Action" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-[1.5px] rounded-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/40 to-brand-blue/40" />
            <div className="relative bg-black/95 rounded-2xl p-6 border border-white/5 z-10 flex flex-col gap-3">
              <span className="text-3xl font-serif text-brand-cyan leading-none">&ldquo;</span>
              <p className="text-sm md:text-base text-white/90 font-medium italic leading-relaxed text-center">
                AI will revolutionize healthcare – but only if we lead with ethics, equity, and evidence.
              </p>
              <span className="text-3xl font-serif text-brand-cyan leading-none text-right">&rdquo;</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};
