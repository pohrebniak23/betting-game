import { Flex, Grid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { contractAddress } from "../../utils/consts";
import Card from "../Card/Card";

export const GamesList = () => {
  const { contract } = useContract(contractAddress);
  const { data: gamesCount, isLoading: loadingGamesCount } = useContractRead(
    contract,
    "gamesCount"
  );
  const { data: allGames, isLoading: loadingAllGames } = useContractRead(
    contract,
    "getAllGames"
  );

  return (
    <>
      <Flex mb={2} alignItems="center">
        <Text mr="1">Total games:</Text>
        {gamesCount && <Text>{parseInt(gamesCount._hex).toString()}</Text>}
        {loadingGamesCount && <Skeleton height="16px" width="20px" />}
      </Flex>

      <Grid
        gap={6}
        mt={4}
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        {allGames &&
          allGames.map((game: any) => (
            <Card
              amount={String(
                utils.formatEther(parseInt(game.amount._hex).toString())
              )}
              player={game.player}
              id={parseInt(game.id._hex).toString()}
              key={parseInt(game.id._hex).toString()}
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
    </>
  );
};
