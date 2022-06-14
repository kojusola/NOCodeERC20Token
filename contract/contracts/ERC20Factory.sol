// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20.sol";

contract ERC20Factory {

    struct TokenDetails {
    string name;
    string symbol;
    address tokenAddress;
    }
    mapping(address => TokenDetails[]) private addressToTokens;

    event TokenCreated(string _name, string _symbol, address _tokenAddress);
    event TokenTransfer( address from_, address to_, uint256 amount_);

    function createToken(string memory name_, string memory symbol_, uint8 decimals_, uint256 totalSupply_) external returns (bool) {
        ERC20Token erc20 = new ERC20Token(name_, symbol_, decimals_, totalSupply_);
        address _tokenAddress = address(erc20);
        TokenDetails[] storage allTokens = addressToTokens[msg.sender];
        allTokens.push(TokenDetails(name_, symbol_, _tokenAddress));
        addressToTokens[msg.sender] = allTokens;
        emit TokenCreated(name_, symbol_,_tokenAddress);
        return true;
    }

    function getAll() public view returns(TokenDetails[] memory)
    {
        TokenDetails[] memory tokens = addressToTokens[msg.sender];
        return tokens;
    }

      function transferTokens( address to_, uint256 amount_, address tokenAddress_ ) external returns(bool)
    {
        ERC20Token erc20 = ERC20Token(tokenAddress_);
        // console.log(erc20.balanceOf(msg.sender));
        erc20.approve(to_, amount_);
        // console.log(erc20.approve(to_, amount_));
        erc20.transferFrom( msg.sender, to_,  amount_);
        emit TokenTransfer( msg.sender,  to_, amount_);
        return true;
    }
}