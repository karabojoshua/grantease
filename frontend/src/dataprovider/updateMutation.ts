import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from ".";

export const updateMutation = ({
  resource,
  invalidateKeys,
  contentType,
}: {
  resource: string;
  invalidateKeys?: string[];
  contentType?: string;
}) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  
  contentType = contentType || "application/json";
  const ContentType = contentType === "empty" ? {}: { "Content-Type": contentType };

  return useMutation({
    mutationFn: async ({
      id,
      newValues,
    }: {
      id: string;
      newValues: Record<string, any>;
    }) =>
      //@ts-ignore
      fetch(`${baseUrl}/${resource}/${id}`, {
        method: "PUT",
        //@ts-ignore
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          ...ContentType,
        },
        body: contentType === "application/json" ? JSON.stringify(newValues) : newValues,
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
