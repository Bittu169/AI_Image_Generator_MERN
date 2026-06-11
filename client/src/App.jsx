import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

function App({ children }) {
  return <Container>{children}</Container>;
}

export default App;