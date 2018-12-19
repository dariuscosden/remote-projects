import React from 'react';

class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section id="demoComponent">
        <div className="width80">
          <div className="flex-rw-sb-c-s m50b-s">
            <div>
              <h1 className="m10b_s">Website Name</h1>
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
          <div className="text-center">
            <h2>Our services</h2>
            <p>
              Lorem ipsum dolor sit amet, meis mandamus his no, no fabulas
              habemus commune sed, eum exerci ocurreret cu. Erant instructior ad
              per. Eum et vocent option deserunt, noster graeco nostro eos an.
              Vel mazim mediocritatem cu.
            </p>
            <p>
              Lorem ipsum dolor sit amet, meis mandamus his no, no fabulas
              habemus commune sed, eum exerci ocurreret cu. Erant instructior ad
              per. Eum et vocent option deserunt, noster graeco nostro eos an.
              Vel mazim mediocritatem cu.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default DemoComponent;
