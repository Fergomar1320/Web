import Dashboard from "./features/dashboard/views/Dashboard";
import Sidebar from "./features/dashboard/components/Sidebar";
import Registration from "./features/login/components/registration";
import app from '../src/config/FirebaseConnection';
import {getAuth} from 'firebase/auth';
import { QuerySnapshot } from "firebase/firestore";

function App() {
  const auth = getAuth(app);

  return (
    <main className="App">
      <Dashboard></Dashboard>
    </main>
  );
}

export default App;
