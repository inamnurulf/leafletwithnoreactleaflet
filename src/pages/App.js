//import from modules
import React from 'react'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet/dist/leaflet';
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw'

//import component
import Listmission from '../component/listmission';
//import method 
import { useEffect, useState } from 'react';




function Map() {
  //deklarasi state
  const [data, setData] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  //handlesubmit function
  const handleSubmit = async (e) => {
    const mission = { title, data, description }

    const response = await fetch('http://localhost:4000/mission', {
      method: 'POST',
      body: JSON.stringify(mission),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
    }
    if (response.ok) {
      console.log("u made a mission :", json)
    }
    window.location.reload();
  }

  //variabel tambahan
  var dataa = ""
  
  useEffect(() => {

    const map = L.map('mapid', {
      center: [-7.770905, 110.377637],
      zoom: 18
    })

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
    ).addTo(map);

    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems);
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
    map.addControl(drawControl);
    

    //drawnitems controll
    map.on(L.Draw.Event.CREATED, function (event) {
      drawnItems.addLayer(event.layer);
      dataa = JSON.stringify(drawnItems.toGeoJSON());
      setData(dataa);
      console.log(dataa);
    });
    map.on(L.Draw.Event.EDITED, function (event) {
      dataa = JSON.stringify(drawnItems.toGeoJSON());
      setData(dataa);
      console.log(dataa);
    });
    map.on(L.Draw.Event.DELETED, function (event) {
      dataa = JSON.stringify(drawnItems.toGeoJSON());
      setData(dataa);
      console.log(dataa);
    });

    return () => {
      map.off()
      map.remove()
    }
  }, [])

  return (
    <>
      <div className='map-container' >
        <div id='mapid' style={{ height: '80vh' }}></div>
      </div>
      <span>Masukkan Title Mission:</span>
      <br />
      <input type={'text'} onChange={(e) => { setTitle(e.target.value) }}>
      </input>
      <br />
      <span>Masukkan Deskripsi Mission :</span>
      <br />
      <input type={'text'} onChange={(e) => { setDescription(e.target.value) }}>
      </input>
      <br />
      <button onClick={handleSubmit}> SAVE </button>
      <Listmission />
    </>
  )
}

export default Map