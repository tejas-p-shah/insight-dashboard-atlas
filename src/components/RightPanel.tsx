import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import Legend from './Legend';
import AnalyticalWidgets from './AnalyticalWidgets';
import SDGAnalytics from './SDGAnalytics';
import type { RootState } from '../store';

const RightPanel: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const selectedSDG = useSelector((state: RootState) => state.layers.selectedSDG);

  return (
    <div className={`fixed right-0 top-0 h-full z-40 transition-all duration-300 ${
      collapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Collapse Toggle */}
      <Button
        variant="outline"
        size="sm"
        className="absolute -left-10 top-20 z-50 glass border-l-0 rounded-l-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {/* Panel Content */}
      <div className={`h-full transition-all duration-300 ${
        collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <Card className="h-full rounded-none glass border-l border-r-0 border-t-0 border-b-0">
          <div className="h-full overflow-y-auto p-4 space-y-4">
            <h2 className="text-lg font-semibold">
              {selectedSDG ? 'SDG Analytics' : 'Data Insights'}
            </h2>
            
            {/* SDG Analytics (when SDG is selected) or General Analytics */}
            {selectedSDG ? (
              <SDGAnalytics />
            ) : (
              <>
                {/* Analytical Widgets */}
                <AnalyticalWidgets />
                
                <Separator />
                
                {/* Legend moved here */}
                <Legend />
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Collapsed State Mini Icon */}
      {collapsed && (
        <div className="h-full flex flex-col items-center justify-center bg-background/60 backdrop-blur-md border-l border-border/50">
          <Button
            variant="ghost"
            size="sm"
            className="rotate-90 text-xs"
            onClick={() => setCollapsed(false)}
          >
            Insights
          </Button>
        </div>
      )}
    </div>
  );
};

export default RightPanel;