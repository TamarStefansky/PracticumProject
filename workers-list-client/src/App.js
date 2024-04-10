import './App.css';
import {BrowserRouter, Route,Routes, Outlet} from 'react-router-dom';
import ShowWorkersTable from './Components/showWorkersTable';
import PutWorkerForm from './Components/putWorkerForm';

function App() {
  return (
    <div>

      


    <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route path={""} element={<ShowWorkersTable />} ></Route>
            <Route path={"putWorkerForm"} element={<PutWorkerForm />} ></Route>
            <Route path={"putWorkerForm/:workerId"} element={<PutWorkerForm />} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

function Layout() {
  return (
    <div>
  <header style={{ width: '100vw', height: '7vh', backgroundColor: 'rgb(19, 91, 235)', marginBottom: '6vh', display: 'flex', alignItems: 'center' }}>
  <img src="https://i.pinimg.com/564x/9a/1c/43/9a1c438f46281cb6f7dd79d456ef5182.jpg"  style={{ width: '6vw', height: '11vh', marginLeft: '1vw',marginTop:'9vh',border: '1vw solid rgb(19, 91, 235)' }} />

  </header>
  <Outlet />
</div>

  );
}
