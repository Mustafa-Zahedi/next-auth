"use client";
export const fetchData = async ({
  query,
  variables,
}: {
  query: any;
  variables: any;
}) => {
  const backendURL = process.env.backendURL;

  const reqBody = JSON.stringify({
    query: query,
    variables,
  });

  if (!backendURL) {
    return null;
  }

  const res = await fetch(backendURL, {
    method: "POST",
    body: reqBody,
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};
