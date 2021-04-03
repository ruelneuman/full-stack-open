import React, { useState } from 'react';

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
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};


export default Togglable;