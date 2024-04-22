import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from ".";

type DeleteOneProps = {
  resource: string;
  id: string;
};

export const deleteOne = ({ resource, id }: DeleteOneProps) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${baseUrl}/${resource}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      return response.json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [resource, id] });
    }
  });
};
