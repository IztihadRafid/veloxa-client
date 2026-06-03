import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useAllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchText), 400);
    return () => clearTimeout(timer);
  }, [searchText]);
  
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${debouncedSearch}`);
      return res.data;
    },
  });
  return { users, refetch, isLoading, searchText, setSearchText };
};

export default useAllUser;
