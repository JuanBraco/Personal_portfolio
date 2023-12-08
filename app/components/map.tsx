"use client";
import { useEffect, useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapDisplay() {
    const mapContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapContainer.current) {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [2.3522219, 48.856614],
            zoom: 10,
            accessToken: MAPBOX_TOKEN
        });

        map.on('load', () => {
            const geocoder = new MapboxGeocoder({
                accessToken: MAPBOX_TOKEN!,
                mapboxgl: mapboxgl
            });
            map.addControl(geocoder);
        });

	}
    }, []);

    return (
		<div className="game-sketch absolute inset-0 mt-20 m-10">
        	<div ref={mapContainer} style={{ height: '600px' }} />
		</div>
    );
}