import { combineReducers } from 'redux';
import entities from './entities/reducer';
import homepage from './homepage/reducer';

export default combineReducers({
  entities,
  homepage,
});
