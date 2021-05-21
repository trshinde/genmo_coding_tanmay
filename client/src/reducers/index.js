const INITIAL_STATE = {

};

const rootReducer = (state=INITIAL_STATE, action) => {
  const { type, payloadKey, payloadResponse, loaderPayloadKey } = action;
  switch (type) {
    case "REQUEST_DATAS": {
      return {
        ...state,
        [loaderPayloadKey]: true
      };
    }
    case "GET_DATAS": {
      return {
        ...state,
        [payloadKey]: payloadResponse,
        [loaderPayloadKey]: false
      };
    }
    case 'PATIENTS_LIST':
		  return {...state, patientDetails: action.payload}
    default:
      return state;
  }
};

export default rootReducer;
