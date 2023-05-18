import { useEffect, useState } from "react";

const useFetch = (path, queryParams) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(queryParams);

  const url = path + "?" + new URLSearchParams(queryParams).toString();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [path]);

  return { data, error, loading };
};

export default useFetch;
