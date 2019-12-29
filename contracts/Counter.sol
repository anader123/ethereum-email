pragma solidity ^0.5.0;

contract Counter {
    uint public count;

    event Increased(address indexed incrementor, uint indexed currentCount);

    function increase() public {
        count = count + 1;
        emit Increased(msg.sender, count);
    }
}
