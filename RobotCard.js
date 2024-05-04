import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

function RobotCard({ robot }) {
  const [isChecked, setIsChecked] = useState(true);

  const toggleVisibility = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="col">
     
      <div className="card shadow-sm" style={{ display: isChecked ? 'block' : 'none' }}>
        
        <div className="card-body">
          <p className="card-text"><strong> {robot.name}</strong>: {robot.price}</p> <ReactStars value={robot.price} size={24} edit={false} />
          <p> {robot.description}</p>
          <hr style={{ borderTop: '1px solid black', width: '50%', margin: '10px 0' }} /> {/* Black line */}
          <div className="btn-group">
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default RobotCard;