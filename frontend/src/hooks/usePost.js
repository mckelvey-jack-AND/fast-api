/* eslint-disable no-console */

const usePost = async (path, body, queryParams) => {
  let errorBody = "";
  let data = null;

  const url = path + "?" + new URLSearchParams(queryParams).toString();

  const payload = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, payload);
    if (response.ok) {
      const responseData = await response.json();
      data = responseData;
    } else {
      errorBody = await response.json();
    }
  } catch (err) {
    console.error(err);
    errorBody = err;
  }
  return { data: data?.data, errorBody };
};

export default usePost;
