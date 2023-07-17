const getData = (url, success, error) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      success(result);
    })
    .catch(() => {
      error();
    });
};

const sendData = (url, success, error, body) => {
  fetch(url,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if(response.ok) {
        success();
        return;
      }
      error();
    })
    .catch(() => {
      error();
    });
};


export {getData, sendData};
