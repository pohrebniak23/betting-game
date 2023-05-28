import { Alert, AlertTitle, Flex, Input } from "@chakra-ui/react";
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState } from "react";
import { contractAddress } from "../../utils/consts";
// import styles from "./CreateGame.module.scss";

export const CreateGame = () => {
  const address = useAddress();
  const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>("");
  // const [isAlertOpen, setIsAlertOpen] = useState(false);
  // const [status, setStatus] = useState<any>("success");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAmountValid(true);
    setAmount(event.target.value);
  };

  const clearAmountValue = () => {
    setAmount("");
  };

  return address ? (
    <Flex py={6} gap={4} flexDirection="column" width="100%">
      <Flex gap={4} width="100%">
        <Input
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.001 TBNB"
        />
        <Web3Button
          contractAddress={contractAddress}
          action={(contract) => {
            contract.call("createGame", [], {
              value: ethers.utils.parseEther(amount),
            });
          }}
          onError={() => {
            setIsAmountValid(false);
          }}
          onSuccess={clearAmountValue}
          children={"Create game"}
        />
      </Flex>
      {!isAmountValid && (
        <Alert status="error">
          <AlertTitle>Amount value is not valid</AlertTitle>
        </Alert>
      )}
    </Flex>
  ) : null;
};
