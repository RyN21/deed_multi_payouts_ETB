const deedMultiPayouts = artifacts.require('DeedMultiPayouts');

contract('DeedMultiPayouts', (accounts) => {
  let deedMultiPayouts = null;
  before(async () => {
    deedMultiPayouts = await DeedMultiPayouts.deployed();
  });

  it('Should NOT withdraw if too early', async () => {
    const deedMultiPayouts = await DeedMultiPayouts.new(
      accounts[0],
      accounts[1],
      5,
      {value: 100}
    );
    try {
      await deedMultiPayouts.withdraw({from: accounts[1]});
    } catch(e) {
      assert(e.message.includes('Too early.'));
    }
    assert(false);
  });

  it('Should NOT withdraw if caller is not beneficiary', async () => {
    const deedMultiPayouts = await DeedMultiPayouts.new(
      accounts[0],
      accounts[1],
      5,
      {value: 100}
    );
    try {
      await deedMultiPayouts.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message.includes('Beneficiary only.'));
    }
    assert(false);
  });
})
