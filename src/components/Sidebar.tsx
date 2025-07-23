import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight, Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import type { RootState } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';
import LayerGroup from './LayerGroup';
import GeoJSONUpload from './GeoJSONUpload';
import DataSummary from './DataSummary';
import { addUploadedLayer, removeUploadedLayer, toggleUploadedLayer } from '../store/slices/layersSlice';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { uploadedLayers } = useSelector((state: RootState) => state.layers);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLayerAdd = (layer: any) => {
    dispatch(addUploadedLayer(layer));
  };

  const handleLayerToggle = (id: string) => {
    dispatch(toggleUploadedLayer(id));
  };

  const handleLayerRemove = (id: string) => {
    dispatch(removeUploadedLayer(id));
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-md border border-border/50 shadow-lg"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:relative h-full transition-all duration-300 ease-in-out z-40
          bg-background/80 backdrop-blur-md border-r border-border/50 shadow-2xl
          ${collapsed ? 'lg:w-16' : 'lg:w-80'}
          ${mobileOpen ? 'w-80' : 'w-0 lg:w-auto'}
          ${mobileOpen ? 'left-0' : '-left-80 lg:left-0'}
        `}
      >
        {/* Desktop Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-10 rounded-full bg-background border border-border shadow-md w-8 h-8 p-0 hidden lg:flex items-center justify-center hover:bg-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        {/* Sidebar Content */}
        <div className={`h-full overflow-hidden ${collapsed ? 'lg:opacity-0 lg:pointer-events-none' : 'opacity-100'} transition-opacity duration-200`}>
          <div className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="mb-6 mt-8 lg:mt-0">
              <h1 className="text-xl font-bold text-foreground mb-2">
                GIS Census Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Interactive map visualization of census and infrastructure data
              </p>
            </div>

            {/* Theme Toggle */}
            <div className="mb-4 bg-background/90 backdrop-blur-md border border-border rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={handleThemeToggle}
                />
              </div>
            </div>

            {/* Compact GeoJSON Upload */}
            <div className="mb-4">
              <GeoJSONUpload 
                onLayerAdd={handleLayerAdd}
                onLayerToggle={handleLayerToggle}
                onLayerRemove={handleLayerRemove}
                uploadedLayers={uploadedLayers}
                compact={true}
              />
            </div>

            {/* Layer Groups */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              <LayerGroup 
                title="Administrative" 
                category="administrative" 
                icon="🏛️" 
                defaultOpen={true}
              />
              <LayerGroup 
                title="Population" 
                category="population" 
                icon="👥" 
                defaultOpen={true}
              />
              <LayerGroup 
                title="Infrastructure" 
                category="infrastructure" 
                icon="🚇" 
                defaultOpen={true}
              />
              <LayerGroup 
                title="Facilities" 
                category="facilities" 
                icon="🏥" 
              />
              <LayerGroup 
                title="Environment" 
                category="environment" 
                icon="🌳" 
              />
            </div>

            <Separator className="my-4" />

            {/* Data Summary - Moved from Right Panel */}
            <DataSummary collapsible={true} />
          </div>
        </div>

        {/* Collapsed State Mini Icons */}
        {collapsed && (
          <div className="hidden lg:flex flex-col items-center py-4 space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="w-8 h-8 p-0 bg-background/60 backdrop-blur-md hover:bg-background/80"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            
            <div className="w-8 h-8 flex items-center justify-center text-xl">🏛️</div>
            <div className="w-8 h-8 flex items-center justify-center text-xl">👥</div>
            <div className="w-8 h-8 flex items-center justify-center text-xl">🚇</div>
            <div className="w-8 h-8 flex items-center justify-center text-xl">🏥</div>
            <div className="w-8 h-8 flex items-center justify-center text-xl">🌳</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;