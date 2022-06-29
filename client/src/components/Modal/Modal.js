import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css'

const Modal = ({ isShowing, hide, movieData }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay" />
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modall overflow-auto">
        <div className='row'>
          <button type="button" className="modal-close-button col-lg-3" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
          <img className='col-lg-3 col-12' src={movieData.Poster} alt="movie" />
          <div className='col-lg-7 col-12'>
            <h5>Movie Name: {movieData.Title}</h5>
            <span><b>Overview:</b>
              <div>{movieData.Plot}</div></span>
            <div><b>Movie Released Date:</b> {movieData.Released}</div>
            <div> <b>Actors:</b> {movieData.Actors}</div>
            <div> <b>Awards:</b> {movieData.Awards}</div>
            <div> <b>BoxOffice:</b> {movieData.BoxOffice}</div>
            <div> <b>Country:</b> {movieData.Country}</div>
            <div> <b>Director:</b> {movieData.Director}</div>
            <div> <b>Genre:</b> {movieData.Genre}</div>
            <div> <b>Language:</b> {movieData.Language}</div>
            <div> <b>Production:</b> {movieData.Production}</div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;