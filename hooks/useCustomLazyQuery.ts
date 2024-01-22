import { useState } from "react";

type Variables = {
  // Define the type of variables expected by your query
  // Example: id: string, name: string, etc.
};

type QueryResponse = {
  // Define the type of response expected from your query
  // Example: id: string, name: string, etc.
};

function useCustomLazyQuery({
  query,
  variables,
}: {
  query: any;
  variables?: any;
}): [
  (variables: Variables) => void,
  {
    loading: boolean;
    error: Error | null;
    data: any | null;
    refetch: (variables?: Variables) => Promise<void>;
  }
] {
  const defaultVariables = variables;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<QueryResponse | null>(null);

  const backendURL = process.env.BACKEND_URL;

  const executeLazyQuery = async (variables?: Variables) => {
    setLoading(true);
    setError(null);
    setData(null);

    const reqBody = JSON.stringify({
      query: query,
      variables: variables || defaultVariables,
    });

    try {
      const response = await fetch(backendURL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: reqBody,
      });
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const refetchLazyQuery = async (variables?: Variables) => {
    await executeLazyQuery(variables);
  };

  return [
    executeLazyQuery,
    { loading, error, data, refetch: refetchLazyQuery },
  ];
}

export default useCustomLazyQuery;
