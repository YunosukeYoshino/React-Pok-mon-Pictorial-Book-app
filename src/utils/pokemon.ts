import { PokemonDetails, PokemonResponse } from "../type";

export const getAllPoke = (
  url: RequestInfo | URL
): Promise<PokemonResponse> => {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      if (res.ok) {
        res.json().then((data) => resolve(data));
      } else {
        reject(new Error("Request failed"));
      }
    });
  });
};

export const getPoke = (url: RequestInfo | URL): Promise<PokemonDetails> => {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          resolve(data);
        });
      } else {
        reject(new Error("Request failed"));
      }
    });
  });
};
