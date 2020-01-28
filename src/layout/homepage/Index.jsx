import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// internal dependencies
//
import Header from 'components/header';
import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import ProjectCard from 'components/project-card';
import Footer from 'components/footer';

import history from 'utils/history';

import { fetchProjects } from 'state/projects/actions';

const Homepage = (props) => {
  const { projects, homepage, fetchProjects } = props;

  // page title
  useEffect(() => {
    document.title = 'Home - Remote Projects';
  }, []);

  // particles js
  useEffect(() => {
    particlesJS.load(
      'particles-js',
      'assets/js/particles-js/particles.json',
      function() {},
    );
  }, []);

  // projects
  useEffect(() => {
    fetchProjects();
  }, []);

  // white header
  const [whiteHeader, setWhiteHeader] = useState(false);
  useEffect(() => {
    const turnHeaderWhite = () => {
      if (window.scrollY >= 100) {
        setWhiteHeader(true);
      } else {
        setWhiteHeader(false);
      }
    };
    document.addEventListener('scroll', turnHeaderWhite);

    return () => {
      document.removeEventListener('scroll', turnHeaderWhite);
    };
  }, []);

  return (
    <>
      <div id="particles-js" />

      <Header white={whiteHeader} />

      <div className="homepage">
        <div className="homepage-header">
          <h1>Remote Projects.</h1>
          <p>
            The best place to find and list remote projects from all over the
            world.
          </p>

          {/*
          <input
            className="search-input"
            type="text"
            placeholder="ex. react, vuejs, python, go, php"
          />
*/}

          <ButtonGroup>
            <Button
              secondary
              text="Post a project for $299"
              onClick={() => history.push('/post/new-project')}
            />
            <Button text="Find a project" />
          </ButtonGroup>
        </div>

        <div className="homepage-projects">
          <div className="homepage-projects__headline">
            <h2>
              We found{' '}
              <span className="main-green">{homepage.projects.length}</span>{' '}
              remote project{homepage.projects.length > 1 && 's'}.
            </h2>

            <p>
              <i>Last updated just now</i>
            </p>
          </div>

          {homepage.fetched ? (
            <>
              {homepage.projects.map((p) => {
                return <ProjectCard key={p} p={p} />;
              })}
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  projects: state.entities.projects,
  homepage: state.homepage,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
