import React, { useState, useEffect, useReducer, useCallback } from "react";

import isFunction from "lodash/isFunction";

import CharacterList from "./CharacterList";

import CharacterView from "./CharacterView";

import dummyData from "./dummy-data";

import endpoint from "./endpoint";

import "./styles.scss";
import { Route } from "react-router-dom";

// import { Container } from './styles';

// const initialState = {
//   result: null,
//   loading: true,
//   error: null
// };
const initialState = {
  characters: [],
  loading: true,
  error: null
};

const LOADING = "LOADING";
const RESPONSE_COMPLETE = "RESPONSE_COMPLETE";
const ERROR = "ERROR";

const fetchReducer = (state, action) => {
  if (action.type === LOADING) {
    return {
      characters: [],
      loading: true,
      error: null
    };
  }

  if (action.type === RESPONSE_COMPLETE) {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null
    };
  }

  if (action.type === ERROR) {
    return {
      characters: [],
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

const fetchCharacters = dispatch => {
  dispatch({ type: LOADING });
  fetch(endpoint + "/characters")
    .then(response => response.json())
    .then(response =>
      dispatch({
        type: RESPONSE_COMPLETE,
        payload: { characters: response.characters }
      })
    )
    .catch(error => dispatch({ type: ERROR, payload: { error } }));
};

const useFetch = url => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOADING });

    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: RESPONSE_COMPLETE, payload: { response: data } });
      } catch (error) {
        dispatch({ type: ERROR, payload: { error } });
      }
    };

    fetchUrl();

    // fetch(endpoint + "/characters")
    //   .then(response => response.json())
    //   .then(response => {
    //     setLoading(false);
    //     setResponse(response);
    //   })
    //   .catch(error => {
    //     setLoading(false);
    //     setError(error);
    //   });
  }, [url]);

  return [state.result, state.loading, state.error];
};

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    action => {
      console.log(action);

      if (isFunction(action)) {
        action(dispatch);
      } else {
        dispatch(action);
      }

      dispatch(action);
    },
    [dispatch]
  );

  return [state, enhancedDispatch];
};

export default function App() {
  // const [response, loading, error] = useFetch(endpoint + "/characters");
  // const characters = (response && response.characters) || [];

  const [state, dispatch] = useThunkReducer(fetchReducer, initialState);
  const { characters } = state;

  useEffect(() => {
    dispatch(dispatch => {});
  }, [dispatch]);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchCharacters)}>
            Fetch Characters
          </button>
          <CharacterList characters={characters} />
        </section>
        <section className="CharacterView">
          <Route path="/characters/:id" component={CharacterView} />
        </section>
        {/* <section className="sidebar">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className={error}>{error.message}</p>}
        </section> */}
      </main>
    </div>
  );
}
