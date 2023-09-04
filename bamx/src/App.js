import Registration from "./features/login/components/registration";
import app from '../src/config/FirebaseConnection';
import {getAuth} from 'firebase/auth';

function App() {
  const auth = getAuth(app);

  return (
    <Registration/>
  );
}

export default App;
