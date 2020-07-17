import React from 'react';
import Card from 'react-bootstrap/Card';
import './StoryCard.css';

const StoryCard = (props) => {
    return (
        <Card className="card-wrapper">
            <Card.Img className="card-styling" variant="top" src={props.src} alt={props.title+" img"} />
            <Card.Body>
                <Card.Text className="text-justify"><b>"</b>{props.value}<b>"</b></Card.Text>
                <Card.Title className="float-right">—<i>{props.title}</i></Card.Title>
            </Card.Body>
        </Card>
    )
}

export default StoryCard;