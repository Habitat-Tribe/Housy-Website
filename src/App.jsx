import React, { useState, useMemo } from 'react';
import {
  Home,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Camera,
  Layers,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Wrench,
  Users,
  Compass,
  FileText,
  BadgeCheck,
  Building2,
  Hammer,
  HelpCircle,
  X,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

// 20 Configured Indian Cities
const CITIES = [
  { id: 'bareilly', name: 'Bareilly', state: 'Uttar Pradesh', status: 'LIVE', multiplier: 0.95 },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', status: 'LIVE', multiplier: 1.05 },
  { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', status: 'WAITLIST', multiplier: 0.98 },
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', status: 'WAITLIST', multiplier: 0.96 },
  { id: 'agra', name: 'Agra', state: 'Uttar Pradesh', status: 'WAITLIST', multiplier: 0.95 },
  { id: 'meerut', name: 'Meerut', state: 'Uttar Pradesh', status: 'WAITLIST', multiplier: 0.98 },
  { id: 'delhi-ncr', name: 'Delhi NCR', state: 'National Capital Region', status: 'WAITLIST', multiplier: 1.25 },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', status: 'WAITLIST', multiplier: 1.02 },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', status: 'WAITLIST', multiplier: 1.25 },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', status: 'WAITLIST', multiplier: 1.35 },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', status: 'WAITLIST', multiplier: 1.15 },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', status: 'WAITLIST', multiplier: 1.18 },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', status: 'WAITLIST', multiplier: 1.18 },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', status: 'WAITLIST', multiplier: 1.08 },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', status: 'WAITLIST', multiplier: 1.05 },
  { id: 'chandigarh', name: 'Chandigarh', state: 'Punjab/Haryana', status: 'WAITLIST', multiplier: 1.12 },
  { id: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', status: 'WAITLIST', multiplier: 1.02 },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', status: 'WAITLIST', multiplier: 1.00 },
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', status: 'WAITLIST', multiplier: 0.98 },
  { id: 'patna', name: 'Patna', state: 'Bihar', status: 'WAITLIST', multiplier: 0.98 },
];

// Project Types Catalog
const PROJECT_TYPES = [
  {
    id: 'build',
    name: 'Full House Construction',
    category: 'Build',
    baseRate: 1850,
    unit: 'sq ft built-up',
    durationWeeksPer1k: 24,
    description: 'RCC structure, brickwork, plastering, electrical, plumbing, flooring & turnkey finishes.',
    phases: [
      { name: 'Excavation & Foundation', share: 0.20 },
      { name: 'RCC Frame & Slab Casting', share: 0.30 },
      { name: 'Brickwork & Conduit Plastering', share: 0.25 },
      { name: 'Flooring, Sanitary & Turnkey Paint', share: 0.25 },
    ]
  },
  {
    id: 'kitchen',
    name: 'Modular Kitchen Renovation',
    category: 'Renovate',
    baseRate: 1450,
    unit: 'sq ft carpet',
    durationWeeksPer1k: 4,
    description: 'BWP plywood carcasses, acrylic/laminate shutters, quartz counter, chimney & plumbing.',
    phases: [
      { name: 'Demolition & Wall Prep', share: 0.15 },
      { name: 'Underground Plumbing & Wiring', share: 0.25 },
      { name: 'Granite/Quartz Countertop & Tiles', share: 0.25 },
      { name: 'Cabinetry & Appliance Fit-off', share: 0.35 },
    ]
  },
  {
    id: 'bathroom',
    name: 'Bathroom Remodel & Waterproofing',
    category: 'Renovate',
    baseRate: 1650,
    unit: 'sq ft',
    durationWeeksPer1k: 3,
    description: 'Complete strip-down, 3-layer elastomeric waterproofing, concealed plumbing & vanity.',
    phases: [
      { name: 'Tile Stripping & Debris Removal', share: 0.15 },
      { name: 'Core Concealed CPVC Plumbing', share: 0.30 },
      { name: '3-Layer Membrane Waterproofing', share: 0.25 },
      { name: 'Vitrified Wall Tiling & Diverters', share: 0.30 },
    ]
  },
  {
    id: 'interiors',
    name: 'Complete Home Interior Architecture',
    category: 'Interiors',
    baseRate: 1350,
    unit: 'sq ft carpet',
    durationWeeksPer1k: 8,
    description: 'Designer false ceiling, modular wardrobes, TV consoles, ambient lighting & royale paint.',
    phases: [
      { name: '3D CAD Moodboard & Layout Sign-off', share: 0.15 },
      { name: 'Gypsum Ceiling & Ambient Wiring', share: 0.25 },
      { name: 'Factory Modular Wardrobes & Units', share: 0.35 },
      { name: 'Premium Texture Paint & Fixtures', share: 0.25 },
    ]
  },
  {
    id: 'structural',
    name: 'Wall Removal & Spatial Reconfiguration',
    category: 'Renovate',
    baseRate: 750,
    unit: 'sq ft affected',
    durationWeeksPer1k: 2,
    description: 'Non-structural partition removal, RSJ steel beam installation, lintel support & plaster.',
    phases: [
      { name: 'Structural Safety Assessment', share: 0.20 },
      { name: 'Temporary Acrow Prop Shoring', share: 0.25 },
      { name: 'Controlled Diamond Blade Cutting', share: 0.30 },
      { name: 'Beam Encapsulation & Surface Finish', share: 0.25 },
    ]
  },
];

// Quality Tiers
const TIERS = [
  { id: 'budget', name: 'Budget Essential', multiplier: 1.0, badge: 'Standard Value', note: 'Standard commercial plywood, ISI conduits, standard ceramic tiles' },
  { id: 'standard', name: 'Balanced Quality', multiplier: 1.25, badge: 'Most Popular', note: 'BWP 710 marine ply, Jaquar fittings, Asian Paints Royale, Vitrified 4x2' },
  { id: 'luxury', name: 'Designer Premium', multiplier: 1.65, badge: 'High End', note: 'HDHMR/PU finishes, Grohe/Kohler sanitary, Italian marble / GVT slabs' },
];

export default function App() {
  // Navigation & Modal State
  const [selectedCityId, setSelectedCityId] = useState('lucknow');
  const [activeModal, setActiveModal] = useState(null); // 'waitlist' | 'partner' | 'consultation'
  const [toastMessage, setToastMessage] = useState('');

  // Estimator State
  const [selectedProjectId, setSelectedProjectId] = useState('kitchen');
  const [areaSqFt, setAreaSqFt] = useState(250);
  const [selectedTierId, setSelectedTierId] = useState('standard');

  // Feasibility Advisor Simulator State
  const [wallType, setWallType] = useState('brick-loadbearing'); // 'rcc-frame' | 'brick-loadbearing'
  const [floorPosition, setFloorPosition] = useState('ground'); // 'ground' | 'upper' | 'top'
  const [wallThickness, setWallThickness] = useState('9-inch'); // '4.5-inch' | '9-inch'

  const [drainDistance, setDrainDistance] = useState(8); // ft
  const [slabType, setSlabType] = useState('flat'); // 'sunken' | 'flat'

  const selectedCity = CITIES.find(c => c.id === selectedCityId) || CITIES[1];
  const selectedProject = PROJECT_TYPES.find(p => p.id === selectedProjectId) || PROJECT_TYPES[1];
  const selectedTier = TIERS.find(t => t.id === selectedTierId) || TIERS[1];

  // Price Calculations
  const calculatedEstimate = useMemo(() => {
    const rawCost = selectedProject.baseRate * areaSqFt * selectedCity.multiplier * selectedTier.multiplier;
    const minCost = Math.round((rawCost * 0.95) / 1000) * 1000;
    const maxCost = Math.round((rawCost * 1.10) / 1000) * 1000;
    const weeks = Math.max(2, Math.round((areaSqFt / 1000) * selectedProject.durationWeeksPer1k));

    return {
      minCost,
      maxCost,
      weeks,
      phases: selectedProject.phases.map(ph => ({
        ...ph,
        amount: Math.round((rawCost * ph.share) / 1000) * 1000
      }))
    };
  }, [selectedProject, areaSqFt, selectedCity, selectedTier]);

  // Feasibility Advisor Results
  const wallFeasibility = useMemo(() => {
    if (wallType === 'brick-loadbearing' && (floorPosition === 'ground' || wallThickness === '9-inch')) {
      return {
        level: 'RED',
        badge: 'Critical Structural Hazard',
        bg: 'bg-rose-50 border-2 border-rose-300 text-rose-900',
        icon: XCircle,
        advice: 'Cannot demolish! This 9" masonry wall bears multi-story slab load. Demolition will trigger catastrophic ceiling sag or structural cracks. Requires certified structural engineer approval and heavy structural steel I-beam retrofitting.'
      };
    }
    if (wallType === 'brick-loadbearing' && floorPosition === 'top' && wallThickness === '4.5-inch') {
      return {
        level: 'AMBER',
        badge: 'Engineer Inspection Mandatory',
        bg: 'bg-amber-50 border-2 border-amber-300 text-amber-900',
        icon: AlertTriangle,
        advice: 'Top floor 4.5" partition wall. Likely non-structural, but must be checked for roof water-tank load transfer. Acrow-prop temporary shoring required during diamond-wheel cutting.'
      };
    }
    return {
      level: 'GREEN',
      badge: 'Safe Architectural Alteration',
      bg: 'bg-emerald-50 border-2 border-emerald-300 text-emerald-900',
      icon: CheckCircle2,
      advice: 'RCC Column-Beam Frame detected with 4.5" non-load-bearing curtain brickwork. Wall can be cleanly removed to create an open-concept living/kitchen space without compromising building integrity.'
    };
  }, [wallType, floorPosition, wallThickness]);

  const drainFeasibility = useMemo(() => {
    const minSlopeInches = (drainDistance * 12) / 40; // 1:40 rule
    if (slabType === 'flat' && drainDistance > 10) {
      return {
        level: 'RED',
        badge: 'High Sewage Stagnation Risk',
        bg: 'bg-rose-50 border-2 border-rose-300 text-rose-900',
        icon: XCircle,
        advice: `A ${drainDistance} ft drain run requires at least ${minSlopeInches.toFixed(1)}" vertical fall. On a flat concrete slab, this requires dangerous core cutting through RCC beams or an awkward 6" bathroom step-up. High risk of chronic drain clogs.`
      };
    }
    if (slabType === 'flat' && drainDistance > 5) {
      return {
        level: 'AMBER',
        badge: 'Raised Floor Required',
        bg: 'bg-amber-50 border-2 border-amber-300 text-amber-900',
        icon: AlertTriangle,
        advice: `Drain run of ${drainDistance} ft requires ${minSlopeInches.toFixed(1)}" gradient. Feasible on flat slab only by casting a 3-4" lightweight concrete podium to preserve natural gravity water flow.`
      };
    }
    return {
      level: 'GREEN',
      badge: 'Optimal Hydraulic Fall',
      bg: 'bg-emerald-50 border-2 border-emerald-300 text-emerald-900',
      icon: CheckCircle2,
      advice: `Sunken slab accommodates required ${minSlopeInches.toFixed(1)}" slope easily under tile floor bed. Zero pump needed; natural gravity drainage with dual floor trap protection.`
    };
  }, [drainDistance, slabType]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
          LIVE PILOT
        </span>
        <span className="text-slate-200">
          Now executing projects in <strong className="text-white">Bareilly &amp; Lucknow</strong>. 18 additional cities currently onboarding crews.
        </span>
        <button
          onClick={() => setActiveModal('waitlist')}
          className="underline ml-1 font-bold text-teal-400 hover:text-teal-300 transition-colors"
        >
          Join your city waitlist →
        </button>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-600/25">
              🏠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-950">Housy</span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-300">
                  Managed OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5 hidden sm:block">Build it. Renovate it. Design it.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* City Selector */}
            <div className="relative">
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-white border-2 border-slate-300 hover:border-teal-600 text-slate-900 text-xs font-bold py-2 pl-8 pr-9 rounded-xl cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
              >
                {CITIES.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name} ({city.status === 'LIVE' ? '🟢 Live' : '⏳ Waitlist'})
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-teal-600 absolute left-2.5 top-2.5 pointer-events-none" />
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            <button
              onClick={() => setActiveModal('partner')}
              className="hidden md:inline-flex text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              For Contractors &amp; Designers
            </button>

            <button
              onClick={() => {
                if (selectedCity.status === 'LIVE') {
                  setActiveModal('consultation');
                } else {
                  setActiveModal('waitlist');
                }
              }}
              style={{ backgroundColor: '#0f766e', color: '#ffffff' }}
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-teal-900/20 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>{selectedCity.status === 'LIVE' ? 'Book Site Visit' : 'Notify My City'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-teal-50/70 via-slate-50 to-slate-100 border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 border-2 border-teal-300 text-teal-950 text-xs font-bold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Urban Company for Whole Home Construction &amp; Renovations</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6">
              Build it. Renovate it. <br />
              <span className="text-teal-700">
                Design it with photo proof.
              </span>
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              The single operating system for homeowners—especially remote and NRI owners living in another city.
              Fixed guaranteed quotes, civil safety guardrails, verified local crews, and milestone payments released{' '}
              <strong className="text-slate-950">only after you inspect verified photo proof</strong>.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#estimator"
                className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-slate-950/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Instant Project Estimator</span>
                <ChevronDown className="w-4 h-4" />
              </a>

              <a
                href="#safety-advisor"
                className="bg-white hover:bg-teal-50/60 text-slate-900 font-bold text-sm px-6 py-3.5 rounded-xl border-2 border-slate-300 hover:border-teal-600 shadow-md active:scale-95 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Test Structural Safety Advisor</span>
              </a>
            </div>

            {/* Core Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t-2 border-slate-200">
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm hover:border-teal-400 transition-all">
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Escrow Security</h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">Paid only on approved photo proof</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm hover:border-teal-400 transition-all">
                <BadgeCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Fixed Pricing</h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">Zero surprise contractor markups</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm hover:border-teal-400 transition-all">
                <Camera className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Remote Oversight</h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">Built for owners not on-site</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm hover:border-teal-400 transition-all">
                <Wrench className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Civil Safety</h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">Structural &amp; plumbing validation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5-Step Customer Loop */}
      <section className="py-18 bg-slate-100/70 border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-900 bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
              The Remote Homeowner Protocol
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-3">
              How Housy Protects You From Day One
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Never get held hostage by contractors demanding advances before completing milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Instant Scope',
                desc: 'Select your city & project type. Get transparent phase-wise cost estimates & material specs instantly.',
                icon: Compass
              },
              {
                step: '02',
                title: 'Paid Site Visit',
                desc: 'Verified architect or civil engineer visits on-site for laser measurement & feasibility assessment.',
                icon: MapPin
              },
              {
                step: '03',
                title: 'Fixed Contract',
                desc: 'Locked itemized quote re-priced from real site measurements. Zero scope-creep or hidden charges.',
                icon: FileText
              },
              {
                step: '04',
                title: 'Verified Crews',
                desc: 'Assigned specialist trade crews (HSY-<CITY>-P###) with verified records, KYC, and background checks.',
                icon: Users
              },
              {
                step: '05',
                title: 'Photo Proof Escrow',
                desc: 'Each milestone requires high-res multi-angle photo proof. You approve from anywhere before funds are paid.',
                icon: Camera
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 relative hover:border-teal-500 hover:shadow-xl transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-teal-600 font-mono">{s.step}</span>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-slate-700">
                    <s.icon className="w-5 h-5 text-teal-700" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-950 text-base mb-1.5">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Estimator Section */}
      <section id="estimator" className="py-20 bg-slate-200/60 border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-900 bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
              Interactive Tool 01
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-3">
              Phase-Wise Project Cost Estimator
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Calibrated with real-time labor and material rates across 20 Indian cities.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Controls */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-slate-50/70 border-b lg:border-b-0 lg:border-r-2 border-slate-200 space-y-8">
              {/* Project Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  1. Select Project Archetype
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_TYPES.map((p) => {
                    const isSelected = selectedProjectId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProjectId(p.id)}
                        className={`text-left p-4 rounded-xl border-2 text-xs transition-all ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold shadow-md ring-2 ring-teal-500/20'
                            : 'border-slate-300 bg-white hover:border-teal-500 hover:bg-slate-50 text-slate-800 font-medium shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isSelected ? 'font-extrabold text-teal-950' : 'font-bold text-slate-900'}`}>
                            {p.name}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                        </div>
                        <div className="text-slate-600 text-[11px] line-clamp-1 font-normal">
                          {p.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Area Slider */}
              <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    2. Estimated Area / Size
                  </label>
                  <span className="text-sm font-bold text-teal-900 font-mono bg-teal-100 px-3 py-1 rounded-lg border-2 border-teal-300 shadow-xs">
                    {areaSqFt.toLocaleString()} {selectedProject.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3500"
                  step="50"
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-2 font-mono font-semibold">
                  <span>100 sq ft</span>
                  <span>1,500 sq ft</span>
                  <span>3,500 sq ft</span>
                </div>
              </div>

              {/* Quality Tier */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  3. Select Material &amp; Finish Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIERS.map((tier) => {
                    const isSelected = selectedTierId === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold shadow-md ring-2 ring-teal-500/20'
                            : 'border-slate-300 bg-white hover:border-teal-500 hover:bg-slate-50 text-slate-800 font-medium shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs ${isSelected ? 'font-extrabold text-teal-950' : 'font-bold text-slate-900'}`}>
                            {tier.name}
                          </span>
                        </div>
                        <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded mb-2 ${
                          isSelected
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 border border-slate-300 text-slate-700'
                        }`}>
                          {tier.badge}
                        </span>
                        <p className="text-[11px] text-slate-600 leading-snug font-normal">{tier.note}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Breakdown Card */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">City Calibration</span>
                    <div className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-4 h-4 text-teal-400" />
                      <span>{selectedCity.name}, {selectedCity.state}</span>
                    </div>
                  </div>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded font-bold ${
                    selectedCity.status === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {selectedCity.status === 'LIVE' ? 'ACTIVE CREWS' : 'WAITLIST'}
                  </span>
                </div>

                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Estimated Total Cost</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                    ₹{calculatedEstimate.minCost.toLocaleString('en-IN')} – ₹{calculatedEstimate.maxCost.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Estimated Duration: <strong>~{calculatedEstimate.weeks} weeks</strong></span>
                  </div>
                </div>

                {/* Milestone Breakdown */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-mono block">
                    Escrow Phase Breakdown
                  </span>
                  {calculatedEstimate.phases.map((ph, idx) => (
                    <div key={idx} className="bg-slate-800/90 rounded-xl p-3.5 border border-slate-700/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-700 text-teal-300 font-mono font-bold flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="text-slate-200 font-medium">{ph.name}</span>
                      </div>
                      <div className="font-mono font-bold text-white">
                        ₹{ph.amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    if (selectedCity.status === 'LIVE') {
                      setActiveModal('consultation');
                    } else {
                      setActiveModal('waitlist');
                    }
                  }}
                  style={{ backgroundColor: '#14b8a6', color: '#020617' }}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm py-4 px-6 rounded-xl shadow-lg shadow-teal-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{selectedCity.status === 'LIVE' ? 'Lock Quote via Paid Site Visit (₹499)' : `Join ${selectedCity.name} Waitlist`}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2.5">
                  {selectedCity.status === 'LIVE'
                    ? '100% refundable if verified specialist does not arrive within agreed slot.'
                    : 'We notify you the day crew vetting completes in your neighborhood.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Advisor Simulator Section */}
      <section id="safety-advisor" className="py-20 bg-slate-50 border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-900 bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
              Safety-Critical Engine (lib/advisor.ts)
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-3">
              Civil Feasibility &amp; Structural Safety Guard
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Unqualified contractors demolish walls and create flat drainage slopes that lead to building cracks and sewage leaks.
              Housy validates feasibility before anyone touches a hammer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Simulator 1: Wall Demolition */}
            <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-lg p-6 sm:p-8 flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                    <Hammer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">Wall Demolition Feasibility</h3>
                    <p className="text-xs text-slate-500 font-medium">Checking for structural load-bearing hazards</p>
                  </div>
                </div>

                <div className="space-y-5 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Building Construction Type
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'rcc-frame', label: 'RCC Pillar & Beam Frame' },
                        { id: 'brick-loadbearing', label: 'Load-Bearing Brick Masonry' }
                      ].map(t => {
                        const isSelected = wallType === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setWallType(t.id)}
                            className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50 text-teal-950 shadow-md ring-2 ring-teal-500/20'
                                : 'border-slate-300 bg-slate-50 hover:border-teal-500 hover:bg-white text-slate-800 shadow-xs'
                            }`}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                        Floor Level
                      </label>
                      <select
                        value={floorPosition}
                        onChange={(e) => setFloorPosition(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-white border-2 border-slate-300 focus:bg-white focus:border-teal-600 text-xs font-bold rounded-xl p-3 text-slate-900 shadow-xs"
                      >
                        <option value="ground">Ground Floor</option>
                        <option value="upper">Intermediate Floor</option>
                        <option value="top">Top Floor (Under Roof)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                        Wall Thickness
                      </label>
                      <select
                        value={wallThickness}
                        onChange={(e) => setWallThickness(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-white border-2 border-slate-300 focus:bg-white focus:border-teal-600 text-xs font-bold rounded-xl p-3 text-slate-900 shadow-xs"
                      >
                        <option value="4.5-inch">4.5 inch (Partition)</option>
                        <option value="9-inch">9 inch (Structural/Outer)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Advisory Output */}
              <div className={`p-4 rounded-xl ${wallFeasibility.bg} transition-all shadow-sm`}>
                <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
                  <wallFeasibility.icon className="w-4 h-4 shrink-0" />
                  <span>{wallFeasibility.badge}</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">{wallFeasibility.advice}</p>
              </div>
            </div>

            {/* Simulator 2: Bathroom Drainage Fall */}
            <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-lg p-6 sm:p-8 flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">Bathroom Drainage Slope Check</h3>
                    <p className="text-xs text-slate-500 font-medium">Checking for 1:40 minimum gravity gradient</p>
                  </div>
                </div>

                <div className="space-y-5 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Distance from Main Soil Stack
                      </label>
                      <span className="text-xs font-mono font-bold text-teal-900 bg-teal-100 px-3 py-1 rounded-lg border-2 border-teal-300 shadow-xs">
                        {drainDistance} Feet
                      </span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="20"
                      step="1"
                      value={drainDistance}
                      onChange={(e) => setDrainDistance(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-2 font-mono font-semibold">
                      <span>3 ft (Adjacent)</span>
                      <span>10 ft</span>
                      <span>20 ft (Opposite side)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Floor Slab Construction
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'sunken', label: 'Sunken Slab (Recessed)' },
                        { id: 'flat', label: 'Flat Conventional Slab' }
                      ].map(s => {
                        const isSelected = slabType === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSlabType(s.id)}
                            className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50 text-teal-950 shadow-md ring-2 ring-teal-500/20'
                                : 'border-slate-300 bg-slate-50 hover:border-teal-500 hover:bg-white text-slate-800 shadow-xs'
                            }`}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Advisory Output */}
              <div className={`p-4 rounded-xl ${drainFeasibility.bg} transition-all shadow-sm`}>
                <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
                  <drainFeasibility.icon className="w-4 h-4 shrink-0" />
                  <span>{drainFeasibility.badge}</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">{drainFeasibility.advice}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-slate-100/70 border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-900 bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
              The Market Gap
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-3">
              Why Traditional Home Construction Breaks Down
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              How Housy creates accountability in an unorganized $120B industry.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border-2 border-slate-300 shadow-xl text-left text-xs sm:text-sm overflow-hidden">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-100">
                  <th className="py-4 px-5 font-bold text-slate-900">Feature &amp; Guarantee</th>
                  <th className="py-4 px-5 font-bold text-slate-600">Unorganized Local Thekedar</th>
                  <th className="py-4 px-5 font-bold text-slate-600">Design Portals (Livspace/Homelane)</th>
                  <th className="py-4 px-5 font-extrabold text-teal-950 bg-teal-100 border-x-2 border-teal-300">Housy Managed OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">Payment Security</td>
                  <td className="py-4 px-5 text-rose-700 font-semibold">Large upfront cash advances</td>
                  <td className="py-4 px-5 text-slate-700">50% upfront before manufacturing</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-800 bg-teal-50/80 border-x-2 border-teal-200">100% Photo-Proof Milestone Escrow</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">Price Transparency</td>
                  <td className="py-4 px-5 text-rose-700 font-semibold">+40% to +80% hidden extra bills</td>
                  <td className="py-4 px-5 text-amber-700 font-medium">High 40% designer markups</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-800 bg-teal-50/80 border-x-2 border-teal-200">Guaranteed Fixed Quote re-priced on site</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">Project Coverage</td>
                  <td className="py-4 px-5 text-slate-700">Disjointed masons &amp; plumbers</td>
                  <td className="py-4 px-5 text-amber-700 font-medium">Interior woodwork only (no civil/build)</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-800 bg-teal-50/80 border-x-2 border-teal-200">Whole Home: Build, Renovate &amp; Interiors</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">Remote Owner Support</td>
                  <td className="py-4 px-5 text-rose-700 font-semibold">Unreliable WhatsApp blurry photos</td>
                  <td className="py-4 px-5 text-slate-700">Generic customer support ticket</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-800 bg-teal-50/80 border-x-2 border-teal-200">Mandatory multi-angle photo proof portal</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">Civil &amp; Structural Safety</td>
                  <td className="py-4 px-5 text-rose-700 font-semibold">Zero checks (knocks down load walls)</td>
                  <td className="py-4 px-5 text-slate-600">Not applicable (cosmetic only)</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-800 bg-teal-50/80 border-x-2 border-teal-200">Algorithmic Load &amp; Plumbing Slope Guards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contractor & Designer Network */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-950 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 border-2 border-slate-700 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30">
                Partner Network Portal
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-3">
                Are you a Contractor, Civil Engineer, or Interior Designer?
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Stop chasing clients for late payments and competing in destructive price wars.
                Housy partners receive verified pre-funded projects with escrow-backed milestone payouts.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Guaranteed Weekly Payouts
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Zero Bidding Commission
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Housy Partner ID Card
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('partner')}
              className="bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm px-6 py-4 rounded-xl shadow-xl active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for Partner KYC</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-600/20">
                🏠
              </div>
              <div>
                <span className="font-extrabold text-lg text-slate-950">Housy</span>
                <p className="text-xs text-slate-500 font-medium">Urban Company for whole home projects.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700 font-semibold">
              <a
                href="https://github.com/Habitat-Tribe/Housy"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-600 flex items-center gap-1"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/Habitat-Tribe/Housy/blob/main/docs/SPEC.md"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-600"
              >
                Architecture Spec
              </a>
              <a
                href="https://github.com/Habitat-Tribe/Housy/blob/main/ROADMAP.md"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-600"
              >
                Roadmap
              </a>
              <a
                href="https://1997agarwal.github.io"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-600 text-teal-700 font-bold"
              >
                Architected by Harshit Agarwal ↗
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} Housy Operating System. All rights reserved.</p>
            <p>20 Indian Cities Configured · 265 Unit Tests Passing · 4-File Parity Standard</p>
          </div>
        </div>
      </footer>

      {/* Modal: City Waitlist */}
      {activeModal === 'waitlist' && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 relative animate-fade-in">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-700 mb-4">
              <MapPin className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-950">
              Join the {selectedCity.name} Priority Waitlist
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
              We are actively vetting contractors and structural engineers in {selectedCity.name}.
              Enter your mobile number to get fast-tracked as soon as your neighborhood goes live.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveModal(null);
                showToast(`You have been added to the priority waitlist for ${selectedCity.name}!`);
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Your Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full text-xs font-semibold p-3.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">WhatsApp Mobile Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 text-xs font-bold bg-slate-100 border-2 border-r-0 border-slate-300 rounded-l-xl text-slate-700 font-mono">
                    +91
                  </span>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    className="w-full text-xs font-semibold p-3.5 rounded-r-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Planned Project Type</label>
                <select className="w-full text-xs font-bold p-3.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 text-slate-900 shadow-xs">
                  <option>Full House Construction</option>
                  <option>Modular Kitchen Renovation</option>
                  <option>Bathroom Remodel &amp; Waterproofing</option>
                  <option>Interior Architecture</option>
                  <option>Structural Wall Modification</option>
                </select>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#0d9488', color: '#ffffff' }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Join Priority Notification Queue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Site Visit Consultation (Live Cities) */}
      {activeModal === 'consultation' && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 relative animate-fade-in">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-700 mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-950">
              Book Expert Site Measurement (₹499)
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
              A certified Housy architect / senior civil engineer will visit your property in <strong>{selectedCity.name}</strong> to take exact laser measurements and issue your binding fixed contract.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveModal(null);
                showToast(`Site visit request confirmed for ${selectedCity.name}! An engineer will contact you.`);
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ananya Verma"
                  className="w-full text-xs font-semibold p-3.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Phone Number (Demo OTP Mode)</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 text-xs font-bold bg-slate-100 border-2 border-r-0 border-slate-300 rounded-l-xl text-slate-700 font-mono">
                    +91
                  </span>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    className="w-full text-xs font-semibold p-3.5 rounded-r-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Property Locality / Address</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Civil Lines / Gomti Nagar"
                  className="w-full text-xs font-semibold p-3.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 shadow-xs"
                />
              </div>

              <div className="bg-slate-100 p-3.5 rounded-xl border-2 border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span className="font-semibold">Site Consultation Fee</span>
                <span className="font-extrabold text-slate-950 font-mono text-sm">₹499 (Pay after visit)</span>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#0d9488', color: '#ffffff' }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Confirm Site Visit Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Contractor & Designer Partner Registration */}
      {activeModal === 'partner' && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 relative animate-fade-in">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-teal-100 border-2 border-teal-300 flex items-center justify-center text-teal-700 mb-4">
              <Users className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-950">
              Housy Partner Crew Registration
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
              Join Housy's network of verified contractors, civil engineers, and interior designers. Get pre-funded projects with escrow-backed milestone releases.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveModal(null);
                showToast('Partner application received! Ops team will call for verification.');
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Contractor / Firm Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Apex Civil Contractors"
                  className="w-full text-xs font-semibold p-3.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Primary Trade</label>
                  <select className="w-full text-xs font-bold p-3.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 text-slate-900 shadow-xs">
                    <option>General Contractor</option>
                    <option>Masonry / Civil</option>
                    <option>Interior Designer</option>
                    <option>Modular Carpentry</option>
                    <option>Plumbing &amp; Sanitary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">City of Operation</label>
                  <select className="w-full text-xs font-bold p-3.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 text-slate-900 shadow-xs">
                    {CITIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">WhatsApp Contact Phone</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 text-xs font-bold bg-slate-100 border-2 border-r-0 border-slate-300 rounded-l-xl text-slate-700 font-mono">
                    +91
                  </span>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    className="w-full text-xs font-semibold p-3.5 rounded-r-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Team Size &amp; Years in Business</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 12 crew members, 8 years experience"
                  className="w-full text-xs font-semibold p-3.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Submit for KYC &amp; Onboarding
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
