import {
  Box,
  Paper,
  Skeleton,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { debounce } from "lodash";
import { ChangeEvent, FC, memo, useMemo, useState } from "react";
import { StyledPagination, StyledTableRow } from "./styled";

interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  isFetching?: boolean;
  skeletonCount?: number;
  skeletonHeight?: number;
  headerComponent?: JSX.Element;
  pageCount?: number;
  currentPage?: (page: number) => void;
  search?: (value: string) => void;
  onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
  searchLabel?: string;
}

const Table: FC<TableProps> = ({
  data,
  columns,
  isFetching,
  skeletonCount = 10,
  skeletonHeight = 28,
  headerComponent,
  pageCount,
  search,
  onClickRow,
  currentPage,
  searchLabel = "Search",
}) => {
  const [paginationPage, setPaginationPage] = useState(1);

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const memoisedHeaderComponent = useMemo(
    () => headerComponent,
    [headerComponent]
  );

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pageCount,
  });

  const skeletons = Array.from({ length: skeletonCount }, (x, i) => i);

  const columnCount = getAllColumns().length;

  const noDataFound =
    !isFetching && (!memoizedData || memoizedData.length === 0);

  const onChangeSearchField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    search && search(e.target.value);
  };

  return (
    <Paper elevation={2} style={{ padding: "1rem 0px" }}>
      <Box paddingX="1rem">
        {headerComponent && <Box>{memoisedHeaderComponent}</Box>}
        {search && (
          <TextField
            onChange={debounce(onChangeSearchField, 1000)}
            size="small"
            label={searchLabel}
            margin="normal"
            variant="standard"
          />
        )}
      </Box>
      <MuiTable>
        {!isFetching && (
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
        )}
        <TableBody>
          {!isFetching ? (
            getRowModel().rows.map((row) => (
              <StyledTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    onClick={() => onClickRow?.(cell, row)}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))
          ) : (
            <>
              {skeletons.map((skeleton) => (
                <TableRow key={skeleton}>
                  {Array.from({ length: columnCount }, (x, i) => i).map(
                    (elm) => (
                      <TableCell key={elm}>
                        <Skeleton height={skeletonHeight} />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </MuiTable>
      {noDataFound && (
        <Box my={2} textAlign="center">
          No Data Found
        </Box>
      )}
      {pageCount && currentPage && (
        <StyledPagination
          count={pageCount}
          page={paginationPage}
          onChange={(event: ChangeEvent<unknown>, page: number) => {
            setPaginationPage(page === 0 ? 1 : page);
            currentPage?.(page === 0 ? 1 : page);
          }}
          color="primary"
        />
      )}
    </Paper>
  );
};

export default memo(Table);
