import React from 'react';
import { Train, MapPin, Route, Wifi, Zap, Droplets } from 'lucide-react';
import KPICard from '../KPICard';

interface InfrastructurePanelProps {
  feature: any;
}

const InfrastructurePanel: React.FC<InfrastructurePanelProps> = ({ feature }) => {
  // Mock data - replace with actual feature properties
  const infrastructureData = {
    metroStations: feature?.properties?.metroStations || 3,
    railwayStations: feature?.properties?.railwayStations || 1,
    roadDensity: feature?.properties?.roadDensity || 2.8,
    internetCoverage: feature?.properties?.internetCoverage || 85,
    powerReliability: feature?.properties?.powerReliability || 92,
    waterAccess: feature?.properties?.waterAccess || 78,
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Infrastructure Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Transportation and utilities data
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-2 gap-4">
        <KPICard
          title="Metro Stations"
          value={infrastructureData.metroStations.toString()}
          icon={Train}
          iconColor="text-blue-500"
        />
        
        <KPICard
          title="Railway Stations"
          value={infrastructureData.railwayStations.toString()}
          icon={MapPin}
          iconColor="text-purple-500"
        />
        
        <KPICard
          title="Road Density"
          value={`${infrastructureData.roadDensity} km/km²`}
          icon={Route}
          className="col-span-2"
        />
        
        <KPICard
          title="Internet Coverage"
          value={`${infrastructureData.internetCoverage}%`}
          icon={Wifi}
          iconColor="text-green-500"
        />
        
        <KPICard
          title="Power Reliability"
          value={`${infrastructureData.powerReliability}%`}
          icon={Zap}
          iconColor="text-yellow-500"
        />
      </div>

      {/* Utilities Section */}
      <div className="mt-6 bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-border/30">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Droplets className="h-4 w-4 text-blue-500" />
          Water & Sanitation
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Water Access</span>
            <span className="text-sm font-medium">{infrastructureData.waterAccess}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Sewerage Coverage</span>
            <span className="text-sm font-medium">65%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Waste Management</span>
            <span className="text-sm font-medium">72%</span>
          </div>
        </div>
      </div>

      {/* Transport Accessibility */}
      <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-border/30">
        <h4 className="font-medium text-foreground mb-3">Transport Accessibility</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Within 1km of Metro</span>
            <span className="text-sm font-medium">45%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Within 1km of Railway</span>
            <span className="text-sm font-medium">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructurePanel;