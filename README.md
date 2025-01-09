# ravencoin-jswallet

Telestai wallet library for JavaScript.
Non-custodial.
By default it interacts with the Telestai blockchain using public RPC services from
https://rpc.ting.finance/ for both testnet and mainnet.
You are free to use any RPC-service you like, including your own.
See section [Run your own blockchain node](#run-your-own-blockchain-node) for more info

##

EXPERIMENTAL.

This lib could use a lot of testing before being used for production purposes. All test cases have passed for the Telestai chain.

### 
## Example code

To run these code examples

1. Create an empty npm project
2. Install `@telestai-project/telestai-jswallet`
3. Create a .mjs file called `index.mjs`

### Minimalistic example

```
import TelestaiWallet from "@telestai-project/telestai-jswallet";

TelestaiWallet.createInstance({
   mnemonic: "horse sort develop lab chest talk gift damp session sun festival squirrel",
   network: "tls"
})
   .then(wallet => wallet.getBalance())
   .then(console.log);
```
### Some stuff you can do
```
import TelestaiWallet from "@telestai-project/telestai-jswallet";
const wallet = await TelestaiWallet.createInstance({
  mnemonic:
    "horse sort develop lab chest talk gift damp session sun festival squirrel",
  network: "tls",
});

//OK now you have your wallet

//Example, get your addresses
const addresses = wallet.getAddresses();

//Address objects contains meta data about addresses, such as path/private key
const addressObjects = wallet.getAddressObjects();
 
//Get assets the wallet holds (not including mempool transactions) 
const assets = await wallet.getAssets();

//Get balance of base currency, like TLS, not including mempool transactions
const balance = await wallet.getBalance();


const changeAddress = await wallet.getChangeAddress();
const receiveAddress = await wallet.getReceiveAddress();

const firstPrivateKey = wallet.getPrivateKeyByAddress(addresses[0]);

//History, is the list of deltas for all the addresses in this wallet
const history = await wallet.getHistory();

//Get this wallets entries in the mempool right now
const mempool = await wallet.getMempool();
 
//Example send and print out the id, will throw exception if fails
const sendResult = await wallet.send({
  toAddress: "TrNsYVQGCPM3vFgE7KcvPzS6ZsKmUmspx2",
  amount: 1,
});
console.log(sendResult.transactionId);
```
### Configure to use with your local node

In this example we run a local node in testnet mode, and RPC port is set to 8888

```
const wallet = await TelestaiWallet.createInstance({
    mnemonic,
    network: "tls",
    rpc_password: "mypassword",
    rpc_username: "myuser",
    rpc_url: "http://localhost:8888",
  });
```

### Send TLS and ASSETS

```
//index.mjs very important that file extension is .mjs
import TelestaiWallet from "@telestai-project/telestai-jswallet";

//This wallet belongs to account "Crazy Cat" on https://testnet.ting.finance/signin/
const options = {
  mnemonic:
    "mesh beef tuition ensure apart picture rabbit tomato ancient someone alter embrace",
  network: "tls-test",
};
const wallet = await TelestaiWallet.createInstance(options);
const addy = await wallet.getReceiveAddress();
console.log("My receive address", addy);

//Send 100 TLS to Barry Crump on https://testnet.ting.finance/
await wallet.send({
  //Send 100 TLS
  toAddress: "mhBKhj5FxzBu1h8U6pSB16pwmjP7xo4ehG",
  amount: 100,
  assetName:"TLS",
});

//Send 313 BUTTER tokens to Barry Crump on https://testnet.ting.finance/
const transactionId = await wallet.send({
  assetName: "BUTTER",
  amount: 313,
  toAddress: "mhBKhj5FxzBu1h8U6pSB16pwmjP7xo4ehG",
});
console.log("Sending", transactionId);
```

### Send many

```
//index.mjs very important that file extension is .mjs
import TelestaiWallet from "@telestai-project/telestai-jswallet";

//This wallet belongs to account "Crazy Cat" on https://testnet.ting.finance/signin/
const options = {
  mnemonic:
    "mesh beef tuition ensure apart picture rabbit tomato ancient someone alter embrace",
  network: "tls-test",
};
const wallet = await TelestaiWallet.createInstance(options);

//Send asset BUTTER to multiple recipients
const result = await wallet.sendMany({
  assetName: "BUTTER",
  outputs: {
    muTv54qzXc6ozEc1RH2JbM92jzpBtVJBbw: 1,
    mhWahrbRX6xBBrRjCo6ZkazaugXftD1CbM: 2,
  },
});

console.log("Sending", result.transactionId);

```

## API

When you create your instance of a wallet you can specify some stuff.

You can set network to be something else than TLS, for example EVR.

You can specify your own RPC node URL and username/password.

```
export interface IOptions {
    mnemonic: string;
    network?: ChainType; (that is "tls" | "tls-test" | "evr" | "evr-test")
    rpc_username?: string;
    rpc_password?: string;
    rpc_url?: string;
}
```

[Check the TypeScript definitions ](./dist/types.d.ts) for all the details

### Run your own blockchain node

If you want to run your own internet exposed Node, checkout our RPC proxy.
With **RPC proxy** and **Cloudlare** you can get a secure endpoint like
https://rpc.mydomain.com/rpc
checkout

- https://github.com/telestai-project/telestai-rpc-proxy
- https://www.cloudflare.com/products/tunnel/

## Advanced - pure RPC

You have access to the underlaying RPC function, wallet.rpc.
See example

```
import TelestaiWallet from "@telestai-project/telestai-jswallet";
async function main(){
  const wallet = await TelestaiWallet.createInstance({
    mnemonic: "horse sort develop lab chest talk gift damp session sun festival squirrel",
    network: "tls-test",
  });
  const blockhash = await wallet.rpc("getbestblockhash", []);
  const block = await wallet.rpc("getblock", [blockhash]);
  console.log(block);
}
main();
```
