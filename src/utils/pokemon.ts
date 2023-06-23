export const getAllPoke = (url: RequestInfo | URL) => {
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

export const getPoke = (url: RequestInfo | URL) => {
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
