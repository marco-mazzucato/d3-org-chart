import axios from "axios";
import {messageStatus, UNAUTHORIZED_ERROR} from "../../common/constants";
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

export const FETCH_JSON = "FETCH_JSON";

export function fetch_json(cID) {
    return (dispatch) => {
      return axios.get(`/shareholders.json`) 
          .then((res) => {
              console.log(res);
            dispatch({
              type: FETCH_JSON,
              payload: res.data
            });
            return res;
          })
          .catch((error) => {
            console.log(error);
            if(error !== UNAUTHORIZED_ERROR)
              dispatch(notifSend({
                message: messageStatus(error),
                kind: 'danger',
                dismissAfter: 2000
              }));
            return {status: error.status};
          });
    }
  }