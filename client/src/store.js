import React, {createContext, useReducer} from 'react';

export const Store = createContext();

const init = {
  today: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TODAYS_STATE':
      return {
        ...state,
        today: action.payload,
      };
    default:
      return state;
  }
};

export const LunsjProvider = props => {
  const [state, dispatch] = useReducer(reducer, init);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
