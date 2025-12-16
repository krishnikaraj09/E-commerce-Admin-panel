import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "./Componentes/Sidebar/SideBar";
import NavBar from "./Componentes/Navbar/NavBar";
import { routes } from "./routesConfig";
import SplashScreen from "./Componentes/SplashScreen/SplashScreen";
import SignIn from "./Componentes/LoginPages/SignIn";
import SignUp from "./Componentes/LoginPages/SignUp";
import UserContext from "./context/UserContext";
import useOnlineStatus from "./Hooks/useOnlineStatus";
import SizesContext from './context/SizesContext';
import ScrollOnTop from "./Componentes/ScrollOnTop/ScrollOnTop";

function App() {
  return (
    <Router>
      <ScrollOnTop />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const isOnline = useOnlineStatus();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [screen, setScreen] = useState("splash");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(user);
    setIsLoggedIn(true);
    setScreen("main");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setIsLoggedIn(false);
    setScreen("splash");
  };

  useEffect(() => {
    const saved = localStorage.getItem("loggedInUser");
    if (saved) {
      try {
        const user = JSON.parse(saved);
        setLoggedInUser(user);
        setIsLoggedIn(true);
        setScreen("main");
      } catch (error) {
        console.error("Error parsing loggedInUser from localStorage:", error);
        setScreen("splash");
      }
    } else {
      setScreen("splash");
    }
  }, []);

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  if (screen === "splash") return <SplashScreen />;

  if (!isOnline) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center text-center p-8 px-6 gap-2 bg-stone-400'>
        <h2 className='font-bold text-2xl'>You are offline!</h2>
        <p className='text-lg'>Please check your internet connection.</p>
      </div>
    );
  }

  if (screen === "login") {
    return (
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <SizesContext.Provider>
          <Routes>
            <Route path="*" element={<SignIn onLoginSuccess={handleLoginSuccess} onLogin={() => { setScreen('main'); setIsLoggedIn(true); }} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </SizesContext.Provider>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <div className="flex min-h-screen bg-gray-100">
        <SideBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onLogout={handleLogout}
        />

        <div className="flex-1">
          <NavBar toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} />

          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}


export default App;
