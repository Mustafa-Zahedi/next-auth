"use client";

import { useEffect, useState } from "react";

type Variables = {
  // Define the type of variables expected by your query
  // Example: id: string, name: string, etc.
};

type QueryResponse = {
  // Define the type of response expected from your query
  // Example: id: string, name: string, etc.
};

export const useCustomClient = ({
  query,
  variables,
}: {
  query: any;
  variables: any;
}) => {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [flag, setFlag] = useState<boolean>(false);
  const [res, setRes] = useState<any | undefined>();
  const [error, setError] = useState<any | undefined>();
  const [data, setData] = useState<any | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const reqBody = JSON.stringify({
    query: query,
    variables,
  });

  // console.log("reqBody: ", reqBody);

  useEffect(() => {
    // if (!backendURL) setError("backend url is not correct!");
    // else {
    // console.log("use client 🚀🚀🚀", backendURL);
    if (backendURL) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(backendURL!, {
            method: "POST",
            body: reqBody,
            headers: { "Content-Type": "application/json" },
          });

          console.log("response: ", response);
          const result = await response.json();
          console.log("result: ", result);

          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [query, reqBody]);

  const refetchQuery = async () => {
    setFlag((ps) => !ps);
  };

  // if (!backendURL) {
  //   return null;
  // }

  return { data, loading, error, refetch: refetchQuery };
};
