pragma solidity ^0.4.4;

contract gamex {
    // owner of the contract
    address private owner;
    
    struct sale_credit {
        uint credit_unique_id;
        uint credit_amount;
        uint credit_price;
        bytes32 game;
        address seller;
    }
    
    // total items on sale
    uint public tot_items;
    // all the credits which are on sale
    sale_credit[] credits_on_sale;
    
    //total users
    uint public tot_users;
    
    // total listAllSales
    function totSales() public returns(uint) {
        return credits_on_sale.length;
    }
    
    // different type of credits in a game
    struct credit_map {
        // uint(first) is the unique_number of game credit
        // uint (second) is the amount of credits the player have
        // credits is all credits available in a game
        mapping(uint => uint) credits;
        
        // if game credit exists
        mapping(uint => bool) game_credit_exists;
        
        // all the unique credit numbers which are available in the players account
        uint[] all_credit_numbers;
    }
    struct games {
        bool is_registered;
        // total item on sale by player
        uint tot_items_on_sale;
        // array of all hashed value of game names
        bytes32[] all_current_games;
        
        
        
        // whether a game_dev is owner of a game or not
        // mapping of game's name (unique) to the corresponding escrow money
        mapping(bytes32 => uint) game_owner;
        // mapping of game's name to credit_map
        mapping(bytes32 => credit_map) games_credits;
        // if game exists
        mapping(bytes32 => bool) game_exists;
        
        
    }
    // all the game devs and their security money inside the contract
    mapping(address => games) private users;
    
    // Constructor
    function gamex() public {
        owner = msg.sender;
    }
    
    // to check if the sender is the owner of the contract
    modifier isContractOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function hashKey(bytes key) pure private returns (bytes32) {
        return (keccak256(key));
    }
    
    // to check if the sender is the Game Owner
    modifier isGameOwner(bytes game_name) {
        require(users[msg.sender].game_owner[hashKey(game_name)] != 0);
        _;
    }
    
    // if user is not Registered
    modifier notRegisteredUser() {
        require(users[msg.sender].is_registered == false);
        _;
    }
    
    // if user is Registered
    modifier registeredUser(address sender) {
        require(users[sender].is_registered);
        _;
    }
    
    // Registration for New User
    function newUser() notRegisteredUser public returns (bool) {
        games storage abc;
        abc.is_registered = true;
        abc.tot_items_on_sale = 0;
        //abc.all_current_games.push(keccak256("0"));
        // users[msg.sender].all_current_games.length = 0;
        
        users[msg.sender] = abc;
        delete users[msg.sender].all_current_games;
        tot_users++;
        tot_items = credits_on_sale.length;
        //users[msg.sender].is_registered = true;
        return true;
    }
    
    // Add a game and send escrow money for that game in the contract
    function addGame(bytes game_name) registeredUser(msg.sender) public payable returns (bytes32) {
        require(msg.value == 10 ether);
        users[msg.sender].game_owner[hashKey(game_name)] = msg.value;
        return hashKey(game_name);
    }
    
    // Game Owner sends player's address, Game's Name, Credit's Unique Name, Amount of Credit to be added to the Player's Account whenever the Players earns some type of credit in the game.
    // This function adds credit to players' accounts
    function addGameCredit(address player, bytes game_name , uint game_credit_unique_number ,uint amount) isGameOwner(game_name) registeredUser(player) public returns(bool) {
        users[player].games_credits[hashKey(game_name)].credits[game_credit_unique_number] += amount;
        if(users[player].game_exists[hashKey(game_name)] != true) {
            users[player].all_current_games.push(hashKey(game_name));
            users[player].game_exists[hashKey(game_name)] = true;
        }
        if(users[player].games_credits[hashKey(game_name)].game_credit_exists[game_credit_unique_number] != true) {
            users[player].games_credits[hashKey(game_name)].all_credit_numbers.push(game_credit_unique_number);
            users[player].games_credits[hashKey(game_name)].game_credit_exists[game_credit_unique_number] = true;
        }
        
        return true;
    }
    
    // get all the games available for a particular Account
    // returns a bytes32 type array of hashed values of games' names
    function getAllGames(address player) public view returns(bytes32[]){
        return users[player].all_current_games;
    }
    
    function getGameLen() public view returns(uint){
        return users[msg.sender].all_current_games.length;
    }
    
    // get all the credits of a particular game
    // returns 2 arrays. 1- Unique number of every credit, 2- corresponding credit amount
    function getAllCreditsOfAGame(address player, bytes game_name) public constant returns(uint[], uint[]){
        uint tot_credits = users[player].games_credits[hashKey(game_name)].all_credit_numbers.length;
        uint[] memory credit_numbers = new uint[](tot_credits);
        credit_numbers = users[player].games_credits[hashKey(game_name)].all_credit_numbers;
        uint[] memory credit_amounts = new uint[](tot_credits);
        for(uint i=0; i< tot_credits; i++) {
            credit_amounts[i] = users[player].games_credits[hashKey(game_name)].credits[credit_numbers[i]];
        }
        return(credit_numbers,credit_amounts);
    }
    
    // check whether certain game credit is above the specified amount
    modifier checkCreditAmount(address player, bytes game_name, uint game_credit_unique_number, uint sell_amount) {
       require(users[player].games_credits[hashKey(game_name)].credits[game_credit_unique_number] >= sell_amount);
       _; 
    }
    
    // put up some credit on sale
    function sellCredit(bytes game_name, uint game_credit_unique_number, uint sell_amount, uint total_price) registeredUser(msg.sender) checkCreditAmount(msg.sender, game_name, game_credit_unique_number, sell_amount) public returns(bool) {
        credits_on_sale.push(sale_credit(game_credit_unique_number, sell_amount, total_price, hashKey(game_name), msg.sender));
        users[msg.sender].games_credits[hashKey(game_name)].credits[game_credit_unique_number] -= sell_amount;
        tot_items++;
        users[msg.sender].tot_items_on_sale++;
        return true;
    }
    
    modifier isSeller(address sender, uint index) {
        require(credits_on_sale[index].seller == sender);
        _;
    }
    
    // cancel the credit sale
    function cancelCreditSale(uint index) registeredUser(msg.sender) isSeller(msg.sender, index) public returns(bool){
        uint size = tot_items;
        bytes32 game_name32 = credits_on_sale[index].game;
        uint game_credit_unique_number = credits_on_sale[index].credit_unique_id;
        uint sell_amount = credits_on_sale[index].credit_amount;
        credits_on_sale[index] = credits_on_sale[size-1];
        delete credits_on_sale[size-1];
        users[msg.sender].games_credits[game_name32].credits[game_credit_unique_number] += sell_amount;
        tot_items--;
        credits_on_sale.length = tot_items;
        users[msg.sender].tot_items_on_sale--;
        return true;
    }
    
    // seller can see all the credits he/she wants to sell
    function getMySales() public view registeredUser(msg.sender) returns(uint[], uint[], uint[], bytes32[]){
        uint[] memory cui;
        uint[] memory ca;
        uint[] memory cp;
        bytes32[] memory g;
        uint size = users[msg.sender].tot_items_on_sale;
        cui = new uint[](size);
        ca = new uint[](size);
        cp = new uint[](size);
        g = new bytes32[](size);
        for(uint i=0; i<size; i++) {
            if(credits_on_sale[i].seller == msg.sender) {
                cui[i] = credits_on_sale[i].credit_unique_id;
                ca[i] = credits_on_sale[i].credit_amount;
                cp[i] = credits_on_sale[i].credit_price;
                g[i] = credits_on_sale[i].game;   
            }
        }
        return (cui,ca,cp,g);
    }
    
    // list total sales which are available on the GameX market
    function listAllSales() public view registeredUser(msg.sender) returns(uint[], uint[], uint[], bytes32[]) {
        uint[] memory cui;
        uint[] memory ca;
        uint[] memory cp;
        bytes32[] memory g;
        uint size = tot_items-users[msg.sender].tot_items_on_sale;
        cui = new uint[](size);
        ca = new uint[](size);
        cp = new uint[](size);
        g = new bytes32[](size);
        for(uint i=0; i<size; i++) {
            if(credits_on_sale[i].seller != msg.sender) {
                cui[i] = credits_on_sale[i].credit_unique_id;
                ca[i] = credits_on_sale[i].credit_amount;
                cp[i] = credits_on_sale[i].credit_price;
                g[i] = credits_on_sale[i].game;   
            }
        }
        return (cui,ca,cp,g);
    }
    
    // buy credits that are on sale
    function buyCredits(uint index) public payable registeredUser(msg.sender) returns(bool) {
        require(index < tot_items && index >= 0);
        require(msg.value == credits_on_sale[index].credit_price);
        
        // store buyer's, seller's and credit's info
        address seller = credits_on_sale[index].seller;
        address buyer = msg.sender;
        require(seller != buyer);
        bytes32 game_name = credits_on_sale[index].game;
        uint game_credit_unique_number = credits_on_sale[index].credit_unique_id;
        uint amount = credits_on_sale[index].credit_amount;
        
        // transfer money to seller
        seller.transfer(msg.value);
        
        // update credits_on_sale and total items on sale
        users[seller].tot_items_on_sale--;
        credits_on_sale[index] = credits_on_sale[tot_items-1];
        delete credits_on_sale[tot_items-1];
        tot_items--;
        credits_on_sale.length = tot_items;
        
        // add credits to the buyer's account
        users[buyer].games_credits[game_name].credits[game_credit_unique_number] += amount;
        if(users[buyer].game_exists[game_name] != true) {
            users[buyer].all_current_games.push(game_name);
            users[buyer].game_exists[game_name] = true;
        }
        if(users[buyer].games_credits[game_name].game_credit_exists[game_credit_unique_number] != true) {
            users[buyer].games_credits[game_name].all_credit_numbers.push(game_credit_unique_number);
            users[buyer].games_credits[game_name].game_credit_exists[game_credit_unique_number] = true;
        }
        
        return true;
    }
    
    
    
    
}