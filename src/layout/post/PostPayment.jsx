import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// external dependencies
//
import { injectStripe } from 'react-stripe-elements';
import { CardElement } from 'react-stripe-elements';

// internal dependencies
//
import Header from 'components/header';
import Footer from 'components/footer';
import Button from 'components/button';

import history from 'utils/history';

import { sendPaymentIntent, sendPublishProject } from 'state/post/actions';

const PostPreview = (props) => {
  const { post, sendPaymentIntent, stripe, sendPublishProject } = props;

  // handles submit payment
  const handleSubmit = (e) => {
    e.preventDefault();

    // creates a source and sends for a payment intent
    stripe
      .createSource({
        type: 'card',
        owner: {
          name: post.formState.company_name.value,
          email: post.formState.company_email.value,
        },
      })
      .then((source) => {
        if (source.error) {
          console.log(source.error);
          return;
        }

        sendPaymentIntent(source.source.id, post.formState.company_email.value);
      });
  };

  // listens for a client secret and payment intent id
  //
  useEffect(() => {
    if (post.client_secret && post.payment_intent_id) {
      stripe.confirmCardPayment(post.client_secret).then((result) => {
        if (result.paymentIntent) {
          sendPublishProject(post.projectId);
        }
      });
    }
  }, [post]);

  return (
    <>
      <Header white minimal />

      <div className="post-payment__bg">
        <div className="post-payment__wrapper">
          <div
            className="post-payment__back-button"
            onClick={() => history.goBack()}
          >
            <i className="fas fa-arrow-left" /> Go Back
          </div>
          <div className="post-payment__header">
            <h1>
              Step 4: <span className="main-green">Payment</span>.
            </h1>
            <p>
              Please enter your card information on this page to finalize your
              post.
            </p>
          </div>

          <div className="post-payment__content">
            <CardElement />
          </div>
        </div>

        <div className="post-payment__button">
          <Button text="Finalize Post" onClick={handleSubmit} />
        </div>
      </div>

      <Footer hideTop />
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = (dispatch) => {
  return {
    sendPaymentIntent: (source, email) =>
      dispatch(sendPaymentIntent(source, email)),
    sendPublishProject: (id) => dispatch(sendPublishProject(id)),
    dispatch,
  };
};

export default injectStripe(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PostPreview),
);
