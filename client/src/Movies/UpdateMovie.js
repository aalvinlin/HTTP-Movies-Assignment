import React, { useState, useEffect } from "react";
import axios from "axios";
// import Movie from "./Movie";

const UpdateMovie = (props) => {

    let urlEnd = props.history.location.pathname;
    urlEnd = urlEnd.split("/");
    const id = urlEnd[urlEnd.length - 1];

    useEffect(() => {

        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setUpdatedMovie(res.data))
        .catch(err => console.log(err.response));

    }, [])

    const initialState = {
        id: 0,
        title: "",
        director: "",
        metascore: 0,
        stars: []
      }

    const [updatedMovie, setUpdatedMovie] = useState(initialState);

    const handleChange = (event) => {
        setUpdatedMovie({...updatedMovie, [event.target.name]: event.target.value})
    }

    const handleUpdate = (event) => {

        event.preventDefault();

        // console.log(updatedMovie);
        let updatedMovieToPut = {...updatedMovie}

        // convert strings to array
        if (!Array.isArray(updatedMovie.stars))
            {
                let updatedStars = updatedMovie.stars.split(",").map(star => star.trim());

                updatedMovieToPut = {...updatedMovie, stars: updatedStars };
        }

        console.log("about to update movie...");

        axios
        .put(`http://localhost:5000/api/movies/${id}`,updatedMovieToPut)
        .then(response => {
            console.log("Movie", id, "updated.", response)
  
            // don't need to set state because returning to main page
            props.history.push("/");
  
          })
          .catch(error => console.log("Error updating movie", id, error));

    }

    return (
        <div className="updateMovieDiv">

            <h1>Update Movie Info</h1>

            <form name="updateMovie">
                <label htmlFor="title">Movie Title:
                    <input name="title" onChange={handleChange} value={updatedMovie.title} />
                </label>
                <label htmlFor="director">Director:
                    <input name="director" onChange={handleChange} value={updatedMovie.director} />
                </label>
                <label htmlFor="metascore">Metascore:
                    <input name="metascore" onChange={handleChange} value={updatedMovie.metascore} />
                </label>
                <label htmlFor="stars">Stars:
                    <input name="stars" onChange={handleChange} value={updatedMovie.stars} />
                </label>
                <button onClick={handleUpdate}>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie