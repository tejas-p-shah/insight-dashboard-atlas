import axios from 'axios';

const mapService = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Mock data for demonstration
export const mockTehsilsData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      id: 'tehsil-1',
      properties: {
        name: 'Central Delhi',
        population: 582320,
        density: 23149,
        literacyRate: 89.2,
        sexRatio: 892,
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [77.1825, 28.6358],
          [77.2300, 28.6358],
          [77.2300, 28.6658],
          [77.1825, 28.6658],
          [77.1825, 28.6358]
        ]]
      }
    },
    {
      type: 'Feature' as const,
      id: 'tehsil-2',
      properties: {
        name: 'North Delhi',
        population: 887978,
        density: 12963,
        literacyRate: 84.1,
        sexRatio: 868,
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [77.1825, 28.6658],
          [77.2300, 28.6658],
          [77.2300, 28.6958],
          [77.1825, 28.6958],
          [77.1825, 28.6658]
        ]]
      }
    },
    {
      type: 'Feature' as const,
      id: 'tehsil-3',
      properties: {
        name: 'South Delhi',
        population: 2731929,
        density: 4315,
        literacyRate: 91.7,
        sexRatio: 923,
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [77.1825, 28.5858],
          [77.2300, 28.5858],
          [77.2300, 28.6358],
          [77.1825, 28.6358],
          [77.1825, 28.5858]
        ]]
      }
    }
  ]
};

export const mockMetroLinesData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {
        name: 'Red Line',
        openingYear: 2002,
        length: 25.1
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [77.1900, 28.6100],
          [77.2000, 28.6200],
          [77.2100, 28.6300],
          [77.2200, 28.6400]
        ]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Blue Line',
        openingYear: 2005,
        length: 56.6
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [77.1850, 28.6500],
          [77.1950, 28.6600],
          [77.2050, 28.6700],
          [77.2150, 28.6800]
        ]
      }
    }
  ]
};

export const mockRailwayLinesData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {
        name: 'Main Line',
        openingYear: 1864,
        length: 42.3
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [77.1800, 28.6000],
          [77.1900, 28.6100],
          [77.2000, 28.6200],
          [77.2100, 28.6300],
          [77.2200, 28.6400]
        ]
      }
    }
  ]
};

export const mockMetroStationsData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {
        name: 'Rajiv Chowk',
        type: 'Metro',
        openingYear: 2002,
        lines: ['Red Line', 'Blue Line']
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [77.2088, 28.6328]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Central Secretariat',
        type: 'Metro',
        openingYear: 2002,
        lines: ['Red Line']
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [77.2113, 28.6139]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Khan Market',
        type: 'Metro',
        openingYear: 2005,
        lines: ['Blue Line']
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [77.2284, 28.6000]
      }
    }
  ]
};

export const mockRailwayStationsData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {
        name: 'New Delhi',
        type: 'Railway',
        openingYear: 1864,
        category: 'Major'
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [77.2167, 28.6439]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Old Delhi',
        type: 'Railway',
        openingYear: 1864,
        category: 'Major'
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [77.2290, 28.6562]
      }
    }
  ]
};

export const mockContoursData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {
        elevation: 200
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [77.1800, 28.6100],
          [77.1900, 28.6150],
          [77.2000, 28.6200],
          [77.2100, 28.6250]
        ]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        elevation: 220
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [77.1850, 28.6200],
          [77.1950, 28.6250],
          [77.2050, 28.6300],
          [77.2150, 28.6350]
        ]
      }
    }
  ]
};

// API functions (placeholder for real implementation)
export const fetchTehsilsData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTehsilsData;
};

export const fetchMetroLinesData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMetroLinesData;
};

export const fetchRailwayLinesData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRailwayLinesData;
};

export const fetchMetroStationsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMetroStationsData;
};

export const fetchRailwayStationsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRailwayStationsData;
};

export const fetchContoursData = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockContoursData;
};

export default mapService;