import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from ".";

export const deleteMutation = ({
  resource,
  invalidateKeys,
 }: {
  resource: string;
  invalidateKeys?: string[];
 }) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: any) => fetch(`${baseUrl}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete resource");
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
