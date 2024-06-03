import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

const GoogleAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (<div className="flex h-screen w-full items-center justify-center">

    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12 dark:border-gray-600 dark:border-t-gray-50" />
      <p className="text-gray-500 dark:text-gray-400">Loading content...</p>
    </div>
  </div>)
};

export default GoogleAuthSuccess;
