import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'

function App() {
  const [clientes, setClientes] = useState([]);


  useEffect(() => {
    const consultarApi = async () =>{
      const url = import.meta.env.VITE_API_URL;
      const respuesta = await fetch(url)
      const data = await respuesta.json()
      setClientes(data)
    }
    consultarApi();
  },[]);


  return (
    <BrowserRouter>
      <Routes>
        {
          /* 
          Todas las los Route dentro de Route path="/clientes" pertenecen a este grupo
          /clientes/nuevo
          /clientes/editar/:id
          */
        }
        
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio clientes={clientes}/>}/>
          <Route path="nuevo" element={<NuevoCliente/>}/>
          <Route path="editar/:id" element={<EditarCliente/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
