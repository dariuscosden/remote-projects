import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// external dependencies
//
const classNames = require('classnames');

// internal dependencies
//
import Header from 'components/header';
import TagCard from 'components/tag-card';
import Footer from 'components/footer';
import Button from 'components/button';

import history from 'utils/history';
import { standardEmail } from 'utils/input-validators';

import { fetchProjects } from 'state/projects/actions';

const ProjectPage = (props) => {
  const { p, preview, fetchProjects, projects, companies, tags, match } = props;

  // projectPage class names
  const projectPageClassNames = classNames({
    'project-page': true,
    'is-preview': preview,
  });

  // content class names
  const contentClassNames = classNames({
    'project-page__content': true,
    'is-preview': preview,
  });

  // loads project on initial render
  useEffect(() => {
    if (match.params.id) {
      fetchProjects(match.params.id);
    }

    if (p) {
      fetchProjects(p);
    }
  }, []);

  // project
  let project;
  if (match.params.id) {
    project = projects[match.params.id];
  }
  if (p) {
    project = projects[p];
  }

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
  let demoDate;
  if (project) {
    date = new Date(project.created_at * 1000);
    demoDate = new Date();
  }

  return (
    <>
      <Header white minimal={preview} />

      <div className="project-page__bg">
        <div className="project-page__wrapper">
          <div
            className="project-page__back-button"
            onClick={() => history.goBack()}
          >
            <i className="fas fa-arrow-left" /> Go Back
          </div>

          {preview && (
            <div className="project-page__header">
              <h1>
                Step 3:{' '}
                <span className="main-purple">Review your project post</span>.
              </h1>
              <p>
                Review your project post before proceeding. Once the post has
                been finalized and the payment made, it can no longer be edited.
              </p>
            </div>
          )}

          <div className={projectPageClassNames}>
            <div className={contentClassNames}>
              <div className="project-page__date">
                {project ? (
                  <>
                    {preview
                      ? 'You are viewing a preview of this project post'
                      : `Posted on ${
                          project.demo
                            ? demoDate.toLocaleDateString('en-US', dateOptions)
                            : date.toLocaleDateString('en-US', dateOptions)
                        }`}
                  </>
                ) : (
                  'Loading...'
                )}
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
                {project && project.demo && (
                  <TagCard customTag="Demo Project" />
                )}
                <br />

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
                {project && !preview && (
                  <a
                    className="button"
                    href={
                      standardEmail.test(project.link)
                        ? `mailto:${project.link}`
                        : project.link
                    }
                    target="_blank"
                  >
                    Apply
                  </a>
                )}
              </div>
            </div>
          </div>

          {project && preview && (
            <div className="project-page__payment-button">
              <Button
                text="Proceed to Payment"
                onClick={() => history.push('/post/payment')}
              />
            </div>
          )}
        </div>
      </div>

      <Footer hideTop />
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
