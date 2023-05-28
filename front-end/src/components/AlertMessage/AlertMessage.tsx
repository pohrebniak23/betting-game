import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Link,
} from "@chakra-ui/react";
import styles from "./AlertMessage.module.scss";
import { formatEthAddress } from "../../utils/formatAddress";

interface AlertMessageProps {
  status: "info" | "warning" | "success" | "error" | "loading";
  onClose: () => void;
  isOpen: boolean;
  title: string;
  message: string;
  tx: string;
}

export const AlertMessage = ({
  status,
  onClose,
  isOpen,
  title,
  message,
  tx,
}: AlertMessageProps) => {
  return isOpen ? (
    <Box className={styles.alert}>
      <Alert status={status}>
        <AlertIcon />
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
          <AlertDescription style={{ display: "block" }}>
            Tx hash:
            <Link isExternal={true} href={`https://testnet.bscscan.com/tx/${tx}`}>
              {formatEthAddress(tx)}
            </Link>
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    </Box>
  ) : null;
};
