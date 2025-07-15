import React, { useEffect, useRef, useState } from 'react';
import { Map, NavigationControl, Popup } from 'maplibre-gl';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setSelectedTehsil } from '../store/slices/layersSlice';
import { setSelectedTehsilKPIs } from '../store/slices/kpisSlice';
import {
  fetchTehsilsData,
  fetchMetroLinesData,
  fetchRailwayLinesData,
  fetchMetroStationsData,
  fetchRailwayStationsData,
  fetchContoursData
} from '../services/mapService';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const popup = useRef<Popup | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const dispatch = useDispatch();
  const { layers, timeRange } = useSelector((state: RootState) => state.layers);
  const { tehsilKPIs } = useSelector((state: RootState) => state.kpis);
  const { isDark } = useSelector((state: RootState) => state.theme);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: {
              'background-color': isDark ? '#1F1F1F' : '#F6F8FA'
            }
          }
        ]
      },
      center: [77.2090, 28.6139], // Delhi coordinates
      zoom: 11,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(new NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setMapLoaded(true);
      loadMapData();
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update theme
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    map.current.setPaintProperty('background', 'background-color', isDark ? '#1F1F1F' : '#F6F8FA');
  }, [isDark, mapLoaded]);

  // Load map data
  const loadMapData = async () => {
    if (!map.current) return;

    try {
      const [tehsils, metroLines, railwayLines, metroStations, railwayStations, contours] = await Promise.all([
        fetchTehsilsData(),
        fetchMetroLinesData(),
        fetchRailwayLinesData(),
        fetchMetroStationsData(),
        fetchRailwayStationsData(),
        fetchContoursData()
      ]);

      // Add sources
      map.current.addSource('tehsils', { type: 'geojson', data: tehsils });
      map.current.addSource('metro-lines', { type: 'geojson', data: metroLines });
      map.current.addSource('railway-lines', { type: 'geojson', data: railwayLines });
      map.current.addSource('metro-stations', { type: 'geojson', data: metroStations });
      map.current.addSource('railway-stations', { type: 'geojson', data: railwayStations });
      map.current.addSource('contours', { type: 'geojson', data: contours });

      // Add layers
      addTehsilsLayer();
      addContoursLayer();
      addMetroLinesLayer();
      addRailwayLinesLayer();
      addMetroStationsLayer();
      addRailwayStationsLayer();

      // Add click handlers
      setupClickHandlers();
    } catch (error) {
      console.error('Error loading map data:', error);
    }
  };

  const addTehsilsLayer = () => {
    if (!map.current) return;

    // Population density expression for choropleth
    const densityExpression: any = [
      'interpolate',
      ['linear'],
      ['get', 'density'],
      0, isDark ? '#D1F7D6' : '#E0F2E9',
      5000, isDark ? '#7FB069' : '#7FB069',
      15000, isDark ? '#4A7C49' : '#4A7C49',
      25000, isDark ? '#4A7C49' : '#3D6A3F'
    ];

    map.current.addLayer({
      id: 'tehsils-fill',
      type: 'fill',
      source: 'tehsils',
      paint: {
        'fill-color': densityExpression,
        'fill-opacity': 0.7
      }
    });

    map.current.addLayer({
      id: 'tehsils-border',
      type: 'line',
      source: 'tehsils',
      paint: {
        'line-color': '#2B2D42',
        'line-width': 1
      }
    });
  };

  const addContoursLayer = () => {
    if (!map.current) return;

    map.current.addLayer({
      id: 'contours',
      type: 'line',
      source: 'contours',
      paint: {
        'line-color': isDark ? '#A1A1A1' : '#5B5F6D',
        'line-width': 1,
        'line-opacity': 0.6
      }
    });
  };

  const addMetroLinesLayer = () => {
    if (!map.current) return;

    map.current.addLayer({
      id: 'metro-lines',
      type: 'line',
      source: 'metro-lines',
      paint: {
        'line-color': '#00A9E0',
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          5,
          3
        ],
        'line-dasharray': [2, 2]
      }
    });
  };

  const addRailwayLinesLayer = () => {
    if (!map.current) return;

    map.current.addLayer({
      id: 'railway-lines',
      type: 'line',
      source: 'railway-lines',
      paint: {
        'line-color': '#6A7D7D',
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          5,
          4
        ]
      }
    });
  };

  const addMetroStationsLayer = () => {
    if (!map.current) return;

    map.current.addLayer({
      id: 'metro-stations',
      type: 'circle',
      source: 'metro-stations',
      paint: {
        'circle-color': '#FF8C00',
        'circle-radius': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          10,
          8
        ],
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 2
      }
    });
  };

  const addRailwayStationsLayer = () => {
    if (!map.current) return;

    map.current.addLayer({
      id: 'railway-stations',
      type: 'circle',
      source: 'railway-stations',
      paint: {
        'circle-color': '#8E44AD',
        'circle-radius': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          9,
          7
        ],
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 2
      }
    });
  };

  const setupClickHandlers = () => {
    if (!map.current) return;

    // Tehsil click handler
    map.current.on('click', 'tehsils-fill', (e) => {
      if (e.features && e.features[0]) {
        const feature = e.features[0];
        const tehsilId = feature.id as string;
        const properties = feature.properties;
        
        dispatch(setSelectedTehsil(tehsilId));
        
        const matchingKPI = tehsilKPIs.find(k => k.id === tehsilId);
        if (matchingKPI) {
          dispatch(setSelectedTehsilKPIs(matchingKPI));
        }

        showPopup(e.lngLat, properties, 'tehsil');
      }
    });

    // Metro station click handler
    map.current.on('click', 'metro-stations', (e) => {
      if (e.features && e.features[0]) {
        const properties = e.features[0].properties;
        showPopup(e.lngLat, properties, 'metro-station');
      }
    });

    // Railway station click handler
    map.current.on('click', 'railway-stations', (e) => {
      if (e.features && e.features[0]) {
        const properties = e.features[0].properties;
        showPopup(e.lngLat, properties, 'railway-station');
      }
    });

    // Hover effects
    const layers = ['tehsils-fill', 'metro-lines', 'railway-lines', 'metro-stations', 'railway-stations'];
    
    layers.forEach(layerId => {
      map.current!.on('mouseenter', layerId, () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current!.on('mouseleave', layerId, () => {
        map.current!.getCanvas().style.cursor = '';
      });
    });
  };

  const showPopup = (lngLat: any, properties: any, type: string) => {
    if (!map.current) return;

    if (popup.current) {
      popup.current.remove();
    }

    let content = '';
    
    if (type === 'tehsil') {
      content = `
        <div class="p-3 min-w-[200px]">
          <h3 class="font-semibold text-foreground mb-2">${properties.name}</h3>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Population:</span>
              <span class="font-medium">${properties.population?.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Density:</span>
              <span class="font-medium">${properties.density?.toLocaleString()}/km²</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Literacy:</span>
              <span class="font-medium">${properties.literacyRate}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Sex Ratio:</span>
              <span class="font-medium">${properties.sexRatio}</span>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'metro-station') {
      content = `
        <div class="p-3 min-w-[180px]">
          <h3 class="font-semibold text-foreground mb-2">${properties.name}</h3>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Type:</span>
              <span class="font-medium">${properties.type}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Opened:</span>
              <span class="font-medium">${properties.openingYear}</span>
            </div>
            ${properties.lines ? `
              <div class="flex justify-between">
                <span class="text-muted-foreground">Lines:</span>
                <span class="font-medium">${properties.lines.join(', ')}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } else if (type === 'railway-station') {
      content = `
        <div class="p-3 min-w-[180px]">
          <h3 class="font-semibold text-foreground mb-2">${properties.name}</h3>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Type:</span>
              <span class="font-medium">${properties.type}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Opened:</span>
              <span class="font-medium">${properties.openingYear}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Category:</span>
              <span class="font-medium">${properties.category}</span>
            </div>
          </div>
        </div>
      `;
    }

    popup.current = new Popup({ closeOnClick: false })
      .setLngLat(lngLat)
      .setHTML(content)
      .addTo(map.current);
  };

  // Update layer visibility
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    layers.forEach(layer => {
      const visibility = layer.visible ? 'visible' : 'none';
      
      if (layer.id === 'tehsils') {
        map.current!.setLayoutProperty('tehsils-fill', 'visibility', visibility);
        map.current!.setLayoutProperty('tehsils-border', 'visibility', visibility);
      } else if (layer.id === 'contours') {
        map.current!.setLayoutProperty('contours', 'visibility', visibility);
      } else if (layer.id === 'metro-lines') {
        map.current!.setLayoutProperty('metro-lines', 'visibility', visibility);
      } else if (layer.id === 'railway-lines') {
        map.current!.setLayoutProperty('railway-lines', 'visibility', visibility);
      } else if (layer.id === 'metro-stations') {
        map.current!.setLayoutProperty('metro-stations', 'visibility', visibility);
      } else if (layer.id === 'railway-stations') {
        map.current!.setLayoutProperty('railway-stations', 'visibility', visibility);
      }
    });
  }, [layers, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default MapView;