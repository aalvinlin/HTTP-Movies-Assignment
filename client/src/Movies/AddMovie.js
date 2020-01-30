import React, {useState} from "react";
import axios from "axios";

const AddMovie = (props) => {
    
    const initialMovie = {
        id: Date.now(),
        title: "",
        director: "",
        metascore: "",
        stars: []
      }

    const [movie, setMovie] = useState(initialMovie);

    const handleChange = (event) => {
        setMovie({...movie, [event.target.name]: event.target.value})
    }

    const handleAdd = (event) => {

        event.preventDefault();

        let id = movie.id;

        // convert strings to array
        let updatedStars = movie.stars.split(",").map(star => star.trim());
        let movieToAdd = {...movie, stars: updatedStars };

        console.log("about to add movie...");

        axios
        .post(`http://localhost:5000/api/movies`, movieToAdd)
        .then(response => {
            console.log("Movie", id, "added.", response)
  
            // don't need to set state because returning to main page
            props.history.push("/");
  
          })
          .catch(error => console.log("Error adding movie", id, error));

    }


    return (
        <div className="addMovieDiv">

            <h1>Add New Movie</h1>

            <form name="addMovie">
                <label htmlFor="title">Movie Title:
                    <input name="title" onChange={handleChange} value={movie.title} />
                </label>
                <label htmlFor="director">Director:
                    <input name="director" onChange={handleChange} value={movie.director} />
                </label>
                <label htmlFor="metascore">Metascore:
                    <input name="metascore" onChange={handleChange} value={movie.metascore} />
                </label>
                <label htmlFor="stars">Stars:
                    <input name="stars" onChange={handleChange} value={movie.stars} />
                </label>
                <button onClick={handleAdd}>Add Movie</button>
            </form>
        </div>
    )
}


export default AddMovie;