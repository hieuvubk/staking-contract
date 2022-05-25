import { task } from 'hardhat/config';

task('contracts:verify', 'verify contract')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const StakeToken = await deployments.get('StakeToken');
    let address = taskArgs.address || StakeToken.address;

    // Verify token
    await hre.run('verify:verify', {
        address,
      constructorArguments: ["Stake Token", "STAKE", 18, '100000000000000000000000'],
    });


    const Distribution = await deployments.get('LiquidityProvidersRewardDistribution');
    address = taskArgs.address || Distribution.address;
    Verify distribution
    await hre.run('verify:verify', {
        address,
        constructorArguments: [deployer, StakeToken.address],
    });

    const Staking = await deployments.get('EasyStaking');
    address = taskArgs.address || Staking.address;
    // Verify staking contract
    await hre.run('verify:verify', {
        address,
        constructorArguments: [StakeToken.address, Distribution.address, '30000000000000000', '3600', '3600', '1000000000000000000', '75000000000000000', '0', '10000000000000'],
      });

  });