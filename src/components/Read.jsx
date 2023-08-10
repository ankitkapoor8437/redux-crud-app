import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, readUser } from '../features/userDetailSlice';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';


const Read = () => {
    const [radio, setRadio] = useState("");
    const [id, setId] = useState();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { users, loading, searchData } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(readUser());
    }, [])

    if (loading) {
        return <h2>Loading</h2>
    }


    return (
        <div>
            {
                show && <CustomModal id={id} show={show} setShow={setShow} />
            }
            <h2>All Data</h2>
            <input
                className="form-check-input"
                name="gender"
                value=""
                type="radio"
                // onChange={getUserData}
                required
                checked={radio === ""}
                onChange={(e) => setRadio(e.target.value)}


            />
            <label className="form-check-label">All</label>

            <input
                className="form-check-input"
                name="gender"
                value="Male"
                type="radio"
                onChange={(e) => setRadio(e.target.value)}
                required
                checked={radio === "Male"}

            />
            <label className="form-check-label">Male</label>

            <input
                className="form-check-input"
                name="gender"
                value="Female"
                type="radio"
                onChange={(e) => setRadio(e.target.value)}
                required
                checked={radio === "Female"}

            />
            <label className="form-check-label">Female</label>


            <div>
                {
                    users &&
                    users.filter((element) => {
                        if (searchData.length === 0) {
                            return element;
                        }
                        else {
                            return element.name.toLowerCase().includes(searchData.toLowerCase());
                        }
                    }).filter((element) => {
                        if (radio === "Male") {
                            return element.gender === radio;
                        }
                        else if (radio === "Female") {
                            return element.gender === radio;
                        }
                        else {
                            return element;
                        }
                    })
                        .map((data) => (
                            <div className="card w-50 mx-auto my-2" key={data.id} >
                                <div className="card-body">
                                    <h5 className="card-title">{data.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{data.email}</h6>
                                    <p className="card-text">{data.gender}</p>
                                    <Link to={`/edit/${data.id}`} className="card-link">Edit</Link>
                                    <button href="#" className="card-link" onClick={() => [setId(data.id), setShow(true)]}>View</button>
                                    <Link onClick={() => dispatch(deleteUser(data.id))} className="card-link">Delete</Link>
                                </div>
                            </div>
                        ))}
            </div>
        </div >
    )
}

export default Read;