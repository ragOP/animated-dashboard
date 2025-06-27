import React from 'react';
import { motion } from 'framer-motion';

const data = {
  date: 'June 23, 2025',
  files_status: {
    active: {
      total: 256,
      accident_benefit_claim: 112,
      bodily_injury_claim: 96,
      property_damage_claim: 48,
    },
    closed: {
      total: 180,
      accident_benefit_claim: 92,
      bodily_injury_claim: 43,
      property_damage_claim: 45,
    },
  },
  settlements: {
    total_settled_files: 145,
    accident_benefit_claim: 37,
    bodily_injury_claim: 32,
  },
  deadlines: {
    general: ['SOC', 'LAT', 'AOS', 'Section 33', 'Section 44'],
    insurance: {
      insurance_examinations: 4,
      upcoming_assessment: 'clients',
      done_assessments: 'clients',
      inform_to_ab_insurance: 3,
      inform_to_bi_insurance: 5,
    },
  },
  assessments: {
    upcoming_assessments: 4,
    inform_to_client: 'unform to client',
    additional_text: 'A incent Benefit File\nProperty Damage File'
  },
  calendar: {
    selected_date: '2025-06-23',
    note: 'Preparation of notes',
  },
  pending_documents: [
    'Family Physician Records',
    'Hospital Records',
    'Walk-In Clinic Records',
    'OHIP Decorated Summary',
    'Prescription Summary',
  ],
};

// Helper for animated number
const AnimatedNumber = ({ value, className = "" }) => {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let increment = end / 40;
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setDisplay(Math.floor(current));
    }, 50);
    return () => clearInterval(timer);
  }, [value]);
  return <span className={className}>{display}</span>;
};

const OptimizedParticles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 rounded-full"
      style={{
        background: i % 2 === 0 ? '#06b6d4' : '#8b5cf6',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: Math.random() * 10 + 15,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  ));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden">{particles}</div>;
};

const SmoothCircularProgress = ({ percent, value, size = 100, strokeWidth = 8, gradientId, color1, color2 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  
  return (
    <motion.div 
      className="relative inline-flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedNumber value={value} className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent" />
      </div>
    </motion.div>
  );
};

const SmoothProgressBar = ({ width, gradient, delay = 0 }) => (
  <motion.div 
    className="relative h-3 bg-white/5 rounded-full overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    <motion.div
      className="h-full rounded-full"
      style={{ background: gradient }}
      initial={{ width: 0 }}
      animate={{ width: `${width}%` }}
      transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.2 }}
    />
  </motion.div>
);

const OptimizedCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`relative group h-auto min-h-[400px] sm:min-h-[450px] lg:h-[480px] ${className}`}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div
      className="relative backdrop-blur-xl rounded-3xl p-4 sm:p-6 border shadow-xl h-full overflow-y-auto"
      style={{
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      }}
    >
      {children}
    </div>
  </motion.div>
);

const App = () => {
  return (
    <div className="min-h-screen text-white font-inter relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #020617 50%, #000000 100%)'
    }}>
      <motion.div 
        className="fixed inset-0 opacity-5"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #0ea5e9, #8b5cf6, #ec4899, #f59e0b, #10b981, #0ea5e9)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      <OptimizedParticles />
      
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 px-4 sm:px-8 pt-4 sm:pt-6 relative z-10 gap-4 sm:gap-0">
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {data.date}
        </motion.h1>
        <motion.div 
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/20 backdrop-blur-xl"
          style={{ background: 'rgba(255, 255, 255, 0.08)' }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Settling
          </span>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-cyan-400 sm:w-5 sm:h-5">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5"/>
          </svg>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-8 pb-6 sm:pb-8 relative z-10">
        <OptimizedCard delay={0}>
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Files status
            </h2>
            <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/50 text-cyan-200">
              A
            </span>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <motion.div 
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <AnimatedNumber value={data.files_status.active.total} />
                </motion.div>
                <div className="text-lg sm:text-xl text-cyan-300/90 font-bold">active</div>
              </div>
              <div className="space-y-2 text-sm w-full sm:w-auto">
                {[
                  { number: 112, label: 'Accident benefit', color: 'from-cyan-400 to-blue-400' },
                  { number: 96, label: 'Bodily injury claim', color: 'from-purple-400 to-pink-400' },
                  { number: 48, label: 'Property damage claim', color: 'from-emerald-400 to-cyan-400' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-white/90 font-medium text-xs sm:text-sm mr-3">{item.label}</span>
                    <span className={`font-bold text-base sm:text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.number}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <motion.div 
                  className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  <AnimatedNumber value={data.files_status.closed.total} />
                </motion.div>
                <div className="text-lg sm:text-xl text-slate-400/90 font-bold">closed</div>
              </div>
              <div className="space-y-2 text-sm w-full sm:w-auto">
                {[
                  { number: 92, label: 'Accident benefit', color: 'from-cyan-400 to-blue-400' },
                  { number: 43, label: 'Bodily injury claim', color: 'from-purple-400 to-pink-400' },
                  { number: 45, label: 'Property damage claim', color: 'from-emerald-400 to-cyan-400' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-white/60 text-xs sm:text-sm mr-3">{item.label}</span>
                    <span className={`font-bold text-base sm:text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.number}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </OptimizedCard>

        <OptimizedCard delay={0.1}>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Settlements
          </h2>
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <SmoothCircularProgress 
              percent={100} value={145} size={90} strokeWidth={10}
              gradientId="settlements-gradient" color1="#06b6d4" color2="#ec4899" 
            />
            <div className="mt-3 sm:mt-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">145</div>
              <div className="text-xs sm:text-sm text-white/70">accident benefit</div>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3 text-sm">
            {[
              { label: 'accident benefit', value: 37, color: 'text-cyan-400' },
              { label: 'bodily injury claim', value: 32, color: 'text-pink-400' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="flex justify-between items-center p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <span className="text-white/90 font-medium text-xs sm:text-sm">{item.label}</span>
                <span className={`font-bold text-base sm:text-lg ${item.color}`}>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </OptimizedCard>

        <OptimizedCard delay={0.2}>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Deadlines
          </h2>
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {[
              { width: 90, gradient: 'linear-gradient(90deg, #ec4899, #f97316)' },
              { width: 75, gradient: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' },
              { width: 60, gradient: 'linear-gradient(90deg, #06b6d4, #10b981)' },
              { width: 45, gradient: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' },
              { width: 30, gradient: 'linear-gradient(90deg, #f59e0b, #ec4899)' }
            ].map((bar, i) => (
              <SmoothProgressBar key={i} width={bar.width} gradient={bar.gradient} delay={i * 0.1} />
            ))}
          </div>
          <div className="flex justify-center gap-2 sm:gap-4">
            {[
              { value: 4, label: 'Insurance', color1: '#06b6d4', color2: '#8b5cf6' },
              { value: 4, label: 'upcoming', color1: '#3b82f6', color2: '#ec4899' },
              { value: 4, label: 'inform', color1: '#8b5cf6', color2: '#f59e0b' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <SmoothCircularProgress 
                  percent={4} value={4} size={50} strokeWidth={5} 
                  gradientId={`deadline-${i}`} color1={item.color1} color2={item.color2} 
                />
                <div className="text-xs mt-1 sm:mt-2 text-white/70 font-medium max-w-12">{item.label}</div>
                <div className="text-xs font-bold text-cyan-400">4%</div>
              </div>
            ))}
          </div>
        </OptimizedCard>

        <OptimizedCard delay={0.3}>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
            Pending documents
          </h2>
          <ul className="space-y-2 text-sm">
            {data.pending_documents.map((doc, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex-shrink-0" />
                <span className="text-white/90 font-medium text-xs sm:text-sm">{doc}</span>
              </motion.li>
            ))}
          </ul>
        </OptimizedCard>

        <OptimizedCard delay={0.4}>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Assessments
          </h2>
          <div className="flex flex-col items-center mb-3 sm:mb-4">
            <SmoothCircularProgress 
              percent={4} value={4} size={90} strokeWidth={10}
              gradientId="assessments-gradient" color1="#8b5cf6" color2="#06b6d4" 
            />
            <div className="mt-3 sm:mt-4 text-center">
              <div className="text-sm text-purple-400 font-bold">4%</div>
              <div className="text-xs sm:text-sm font-bold text-white/90">Inform to client</div>
            </div>
          </div>
          <div className="text-sm text-white/70 text-center space-y-2">
            <div className="p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm">unform to client</div>
            <div className="space-y-1">
              {['A incent Benefit File', 'Property Damage File'].map((file, i) => (
                <motion.div 
                  key={i}
                  className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors duration-300 text-xs sm:text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {file}
                </motion.div>
              ))}
            </div>
          </div>
        </OptimizedCard>

        <OptimizedCard delay={0.5}>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-cyan-400 sm:w-5 sm:h-5">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path stroke="currentColor" strokeWidth="2" d="M8 2v4M16 2v4M3 10h18"/>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Calendar
            </h2>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-cyan-400 sm:w-4 sm:h-4">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="font-bold text-white text-sm sm:text-base">{data.calendar.selected_date}</span>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="ml-auto text-purple-400 sm:w-4 sm:h-4">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          
          <div className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg bg-white/5 font-medium">
            {data.calendar.note}
          </div>
          
          <motion.button 
            className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Calendar
          </motion.button>
        </OptimizedCard>
      </div>
    </div>
  );
};

export default App;

