import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import {CarsList} from "./components/cars/cars-list/CarsList";
import {Layout} from "./components/layout/Layout";
import {CarForm} from "./components/cars/car-form/CarForm";

function App() {
  return (
      <div className="App">
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/cars" element={<CarsList/>}></Route>
                <Route path="/cars/create" element={<CarForm/>}></Route>
                <Route path="/cars/edit/:id" element={<CarForm/>}></Route>
            </Route>
        </Routes>
      </div>
  );
}

export default App;
