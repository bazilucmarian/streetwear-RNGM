import styled from "styled-components";

export const PaginationStyles = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid var(--lightGrey);
  border-radius: 10px;

  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGrey);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled="true"] {
    color: grey;
    pointer-events: none;
  }
`;
