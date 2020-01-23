import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// internal dependencies
//
import Header from 'components/header';
import TagCard from 'components/tag-card';
import Footer from 'components/footer';
import Button from 'components/button';

import history from 'utils/history';

import { fetchProjects } from 'state/projects/actions';

const ProjectPage = (props) => {
  const { fetchProjects, projects, companies, tags, match } = props;

  // loads project on initial render
  useEffect(() => {
    fetchProjects(match.params.id);
  }, []);

  // project
  const project = projects[match.params.id];

  // company
  let company;
  if (project) {
    company = companies[project.company];
  }

  // date
  var dateOptions = {
    day: 'numeric',
    month: 'short',
  };

  let date;
  if (project) {
    date = new Date(project.created_at * 1000);
  }

  return (
    <>
      <Header />

      <div className="project-page">
        <div
          className="project-page__back-button"
          onClick={() => history.goBack()}
        >
          <i className="fas fa-arrow-left" /> Go Back
        </div>

        <div className="project-page__content">
          <div className="left">
            <div className="project-page__date">
              {project
                ? `Posted on ${date.toLocaleDateString('en-US', dateOptions)}`
                : 'Loading'}
            </div>
            <div className="project-page__title">
              <h1>{project ? project.title : 'Loading'}</h1>
            </div>

            {project && (
              <div className="project-page__location">
                <i className="far fa-building" />
                {company.name}
                <br />
                <i className="fas fa-map-marker-alt" />
                {company.location}
              </div>
            )}

            <div className="project-page__tags">
              {project &&
                project.tags.map((t) => {
                  return <TagCard key={t} t={t} />;
                })}
            </div>

            {project && project.restrictions && (
              <div className="project-page__restrictions">
                <span>{project.restrictions}</span>
              </div>
            )}

            {project ? (
              <div
                className="project-page__description"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            ) : (
              'Loading description...'
            )}

            <div className="project-page__bottom-button">
              <Button text="Apply" />
            </div>
          </div>

          <div className="right">
            <div className="project-page__box">
              <Button text="Apply" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  projects: state.entities.projects,
  companies: state.entities.companies,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: (projectId) => dispatch(fetchProjects(projectId)),
    dispatch,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProjectPage),
);
