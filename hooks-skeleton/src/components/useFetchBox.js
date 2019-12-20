import React, { useEffect, useReducer } from 'react';

import api from '../services/api';

import { init, reducer } from '../reducers';

export default function useFetchBox(id, newFile) {
    const [state, dispatch] = useReducer(reducer, {}, init);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT', payload: { isLoading: true } });

            try {
                const result = await api.get(`boxes/${id}`);
               
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: result.data
                })
            } catch (error) {
                dispatch({ type: 'FETCH_FAILURE' })
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        dispatch({
            type: 'ADD_NEW_FILE',
            payload: newFile
        });
    }, [newFile])

    return state;
}