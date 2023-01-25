import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { darkState } from "../atoms";
import { useRecoilState } from "recoil";

const Contianer = styled.button`
  all: unset;
  cursor: pointer;
  margin: 2rem;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.containerColor};
  z-index: 99999;
  color: ${(prop) => prop.theme.textColor};
  box-shadow: 0px 3px 50px 0px rgba(10, 10, 10, 0.1);
`;

function ModeToggle() {
  const [isDark, setIsDark] = useRecoilState(darkState);
  const toggleDarkAtom = () => setIsDark((prev) => !prev);
  return (
    <Contianer onClick={toggleDarkAtom}>
      <FontAwesomeIcon icon={isDark ? faLightbulb : faMoon} size="xl" />
    </Contianer>
  );
}

export default ModeToggle;
