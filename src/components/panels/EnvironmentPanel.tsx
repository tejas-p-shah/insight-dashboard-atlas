import React from 'react';
import { TreePine, Droplets, Wind, Sun, Thermometer, CloudRain } from 'lucide-react';
import KPICard from '../KPICard';

interface EnvironmentPanelProps {
  feature: any;
}

const EnvironmentPanel: React.FC<EnvironmentPanelProps> = ({ feature }) => {
  // Mock data - replace with actual feature properties
  const environmentData = {
    greenCoverage: feature?.properties?.greenCoverage || 28,
    airQualityIndex: feature?.properties?.airQualityIndex || 165,
    elevation: feature?.properties?.elevation || 280,
    avgTemperature: feature?.properties?.avgTemperature || 24.5,
    rainfall: feature?.properties?.rainfall || 785,
    waterBodies: feature?.properties?.waterBodies || 2,
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-500' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-500' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: 'text-orange-500' };
    return { status: 'Unhealthy', color: 'text-red-500' };
  };

  const aqiStatus = getAQIStatus(environmentData.airQualityIndex);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Environmental Data
        </h3>
        <p className="text-sm text-muted-foreground">
          Green spaces, air quality, and climate information
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-2 gap-4">
        <KPICard
          title="Green Coverage"
          value={`${environmentData.greenCoverage}%`}
          icon={TreePine}
          iconColor="text-green-500"
          className="col-span-2"
        />
        
        <KPICard
          title="Air Quality"
          value={environmentData.airQualityIndex.toString()}
          icon={Wind}
          iconColor={aqiStatus.color}
          subtitle={aqiStatus.status}
        />
        
        <KPICard
          title="Elevation"
          value={`${environmentData.elevation}m`}
          icon={Thermometer}
          iconColor="text-blue-500"
        />
        
        <KPICard
          title="Avg Temperature"
          value={`${environmentData.avgTemperature}°C`}
          icon={Sun}
          iconColor="text-orange-500"
        />
        
        <KPICard
          title="Annual Rainfall"
          value={`${environmentData.rainfall}mm`}
          icon={CloudRain}
          iconColor="text-blue-400"
        />
      </div>

      {/* Environmental Metrics */}
      <div className="mt-6 bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-border/30">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Droplets className="h-4 w-4 text-blue-500" />
          Water Resources
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Water Bodies</span>
            <span className="text-sm font-medium">{environmentData.waterBodies}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Groundwater Level</span>
            <span className="text-sm font-medium">45m below surface</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Water Quality Index</span>
            <span className="text-sm font-medium">Good</span>
          </div>
        </div>
      </div>

      {/* Climate Trends */}
      <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-border/30">
        <h4 className="font-medium text-foreground mb-3">Climate Trends</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Temperature Trend</span>
            <span className="text-sm font-medium text-red-500">+0.8°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Rainfall Trend</span>
            <span className="text-sm font-medium text-blue-500">-12%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Green Cover Change</span>
            <span className="text-sm font-medium text-green-500">+3.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentPanel;