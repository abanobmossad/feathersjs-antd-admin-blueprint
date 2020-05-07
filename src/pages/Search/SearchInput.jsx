import React from 'react';
import { Input } from 'antd';
import propTypes from 'prop-types';
import querystring from 'query-string';
import { withRouter } from 'react-router-dom';

const SearchInput = ({ location }) => {
  const getPrevPath = (keyword) => {
    if (!keyword) return;
    const pathName = location.pathname.replace('/', '');
    const query = querystring.stringify({
      q: keyword,
      tab: pathName !== 'search' ? pathName : null,
    }, { skipNull: true });
    window.location.assign(`/search?${query}`);
  };

  return (
    <Input.Search
      style={{ marginLeft: '5%', width: '300px' }}
      className="search__bar-input"
      placeholder="Search for things..."
      size="large"
      onSearch={getPrevPath}
    />
  );
};

SearchInput.propTypes = {
  location: propTypes.instanceOf(Object).isRequired,
};

export default withRouter(SearchInput);
