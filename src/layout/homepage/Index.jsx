import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// internal dependencies
//
import Header from 'components/header';
import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import TextInput from 'components/text-input';
import ProjectCard from 'components/project-card';
import Footer from 'components/footer';

import history from 'utils/history';

import { fetchProjects } from 'state/projects/actions';

const Homepage = (props) => {
  const { projects, homepage, fetchProjects } = props;

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

  return (
    <>
      <div id="particles-js" />

      <Header />

      <div className="homepage">
        <div className="homepage-header">
          <h1>Remote Projects.</h1>
          <p>Find fixed-term, remote contract work. No permanent jobs.</p>

          <TextInput placeholder="ex. react, vuejs, python, go, php" />

          <ButtonGroup>
            <Button
              secondary
              text="Post a project for $249"
              onClick={() => history.push('/post')}
            />
            <Button text="Find a project" />
          </ButtonGroup>
        </div>

        <div className="homepage-projects">
          <h1>Projects</h1>
          {homepage.fetched ? (
            <>
              {homepage.projects.map((c) => {
                const project = projects[c];
                return <ProjectCard key={c} project={project} />;
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
