import React from 'react';
import { useSelector } from 'react-redux';
import { Users, Target, TrendingUp, Activity, MapPin, Train } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { RootState } from '../store';

const KPIWidgets: React.FC = () => {
  const { selectedTehsilKPIs, infrastructureKPIs } = useSelector((state: RootState) => state.kpis);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-4">
      {/* Selected Tehsil KPIs */}
      {selectedTehsilKPIs && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {selectedTehsilKPIs.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Population</span>
                </div>
                <p className="text-2xl font-bold">{formatNumber(selectedTehsilKPIs.population)}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Density</span>
                </div>
                <p className="text-2xl font-bold">{formatNumber(selectedTehsilKPIs.density)}/km²</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Literacy Rate</span>
                </div>
                <p className="text-2xl font-bold">{selectedTehsilKPIs.literacyRate}%</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Sex Ratio</span>
                </div>
                <p className="text-2xl font-bold">{selectedTehsilKPIs.sexRatio}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Infrastructure KPIs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Train className="h-5 w-5" />
            Infrastructure Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gis-metro-line rounded"></div>
                <span className="text-sm text-muted-foreground">Metro Network</span>
              </div>
              <p className="text-xl font-bold">{infrastructureKPIs.metroLength} km</p>
              <p className="text-xs text-muted-foreground">{infrastructureKPIs.metroStations} stations</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gis-railway-line rounded"></div>
                <span className="text-sm text-muted-foreground">Railway Network</span>
              </div>
              <p className="text-xl font-bold">{infrastructureKPIs.railwayLength} km</p>
              <p className="text-xs text-muted-foreground">{infrastructureKPIs.railwayStations} stations</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Coverage</span>
              </div>
              <p className="text-xl font-bold">{infrastructureKPIs.coveragePercent}%</p>
              <p className="text-xs text-muted-foreground">within 1km of stations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Population</p>
                <p className="text-2xl font-bold">4.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stations</p>
                <p className="text-2xl font-bold">{infrastructureKPIs.metroStations + infrastructureKPIs.railwayStations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KPIWidgets;