import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { handleSetInitialData } from './actions/shared'

import LoadingBar from 'react-redux-loading-bar'
import Header from './components/Header'

import Login from './pages/Login'
import Home from './pages/Home'
import QuestionDetail from './pages/QuestionDetail'
import CreateQuestion from './pages/CreateQuestion'
import Leaderboard from './pages/Leaderboard'

export default function App() {
    const dispatch = useDispatch()
    const { authedUser, loading } = useSelector((state) => {
        return {
            authedUser: state.authedUser,
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

                {(authedUser === null && loading === false) &&
                    <Routes>
                        <Route path='/' element={<Login />} />
                    </Routes>
                }

                {(authedUser !== null && loading === false) &&
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/question/:id' element={<QuestionDetail />} />
                        <Route path='/add' element={<CreateQuestion />} />
                        <Route path='/leaderboard' element={<Leaderboard />} />
                    </Routes>
                }
            </div>
        </BrowserRouter>
    )
}