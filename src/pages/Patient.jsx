//======LIBRARIES & DEPENDENCIES
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//======OUR COMPONENTS
import Loader from '../components/Loader/Loader';
//======OUR FUNCTIONS
import { ageCalculator, dateFormatter, nameFormatter } from '../helpers';

//======STYLE & IMAGES
const Patient = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
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

  useEffect(() => {
    const getPatient = async () => {
      const url = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${url}/${id}`);
        const finalResponse = await response.json();

        finalResponse.name = nameFormatter(finalResponse.name);
        finalResponse.lastName = nameFormatter(finalResponse.lastName);
        finalResponse.parentName = nameFormatter(finalResponse.parentName);
        finalResponse.parentLastName = nameFormatter(
          finalResponse.parentLastName,
        );

        setPatient(finalResponse);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getPatient();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : Object.keys(patient).length === 0 ? (
        <p className='text-indigo-800 text-2xl uppercase font-bold mt-4'>
          Patient not found
        </p>
      ) : (
        <>
          <h1 className='font-black text-4xl text-indigo-800 mt-4'>{`Patient id n.${id}`}</h1>
          <p className='text-gray mt-3'>
            <span className='text-indigo-900 uppercase font-bold'>Name:</span>
            {` ${name} ${lastName}`}
          </p>
          <p className='text-gray  mt-2'>
            <span className='text-indigo-900 uppercase font-bold mt-3'>
              Birthday:{' '}
            </span>
            {dateFormatter(birthday)}
          </p>
          <p className='text-gray  mt-2'>
            <span className='text-indigo-900 uppercase font-bold'>Age: </span>
            {ageCalculator(birthday)} years
          </p>
          <p className='text-gray  mt-2'>
            <span className='text-indigo-900 uppercase font-bold'>
              Height:{' '}
            </span>
            {height} cm
          </p>
          <p className='text-gray  mt-2'>
            <span className='text-indigo-900 uppercase font-bold'>
              Weight:{' '}
            </span>
            {weight} kg
          </p>
          {patientNotes && (
            <p className='text-gray  mt-2'>
              <span className='text-indigo-900 uppercase font-bold'>
                Patient Notes:{' '}
              </span>
              {patientNotes}
            </p>
          )}
          <p className='text-indigo-900 text-2xl uppercase font-bold  mt-4'>
            Parent
          </p>
          <p className='text-gray  mt-3'>
            {' '}
            <span className='text-indigo-900 uppercase font-bold'>Name:</span>
            {` ${parentName} ${parentLastName}`}
          </p>
          {parentNotes && (
            <p className='text-gray  mt-3'>
              <span className='text-indigo-900 uppercase font-bold'>
                Parent Notes:{' '}
              </span>
              {parentNotes}
            </p>
          )}
          <p className='text-indigo-900 text-2xl uppercase font-bold mt-4'>
            Contact
          </p>
          {email && (
            <p className='text-gray  mt-3'>
              <span className='text-indigo-900 uppercase font-bold'>
                Email:{' '}
              </span>
              {email}
            </p>
          )}
          {phone && (
            <p className='text-gray  mt-3'>
              <span className='text-indigo-900 uppercase font-bold'>
                Phone:{' '}
              </span>
              {phone}
            </p>
          )}

          {/*  <button
                        type='button'
                        className='bg-yellow-800 text-white block w-2/5 mx-auto p-2 uppercase font-bold text-xs mt-3  hover:text-yellow-900 hover:bg-yellow-200'
                        onClick={() => navigate(`/patients/${id}`)}>
                        Ver
                    </button> */}
          <button
            type='button'
            className='bg-indigo-800 text-white block w-2/5 mx-auto p-2 uppercase font-bold text-xs mt-3 hover:text-indigo-900 hover:bg-indigo-200'
            onClick={() => navigate(`/patients/edit/${id}`)}
          >
            Edit
          </button>
          <button
            type='button'
            className='bg-red-800 text-white block w-2/5 mx-auto p-2 uppercase font-bold mt-3 text-xs hover:text-red-900 hover:bg-red-200'
          >
            Delete
          </button>
        </>
      )}
    </>
  );
};

export default Patient;
