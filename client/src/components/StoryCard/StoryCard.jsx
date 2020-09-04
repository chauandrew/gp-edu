import React from 'react';
import Card from 'react-bootstrap/Card';
import './StoryCard.css';

const StoryCard = (props) => {
    let hrefElement;
    if (props.href) {
        hrefElement = <a href={props.href} className="stretched-link">Watch</a>

    }
    return (
        <Card className="card-wrapper">
            <Card.Img variant="top" src={props.src} alt={props.title+" img"} />
            <Card.Body>
                <Card.Title className="">{props.title}</Card.Title>
                <Card.Text className="text=align-left">{props.description}</Card.Text>
                {hrefElement}
            </Card.Body>
        </Card>
    )
}

export default StoryCard;