import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const baseUrl = import.meta.env.VITE_API_URL;

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
        queryClient.invalidateQueries({queryKey: [resource]});
    }
  });
};
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
        queryClient.invalidateQueries({queryKey: [resource, id]});
    }
  });
};

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
        queryClient.invalidateQueries({queryKey: [resource, id]});
    }
  });
};