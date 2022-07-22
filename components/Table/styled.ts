import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const StyledTableHeader = styled(Box)`
  padding: 0rem 1rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  max-height: 400px;
  td,
  th {
    padding: 0.5rem 1rem;
  }
`;

export const StyledTableHead = styled.thead`
  text-align: left;
`;

export const StyledTableRow = styled.tr`
  :hover {
    background: #a6a6a6;
  }
`;
