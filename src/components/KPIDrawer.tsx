import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Users, Building, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import PopulationPanel from './panels/PopulationPanel';
import InfrastructurePanel from './panels/InfrastructurePanel';
import EnvironmentPanel from './panels/EnvironmentPanel';
import type { RootState } from '../store';
import { setSelectedFeature, setActiveKpiPanel } from '../store/slices/layersSlice';

const KPIDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedFeature, activeKpiPanel } = useSelector((state: RootState) => state.layers);

  const handleClose = () => {
    dispatch(setSelectedFeature(null));
  };

  const handleTabChange = (value: string) => {
    dispatch(setActiveKpiPanel(value as 'population' | 'infrastructure' | 'environment'));
  };

  if (!selectedFeature) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full lg:w-96 bg-background/80 backdrop-blur-md border-l border-border/50 shadow-2xl z-50 overflow-hidden animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">
              Feature Details
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-background/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeKpiPanel} onValueChange={handleTabChange} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 mx-4 mt-4 bg-background/50 backdrop-blur-sm">
                <TabsTrigger value="population" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Population</span>
                </TabsTrigger>
                <TabsTrigger value="infrastructure" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Infrastructure</span>
                </TabsTrigger>
                <TabsTrigger value="environment" className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  <span className="hidden sm:inline">Environment</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto p-4">
                <TabsContent value="population" className="mt-0">
                  <PopulationPanel feature={selectedFeature} />
                </TabsContent>
                <TabsContent value="infrastructure" className="mt-0">
                  <InfrastructurePanel feature={selectedFeature} />
                </TabsContent>
                <TabsContent value="environment" className="mt-0">
                  <EnvironmentPanel feature={selectedFeature} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default KPIDrawer;