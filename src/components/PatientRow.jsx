//======LIBRARIES & DEPENDENCIES
import { useNavigate } from 'react-router-dom';
//======OUR COMPONENTS
//======OUR FUNCTIONS
import { ageCalculator, nameFormatter, dateFormatter } from '../helpers';

//======STYLE & IMAGES

const PatientRow = ({ patient, deletePatient }) => {
  const navigate = useNavigate();

  const {
    id,
    name,
    lastName,
    birthday,
    height,
    weight,
    patientNotes,
    parentName,
    parentLastName,
    phone,
    email,
    parentNotes,
  } = patient;

  const formatted = {
    name: nameFormatter(name),
    lastName: nameFormatter(lastName),
    parentName: nameFormatter(parentName),
    parentLastName: nameFormatter(parentLastName),
  };
  return (
    <tr className='border-b border-gray-400 hover:bg-gray-400'>
      <td className='p-3'>
        <p>{`${formatted.name} ${formatted.lastName}`}</p>
      </td>
      <td className='p-3'>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Birthday: </span>
          {dateFormatter(birthday)}
        </p>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Age: </span>
          {ageCalculator(birthday)} years
        </p>
      </td>
      <td className='p-3'>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Height: </span>
          {height} cm
        </p>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Weight: </span>
          {weight} kg
        </p>
      </td>
      <td className='p-3'>
        <button
          type='button'
          className='bg-yellow-800 text-white block w-full p-2 uppercase font-bold text-xs mt-3 hover:text-yellow-900 hover:bg-yellow-200'
          onClick={() => navigate(`/patients/${id}`)}
        >
          Ver
        </button>
        <button
          type='button'
          className='bg-indigo-800 text-white block w-full p-2 uppercase font-bold text-xs mt-3 hover:text-indigo-900 hover:bg-indigo-200'
          onClick={() => navigate(`/patients/edit/${id}`)}
        >
          Edit
        </button>
        <button
          type='button'
          className='bg-red-800 text-white block w-full p-2 uppercase font-bold mt-3 text-xs hover:text-red-900 hover:bg-red-200'
          onClick={() => deletePatient(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PatientRow;
