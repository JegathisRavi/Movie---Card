import {useEffect, useState} from "react";
import MovieCard from "./components/MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const API_URL = '[your API Key]';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const completeURL = API_URL + "&s=" + title;
        const response = await fetch(completeURL);
        const data = response.json();
        console.log(data)
        data.then((res) => {
            setMovies(res.Search);
        });
    }

    useEffect(() => {
        searchMovies('');
    }, []);

    return (
        <div className='app'>
            <h1>MovieCard</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='SearchIcon'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 ?
                    (
                        <div className='container'>
                            {
                                movies.map((movie) => (<MovieCard movie={movie} key={movie.imdbID}/>))
                            }
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    );
}

export default App;
