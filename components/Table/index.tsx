import { Pagination, Skeleton, Typography } from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChangeEvent, FC, memo, useMemo } from "react";
import {
  StyledTable,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
  StyledTableWrapper,
} from "./styled";

interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  isFetching: boolean;
  skeletonCount?: number;
  skeletonHeight?: number;
  headerComponent?: JSX.Element;
  pageCount: number;
  currentPage: number;
  onPaginationChange: (event: ChangeEvent<unknown>, value: number) => void;
}

const Table: FC<TableProps> = ({
  data,
  columns,
  isFetching,
  skeletonCount = 10,
  skeletonHeight = 28,
  headerComponent,
  pageCount,
  currentPage,
  onPaginationChange,
}) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: memoizedData ?? [],
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: false,
    pageCount,
  });

  const skeletons = Array.from({ length: skeletonCount }, (x, i) => i);

  const columnCount = getAllColumns().length;

  const noDataFound = !isFetching && !memoizedData;

  return (
    <StyledTableWrapper>
      <>
        {headerComponent && (
          <StyledTableHeader>{headerComponent}</StyledTableHeader>
        )}
      </>
      <StyledTable>
        {!isFetching && (
          <StyledTableHead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <Typography
                      variant="overline"
                      borderBottom="1px solid black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Typography>
                  </th>
                ))}
              </tr>
            ))}
          </StyledTableHead>
        )}
        <tbody>
          {!isFetching ? (
            getRowModel().rows.map((row) => (
              <StyledTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </StyledTableRow>
            ))
          ) : (
            <>
              {skeletons.map((skeleton) => (
                <tr key={skeleton}>
                  {Array.from({ length: columnCount }, (x, i) => i).map(
                    (elm) => (
                      <td key={elm}>
                        <Skeleton height={skeletonHeight} />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </StyledTable>
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
        count={pageCount}
        page={currentPage}
        onChange={onPaginationChange}
      />
      {noDataFound && <div>No Data Found!</div>}
    </StyledTableWrapper>
  );
};

export default memo(Table);
