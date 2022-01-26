import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { handleSetInitialData } from './actions/shared'

import LoadingBar from 'react-redux-loading-bar'
import Header from './components/Header'
import RequireAuth from './components/RequireAuth'

import Login from './pages/Login'
import Home from './pages/Home'
import QuestionDetail from './pages/QuestionDetail'
import CreateQuestion from './pages/CreateQuestion'
import Leaderboard from './pages/Leaderboard'

export default function App() {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => {
        return {
            loading: state.loadingBar.default !== 0
        }
    })

    useEffect(() => {
        dispatch(handleSetInitialData())
    }, [dispatch])

    return (
        <BrowserRouter>
            <div>
                <Header />
                <LoadingBar />

                {(loading === false) &&
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
                        <Route path='/question/:id' element={<RequireAuth><QuestionDetail /></RequireAuth>} />
                        <Route path='/add' element={<RequireAuth><CreateQuestion /></RequireAuth>} />
                        <Route path='/leaderboard' element={<RequireAuth><Leaderboard /></RequireAuth>} />
                    </Routes>
                }
            </div>
        </BrowserRouter>
    )
}