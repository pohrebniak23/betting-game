pragma solidity ^0.8.0;

contract ContractGame {
    uint256 private seed;
    uint256 public gamesCount;
    uint256 public gameId;

    struct playersList {
        uint256 id;
        address payable player;
        uint256 amount;
    }

    mapping(uint256 => playersList) players;

    event GameResult(address winner, address looser, uint256 winAmount);
    event GameCreated(string status, string message, uint256 amount);

    function createGame() public payable {
        require(msg.value > 0, "Amount is not valid");

        playersList storage newGame = players[gamesCount];
        newGame.player = payable(msg.sender);
        newGame.amount = msg.value;
        newGame.id = gameId;

        gameId++;
        gamesCount++;
        emit GameCreated("Success", "Game successfull created", msg.value);
    }

    function deleteGame(uint256 id) public {
        playersList storage removeMe;

        for (uint256 i = 0; i < gamesCount; i++) {
            if (players[i].id == id) {
                removeMe = players[i]; // save it to a variable
                players[i] = players[gamesCount - 1]; // overwrite it with the last struct
                players[gamesCount - 1] = removeMe;
            }
        }
        delete players[gamesCount - 1];
        gamesCount--;
    }

    function getGameById(uint256 id)
        public
        view
        returns (address payable, uint256)
    {
        address payable addressValue;
        uint256 amountValue;

        for (uint256 i = 0; i < gameId; i++) {
            if (players[i].player != address(0) && players[i].id == id) {
                addressValue = players[i].player;
                amountValue = players[i].amount;
            }
        }

        require(addressValue != address(0), "Game is not found");

        return (addressValue, amountValue);
    }

    function getAllGames() public view returns (playersList[] memory) {
        playersList[] memory items = new playersList[](gamesCount);

        for (uint256 i = 0; i < gamesCount; i++) {
            playersList storage item = players[i];
            items[i] = item;
        }
        return items;
    }

    function random() public returns (uint256) {
        seed = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    msg.sender,
                    seed
                )
            )
        );
        return seed % 2;
    }

    function play(uint256 id) public payable {
        (address payable player1Address, uint256 amountValue) = getGameById(id);

        require(
            (player1Address != address(0) && msg.sender != address(0)),
            "Players not found"
        );
        require(player1Address != msg.sender, "You can`t play self game");

        address payable player2Address = payable(msg.sender);
        address payable winner;
        address payable looser;
        bool randResult = random() == 0;

        if (randResult) {
            winner = player1Address;
            looser = player2Address;
        } else {
            winner = player2Address;
            looser = player1Address;
        }

        uint256 winBalance = ((amountValue * 2) * 90) / 100;

        winner.transfer(winBalance);

        emit GameResult(winner, looser, winBalance);

        deleteGame(id);
    }
}
