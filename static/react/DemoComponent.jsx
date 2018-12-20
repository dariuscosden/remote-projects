import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { testAction, testAction2 } from '../redux/actions/postActions';

class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.testAction();
    this.props.testAction2();
  }

  render() {
    return (
      <section id="demoComponent">
        <div className="w80">
          <div className="flex-rw-sb-c-s m50b-s p25v">
            <div>
              <h2 className="m10b_s">Website Name</h2>
            </div>
            <div>
              <a href="/" className="m10l m10r">
                Test
              </a>
              <a href="/" className="m10l m10r">
                Test
              </a>
              <a href="/" className="m10l m10r">
                Test
              </a>
              <a href="/" className="m10l m10r">
                Test
              </a>
            </div>
          </div>
          <div className="m50b-s text-center">
            <h2>Grid Layout</h2>
            <p>
              Lorem ipsum dolor sit amet, meis mandamus his no, no fabulas
              habemus commune sed, eum exerci ocurreret cu. Erant instructior ad
              per. Eum et vocent option deserunt, noster graeco nostro eos an.
              Vel mazim mediocritatem cu.
            </p>
          </div>
          <div className="flex-rw-sb-c-m m50b-s text-center">
            <div className="flex-w25-m m10h-m m10b_s">
              <h3>Service</h3>
              <p>
                Lorem ipsum dolor sit amet, meis mandamus his no, no fabulas
                habemus commune sed, eum exerci ocurreret cu. Erant instructior
                ad per. Eum et vocent option deserunt, noster graeco nostro eos
                an. Vel mazim mediocritatem cu.
              </p>
            </div>
            <div className="flex-w25-m m10h-m m10b_s">
              <h3>Service</h3>
              <p>
                Lorem ipsum dolor sit amet, meis mandamus his no, no fabulas
                habemus commune sed, eum exerci ocurreret cu. Erant instructior
                ad per. Eum et vocent option deserunt, noster graeco nostro eos
                an. Vel mazim mediocritatem cu.
              </p>
            </div>
            <div className="flex-w25-m m10h-m m10b_s">
              <h3>Service</h3>
              <p>
                Lorem ipsum dolor sit amet, meis mandamus his no, no fabulas
                habemus commune sed, eum exerci ocurreret cu. Erant instructior
                ad per. Eum et vocent option deserunt, noster graeco nostro eos
                an. Vel mazim mediocritatem cu.
              </p>
            </div>
            <div className="flex-w25-m m10h-m m10b_s">
              <h3>Service</h3>
              <p>
                Lorem ipsum dolor sit amet, meis mandamus his no, no fabulas
                habemus commune sed, eum exerci ocurreret cu. Erant instructior
                ad per. Eum et vocent option deserunt, noster graeco nostro eos
                an. Vel mazim mediocritatem cu.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  actions: state.actions
});

export default connect(
  mapStateToProps,
  { testAction, testAction2 }
)(DemoComponent);
