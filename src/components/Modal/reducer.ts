import { isMobile } from "react-device-detect"

export default (state: any = { show: false }, action: any) => {
    switch (action.type) {
        case 'MODAL/CLOSE':
            return { show: false }
        case 'MODAL/OPEN':
            return { show: true }
        case 'THEME_SELECTOR/CARD_SELECTED_SUCCESS':
            return { show: isMobile }
        default:
            return state
    }
}