// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}



contract EventBooker{
    
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address internal adminAddress ;

    constructor(){
        adminAddress = msg.sender;
    }
    
    struct Pass{
        address payable owner;
        string eventName;
        string imageURL;
        string table;
        uint amount;
    }

    uint passLength = 0;
    mapping(uint => Pass) passes;

    modifier isAdmin(){
        require(msg.sender == adminAddress,"Only the admin can access this");
        _;
    }

    function addPass(
        string memory _eventName,
        string memory _table,
        string memory _imageURL
    )public isAdmin(){
        Pass storage _passes = passes[passLength];
        _passes.owner = payable(msg.sender);
        _passes.eventName = _eventName;
        _passes.table = _table;
        _passes.imageURL = _imageURL;

        if(keccak256(abi.encodePacked((_table))) == keccak256(abi.encodePacked(("VVIP")))){
            _passes.amount = 3000000000000000000;
        }else if(keccak256(abi.encodePacked((_table))) == keccak256(abi.encodePacked(("VIP")))){
            _passes.amount = 2000000000000000000;
        }else if(keccak256(abi.encodePacked((_table))) == keccak256(abi.encodePacked(("STANDARD")))){
            _passes.amount = 1000000000000000000;
        }else{
            _passes.amount = 0;
        }
            
        passLength++;            
    }

    function getPass(uint _index)public view returns(
        address payable,
        string memory,
        string memory,
        uint,
        string memory
    ){
        Pass storage _passes = passes[_index];
        return(
            _passes.owner,
            _passes.eventName,
            _passes.table,
            _passes.amount,
            _passes.imageURL
        );
    }

    function buyPass(uint _index) public {
        Pass storage _passes = passes[_index];
        require(_passes.owner != address(0), "Please enter a valid ID");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                    msg.sender,
                    adminAddress,
                    passes[_index].amount
            ),
            "Transaction could not be performed"
        );
    }

    function isUserAdmin(address _address) public view returns (bool){
        if(_address == adminAddress){
            return true;
        }
        return false;   
    }

    function getPassLength() public view returns (uint) {
        return (passLength);
    }
}
   