import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayerState {
  id: string;
  name: string;
  visible: boolean;
  icon: string;
  type: 'polygon' | 'line' | 'point';
  category: 'administrative' | 'population' | 'infrastructure' | 'facilities' | 'environment';
}

interface LayersState {
  layers: LayerState[];
  selectedTehsil: string | null;
  selectedFeature: any | null;
  activeKpiPanel: 'population' | 'infrastructure' | 'environment';
  timeRange: {
    start: number;
    end: number;
    current: number;
  };
  searchQuery: string;
  selectedSDG: number | null;
  uploadedLayers: any[];
}

const initialState: LayersState = {
  layers: [
    // Administrative
    {
      id: 'tehsils',
      name: 'Tehsils',
      visible: true,
      icon: '🗺️',
      type: 'polygon',
      category: 'administrative',
    },
    {
      id: 'districts',
      name: 'Districts',
      visible: false,
      icon: '🏛️',
      type: 'polygon',
      category: 'administrative',
    },
    // Population
    {
      id: 'population-density',
      name: 'Population Density',
      visible: true,
      icon: '👥',
      type: 'polygon',
      category: 'population',
    },
    {
      id: 'age-groups',
      name: 'Age Demographics',
      visible: false,
      icon: '📊',
      type: 'polygon',
      category: 'population',
    },
    // Infrastructure
    {
      id: 'metro-lines',
      name: 'Metro Lines',
      visible: true,
      icon: '🚇',
      type: 'line',
      category: 'infrastructure',
    },
    {
      id: 'railway-lines',
      name: 'Railway Lines',
      visible: true,
      icon: '🚆',
      type: 'line',
      category: 'infrastructure',
    },
    {
      id: 'metro-stations',
      name: 'Metro Stations',
      visible: true,
      icon: '🎯',
      type: 'point',
      category: 'infrastructure',
    },
    {
      id: 'railway-stations',
      name: 'Railway Stations',
      visible: true,
      icon: '🎯',
      type: 'point',
      category: 'infrastructure',
    },
    // Facilities
    {
      id: 'hospitals',
      name: 'Hospitals',
      visible: false,
      icon: '🏥',
      type: 'point',
      category: 'facilities',
    },
    {
      id: 'schools',
      name: 'Schools',
      visible: false,
      icon: '🏫',
      type: 'point',
      category: 'facilities',
    },
    // Environment
    {
      id: 'contours',
      name: 'Contours',
      visible: false,
      icon: '🏔️',
      type: 'line',
      category: 'environment',
    },
    {
      id: 'green-spaces',
      name: 'Green Spaces',
      visible: false,
      icon: '🌳',
      type: 'polygon',
      category: 'environment',
    },
  ],
  selectedTehsil: null,
  selectedFeature: null,
  activeKpiPanel: 'population',
  timeRange: {
    start: 1990,
    end: 2024,
    current: 2024,
  },
  searchQuery: '',
  selectedSDG: null,
  uploadedLayers: [],
};

const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    toggleLayer: (state, action: PayloadAction<string>) => {
      const layer = state.layers.find(l => l.id === action.payload);
      if (layer) {
        layer.visible = !layer.visible;
      }
    },
    setLayerVisibility: (state, action: PayloadAction<{ id: string; visible: boolean }>) => {
      const layer = state.layers.find(l => l.id === action.payload.id);
      if (layer) {
        layer.visible = action.payload.visible;
      }
    },
    setSelectedTehsil: (state, action: PayloadAction<string | null>) => {
      state.selectedTehsil = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<number>) => {
      state.timeRange.current = action.payload;
    },
    setSelectedFeature: (state, action: PayloadAction<any | null>) => {
      state.selectedFeature = action.payload;
    },
    setActiveKpiPanel: (state, action: PayloadAction<'population' | 'infrastructure' | 'environment'>) => {
      state.activeKpiPanel = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedSDG: (state, action: PayloadAction<number | null>) => {
      state.selectedSDG = action.payload;
    },
    addUploadedLayer: (state, action: PayloadAction<any>) => {
      state.uploadedLayers.push(action.payload);
    },
    removeUploadedLayer: (state, action: PayloadAction<string>) => {
      state.uploadedLayers = state.uploadedLayers.filter(layer => layer.id !== action.payload);
    },
    toggleUploadedLayer: (state, action: PayloadAction<string>) => {
      const layer = state.uploadedLayers.find(layer => layer.id === action.payload);
      if (layer) {
        layer.visible = !layer.visible;
      }
    },
  },
});

export const { 
  toggleLayer, 
  setLayerVisibility, 
  setSelectedTehsil, 
  setTimeRange, 
  setSelectedFeature, 
  setActiveKpiPanel, 
  setSearchQuery,
  setSelectedSDG,
  addUploadedLayer,
  removeUploadedLayer,
  toggleUploadedLayer,
} = layersSlice.actions;
export default layersSlice.reducer;