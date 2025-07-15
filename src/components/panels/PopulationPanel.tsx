import React from 'react';
import { Users, Target, TrendingUp, Activity, Baby, GraduationCap } from 'lucide-react';
import KPICard from '../KPICard';

interface PopulationPanelProps {
  feature: any;
}

const PopulationPanel: React.FC<PopulationPanelProps> = ({ feature }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Mock data - replace with actual feature properties
  const populationData = {
    total: feature?.properties?.population || 125000,
    density: feature?.properties?.density || 850,
    literacyRate: feature?.properties?.literacyRate || 78.5,
    sexRatio: feature?.properties?.sexRatio || 945,
    childRatio: feature?.properties?.childRatio || 12.8,
    growthRate: feature?.properties?.growthRate || 2.3,
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {feature?.properties?.name || 'Selected Area'}
        </h3>
        <p className="text-sm text-muted-foreground">
          Population demographics and statistics
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-2 gap-4">
        <KPICard
          title="Total Population"
          value={formatNumber(populationData.total)}
          icon={Users}
          className="col-span-2"
          trend={`+${populationData.growthRate}%`}
        />
        
        <KPICard
          title="Density"
          value={`${formatNumber(populationData.density)}/km²`}
          icon={Target}
        />
        
        <KPICard
          title="Literacy Rate"
          value={`${populationData.literacyRate}%`}
          icon={GraduationCap}
        />
        
        <KPICard
          title="Sex Ratio"
          value={populationData.sexRatio.toString()}
          icon={Activity}
          subtitle="per 1000 males"
        />
        
        <KPICard
          title="Child Ratio"
          value={`${populationData.childRatio}%`}
          icon={Baby}
          subtitle="0-14 years"
        />
      </div>

      {/* Additional Demographics */}
      <div className="mt-6 bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-border/30">
        <h4 className="font-medium text-foreground mb-3">Age Distribution</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">0-14 years</span>
            <span className="text-sm font-medium">{populationData.childRatio}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">15-64 years</span>
            <span className="text-sm font-medium">{(100 - populationData.childRatio - 8.5).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">65+ years</span>
            <span className="text-sm font-medium">8.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationPanel;