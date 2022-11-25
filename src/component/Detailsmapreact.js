import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet'

const Detailsmapreact = (geoJson) => {
    return (
        <div>
            {/* <MapContainer center={[-7.770268, 110.377910]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={geoJson.features}/>          
            </MapContainer> */}

        </div>
    )
}

export default Detailsmapreact
