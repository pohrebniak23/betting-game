import { Container } from "@chakra-ui/react";
import Game from "./components/Game/Game";
import "./styles/globals.css";
import { Header } from "./components/Header/Header";

export const App = () => {
  return (
    <Container maxW="1200px">
      <Header />
      <Game />
    </Container>
  );
};
