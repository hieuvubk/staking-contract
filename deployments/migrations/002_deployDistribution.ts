import { DeployFunction } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts } = hre;

  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const StakeToken = await deployments.get('StakeToken');

  await deploy('LiquidityProvidersRewardDistribution', {
    from: deployer,
    args: [deployer, StakeToken.address], // initial 1000 STAKE
    log: true,
  });
};

func.tags = ['LiquidityProvidersRewardDistribution'];
export default func;
