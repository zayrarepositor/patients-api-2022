//======LIBRARIES & DEPENDENCIES
import { Formik, Form, Field } from 'formik';

import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
//======OUR COMPONENTS
import ErrorMsg from './ErrorMsg';
import Loader from './Loader/Loader';
//======OUR FUNCTIONS

//======STYLE & IMAGES

const PatientForm = ({ patient, loading }) => {
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

  //schema for yup
  const newPatientSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'at least 3 letters name')
      .max(20, 'too long name')
      .required('name is required'),
    lastName: yup
      .string()
      .min(3, 'at least 3 letters lastname')
      .max(20, 'too long lastname')
      .required('lastname is required'),
    birthday: yup.date().required('birthday is required').min('1930-01-01'),
    height: yup.number().positive().typeError('height must be a number'),
    weight: yup.number().positive().typeError('weight must be a number'),
    parentName: yup
      .string()
      .min(3, 'at least 3 letters name')
      .max(20, 'too long name')
      .required('parent name is required'),
    parentLastName: yup
      .string()
      .min(3, 'at least 3 letters lastname')
      .max(20, 'too long lastname')
      .required('parent lastname is required'),
    phone: yup
      .number()
      .positive()
      .integer()
      .typeError('phone must be a number'),
    email: yup.string().email(),
  });

  const handleSubmit = async (values) => {
    try {
      const url = 'http://localhost:4000/patients';
      let response;
      if (patient.id) {
        response = await fetch(`${url}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      await response.json();
      navigate('/patients');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-gray-300 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
          <h1 className='text-gray-800 font-bold text-xl uppercase text-center'>
            {name ? 'Edit patient' : 'Add a new Patient'}
          </h1>
          <Formik
            initialValues={{
              name: name ?? '',
              lastName: lastName ?? '',
              birthday: birthday ?? '',
              height: height ?? '',
              weight: weight ?? '',
              patientNotes: patientNotes ?? '',
              parentName: parentName ?? '',
              parentLastName: parentLastName ?? '',
              phone: phone ?? '',
              email: email ?? '',
              parentNotes: parentNotes ?? '',
            }}
            //to be able to get get request data to edit
            enableReinitialize={true}
            //resetForm from formik
            onSubmit={async (values, { resetForm }) => {
              await handleSubmit(values);
              resetForm();
            }}
            //errors and touched from formik
            validationSchema={newPatientSchema}
          >
            {({ errors, touched }) => {
              return (
                <Form className='mt-10'>
                  {/* NAME */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='name'>
                      Name
                    </label>
                    <Field
                      type='text'
                      id='name'
                      name='name'
                      className='m-2 block w-full p-3 bg-gray-50 rounded-md'
                      placeholder={'name'}
                    ></Field>
                    {errors.name && touched.name ? (
                      <ErrorMsg>{errors.name}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* LASTNAME */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='lastName'>
                      Lastname
                    </label>
                    <Field
                      type='text'
                      id='lastName'
                      name='lastName'
                      className='m-2 block w-full p-3 bg-gray-50 rounded-md'
                      placeholder={'Lastname'}
                    ></Field>
                    {errors.lastName && touched.lastName ? (
                      <ErrorMsg>{errors.lastName}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* BIRTHDAY */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='birthday'>
                      Birthday
                    </label>
                    <Field
                      type='date'
                      id='birthday'
                      name='birthday'
                      className='m-2 block w-full p-3 bg-gray-50 rounded-md'
                    ></Field>
                    {errors.birthday && touched.birthday ? (
                      <ErrorMsg>{errors.birthday}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* HEIGHT */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='height'>
                      Height (cm)
                    </label>
                    <Field
                      type='number'
                      id='height'
                      name='height'
                      className='m-2 block w-full p-3 bg-gray-50 rounded-md'
                      placeholder={'Height (cm)'}
                    ></Field>
                    {errors.height && touched.height ? (
                      <ErrorMsg>{errors.height}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* WEIGHT */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='weight'>
                      Weight (kg)
                    </label>
                    <Field
                      type='number'
                      id='weight'
                      name='weight'
                      className='m-2 block w-full p-3 bg-gray-50 rounded-md'
                      placeholder={'Weight (Kg)'}
                    ></Field>
                    {errors.weight && touched.weight ? (
                      <ErrorMsg>{errors.weight}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* NOTES */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='patientNotes'>
                      Patient's Notes
                    </label>
                    <Field
                      as='textarea'
                      type='text'
                      id='patientNotes'
                      name='patientNotes'
                      className='m-2 block w-full p-3 bg-gray-50 h-30 rounded-md'
                      placeholder={'Notes'}
                    ></Field>
                    {errors.patientNotes && touched.patientNotes ? (
                      <ErrorMsg>{errors.patientNotes}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* PARENT NAME */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='ParentName'>
                      Parent Name
                    </label>
                    <Field
                      type='text'
                      id='parentName'
                      name='parentName'
                      className='m-2 block w-full p-3 bg-gray-50 rounded-md'
                      placeholder={'Parent Name'}
                    ></Field>
                    {errors.parentName && touched.parentName ? (
                      <ErrorMsg>{errors.parentName}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* PARENT LASTNAME */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='parentLastName'>
                      Parent Lastname
                    </label>
                    <Field
                      type='text'
                      id='parentLastName'
                      name='parentLastName'
                      className='m-2 block w-full p-3 bg-gray-50 rounded-md'
                      placeholder={'Parent Lastname'}
                    ></Field>
                    {errors.parentLastName && touched.parentLastName ? (
                      <ErrorMsg>{errors.parentLastName}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* PARENT PHONE */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='phone'>
                      Phone
                    </label>
                    <Field
                      type='tel'
                      id='phone'
                      name='phone'
                      className='m-2 block w-full p-3 bg-gray-50 rounded-md'
                      placeholder={'Phone'}
                    ></Field>
                    {errors.phone && touched.phone ? (
                      <ErrorMsg>{errors.phone}</ErrorMsg>
                    ) : null}
                  </div>
                  {/* PARENT MAIL */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='email'>
                      Email
                    </label>
                    <Field
                      type='email'
                      id='email'
                      name='email'
                      className='m-2 block w-full p-3 bg-gray-50  rounded-md'
                      placeholder={'Email'}
                    ></Field>
                    {errors.email && touched.email ? (
                      <ErrorMsg>{errors.email}</ErrorMsg>
                    ) : null}
                  </div>

                  {/* PARENT NOTES */}
                  <div className='mb-4'>
                    <label className='texr-gray-800' htmlFor='parentNotes'>
                      Parent's Notes
                    </label>
                    <Field
                      as='textarea'
                      type='text'
                      id='parentNotes'
                      name='parentNotes'
                      className='m-2 block w-full p-3 bg-gray-50  h-30 rounded-md'
                      placeholder={'Notes'}
                    ></Field>
                    {errors.parentNotes && touched.parentNotes ? (
                      <ErrorMsg>{errors.parentNotes}</ErrorMsg>
                    ) : null}
                  </div>
                  <input
                    type='submit'
                    value={name ? 'edit patient' : 'add patient'}
                    className='mt-5 m-2 w-full bg-indigo-800 p-3 text-white uppercase font-bold text-lg rounded-md shadow-md hover:bg-gray-50 hover:text-indigo-800 cursor-pointer transition-all'
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
};

PatientForm.defaultProps = {
  patient: {},
  loading: false,
};

export default PatientForm;

//json server=>npm install -g json-server =>db.json =>terminal: json - server--watch db.json--port 4000
