import React from 'react';
// Importing useSelector from react-redux is commented out because it's not being used in this code snippet.
// If you plan to use it in your actual code, make sure to import it properly.
// import { useSelector } from 'react-redux';
import mockData from './mockData';
import { useSelector } from 'react-redux';

const CustomModal = ({ id, show, setShow }) => {
    const modalBackground = {
        position: 'fixed',
        backgroundColor: 'black',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
        opacity: 90,
    };

    const modalContainer = {
        backgroundColor: 'white',
        boxShadow: '0px 0px 0px #888',
        padding: '10px',
        borderRadius: '10px',
        height: '500px',
        width: '500px',
        display: 'flex',
        gap: '10px',
        flexDirection:"column",
    };

    // Using find() instead of filter() since you're looking for a single user.
    const allUser = useSelector((state)=> state.app.users);
    const singleUser = allUser.find((element) => element.id === id);

    // Adding a conditional rendering for the modal to show or hide based on the 'show' prop.
    if (!show) {
        return null;
    }

    return (
        <div style={modalBackground} className='modalBackground'>
            <div style={modalContainer} className="modalContainer">
                {/* Using optional chaining to safely access properties */}
                <h2>{singleUser?.name}</h2>
                <h2>{singleUser?.email}</h2>
                <h2>{singleUser?.age}</h2>
                <h2>{singleUser?.gender}</h2>
                <br />
                <button onClick={() => setShow(false)}>Close</button>
            </div>
        </div>
    );
}

export default CustomModal;
