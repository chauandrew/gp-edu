import React, {Component} from 'react';
import './Profile.css';
import api from '../../utils/api';

class Profile extends Component {

    render() {
        return (
            <div className="page-content">
                <h1>Profile</h1>
                <p>{api.allCourses()}</p>
            </div>
        );
    }
}

export default Profile;