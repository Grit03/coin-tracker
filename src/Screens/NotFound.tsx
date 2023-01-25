import { useRecoilValue } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { darkState } from "../atoms";
import { GlobalStyle } from "../Root";
import { lightTheme, darkTheme } from "../theme";

// Styeld Components
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 256px;
`;
const Text = styled.span<{ size: string }>`
  font-size: ${({ size }) => (size === "big" ? "3rem" : "1.2rem")};
  font-weight: ${({ size }) => (size === "big" ? "bold" : "light")};
  opacity: ${({ size }) => (size === "big" ? "1" : "0.8")};
  margin-bottom: 30px;
`;

const Copyright = styled.a`
  opacity: 0.6;
`;

function NotFound() {
  const isDark = useRecoilValue(darkState);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <Text size="big">404 Page Not Found</Text>
        <Text size="small">존재하지 않는 페이지 입니다 😥</Text>
        <Img alt="404 Error" src="error-404.png"></Img>
        <Copyright
          href="https://www.flaticon.com/free-icons/error-404"
          title="error 404 icons"
        >
          Error 404 icons created by monkik - Flaticon
        </Copyright>
      </Container>
    </ThemeProvider>
  );
}

export default NotFound;
