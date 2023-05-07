import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { useToken } from '../lib/auth/useToken';
import { useUser } from '../lib/auth/useUser';

export const UserInfoPage = () => {

    //Import User

    const user = useUser();
    const [token, setToken] = useToken();
    const {id, email, isVerified, info} = user;

    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
    const history = useHistory();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [favoriteCity, setFavoriteCity] = useState('');
    const [profession, setProfession] = useState('');
    const [bio, setBio] = useState('');

    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        // Send a request to the server to
        // update the user's info with any changes we've
        // made to the text input values
        alert('Save functionality not implemented yet');
    }

    const logOut = () => {
        // We'll want to log the user out here
        // and send them to the "login page"
        localStorage.removeItem('token');
        history.push('/login');
    }
    
    const resetValues = () => {
        // Reset the text input values to
        // their starting values (the data we loaded from the server)
        alert('Reset functionality not implemented yet');
    }
    
    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div className="content-container">
            <h1>Info for {email}</h1>
            {!isVerified && <div className='fail'>You won't be able to make any changes until you're verified</div>}
            {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
            <label>
                Favorite City:
                <input
                    onChange={e => setFavoriteCity(e.target.value)}
                    value={favoriteCity} />
            </label>
            <label>
                Profession:
                <input
                    onChange={e => setProfession(e.target.value)}
                    value={profession} />
            </label>
            <label>
                Bio:
                <input
                    onChange={e => setBio(e.target.value)}
                    value={bio} />
            </label>
            <hr />
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={resetValues}>Reset Values</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}