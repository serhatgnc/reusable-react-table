import { Alert, Box, Button, Typography } from "@mui/material";
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
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");

  const fetchUsers = async () => {
    const params = {
      ...(!search && { page: currentPage }),
      ...(search && { name: search }),
    };

    const { data } = await axios.get<FetchUsersResponse>("/api/users", {
      params,
    });
    return data;
  };

  const { data, isFetching, isError, error, isSuccess } = useQuery<
    FetchUsersResponse,
    Error
  >(["users", currentPage, search], fetchUsers, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const onClickRow = (cell: any, row: any) => {
    console.log({ cell, row });
  };

  const Header = (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4" alignItems="center">
        User Table
      </Typography>
      <Button>Action Button</Button>
    </Box>
  );

  return (
    <Box padding={6}>
      {isError && <Alert severity="error">{error?.message}</Alert>}
      {isSuccess && (
        <Table
          data={data.data}
          columns={columns}
          isFetching={isFetching}
          headerComponent={Header}
          onClickRow={onClickRow}
          pageCount={data.maxPageSize}
          currentPage={setCurrentPage}
          search={setSearch}
          searchLabel="Search by name"
        />
      )}
    </Box>
  );
};

export default Home;
