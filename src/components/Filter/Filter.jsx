import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
  };

  state = {
    filter: '',
  };

  handleFilterChange = e => {
    e.preventDefault();

    this.setState(
      {
        filter: e.target.value,
      },
      () => this.props.onFilterChange(this.state),
    );
  };

  render() {
    const { value } = this.state;

    return (
      <div className="filter">
        <h3>Find contacts by name</h3>
        <input
          type="text"
          name="filter"
          value={value}
          onChange={this.handleFilterChange}
        />
      </div>
    );
  }
}

export default Filter;
