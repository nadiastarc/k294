import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './Components/Sidebar';

/*Hier wird die Sidebar ausgegeben.*/
function App() {
    
    return (
      <BrowserRouter>
          <div className="App">
              <Sidebar />
          </div>    
      </BrowserRouter>

    );
}

export default App;
