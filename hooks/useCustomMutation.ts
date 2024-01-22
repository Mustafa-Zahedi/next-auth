import { useState } from "react";

type Variables = {
  // Define the type of variables expected by your mutation
  // Example: id: string, name: string, etc.
};

type MutationResponse = {
  // Define the type of response expected from your mutation
  // Example: id: string, success: boolean, etc.
};

function useCustomMutation({
  mutation,
  variables,
}: {
  mutation: any;
  variables?: any;
}): [
  (variables: Variables) => void,
  {
    loading: boolean;
    error: Error | null;
    data: MutationResponse | null;
    refetch: (variables?: Variables) => Promise<void>;
  }
] {
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const defaultVariables = variables;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<MutationResponse | null>(null);

  const executeMutation = async (variables?: Variables) => {
    setLoading(true);
    setError(null);
    setData(null);

    const reqBody = JSON.stringify({
      mutation: mutation,
      variables: variables || defaultVariables,
    });

    try {
      const response = await fetch(endpoint, {
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

  const refetchMutation = async (variables?: Variables) => {
    await executeMutation(variables);
  };
  return [executeMutation, { loading, error, data, refetch: refetchMutation }];
}

export default useCustomMutation;
