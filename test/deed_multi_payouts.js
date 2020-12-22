const DeedMultiPayouts = artifacts.require('DeedMultiPayouts');

contract('DeedMultiPayouts', (accounts) => {
  let deedMultiPayouts = null;
  before(async () => {
    deedMultiPayouts = await DeedMultiPayouts.deployed();
  });

  it('Should withdraw for all payouts (1)', async () => {
    for(let i = 0; i < 4; i++) {
      const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      await new Promise(resolve => setTimeout(resolve, 1000));
      deedMultiPayouts.withdraw({from: accounts[1]});
      const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      assert(balanceAfter.sub(balanceBefore).toNumber() === 25);
    }
  });

  it('Should withdraw for all payouts (2)', async () => {
    const deedMultiPayouts = await DeedMultiPayouts.new(
      accounts[0],
      accounts[1],
      1,
      {value: 100}
    );

    for(let i = 0; i < 2; i++) {
      const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      await new Promise(resolve => setTimeout(resolve, 2000));
      deedMultiPayouts.withdraw({from: accounts[1]});
      const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      assert(balanceAfter.sub(balanceBefore).toNumber() === 50);
    }
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
    } catch (e) {
      assert(e.message.includes('Too early.'));
      return;
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
    } catch (e) {
      assert(e.message.includes('Beneficiary only.'));
      return;
    }
    assert(false);
  });
})
