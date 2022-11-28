import React from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route }
from 'react-router-dom';

import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Components/Header';
import { useScroll } from 'framer-motion';



function App() {


  return (
    <Router basename='/mwflix'>
      {/* 네비게이션 */}
      <Header /> 
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/tv" element={<Tv/>} />
        <Route path="/search/*" element={<Search />} />
			</Routes>
		</Router>
  );
}

export default App;
