import React from 'react'
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className='continer error-block text-center '>
            <h1>404</h1>
            <h3 className='card-text p-4 line-height-1'>
                Page not found
            </h3>
            <p>The page which you are looking for is not exist</p>
            <Link to="/"><button className='btn'>Go to Home</button></Link>
        </div>
    )
}
export default PageNotFound
