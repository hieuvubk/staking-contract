import { DeployFunction } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts } = hre;

  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const StakeToken = await deployments.get('StakeToken');
  const Distribution = await deployments.get('LiquidityProvidersRewardDistribution');

  await deploy('EasyStaking', {
    from: deployer,
    args: [StakeToken.address, Distribution.address, '30000000000000000', '3600', '3600', '1000000000000000000', '75000000000000000', '0', '10000000000000'], // initial 1000 STAKE
    log: true,
  });
};

func.tags = ['EasyStaking'];
export default func;
