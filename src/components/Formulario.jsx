import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  //Schema para la validacion de los campos del formulario con yup
  const nuevoClienteSchema = yup.object({
    nombre: yup
      .string()
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo')
      .required('El nombre es requerido'),
    empresa: yup.string().required('El nombre de la empresa es requerido'),
    email: yup
      .string()
      .email('El email no es valido')
      .required('El email es requerido'),
    telefono: yup
      .number()
      .integer('Numero no válido')
      .positive('Numero no válido')
      .typeError('El telefono debe ser numerico'),
  });

  const handleSubmit = async (values) => {
    try {
      if (cliente.id) {
        //Editando un registro existente
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        const respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
        });
        if (respuesta.ok) {
          alert('Cliente editado correctamente');
        }
      } else {
        //Agregando un nuevo registro
        const url = 'http://localhost:4000/clientes';
        const respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
        });
        if (respuesta.ok) {
          alert('Cliente agregado correctamente');
        }
      }
      navigate('/clientes');
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md shadow-blue-300/50 md:w-3/4 mx-auto ">
      <h1 className=" text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
      </h1>

      <Formik
        /*initialValues tiene que ser igual al name de cada field
          ej nombre:'' -> name="nombre" */
        initialValues={{
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          telefono: cliente?.telefono ?? '',
          email: cliente?.email ?? '',
          notas: cliente?.notas ?? '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          //Se envian los values al handleSubmit
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  name="nombre"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  name="empresa"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del cliente"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  name="telefono"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del cliente"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Notas del cliente:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  name="notas"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del cliente"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:bg-blue-600 cursor-pointer"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

//Si no se le pasa ningun cliente, se le asigna un objeto vacio
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
