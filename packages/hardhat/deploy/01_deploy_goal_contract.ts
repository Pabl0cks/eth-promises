import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "GoalContract" using the deployer account
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployGoalContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("GoalContract", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  // Get the deployed contract
  // const goalContract = await hre.ethers.getContract("GoalContract", deployer);
};

export default deployGoalContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags GoalContract
deployGoalContract.tags = ["GoalContract"];
