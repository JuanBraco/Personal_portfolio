"use client";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapDisplay from "../components/map";
import { Navigation } from '../components/nav';

export default function MapBox() {

    return (
		<div className="relative pb-16">
			<Navigation />
        	<MapDisplay/>
		</div>
    );
}

