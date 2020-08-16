import { API_URL, IMAGE_SERVER_URL } from '../config';
import { iApi, iExercisesListOption, iGood, iEvent, iAttachment, iTheme, iFeedbackOptions, iCancelExerciseOpt } from './interfaces';
import { formatToHumanTime } from './Helpers';
import axios from 'axios';
const instant = async (url: string, params: any) => fetch(`${API_URL}${url}`, params)



const Api: iApi = {
    cancelExercise: (params: iCancelExerciseOpt ) => {
        return Api.callApi('/exercises/cancel', params, 'post')
    },
    fetchWorks: async (params?: { by_rubric_ids?: string, by_event_ids?: string, group_by_themes?: boolean, without_feedback_only?: boolean, by_user_ids?: string, maxRecords?: number }) => {
        return Api.callApi('/works', params, 'get')
    },
    saveFeedback: async (params: iFeedbackOptions) => {
        return Api.callApi('/works/vote', params, 'post')
    },
    addMemberToEvent: (params: { event_id: string, user_id: string }) => {
        return Api.callApi('/events/member/add', params, 'post').then(res => {
            return res
        })
    },
    fetchEvents: async (params?: { by_event_ids?: string, only_upcoming?: boolean, only_past?: boolean, max_records?: number }) => {
        return Api.callApi('/events', Object.assign({ include_themes: true }, params ? params : {}), 'get').then(res => res.map((el: any) => new Event(el)))
    },

    enterToEvent: (params: { user_id: string, event_id: string, theme_id?: string }) => {
        return Api.callApi('/events/enter', params, 'post').then(res => new Event(res))
    },

    selectExercise: (params: { theme_id: string, user_id: string }) => {
        return Api.callApi('/exercises/select', params, 'post')
    },

    fetchGoods: async (params?: { by_good_ids?: string }): Promise<iGood[]> => Api.callApi('/goods', params, 'get'),

    fetchHistoryData: async (): Promise<any[]> => Api.callApi('/accruals', { maxRecords: 10 }, 'get'),
    fetchExercises: async (params?: iExercisesListOption) => Api.callApi('/exercises', params, 'get'),
    fetchAchieves: () => Api.callApi('/achieves', {}, 'get'),

    fetchRubricsData: async (params?: { by_rubric_ids?: string, include_events?: boolean, include_themes?: boolean }): Promise<any[]> => Api.callApi('/rubrics', params, 'get'),

    fetchUserData: (vk_id: number) => {
        return Api.callApi('/users/init', { vk_id: vk_id, include: { skills: true, levels: true } }, 'post')
    },

    fetchUserExercises: (params: {user_id: string, by_exercise_ids?: string}) => {
        return Api.callApi('/users/exercises', params, 'get')
    },

    saveWorks: async (params: { files: any[], exercise_id: string, user_id: string }) => {
        const data = new FormData();
        const files = params.files
        for (var x = 0; x < files.length; x++) {
            data.append('file', files[x])
        }


        data.append('exercise_id', params.exercise_id)
        data.append('user_id', params.user_id)


        return axios.post(IMAGE_SERVER_URL+"upload", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                
                let images = res.data.map(el=>{
                    return {
                        url: IMAGE_SERVER_URL + el.path
                    }
                })
                return Api.callApi('/works', {
                    exercise_id: params.exercise_id,
                    user_id: params.user_id,
                    imgs: images
                }, 'post')
            })
        // let req = await fetch(``, opt)

        
    },

    callApi: (path: string, body?: any, method?: 'get' | 'post') => {

        if (!method) method = 'post';

        const serialize = (obj: any) => {
            var str = "";
            for (var key in obj) {
                if (str !== "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(obj[key]);
            }
            return str
        }

        let url = path
        let params = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        }
        if (method === 'post') {
            Object.assign(params, { body: body ? JSON.stringify(body) : '', })
        }

        if (method === 'get') {
            url = `${url}?${serialize(body)}`
        }

        return instant(url, params).then(res => res.json()).then((res: any) => {
            if (res.name === 'Error') throw res
            return res
        })

    },


}



export class Event implements iEvent {
    event_id: string
    title?: string
    desc?: string
    date?: string
    link?: string
    cover?: iAttachment[]
    end_date?: string
    members_limit?: number
    rubric_id?: string
    count_members?: number
    members?: string[]
    events_type_id?: string
    themes?: iTheme[]
    criterias?: string[]
    feedback_video_id?: string
    human_date?: string
    time?: string
    market_items?: string[]
    figma_file_id?: string
    day?: string
    [key: string]: any

    constructor(data: any) {
        this.event_id = data.event_id
        let d = formatToHumanTime('' + data.date)
        this['human_date'] = d.human_date
        this['time'] = d.time
        this['day'] = d.day
        Object.keys(data).map((key: string) => this[key] = data[key])
    }

    isGoing = (): boolean => {

        if (!this['date'] || !this['end_date']) return false
        var now = new Date();
        var d = new Date(this['date']);
        let end = new Date(this['end_date'])
        var nowTime = now.getHours() * 60 + now.getMinutes();
        var dateTime = d.getHours() * 60 + d.getMinutes();
        var endTime = end.getHours() * 60 + end.getMinutes();

        // compare nowTime and dateTime
        if (nowTime >= dateTime && nowTime < endTime) {
            // ....
            return true
        }

        return false
    }
}

export default Api