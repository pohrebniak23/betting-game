import {
  Box,
  Flex,
  Grid,
  Input,
  Skeleton,
  Stack,
  Text
} from "@chakra-ui/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers, utils } from "ethers";
import { useState } from "react";
import { contractAddress } from "../../utils/consts";
import Card from "../Card/Card";
import styles from "./Game.module.scss";

export default function Game() {
  const address = useAddress();
  const [amount, setAmount] = useState<string>("");
  const { contract } = useContract(contractAddress);

  const { data: gamesCount, isLoading: loadingGamesCount } = useContractRead(
    contract,
    "gamesCount"
  );
  const { data: allGames, isLoading: loadingAllGames } = useContractRead(
    contract,
    "getAllGames"
  );

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const clearAmountValue = () => {
    setAmount("");
  };

  console.log(loadingAllGames);

  return (
    <Box mt={10}>
      <h1 className={styles.title}>
        Welcome to <span>Betting Game</span>
      </h1>

      {address && (
        <Flex py={6} gap={4} width="100%">
          <Input
            className={styles.amount}
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.001 BNB"
          />
          <Web3Button
            contractAddress={contractAddress}
            action={(contract) => {
              contract.call("createGame", [], {
                value: ethers.utils.parseEther(amount),
              });
            }}
            onSuccess={clearAmountValue}
            children={"Create game"}
          />
        </Flex>
      )}
      <Flex mb={2} alignItems="center">
        <Text mr="1">Total games:</Text>
        {gamesCount && <Text>{parseInt(gamesCount._hex).toString()}</Text>}
        {loadingGamesCount && <Skeleton height="16px" width="20px" />}
      </Flex>
      <Grid gap={6} mt={4} templateColumns="repeat(4, 1fr)">
        {allGames &&
          allGames.map((game: any, index: number) => (
            <Card
              amount={String(
                utils.formatEther(parseInt(game.amount._hex).toString())
              )}
              player={game.player}
              id={parseInt(game.id._hex).toString()}
              key={index}
            />
          ))}

        {loadingAllGames &&
          Array.from({ length: 4 }).map((item, index) => (
            <Stack spacing={4} key={index}>
              <Skeleton height="20px" mb={1} />
              <Skeleton height="20px" />
              <Skeleton height="60px" />
            </Stack>
          ))}
      </Grid>
    </Box>
  );
}
