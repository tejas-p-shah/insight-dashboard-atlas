import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MapView from '../components/MapView';
import Sidebar from '../components/Sidebar';
import KPIWidgets from '../components/KPIWidgets';
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
    <div className="h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar with KPIs */}
        <div className="border-b border-border bg-card p-4">
          <div className="max-w-full overflow-x-auto">
            <KPIWidgets />
          </div>
        </div>
        
        {/* Map Container */}
        <div className="flex-1 relative">
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;