import { Rubric_id } from './config';
import { iUser, iWork, iRubric, iExercise } from './Api/interfaces';
import Api from "./Api"
import bridge from '@vkontakte/vk-bridge';

export const userFetchedSuccess = (user: iUser) => {
    return {
        type: 'APP/USER_FETCHED_SUCCESS',
        user
    }
}

const rubricFetchedSuccess = (rubric: iRubric) => {
    return {
        type: 'APP/RUBRIC_FETCHED_SUCCESS',
        rubric
    }
}

const userWorksFetchedSuccess = (works: iWork[]) => {
    return {
        type: 'APP/WORKS_FETCHED_SUCCESS',
        works
    }
}

export const exerciseStarted = (exercise: iExercise) => {
    return {
        type: 'APP/EXERCISE_STARTED',
        exercise
    }
}


export const exerciseFinished = (work?: iWork) => {
    return {
        type: 'APP/EXERCISE_FINISHED',
        work
    }
}

const userAuthSuccess = () => {
    return {
        type: 'APP/AUTH_SUCCESS',
    }
}


export const init = (type: 'web' | 'vk', vk_id?: number, rubric_id?: string) => {
    return async (dispatch: any) => {

        let rubric = await Api.fetchRubricsData({ by_rubric_ids: rubric_id ? rubric_id : Rubric_id, include_themes: true }).then(res => res[0])
        dispatch(rubricFetchedSuccess(rubric))

        if (type === 'vk') {
            bridge.send('VKWebAppInit');
            bridge.subscribe(async (e: any) => {
                switch (e.detail.type) {
                    case 'VKWebAppGetUserInfoResult':
                        fetchData(dispatch, e.detail.data.id, rubric)
                        dispatch(userAuthSuccess())
                        break;
                    case 'VKWebAppAccessTokenReceived':

                        break;
                    case 'VKWebAppViewRestore':
                        break;
                    case 'VKWebAppAllowNotificationsResult':
                        break;
                    default:
                }
            });


            bridge.send("VKWebAppGetAuthToken", { "app_id": 7563949, "scope": "friends,status" });
            bridge.send('VKWebAppGetUserInfo', {});

        }

        if (type === 'web' && vk_id) {
            fetchData(dispatch, vk_id, rubric)
        }
        dispatch(rubricFetchedSuccess(rubric))

    }
}


const fetchData = async (dispatch: any, vk_id: number, rubric: iRubric) => {

    const user = await Api.fetchUserData(vk_id)
    if (user.theme_exercise) {
        let active_exercise_id
        rubric.themes.forEach(theme => {
            if (user.theme_exercise[theme.theme_id] && !active_exercise_id) active_exercise_id = user.theme_exercise[theme.theme_id]
        })

        if (active_exercise_id) {
            let exercise = await Api.fetchUserExercises({ user_id: user.user_id, by_exercise_ids: active_exercise_id }).then(res => res[0])
            dispatch(exerciseStarted(exercise))
            dispatch(userFetchedSuccess(user))
            return
        }
    }

    let works = await Api.fetchWorks({ by_user_ids: user.user_id, by_rubric_ids: Rubric_id, maxRecords: 30 })
    dispatch(userWorksFetchedSuccess(works))
    dispatch(userFetchedSuccess(user))
}