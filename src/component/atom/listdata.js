import React from 'react'
import { NavLink } from "react-router-dom";


const Listdata = ({ dataList }) => {

  console.log(dataList)
  console.log()


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
      <NavLink
      to={`/details/${_id}`}
      >view details</NavLink>
      <br />
    </div>
  )
}

export default Listdata
