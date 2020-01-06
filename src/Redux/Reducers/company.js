const initialState = {
    companyBeta: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const companyReducer = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_COMPANY_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_COMPANY_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_COMPANY_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          companyBeta: action.payload.data[0],
        };
      default:
        return prevState;
    }
  };
  
  export default companyReducer;
  