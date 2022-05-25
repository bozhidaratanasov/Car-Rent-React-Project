import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import {CarsList} from "./components/cars/cars-list/CarsList";
import {Layout} from "./components/layout/Layout";

function App() {
  return (
      <div className="App">
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/cars" element={<CarsList/>}></Route>
            </Route>
        </Routes>
      </div>
  );
}

export default App;
