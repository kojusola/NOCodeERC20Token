//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract ERC20Token is IERC20Metadata {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    mapping(address => uint) private _balances;
    uint256 private _totalSupply;
    mapping(address => mapping(address => uint)) private _allowances;

    constructor(string memory name_, string memory symbol_, uint8 decimals_, uint256 totalSupply_){
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _totalSupply = totalSupply_ *10 ** decimals_;
        _balances[tx.origin] =_totalSupply;
        // console.log(msg.sender);
        // console.log(tx.origin);
        emit Transfer(address(0), tx.origin, _totalSupply);
    }

function name() external override view returns(string memory){
    return _name;
}
function symbol() external override view returns(string memory){
    return _symbol;
}
function decimals() external override view returns(uint8){
    return _decimals;
}

 function balanceOf(address account) external override view returns (uint256){
     return _balances[account];
 }

 function totalSupply() external override view returns (uint256){
     return _totalSupply;
 }
 function _transfer(address _from, address _to, uint256 _amount) internal {
      uint256 userBalance = _balances[_from];
     require(userBalance >= _amount, "insufficient balance");
     _balances[_from] -= _amount;
     _balances[_to] += _amount;

 }

 function transfer(address _to, uint256 _amount) external override returns (bool){
     _transfer(msg.sender, _to, _amount);
     emit Transfer(msg.sender, _to, _amount);
      return true;
 }

 function approve(address _spender, uint256 _amount) external override returns (bool){
     _allowances[tx.origin][_spender] = _amount; 
     emit Approval(tx.origin, _spender, _amount);
     return true;
 }

  function allowance(address _owner, address _spender) public override view returns (uint256){
      return _allowances[_owner][_spender];
  }

   function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) external override returns (bool){
        uint _allowance = allowance(_from,_to);
        console.log(_allowance);
        require(_allowance >= _amount, "Insufficient allowance");
        _transfer(_from, _to, _amount);
        return true;
    }
}
