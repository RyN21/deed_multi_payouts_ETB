const deedMultiPayouts = artifacts.require('DeedMultiPayouts');

contract('DeedMultiPayouts', (accounts) => {
  let deedMultiPayouts = null;
  before(async () => {
    deedMultiPayouts = await DeedMultiPayouts.deployed();
  });
})
