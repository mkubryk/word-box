import './App.css';
import routesConfig from './routes/routes_config.js';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
        <RouterProvider router={routesConfig} />
 
  );
}

export default App;



