import React from 'react'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import Detailsmap from '../component/Detailsmap';

const Details = () => {
    const [dataapi, setDataapi] = useState([]);
    const [geojsonFeature, setgeojsonFeature] = useState('')
    let { id } = useParams();
    
    const getData = async () => {
        try {
            let res = await Axios.get(`http://localhost:4000/mission/${id}`);
            await setgeojsonFeature(res.data.data);

        } catch (e) {
            console.log(e);
        }

    }

    useEffect(()=>{
        getData();
    },[])


    return (
        <div >
        <Detailsmap geoJson={geojsonFeature || ''} />
        </div>
    )
}

export default Details
