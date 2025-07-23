import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, MapPin } from 'lucide-react';
import type { RootState } from '../store';

interface SDGSummary {
  sdgId: number;
  theme: string;
  topPerformers: Array<{
    name: string;
    score: number;
    rank: number;
  }>;
  overallScore: number;
  distribution: Array<{
    category: string;
    value: number;
    color: string;
  }>;
  trends: Array<{
    period: string;
    value: number;
  }>;
}

const SDGAnalytics: React.FC = () => {
  const selectedSDG = useSelector((state: RootState) => state.layers.selectedSDG);
  const [sdgData, setSdgData] = useState<SDGSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedSDG) {
      setSdgData(null);
      return;
    }

    const fetchSDGData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/sdg-summary/${selectedSDG}`);
        if (response.ok) {
          const data = await response.json();
          setSdgData(data);
        } else {
          // Mock data for demonstration
          setSdgData({
            sdgId: selectedSDG,
            theme: `SDG ${selectedSDG}`,
            topPerformers: [
              { name: 'Bandra East', score: 8.7, rank: 1 },
              { name: 'Worli', score: 8.4, rank: 2 },
              { name: 'Andheri West', score: 8.1, rank: 3 },
            ],
            overallScore: 7.2,
            distribution: [
              { category: 'Excellent', value: 25, color: '#10B981' },
              { category: 'Good', value: 45, color: '#3B82F6' },
              { category: 'Average', value: 20, color: '#F59E0B' },
              { category: 'Poor', value: 10, color: '#EF4444' },
            ],
            trends: [
              { period: '2020', value: 6.5 },
              { period: '2021', value: 6.8 },
              { period: '2022', value: 7.0 },
              { period: '2023', value: 7.2 },
            ],
          });
        }
      } catch (error) {
        console.warn('SDG analytics not available:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSDGData();
  }, [selectedSDG]);

  if (!selectedSDG) {
    return (
      <Card className="glass">
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Select an SDG to view analytics and insights
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="glass">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!sdgData) {
    return (
      <Card className="glass">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No analytics data available for SDG {selectedSDG}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            SDG {sdgData.sdgId} Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">{sdgData.overallScore}</p>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Regional Average: 6.8
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Top Performing Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sdgData.topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {performer.rank}
                  </div>
                  <span className="text-sm font-medium">{performer.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {performer.score}/10
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribution Chart */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Performance Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sdgData.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sdgData.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {sdgData.distribution.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.category} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trends Chart */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Progress Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sdgData.trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="period" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SDGAnalytics;