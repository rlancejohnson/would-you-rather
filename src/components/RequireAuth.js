import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
    const authedUser = useSelector(state => state.authedUser)
    const location = useLocation()

    if (!authedUser) {
        return (
            <Navigate to='/login' state={{ from: location }} replace />
        )
    }

    return children
}