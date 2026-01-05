import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Scale, Menu, X, Bell, User, LogOut, ArrowRight, ChevronDown, Bookmark, Check, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItemClass =
  "relative px-4 py-2 text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-white transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-accent before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:origin-right hover:before:origin-left";

// ... (in JSX)

<Link to="/login" className="relative overflow-hidden px-8 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-105">
  <span className="relative z-10">Login</span>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] hover:animate-shimmer" />
</Link>

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Case Update", message: "Your property agreement has been analyzed.", time: "2m ago", type: "success", unread: true },
    { id: 2, title: "New Document", message: "Adv. Sharma uploaded a new file to your vault.", time: "1h ago", type: "info", unread: true },
    { id: 3, title: "Session Reminder", message: "Your legal consultation starts in 30 mins.", time: "3h ago", type: "warning", unread: false },
  ]);



  const unreadCount = notifications.filter(n => n.unread).length;

  const dashboardRoutes = ["/dashboard", "/jan-nyaya", "/timeline", "/sahayak", "/vault", "/draft", "/nyaya-gyan", "/vakeel-connect", "/messages", "/settings", "/active-cases", "/profile"];
  const publicContentRoutes = ["/updates", "/about-us", "/jan-manch", "/stories", "/contact", "/vakeel"];

  const getHeaderMode = () => {
    // Always landing mode on home page
    if (location.pathname === "/") return 'landing';

    // If user is authenticated, always show app navigation
    if (user) return 'app';

    // If not authenticated and on a dashboard route (shouldn't happen, but fallback)
    if (dashboardRoutes.some(route => location.pathname.startsWith(route))) return 'app';

    // If not authenticated and on public content pages, show landing header
    return 'landing';
  };

  const headerMode = getHeaderMode();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
  };

  const mobileLinkClass = "block rounded-lg px-4 py-3 text-base font-medium text-neutral-300 hover:bg-white/5 hover:text-accent transition-colors";

  const isAuthenticated = !!user;
  const isHomePage = location.pathname === "/";

  // Key logic change:
  // - If NOT authenticated: Always show landing/minimal header (even on content pages like /updates, /stories)
  // - If authenticated: Show app navigation on all pages except home
  const showAppNav = isAuthenticated && !isHomePage;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-24 max-w-full items-center justify-between px-6 lg:px-12">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-legal-blue to-black border border-white/10 shadow-[0_0_15px_rgba(26,35,126,0.5)] group-hover:scale-105 transition-transform">
            <Scale className="text-accent h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white font-serif tracking-tight">
              Nyaya<span className="text-accent">Sathi</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {showAppNav ? (
            // App Links (for Logged-in users or expanded target pages)
            <>
              <NavLink to="/dashboard" className={navItemClass}>Dashboard</NavLink>
              <NavLink to="/jan-nyaya" className={navItemClass}>Jan-Nyaya</NavLink>
              <NavLink to="/timeline" className={navItemClass}>Timeline</NavLink>

              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`${navItemClass} flex items-center gap-1`}
                >
                  More <ChevronDown size={14} className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMoreOpen && (
                  <div className="absolute left-0 mt-3 w-48 rounded-xl border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-xl animate-scale-in origin-top-left z-50">
                    <NavLink to="/nyaya-gyan" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                      Know Law
                    </NavLink>
                    <NavLink to="/vakeel-connect" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                      Find Lawyer
                    </NavLink>
                    <NavLink to="/jan-manch" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                      Forum
                    </NavLink>
                    <NavLink to="/about-us" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                      Mission
                    </NavLink>
                    <NavLink to="/updates" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                      Updates
                    </NavLink>
                    <NavLink to="/stories" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                      Stories
                    </NavLink>
                    <NavLink to="/contact" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                      Contact
                    </NavLink>
                    <NavLink to="/sahayak" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-accent hover:text-white hover:bg-white/5 transition-all">
                      Sahayak AI
                    </NavLink>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Landing / Home Links (Minimal state for target pages or Homepage)
            <>
              <NavLink to="/" className={navItemClass}>Home</NavLink>
              <NavLink to="/updates" className={navItemClass}>Updates</NavLink>
              <NavLink to="/about-us" className={navItemClass}>Mission</NavLink>
              <NavLink to="/jan-manch" className={navItemClass}>Forum</NavLink>
            </>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">


          {/* Saved Articles - Visible for both Guests and Members since it uses Firestore integration */}
          <Link
            to="/saved-articles"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-all"
            title="Saved Articles"
          >
            <Bookmark size={18} />
          </Link>

          {showAppNav ? (
            <>
              {/* App Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all ${isNotificationsOpen ? 'text-accent border-accent/40 bg-accent/5' : 'text-neutral-400 hover:text-accent hover:border-accent/30'}`}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl animate-scale-in origin-top-right z-50">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                          className="text-[10px] text-accent font-bold hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div key={n.id} className={`p-3 rounded-xl border transition-all ${n.unread ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent opacity-60'}`}>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className={`text-xs font-bold ${n.unread ? 'text-white' : 'text-neutral-400'}`}>{n.title}</h4>
                              <span className="text-[10px] text-neutral-500">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed font-medium">{n.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center">
                          <p className="text-xs text-neutral-500">No new notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Messages */}
              <Link
                to="/messages"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-accent hover:border-accent/30 transition-all"
                title="Messages"
              >
                <MessageSquare size={18} />
              </Link>


              {/* Profile */}
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pr-3 hover:bg-white/10 transition-all ${isProfileOpen ? 'border-accent/40 bg-accent/5' : ''}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-legal-blue text-xs font-bold text-white border border-white/10 shadow-[0_0_10px_rgba(26,35,126,0.3)]">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{user?.name || 'Demo'}</span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-xl border border-white/10 bg-black/90 p-1 shadow-2xl backdrop-blur-xl animate-scale-in origin-top-right z-50">
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                      <User size={14} /> Profile
                    </Link>
                    <div className="h-px bg-white/5 my-1 mx-2" />
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest text-red-500/80 hover:bg-red-500/5 transition-colors">
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Minimal header for Home or Logged-out users
            !['/login', '/signup'].includes(location.pathname) && (
              <Link to="/login" className="relative overflow-hidden px-10 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-105 group">
                <span className="relative z-10 flex items-center gap-2">Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-100/50 to-transparent -translate-x-[100%] group-hover:animate-shimmer" />
              </Link>
            )
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl animate-slide-down absolute w-full left-0">
          <div className="px-4 py-4 space-y-1">


            {!showAppNav ? (
              <>
                <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Home</NavLink>
                <NavLink to="/updates" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Updates</NavLink>
                <NavLink to="/saved-articles" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Saved Articles</NavLink>
                <NavLink to="/about-us" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Mission</NavLink>
                <NavLink to="/jan-manch" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Forum</NavLink>
                <div className="h-px bg-white/10 my-2" />
                <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className={`${mobileLinkClass} text-accent font-bold`}>Login</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Dashboard</NavLink>
                <NavLink to="/jan-nyaya" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Jan-Nyaya</NavLink>
                <NavLink to="/timeline" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Timeline</NavLink>
                <div className="h-px bg-white/10 my-2" />
                <p className="px-4 py-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">More</p>
                <NavLink to="/nyaya-gyan" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Know Law</NavLink>
                <NavLink to="/vakeel-connect" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Find Lawyer</NavLink>
                <NavLink to="/jan-manch" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Forum</NavLink>
                <NavLink to="/about-us" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Mission</NavLink>
                <NavLink to="/stories" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Stories</NavLink>
                <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Contact</NavLink>
                <NavLink to="/updates" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Updates</NavLink>
                <NavLink to="/saved-articles" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Saved Articles</NavLink>
                <NavLink to="/sahayak" onClick={() => setIsMobileMenuOpen(false)} className={`${mobileLinkClass} text-accent`}>Sahayak AI</NavLink>
                <div className="h-px bg-white/10 my-2" />
                <button onClick={handleLogout} className="w-full text-left block rounded-lg px-4 py-3 text-base font-medium text-red-400 hover:bg-white/5 transition-colors">Log Out</button>
              </>
            )}
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;

