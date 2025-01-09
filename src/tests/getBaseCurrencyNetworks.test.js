const TelestaiWallet = require("../../dist/index.cjs");
const expect = require("chai").expect;
const getBaseCurrencyByNetwork =
  TelestaiWallet.default.getBaseCurrencyByNetwork;
it("getBaseCurrencyByNetwork", async () => {
  //expect(getBaseCurrencyByNetwork("evr")).to.equal("EVR");
  //expect(getBaseCurrencyByNetwork("evr-test")).to.equal("EVR");

  expect(getBaseCurrencyByNetwork("tls")).to.equal("TLS");
  expect(getBaseCurrencyByNetwork("tls-test")).to.equal("TLS");
});
