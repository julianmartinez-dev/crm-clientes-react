import { useNavigate } from 'react-router-dom'

const TableRow = ({cliente, handleEliminar}) => {

  const navigate = useNavigate();

  const { nombre, empresa, email, telefono, notas, id } = cliente;

  return (
    <tr className="bg-gray-200 mt-5 border border-grey-500 md:border-none block md:table-row">
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Nombre:</span>
        {nombre}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Empresa:</span>
        {empresa}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Email:</span>
        {email}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Teléfono:
        </span>
        {telefono}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell md:w-2/5">
        <span className="inline-block w-1/3 md:hidden font-bold">Notas:</span>
        {notas}
      </td>
      <td className=" p-2 md:border md:border-grey-500 text-left block md:table-cell md:w-52 ">
        <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded ml-5"
          onClick={()=> handleEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default TableRow