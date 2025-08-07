import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url, config = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelTokenSource = axios.CancelToken.source();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: cancelTokenSource.token,
          ...config,
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelTokenSource.cancel("Component unmounted or URL changed");
    };
  }, [url]);
  return { data, loading, error };
}

export default useFetch;