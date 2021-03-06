/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';

import { CHANGE_LOCALE } from 'containers/LanguageProvider/constants';
import {
  DATA_RESOURCES,
  PAGES,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
  DATA_REQUESTED,
  LOAD_CONTENT_ERROR,
  LOAD_CONTENT_SUCCESS,
  CONTENT_REQUESTED,
  ASIDE_LAYER,
  COOKIECONSENT_CHECKED,
  SET_COOKIECONSENT,
  GA_INITIALISED,
  PATHS,
  ADD_NOTE,
  REMOVE_NOTE,
  CLEAR_NOTES,
} from './constants';

// The initial state of the App
export const initialState = {
  cookieConsent: '',
  cookieConsentApp: '',
  cookieConsentChecked: false,
  gaInitiliased: false,
  loading: false,
  error: false,
  asideLayer: false,
  /* eslint-disable no-param-reassign */
  // the data
  data: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  // record return time
  dataReady: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  // record request time
  dataRequested: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  contentRequested: Object.values(PAGES).reduce((memo, page) => {
    memo[page.key] = false;
    return memo;
  }, {}),
  content: Object.values(PAGES).reduce((memo, page) => {
    memo[page.key] = false;
    return memo;
  }, {}),
  // record return time
  contentReady: Object.values(PAGES).reduce((memo, page) => {
    memo[page.key] = false;
    return memo;
  }, {}),
  // the last location to go back to when closing routes
  closeTargetPage: {
    pathname: '',
    search: '',
    hash: '',
  },
  notes: {},
  /* eslint-enable no-param-reassign */
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOCATION_CHANGE:
        if (action.payload.location.pathname) {
          const splitPath = action.payload.location.pathname.split('/');
          const route = splitPath.length > 2 ? splitPath[2] : '';
          // last non-page for pages
          if (route !== PATHS.PAGE) {
            draft.closeTargetPage = action.payload.location;
          }
        }
        draft.howToRead = false;
        break;
      case DATA_REQUESTED:
        draft.dataRequested[action.key] = action.time;
        break;
      case LOAD_DATA_SUCCESS:
        draft.data[action.key] = action.data;
        draft.dataReady[action.key] = action.time;
        break;
      case LOAD_DATA_ERROR:
        console.log('Error loading data... giving up!', action.key);
        draft.dataRequested[action.key] = action.time;
        break;
      case CONTENT_REQUESTED:
        draft.contentRequested[action.key] = action.time;
        break;
      case LOAD_CONTENT_SUCCESS:
        draft.content[action.key] = {
          locale: action.locale,
          content: action.content,
        };
        draft.contentReady[action.key] = action.time;
        break;
      case LOAD_CONTENT_ERROR:
        console.log('Error loading content... giving up!', action.key);
        draft.contentRequested[action.key] = action.time;
        break;
      case CHANGE_LOCALE:
        draft.content = initialState.content;
        draft.contentReady = initialState.contentReady;
        draft.contentRequested = initialState.contentRequested;
        break;
      case ASIDE_LAYER:
        draft.asideLayer = action.layer;
        break;
      case COOKIECONSENT_CHECKED:
        // console.log(
        //   'Store: storing cookie consent status from cookie: ',
        //   action.status,
        // );
        draft.cookieConsent = action.status;
        draft.cookieConsentChecked = true;
        break;
      case SET_COOKIECONSENT:
        // console.log(
        //   'Store: storing cookie consent status from dialogue ',
        //   action.status,
        // );
        draft.cookieConsentApp = action.status;
        break;
      case ADD_NOTE:
        draft.notes[action.key] = action.note;
        break;
      case REMOVE_NOTE:
        delete draft.notes[action.key];
        break;
      case CLEAR_NOTES:
        draft.notes = {};
        break;
      case GA_INITIALISED:
        // console.log('Store: storing Google Analytics status: ', action.status);
        draft.gaInitiliased = action.status;
        break;
    }
  });

export default appReducer;
