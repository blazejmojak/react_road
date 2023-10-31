import { StoriesState, Story } from "../App";

type StoriesFetchInit = {
    type: 'STORIES_FETCH_INIT'
}

type StoriesSetAction = {
    type: 'STORIES_FETCH_SUCCESS';
    payload: Story[];
};

type StoriesFailure = {
    type: 'STORIES_FETCH_FAILURE';
};

type StoriesRemoveAction = {
    type: 'REMOVE_STORY';
    payload: Story;
};

type StoriesAction = StoriesFetchInit | StoriesFailure | StoriesSetAction | StoriesRemoveAction;

export const storiesReducer = (state: StoriesState, action: StoriesAction) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(
                    (story: Story) => action.payload.objectID !== story.objectID
                ),
            };
        default:
            throw new Error();
    }
};


// export const storiesReducer = (state: StoriesState, action: StoriesAction) => {
//     switch (action.type) {
//         case 'SET_STORIES':
//             return action.payload;
//         case 'REMOVE_STORY':
//             return state.filter((story: Story) => action.payload.objectID !== story.objectID);
//         default:
//             throw new Error();
//     }
// }