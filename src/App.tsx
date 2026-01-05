import React, { Suspense } from "react";
import { Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";
import "./styles/theme.css";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeProviderContext";
import ScrollToTopOnRouteChange from "./components/common/ScrollToTopOnRouteChange";

// Lazy Load Pages
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const JanNyaya = React.lazy(() => import("./pages/JanNyaya"));
const ChitraDrishti = React.lazy(() => import("./pages/ChitraDrishti"));
const SahayakBot = React.lazy(() => import("./pages/SahayakBot"));
const DocVault = React.lazy(() => import("./pages/DocVault"));
const NyayaDraft = React.lazy(() => import("./pages/NyayaDraft"));
const NyayaGyan = React.lazy(() => import("./pages/NyayaGyan"));
const LegalArticleRouter = React.lazy(() => import("./pages/LegalArticleRouter"));
const VakeelConnect = React.lazy(() => import("./pages/VakeelConnect"));
const JanManch = React.lazy(() => import("./pages/JanManch"));
const DiscussionDetail = React.lazy(() => import("./pages/DiscussionDetail"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const ActiveCases = React.lazy(() => import("./pages/ActiveCases"));
const LegalUpdateDetail = React.lazy(() => import("./pages/LegalUpdateDetail"));
const LegalUpdates = React.lazy(() => import("./pages/LegalUpdates"));
const SavedArticles = React.lazy(() => import("./pages/SavedArticles"));
const CaseDetail = React.lazy(() => import("./pages/CaseDetail"));
const ShareCase = React.lazy(() => import("./pages/ShareCase"));
const Contact = React.lazy(() => import("./pages/Contact"));
const SuccessStories = React.lazy(() => import("./pages/SuccessStories"));
const LawyerProfile = React.lazy(() => import("./pages/LawyerProfile"));
const BookConsultation = React.lazy(() => import("./pages/BookConsultation"));
const LawyerMessages = React.lazy(() => import("./pages/LawyerMessages"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = React.lazy(() => import("./pages/CookiePolicy"));
const Disclaimer = React.lazy(() => import("./pages/Disclaimer"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Profile = React.lazy(() => import("./pages/Profile"));
const FileFormalReply = React.lazy(() => import("./pages/FileFormalReply"));
const DispatchReply = React.lazy(() => import("./pages/DispatchReply"));
const ReviewNotice = React.lazy(() => import("./pages/ReviewNotice"));
const ReviewReplyDraft = React.lazy(() => import("./pages/ReviewReplyDraft"));
const ReviewRequest = React.lazy(() => import("./pages/ReviewRequest"));
const SeedDB = React.lazy(() => import("./pages/SeedDB"));

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
  </div>
);

// Auth Guard Component
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ScrollToTopOnRouteChange />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes (No Layout) */}
            <Route path="/" element={<Home />} />

            {/* Main Layout Routes */}
            <Route element={<MainLayout><Outlet /></MainLayout>}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Public Content Pages (Accessible to everyone) */}
              <Route path="/jan-manch" element={<JanManch />} />
              <Route path="/jan-sabha/discussion/:id" element={<DiscussionDetail />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/updates" element={<LegalUpdates />} />
              <Route path="/article/:id" element={<LegalUpdateDetail />} />
              <Route path="/nyaya-gyan" element={<NyayaGyan />} />
              <Route path="/legal-article/:slug" element={<LegalArticleRouter />} />
              <Route path="/vakeel-connect" element={<VakeelConnect />} />
              <Route path="/vakeel/:id" element={<LawyerProfile />} />
              <Route path="/stories" element={<SuccessStories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />

              {/* Protected User Pages (Require Login) */}
              <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jan-nyaya" element={<JanNyaya />} />
                <Route path="/timeline" element={<ChitraDrishti />} />
                <Route path="/sahayak" element={<SahayakBot />} />
                <Route path="/vault" element={<DocVault />} />
                <Route path="/draft" element={<NyayaDraft />} />
                <Route path="/active-cases" element={<ActiveCases />} />
                <Route path="/case/*" element={<CaseDetail />} />
                <Route path="/share-case/*" element={<ShareCase />} />
                <Route path="/saved-articles" element={<SavedArticles />} />
                <Route path="/vakeel/:id/book" element={<BookConsultation />} />
                <Route path="/messages" element={<LawyerMessages />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/seed-db" element={<SeedDB />} />

                {/* Timeline Sub-routes */}
                <Route path="/timeline/file-reply" element={<FileFormalReply />} />
                <Route path="/timeline/dispatch" element={<DispatchReply />} />
                <Route path="/timeline/review-notice" element={<ReviewNotice />} />
                <Route path="/timeline/review-draft" element={<ReviewReplyDraft />} />
                <Route path="/review-request" element={<ReviewRequest />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
