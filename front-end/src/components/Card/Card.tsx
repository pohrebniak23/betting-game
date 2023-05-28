import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CardBody,
  Card as ChakraCard,
  Link,
} from "@chakra-ui/react";
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";
import { contractAddress } from "../../utils/consts";
import { formatEthAddress } from "../../utils/formatAddress";
import styles from "./Card.module.scss";

interface CardProps {
  amount: string;
  player: string;
  id: string;
}

export default function Card({ amount, player, id }: CardProps) {
  const address = useAddress();
  const [isError, setError] = useState<boolean>(false);

  return (
    <ChakraCard>
      <CardBody position="relative">
        <div className={styles.amount}>Amount: {amount} BNB</div>

        <div className={styles.address}>
          Player:
          <Link
            isExternal={true}
            href={`https://testnet.bscscan.com/address/${player}`}
          >
            {formatEthAddress(player)}
          </Link>
        </div>

        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Transaction failed!</AlertTitle>
            <AlertDescription>Please, try again</AlertDescription>
          </Alert>
        )}

        {address && address !== player && (
          <Web3Button
            contractAddress={contractAddress}
            action={(contract) => {
              setError(false);
              contract.call("play", [id], {
                value: ethers.utils.parseEther(amount),
              });
            }}
            onError={(error) => console.log(error)}
            children={"Play game"}
            className={styles.button}
          />
        )}

        {address && address === player && (
          <Web3Button
            contractAddress={contractAddress}
            action={(contract) => {
              contract.call("deleteGame", [id], {});
            }}
            children={<CloseIcon />}
            className={styles.close}
          />
        )}
      </CardBody>
    </ChakraCard>
  );
}
