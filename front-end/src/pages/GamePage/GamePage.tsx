import { Box, Text } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import styles from "./GamePage.module.scss";
import { GameAlerts } from "../../components/GameAlerts/GameAlerts";
import { CreateGame } from "../../components/CreateGame/CreateGame";
import { GamesList } from "../../components/GamesList/GamesList";

export const GamePage = () => {
  const address = useAddress();

  return (
    <Box mt={10} mb={10}>
      <GameAlerts />

      <Text className={styles.title}>
        Welcome to <span>Betting Game</span>
      </Text>

      <CreateGame />

      {!address && (
        <Text
          mb={4}
          fontSize={{
            sm: "18px",
            md: "24px",
          }}
          fontWeight={600}
        >
          To start game, connect your wallet
        </Text>
      )}

      <GamesList />
    </Box>
  );
};
