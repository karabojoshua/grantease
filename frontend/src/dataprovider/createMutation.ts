import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from ".";

export const createMutation = (resource: string, invalidateKeys?:string[]) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (variables: Record<string, any>) => fetch(`${baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`
      },
      body: JSON.stringify(variables)
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create resource");
      }
      return response.json();
    }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    }
  });
};