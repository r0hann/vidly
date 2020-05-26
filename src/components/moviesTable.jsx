import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

class MoviesTable extends Component {
  isTrue = false;
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie, isTrue = false) =>
        isTrue ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          `${movie.title}`
        )
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => (
        <Like
          liked={movie.liked}
          onLikeToggle={() => this.props.onLiked(movie)}
        />
      )
    }
  ];
  deleteColumn = {
    key: 'delete',
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className='btn btn-danger btn-sm'>
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) this.isTrue = true;
    else this.isTrue = false;
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        isTrue={this.isTrue}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
