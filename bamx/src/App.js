import Dashboard from "./features/dashboard/views/Dashboard";
import Registration from "./features/login/components/registration";
// import Registration from "./features/login/components/registration";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        <Registration />
      </BrowserRouter>
    </main>
  );
}

export default App;
