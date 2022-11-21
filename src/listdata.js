import React from 'react'

const Listdata = ({dataList}) => {
  console.log(dataList)
  const {title , _id,description, createdAt,updatedAt,data}=dataList;  
  return (
    <div>
      <li>
    {title}
    </li>
    </div>
  )
}

export default Listdata
