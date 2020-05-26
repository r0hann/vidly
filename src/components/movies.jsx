import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getMovies, deleteMovie } from "../services/movieService";
import {
  loadMovies,
  deleteMovie,
  deleteMovieFailed,
  reloadMovies,
} from '../redux/actions/moviesActions';
// import { getGenres } from "../services/genreService";
import { loadGenres } from '../redux/actions/genresActions';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

class Movies extends Component {
  state = {
    pageSize: 4,
    searchQuery: '',
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { loadGenres, loadMovies } = this.props;
    await loadGenres();
    await loadMovies();
  }

  handleDelete = async (movie) => {
    const { deleteMovie, deleteMovieFailed } = this.props;
    try {
      await deleteMovie(movie);
    } catch (error) {
      if (error && error.response.status === 404)
        toast.error('This movie has already been deleted!');
      await deleteMovieFailed();
    }
  };

  handleLiked = async (movie) => {
    const { reloadMovies } = this.props;
    const movies = [...this.props.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    console.log('handleLIke', movies);
    await reloadMovies(movies);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const { selectedGenre, sortColumn, currentPage, pageSize, searchQuery } = this.state;
    const { movies: allMovies } = this.props;

    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filteredMovies.length, movies };
  };

  handleSearch = (query) => {
    this.setState({ selectedGenre: null, searchQuery: query, currentPage: 1 });
  };

  render() {
    const { currentPage, pageSize, selectedGenre, sortColumn, searchQuery } = this.state;

    const { user, genres } = this.props;

    const { length: count } = this.props.movies;
    if (count === 0) return <p>There are no movies in database!</p>;
    let { totalCount, movies } = this.getPageData();

    return (
      <div className='row'>
        <div className='col-2'>
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          {user && (
            <Link to='/movies/new' className='btn btn-primary' style={{ marginBottom: 20 }}>
              New Movie
            </Link>
          )}

          <p>{`There are ${totalCount} movies in database.`}</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLiked={this.handleLiked}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageClick={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

Movies.propTypes = {
  loadGenres: PropTypes.func.isRequired,
  loadMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  deleteMovieFailed: PropTypes.func.isRequired,
  reloadMovies: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    movies: state.movies.map((m) => {
      return { ...m, liked: m.liked ? m.liked : false };
    }),
    genres: [{ _id: '', name: 'All Genres' }, ...state.genres],
  };
}

const mapDispatchToProps = {
  loadMovies,
  loadGenres,
  deleteMovie,
  deleteMovieFailed,
  reloadMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
