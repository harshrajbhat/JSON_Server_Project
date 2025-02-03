import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result); 
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err); 
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; 
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
