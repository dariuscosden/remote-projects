import { combineReducers } from 'redux';
import entities from './entities/reducer';
import homepage from './homepage/reducer';
import post from './post/reducer';

export default combineReducers({
  entities,
  homepage,
  post,
});
