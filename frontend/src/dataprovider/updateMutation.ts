import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from ".";

export const updateMutation = (resource: string, invalidateKeys?:string[]) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, newValues}: {
      id: string;
      newValues: Record<string, any>;
    }) => fetch(`${baseUrl}/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify(newValues),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update resource");
      }
      return response.json();
    }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
  });
};
