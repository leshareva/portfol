import { iTheme } from './../../Api/interfaces';
import { openModalSuccess } from '../CardDetailsComponent/actions';
import { iRubric, iWork } from '../../Api/interfaces';
import { isMobile } from 'react-device-detect';


const themeSelectorInitSuccess = () => {
    return {
        type: 'THEME_SELECTOR/INIT_SUCCESS'
    }
}

const previewRenderSuccess = (cards: any[]) => {
    return {
        type: 'THEME_SELECTOR/PREVIE_RENDER_SUCCESS',
        cards
    }
}

export const cardSelectedSuccess = (card: any) => {
    return {
        type: 'THEME_SELECTOR/CARD_SELECTED_SUCCESS',
        card
    }
}

export const init = (rubric: iRubric, works: iWork[], work_id?: string) => {
    return async (dispatch: any) => {
        const cards = convertToCards(dispatch, rubric, works, work_id)
        dispatch(previewRenderSuccess(cards))
    }
}

export interface iCard {
    key: string
    theme: iTheme
    work?: iWork
}

const convertToCards = (dispatch: any, rubric: iRubric, works: iWork[], work_id?: string) => {
    let cards: Array<Array<iCard>> = []
    let i = 0;
    let active_card 
    if(work_id) {
        let work = works.find(el=>el.work_id===work_id)
        if(work) {
            active_card = {
                key: work.work_id,
                theme: work.theme,
                work: work
            }
        } 
    }
    

    rubric.themes = rubric.themes.map(theme => {
        theme.works = works.filter(work => work.theme.theme_id === theme.theme_id || work.exercise?.theme_id === theme.theme_id)
        .sort((a,b)=>{
            return new Date(a.date_created).getTime() - new Date(b.date_created).getTime()
        })
        let theme_works: iCard[] = theme.works.map(work => {
            let card = {
                key: work.work_id,
                theme: theme,
                work: work
            }

            return card
        }) || []

        let empty_cards_counter = 3
        if (theme_works.length === 0) empty_cards_counter = 3
        if (theme_works.length === 1) empty_cards_counter = 2
        if (theme_works.length >= 2) empty_cards_counter = 1


        for (let step = 0; step < empty_cards_counter; step++) {
            i = i + 1
            let card = {
                key: "" + i,
                theme: theme
            }

            if (!active_card && !isMobile && i===1) {
                active_card = card
            }

            theme_works.push(card)
        }

        cards.push(theme_works)

        return theme
    })
    
    // if (!active_card && !isMobile) {
    //     let card = cards.find(el => el[el.length - 1].key === "1")
    //     console.log(card)
    //     active_card = card ? card.find(el => el.key === "1") : null
    // }

    if (active_card) dispatch(cardSelectedSuccess(active_card))

    dispatch(themeSelectorInitSuccess())
    return cards
}

export const onElementClick = (card: any) => {
    return (dispatch: any) => {
        dispatch(cardSelectedSuccess(card))
        if (isMobile) dispatch(openModalSuccess())
    }
}

