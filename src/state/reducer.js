import { combineReducers } from 'redux';
import error from './error/reducer';
import message from './message/reducer';
import entities from './entities/reducer';
import homepage from './homepage/reducer';
import post from './post/reducer';

export default combineReducers({
  error,
  message,
  entities,
  homepage,
  post,
});
