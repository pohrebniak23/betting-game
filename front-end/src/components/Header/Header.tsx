import { Flex, Text } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

export const Header = () => {
  return (
    <Flex py={2} height="76px" justifyContent="space-between" alignItems="center">
      <Text color="#f213a4" fontSize={{
        sm: "16px",
        xl: "24px"
      }} fontWeight="600">
        Betting Game
      </Text>

      <ConnectWallet dropdownPosition={{ side: "bottom", align: "center" }} />
    </Flex>
  );
};
