import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { adminPageViewFunc } from '../redux-store/reducers/admin';

const PageNotFound = ({ isAdmin }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAdmin) {
            dispatch(adminPageViewFunc(true))
        }
        return () => {
            dispatch(adminPageViewFunc(false))
        }
    }, [])

    return (
        <div className='page-not-found-container'>
            <div className='page-not-found-inner-container'>
                <div className='container'>
                    <h1>404</h1>
                    <h3 className='card-text line-height-1'>
                        Page not found
                    </h3>
                    <p>The page which you are looking for is not exist</p>
                    {isAdmin ?
                        (
                            <Link to="/admin/dashboard"><button className='btn'>Go to Dashboard</button></Link>
                        ) : (
                            <Link to="/"><button className='btn'>Go to Home</button></Link>
                        )}
                </div>
            </div>
        </div>
    )
}
export default PageNotFound
