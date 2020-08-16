export const openModalSuccess = () => {
    return {
        type: 'THEME_SELECTOR/OPEN_MODAL_SUCCESS'
    }
}
const closeModalSuccess = () => {
    return {
        type: 'THEME_SELECTOR/CLOSE_MODAL_SUCCESS'
    }
}

export const onCloseModal = () => {
    return (dispatch: any) => {
        dispatch(closeModalSuccess())
    }
}