import {
    FETCH_JSON
  } from "../actions";

  export default function OrgChartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case FETCH_JSON:
        return { ...state, json_object: action.payload };}}

//qui prendo i dati dalla action e creo le variabili che vengono inserite nello store di Redux