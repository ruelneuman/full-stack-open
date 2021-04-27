import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const childrenWithVisibilityToggle = React.Children.map(children, child => {
    return React.cloneElement(child, { toggleVisibility });
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {childrenWithVisibilityToggle}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};


export default Togglable;