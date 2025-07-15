import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import type { RootState } from '../store';
import { toggleLayer } from '../store/slices/layersSlice';
import type { LayerState } from '../store/slices/layersSlice';

interface LayerGroupProps {
  title: string;
  category: LayerState['category'];
  icon: string;
  defaultOpen?: boolean;
}

const LayerGroup: React.FC<LayerGroupProps> = ({ title, category, icon, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const dispatch = useDispatch();
  
  const layers = useSelector((state: RootState) => 
    state.layers.layers.filter(layer => layer.category === category)
  );

  const handleLayerToggle = (layerId: string) => {
    dispatch(toggleLayer(layerId));
  };

  if (layers.length === 0) return null;

  return (
    <div className="bg-background/60 backdrop-blur-md border border-border/50 rounded-xl shadow-md">
      {/* Group Header */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between p-4 h-auto rounded-xl hover:bg-background/30 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span className="font-medium text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>

      {/* Group Content */}
      {isOpen && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          {layers.map((layer) => (
            <div key={layer.id} className="flex items-center justify-between group">
              <Label 
                htmlFor={layer.id} 
                className="flex items-center gap-3 text-sm font-medium cursor-pointer flex-1 group-hover:text-primary transition-colors duration-200"
              >
                <span className="text-base">{layer.icon}</span>
                <span className="flex-1">{layer.name}</span>
              </Label>
              <Switch
                id={layer.id}
                checked={layer.visible}
                onCheckedChange={() => handleLayerToggle(layer.id)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayerGroup;