pragma solidity ^0.5.0;

contract Deed {

  address public lawyer;
  address payable public beneficiary;
  uint public earliest;
  uint public amount;
  uint constant public PAYOUTS = 10;
  uint constant public INTERVAL = 10;
  // 'constant' allows us to save a bit of gas by storing the variable in the code instead of in the storage of the blockchain
  // downside of this is we cannot change this variable after deployed. But its, it should not change
  // constant will use uppercase
  uint public paidPayouts;

  constructor(
    address _lawyer,
    address payable _beneficiary,
    uint fromNow)
    payable
    public {
      lawyer = _lawyer;
      beneficiary = _beneficiary;
      earliest = now + fromNow;
      amount = msg.value / PAYOUTS;
    }

  function withdraw() public {
    require(msg.sender == beneficiary, 'Beneficiary only.');
    require(now >= earliest, 'Too early.');
    require(paidPayouts < PAYOUTS);

    uint elligiblePayouts = (now - earliest) / INTERVAL;
    uint duePayouts = elligiblePayouts - paidPayouts;
    beneficiary.transfer(duePayouts * amount);
  }
}
