const loginState = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      return [
        ...state,
        {
          item: action.payload
        }
      ];
    case "CLEAN_TOKEN":
      return [];
    default:
      return state;
  }
};

export default loginState;
