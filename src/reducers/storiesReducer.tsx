import { Story } from "../App";

type StoriesState = Story[];

type StoriesSetAction = {
    type: 'SET_STORIES';
    payload: Story[];
};

type StoriesRemoveAction = {
    type: 'REMOVE_STORY';
    payload: Story;
};

type StoriesAction = StoriesSetAction | StoriesRemoveAction;

export const storiesReducer = (state: StoriesState, action: StoriesAction) => {
    switch (action.type) {
        case 'SET_STORIES':
            return action.payload;
        case 'REMOVE_STORY':
            return state.filter((story: Story) => action.payload.objectID !== story.objectID);
        default:
            throw new Error();
    }
}