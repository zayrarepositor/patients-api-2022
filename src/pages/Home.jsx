//======LIBRARIES & DEPENDENCIES
import { useState, useEffect } from 'react';
//======OUR COMPONENTS
import PatientRow from '../components/PatientRow';
//======OUR FUNCTIONS
//======STYLE & IMAGES
const Home = () => {
  const [patients, setPatients] = useState();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        setPatients(jsonResponse);
      } catch (error) {
        console.error(error);
      }
    };
    getPatients();
  }, []);

  const deletePatient = async (id) => {
    console.log('deleting', id);
    confirm('Patient will be deleted');
    if (confirm) {
      try {
        const response = await fetch(`${url}/${id}`, {
          method: 'DELETE',
        });
        await response.json();
        /* location.reload() */
        const updatedPatients = patients.filter((patient) => patient.id !== id);
        setPatients(updatedPatients);
      } catch (error) {}
    }
  };

  return (
    <>
      <h1 className='font-black text-4xl text-indigo-800'>Patients</h1>
      <p className='mt-3'>All patients</p>
      <table className='w-full mt-5 table-auto shadow bg-gray-300'>
        <thead className='bg-indigo-800 text-white'>
          <tr>
            <th className='p-2'>Patient</th>
            <th className='p-2'>Bithday</th>
            <th className='p-2'>Height & Weight</th>

            <th className='p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient) => (
            <PatientRow
              key={patient.id}
              patient={patient}
              deletePatient={deletePatient}
            ></PatientRow>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
