import { Grid } from "@chakra-ui/react";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import { contractAddress } from "../../utils/consts";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import styles from "./GameAlerts.module.scss";

export const GameAlerts = () => {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const [alertId, setAlertId] = useState(0);
  const [alerts, setAlerts] = useState<any>([]);

  useEffect(() => {
    if (contract) {
      const gameResult = contract.events.addEventListener(
        "GameResult",
        (event) => {
          const isAlert =
            address === event.data.winner || address === event.data.looser;
          const isWinner = address === event.data.winner;
          const isLooser = address === event.data.looser;
          let gameResultMessage = "";
          let status = "";

          if (!isAlert) {
            return;
          }

          if (isWinner) {
            gameResultMessage = `Congratulations, you win ${String(
              utils.formatEther(parseInt(event.data.winAmount).toString())
            )} TBNB`;
            status = "success";
          }

          if (isLooser) {
            gameResultMessage = "You loose(";
            status = "error";
          }

          setAlertId((id) => id + 1);
          const alertItem = {
            id: alertId,
            status: status,
            isOpen: true,
            message: gameResultMessage,
            title: status === "success" ? "Win" : "Loose",
            tx: event.transaction.transactionHash,
          };
          setAlerts((alerts: any) => [...alerts, alertItem]);
          console.log(event);
        }
      );

      const gameCreated = contract.events.addEventListener(
        "GameCreated",
        (event) => {
          setAlertId((id) => id + 1);
          const alertItem = {
            id: alertId,
            status: "success",
            isOpen: true,
            message: `Game successful created for ${String(
              utils.formatEther(parseInt(event.data.amount).toString())
            )} TBNB`,
            title: "Game created",
            tx: event.transaction.transactionHash,
          };
          setAlerts((alerts: any) => [...alerts, alertItem]);
          console.log(event);
        }
      );

      return () => {
        gameResult();
        gameCreated();
      };
    }
  }, [contract, alerts, address, alertId]);

  return (
    <Grid templateColumns="1fr" gridGap={4} className={styles.alertBox}>
      {alerts.map((item: any, index: any) => (
        <AlertMessage
          isOpen={item.isOpen}
          status={item.status}
          message={item.message}
          title={item.title}
          tx={item.tx}
          onClose={() => {
            setAlerts((alerts: any) =>
              alerts.filter((alertMessage: any) => alertMessage.id !== item.id)
            );
          }}
          key={index}
        />
      ))}
    </Grid>
  );
};

/*
Test alerts btn
<Button
  onClick={() => {
    setAlertId((id) => id + 1);
    const alertItem = {
      id: alertId,
      status: "success",
      isOpen: true,
      message: "123",
      title: "Success message",
      tx: "123",
    };
    setAlerts((alerts: any) => [...alerts, alertItem]);
  }}
>
  Add alert
</Button>
*/
