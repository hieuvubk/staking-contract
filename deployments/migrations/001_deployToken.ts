import { DeployFunction } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts } = hre;

  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log(deployer)

  await deploy('StakeToken', {
    from: deployer,
    args: ["Stake Token", "STAKE", 18, '1000000000000000000000'], // initial 1000 STAKE
    log: true,
  });
};

func.tags = ['StakeToken'];
export default func;
