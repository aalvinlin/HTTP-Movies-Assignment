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
    // const addToSavedList = this.props.addToSavedList;
    // addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
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
        <div className="movieControls">
          <div className="movie-controls save-button" onClick={this.saveMovie}>
            Save
          </div>

          <div className="movie-controls edit-button" onClick={this.saveMovie}>
            Edit
          </div>

          <div className="movie-controls delete-button" onClick={this.saveMovie}>
            Delete
          </div>
        </div>
      </div>
    );
  }
}
