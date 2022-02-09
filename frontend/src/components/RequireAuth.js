import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

/**
* @description Component to handle authentication requirements
* @constructor
* @param {object} children - child elements to this component
*/
export default function RequireAuth({ children }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const cachedAuthedUser = sessionStorage.getItem('authedUserId');

    const authedUser = useSelector(state => cachedAuthedUser !== null ? cachedAuthedUser : state.authedUser);

    useEffect(() => {
        if (cachedAuthedUser !== null) {
            dispatch(setAuthedUser(cachedAuthedUser));
        }
    }, [dispatch, cachedAuthedUser]);

    if (!authedUser) {
        return (
            <Navigate to='/login' state={{ from: location }} replace />
        );
    }

    return children;
}