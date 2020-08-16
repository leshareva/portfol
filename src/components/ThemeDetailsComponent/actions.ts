import { iCard } from './../SelectorTheme/actions';
import { userFetchedSuccess, exerciseFinished } from './../../actions';
import { init } from '../SelectorTheme/actions';

import { iUser, iRubric, iWork } from './../../Api/interfaces';
import Api from "../../Api"
import { iExercise } from "../../Api/interfaces"
import { exerciseStarted } from "../../actions"

export const onClickDropZone = (event: any, exercise_id: string, user: iUser, rubric: iRubric, works: iWork[], cards: iCard[][]) => {
    return async (dispatch: any) => {
        let work = await Api.saveWorks({ files: event.target.files, exercise_id: exercise_id, user_id: user.user_id })
        doneExercise(dispatch, user, exercise_id, rubric, works, cards, work)
    }
}

export const sendingExerciseStarted = () => {
    return {
        type: 'UPLOAD/START_UPLOAD'
    }
}

export const sendingExerciseFinished = () => {
    return {
        type: 'UPLOAD/STOP_UPLOAD'
    }
}





export const onStartButtonClick = (params: { theme_id: string, user_id: string }) => {
    return async (dispatch: any) => {
        dispatch(sendingExerciseStarted())
        await Api.selectExercise(params).then(exercise => {
            dispatch(exerciseStarted(exercise))
        }).catch(err=>{
            dispatch(sendingExerciseFinished())    
        })
        dispatch(sendingExerciseFinished())
    }
}

export const onExitButtonClicked = (exercise: iExercise, user: iUser, rubric: iRubric, works: iWork[], cards: iCard[][]) => {
    return async (dispatch: any) => {
        await Api.cancelExercise({ exercise_id: exercise.exercise_id, user_id: user.user_id })
        doneExercise(dispatch, user, exercise.exercise_id, rubric, works, cards)
    }
}

const doneExercise = (dispatch: any, user: iUser, exercise_id: string, rubric: iRubric, works: iWork[], cards: iCard[][], work?: iWork) => {
    let theme_exercise = user['theme_exercise'] || {}

    Object.keys(theme_exercise).map(theme_id => {
        if (theme_exercise[theme_id] === exercise_id) {
            delete theme_exercise[theme_id]
        }
        return theme_id
    })

    if (work) {
        works = works.filter(el=>el.work_id!==work.work_id)
        if(work.exercise) work.exercise.finished_time = new Date().toISOString()
        works.push(work)
    }
    user.theme_exercise = theme_exercise

    dispatch(userFetchedSuccess(user))
    dispatch(init(rubric, works, work ? work.work_id : ''))
    dispatch(exerciseFinished(work))


}

export const onEditClick = (exercise: iExercise) => {
    return (dispatch: any) => {
        dispatch(exerciseStarted(exercise))
    }
}