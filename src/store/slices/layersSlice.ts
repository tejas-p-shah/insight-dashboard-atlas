import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayerState {
  id: string;
  name: string;
  visible: boolean;
  icon: string;
  type: 'polygon' | 'line' | 'point';
}

interface LayersState {
  layers: LayerState[];
  selectedTehsil: string | null;
  timeRange: {
    start: number;
    end: number;
    current: number;
  };
}

const initialState: LayersState = {
  layers: [
    {
      id: 'tehsils',
      name: 'Tehsils',
      visible: true,
      icon: '🗺️',
      type: 'polygon',
    },
    {
      id: 'contours',
      name: 'Contours',
      visible: false,
      icon: '🏔️',
      type: 'line',
    },
    {
      id: 'metro-lines',
      name: 'Metro Lines',
      visible: true,
      icon: '🚇',
      type: 'line',
    },
    {
      id: 'railway-lines',
      name: 'Railway Lines',
      visible: true,
      icon: '🚆',
      type: 'line',
    },
    {
      id: 'metro-stations',
      name: 'Metro Stations',
      visible: true,
      icon: '🎯',
      type: 'point',
    },
    {
      id: 'railway-stations',
      name: 'Railway Stations',
      visible: true,
      icon: '🎯',
      type: 'point',
    },
  ],
  selectedTehsil: null,
  timeRange: {
    start: 1990,
    end: 2024,
    current: 2024,
  },
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
  },
});

export const { toggleLayer, setLayerVisibility, setSelectedTehsil, setTimeRange } = layersSlice.actions;
export default layersSlice.reducer;