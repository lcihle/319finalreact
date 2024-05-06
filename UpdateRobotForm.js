import React, { useState } from 'react';

function UpdateRobotForm({ onUpdateRobot, page }) {
  const [robotId, setRobotId] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!robotId || !newPrice) {
      alert("Please enter both robot ID and new price.");
      return;
    }

    var url = `http://localhost:8081/updateRobot/${robotId}`;
    if (page == "ski1") {
       url = `http://localhost:8081/updateRobot/${robotId}`
    }
    else if (page == "ski2") {
       url = `http://localhost:8081/updateRobot2/${robotId}`
    }
    else if (page == "ski3") {
       url =  `http://localhost:8081/updateRobot3/${robotId}`
    }
    else if (page == "ski4") {
       url =  `http://localhost:8081/updateRobot4/${robotId}`
    }
    else if (page == "ski5") {
      url = `http://localhost:8081/updateRobot5/${robotId}`
    }
    else if (page == "ski6") {
       url =  `http://localhost:8081/updateRobot6/${robotId}`
    }
    else if (page == "ski7") {
       url =  `http://localhost:8081/updateRobot7/${robotId}`
    }
    else if (page == "ski8") {
      url = `http://localhost:8081/updateRobot8/${robotId}`
    }
    else if (page == "board1") {
      url = `http://localhost:8081/updateRobot1B/${robotId}`
    }
    else if (page == "board2") {
      url = `http://localhost:8081/updateRobot2B/${robotId}`
    }
    else if (page == "board3") {
      url = `http://localhost:8081/updateRobot3B/${robotId}`
    }
    else if (page == "board4") {
      url = `http://localhost:8081/updateRobot4B/${robotId}`
    }
    else if (page == "board5") {
      url = `http://localhost:8081/updateRobot5B/${robotId}`
    }
    else if (page == "board6") {
      url = `http://localhost:8081/updateRobot6B/${robotId}`
    }
    else if (page == "board7") {
      url = `http://localhost:8081/updateRobot7B/${robotId}`
    }
    else if (page == "board8") {
      url = `http://localhost:8081/updateRobot8B/${robotId}`
    }

    // PUT request to update the robot's price
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: newPrice, description: newDescription })
        
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(updatedRobot => {
      onUpdateRobot(updatedRobot); // Call the callback with the updated robot data
      setRobotId(''); // Clear the form fields
      setNewPrice('');
      setNewDescription('');
      alert("Review Updated Successfully.");
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Failed to update Item.");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="update-robot-form">
      <input
        type="number"
        placeholder="Enter Item ID"
        value={robotId}
        onChange={(e) => setRobotId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="New Star Rating"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        required
      />     
  
       <input
        type="text"
        placeholder="New Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        required
      />
      <button type="submit">Update Review</button>
    </form>
  );
}

export default UpdateRobotForm;