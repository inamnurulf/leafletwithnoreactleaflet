import React from 'react'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet/dist/leaflet';
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw'

import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'
import Axios from 'axios'

const Detailsmap = ({ geoJson }) => {
    const handlebutton = () => {
        setButtonEdit(!buttonEdit)
    }

    const handleshow = () => {
        setgeojsonFeature(JSON.parse(geoJson.data))
    }

    const handlePatch = async () => {
        try {
            const response = await Axios.patch('http://localhost:4000/mission/' + geoJson._id, {
                title: title,
                data: data,
                description: description

            })
            window.location.reload();
        } catch (err) {
            console.log(err)
        }

    }

    //deklarasi state
    const [data, setData] = useState('')
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [geojsonFeature, setgeojsonFeature] = useState()
    const [buttonEdit, setButtonEdit] = useState(false)

    //  let geojsonFeature={"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[110.376096,-7.77064],[110.377043,-7.771244],[110.377142,-7.770691],[110.376243,-7.770521],[110.376624,-7.770393],[110.377239,-7.770404],[110.377585,-7.770928],[110.377505,-7.770994]]}}]}
    var dataa = ""

    //    const interval=setInterval(() => {
    //     console.log(geoJson);
    //    }, 3000);
    useEffect(() => {
        const mymap = L.map('mapid', {
            center: [-7.770905, 110.377637],
            zoom: 18
        })

        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
        ).addTo(mymap);

        const drawnItems = new L.FeatureGroup()
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

        if (geojsonFeature == null) {
            console.log("geojson kosong");
        }
        else {
            console.log(geojsonFeature);
            // L.geoJSON(geojsonFeature).addTo(mymap);
        }
        const geojsonLayer = L.geoJSON(geojsonFeature);
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
        <div style={{ backgroundColor: '#ebc24a' }}>
            <div id='mapid' style={{ height: '80vh' }}></div>
            <div className='map-container' style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <button onClick={handleshow}> click untuk menampilkan misi </button>
                <div>Title :</div>
                <div style={{ backgroundColor: 'white', width: '50 px' }}>{geoJson.title}</div>
                <div>Data GeoJSON :</div>
                <div style={{ backgroundColor: 'white', width: '50 px' }}>{geoJson.data}</div>
                <div>Description :</div>
                <div style={{ backgroundColor: 'white', width: '50 px' }}>{geoJson.description}</div>
                <div style={{ color: 'gray', textAlign: 'center' }}>Dibuat:{geoJson.createdAt}  | Terakhir diubah:{geoJson.updatedAt}</div>
                <button onClick={handlebutton}>Edit</button>
            </div>

            <br />
            <br />
            <div style={{ display: buttonEdit ? 'block' : 'none' }}>
                <div >
                    <span>Masukkan title baru:</span>
                    <input type={'text'}  onChange={(e) => { setTitle(e.target.value) }}>
                    </input>
                    <span>Masukkan Deskripsi Mission :</span>
                    <input type={'text'}  onChange={(e) => { setDescription(e.target.value) }}>
                    </input>
                    <button onClick={handlePatch}> SAVE </button>
                </div>
            </div>
            <div style={{ color: '#ffffff', textDecoration: 'none', backgroundColor: '#0D0A33', padding: '3px', borderRadius: '5px', margin: '5px', textAlign:'center' }}>
            <NavLink to={`/`} id="Navlink" style={{ color: '#ffffff', textDecoration: 'none'  }}>back</NavLink>
            </div>
        </div>
    )
}

export default Detailsmap
