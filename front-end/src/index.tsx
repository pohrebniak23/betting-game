import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/globals.css";

const activeChain = "binance-testnet";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
