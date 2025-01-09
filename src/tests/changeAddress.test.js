const TelestaiWallet = require("../../dist/index.cjs");
const expect = require("chai").expect;
it("Change and to address cant be the same", async () => {
  const mnemonic = "bla bla bla";

  const wallet = await TelestaiWallet.createInstance({
    mnemonic,
    network: "tls",
    offlineMode: true,
  });

  let error = null;
  const changeAddress = await wallet.getChangeAddress();
  try {
    await wallet.send({
      toAddress: changeAddress,
      amount: 1,
    });
  } catch (e) {
    error = e;
  }
  const changeAddressAndToAddressTheSame =
    (error + "").indexOf("Change address cannot be the same as toAddress") > -1;

  expect(changeAddressAndToAddressTheSame).to.be.true;

  return true;
});
