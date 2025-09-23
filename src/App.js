// Styles are provided via Tailwind CDN in public/index.html
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedFarmingLogo from './AnimatedLogo';
import DashboardLeaderboard from './DashboardLeaderboard';
import { ProgressProvider } from './ProgressContext';
import { auth, googleProvider } from './firebase';
import Container from './Container';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import About from './About';
import Community from './Community';
import AuthForm from './AuthForm';
import Footer from './Footer';
import ProfileSection from './ProfileSection';
import ProfilePage from './ProfilePage';
import TaskDetail from './TaskDetail';
import SubstepDetail from './SubstepDetail';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut
} from 'firebase/auth';

// ...existing code...

// ...other components (Navbar, Footer, AnimatedLogo, Hero, AuthForm, Features, ProgressBar, CircularGauge, Badge, Dashboard, Leaderboard, Community, About, SoilTestingVisual, PlowingVisual) remain unchanged...

// Play page with sidebar and expanding tasks
function PlayPage() {
  const [selectedId, setSelectedId] = useState(1);
  function handleCompleteCurrentTask() {
    if (!completedTaskIds.includes(tasks[currentTaskIdx].id)) {
      setCompletedTaskIds([...completedTaskIds, tasks[currentTaskIdx].id]);
    }
  }
  // Removed unused selectedId
  const [completedTaskIds, setCompletedTaskIds] = useState([]);
  // ...existing code...
  const navigate = useNavigate();
  // Example state and logic for PlayPage
  // ...existing code...
  const tasks = [
    {
      id: 1,
      title: 'Land Preparation',
      sub: [
        {
          step: 'Soil Testing and Analysis',
          substeps: ['Collect samples', 'Test pH', 'Assess nutrients', 'Record moisture']
        },
        {
          step: 'Clearing the Field',
          substeps: ['Remove weeds', 'Pick stones', 'Dispose debris']
        },
        {
          step: 'Pre-Irrigation',
          substeps: ['Check water source', 'Irrigate lightly']
        },
        {
          step: 'Primary Tillage (Plowing)',
          substeps: ['Choose plow', 'Set depth', 'Plow field']
        },
        {
          step: 'Secondary Tillage (Harrowing)',
          substeps: ['Break clods', 'Level surface']
        },
        {
          step: 'Land Leveling',
          substeps: ['Survey field', 'Fill low spots', 'Ensure slope']
        },
        {
          step: 'Applying Amendments and Fertilizers',
          substeps: ['Calculate rate', 'Apply evenly', 'Incorporate']
        },
        {
          step: 'Bed or Hole Preparation',
          substeps: ['Mark rows', 'Prepare beds/holes']
        },
        {
          step: 'Ensuring Proper Drainage',
          substeps: ['Plan channels', 'Install pipes', 'Test flow']
        },
        {
          step: 'Final Inspection',
          substeps: ['Walk-through', 'Verify readiness']
        }
      ],
      visual: <div className="text-gray-700">Complete all steps for proper land preparation.</div>
    },
    {
      id: 2,
      title: 'Selection of Seeds',
      sub: [
        'Choose crop variety',
        'Check seed quality',
        'Purchase certified seeds',
        'Store seeds properly'
      ],
      visual: <div className="text-gray-700">Select and prepare seeds for sowing.</div>
    },
    {
      id: 3,
      title: 'Sowing/Planting',
      sub: ['Prepare sowing equipment', 'Sow seeds at proper depth', 'Cover seeds with soil'],
      visual: <div className="text-gray-700">Sow or plant seeds in the prepared field.</div>
    },
    {
      id: 4,
      title: 'Manuring and Fertilization',
      sub: ['Apply manure', 'Apply fertilizers', 'Mix into soil'],
      visual: <div className="text-gray-700">Add nutrients to support crop growth.</div>
    },
    {
      id: 5,
      title: 'Irrigation',
      sub: ['Check water source', 'Irrigate at proper intervals', 'Monitor soil moisture'],
      visual: <div className="text-gray-700">Provide water to crops as needed.</div>
    },
    {
      id: 6,
      title: 'Weeding',
      sub: ['Identify weeds', 'Remove weeds manually or chemically', 'Monitor for regrowth'],
      visual: <div className="text-gray-700">Control weeds to protect crops.</div>
    },
    {
      id: 7,
      title: 'Pest and Disease Management',
      sub: ['Scout for pests/diseases', 'Apply control measures', 'Monitor crop health'],
      visual: <div className="text-gray-700">Protect crops from pests and diseases.</div>
    },
    {
      id: 8,
      title: 'Harvesting',
      sub: ['Check crop maturity', 'Harvest at right time', 'Handle crops carefully'],
      visual: <div className="text-gray-700">Harvest crops efficiently and safely.</div>
    },
    {
      id: 9,
      title: 'Post-Harvest Handling and Storage',
      sub: ['Clean harvested crops', 'Sort and grade', 'Store in proper conditions'],
      visual: <div className="text-gray-700">Ensure quality and reduce losses after harvest.</div>
    }
  ];
  

  // ...existing code...

  // Determine current task index
  const currentTaskIdx = completedTaskIds.length;

  function handleTaskClick(task, idx) {
    if (idx === currentTaskIdx) {
      setSelectedId(task.id);
      navigate(`/task/${task.id}`);
    }
  }

  // Removed unused handleCompleteCurrentTask

  return (
    <section id="play-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-2">Your Farming Journey</h1>
        <p className="text-lg text-gray-700">Complete each step to progress and earn rewards!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map((task, idx) => {
          const isCompleted = completedTaskIds.includes(task.id);
          const isCurrent = idx === currentTaskIdx;
          const isLocked = idx > currentTaskIdx;
          return (
            <div
              key={task.id}
              className={`rounded-xl shadow-soft border border-gray-100 bg-white transition ${isCurrent ? 'hover:shadow-lg cursor-pointer ring-2 ring-primary' : ''} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleTaskClick(task, idx)}
            >
              <div
                className={`w-full text-left px-5 py-4 font-bold text-lg rounded-t-xl transition flex items-center gap-2 ${isCurrent ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-800'}`}
              >
                {isCompleted ? (
                  <span className="inline-block text-green-600">✔️</span>
                ) : isLocked ? (
                  <span className="inline-block text-gray-400">🔒</span>
                ) : (
                  <span className="inline-block mr-2 align-middle">🌱</span>
                )}
                {task.title}
              </div>
            </div>
          );
        })}
      </div>
  {/* ...existing code... */}
    </section>
  );
}

// ...existing code for App component and export...

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  //const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      // setCurrentUser(user); // removed unused
      if (user && location.pathname === '/auth') {
        navigate('/main', { replace: true });
      }
      setIsAuthReady(true);
    });
    return () => unsub();
  }, [location.pathname, navigate]);

  const handleAuthToggle = () => setIsLogin(!isLogin);

  const handleAuthSubmit = async (formData) => {
    try {
      setAuthError('');
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (formData.name) await updateProfile(cred.user, { displayName: formData.name });
      }
      navigate('/main', { replace: true });
    } catch (e) {
      setAuthError(e.message || 'Authentication failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthError('');
      await signInWithPopup(auth, googleProvider);
      navigate('/main', { replace: true });
    } catch (e) {
      setAuthError(e.message || 'Authentication failed');
    }
  };

  const handleShowAuth = (toLogin) => { setIsLogin(toLogin); navigate('/auth'); };
  const handleLogout = async () => { try { await signOut(auth); navigate('/'); } catch (e) { alert(e.message); } };

  const RequireAuth = ({ children }) => {
    if (!isAuthReady) return null;
    return !isAuthenticated ? <Navigate to="/auth" replace /> : children;
  };

  const [showLogo, setShowLogo] = useState(() => {
    // Only show splash if not already shown in this session
    return !sessionStorage.getItem('splashShown');
  });
  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => {
        setShowLogo(false);
        sessionStorage.setItem('splashShown', 'true');
        if (!isAuthenticated) {
          navigate('/auth', { replace: true });
        } else {
          navigate('/main', { replace: true });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showLogo, isAuthenticated, navigate]);

  return (
    <ProgressProvider>
      <AnimatePresence mode="wait">
        {showLogo ? (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <AnimatedFarmingLogo size={180} />
            <h1 className="mt-6 text-4xl font-extrabold text-green-700 tracking-wide drop-shadow-lg">PixelFarmers</h1>
          </div>
        ) : (
          <Container>
            <Navbar isAuthenticated={isAuthenticated} onShowAuth={handleShowAuth} onLogout={handleLogout} />
            {location.pathname !== '/auth' && <Hero />}
            <Routes>
              <Route path="/" element={<Features />} />
              <Route path="/features" element={<Features />} />
              <Route path="/play" element={<PlayPage />} />
              <Route path="/task/:id" element={<TaskDetail />} />
              <Route path="/task/:id/step/:stepIdx/substep/:subIdx" element={<SubstepDetail />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/community" element={<RequireAuth><Community /></RequireAuth>} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<RequireAuth><ProfileSection /></RequireAuth>} />
              <Route path="/dashboard-leaderboard" element={<DashboardLeaderboard />} />
              <Route path="/auth" element={<AuthForm isLogin={isLogin} onToggle={handleAuthToggle} onSubmit={handleAuthSubmit} onGoogle={handleGoogleSignIn} error={authError} />} />
            </Routes>
            {location.pathname !== '/auth' && <Footer />}
          </Container>
        )}
      </AnimatePresence>
    </ProgressProvider>
  );
}

export default App;
