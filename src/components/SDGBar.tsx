import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { RootState } from '../store';
import { setSelectedSDG } from '../store/slices/layersSlice';

const SDG_DATA = [
  { id: 1, name: "No Poverty", color: "#E5243B", icon: "🏠" },
  { id: 2, name: "Zero Hunger", color: "#DDA63A", icon: "🌾" },
  { id: 3, name: "Good Health and Well-being", color: "#4C9F38", icon: "🏥" },
  { id: 4, name: "Quality Education", color: "#C5192D", icon: "🎓" },
  { id: 5, name: "Gender Equality", color: "#FF3A21", icon: "⚖️" },
  { id: 6, name: "Clean Water and Sanitation", color: "#26BDE2", icon: "💧" },
  { id: 7, name: "Affordable and Clean Energy", color: "#FCC30B", icon: "⚡" },
  { id: 8, name: "Decent Work and Economic Growth", color: "#A21942", icon: "💼" },
  { id: 9, name: "Industry, Innovation and Infrastructure", color: "#FD6925", icon: "🏗️" },
  { id: 10, name: "Reduced Inequalities", color: "#DD1367", icon: "📊" },
  { id: 11, name: "Sustainable Cities and Communities", color: "#FD9D24", icon: "🏙️" },
  { id: 12, name: "Responsible Consumption and Production", color: "#BF8B2E", icon: "♻️" },
  { id: 13, name: "Climate Action", color: "#3F7E44", icon: "🌍" },
  { id: 14, name: "Life Below Water", color: "#0A97D9", icon: "🐠" },
  { id: 15, name: "Life on Land", color: "#56C02B", icon: "🌳" },
  { id: 16, name: "Peace, Justice and Strong Institutions", color: "#00689D", icon: "⚖️" },
  { id: 17, name: "Partnerships for the Goals", color: "#19486A", icon: "🤝" },
];

const SDGBar: React.FC = () => {
  const dispatch = useDispatch();
  const selectedSDG = useSelector((state: RootState) => state.layers.selectedSDG);

  const handleSDGClick = (sdgId: number) => {
    const newSelection = selectedSDG === sdgId ? null : sdgId;
    dispatch(setSelectedSDG(newSelection));
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="glass p-2">
        <TooltipProvider>
          <div className="flex items-center gap-1 max-w-4xl overflow-x-auto scrollbar-hide">
            <span className="text-xs font-medium text-muted-foreground px-2 whitespace-nowrap">
              SDGs:
            </span>
            {SDG_DATA.map((sdg) => (
              <Tooltip key={sdg.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`
                      h-10 w-10 p-0 rounded-full border-2 transition-all duration-300 relative
                      hover:scale-110 hover:shadow-lg
                      ${selectedSDG === sdg.id 
                        ? 'border-primary shadow-lg scale-105 animate-pulse' 
                        : 'border-transparent hover:border-border'
                      }
                    `}
                    style={{ 
                      backgroundColor: sdg.color,
                      color: '#FFFFFF'
                    }}
                    onClick={() => handleSDGClick(sdg.id)}
                  >
                    <span className="text-xs font-bold">{sdg.id}</span>
                    {selectedSDG === sdg.id && (
                      <div 
                        className="absolute inset-0 rounded-full animate-ping" 
                        style={{ backgroundColor: sdg.color, opacity: 0.3 }}
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="text-center">
                    <div className="text-lg mb-1">{sdg.icon}</div>
                    <div className="font-medium">SDG {sdg.id}</div>
                    <div className="text-xs text-muted-foreground">{sdg.name}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </Card>
    </div>
  );
};

export default SDGBar;