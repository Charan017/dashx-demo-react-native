const validate = (type, text) => {
  const emailregex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  if (type === 'email') {
    if (emailregex?.test(text) === false) {
      return 'Please enter valid Email';
    } else {
      return true;
    }
  } else if (type === 'password') {
    if (text?.length > 5 && text?.length < 16) {
      return true;
    } else {
      return 'Please enter in between 6 to 16 characters';
    }
  } else if (type === 'newPost') {
    if (text?.length > 0) {
      return true;
    } else {
      return 'This field is required';
    }
  } else {
    if (text?.length > 2 && text?.length < 16) {
      return true;
    } else {
      return 'Please enter in between 3 to 16 characters';
    }
  }
};

export default validate;
