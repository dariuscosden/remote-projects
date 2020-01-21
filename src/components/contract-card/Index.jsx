import React from 'react';
import { connect } from 'react-redux';

// internal dependencies
//
import TagCard from 'components/tag-card';

const ContractCard = (props) => {
  const { contract, companies, tags } = props;

  // company
  const company = companies[contract.company];

  // date
  var dateOptions = {
    day: 'numeric',
    month: 'short',
  };
  const date = new Date(contract.created_at * 1000);

  return (
    <div className="contract-card">
      <div className="left">
        <div className="contract-card__restrictions">
          {contract.restrictions}
        </div>
        <div className="contract-card__title">
          <h2>{contract.title}</h2>
        </div>
        <div className="contract-card__location">
          <i className="far fa-building" />
          {company.name}
          <br />
          <i className="fas fa-map-marker-alt" />
          {contract.location}
        </div>
      </div>

      <div className="middle">
        <div className="contact-card__tags">
          {contract.tags.map((t) => {
            const tag = tags[t];
            return <TagCard key={t} tag={tag} />;
          })}
        </div>
      </div>

      <div className="right">
        <div className="contract-card__date">
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
)(ContractCard);
