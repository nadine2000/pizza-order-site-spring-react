import Home from "./components/Home";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import {IngredientProvider} from "./components/ContextFile";
import Form from "./components/Form";
import PizzaOrder from "./components/PizzaOrder";
import CheckOrder from "./components/CheckOrder";

function App() {
  return (

      <div className="container mx-auto">
          <Header/>
              <BrowserRouter>
              <IngredientProvider>
                  <Routes>
                      <Route path="/" index element={<Home/>}/>
                      <Route path="/order" element={<PizzaOrder/>}/>
                      <Route path="/order/:indexToEdite" element={<PizzaOrder/>}/>
                      <Route path="/cart" element={<Cart/>}/>
                      <Route path="/form" element={<Form/>}/>
                      <Route path="/check" element={<CheckOrder/>}/>
                      <Route path={"*"} element={<ErrorPage/>}/>
                  </Routes>
              </IngredientProvider>
              </BrowserRouter>
       </div>
  );
}

export default App;