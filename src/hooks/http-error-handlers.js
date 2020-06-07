import React, { useState, useEffect } from "react";
import axios from "../axios-orders";
export default (httpClient) => {
  const [error, setError] = useState(null);
  const reqInterceptor = axios.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = axios.interceptors.response.use(
    (res) => res,
    (err) => setError(err)
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmHanlder = () => {
    setError(null);
  };
  return [error, errorConfirmHanlder];
};
