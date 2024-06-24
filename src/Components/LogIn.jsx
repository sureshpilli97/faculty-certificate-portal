import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import '../Styles/LogInStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    const onSuccess = (tokenResponse) => {
        const profile = jwtDecode(tokenResponse.credential);
        localStorage.setItem('user', JSON.stringify(profile));
        navigate('/');
    };

    const onFailure = (response) => {
        console.error('Login failed:', response);
    };

    return (
        <div className='login'>
            <div className='login-container' >
                <FontAwesomeIcon size='4x' icon={faUser} />
                <h5>Login To SVEC Faculty Certification Portal</h5>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </div>
        </div>
    );
};

export default Login;
