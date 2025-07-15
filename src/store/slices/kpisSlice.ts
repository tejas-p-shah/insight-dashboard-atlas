import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TehsilKPIs {
  id: string;
  name: string;
  population: number;
  density: number;
  literacyRate: number;
  sexRatio: number;
}

export interface InfrastructureKPIs {
  metroLength: number;
  railwayLength: number;
  metroStations: number;
  railwayStations: number;
  coveragePercent: number;
}

interface KPIsState {
  tehsilKPIs: TehsilKPIs[];
  selectedTehsilKPIs: TehsilKPIs | null;
  infrastructureKPIs: InfrastructureKPIs;
  loading: boolean;
  error: string | null;
}

const initialState: KPIsState = {
  tehsilKPIs: [
    {
      id: 'tehsil-1',
      name: 'Central Delhi',
      population: 582320,
      density: 23149,
      literacyRate: 89.2,
      sexRatio: 892,
    },
    {
      id: 'tehsil-2',
      name: 'North Delhi',
      population: 887978,
      density: 12963,
      literacyRate: 84.1,
      sexRatio: 868,
    },
    {
      id: 'tehsil-3',
      name: 'South Delhi',
      population: 2731929,
      density: 4315,
      literacyRate: 91.7,
      sexRatio: 923,
    },
  ],
  selectedTehsilKPIs: null,
  infrastructureKPIs: {
    metroLength: 391.2,
    railwayLength: 156.8,
    metroStations: 286,
    railwayStations: 42,
    coveragePercent: 73.4,
  },
  loading: false,
  error: null,
};

const kpisSlice = createSlice({
  name: 'kpis',
  initialState,
  reducers: {
    setSelectedTehsilKPIs: (state, action: PayloadAction<TehsilKPIs | null>) => {
      state.selectedTehsilKPIs = action.payload;
    },
    updateInfrastructureKPIs: (state, action: PayloadAction<Partial<InfrastructureKPIs>>) => {
      state.infrastructureKPIs = { ...state.infrastructureKPIs, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedTehsilKPIs, updateInfrastructureKPIs, setLoading, setError } = kpisSlice.actions;
export default kpisSlice.reducer;