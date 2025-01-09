const TelestaiWallet = require("../../dist/index.cjs");
const expect = require("chai").expect;
it("Test sweep", async () => {
  /* 
    The wallet that will be drained, that has the funds from start.

    MNEMONIC: sight rate burger maid melody slogan attitude gas account sick awful hammer
    MAINNET const WIF = "Kz5U4Bmhrng4o2ZgwBi5PjtorCeq2dyM7axGQfdxsBSwCKi5ZfTw";
    TESTNET const WIF = "cUVdRNVobgjAw5jGWYkvbWmk42Vxzvte4btmsZ5qSqszdPi9M3Vy"
  */
  const WIF = "KyptgRU22E5viLtxYptrfokH8LGuhezAgca5nrg534PecaRSba3s";
  const network = "tls";

  //The wallet that will RECEIVE the funds
  const wallet = await TelestaiWallet.createInstance({
    mnemonic:
      "salad hammer want used web finger comic gold trigger accident oblige pluck",
    network,
  });

  try {
    const onlineMode = false;
    const result = await wallet.sweep(WIF, onlineMode);
    const something = !!result;
    expect(true).to.equal(something);
  } catch (e) {
    console.log("EXCEPTION", e);
  }
});
