import { ChainType } from "./Types";


export function getBaseCurrencyByNetwork(network: ChainType): string {
  const map = {
    // evr: "EVR",
    // "evr-test": "EVR",
    tls: "TLS",
    "tls-test": "TLS",
  };
  return map[network];
}
