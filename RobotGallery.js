import React from 'react';
import RobotCard from '../RobotCard';

function RobotGallery({ robots }) {
  return (
    <div className="container">
      <div id="col" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {robots.map((robot, index) => (
          <RobotCard key={index} robot={robot} />
        ))}
      </div>
    </div>
  );
}

export default RobotGallery;