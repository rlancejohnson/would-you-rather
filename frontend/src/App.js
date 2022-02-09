import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import Login from './pages/Login';
import Home from './pages/Home';
import QuestionDetail from './pages/QuestionDetail';
import CreateQuestion from './pages/CreateQuestion';
import Leaderboard from './pages/Leaderboard';

/**
* @description Component containing the header and all the routes for the app
* @constructor
*/
export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <LoadingBar />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
                    <Route path='/question/:id' element={<RequireAuth><QuestionDetail /></RequireAuth>} />
                    <Route path='/add' element={<RequireAuth><CreateQuestion /></RequireAuth>} />
                    <Route path='/leaderboard' element={<RequireAuth><Leaderboard /></RequireAuth>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}