import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

        if (!response.ok) {
          setIsError(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsError(err.message);
        console.log(err);
        console.log(activeHttpRequests);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setIsError(null);
  };

  return { isLoading, isError, sendRequest, clearError };
};
