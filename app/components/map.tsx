"use client";
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2h0MiIsImEiOiJjbGNld20zZWwwZjh3M3lrNTRlN2tlOHcwIn0.-sbgojf-P_qY0PUn1F0Tfg';

interface IProps {

}

export default function MapBox({}: IProps) {

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
			if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current as HTMLDivElement,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            });
	
		return () => {
			if (map.current) {
				map.current.remove(); // Clean up map instance on component unmount
			}
		};
	}, []);

    return (
        <div>
            <div ref={mapContainer} style={{ height: '400px' }} className="map-container" />
        </div>
    );
}