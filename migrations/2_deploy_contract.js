const counter = artifacts.require("Counter");

module.exports = async function(deployer) {
  await deployer.deploy(counter);
};