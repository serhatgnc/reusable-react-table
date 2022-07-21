import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const StyledTableWrapper = styled(Box)`
  box-shadow: 0px 6px 4px #7e7e7e46;
  border-radius: 4px;
  padding: 1rem;
`;

export const StyledTableHeader = styled(Box)`
  padding: 0rem 1rem;
`;

export const StyledTable = styled.table`
  width: 100%;
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
