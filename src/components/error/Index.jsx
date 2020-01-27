import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

const Error = (props) => {
  const { error, dispatch } = props;

  // refs
  const wrapperRef = useRef(null);
  const indicatorRef = useRef(null);

  // sets the timer on initial render
  useEffect(() => {
    if (indicatorRef.current) {
      setTimeout(() => {
        wrapperRef.current.style.bottom = `0`;
        indicatorRef.current.style.bottom = `0`;
      }, 1);

      setTimeout(() => {
        indicatorRef.current.style.transition = `all 9.7s linear`;
        indicatorRef.current.style.width = `0%`;
      }, 300);

      const errorTimeout = setTimeout(() => {
        dispatch({ type: 'REMOVE_ERROR' });
      }, 10000);

      return () => clearTimeout(errorTimeout);
    }
  }, [indicatorRef.current]);

  return (
    <div ref={wrapperRef} className="floating-error">
      {error.message}
      <div ref={indicatorRef} className="floating-error__indicator" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(
  mapStateToProps,
  null,
)(Error);
