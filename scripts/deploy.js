import { ethers } from "ethers";
import fs from "fs";

async function main() {
  console.log("Deploying contract...");
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

  const parsed = JSON.parse(fs.readFileSync("./artifacts/contracts/ProductTracking.sol/ProductTracking.json", "utf8"));
  
  const factory = new ethers.ContractFactory(parsed.abi, parsed.bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  
  const address = await contract.getAddress();
  console.log("CONTRACT_DEPLOYED_ADDRESS=" + address);
}

main().catch(console.error);
