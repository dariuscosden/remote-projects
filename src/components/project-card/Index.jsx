import React from 'react';
import { connect } from 'react-redux';

// internal dependencies
//
import TagCard from 'components/tag-card';

import history from 'utils/history';

const ProjectCard = (props) => {
  const { p, projects, companies, tags } = props;

  // project
  const project = projects[p];

  // company
  const company = companies[project.company];

  // date
  var dateOptions = {
    day: 'numeric',
    month: 'short',
  };
  const date = new Date(project.created_at * 1000);
  const demoDate = new Date();

  return (
    <div
      className="project-card"
      onClick={() => history.push(`/projects/${project.id}`)}
    >
      <div className="left">
        <div className="project-card__restrictions">{project.restrictions}</div>
        <div className="project-card__title">
          <h2>{project.title}</h2>
        </div>
        <div className="project-card__location">
          <i className="far fa-building" />
          {company.name}
          <br />
          <i className="fas fa-map-marker-alt" />
          {company.location}
        </div>
      </div>

      <div className="middle">
        <div className="contact-card__tags">
          {project.demo && <TagCard customTag="Demo Project" />}
          <br />

          {project.tags.map((t) => {
            return <TagCard key={t} t={t} />;
          })}
        </div>
      </div>

      <div className="right">
        <div className="project-card__date">
          {project.demo
            ? demoDate.toLocaleDateString('en-US', dateOptions)
            : date.toLocaleDateString('en-US', dateOptions)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.entities.projects,
  companies: state.entities.companies,
  tags: state.entities.tags,
});

export default connect(
  mapStateToProps,
  {},
)(ProjectCard);
