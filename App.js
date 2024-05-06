import logo from './logo.svg';
import './App.css';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ski1 from './skis1'; // Import the Ski1 component
import Ski2 from './skis2';
import Ski3 from './skis3';
import Ski4 from './skis4';
import Ski5 from './skis5';
import Ski6 from './skis6';
import Ski7 from './skis7';
import Ski8 from './skis8';
import Board1 from './board1';
import Board2 from './board2';
import Board3 from './board3';
import Board4 from './board4';
import Board5 from './board5';
import Board6 from './board6';
import Board7 from './board7';
import Board8 from './board8';
//import Ski4 from './skis4';
//import Ski5 from './skis5';
//import Ski6 from './skis6';
//import Ski7 from './skis7';
//import Ski8 from './skis8';

function App() {
  return (
    <Router>
       <Routes>
            <Route path="/skiDetails/1" element={<Ski1 />} /> {/* Route for Ski1 details */}
            {/* Add routes for other ski detail pages */}
           
            <Route path="/skiDetails/2" element={<Ski2 />} /> {/* Route for Ski1 details */}
            {/* Add routes for other ski detail pages */}
            <Route path="/skiDetails/3" element={<Ski3 />} /> {/* Route for Ski1 details */}
            <Route path="/skiDetails/4" element={<Ski4 />} /> {/* Route for Ski1 details */}
            <Route path="/skiDetails/5" element={<Ski5 />} /> {/* Route for Ski1 details */}
            <Route path="/skiDetails/6" element={<Ski6 />} /> {/* Route for Ski1 details */}
            <Route path="/skiDetails/7" element={<Ski7 />} /> {/* Route for Ski1 details */}
            <Route path="/skiDetails/8" element={<Ski8 />} /> {/* Route for Ski1 details */}

            {/* Add routes for snowboard detail pages */}
            <Route path="/snowboardDetails/0" element={<Board1 />} /> {/* Route for Board1 details */}
            <Route path="/snowboardDetails/1" element={<Board2 />} /> {/* Route for Board2 details */}
            <Route path="/snowboardDetails/2" element={<Board3 />} /> {/* Route for Board3 details */}
            <Route path="/snowboardDetails/3" element={<Board4 />} /> {/* Route for Board4 details */}
            <Route path="/snowboardDetails/4" element={<Board5 />} /> {/* Route for Board5 details */}
            <Route path="/snowboardDetails/5" element={<Board6 />} /> {/* Route for Board6 details */}
            <Route path="/snowboardDetails/6" element={<Board7 />} /> {/* Route for Board7 details */}
            <Route path="/snowboardDetails/7" element={<Board8 />} /> {/* Route for Board8 details */}
          
          
            </Routes>
    </Router>
);
}

export default App;
