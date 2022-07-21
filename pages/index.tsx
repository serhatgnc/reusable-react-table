import { Alert, Box } from "@mui/material";
import type { NextPage } from "next";
import axios from "axios";
import Table from "../components/Table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface FetchCommentResponse {
  data: Api.Comments.Data[];
  maxPageSize: number;
}

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchComments = async () => {
    const { data } = await axios.get<FetchCommentResponse>("/api/comments", {
      params: {
        page: currentPage,
      },
    });
    return data;
  };

  const { data, isFetching, isError, error, isSuccess } = useQuery<
    FetchCommentResponse,
    Error
  >(["comments", currentPage], fetchComments, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Box padding={6}>
      {isError && <Alert severity="error">{error?.message}</Alert>}
      {isSuccess && (
        <Table
          data={data.data}
          columns={columns}
          pageCount={data.maxPageSize}
          isFetching={isFetching}
          currentPage={currentPage}
          onPaginationChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default Home;
