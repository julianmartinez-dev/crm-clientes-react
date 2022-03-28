import { useEffect, useState } from "react";
import TableRow from "../components/TableRow";

const Inicio = () => {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const resultado = await fetch(url);
        const data = await resultado.json();
        setClientes(data)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerClientesAPI()
  },[])
  
  const handleEliminar = async (id) =>{
    const confirmar = confirm('¿Estas seguro de eliminar este cliente?')
    if(confirmar){
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        await respuesta.json()
        const clientesFiltrados = clientes.filter(cliente => cliente.id !== id)
        setClientes(clientesFiltrados);
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <table className="min-w-full border-collapse block md:table">
      <thead className="block md:table-header-group">
        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Nombre
          </th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Empresa
          </th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Email
          </th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Telefono
          </th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Notas
          </th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Edición
          </th>
        </tr>
      </thead>


      <tbody className="block md:table-row-group">
        {
        clientes.map(cliente => (
          <TableRow cliente={cliente} key={cliente.id} handleEliminar={handleEliminar}/>
        ))
        }
      </tbody>
    </table>
  );
}

export default Inicio