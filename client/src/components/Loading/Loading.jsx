import React from 'react'
import './Loading.css'
import { Spinner } from "react-bootstrap";

const Loading = (active) => {
    if (active) {
        return (
            <div className="loading-spinner-wrapper">
                <div className="loading-spinner">
                    <Spinner variant="light" animation="border" />
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
}

export default Loading