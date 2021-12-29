import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { SET_GITHUB } from "../constants";
import { githubState } from "./GithubState";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_BASE_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(githubReducer, githubState);

  const setLoading = () => {
    dispatch({
      type: SET_GITHUB,
      payload: {
        loading: true,
      },
    });
  };

  const searchUsers = async () => {
    setLoading();

    const params = new URLSearchParams({
      q: state.search,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    try {
      const data = await response.json();

      dispatch({
        type: SET_GITHUB,
        payload: {
          users: data?.items,
          loading: false,
          isNotFound: data?.items?.length === 0 ? true : false,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_GITHUB,
        payload: {
          loading: false,
          isNotFound: false,
        },
      });
    }
  };

  const fetchUserAndRepos = async (username) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const [user, repos] = await Promise.all([
      fetch(`${GITHUB_URL}/users/${username}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }),
      fetch(`${GITHUB_URL}/users/${username}/repos?${params}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }),
    ]);

    if (user.status === 404) {
      navigate("/not-found");
      dispatch({
        type: SET_GITHUB,
        payload: {
          loading: false,
        },
      });
    }

    try {
      const userData = await user.json();
      const reposData = await repos.json();

      dispatch({
        type: SET_GITHUB,
        payload: {
          user: userData,
          repos: reposData,
          loading: false,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_GITHUB,
        payload: {
          loading: false,
        },
      });
    }
  };

  const fetchRepos = async (username) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${username}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    try {
      const data = await response.json();

      dispatch({
        type: SET_GITHUB,
        payload: {
          repos: data,
          loading: false,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_GITHUB,
        payload: {
          loading: false,
        },
      });
    }
  };

  // Get initial users (testing purpose!)
  const fetchUsers = async () => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    try {
      const data = await response.json();

      dispatch({
        type: SET_GITHUB,
        payload: {
          users: data,
          loading: false,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_GITHUB,
        payload: {
          loading: false,
        },
      });
    }
  };

  const clearGithubState = () => {
    dispatch({
      type: SET_GITHUB,
      payload: {
        search: "",
        users: [],
        loading: false,
      },
    });
  };

  const changeGithub = (data) => {
    dispatch({
      type: SET_GITHUB,
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        fetchRepos,
        clearGithubState,
        fetchUsers,
        fetchUserAndRepos,
        changeGithub,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
