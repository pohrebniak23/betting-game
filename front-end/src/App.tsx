import { Container } from "@chakra-ui/react";
import { Header } from "./components/Header/Header";
import { GamePage } from "./pages/GamePage/GamePage";
import "./styles/globals.css";

export const App = () => {
  return (
    <Container maxW="1200px">
      <Header />

      <GamePage />
    </Container>
  );
};
