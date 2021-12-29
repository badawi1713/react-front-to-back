import { SET_GITHUB } from "context/constants";

const githubReducer = (state, action) => {
    switch (action.type) {
		case SET_GITHUB:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

export default githubReducer