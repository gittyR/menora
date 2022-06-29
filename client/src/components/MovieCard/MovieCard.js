import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
    return (
        <div className='p-1 row overflow-auto'>
            <div className='col-lg-5 col-12 position-relative'>
                <img className='image' src={props.poster} alt={props.alt}></img>
                <div className='card-rating'>
                    <span className='star'>&#9733;</span>
                    <span> {props.imdbRating}</span>
                </div>
            </div>
            <div className='col-lg-7 col-12'>
                <h2 className='movie-title'><b>{props.title}</b></h2>
                <span>{props.plot}</span>
            </div>
        </div>
    );
};

export default MovieCard;