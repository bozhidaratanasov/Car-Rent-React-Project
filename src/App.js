import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import {CarsList} from "./components/cars/cars-list/CarsList";
import {Layout} from "./components/layout/Layout";
import {CarForm} from "./components/cars/car-form/CarForm";
import {UserForm} from "./components/users/user-form/UserForm";
import {LoginForm} from "./components/users/login-form/LoginForm";
import {RentalForm} from "./components/rentals/rental-form/RentalForm";
import {RentalsList} from "./components/rentals/rentals-list/RentalsList";
import {NonAuthenticatedRoute} from "./utils/guards/NonAuthenticatedRoute";
import {AuthenticatedRoute} from "./utils/guards/AuthenticatedRoute";
import {AdminRoute} from "./utils/guards/AdminRoute";

function App() {
  return (
      <div className="App">
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/cars" element={<AuthenticatedRoute> <CarsList/> </AuthenticatedRoute>}></Route>
                <Route path="/cars/create" element={<AdminRoute> <CarForm/> </AdminRoute>}></Route>
                <Route path="/cars/edit/:id" element={<AdminRoute> <CarForm/> </AdminRoute>}></Route>
                <Route path="/cars/rent/:id" element={<AuthenticatedRoute> <RentalForm/> </AuthenticatedRoute>}></Route>
                <Route path="/register" element={<NonAuthenticatedRoute> <UserForm/> </NonAuthenticatedRoute>}></Route>
                <Route path="/login" element={<NonAuthenticatedRoute> <LoginForm/> </NonAuthenticatedRoute>}></Route>
                <Route path="/profile" element={<AuthenticatedRoute> <UserForm/> </AuthenticatedRoute>}></Route>
                <Route path="/profile/rentals" element={<AuthenticatedRoute> <RentalsList/> </AuthenticatedRoute>}></Route>
            </Route>
        </Routes>
      </div>
  );
}

export default App;
