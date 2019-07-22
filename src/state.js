import {createStore} from 'redux';

const initialState = {
  isFirstStepHidden: false,
  isSecondStepHidden: true,
  isThirdStepHidden: true,
};

const reducer = (state={}, action) => {
  switch(action.type) {
  case 'SUBMIT_FIRST_STEP':
    return {
      isFirstStepHidden: true,
      isSecondStepHidden: false,
      isThirdStepHidden: true,
    };
  case 'SUBMIT_SECOND_STEP':
    return {
      isFirstStepHidden: true,
      isSecondStepHidden: true,
      isThirdStepHidden: false,
    };
  case 'RETURN_TO_FIRST_STEP':
    return {
      isFirstStepHidden: false,
      isSecondStepHidden: true,
      isThirdStepHidden: true,
    };
  default:
    return state;
  }
}

const store = createStore(reducer, initialState);

export default store;