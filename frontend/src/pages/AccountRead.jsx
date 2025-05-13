import React, { useEffect, useState } from 'react';
import axios from "axios"


const AccountRead = () => {
  const [tittleInput, setTittleInput] = useState('')
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [postbody, setpostbody] = useState('')

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
    .then((response) => {
      setdata(response.data)
      setloading(false)
      console.log(response)
    })
  },[postbody]);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const findData = data.find(post => post.title.toLowerCase() === tittleInput.toLocaleLowerCase())
    if(findData){
      setpostbody(findData.body)
    }
  };
  if(loading) return <div>Loading....</div>
  return (
    <div className="page-container">
      <h2>Account details Page</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type = "text"
          placeholder="Enter your name"
          value={tittleInput}
          onChange={(e) => setTittleInput(e.target.value)}
        />
        <button type='submit'>Search</button>  
      </form>
      {postbody && (
        <div>
          <h3>Account details:</h3>
          <p>{postbody}</p>
        </div>
      )}
    </div>
  );
};

export default AccountRead;
