import React, { useEffect } from 'react'
import Axios from 'axios'
import Listdata from './listdata'
import { useState } from 'react'


const Listmission = () => {

    const [dataapi, setDataapi] = useState([]);

    const getData = async () => {
        try {
            let res = await Axios.get('http://localhost:4000/mission');
            await setDataapi(res.data);

        } catch (e) {
            console.log(e);
        }
    }
    console.log(dataapi);
    useEffect(() => {
        // Axios.get('http://localhost:4000/mission')
        //     .then(res => {
        //         let responseApi = res.data;
        //         console.log(responseApi)
        //         setDataapi(responseApi);
        //         console.log(dataapi)
        //     })
        //     .catch(err => {
        //         console.log('terjadi error :', err)
        //     })
        getData();
    }, [])

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
