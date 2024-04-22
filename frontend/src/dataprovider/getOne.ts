import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from ".";

type GetOneProps = {
  resource: string;
  id: string;
};

export const getOne = ({ resource, id }: GetOneProps) => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: [resource, id],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/${resource}/${id}`, {
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
