import React from 'react'
import { useLocation } from 'react-router-dom';

const ScrollOnTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // ensure the window scrolls to the top when the route changes
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

export default ScrollOnTop;