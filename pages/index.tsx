import { Alert, Box } from "@mui/material";
import type { NextPage } from "next";
import axios from "axios";
import Table from "../components/Table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface FetchUsersResponse {
  data: Api.Users.Data[];
  maxPageSize: number;
}

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    const { data } = await axios.get<FetchUsersResponse>("/api/users", {
      params: {
        page: currentPage,
      },
    });
    return data;
  };

  const { data, isFetching, isError, error, isSuccess } = useQuery<
    FetchUsersResponse,
    Error
  >(["users", currentPage], fetchUsers, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const x = <Box>Hello world</Box>;

  return (
    <Box padding={6}>
      {isError && <Alert severity="error">{error?.message}</Alert>}
      {isSuccess && (
        <Table
          data={data.data}
          columns={columns}
          isFetching={isFetching}
          pagination={{
            pageCount: data.maxPageSize,
            currentPage,
            onPaginationChange: handlePageChange,
          }}
          headerComponent={x}
        />
      )}
    </Box>
  );
};

export default Home;
