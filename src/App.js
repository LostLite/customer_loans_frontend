import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import Header from './components/header';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="row"></div>
        <Routes />
      </div>
    </BrowserRouter>
    
  );
}

export default App;