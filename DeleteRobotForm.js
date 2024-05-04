import React, { useState } from 'react';

function DeleteRobotForm({ onDeleteRobot, page }) {
  const [robotId, setRobotId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!robotId) {
      alert("Please enter a valid Item ID.");
      return;
    }

   var url = `http://localhost:8081/deleteRobot/${robotId}`
    if (page == "ski1") {
       url = `http://localhost:8081/deleteRobot/${robotId}`
    }
    else if (page == "ski2") {
       url = `http://localhost:8081/deleteRobot2/${robotId}`
    }
    else if (page == "ski3") {
       url = `http://localhost:8081/deleteRobot3/${robotId}`
    }
    else if (page == "ski4") {
       url = `http://localhost:8081/deleteRobot4/${robotId}`
    }
    else if (page == "ski5") {
      url = `http://localhost:8081/deleteRobot5/${robotId}`
    }
    else if (page == "ski6") {
       url = `http://localhost:8081/deleteRobot6/${robotId}`
    }
    else if (page == "ski7") {
       url = `http://localhost:8081/deleteRobot7/${robotId}`
    }
    else if (page == "ski8") {
       url = `http://localhost:8081/deleteRobot8/${robotId}`
    }

    // DELETE request to remove the robot
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: robotId })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(() => {
      onDeleteRobot(robotId); // Call the callback with the ID of the deleted robot
      setRobotId(''); // Clear the input field
      alert("Item deleted successfully.");
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Failed to delete Item.");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="delete-robot-form">
      <input
        type="text"
        placeholder="Enter Item ID to delete"
        value={robotId}
        onChange={(e) => setRobotId(e.target.value)}
        required
      />
      <button type="submit">Delete Item</button>
    </form>
  );
}

export default DeleteRobotForm;