import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Landing from '../src/screens/Landing'
import {Game} from '../src/screens/Game';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/game" element={<Game/>}/>
    </Routes>
    
    </BrowserRouter>
    {/* <button className='bg-red-200'>join room</button> */}
    </>
  );
}

export default App;
