import React, { useState, useEffect, useReducer } from "react";

import CharacterList from "./CharacterList";

import dummyData from "./dummy-data";

import endpoint from "./endpoint";

import "./styles.scss";

// import { Container } from './styles';

const initialState = {
  result: null,
  loading: true,
  error: null
};

const fetchReducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      result: null,
      loading: true,
      error: null
    };
  }

  if (action.type === "RESPONSE_COMPLETE") {
    return {
      result: action.payload.response,
      loading: false,
      error: null
    };
  }

  if (action.type === "ERROR") {
    return {
      result: null,
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

const useFetch = url => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: "RESPONSE_COMPLETE", payload: { response: data } });
      } catch (error) {
        dispatch({ type: "ERROR", payload: { error } });
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

export default function App() {
  const [response, loading, error] = useFetch(endpoint + "/characters");
  const characters = (response && response.characters) || [];

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className={error}>{error.message}</p>}
        </section>
      </main>
    </div>
  );
}
