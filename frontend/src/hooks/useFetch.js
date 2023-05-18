import { useEffect, useState } from "react";

const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(path)
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [path]);

  return { data, error, loading };
};

export default useFetch;
