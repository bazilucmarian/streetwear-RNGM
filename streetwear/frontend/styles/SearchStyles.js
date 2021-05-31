import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }
  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    font-size: 2rem;
    border: 0;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export const SearchDropdown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid var(--lightGrey);
`;
export const SearchDropDownItem = styled.div`
  display: flex;
  align-items: center;
  border-left: 10px solid;
  border-bottom: 1px solid var(--lightGrey);
  background: ${(props) => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
  ${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`;
