import React, {useEffect} from 'react';
import './Admin.css';
import Loading from '../../components/Loading/Loading'

const Admin = ({ currentUser }) => {
    if (!currentUser) {
        return <Loading active={!currentUser} />
    }
    if (!currentUser.is_admin) {
        window.location.href="/"
    }
    
    return (
        <div className="page-content">
            Admin authenticated
        </div>
    );
}

export default Admin;