import { useState } from "react";
import "./App.css";
import Search from "./Search";
import Movie from "./Movie";
import LoadingSpinner from "./LoadingSpinner";
import banner from "./banner.png";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations")) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setLoading(true);
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_IMDB_API_KEY}&s=${e.target.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { Response, Search, Error } = data;
        if (Response === "True") {
          setMovies(Search);
          setError("");
        } else {
          setError(Error);
          setMovies([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setMovies([]);
      });
  };

  const addNominationHandler = (movie) => {
    setNominations((prev) => {
      localStorage.setItem("nominations", JSON.stringify([movie, ...prev]));
      return [movie, ...prev];
    });
  };

  const removeNominationHandler = (movie) => {
    setNominations((prev) => {
      const remainingNotifications = prev.filter(
        (mov) => mov.imdbID !== movie.imdbID
      );
      localStorage.setItem(
        "nominations",
        JSON.stringify(remainingNotifications)
      );
      return remainingNotifications;
    });
  };

  return (
    <div className="App">
      <h1 className="app-title">The shoppies</h1>
      <Search value={search} searchHandler={searchHandler} />
      {nominations.length === 5 && (
        <img className="banner" src={banner} alt="banner" />
      )}
      <div className="movies-container">
        <div className="movies">
          <h3 className="movies-header-text">
            Results {search ? "for " + search : ""}{" "}
          </h3>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {!error && movies && movies.length === 0 && (
                <p className="default-text">Search results appears here</p>
              )}
              {error && <p className="error-text">Error: {error} </p>}
              <ul>
                {movies &&
                  movies.map((movie) => (
                    <Movie
                      nominationText="nominate"
                      movie={movie}
                      key={movie.imdbID}
                      nominationHandler={addNominationHandler}
                      isDisabled={nominations
                        .map((nom) => nom.imdbID)
                        .includes(movie.imdbID)}
                      buttonId="add"
                    />
                  ))}
              </ul>
            </>
          )}
        </div>
        <div className="movies">
          <h3 className="movies-header-text">Nominations</h3>
          {nominations.length === 0 && (
            <p className="default-text">Nominated movies appears here</p>
          )}
          <ul>
            {nominations &&
              nominations.map((movie) => (
                <Movie
                  key={movie.imdbID}
                  nominationText="remove"
                  movie={movie}
                  nominationHandler={removeNominationHandler}
                  buttonId="remove"
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
