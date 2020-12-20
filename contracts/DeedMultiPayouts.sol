pragma solidity ^0.5.0;

contract Deed {

  address public lawyer;
  address payable public beneficiary;
  uint public earliest;
  uint public amount;
  uint constant public PAYOUTS = 10;
  // 'constant' allows us to save a bit of gas by storing the variable in the code instead of in the storage of the blockchain
  // downside of this is we cannot change this variable after deployed. But its, it should not change
  // constant will use uppercase

  constructor(
    address _lawyer,
    address payable _beneficiary,
    uint fromNow)
    payable
    public {
      lawyer = _lawyer;
      beneficiary = _beneficiary;
      earliest = now + fromNow;
    }

  function withdraw() public {
    require(msg.sender == lawyer, 'Lawyer only.');
    require(now >= earliest, 'Too early.');
    beneficiary.transfer(address(this).balance);
  }
}
