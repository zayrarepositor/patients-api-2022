//======LIBRARIES & DEPENDENCIES
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//======OUR COMPONENTS
import Layout from './layout/Layout';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Patient from './pages/Patient';
//======OUR FUNCTIONS

//======STYLE & IMAGES

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/patients' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='add' element={<Add />} />
                    <Route path='edit/:id' element={<Edit />} />
                    <Route path=':id' element={<Patient />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
