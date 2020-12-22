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
      await deedMultiPayouts.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message.includes('too early'));
    }
    assert(false);
  });
})
