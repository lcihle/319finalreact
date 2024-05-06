//import React from 'react';
import React, { useState, useEffect } from 'react';
import imageSrc from './ski5.jpeg'; // Import your image file
import boardSpot from './boardspot.png'; // Import your image file
import './App.css'; 


//import React, { useState, useEffect } from 'react';
import RobotGallery from './components/RobotGallery';
import AddRobotForm from './components/AddRobotForm';
import DeleteRobotForm from './components/DeleteRobotForm';
import UpdateRobotForm from './components/UpdateRobotForm';
import FetchRobotForm from './components/FetchRobotForm';



function MyComponent() {
    const goBack = () => {
        window.history.back();
    };


    const [robots, setRobots] = useState([]);

  useEffect(() => {
    fetchRobots();
  }, []);

  const [showTestText, setShowTestText] = useState(false); // State to manage text display

  

  const fetchRobots = () => {
    fetch('http://localhost:8081/listRobots5')
      .then(response => response.json())
      .then(setRobots)
      .catch(console.error);
  };

  const handleAddRobot = (robot) => {
    setRobots([...robots, robot]);
  };

  const handleDeleteRobot = (id) => {
    setRobots(robots.filter(robot => robot.id !== id));
  };

  const handleUpdateRobot = (updatedRobotData) => {
    setRobots(robots.map(robot => 
      robot.id === updatedRobotData.id ? {...robot, ...updatedRobotData} : robot
    ));
  };

  const handleShowTestText = () => {
    setShowTestText(true); // Set state to true to display text
  };

    return (

        /*
        <div>
            <h1>My React Page</h1>
            <img src={imageSrc} alt="Description of the image" height="300" width="300" style={{ border: '2px solid black' }} />

            
            <button onClick={goBack}>Return to Shop</button>
            <RobotGallery robots={robots} />
        <AddRobotForm onAddRobot={handleAddRobot} page = "ski2" />
        <DeleteRobotForm onDeleteRobot={handleDeleteRobot} page = "ski2" />
        <UpdateRobotForm onUpdateRobot={handleUpdateRobot} page = "ski2"/>
        <FetchRobotForm page = "ski2"/>

            
        </div>
        */
        <div>

        
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
            
    

            <h1 style={{ top: 5, fontSize: '2.5rem', fontFamily: 'serif', textAlign: 'center', position: "absolute" }}>Grey Hound </h1>
            <img src={imageSrc} alt="Description of the image" height="500" width="500"style={{ position: "absolute", top: 100 }} />
      
                

            
            </div>
           

           
            <div style={{ flex: 1 }}>
                <RobotGallery robots={robots} />
                <AddRobotForm onAddRobot={handleAddRobot} page="ski4" />
                <DeleteRobotForm onDeleteRobot={handleDeleteRobot} page="ski4" />
                <UpdateRobotForm onUpdateRobot={handleUpdateRobot} page="ski4" />
                <FetchRobotForm page="ski4" />
            </div>
            
        </div>

<div style={{ textAlign: 'left' }}>
<img src={boardSpot} alt="BoardSpot Logo" style={{ top: 450, position: "absolute", maxHeight: '300px', maxWidth: '100%' }} />

<button onClick={goBack} style={{ top: 650, position: 'absolute', fontSize: '1.5rem', fontFamily: 'Arial, sans-serif', padding: '10px 20px', backgroundColor: 'lightblue' }}>Return to Shop</button>


</div>

<div style={{ flex: 1 }}></div>

<footer className="footer">
                <p>&copy; Logan Ihle and Katherine Jacobson</p>
            </footer>
</div>


        
        

       
       
        
        

    );
}

export default MyComponent;


