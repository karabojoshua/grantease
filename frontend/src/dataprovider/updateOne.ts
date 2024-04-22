import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from ".";

type UpdateOneProps = {
  resource: string;
  id: string;
  variables: Record<string, any>;
};

export const updateOne = ({ resource, id, variables }: UpdateOneProps) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${baseUrl}/${resource}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(variables),
      });
      return response.json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [resource, id] });
    }
  });
};
