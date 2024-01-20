// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PickupBooking {
    address public owner;
    address emptyAddress = address(0x0000000000000000000000000000000000000000);
    AggregatorV3Interface internal dataFeed;

    constructor() {
        owner = msg.sender;
        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    mapping(address => Booking[]) public userToBookingAddress;
    mapping(address => uint256) public userAmount;
    mapping(address => uint256) public userToReward;
    Booking[] public bookings;

    struct Booking {
        uint256 uid;
        address initiator;
        string fromLat;
        string fromLong;
        string toLat;
        string toLong;
        address acceptor;
        uint256 price;
    }

    function getMyAmount() public view returns (uint256) {
        return userAmount[msg.sender];
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }

    function withdraw(uint256 amount) public payable {
        require(
            (amount * uint256(getChainlinkDataFeedLatestAnswer()) * (10 ** 8)) /
                113 <=
                userAmount[msg.sender],
            "balance not met"
        );
        // payable(address(msg.sender)).transfer(address(this).balance);
        payable(address(msg.sender)).transfer(amount);
    }

    function pay(uint256 amount, address to) public payable {
        require(
            msg.value >=
                (amount *
                    uint256(getChainlinkDataFeedLatestAnswer()) *
                    (10 ** 8)) /
                    113,
            "amount has not met"
        );
        userAmount[to] = userAmount[to] + (msg.value / 10);
        userToReward[msg.sender] = userToReward[msg.sender] + 10;
    }

    function myRewardPoint() public view returns (uint256) {
        return userToReward[msg.sender];
    }

    function createBooking(
        string memory fromLat,
        string memory fromLong,
        string memory toLat,
        string memory toLong
    ) public {
        Booking memory tempBooking = Booking(
            userToBookingAddress[msg.sender].length,
            address(msg.sender),
            fromLat,
            fromLong,
            toLat,
            toLong,
            emptyAddress,
            0
        );
        bookings.push(tempBooking);
        userToBookingAddress[msg.sender].push(tempBooking);
    }

    function acceptBooking(uint256 index, uint256 price) public {
        Booking memory booking = bookings[index];

        if (booking.acceptor != emptyAddress)
            revert("This booking is already accepted");

        bookings[index].acceptor = address(msg.sender);
        bookings[index].price = price;
        userToBookingAddress[msg.sender][booking.uid].acceptor = address(
            msg.sender
        );
        userToBookingAddress[msg.sender][booking.uid].price = price;
    }

    function getMyBookings() public view returns (Booking[] memory) {
        //for (uint256 i = 0; i < userToBookingAddress[msg.sender].length; i++) {}

        return userToBookingAddress[msg.sender];
    }

    function getAllBookings() public view returns (Booking[] memory) {
        //for (uint256 i = 0; i < userToBookingAddress[msg.sender].length; i++) {}
        return bookings;
    }

    function getMyWalletAddress() public view returns (address) {
        return address(msg.sender);
    }
}
