import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from ".";

export const createMutation = ({
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
    //@ts-ignore
    mutationFn: async (variables: Record<string, any>) => fetch(`${baseUrl}/${resource}`, {
      method: "POST",
      //@ts-ignore
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        ...ContentType
      },
      body: contentType === "application/json" ? JSON.stringify(variables) : variables
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