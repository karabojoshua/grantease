import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from ".";

type GetManyProps = {
  resource: string;
};

export const getMany = ({ resource }: GetManyProps) => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/${resource}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      return response.json();
    },
  });
};
