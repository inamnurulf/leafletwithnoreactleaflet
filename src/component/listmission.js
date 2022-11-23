import React, { useEffect, useState } from 'react'
import Axios from 'axios'

//import component
import Listdata from './atom/listdata'



const Listmission = () => {
    //deklarasi state
    const [dataapi, setDataapi] = useState([]);

    //fetching get with axios
    const getData = async () => {
        try {
            let res = await Axios.get('http://localhost:4000/missions');
            await setDataapi(res.data);

        } catch (e) {
            console.log(e);
        }
    }
    console.log(dataapi);

    useEffect(() => {
        getData();
    }, [])


    //display return
    return (
        <div>
            <div className='list-missions'>
                {dataapi.map(dataapi => {
                    return <Listdata dataList={dataapi || []} />
                })}
            </div>

        </div>
    )
}

export default Listmission
