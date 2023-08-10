import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  updateUser } from '../features/userDetailSlice';
import { useNavigate, useParams } from 'react-router-dom';



const Update = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const [fetchedData, setFetchedData] = useState();

    const { users } = useSelector((state) => state.app); // Assuming you have a state named 'app' in your redux store.
    useEffect(() => {
        if (id && users.length > 0) { // Make sure users data is available before filtering
            const singleUser = users.find((element) => element.id === id); // Using 'find' instead of 'filter' since you're looking for a single user
            // console.log("single User", singleUser);
            if (singleUser) {
                setFetchedData(singleUser); // Wrap the single user in an array
            }
        }
    }, ); // Added 'id' and 'users' to the dependency array to re-run the effect when they change

    // console.log("Fetched User", fetchedData);

    const updatedData = (e) => {
        setFetchedData({ ...fetchedData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("users...", fetchedData);
        dispatch(updateUser(fetchedData));
        navigate("/read");
    };

    return (
        <div>
            <h2 className="my-2">Edit the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={updatedData}
                        required
                        value={fetchedData && fetchedData.name}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={updatedData}
                        required
                        value={fetchedData && fetchedData.email}

                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        name="age"
                        className="form-control"
                        onChange={updatedData}
                        required
                        value={fetchedData && fetchedData.age}

                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        name="gender"
                        value="Male"
                        type="radio"
                        onChange={updatedData}
                        required
                        checked={fetchedData && fetchedData.gender === "Male"}

                    />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        name="gender"
                        value="Female"
                        type="radio"
                        onChange={updatedData}
                        checked={fetchedData && fetchedData.gender === "Female"}


                    />
                    <label className="form-check-label">Female</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Update;