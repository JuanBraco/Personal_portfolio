"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2h0MiIsImEiOiJjbGNld20zZWwwZjh3M3lrNTRlN2tlOHcwIn0.-sbgojf-P_qY0PUn1F0Tfg';

export default function MapBox() {
    const mapContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapContainer.current) {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [2.3522219, 48.856614],
            zoom: 10,
            accessToken: MAPBOX_TOKEN
        });

        map.on('load', () => {
            const geocoder = new MapboxGeocoder({
                accessToken: MAPBOX_TOKEN,
                mapboxgl: mapboxgl
            });
            map.addControl(geocoder);
        });

	}
    }, []);

    return (
		<div className="game-sketch absolute inset-0 mt-20 m-10">
        	<div ref={mapContainer} style={{ height: '400px' }} />
		</div>
    );
}

