import React from 'react'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet/dist/leaflet';
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Axios from 'axios'

const Detailsmap = ({geoJson}) => {

        //deklarasi state
        const [data, setData] = useState('')
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')
        const [geojsonFeature, setgeojsonFeature] = useState(null)
    //  let geojsonFeature={"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[110.376096,-7.77064],[110.377043,-7.771244],[110.377142,-7.770691],[110.376243,-7.770521],[110.376624,-7.770393],[110.377239,-7.770404],[110.377585,-7.770928],[110.377505,-7.770994]]}}]}
        var dataa = ""
       

    //    const interval=setInterval(() => {
    //     console.log(geoJson);
    //    }, 3000);
         useEffect(() => {
            setgeojsonFeature(geoJson);
            const mymap =L.map('mapid', {
                center: [-7.770905, 110.377637],
                zoom: 18
            })
    
            L.tileLayer(
                'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
            ).addTo(mymap);
    
            const drawnItems =new L.FeatureGroup()
            mymap.addLayer(drawnItems);
            const drawControl = new L.Control.Draw({
                polygon: {
                    showArea: true
                },
                edit: {
                    featureGroup: drawnItems
                },
                draw: {
                    circle: false,
                    circlemarker: false
                }
            });
            mymap.addControl(drawControl);
    
            var geojsonLayer = L.geoJson(geojsonFeature);
            geojsonLayer.eachLayer(
                function (l) {
                    drawnItems.addLayer(l);
                });
    
            //drawnitems controll
            mymap.on(L.Draw.Event.CREATED, function (event) {
                drawnItems.addLayer(event.layer);
                dataa = JSON.stringify(drawnItems.toGeoJSON());
                setData(dataa);
                console.log(dataa);
            });
            mymap.on(L.Draw.Event.EDITED, function (event) {
                dataa = JSON.stringify(drawnItems.toGeoJSON());
                setData(dataa);
                console.log(dataa);
            });
            mymap.on(L.Draw.Event.DELETED, function (event) {
                dataa = JSON.stringify(drawnItems.toGeoJSON());
                setData(dataa);
                console.log(dataa);
            });
    
            return () => {
                mymap.off()
                mymap.remove()
            }
        }, [geojsonFeature])
    

  return (
    <div>
    <div className='map-container' >
        <div id='mapid' style={{ height: '80vh' }}></div>
      </div>
      {geoJson}
    </div>
  )
}

export default Detailsmap
