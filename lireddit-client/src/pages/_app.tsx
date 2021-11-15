import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools";
function MyApp({ Component, pageProps }: AppProps) {

  const client = new QueryClient()
  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
