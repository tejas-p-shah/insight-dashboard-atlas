import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { RootState } from '../store';

const DataSummary: React.FC = () => {
  const selectedFeature = useSelector((state: RootState) => state.layers.selectedFeature);
  const selectedSDG = useSelector((state: RootState) => state.layers.selectedSDG);

  // Mock data for demonstration
  const summaryData = {
    totalPopulation: "12.4M",
    totalArea: "4,354 km²",
    averageDensity: "2,847 per km²",
    topDistricts: [
      { name: "Mumbai City", value: "3.1M population" },
      { name: "Mumbai Suburban", value: "9.3M population" },
      { name: "Thane", value: "1.8M population" }
    ],
    activeFilters: selectedSDG ? [`SDG ${selectedSDG}`] : [],
    visibleLayers: 6,
    dataQuality: "95%"
  };

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Data Summary</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">
                  Summary statistics based on current map view and active filters.
                  Click on regions or toggle layers to update the data.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Population</p>
            <p className="text-sm font-semibold">{summaryData.totalPopulation}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Coverage Area</p>
            <p className="text-sm font-semibold">{summaryData.totalArea}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Avg. Density</p>
            <p className="text-sm font-semibold">{summaryData.averageDensity}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Data Quality</p>
            <p className="text-sm font-semibold text-green-600">{summaryData.dataQuality}</p>
          </div>
        </div>

        {/* Top Districts */}
        <div>
          <h4 className="text-xs font-medium mb-2 text-muted-foreground">Top 3 by Population</h4>
          <div className="space-y-1">
            {summaryData.topDistricts.map((district, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span className="font-medium">{district.name}</span>
                <span className="text-muted-foreground">{district.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {summaryData.activeFilters.length > 0 && (
          <div>
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Active Filters</h4>
            <div className="flex flex-wrap gap-1">
              {summaryData.activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Layer Status */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Visible Layers</span>
            <Badge variant="outline" className="text-xs">
              {summaryData.visibleLayers} active
            </Badge>
          </div>
        </div>

        {/* Selected Feature Info */}
        {selectedFeature && (
          <div className="pt-2 border-t border-border/50">
            <h4 className="text-xs font-medium mb-1 text-muted-foreground">Selected Region</h4>
            <p className="text-sm font-medium">
              {selectedFeature.properties?.NAME || 'Unknown Region'}
            </p>
            {selectedFeature.properties?.Population_2021 && (
              <p className="text-xs text-muted-foreground">
                Population: {selectedFeature.properties.Population_2021.toLocaleString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataSummary;