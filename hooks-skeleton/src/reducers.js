export function init(initialData) {
    return initialData;
}

export function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return {
                data: action.payload,
                isLoading: false,
                isError: false
            }
        }
        case 'ADD_NEW_FILE': {
            return {
                isLoading: false,
                isError: false,
                data: {
                    ...state.data,
                    files: [
                        ...state.data.files,
                        action.payload
                    ]
                }
            }
        }
        case 'FETCH_FAILURE': {
            return {
                data: {},
                isLoading: false,
                isError: true
            }
        }
        case 'FETCH_INIT': {
            return init({
                data: {
                    files: []
                },
                isLoading: false,
                isError: false
            });
        }
        default: throw new Error("ActionType invalid.");
    }
}
