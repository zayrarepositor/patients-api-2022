//======LIBRARIES & DEPENDENCIES
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//======OUR COMPONENTS
import Loader from '../components/Loader/Loader';
import PatientForm from '../components/PatientForm';
//======OUR FUNCTIONS
import { nameFormatter } from '../helpers';
//======STYLE & IMAGES

const Edit = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

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
        /* also patient?.name&& */
        <p className='text-indigo-800 text-2xl uppercase font-bold mt-4'>
          Patient not found
        </p>
      ) : (
        <>
          <h1 className='font-black text-4xl text-indigo-800'>Edit Patient</h1>
          <PatientForm patient={patient} loading={loading} />
        </>
      )}
    </>
  );
};

export default Edit;
