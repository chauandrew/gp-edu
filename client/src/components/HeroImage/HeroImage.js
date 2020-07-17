import React, {Component} from 'react';
import './HeroImage.css';

class HeroImage extends Component {
    constructor(props) {
        super(props);
        this.imgStyle = {
            backgroundImage: 
                "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(" +
                    props.src + ")" 
        }
    }

    render() {
        return (
            <div className="hero-image" style={this.imgStyle}>
                <div className="hero-text">
                    <h1>{this.props.value}</h1>
                </div>
            </div>
        )
    }
}

export default HeroImage;