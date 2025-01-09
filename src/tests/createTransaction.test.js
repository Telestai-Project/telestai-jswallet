const TelestaiWallet = require("../../dist/index.cjs");
const expect = require("chai").expect;
//Should have 10 TLS on testnet
const mnemonic =
  "salad hammer want used web finger comic gold trigger accident oblige pluck";

const walletPromise = TelestaiWallet.createInstance({
  mnemonic,
  network: "tls",
  offlineMode: true,
});

it("Transaction should have TLS fee", async () => {
  const options = {
    toAddress: "TnJioWxABvGQRHk8GbhaK8KrMTYsKxauT6",
    amount: 1,
  };
  const wallet = await walletPromise;
  const sendResult = await wallet.createTransaction(options);
  expect(sendResult.debug.fee).to.be.greaterThan(0);
  return true;
});
