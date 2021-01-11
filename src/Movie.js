import "./Movie.css";

const Movie = ({ movie, nominationHandler, nominationText, buttonId, isDisabled}) => {
  return (
    <li className="movie-container" key={movie.imdbID}>
      <p className="movie-title"> {movie.Title} </p>
      <button disabled={isDisabled} id={buttonId} onClick={() => nominationHandler(movie)}>{ nominationText }</button>
    </li>
  );
};

export default Movie;