import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import LandingPage from '../pages/LandingPage';
import { ComingSoon } from '../components/welcome/ComingSoon';

// Lazy load non-critical pages for better performance
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'));
const SuggestionPage = lazy(() => import('../pages/SuggestionPage'));
const VolunteerPage = lazy(() => import('../pages/VolunteerPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Auth layout - checks if user is authenticated
function AuthLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{ fullName: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sup_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserData(parsed);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('sup_user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sup_user');
    setIsAuthenticated(false);
    setUserData(null);
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If authenticated, show coming soon page
  if (isAuthenticated && userData) {
    return (
      <ComingSoon
        userName={userData.fullName}
        userEmail={userData.email}
        onLogout={handleLogout}
      />
    );
  }

  // If not authenticated, redirect to home
  return <Navigate to="/" replace />;
}

// Root layout with auth check for landing page
function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{ fullName: string; email: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sup_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserData(parsed);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('sup_user');
      }
    }
  }, []);

  const handleAuthSuccess = (data: { fullName: string; email: string }) => {
    setUserData(data);
    setIsAuthenticated(true);
    localStorage.setItem('sup_user', JSON.stringify(data));
    // Navigate to coming soon page
    window.location.href = '/coming-soon';
  };

  // If authenticated, redirect to coming soon
  if (isAuthenticated && userData) {
    return <Navigate to="/coming-soon" replace />;
  }

  return <LandingPage onAuthSuccess={handleAuthSuccess} />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  },
  {
    path: '/coming-soon',
    element: <AuthLayout />,
  },
  {
    path: '/privacy',
    element: (
      <Suspense fallback={<PageLoader />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: '/terms',
    element: (
      <Suspense fallback={<PageLoader />}>
        <TermsAndConditions />
      </Suspense>
    ),
  },
  {
    path: '/privacy-policy',
    element: <Navigate to="/privacy" replace />,
  },
  {
    path: '/terms-of-service',
    element: <Navigate to="/terms" replace />,
  },
  {
    path: '/suggestion',
    element: (
      <Suspense fallback={<PageLoader />}>
        <SuggestionPage />
      </Suspense>
    ),
  },
  {
    path: '/volunteer',
    element: (
      <Suspense fallback={<PageLoader />}>
        <VolunteerPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export default router;
