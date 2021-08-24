import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const data = {
    username: "",
    password: "",
  };

  const [formData, updateFormData] = useState(data);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = async () => {
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    submitData();
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="name">Please enter your name here</label>
        <input type="text" name="username" onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={handleChange} />
        <input type="submit" value="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default App;
