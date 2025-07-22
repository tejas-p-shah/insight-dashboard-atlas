import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json", // Default style
      center: [72.8777, 19.076], // Mumbai coordinates
      zoom: 9
    });

    map.current.on("load", async () => {
      // Fetch all layers from backend
      const [
        tehsils,
        contours,
        metroLine,
        metroStations,
        railwayLine,
        railwayStations
      ] = await Promise.all([
        fetch("http://localhost:8000/geojson/tehsils").then((r) => r.json()),
        fetch("http://localhost:8000/geojson/contours").then((r) => r.json()),
        fetch("http://localhost:8000/geojson/transport/metro-line").then((r) => r.json()),
        fetch("http://localhost:8000/geojson/transport/metro-stations").then((r) => r.json()),
        fetch("http://localhost:8000/geojson/transport/railway-line").then((r) => r.json()),
        fetch("http://localhost:8000/geojson/transport/railway-stations").then((r) => r.json())
      ]);

      // Add tehsils source + layer
      map.current?.addSource("tehsils", {
        type: "geojson",
        data: tehsils
      });

      map.current?.addLayer({
        id: "tehsils-fill",
        type: "fill",
        source: "tehsils",
        paint: {
          "fill-color": "#4C9F70",
          "fill-opacity": 0.3
        }
      });

      // Add click handler for tehsils to show popup
      map.current?.on("click", "tehsils-fill", (e) => {
        const feature = e.features && e.features[0];
        if (!feature) return;

        const props = feature.properties;
        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `<div style="font-size:14px;">
              <strong>${props.NAME || "Unknown Tehsil"}</strong><br/>
              Population 2011: ${props.Population_2011 ?? "N/A"}<br/>
              Population 2021: ${props.Population_2021 ?? "N/A"}<br/>
              Density: ${props.Density_2021 ?? "N/A"}
            </div>`
          )
          .addTo(map.current!);
      });

      // Change cursor on hover
      map.current?.on("mouseenter", "tehsils-fill", () => {
        map.current!.getCanvas().style.cursor = "pointer";
      });
      map.current?.on("mouseleave", "tehsils-fill", () => {
        map.current!.getCanvas().style.cursor = "";
      });

      // ✅ Add contours source + layer
      map.current?.addSource("contours", {
        type: "geojson",
        data: contours
      });

      map.current?.addLayer({
        id: "contours-line",
        type: "line",
        source: "contours",
        paint: {
          "line-color": "#888",
          "line-width": 1.5,
          "line-dasharray": [2, 2]
        }
      });

      // Add metro lines
      map.current?.addSource("metroLine", {
        type: "geojson",
        data: metroLine
      });

      map.current?.addLayer({
        id: "metro-line-layer",
        type: "line",
        source: "metroLine",
        paint: {
          "line-color": "#00A9E0",
          "line-width": 2,
          "line-dasharray": [2, 2]
        }
      });

      // Add metro stations
      map.current?.addSource("metroStations", {
        type: "geojson",
        data: metroStations
      });

      map.current?.addLayer({
        id: "metro-stations-layer",
        type: "circle",
        source: "metroStations",
        paint: {
          "circle-radius": 6,
          "circle-color": "#FF8C00"
        }
      });

      // Add railway lines
      map.current?.addSource("railwayLine", {
        type: "geojson",
        data: railwayLine
      });

      map.current?.addLayer({
        id: "railway-line-layer",
        type: "line",
        source: "railwayLine",
        paint: {
          "line-color": "#6A7D7D",
          "line-width": 3
        }
      });

      // Add railway stations
      map.current?.addSource("railwayStations", {
        type: "geojson",
        data: railwayStations
      });

      map.current?.addLayer({
        id: "railway-stations-layer",
        type: "circle",
        source: "railwayStations",
        paint: {
          "circle-radius": 5,
          "circle-color": "#8E44AD"
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapView;
