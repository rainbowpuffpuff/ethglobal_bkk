"use client";

import { useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import { useAccount } from "wagmi"; // Commented out as it's unused
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

export const queryClient = new QueryClient();

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // const [connectedNetwork, setConnectedNetwork] = useState<string | null | undefined>(null); // Removed as unused
  const { primaryWallet } = useDynamicContext();

  console.log("primaryWallet", primaryWallet);

  useEffect(() => {
    // primaryWallet?.connector.getNetwork().then(network => {
    //   setConnectedNetwork(network as string);
    // }); // Commented out as it's unused
  }, [primaryWallet]);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  //You have to reload  the page on network change

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  // const [connectedNetwork, setConnectedNetwork] = useState<string | null>(null); // Removed as unused

  useEffect(() => {
    setMounted(true);
  }, []);

  const network = "linea-sepolia";
  const subgraphuris = {
    "optimism-sepolia": "https://api.studio.thegraph.com/query/77139/think2earn/version/latest",
    matic: "https://api.studio.thegraph.com/query/77139/thinkplusearn/version/latest",
    "linea-sepolia": "https://api.studio.thegraph.com/query/77139/thinkandearn/version/latest",
  };
  const apolloClient = new ApolloClient({
    uri: subgraphuris[network],
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <DynamicContextProvider
        settings={{
          environmentId: "2e83ce92-44b3-48cc-9897-0c35199b1e29",
          walletConnectors: [EthereumWalletConnectors],
          eventsCallbacks: {
            onWalletRemoved: args => {
              console.log("onWalletRemoved was called", args);
            },
          },
        }}
      >
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ProgressBar />
            <RainbowKitProvider
              avatar={BlockieAvatar}
              theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
            >
              <ScaffoldEthApp>{children}</ScaffoldEthApp>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </ApolloProvider>
  );
};
