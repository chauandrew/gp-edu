import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./Auth";
import createToast from "../utils/toast";
import Loading from "../components/Loading/Loading"
import api from '../utils/api';
import db from "../firebase";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser, pending } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Declares new function in order to utilize asynchronous features. 
        const getUser = async () => {
            try {
                let user = await api.getUser();

                // Handles creation of user object when object is not created but auth has already been set 
                if (!user.data) {
                    await api.createUser(currentUser.displayName ? currentUser.displayName : "Testing User",
                        currentUser.email,
                        currentUser.uid);
                    user = await api.getUser(currentUser.uid);
                }
                setUserData(user.data);
            } catch (error) {
                createToast(error)
                db.auth().signOut();
            }
        }

        // Checks whether user has been verified 
        if (!!currentUser) {
            // Gets the User data if user is signed in
            getUser();
        }
    }, [currentUser, window.location.pathname === 1]);

    // If Firebase is still fetching the current user, render loading spinner
    if (pending) {
        return <Loading active={pending} />
    }
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} currentUser={userData} />
                ) : (
                        <Redirect to={{
                            pathname: '/',
                        }} />
                    )
            }
        />
    );
};

export default PrivateRoute;
