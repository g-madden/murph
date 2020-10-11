import React from 'react';
import './App.css';
import { Gallery } from './Gallery';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <Gallery />
    </div>
  );
}

export default App;
