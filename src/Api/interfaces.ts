export interface iApi {
    saveFeedback: (params: iFeedbackOptions) => Promise<any>
    fetchWorks: (params?: {maxRecords?: number, by_event_ids?: string, group_by_themes?: boolean, by_rubric_ids?: string, without_feedback_only?: boolean, by_user_ids?: string }) => Promise<any[]>
    fetchEvents: (params?: { by_event_ids?: string, only_upcoming?: boolean, only_past?: boolean, max_records?: number }) => Promise<iEvent[]>,
    fetchGoods: (params?: { by_good_ids?: string }) => Promise<iGood[]>
    fetchHistoryData: () => Promise<iAccrual[]>
    fetchAchieves: () => Promise<iAchieve[]>
    fetchRubricsData: (params?: { by_rubric_ids?: string, include_events?: boolean, include_themes?: boolean }) => Promise<iRubric[]>
    fetchUserData: (vk_id: number) => Promise<iUser>
    fetchUserExercises: (params: {user_id: string, by_exercise_ids?: string}) => Promise<any[]>
    fetchExercises: (params?: iExercisesListOption) => Promise<iExercise[]>
    selectExercise: (params: { theme_id: string, user_id: string }) => Promise<any>
    addMemberToEvent: (params: { event_id: string, user_id: string }) => Promise<any>
    enterToEvent: (params: { user_id: string, event_id: string, theme_id?: string }) => Promise<any>
    callApi: (path: string, body?: any, method?: 'get' | 'post') => Promise<any[] | any>
    saveWorks: (params: { files: any[], exercise_id: string, user_id: string }) => Promise<any>
    cancelExercise: (params: iCancelExerciseOpt ) => Promise<any>

}

export interface iFeedbackOptions {
    work_id: string
    stars: number
    feedbacker_id: string
    comment?: string
    votes?: {
        [key: string]: number
    }
}

export interface iCancelExerciseOpt {
    exercise_id: string
    user_id: string
}

export interface iUser {
    name: string
    about?: string
    balance: number
    active_purchases?: string[]
    experience: number
    vk_id: number
    user_id: string
    visited_events?: string[]
    skills?: iUserSkills
    levelNo: number
    current_level?: iUserLevel
    next_level?: iUserLevel
    photo_200?: string
    event_theme?: any
    theme_exercise?: any
    works?: iWork[]
}


export interface iUserSkills {
    [skill_id: string]: {
        skill_name: string
        skill_id: string
        sum: number
        done_event_types?: { [event_id: string]: boolean }
    }
}

export interface iUserLevel {
    levelNo: number
    need_experience: number
    goods: string[]
}

export interface iRubric {
    title: string
    desc: string
    rubric_id: string
    cover_image: iAttachment
    market_items: iGood[]
    users_have_access: string[]
    events: iEvent[]
    themes: iTheme[]
    schedule: string
}

export interface iGood {
    good_id: string
    title: string,
    stars: number
    price: number
    price_to_subscribers: number
    cover: iAttachment[]
    desc: string
    users_have_access: string[]
    level: number
}

export interface iEvent {
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
    isGoing(): boolean
    figma_file_id?: string
}

export interface iTheme {
    theme_id: string
    title: string
    desc: string
    criterias: string[]
    rubric_id: string
    events: string[]
    skills: string[]
    day: number,
    available_experience: number
    status: string
    works?: iWork[]
    instruction_video_id?: string
}


export interface iAchieve {
    achieve_id: string
    title: string
    desc: string
    rubric_id: string
    cover?: iAttachment[]
    users_that_reached?: string[]
}

export interface iAttachment {
    url: string,
    thumbnails?: any
}

export interface iAccrual {
    accrual_id: string
    date: string
    amount: number
    comment: string
    experience: number
    user: {
        user_id: string
        vk_id: number
    }
    votes?: iVote[]
    work_id: string
    rubric_id?: string
    event_id?: string
}

export type iVote = {
    vote_id: string
    amount: number
    feedbacker: {
        user_id: string
        name?: string
        vk_id?: number
    }
    skill: {
        skill_id: string
        title: string
    }
    accrual_id?: string
    coacher?: 1 | 0
    date: number
    vote_weight?: number
};


export interface iExercise {
    title: string
    exercise_id: string
    desc: string
    link: string
    files: iAttachment[]
    users_id_done: string[]
    theme_id: string
    criterias: string[]
    video_url: string
    theme: iTheme
    started_time?: string
    finished_time?: string
}



export interface iWork {
    date_created: string
    work_id: string
    text_rate?: string
    user_rec_id: string
    exercise?: iExercise
    theme: {
        theme_id: string
        title: string
        criterias: string[]
    }
    event: {
        event_id: string
    }
    images: {
        url: string
        width: number
        height: number
        thumbnails: any
    }[]
    user: {
        name: string,
        user_rec_id: string
        vk_id: number
    },
    vk_data: {
        post_url: string,
        comment_id: number
    }
    votes: iGroupedVotes[]
    paid?: boolean
    current_votes?: {
        name: string
        value: number
    }[]
}



export interface iGroupedVotes {
    feedbacker: iUser,
    items: {
        amount: number
        criteria_id: string
        title: string
    }[]
}



export interface iExercisesListOption {
    by_exercise_ids?: string[] | string
    by_theme_ids?: string[] | string
    not_visited_by_user?: string
    maxRecords?: number
}