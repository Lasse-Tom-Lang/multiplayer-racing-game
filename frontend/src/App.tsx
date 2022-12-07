import React from 'react';
import { Route, Routes } from 'react-router';
import Menu from './Menu';
import Room from './Room/Room';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />}/>
      <Route path="/room/:id" element={<Room />}/>
    </Routes>
  );
}

export default App;
