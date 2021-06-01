import React from 'react';
import PropTypes from 'prop-types';
import { ErrorStyles } from '../styles/ErrorStyles';

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p>
          <strong>{error.message.replace('GraphQL error: ', '')}</strong>
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p>
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

DisplayError.defaultProps = { error: {} };
DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
