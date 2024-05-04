import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

function FetchRobotForm({page}) {
    const [robotId, setRobotId] = useState('');
    const [robot, setRobot] = useState(null);
    const [error, setError] = useState('');

    const fetchRobot = () => {
        if (!robotId) {
            setError('Please enter a Item ID');
            return;
        }
        setError('');

        var url = `http://localhost:8081/skis1/${robotId}`
        if (page == "ski1") {
           url = `http://localhost:8081/skis1/${robotId}`
        }
        else if (page == "ski2") {
           url = `http://localhost:8081/skis2/${robotId}`
        }
        else if (page == "ski3") {
           url = `http://localhost:8081/skis3/${robotId}`
        }
        else if (page == "ski4") {
           url = `http://localhost:8081/skis4/${robotId}`
        }
        else if (page == "ski5") {
          url = `http://localhost:8081/skis5/${robotId}`
        }
        else if (page == "ski6") {
           url = `http://localhost:8081/skis6/${robotId}`
        }
        else if (page == "ski7") {
           url = `http://localhost:8081/skis7/${robotId}`
        }
        else if (page == "ski8") {
           url = `http://localhost:8081/skis8/${robotId}`
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(myFavoriteRobot => {
                setRobot(myFavoriteRobot);
            })
            .catch(error => {
                setError(error.message);
                setRobot(null);
            });
    };

    return (
        <div>
            <input
                type="text"
                value={robotId}
                onChange={(e) => setRobotId(e.target.value)}
                placeholder="Enter Item ID"
            />
            <button onClick={fetchRobot}>Fetch Item</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {robot && (
                <div>
                    <h3>Item Details</h3>
                    <p><strong>Name:</strong> {robot.name}</p>
                    <p><strong>Rating:</strong> {robot.price} </p> <ReactStars value={robot.price} size={24} edit={false}></ReactStars>
                    <p> {robot.description} </p>
                </div>
            )}
        </div>
    );
}

export default FetchRobotForm;