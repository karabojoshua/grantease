import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from ".";

export const getQuery = (resource: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: [resource],
    queryFn: async () => fetch(`${baseUrl}/${resource}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
  });
};
