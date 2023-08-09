import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readUser } from '../features/userDetailSlice';



const Read = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(readUser());
    }, [])

    if (loading) {
        return <h2>Loading</h2>
    }
    return (
        <div>
            <h2>All Data</h2>
            <div>
                {
                 users &&  users.map((data) => (
                        <div className="card w-50 mx-auto my-2" >
                            <div className="card-body">
                                <h5 className="card-title">{data.name}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{data.email}</h6>
                                <p className="card-text">{data.age}</p>
                                <a href="#" className="card-link">Edit</a>
                                <a href="#" className="card-link">Delete</a>
                            </div>
                        </div>
                    ))}

            </div>
        </div>
    )
}

export default Read;