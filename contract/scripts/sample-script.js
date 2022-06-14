// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ContractFactory = await hre.ethers.getContractFactory("ERC20Factory");
  const ERC20ContractFactory = await ContractFactory.deploy();
  await ERC20ContractFactory.deployed();
  const createToken = await ERC20ContractFactory.createToken(
    "Batman",
    "BAT",
    "18",
    "50000"
  );
  const TokenAddress = await createToken.wait();
  const addressToken = TokenAddress.events[1].args[2];
  const getTokenContract = await hre.ethers.getContractAt(
    "ERC20Token",
    addressToken
  );
  const balance = await getTokenContract.balanceOf(
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
  );
  console.log(balance.toString());
  const getAllTokens = await ERC20ContractFactory.getAll();
  console.log("getAllToken", getAllTokens);
  const TransferToken = await ERC20ContractFactory.transferTokens(
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "100",
    TokenAddress.events[1].args[2]
  );
  const tokenTransferEvent = await TransferToken.wait();
  console.log(tokenTransferEvent.events[1].args);
  console.log("Greeter deployed to:", ERC20ContractFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
