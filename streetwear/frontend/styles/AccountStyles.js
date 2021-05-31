import styled from 'styled-components';

export const AccountBox = styled.div`
  border: 1px solid var(--lightGrey);
  display: grid;
  justify-items: center;
  align-items: center;
  height: 50vh;
  transform: skew(-7deg);
  .user-details {
    list-style: none;
    li {
      line-height: 3;
      font-size: 2rem;
    }
    li > span {
      text-transform: uppercase;
      font-weight: 500;
    }
  }
`;
