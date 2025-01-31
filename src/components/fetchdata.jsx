import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // To handle cleanup and avoid memory leaks

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result); // Set the fetched data
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err); // Capture error
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
