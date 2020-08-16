
import { combineReducers } from 'redux'
import UploadReducer from './components/ThemeDetailsComponent/reducer'
import ModalReducer from './components/Modal/reducer'

function app(state: any = { isLoading: true, activeTab: 'upload', votes: {}, autoStars: false, works: [] }, action: any) {
    switch (action.type) {
        case 'APP_FETCHING_STARTED':
            return { isLoading: true }
        case 'APP_FETCHING_COMPLETED':
            return { isLoading: false }
        case 'APP/USER_FETCHED_SUCCESS':
            return { ...state, user: action.user }
        case 'APP/RUBRIC_FETCHED_SUCCESS':
            return { ...state,rubric: action.rubric }
        case 'APP/WORKS_FETCHED_SUCCESS':
            return { ...state,works: action.works }
        case 'APP/EXERCISE_STARTED':
            return { ...state, activeExercise: action.exercise }
        case 'APP/AUTH_SUCCESS':
            return { ...state, auth: true }
        case 'APP/EXERCISE_FINISHED':
            return { ...state, activeExercise: null }
        default:
            return state
    }
}

function themeSelector(state: any = { isLoading: true, themes: [] }, action: any) {
    switch (action.type) {
        case 'THEME_SELECTOR/LOADING_STARTED':
            return { ...state, isLoading: true }
        case 'THEME_SELECTOR/LOADING_FINISHED':
            return { ...state, isLoading: false }
        case 'THEME_SELECTOR/PREVIE_RENDER_SUCCESS':
            return { ...state, cards: action.cards }
        case 'THEME_SELECTOR/CARD_SELECTED_SUCCESS':
            console.log(action)
            return { ...state, activeCard: action.card }
        case 'THEME_SELECTOR/EXERCISE_SELECTED_SUCCESS':
            return { ...state, activeExercise: action.exercise }
        case 'THEME_SELECTOR/OPEN_MODAL_SUCCESS':
            return { ...state, showModal: true }
        case 'THEME_SELECTOR/CLOSE_MODAL_SUCCESS':
            return { ...state, showModal: false }
        case 'THEME_SELECTOR/INIT_SUCCESS':
            return { ...state, initialized: true }
        default:
            return state
    }
}

const allReducers = combineReducers({
    app: app,
    themeSelector,
    upload: UploadReducer,
    modal: ModalReducer
});

export default allReducers