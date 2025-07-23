import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { RootState } from '../store';
import { setSelectedSDG } from '../store/slices/layersSlice';

// Official UN SDG data with standard colors and icons
const SDG_DATA = [
  { id: 1, name: "No Poverty", color: "#E5243B", icon: "🏠", theme: "poverty" },
  { id: 2, name: "Zero Hunger", color: "#DDA63A", icon: "🌾", theme: "hunger" },
  { id: 3, name: "Good Health and Well-being", color: "#4C9F38", icon: "🏥", theme: "health" },
  { id: 4, name: "Quality Education", color: "#C5192D", icon: "📚", theme: "education" },
  { id: 5, name: "Gender Equality", color: "#FF3A21", icon: "⚖️", theme: "gender" },
  { id: 6, name: "Clean Water and Sanitation", color: "#26BDE2", icon: "💧", theme: "water" },
  { id: 7, name: "Affordable and Clean Energy", color: "#FCC30B", icon: "⚡", theme: "energy" },
  { id: 8, name: "Decent Work and Economic Growth", color: "#A21942", icon: "💼", theme: "economy" },
  { id: 9, name: "Industry, Innovation and Infrastructure", color: "#FD6925", icon: "🏗️", theme: "infrastructure" },
  { id: 10, name: "Reduced Inequalities", color: "#DD1367", icon: "📊", theme: "inequality" },
  { id: 11, name: "Sustainable Cities and Communities", color: "#FD9D24", icon: "🏙️", theme: "cities" },
  { id: 12, name: "Responsible Consumption and Production", color: "#BF8B2E", icon: "♻️", theme: "consumption" },
  { id: 13, name: "Climate Action", color: "#3F7E44", icon: "🌍", theme: "climate" },
  { id: 14, name: "Life Below Water", color: "#0A97D9", icon: "🐠", theme: "marine" },
  { id: 15, name: "Life on Land", color: "#56C02B", icon: "🌳", theme: "terrestrial" },
  { id: 16, name: "Peace, Justice and Strong Institutions", color: "#00689D", icon: "🕊️", theme: "justice" },
  { id: 17, name: "Partnerships for the Goals", color: "#19486A", icon: "🤝", theme: "partnerships" },
];

const SDGBar: React.FC = () => {
  const dispatch = useDispatch();
  const selectedSDG = useSelector((state: RootState) => state.layers.selectedSDG);

  const handleSDGClick = useCallback(async (sdgId: number) => {
    const sdg = SDG_DATA.find(s => s.id === sdgId);
    if (!sdg) return;

    // Toggle selection - same SDG clicked twice will deselect
    const newSelection = selectedSDG === sdgId ? null : sdgId;
    dispatch(setSelectedSDG(newSelection));

    // Load SDG GeoJSON layer from backend if selecting
    if (newSelection) {
      try {
        const response = await fetch(`/geojson/sdg/${sdg.theme}`);
        if (response.ok) {
          const geoJsonData = await response.json();
          // TODO: Add to map layers
          console.log('SDG GeoJSON loaded:', geoJsonData);
        }
      } catch (error) {
        console.warn('SDG GeoJSON not available:', error);
      }
    }
  }, [selectedSDG, dispatch]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="glass p-3 max-w-6xl">
        <TooltipProvider>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-xs font-medium text-muted-foreground px-2 whitespace-nowrap flex-shrink-0">
              Sustainable Development Goals:
            </span>
            <div className="flex gap-2 flex-nowrap">
              {SDG_DATA.map((sdg) => (
                <Tooltip key={sdg.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`
                        flex items-center gap-2 px-3 py-2 h-auto whitespace-nowrap rounded-lg
                        transition-all duration-200 border-2 flex-shrink-0
                        hover:scale-105 hover:shadow-lg
                        ${selectedSDG === sdg.id 
                          ? 'border-white/50 shadow-lg scale-105 ring-2 ring-white/30' 
                          : 'border-white/20 hover:border-white/40'
                        }
                      `}
                      style={{ 
                        backgroundColor: sdg.color,
                        color: '#FFFFFF'
                      }}
                      onClick={() => handleSDGClick(sdg.id)}
                    >
                      <span className="text-base">{sdg.icon}</span>
                      <span className="text-xs font-bold">{sdg.id}</span>
                      <span className="text-xs font-medium hidden sm:inline">{sdg.name}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs bg-background/95 backdrop-blur-md border shadow-lg">
                    <div className="text-center p-3">
                      <div className="text-2xl mb-2">{sdg.icon}</div>
                      <div className="font-bold text-foreground">SDG {sdg.id}</div>
                      <div className="text-sm font-medium text-primary mt-1">{sdg.name}</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </Card>
    </div>
  );
};

export default SDGBar;