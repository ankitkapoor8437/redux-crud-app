import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUsers } from '../features/userDetailSlice';

const Navbar = () => {
  const allUsers = useSelector(state => state.app.users);

  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchUsers(searchData));
  }, [ searchData]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand" href="/">REDUX CRUD</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Create Post</Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className="nav-link" >All Post {allUsers.length} </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" value={searchData} onChange={(e) => setSearchData(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;