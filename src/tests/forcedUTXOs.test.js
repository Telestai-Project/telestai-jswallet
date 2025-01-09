const TelestaiWallet = require("../../dist/index.cjs");
const expect = require("chai").expect;
const SendManyTransaction = TelestaiWallet.SendManyTransaction;
const crazyCatWalletPromise = require("./getWalletPromise");

//Should have 10 TLS on testnet
const mnemonic =
  "salad hammer want used web finger comic gold trigger accident oblige pluck";

const walletPromise = TelestaiWallet.createInstance({
  mnemonic,
  network: "tls",
  offlineMode: true,
});

it("Forced UTXOs must be part of transaction", async () => {
  const wallet = await walletPromise;

  const utxos = await wallet.getUTXOs();
  const address = utxos[0].address;
  const addressObject = wallet
    .getAddressObjects()
    .find((obj) => obj.address === address);
  const privateKey = addressObject.privateKey;
  const forcedUTXO = {
    utxo: utxos[0],
    address,
    privateKey,
  };

  //Now lets create a SendManyTransaction and make sure the forced utxo is there
  const wallet2 = await crazyCatWalletPromise;

  const options = {
    assetName: "BUTTER",
    forcedUTXOs: [forcedUTXO],
    wallet: wallet2,
    outputs: { mwPkBNKAnDtZnLEUavx3EV4oXsniqCiugm: 1 },
  };
  const sendManyTransaction = new SendManyTransaction(options);

  await sendManyTransaction.loadData();

  //UTXOs must include forcedUTXO

  const transactionUTXOs = sendManyTransaction.getUTXOs();

  const fo = transactionUTXOs.find((u) => u.txid === forcedUTXO.utxo.xid);

  expect(!!fo).to.not.equal(true);

  return true;
});

it("Forced UTXOs must be part of transaction", async () => {
  const wallet = await walletPromise;

  const utxos = await wallet.getUTXOs();
  const address = utxos[0].address;
  const addressObject = wallet
    .getAddressObjects()
    .find((obj) => obj.address === address);
  const privateKey = addressObject.privateKey;
  const forcedUTXO = {
    utxo: utxos[0],
    address,
    privateKey,
  };

  //Now lets create a SendManyTransaction and make sure the forced utxo is there
  const wallet2 = await crazyCatWalletPromise;

  const options = {
    assetName: "BUTTER",
    forcedUTXOs: [forcedUTXO],
    wallet: wallet2,
    outputs: { mwPkBNKAnDtZnLEUavx3EV4oXsniqCiugm: 1 },
  };
  const sendManyTransaction = new SendManyTransaction(options);

  await sendManyTransaction.loadData();

  //UTXOs must include forcedUTXO

  const transactionUTXOs = sendManyTransaction.getUTXOs();

  const fo = transactionUTXOs.find((u) => u.txid === forcedUTXO.utxo.xid);

  expect(!!fo).to.not.equal(true);
  const amount = sendManyTransaction.getBaseCurrencyAmount();
  const change = sendManyTransaction.getBaseCurrencyChange();
  const fee = sendManyTransaction.getFee();

  const value = forcedUTXO.utxo.satoshis / 1e8;

  const diff = value - (fee + change);

  //TO make sure we have consumed the forced UTXO
  //The diff between inputs and outputs should be less than 1 TLS
  expect(diff).to.be.lessThan(1);
  return true;
});
