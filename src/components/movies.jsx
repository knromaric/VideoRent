import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Like from './like';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  displayMessage() {
    return this.state.movies.length === 0 ? (
      <p>there are no movies in the database.</p>
    ) : (
      <p>{`showing ${this.state.movies.length} in the database`}</p>
    );
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) =>{
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});

  };
  render() {
    return (
      <React.Fragment>
        {this.displayMessage()}
        <table className="table">
          <thead>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
            <th />
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked}
                        onClick={() => this.handleLike(movie)}  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;

