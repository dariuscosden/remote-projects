// Input validators
//

// empty
export const validateEmpty = (value) => {
  if (value === '') {
    return 'Field cannot be empty';
  }

  return false;
};

// email
export const validateEmail = (email) => {
  if (!email.includes('@') || email.split('@').length !== 2) {
    return 'Please include a valid email address';
  }

  return false;
};

// password
export const validatePassword = (password) => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters in length';
  }

  return false;
};
