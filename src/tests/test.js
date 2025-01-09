const TelestaiWallet = require("../../dist/index.cjs");
const walletPromise = require("./getWalletPromise");
const expect = require("chai").expect;
//This mnemonic should be empty and super fast
const mnemonic =
  "caught actress master salt kingdom february spot brief barrel apart rely common";

it("Network tls should give base currency TLS", async () => {
  const network = "tls";
  const wallet = await TelestaiWallet.createInstance({
    mnemonic,
    network,
    offlineMode: true,
  });
  const baseCurrency = wallet.baseCurrency;
  expect(baseCurrency).to.equal("TLS");
});

// it("Network tls-test should give base currency TLS", async () => {
//   const network = "tls-test";
//   const wallet = await TelestaiWallet.createInstance({
//     mnemonic,
//     network,
//     offlineMode: true,
//   });

//   const baseCurrency = wallet.baseCurrency;
//   expect(baseCurrency).to.equal("TLS");
// });

it("get balance", async () => {
  const wallet = await walletPromise;

  const balance = await wallet.getBalance();

  expect(isNaN(balance)).to.equal(false);
});

it("Test getHistory", async () => {
  let error = null;
  const wallet = await walletPromise;

  const result = await wallet.getHistory();

  expect(result.length > 0).to.equal(true);
});

it("Min amount of addresses", async function () {
  this.timeout(30 * 1000); //30 seconds, generating tons of addresses
  const mnemonic = "bla bla bla";
  const minAmountOfAddresses = 1000;
  wallet = await TelestaiWallet.createInstance({
    mnemonic,
    network: "tls",
    minAmountOfAddresses,
    offlineMode: true,
  });

  expect(wallet.getAddresses().length).to.be.at.least(minAmountOfAddresses);
});
