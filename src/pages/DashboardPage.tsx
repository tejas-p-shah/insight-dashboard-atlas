import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MapView from '../components/MapView';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import KPIDrawer from '../components/KPIDrawer';
import SDGBar from '../components/SDGBar';
import RightPanel from '../components/RightPanel';
import type { RootState } from '../store';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: RootState) => state.theme);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Bar */}
        <TopBar />
        
        {/* Map Container */}
        <div className="flex-1 relative">
          <MapView />
        </div>
        
        {/* KPI Drawer */}
        <KPIDrawer />
        
        {/* SDG Bar */}
        <SDGBar />
      </div>
      
      {/* Right Panel */}
      <RightPanel />
    </div>
  );
};

export default DashboardPage;