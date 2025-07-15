import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Legend: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Population Density */}
        <div>
          <h4 className="text-xs font-medium mb-2 text-muted-foreground">Population Density</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-gis-tehsil-low border border-border"></div>
              <span className="text-xs">Low (0-5K/km²)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 border border-border" style={{ backgroundColor: '#7FB069' }}></div>
              <span className="text-xs">Medium (5K-15K/km²)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-gis-tehsil-high border border-border"></div>
              <span className="text-xs">High (15K+/km²)</span>
            </div>
          </div>
        </div>

        {/* Transport Lines */}
        <div>
          <h4 className="text-xs font-medium mb-2 text-muted-foreground">Transport Lines</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-gis-metro-line border-dashed border-t-2 border-gis-metro-line"></div>
              <span className="text-xs">Metro Lines</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-gis-railway-line"></div>
              <span className="text-xs">Railway Lines</span>
            </div>
          </div>
        </div>

        {/* Stations */}
        <div>
          <h4 className="text-xs font-medium mb-2 text-muted-foreground">Stations</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gis-metro-station rounded-full border-2 border-white"></div>
              <span className="text-xs">Metro Stations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gis-railway-station rounded-full border-2 border-white"></div>
              <span className="text-xs">Railway Stations</span>
            </div>
          </div>
        </div>

        {/* Contours */}
        <div>
          <h4 className="text-xs font-medium mb-2 text-muted-foreground">Elevation</h4>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-muted-foreground"></div>
            <span className="text-xs">Contour Lines</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Legend;