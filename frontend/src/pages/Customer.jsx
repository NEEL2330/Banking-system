import React, {useEffect, useState} from 'react';
import axios from "axios"

const Customer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tittleInput, setTittleInput] = useState('')
  const [postbody, setpostbody] = useState('')



  
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      setData(response.data)
      setLoading(false)
      console.log(response.data)
    })
  },[]);

  const handleSubmit = (e) =>{
    e.preventDefault()
    const foundpost = data.find(post => post.title.toLowerCase() === tittleInput.toLocaleLowerCase())
    if(foundpost){
      setpostbody(foundpost.body);
    }
    else{
      setpostbody("")
    }
  };
  if(loading) return <div>Loading....</div>
  return (
    <div className="page-container">
      <h2>Customer Page</h2>
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
          <h3>Post Body:</h3>
          <p>{postbody}</p>
        </div>
      )}
    </div>
  );
};

export default Customer;
