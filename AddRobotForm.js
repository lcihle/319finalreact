import React, { useState } from 'react';

function AddRobotForm({ onAddRobot, page }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // Convert id and price from string to number
    const numericId = Number(id);
    const numericPrice = Number(price);
   // const imageUrl = String(imageUrl);
  
    // Construct the robot data object with numeric values
    const newRobot = {
      id: numericId, // Convert id to number
      name: name,
      price: numericPrice, // Convert price to number
      description: description,
     // onChange={(e) => setImageUrl(e.target.value.trim() || '')}
   //   onChange={(e) => setImageUrl(e.target.value.trim() || '')} // Set empty string for empty input
      // was correct
      imageUrl: imageUrl
    };
    console.log(imageUrl);
  var url = "http://localhost:8081/addRobot";
    if (page == "ski1") {
       url = "http://localhost:8081/addRobot"
    }
    else if (page == "ski2") {
       url = "http://localhost:8081/addRobot2"
    }
    else if (page == "ski3") {
       url = "http://localhost:8081/addRobot3"
    }
    else if (page == "ski4") {
       url = "http://localhost:8081/addRobot4"
    }
    else if (page == "ski5") {
       url = "http://localhost:8081/addRobot5"
    }
    else if (page == "ski6") {
       url = "http://localhost:8081/addRobot6"
    }
    else if (page == "ski7") {
       url = "http://localhost:8081/addRobot7"
    }
    else if (page == "ski8") {
       url = "http://localhost:8081/addRobot8"
    }
    // POST request to add the robot
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRobot)
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        onAddRobot(data); // Update parent component state
        // Clear form fields after successful addition
        setName('');
        setPrice('');
      //  setImageUrl('');
        setId('');
        setDescription('');
      } else {
        console.error('Failed to add Item');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-robot-form">
      <input
        type="number"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Reviewer's Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Star Rating"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Review"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
     

      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddRobotForm;