import axios from 'axios';

export const patientDetails = () => {
    return function (dispatch){
            return axios.get('/api/patientDetails')
                        .then(response => {   
                            dispatch({
                              type: 'PATIENTS_LIST',
                              payload: response.data
                            })
                        })
    }
}

// set { loaderPayloadKey: false, [payloadKey]: payloadResponse }
export const getData = (loaderPayloadKey, payloadKey, payloadResponse) => {
    return {
      type: "GET_DATAS",
      loaderPayloadKey: loaderPayloadKey,
      payloadKey: payloadKey,
      payloadResponse: payloadResponse
    }
}

export function setDispatchParams(dispatchParams) {
    return function(dispatch) {
      if(dispatchParams.length > 0) {
        dispatchParams.forEach((data) => {
          dispatch(getData("", data.name, data.value))
        })
      }
    }
  }