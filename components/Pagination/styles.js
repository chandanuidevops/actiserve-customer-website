import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";

const StyledPagination = styled(Pagination)`
  &.MuiPagination-root {
    font-size: 16px;
    margin: 1rem auto;
  }
  li {
    margin-right: "50px";
  }
`;

export { StyledPagination };
