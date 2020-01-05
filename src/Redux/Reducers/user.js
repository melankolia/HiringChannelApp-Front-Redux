const initialState = {
    engineersBeta: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const userReducer = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_ALL_ENGINEER_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_ALL_ENGINEER_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_ALL_ENGINEER_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          engineersBeta: action.payload.data.data.response,
        };
      default:
        return prevState;
    }
  };
  
  export default userReducer;
  