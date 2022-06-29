import React, { useState, useEffect } from 'react';

import useModal from '../../modals/useModal';
import Modal from '../Modal/Modal';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const MovieList = () => {

	const [defaultMovies, setDefaultMovies] = useState([]);
	const [movies, setMovies] = useState([]);
	const [movieData, setMovieData] = useState();
	const [searchValue, setSearchValue] = useState('');
	const [movieCache, setMovieCache] = useState([]);

	const { isShowing, toggle } = useModal();

	const getMovieRequest = async () => {
		const url = `http://localhost:3001/movie/list`;
		const response = await fetch(url);
		const responseJson = await response.json();
		if (responseJson.data) {
			setDefaultMovies(responseJson.data)
			setMovies(responseJson.data);
			setMovieCache([...movieCache, responseJson.data]);
		}
	};

	useEffect(() => {
		getMovieRequest();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	const handleChange = async event => {
		setSearchValue(event.target.value)
		if(searchValue.length > 1){
			const url = `http://localhost:3001/movie/search?search=${event.target.value}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			if(responseJson.data){
				setMovies(responseJson.data);
			}
		}
		else{
			setMovies(defaultMovies);
		}
	};

	const openModal = async (imdbID) => {
		let findCache = movieCache.find(cache => cache.imdbID === imdbID)
		if (!findCache) {
			console.log(1)
			const url = `http://localhost:3001/movie/getInfoById?id=${imdbID}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			if (responseJson.data) {
				setMovieData(responseJson.data)
				setMovieCache([...movieCache, responseJson.data]);
			}
		}
		else {
			console.log(2)
			setMovieData(findCache)
		}
		toggle();
	}

	return (
		<div className='container-fluid p-lg-5 p-md-3 p-sm-2'>
			<div className='d-flex justify-content-center'>
			<input placeholder='Search' type='text' value={searchValue} onChange={handleChange}/>
			</div>
			<div className='justify-content-around row'>
				{movies.map((movie, index) => (
					<div key={index} 
						className='card m-2 col-lg-4 col-md-4 col-sm-12 d-flex justify-content-around pointer'
						onClick={() => { openModal(movie.imdbID) }}>
						<MovieCard
							key = { movie.imdbID }
							title = { movie.Title }
							imdbRating = { movie.imdbRating }
							plot = { movie.Plot }
							poster = { movie.Poster }
							alt = { movie.Title } />
					</div>
				))}
				<Modal
					movieData={movieData}
					isShowing={isShowing}
					hide={toggle}
				/>
			</div>

		</div>
	);
};

export default MovieList;