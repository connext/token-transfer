import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";
import { task } from "hardhat/config";

require('dotenv').config();

task("transfer", "Transfer tokens")
  .addParam("to", "Recipient address")
  .addParam("token", "The token's address")
  .addParam("amount", "Transfer amount")
  .setAction(async ({ token, amount, to }, hre) => {
    const [signer] = await (hre as any).ethers.getSigners();
    const tokenContract = await (hre as any).ethers.getContractAt(
      "ERC20",
      token,
      signer
    );
    const balance = await tokenContract.balanceOf(signer.address);
    console.log(
      `Balance for ${signer.address}: ${balance.toString()} on token ${token}`
    );
    const tx = await tokenContract.transfer(to, amount);
    console.log("tx: ", tx);
  });

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  networks: {
    hardhat: {},
    bsc: {
      accounts: {
        mnemonic:
          process.env.MNEMONIC ||
          "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
      },
      url: "https://bsc-dataseed.binance.org/",
    },
  },
};

export default config;
