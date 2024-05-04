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
            
          
          
            </Routes>
    </Router>
);
}

export default App;
