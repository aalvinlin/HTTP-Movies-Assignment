import React from "react";
import axios from "axios";

// import {useHistory} from "react-router-dom";

import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () => {
    this.props.history.push("/update-movie/" + this.state.movie.id);
  };

  deleteMovie = () => {

    let id = this.state.movie.id;

    axios
      .delete("http://localhost:5000/api/movies/" + id, id)
        .then(response => {
          console.log("Movie", id, "deleted.", response)

          // don't need to set state because returning to main page
          this.props.history.push("/");

        })
        .catch(error => console.log("Error deleting movie", id, error));
    // const addToSavedList = this.props.addToSavedList;
    // addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="movieControlDiv">
          <div className="movie-controls save-button" onClick={this.saveMovie}>
            Save
          </div>

          <div className="movie-controls edit-button" onClick={this.editMovie}>
            Edit
          </div>

          <div className="movie-controls delete-button" onClick={this.deleteMovie}>
            Delete
          </div>
        </div>
      </div>
    );
  }
}
