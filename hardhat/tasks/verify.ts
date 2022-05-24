import { task } from 'hardhat/config';

task('token:verify', 'verify contract')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const StakeToken = await deployments.get('StakeToken');
    const Staking = await deployments.get('EasyStaking');
    const address = taskArgs.address || StakeToken.address;

    // Verify token
    await hre.run('verify:verify', {
        address,
      constructorArguments: ["Stake Token", "STAKE", 18, '1000000000000000000000'],
    });

  });

  task('distribution:verify', 'verify contract')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const StakeToken = await deployments.get('StakeToken');
    const Distribution = await deployments.get('LiquidityProvidersRewardDistribution');

    const address = taskArgs.address || Distribution.address;

    // Verify distribution
    await hre.run('verify:verify', {
        address,
        constructorArguments: [deployer, StakeToken.address],
      });
  });

  task('staking:verify', 'verify contract')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const StakeToken = await deployments.get('StakeToken');
    const Distribution = await deployments.get('LiquidityProvidersRewardDistribution');
    const Staking = await deployments.get('EasyStaking');

    const address = taskArgs.address || Staking.address;

    // Verify staking contract
    await hre.run('verify:verify', {
        address,
        constructorArguments: [StakeToken.address, Distribution.address, '30000000000000000', '3600', '3600', '1000000000000000000', '75000000000000000', '0', '10000000000000'],
      });
  });