import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Header from "./Components/Header";

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css");
  ${reset}
  *{
    box-sizing: border-box;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
  html{
    height: 100%;
  }
  body{
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select: none;
    height: 100%;
  }
  button{
    background: inherit;
    border:none;
    box-shadow:none;
    border-radius:0;
    padding:0;
    overflow:visible;
    cursor:pointer
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  #root{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
`;

const queryClient = new QueryClient();

function Root() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default Root;
