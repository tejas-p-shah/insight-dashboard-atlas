import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight, Sun, Moon, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';
import type { RootState } from '../store';
import { toggleLayer, setTimeRange } from '../store/slices/layersSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import Legend from './Legend';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  
  const { layers, timeRange } = useSelector((state: RootState) => state.layers);
  const { isDark } = useSelector((state: RootState) => state.theme);

  const handleLayerToggle = (layerId: string) => {
    dispatch(toggleLayer(layerId));
  };

  const handleTimeRangeChange = (value: number[]) => {
    dispatch(setTimeRange(value[0]));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div 
      className={`
        relative h-full transition-all duration-300 ease-in-out border-r border-border bg-sidebar
        ${collapsed ? 'w-12' : 'w-80'}
      `}
    >
      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-10 rounded-full bg-background border border-border shadow-md w-6 h-6 p-0"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Sidebar Content */}
      <div className={`h-full overflow-hidden ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-200`}>
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-sidebar-foreground mb-2">
              GIS Census Dashboard
            </h1>
            <p className="text-sm text-sidebar-foreground/70">
              Interactive map visualization of census and infrastructure data
            </p>
          </div>

          {/* Theme Toggle */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme-toggle" className="flex items-center gap-2 text-sm font-medium">
                  {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Label>
                <Switch
                  id="theme-toggle"
                  checked={isDark}
                  onCheckedChange={handleThemeToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Time Range Slider */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Filter by Year: {timeRange.current}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Slider
                value={[timeRange.current]}
                min={timeRange.start}
                max={timeRange.end}
                step={1}
                onValueChange={handleTimeRangeChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{timeRange.start}</span>
                <span>{timeRange.end}</span>
              </div>
            </CardContent>
          </Card>

          {/* Layer Controls */}
          <Card className="mb-4 flex-1 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm">Map Layers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 overflow-y-auto">
              {layers.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <Label 
                    htmlFor={layer.id} 
                    className="flex items-center gap-3 text-sm font-medium cursor-pointer flex-1"
                  >
                    <span className="text-base">{layer.icon}</span>
                    <span className="flex-1">{layer.name}</span>
                  </Label>
                  <Switch
                    id={layer.id}
                    checked={layer.visible}
                    onCheckedChange={() => handleLayerToggle(layer.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Legend */}
          <Legend />
        </div>
      </div>

      {/* Collapsed State Mini Icons */}
      {collapsed && (
        <div className="flex flex-col items-center py-4 space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            className="w-8 h-8 p-0"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          {layers.slice(0, 6).map((layer) => (
            <Button
              key={layer.id}
              variant="ghost"
              size="sm"
              onClick={() => handleLayerToggle(layer.id)}
              className={`w-8 h-8 p-0 ${layer.visible ? 'bg-primary text-primary-foreground' : ''}`}
              title={layer.name}
            >
              <span className="text-sm">{layer.icon}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;