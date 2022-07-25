import { Chip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          size="small"
          color={row.getValue() === "active" ? "primary" : "default"}
        />
      );
    },
  },
];
