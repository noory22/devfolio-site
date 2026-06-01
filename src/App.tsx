import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Capabilities from "./components/Capabilities";
import Labs from "./components/Labs";
// import Regulatory from "./components/Regulatory";
import Contact from "./components/Contact";
import { motion, AnimatePresence } from "motion/react";
import * as AIContent from "./components/AIContent";

// --- Unique transition variants per slide ---
const slideTransitions = [
  // 0: Hero
  {
    initial: { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
    animate: { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  },
  // 1: CEO Intro
  {
    initial: { opacity: 0, clipPath: "circle(0% at 50% 50%)", scale: 0.95 },
    animate: { opacity: 1, clipPath: "circle(100% at 50% 50%)", scale: 1, transition: { duration: 1.2 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  },
  // 2: Software Team
  {
    initial: { opacity: 0, clipPath: "inset(20% 0% 20% 0%)", scale: 0.9 },
    animate: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1, transition: { duration: 1.2 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  },
  // 3: RMT Background
  {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
  },
  // 4: RMT Background 2
  {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
  },
  // 5: Our Company
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 1.2, transition: { duration: 0.5 } },
  },
  // 6: One Stop Destination
  {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 1.1, transition: { duration: 0.5 } },
  },
  // 7: Services Intro
  {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -100, transition: { duration: 0.5 } },
  },
  // 8-16: AI Slides (9 slides, using horizontal slide transition)
  ...Array(9).fill(null).map(() => ({
    initial: { opacity: 0, x: 150 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, x: -150, transition: { duration: 0.5, ease: "easeIn" } },
  })),
  // 17 to 48: Services and other slides (using vertical transition)
  ...Array(32).fill(null).map(() => ({
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -100, transition: { duration: 0.5 } },
  }))
];


// Content Component imports
import * as Content from "./components/AppContent";

const slideComponents = [
  Hero,
  Content.CEOIntro,
  Content.SoftwareTeam,
  Content.RMTBackground,
  Content.RMTBackground2,
  Content.OurCompany,
  // Content.GlobalLocations,
  // Content.AnimatedMap,
  Content.OneStopDestination,
  Content.ServicesIntro,
  
  // AI Section
  AIContent.AIShapingHealthcare,
  AIContent.AIKeyApplications,
  AIContent.AIEthicsFramework,
  AIContent.AIDataAlgorithmicFailures,
  AIContent.AIHumanSystemicBarriers,
  AIContent.AITechnicalMitigations,
  AIContent.AIHumanWorkflowIntegration,
  AIContent.AIRegulatoryRoadmap,
  AIContent.AICeocallToAction,

  // Services Section
  Content.ServicesCategories,
  Content.Cat1Details,
  Content.GenerativeAiDetail,
  Content.ClinicalDecisionSupportDetail,
  Content.PredictiveHealthAnalyticsDetail,
  Content.CustomAiDetail,
  Content.BillingEfficiencyDetail,
  Content.Cat2Details,
  Content.CustomMedicalApplicationsDetail,
  Content.MedicalMobileAppsDetail,
  Content.StoreDeploymentDetail,
  Content.RpmDetail,
  Content.EhrDetail,
  Content.ImagingAnalysisDetail,
  Content.Cat3Details,
  Content.SchedulerDetail,
  Content.WorkflowOrchestrationDetail,
  Content.RecommendationEnginesDetail,
  Content.Cat5Details,
  Content.QaMedicalSoftwareDetail,
  Content.Iec62304ComplianceDetail,
  Content.HipaaComplianceDetail,
  Content.OncCertificationDetail,
  Content.FhirIntegrationDetail,
  Content.Cat4Details,
  Content.DevOpsCloudInfrastructureDetail,
  Content.SaaSEnablementDetail,
  Content.QaValidationDetail,
  Content.OngoingMaintenanceDetail,
  // Regulatory,
  Content.Accomplishments,
  Content.Testimonials,
  Content.ThankYou
];

const TOTAL_SLIDES = slideComponents.length;

// Direction-aware variants: swap initial/exit when going backward
function getDirectionVariants(slideIndex: number, direction: number) {
  const base = slideTransitions[slideIndex];
  if (!base) return slideTransitions[0];
  if (direction >= 0) {
    return base;
  }
  // Going backward: swap initial and exit so it feels like reversing
  return {
    initial: base.exit,
    animate: base.animate,
    exit: base.initial,
  };
}

import * as Backgrounds from "./components/Backgrounds";

const BackgroundMapping = [
  Backgrounds.BubblesBG,      // 0: Hero
  Backgrounds.AuroraBG,       // 1: CEO Intro
  Backgrounds.TechNetworkBG,  // 2: Software Team
  Backgrounds.FloatingCubesBG,// 3: RMT Background
  Backgrounds.FloatingCubesBG,// 4: RMT Background 2
  Backgrounds.AuroraBG,       // 5: Our Company
  Backgrounds.AuroraBG,       // 6: One Stop Destination
  Backgrounds.AuroraBG,       // 7: Services Intro

  // AI Section (8 to 16)
  Backgrounds.DNAHelixBG,     // 8: AI Shaping Healthcare
  Backgrounds.TechNetworkBG,  // 9: AI Key Applications
  Backgrounds.GridPulseBG,    // 10: AI Ethics Framework
  Backgrounds.DNAHelixBG,     // 11: AI Data Algorithmic Failures
  Backgrounds.FloatingCubesBG,// 12: AI Human Systemic Barriers
  Backgrounds.TechNetworkBG,  // 13: AI Technical Mitigations
  Backgrounds.GridPulseBG,    // 14: AI Human Workflow Integration
  Backgrounds.DNAHelixBG,     // 15: AI Regulatory Roadmap
  Backgrounds.AuroraBG,       // 16: CEO Call to Action

  // Services Section (17 to 48)
  () => null,                 // 17: Categories
  Backgrounds.TechNetworkBG,  // 18: Cat 1 Details
  Backgrounds.TechNetworkBG,  // 19: Generative AI Detail
  Backgrounds.TechNetworkBG,  // 20: Clinical Decision Support Detail
  Backgrounds.TechNetworkBG,  // 21: Predictive Health Analytics Detail
  Backgrounds.TechNetworkBG,  // 22: Custom AI Detail
  Backgrounds.TechNetworkBG,  // 23: Billing Efficiency Detail
  Backgrounds.FloatingCubesBG,// 24: Cat 2 Details
  Backgrounds.AuroraBG,       // 25: Custom Medical Applications Detail
  Backgrounds.FloatingCubesBG,// 26: Medical Mobile Apps Detail
  Backgrounds.TechNetworkBG,  // 27: Store Deployment Detail
  Backgrounds.DNAHelixBG,     // 28: RPM Detail
  Backgrounds.TechNetworkBG,  // 29: EHR Detail
  Backgrounds.GridPulseBG,    // 30: Imaging Analysis Detail
  Backgrounds.AuroraBG,       // 31: Cat 3 Details
  Backgrounds.TechNetworkBG,  // 32: Scheduler Detail
  Backgrounds.GridPulseBG,    // 33: Workflow Orchestration Detail
  Backgrounds.DNAHelixBG,     // 34: Recommendation Engines Detail
  Backgrounds.DNAHelixBG,     // 35: Cat 5 Details (Software Compliance)
  Backgrounds.TechNetworkBG,  // 36: QA Medical Software Detail
  Backgrounds.GridPulseBG,    // 37: IEC 62304 Compliance Detail
  Backgrounds.DNAHelixBG,     // 38: HIPAA Compliance Detail
  Backgrounds.GridPulseBG,    // 39: ONC Health IT Detail
  Backgrounds.TechNetworkBG,  // 40: FHIR Integration Detail
  Backgrounds.GridPulseBG,    // 41: Cat 4 Details (Infrastructure)
  Backgrounds.TechNetworkBG,  // 42: DevOps Detail
  Backgrounds.DNAHelixBG,     // 43: SaaS Detail
  Backgrounds.GridPulseBG,    // 44: QA Validation Detail
  Backgrounds.FloatingCubesBG,// 45: Ongoing Maintenance Detail
  Backgrounds.TechNetworkBG,  // 46: Accomplishments
  Backgrounds.GridPulseBG,    // 47: Testimonials
  Backgrounds.AuroraBG,       // 48: Thank You
];

import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGenerativeAiDetail, setShowGenerativeAiDetail] = useState(false);
  const [showClinicalDecisionSupportDetail, setShowClinicalDecisionSupportDetail] = useState(false);
  const [showPredictiveHealthDetail, setShowPredictiveHealthDetail] = useState(false);
  const [showCustomAiDetail, setShowCustomAiDetail] = useState(false);
  const [showBillingEfficiencyDetail, setShowBillingEfficiencyDetail] = useState(false);
  const [showCustomMedicalDetail, setShowCustomMedicalDetail] = useState(false);
  const [showMedicalMobileDetail, setShowMedicalMobileDetail] = useState(false);
  const [showStoreDeploymentDetail, setShowStoreDeploymentDetail] = useState(false);
  const [showRpmDetail, setShowRpmDetail] = useState(false);
  const [showEhrDetail, setShowEhrDetail] = useState(false);
  const [showImagingDetail, setShowImagingDetail] = useState(false);
  const [showSchedulerDetail, setShowSchedulerDetail] = useState(false);
  const [showWorkflowDetail, setShowWorkflowDetail] = useState(false);
  const [showRecommendationDetail, setShowRecommendationDetail] = useState(false);
  const [showQaMedicalDetail, setShowQaMedicalDetail] = useState(false);
  const [showIec62304Detail, setShowIec62304Detail] = useState(false);
  const [showHipaaDetail, setShowHipaaDetail] = useState(false);
  const [showOncDetail, setShowOncDetail] = useState(false);
  const [showFhirDetail, setShowFhirDetail] = useState(false);
  const [showDevOpsDetail, setShowDevOpsDetail] = useState(false);
  const [showSaaSDetail, setShowSaaSDetail] = useState(false);
  const [showQaValidationDetail, setShowQaValidationDetail] = useState(false);
  const [showMaintenanceDetail, setShowMaintenanceDetail] = useState(false);

  const GENERATIVE_AI_DETAIL_SLIDE = 19;
  const CLINICAL_DECISION_SUPPORT_DETAIL_SLIDE = 20;
  const PREDICTIVE_HEALTH_DETAIL_SLIDE = 21;
  const CUSTOM_AI_DETAIL_SLIDE = 22;
  const BILLING_EFFICIENCY_DETAIL_SLIDE = 23;
  const CUSTOM_MEDICAL_DETAIL_SLIDE = 25;
  const MEDICAL_MOBILE_DETAIL_SLIDE = 26;
  const STORE_DEPLOYMENT_DETAIL_SLIDE = 27;
  const RPM_DETAIL_SLIDE = 28;
  const EHR_DETAIL_SLIDE = 29;
  const IMAGING_DETAIL_SLIDE = 30;
  const SCHEDULER_DETAIL_SLIDE = 32;
  const WORKFLOW_ORCHESTRATION_DETAIL_SLIDE = 33;
  const RECOMMENDATION_DETAIL_SLIDE = 34;
  const QA_MEDICAL_DETAIL_SLIDE = 36;
  const IEC_62304_DETAIL_SLIDE = 37;
  const HIPAA_DETAIL_SLIDE = 38;
  const ONC_DETAIL_SLIDE = 39;
  const FHIR_DETAIL_SLIDE = 40;
  const DEVOPS_DETAIL_SLIDE = 42;
  const SAAS_DETAIL_SLIDE = 43;
  const QA_VALIDATION_DETAIL_SLIDE = 44;
  const MAINTENANCE_DETAIL_SLIDE = 45;

  // Cooldown for scroll/wheel navigation
  const lastScrollTime = useRef(0);
  const SCROLL_COOLDOWN = 1000;

  const isServices = currentSlide >= 17 && currentSlide <= 45;

  const isHiddenSlide = useCallback((index: number) => (
    (index === GENERATIVE_AI_DETAIL_SLIDE && !showGenerativeAiDetail) ||
    (index === CLINICAL_DECISION_SUPPORT_DETAIL_SLIDE && !showClinicalDecisionSupportDetail) ||
    (index === PREDICTIVE_HEALTH_DETAIL_SLIDE && !showPredictiveHealthDetail) ||
    (index === CUSTOM_AI_DETAIL_SLIDE && !showCustomAiDetail) ||
    (index === BILLING_EFFICIENCY_DETAIL_SLIDE && !showBillingEfficiencyDetail) ||
    (index === CUSTOM_MEDICAL_DETAIL_SLIDE && !showCustomMedicalDetail) ||
    (index === MEDICAL_MOBILE_DETAIL_SLIDE && !showMedicalMobileDetail) ||
    (index === STORE_DEPLOYMENT_DETAIL_SLIDE && !showStoreDeploymentDetail) ||
    (index === RPM_DETAIL_SLIDE && !showRpmDetail) ||
    (index === EHR_DETAIL_SLIDE && !showEhrDetail) ||
    (index === IMAGING_DETAIL_SLIDE && !showImagingDetail) ||
    (index === SCHEDULER_DETAIL_SLIDE && !showSchedulerDetail) ||
    (index === WORKFLOW_ORCHESTRATION_DETAIL_SLIDE && !showWorkflowDetail) ||
    (index === RECOMMENDATION_DETAIL_SLIDE && !showRecommendationDetail) ||
    (index === QA_MEDICAL_DETAIL_SLIDE && !showQaMedicalDetail) ||
    (index === IEC_62304_DETAIL_SLIDE && !showIec62304Detail) ||
    (index === HIPAA_DETAIL_SLIDE && !showHipaaDetail) ||
    (index === ONC_DETAIL_SLIDE && !showOncDetail) ||
    (index === FHIR_DETAIL_SLIDE && !showFhirDetail) ||
    (index === DEVOPS_DETAIL_SLIDE && !showDevOpsDetail) ||
    (index === SAAS_DETAIL_SLIDE && !showSaaSDetail) ||
    (index === QA_VALIDATION_DETAIL_SLIDE && !showQaValidationDetail) ||
    (index === MAINTENANCE_DETAIL_SLIDE && !showMaintenanceDetail)
  ), [
    GENERATIVE_AI_DETAIL_SLIDE, CLINICAL_DECISION_SUPPORT_DETAIL_SLIDE, PREDICTIVE_HEALTH_DETAIL_SLIDE,
    CUSTOM_AI_DETAIL_SLIDE, BILLING_EFFICIENCY_DETAIL_SLIDE,
    CUSTOM_MEDICAL_DETAIL_SLIDE, MEDICAL_MOBILE_DETAIL_SLIDE, STORE_DEPLOYMENT_DETAIL_SLIDE, RPM_DETAIL_SLIDE, EHR_DETAIL_SLIDE, IMAGING_DETAIL_SLIDE, SCHEDULER_DETAIL_SLIDE, WORKFLOW_ORCHESTRATION_DETAIL_SLIDE, RECOMMENDATION_DETAIL_SLIDE,
    QA_MEDICAL_DETAIL_SLIDE, IEC_62304_DETAIL_SLIDE, HIPAA_DETAIL_SLIDE, ONC_DETAIL_SLIDE, FHIR_DETAIL_SLIDE,
    DEVOPS_DETAIL_SLIDE, SAAS_DETAIL_SLIDE, QA_VALIDATION_DETAIL_SLIDE, MAINTENANCE_DETAIL_SLIDE,
    showGenerativeAiDetail, showClinicalDecisionSupportDetail, showPredictiveHealthDetail,
    showCustomAiDetail, showBillingEfficiencyDetail,
    showCustomMedicalDetail, showMedicalMobileDetail, showStoreDeploymentDetail, showRpmDetail, showEhrDetail, showImagingDetail, showSchedulerDetail, showWorkflowDetail, showRecommendationDetail,
    showQaMedicalDetail, showIec62304Detail, showHipaaDetail, showOncDetail, showFhirDetail,
    showDevOpsDetail, showSaaSDetail, showQaValidationDetail, showMaintenanceDetail
  ]);

  const getCategoryRange = (index: number) => {
    if (index < 8) return [0, 7];      // Intro (Slides 0-7)
    if (index >= 8 && index < 17) return [8, 16]; // AI Section (Slides 8-16)
    return [17, TOTAL_SLIDES - 1];      // Services, Accomplishments & Thank You
  };

  const [min, max] = getCategoryRange(currentSlide);
  const sectionSlidesTotal = max - min + 1;

  const navigateTo = useCallback(
    (target: number) => {
      if (target === currentSlide || isTransitioning) return;
      const clamped = Math.max(0, Math.min(target, TOTAL_SLIDES - 1));
      if (isHiddenSlide(clamped) && clamped !== currentSlide) return;
      if (clamped === currentSlide) return;

      // Explicitly allow cross-section navigation only if it's a jump (e.g. from Navbar)
      // or if we decide to allow it. For now, we'll keep it simple as navigateTo is low-level.
      setDirection(clamped > currentSlide ? 1 : -1);
      setIsTransitioning(true);
      setCurrentSlide(clamped);
      if (currentSlide === GENERATIVE_AI_DETAIL_SLIDE && clamped !== GENERATIVE_AI_DETAIL_SLIDE) {
        setShowGenerativeAiDetail(false);
      }
      if (currentSlide === CLINICAL_DECISION_SUPPORT_DETAIL_SLIDE && clamped !== CLINICAL_DECISION_SUPPORT_DETAIL_SLIDE) {
        setShowClinicalDecisionSupportDetail(false);
      }
      if (currentSlide === PREDICTIVE_HEALTH_DETAIL_SLIDE && clamped !== PREDICTIVE_HEALTH_DETAIL_SLIDE) {
        setShowPredictiveHealthDetail(false);
      }
      if (currentSlide === CUSTOM_AI_DETAIL_SLIDE && clamped !== CUSTOM_AI_DETAIL_SLIDE) {
        setShowCustomAiDetail(false);
      }
      if (currentSlide === BILLING_EFFICIENCY_DETAIL_SLIDE && clamped !== BILLING_EFFICIENCY_DETAIL_SLIDE) {
        setShowBillingEfficiencyDetail(false);
      }
      if (currentSlide === CUSTOM_MEDICAL_DETAIL_SLIDE && clamped !== CUSTOM_MEDICAL_DETAIL_SLIDE) {
        setShowCustomMedicalDetail(false);
      }
      if (currentSlide === MEDICAL_MOBILE_DETAIL_SLIDE && clamped !== MEDICAL_MOBILE_DETAIL_SLIDE) {
        setShowMedicalMobileDetail(false);
      }
      if (currentSlide === STORE_DEPLOYMENT_DETAIL_SLIDE && clamped !== STORE_DEPLOYMENT_DETAIL_SLIDE) {
        setShowStoreDeploymentDetail(false);
      }
      if (currentSlide === RPM_DETAIL_SLIDE && clamped !== RPM_DETAIL_SLIDE) {
        setShowRpmDetail(false);
      }
      if (currentSlide === EHR_DETAIL_SLIDE && clamped !== EHR_DETAIL_SLIDE) {
        setShowEhrDetail(false);
      }
      if (currentSlide === IMAGING_DETAIL_SLIDE && clamped !== IMAGING_DETAIL_SLIDE) {
        setShowImagingDetail(false);
      }
      if (currentSlide === SCHEDULER_DETAIL_SLIDE && clamped !== SCHEDULER_DETAIL_SLIDE) {
        setShowSchedulerDetail(false);
      }
      if (currentSlide === WORKFLOW_ORCHESTRATION_DETAIL_SLIDE && clamped !== WORKFLOW_ORCHESTRATION_DETAIL_SLIDE) {
        setShowWorkflowDetail(false);
      }
      if (currentSlide === RECOMMENDATION_DETAIL_SLIDE && clamped !== RECOMMENDATION_DETAIL_SLIDE) {
        setShowRecommendationDetail(false);
      }
      if (currentSlide === QA_MEDICAL_DETAIL_SLIDE && clamped !== QA_MEDICAL_DETAIL_SLIDE) {
        setShowQaMedicalDetail(false);
      }
      if (currentSlide === IEC_62304_DETAIL_SLIDE && clamped !== IEC_62304_DETAIL_SLIDE) {
        setShowIec62304Detail(false);
      }
      if (currentSlide === HIPAA_DETAIL_SLIDE && clamped !== HIPAA_DETAIL_SLIDE) {
        setShowHipaaDetail(false);
      }
      if (currentSlide === ONC_DETAIL_SLIDE && clamped !== ONC_DETAIL_SLIDE) {
        setShowOncDetail(false);
      }
      if (currentSlide === FHIR_DETAIL_SLIDE && clamped !== FHIR_DETAIL_SLIDE) {
        setShowFhirDetail(false);
      }
      if (currentSlide === DEVOPS_DETAIL_SLIDE && clamped !== DEVOPS_DETAIL_SLIDE) {
        setShowDevOpsDetail(false);
      }
      if (currentSlide === SAAS_DETAIL_SLIDE && clamped !== SAAS_DETAIL_SLIDE) {
        setShowSaaSDetail(false);
      }
      if (currentSlide === QA_VALIDATION_DETAIL_SLIDE && clamped !== QA_VALIDATION_DETAIL_SLIDE) {
        setShowQaValidationDetail(false);
      }
      if (currentSlide === MAINTENANCE_DETAIL_SLIDE && clamped !== MAINTENANCE_DETAIL_SLIDE) {
        setShowMaintenanceDetail(false);
      }
    },
    [currentSlide, isTransitioning, isHiddenSlide]
  );

  const getNextVisibleSlide = useCallback((from: number) => {
    const [, max] = getCategoryRange(from);
    let next = from + 1;
    while (next <= max && isHiddenSlide(next)) next += 1;
    return next <= max ? next : null;
  }, [isHiddenSlide]);

  const getPrevVisibleSlide = useCallback((from: number) => {
    const [min,] = getCategoryRange(from);
    let prev = from - 1;
    while (prev >= min && isHiddenSlide(prev)) prev -= 1;
    return prev >= min ? prev : null;
  }, [isHiddenSlide]);

  const goToNext = useCallback(() => {
    const nextSlide = getNextVisibleSlide(currentSlide);
    if (nextSlide !== null) navigateTo(nextSlide);
  }, [currentSlide, getNextVisibleSlide, navigateTo]);

  const goToPrev = useCallback(() => {
    const prevSlide = getPrevVisibleSlide(currentSlide);
    if (prevSlide !== null) navigateTo(prevSlide);
  }, [currentSlide, getPrevVisibleSlide, navigateTo]);

  const openGenerativeAiDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowGenerativeAiDetail(true);
    setDirection(GENERATIVE_AI_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(GENERATIVE_AI_DETAIL_SLIDE);
  }, [GENERATIVE_AI_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openClinicalDecisionSupportDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowClinicalDecisionSupportDetail(true);
    setDirection(CLINICAL_DECISION_SUPPORT_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(CLINICAL_DECISION_SUPPORT_DETAIL_SLIDE);
  }, [CLINICAL_DECISION_SUPPORT_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openPredictiveHealthDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowPredictiveHealthDetail(true);
    setDirection(PREDICTIVE_HEALTH_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(PREDICTIVE_HEALTH_DETAIL_SLIDE);
  }, [PREDICTIVE_HEALTH_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openCustomAiDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowCustomAiDetail(true);
    setDirection(CUSTOM_AI_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(CUSTOM_AI_DETAIL_SLIDE);
  }, [CUSTOM_AI_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openBillingEfficiencyDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowBillingEfficiencyDetail(true);
    setDirection(BILLING_EFFICIENCY_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(BILLING_EFFICIENCY_DETAIL_SLIDE);
  }, [BILLING_EFFICIENCY_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openCustomMedicalDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowCustomMedicalDetail(true);
    setDirection(CUSTOM_MEDICAL_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(CUSTOM_MEDICAL_DETAIL_SLIDE);
  }, [CUSTOM_MEDICAL_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openMedicalMobileDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowMedicalMobileDetail(true);
    setDirection(MEDICAL_MOBILE_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(MEDICAL_MOBILE_DETAIL_SLIDE);
  }, [MEDICAL_MOBILE_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openStoreDeploymentDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowStoreDeploymentDetail(true);
    setDirection(STORE_DEPLOYMENT_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(STORE_DEPLOYMENT_DETAIL_SLIDE);
  }, [STORE_DEPLOYMENT_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openRpmDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowRpmDetail(true);
    setDirection(RPM_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(RPM_DETAIL_SLIDE);
  }, [RPM_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openEhrDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowEhrDetail(true);
    setDirection(EHR_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(EHR_DETAIL_SLIDE);
  }, [EHR_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openImagingDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowImagingDetail(true);
    setDirection(IMAGING_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(IMAGING_DETAIL_SLIDE);
  }, [IMAGING_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openSchedulerDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowSchedulerDetail(true);
    setDirection(SCHEDULER_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(SCHEDULER_DETAIL_SLIDE);
  }, [SCHEDULER_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openWorkflowDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowWorkflowDetail(true);
    setDirection(WORKFLOW_ORCHESTRATION_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(WORKFLOW_ORCHESTRATION_DETAIL_SLIDE);
  }, [WORKFLOW_ORCHESTRATION_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openRecommendationDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowRecommendationDetail(true);
    setDirection(RECOMMENDATION_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(RECOMMENDATION_DETAIL_SLIDE);
  }, [RECOMMENDATION_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openQaMedicalDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowQaMedicalDetail(true);
    setDirection(QA_MEDICAL_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(QA_MEDICAL_DETAIL_SLIDE);
  }, [QA_MEDICAL_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openIec62304Detail = useCallback(() => {
    if (isTransitioning) return;
    setShowIec62304Detail(true);
    setDirection(IEC_62304_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(IEC_62304_DETAIL_SLIDE);
  }, [IEC_62304_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openHipaaDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowHipaaDetail(true);
    setDirection(HIPAA_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(HIPAA_DETAIL_SLIDE);
  }, [HIPAA_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openOncDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowOncDetail(true);
    setDirection(ONC_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(ONC_DETAIL_SLIDE);
  }, [ONC_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openFhirDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowFhirDetail(true);
    setDirection(FHIR_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(FHIR_DETAIL_SLIDE);
  }, [FHIR_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openDevOpsDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowDevOpsDetail(true);
    setDirection(DEVOPS_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(DEVOPS_DETAIL_SLIDE);
  }, [DEVOPS_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openSaaSDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowSaaSDetail(true);
    setDirection(SAAS_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(SAAS_DETAIL_SLIDE);
  }, [SAAS_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openQaValidationDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowQaValidationDetail(true);
    setDirection(QA_VALIDATION_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(QA_VALIDATION_DETAIL_SLIDE);
  }, [QA_VALIDATION_DETAIL_SLIDE, currentSlide, isTransitioning]);

  const openMaintenanceDetail = useCallback(() => {
    if (isTransitioning) return;
    setShowMaintenanceDetail(true);
    setDirection(MAINTENANCE_DETAIL_SLIDE > currentSlide ? 1 : -1);
    setIsTransitioning(true);
    setCurrentSlide(MAINTENANCE_DETAIL_SLIDE);
  }, [MAINTENANCE_DETAIL_SLIDE, currentSlide, isTransitioning]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        if (isServices && (e.key === "ArrowRight")) return; // Disable horizontal in services
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (isServices && (e.key === "ArrowLeft")) return; // Disable horizontal in services
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, currentSlide, isServices]);

  // Touch swipe navigation (mobile / tablet)
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const SWIPE_THRESHOLD = 50;
    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;
      if (Math.abs(dx) <= Math.abs(dy)) {
        if (dy < -SWIPE_THRESHOLD) goToNext();
        else if (dy > SWIPE_THRESHOLD) goToPrev();
      } else if (!isServices) {
        if (dx < -SWIPE_THRESHOLD) goToNext();
        else if (dx > SWIPE_THRESHOLD) goToPrev();
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToNext, goToPrev, isServices]);

  // Wheel/Scroll Navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = document.querySelector('section');
      if (section) {
        const { scrollTop, scrollHeight, clientHeight } = section;
        const isScrollable = scrollHeight > clientHeight;

        if (isScrollable) {
          // If scrolling down, only trigger transition if we are at the bottom of slide content
          if (e.deltaY > 0) {
            if (scrollTop + clientHeight < scrollHeight - 5) {
              return;
            }
          }
          // If scrolling up, only trigger transition if we are at the top of slide content
          else if (e.deltaY < 0) {
            if (scrollTop > 5) {
              return;
            }
          }
        }
      }

      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        lastScrollTime.current = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goToNext, goToPrev]);

  // Section-relative Progress Bar Width
  const progressPercent = sectionSlidesTotal > 1
    ? ((currentSlide - min) / (sectionSlidesTotal - 1)) * 100
    : 100;

  // Get the current variant set
  const currentVariants = getDirectionVariants(currentSlide, direction);

  // Get current slide component
  const CurrentSlideComponent = slideComponents[currentSlide];

  const categorySlides = Array.from({ length: sectionSlidesTotal }, (_, i) => min + i)
    .filter((index) => !isHiddenSlide(index) || index === currentSlide);

  return (
    <div className="bg-dark-bg selection:bg-brand-blue/30 selection:text-white relative h-[100dvh] h-screen w-full max-w-[100vw] overflow-hidden perspective-1000">
      {/* Dynamic Background Mapping */}
      {(() => {
        const BG = BackgroundMapping[currentSlide] || Backgrounds.BubblesBG;
        return <BG />;
      })()}


      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-60">
        <motion.div
          className="h-full bg-brand-blue origin-left"
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      <Navbar currentSlide={currentSlide} setCurrentSlide={(idx: number) => navigateTo(idx)} />

      {/* Header and Footer for All Slides */}
      {/* Logo Header (Top-Left) */}
      <div className="fixed top-6 sm:top-8 left-4 sm:left-6 md:left-8 z-50 pointer-events-none">
        <img
          src="/assets/logo.png"
          alt="REVIVE Medical Technologies Inc. Logo"
          className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />
      </div>

      {/* Footer Text (Bottom-Right) */}
      <div
        className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 md:right-8 z-50 pointer-events-none font-sans text-xs sm:text-sm md:text-base text-white font-semibold tracking-[0.15em]"
        style={{ textShadow: '0 0 20px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.8)' }}
      >
        Revive Medical Technologies Inc. | www.rmt-usa.com
      </div>

      {/* Slide Container with AnimatePresence for unique transitions */}
      <div className="h-[100dvh] h-screen w-full max-w-[100vw] overflow-hidden flex items-center justify-center perspective-1000">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => setIsTransitioning(false)}
        >
          <motion.section
            key={currentSlide}
            initial={currentVariants.initial}
            animate={currentVariants.animate}
            exit={currentVariants.exit}
            className="w-full max-w-[100vw] min-h-[100dvh] h-screen shrink-0 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start md:justify-center relative z-10 overscroll-y-contain"
            style={{ transformStyle: "preserve-3d" }}
          >
            <CurrentSlideComponent
              isActive={true}
              onSelect={(idx: number) => {
                if (currentSlide === 17) {
                  navigateTo(idx);
                }
              }}
              onOpenGenerativeAiDetail={openGenerativeAiDetail}
              onOpenClinicalDecisionSupportDetail={openClinicalDecisionSupportDetail}
              onOpenPredictiveHealthDetail={openPredictiveHealthDetail}
              onOpenCustomAiDetail={openCustomAiDetail}
              onOpenBillingEfficiencyDetail={openBillingEfficiencyDetail}
              onOpenCustomMedicalDetail={openCustomMedicalDetail}
              onOpenMedicalMobileDetail={openMedicalMobileDetail}
              onOpenStoreDeploymentDetail={openStoreDeploymentDetail}
              onOpenRpmDetail={openRpmDetail}
              onOpenEhrDetail={openEhrDetail}
              onOpenImagingDetail={openImagingDetail}
              onOpenSchedulerDetail={openSchedulerDetail}
              onOpenWorkflowDetail={openWorkflowDetail}
              onOpenRecommendationDetail={openRecommendationDetail}
              onOpenQaMedicalDetail={openQaMedicalDetail}
              onOpenIec62304Detail={openIec62304Detail}
              onOpenHipaaDetail={openHipaaDetail}
              onOpenOncDetail={openOncDetail}
              onOpenFhirDetail={openFhirDetail}
              onOpenDevOps={openDevOpsDetail}
              onOpenSaaS={openSaaSDetail}
              onOpenQaValidation={openQaValidationDetail}
              onOpenMaintenance={openMaintenanceDetail}
            />
          </motion.section>
        </AnimatePresence>
      </div>

      {/* On-screen Navigation Arrows */}
      <AnimatePresence>
        {getPrevVisibleSlide(currentSlide) !== null && (
          <motion.button
            key="btn-prev"
            initial={isServices ? { opacity: 0, y: -20, x: "-50%" } : { opacity: 0, x: -20, y: "-50%" }}
            animate={isServices ? { opacity: 1, y: 0, x: "-50%" } : { opacity: 1, x: 0, y: "-50%" }}
            exit={isServices ? { opacity: 0, y: -20, x: "-50%" } : { opacity: 0, x: -20, y: "-50%" }}
            onClick={goToPrev}
            className={`fixed z-50 p-2 sm:p-3 md:p-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/60 hover:text-brand-cyan transition-all cursor-pointer flex ${isServices
              ? "left-1/2 top-20 sm:top-24"
              : "left-3 sm:left-6 md:left-8 top-1/2"
              }`}
            aria-label="Previous slide"
          >
            {isServices ? <ChevronUp size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" /> : <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {getNextVisibleSlide(currentSlide) !== null && (
          <motion.button
            key="btn-next"
            initial={isServices ? { opacity: 0, y: 20, x: "-50%" } : { opacity: 0, x: 20, y: "-50%" }}
            animate={isServices ? { opacity: 1, y: 0, x: "-50%" } : { opacity: 1, x: 0, y: "-50%" }}
            exit={isServices ? { opacity: 0, y: 20, x: "-50%" } : { opacity: 0, x: 20, y: "-50%" }}
            onClick={goToNext}
            className={`fixed z-50 p-2 sm:p-3 md:p-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/60 hover:text-brand-cyan transition-all cursor-pointer flex ${isServices
              ? "left-1/2 bottom-24 sm:bottom-20"
              : "right-3 sm:right-6 md:right-8 top-1/2"
              }`}
            aria-label="Next slide"
          >
            {isServices ? <ChevronDown size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" /> : <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide Indicators Navigation - Moved to side for services */}
      <div className={`fixed z-50 transition-all duration-700 flex pointer-events-auto ${isServices
        ? "right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 flex-col gap-2 sm:gap-3 md:gap-4 max-h-[50vh] overflow-y-auto overscroll-contain py-2"
        : "bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 gap-2 sm:gap-3 max-w-[90vw] flex-wrap justify-center"
        }`}>
        {categorySlides.map((index) => (
          <motion.button
            key={index}
            onClick={() => navigateTo(index)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={`rounded-full transition-all duration-500 ${isServices ? "w-2" : "h-2"
              } ${index === currentSlide
                ? `bg-brand-blue ${isServices ? "h-8" : "w-8"}`
                : `bg-white/20 hover:bg-white/50 ${isServices ? "h-2" : "w-2"}`
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Number Indicator - Relative to Section */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed z-50 flex items-baseline gap-1 font-mono transition-all duration-700 ${
          isServices 
            ? "bottom-28 sm:bottom-24 right-3 sm:right-6 md:right-8 scale-75 opacity-50" 
            : currentSlide < 7
              ? "bottom-32 sm:bottom-16 md:bottom-20 right-3 sm:right-6 md:right-8"
              : "bottom-28 sm:bottom-8 right-3 sm:right-6 md:right-8"
        }`}
      >
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-brand-blue">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span className="text-xs text-white/20">/</span>
        <span className="text-xs text-white/20">
          {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>
      </motion.div>
    </div>
  );
}
