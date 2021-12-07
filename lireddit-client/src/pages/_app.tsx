import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";
import { login } from "../api/authApi";
import Navbar from "../components/Navbar";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const client = new QueryClient();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={client}>
        {router.pathname != "/auth" && <Navbar />}
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
