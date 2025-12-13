import React, { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { City, MapPoint } from '../../types/map';

type MapProps = {
  city: City;
  points: MapPoint[];
  selectedPoint?: MapPoint;
  className?: string;
};

function Map({ city, points, selectedPoint, className = 'cities__map' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const clusterRef = useRef<any | null>(null);
  const prevCityKeyRef = useRef<string | null>(null);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // Эффект добавляет/обновляет кластер и маркеры (вызывается при смене points/selectedPoint)
  useEffect(() => {
    if (!map) return;

    // Удаляем старый кластер, если он есть
    if (clusterRef.current) {
      try {
        clusterRef.current.clearLayers();
        map.removeLayer(clusterRef.current);
      } catch (e) {
        // ignore
      }
      clusterRef.current = null;
    }

    const markerClusterGroup = (leaflet as any).markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      maxClusterRadius: 50,
    });

    points.forEach((point) => {
      const marker = leaflet.marker([point.lat, point.lng], {
        icon: (selectedPoint && point.id === selectedPoint.id) ? currentCustomIcon : defaultCustomIcon,
      });

      marker.bindPopup(`<div>${point.title}</div>`);
      markerClusterGroup.addLayer(marker);
    });

    markerClusterGroup.addTo(map);
    clusterRef.current = markerClusterGroup;

    // НЕ центрируем карту здесь — это мешает при hover/обновлении selectedPoint

    return () => {
      if (clusterRef.current) {
        try {
          clusterRef.current.clearLayers();
          map.removeLayer(clusterRef.current);
        } catch (e) {
          // ignore
        }
        clusterRef.current = null;
      }
    };
  }, [map, points, selectedPoint, defaultCustomIcon, currentCustomIcon]);

  // Эффект центрирует карту только при реальной смене города
  useEffect(() => {
    if (!map) return;

    const cityKey = `${city.title}|${city.lat}|${city.lng}|${city.zoom}`;
    if (prevCityKeyRef.current !== cityKey) {
      map.setView([city.lat, city.lng], city.zoom);
      prevCityKeyRef.current = cityKey;
    }
  }, [map, city]);

  return (
    <div
      style={{ height: '100%' }}
      className={className}
      ref={mapRef}
    />
  );
}

export { Map };