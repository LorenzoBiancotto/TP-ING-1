import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './components/pages/accueil';

export const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Accueil />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;