export default (state: any = { isLoading: false }, action: any) => {
    switch (action.type) {
        case 'UPLOAD/START_UPLOAD':
            return { isLoading: true }
        case 'UPLOAD/STOP_UPLOAD':
            return { isLoading: false }
        default:
            return state
    }
}