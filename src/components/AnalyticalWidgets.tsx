import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { BarChart3, PieChart, TrendingUp, Map } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

// Mock data for charts
const populationData = [
  { name: 'Mumbai City', value: 3141625, color: '#4C9F70' },
  { name: 'Mumbai Suburban', value: 9356962, color: '#FFD97D' },
  { name: 'Thane', value: 1841128, color: '#5B5F6D' },
  { name: 'Raigad', value: 765223, color: '#2B2D42' },
];

const densityData = [
  { name: 'Mumbai City', density: 27209 },
  { name: 'Mumbai Sub.', density: 20925 },
  { name: 'Thane', density: 1684 },
  { name: 'Raigad', density: 276 },
];

const temporalData = [
  { year: '2001', population: 11.9 },
  { year: '2011', population: 13.6 },
  { year: '2021', population: 15.1 },
  { year: '2031', population: 16.8 },
];

const AnalyticalWidgets: React.FC = () => {
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="distribution" className="text-xs">
              <PieChart className="h-3 w-3 mr-1" />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="text-xs">
              <Map className="h-3 w-3 mr-1" />
              Heatmap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h4 className="text-xs font-medium mb-2 text-muted-foreground">
                Population Density by District
              </h4>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={densityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    formatter={(value: any) => [`${value.toLocaleString()} per km²`, 'Density']}
                    labelStyle={{ fontSize: '12px' }}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="density" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <div>
              <h4 className="text-xs font-medium mb-2 text-muted-foreground">
                Population Distribution
              </h4>
              <ResponsiveContainer width="100%" height={160}>
                <RechartsPieChart>
                  <Pie
                    data={populationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                  >
                    {populationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [formatNumber(value), 'Population']}
                    labelStyle={{ fontSize: '12px' }}
                    contentStyle={{ fontSize: '12px' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {populationData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div>
              <h4 className="text-xs font-medium mb-2 text-muted-foreground">
                Population Growth Trend (Millions)
              </h4>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={temporalData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    formatter={(value: any) => [`${value}M`, 'Population']}
                    labelStyle={{ fontSize: '12px' }}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="population" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <div>
              <h4 className="text-xs font-medium mb-2 text-muted-foreground">
                Density Heatmap Control
              </h4>
              <div className="space-y-3">
                <Button
                  variant={heatmapEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHeatmapEnabled(!heatmapEnabled)}
                  className="w-full text-xs"
                >
                  {heatmapEnabled ? 'Disable' : 'Enable'} Population Heatmap
                </Button>
                
                {heatmapEnabled && (
                  <div className="bg-background/30 rounded-lg p-3 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Heatmap overlay is now active. The map shows population density 
                      with color intensity.
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Low Density</span>
                      <div className="flex-1 mx-2 h-2 rounded-full bg-gradient-to-r from-green-200 to-red-500"></div>
                      <span>High Density</span>
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  <p className="mb-1">Available Heatmap Types:</p>
                  <ul className="space-y-1 ml-2">
                    <li>• Population Density</li>
                    <li>• Economic Activity (Coming Soon)</li>
                    <li>• Development Index (Coming Soon)</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticalWidgets;