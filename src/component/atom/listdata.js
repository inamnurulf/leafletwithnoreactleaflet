import React from 'react'
import { NavLink } from "react-router-dom";
import './listdata.css'


const Listdata = ({ dataList }) => {


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
      <div class="main-container">
        <div class="heading">
          <h1 class="heading__title">{title}</h1>
          <p class="heading__credits"><a class="heading__link" target="_blank" >{createdAt}</a></p>
        </div>
        <div class="cards">
          <div class="card card-1">
            <p class="heading__credits">Description :</p>
            <h2 class="card__title">{description}</h2>
            <p class="card__apply">
              <button className='button-64' role='button'><NavLink to={`/details/${_id}`} id="Navlink" class='Navlink' style={{color:'#ffffff',textDecoration:'none'}}>view details </NavLink></button>
              <i class="fas fa-arrow-right"></i>
              <button className='button-64' role='button' onClick={handleDelete}><span class="text">Delete</span></button>
            </p>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default Listdata
