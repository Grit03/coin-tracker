import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigaterHeader = styled.header`
  width: 100%;
  min-width: 300px;
  height: 11vh;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  position: fixed;
  padding: 0 10%;
  top: 0px;
  left: 0px;
  background-color: ${(props) => props.theme.bgColor};
  opacity: 0.7;
  a {
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Logo = styled.h1`
  color: inherit;
  font-size: 1.4rem;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-right: 50px;
`;

const MenuList = styled.li`
  a {
    font-weight: 500;
    display: block;
    transition: color 0.15s ease-in;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 30px;
  margin-right: 10px;
  opacity: 1;
`;

function Header() {
  return (
    <NavigaterHeader>
      <Link to={"/"}>
        <Img src="favicon.ico" />
        <Logo>COIN TRACKER</Logo>
      </Link>
      <ul>
        <MenuList>
          <Link to={"market"}>마켓</Link>
        </MenuList>
      </ul>
    </NavigaterHeader>
  );
}

export default Header;
