import { combineReducers } from 'redux';
import issuesReducer from './issuesSlice';

const rootReducer = combineReducers({
  issues: issuesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
