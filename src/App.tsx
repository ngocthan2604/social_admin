import { useSelector } from 'react-redux';
import './App.css';
import { PrivateRoute } from './components';
import './styles/sb-admin-2.min.css'
import {Route, Routes } from 'react-router-dom';
import { AppState } from './store';

function App() {
  const accountState = useSelector((state:AppState) => state.account); 

  console.log(accountState.loading)

  return (
    <div id="wrapper" className="App">
        <Routes>
          <Route path='/' element={<PrivateRoute isLogin={false}/>}/>
        </Routes>
    </div>
  );
}

export default App;
