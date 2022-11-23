import Axios from 'axios'
import React from 'react'

const Listdata = ({ dataList }) => {
  console.log(dataList)

  const { title, _id, description, createdAt, updatedAt, data } = dataList;

  //handle delete function and fetching with delete API
  const handleDelete = async () => {
    const response = await fetch('http://localhost:4000/mission/' + _id,
      { method: 'DELETE' })

    const json = await response.json();

    if (response.ok) {
      window.location.reload();
    }
    else {
      console.log(json.error())
    }
  }

  return (
    <div className='text-white' >
      <li>
        {title}
      </li>
      <div>{description}</div>
      <span onClick={handleDelete} style={{textDecoration:'underline', color:'blue'}}>delete</span>
      <br />
    </div>
  )
}

export default Listdata
