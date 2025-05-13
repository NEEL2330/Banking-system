import React, { useState } from "react";
import axios from "axios";
import "../css/AccountCreate.css";

const CustomerCreate = () => {
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [responseMsg, setresponseMsg] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const NewData = { title, body };
    axios.post("https://jsonplaceholder.typicode.com/posts", NewData)
      .then((response) => {
        setresponseMsg("Data Submitted!!");
    })
  };

  return (
    <div className="form-container">
      <h2>Creating Account</h2>
      <form onSubmit={handlesubmit}>
        <h3>Title</h3>
        <input 
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>Body</h3>
        <textarea 
          placeholder="Body"
          value={body}
          onChange={(e) => setbody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {responseMsg && <div className="response-msg">{responseMsg}</div>}
    </div>
  );
};

export default CustomerCreate;
