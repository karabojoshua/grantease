import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from ".";

type CreateOneProps = {
  resource: string;
  variables: Record<string, any>;
};

export const createOne = ({ resource, variables }: CreateOneProps) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${baseUrl}/${resource}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(variables),
      });
      return response.json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
    }
  });
};
