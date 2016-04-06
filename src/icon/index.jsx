import React from 'react';

export default props => {
  let { type, className = '', style = {}, ...other } = props;
  className += ` icon-${type}`;
  return <i className={className} {...other} />;
};