const TelestaiWallet = require("../../dist/index.cjs");

const mnemonic =
  "salad hammer want used web finger comic gold trigger accident oblige pluck";

const walletPromise = TelestaiWallet.createInstance({
  mnemonic,
  network: "tls",
});

module.exports = walletPromise;
