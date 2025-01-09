const TelestaiWallet = require("../../dist/index.cjs");
const expect = require("chai").expect;
it("Test UTXOs for assets and base currency", async () => {
  const mnemonic =
    "salad hammer want used web finger comic gold trigger accident oblige pluck";

  const network = "tls";
  const wallet = await TelestaiWallet.createInstance({
    mnemonic,
    network,
  });

  const UTXOs = await wallet.getUTXOs();
  expect(UTXOs.length).to.be.at.least(1);

  const assetUTXOs = await wallet.getAssetUTXOs();
  expect(assetUTXOs.length).to.be.at.least(1);

  const assetDoesNotExistUTXOs = await wallet.getAssetUTXOs("SWAG");
  expect(assetDoesNotExistUTXOs.length).to.equal(0);
});
