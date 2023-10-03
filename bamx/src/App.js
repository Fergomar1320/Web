import Dashboard from "./features/dashboard/views/Dashboard";
import Registration from "./features/login/components/registration";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  return (
    <main className="App">
        <Registration />
    </main>
  );
}

export default App;
