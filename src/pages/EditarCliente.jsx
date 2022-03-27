import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formulario from '../components/Formulario.jsx';

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const obtenerCLienteAPI = async () => {
      try {
        const respuesta = await fetch(`http://localhost:4000/clientes/${id}`);
        const data = await respuesta.json();
        setCliente(data);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCLienteAPI();
  }, []);

  return (
    <div>
      <h1 className=" font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3 ">
        Usa el formulario para editar los datos del cliente
      </p>


      {cliente?.nombre
       ? (<Formulario cliente={cliente} cargando={cargando} /> )
       : (<p>Cliente ID no válido</p>)
      }
    </div>
  );
};

export default EditarCliente;
