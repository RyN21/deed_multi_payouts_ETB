const DeedMultiPayouts = artifacts.require("Deed");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(DeedMultiPayouts, accounts[0], accounts[1], 5, {value: 100});
};
