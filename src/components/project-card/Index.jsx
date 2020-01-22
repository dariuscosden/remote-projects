import React from 'react';
import { connect } from 'react-redux';

// internal dependencies
//
import TagCard from 'components/tag-card';

const ProjectCard = (props) => {
  const { project, companies, tags } = props;

  // company
  const company = companies[project.company];

  // date
  var dateOptions = {
    day: 'numeric',
    month: 'short',
  };
  const date = new Date(project.created_at * 1000);

  return (
    <div className="project-card">
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
          {project.location}
        </div>
      </div>

      <div className="middle">
        <div className="contact-card__tags">
          {project.tags.map((t) => {
            const tag = tags[t];
            return <TagCard key={t} tag={tag} />;
          })}
        </div>
      </div>

      <div className="right">
        <div className="project-card__date">
          {date.toLocaleDateString('en-US', dateOptions)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  companies: state.entities.companies,
  tags: state.entities.tags,
});

export default connect(
  mapStateToProps,
  {},
)(ProjectCard);
