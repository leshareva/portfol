export const onClose = () => {
    return (dispatch: any) => {
        dispatch(closeModalAction())
    }
}

export const closeModalAction = () => {
    return {
        type: 'MODAL/CLOSE'
    }
}