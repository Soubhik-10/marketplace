//SPDX-License-Identifier:MIT
pragma solidity ^0.8.26;
error Marketplace_alreadyRegistered();
error Marketplace_not_A_Seller();
error Marketplace_not_A_Customer();
error Marketplace_Out_Of_Stock();
error Marketplace_not_your_Order();
error Marketplace_Wait_30_Days();
error Marketplace_already_Delivered();

contract Marketplace {
    struct Item {
        uint256 itemId;
        uint256 sellerId;
        // uint256 priceUSD;
        uint256 priceETH;
        string name;
        string img;
        string description;
        string category;
        uint256 stock;
        uint256 totalStars;
        uint256 totalItemOrdered;
        uint256 rating;
    }
    struct Seller {
        uint256 sellerId;
        string name;
        address payable sellerAddress;
        string shopAddress;
        //Item[] listedItems;
    }
    struct Customer {
        uint256 customerId;
        string name;
        address payable customerAddress;
    }
    struct Order {
        uint256 orderId;
        uint256 custId;
        uint256 sellId;
        uint256 itemId;
        uint256 time;
        uint256 qty;
        uint256 price;
        string deliveryAddress;
        bool isDelivered;
    }
    //id generators
    uint256 itemIndex = 0;
    uint256 sellerIndex = 0;
    uint256 customerIndex = 0;
    uint256 orderIndex = 0;

    //mappings to get each struct by their ids
    mapping(uint256 => Customer) public getCustomerById;
    mapping(uint256 => Seller) public getSellerById;
    mapping(uint256 => Item) public getItemById;
    mapping(uint256 => Order) public getOrderById;

    //mappings to retrieve orders
    // mapping(uint256=>Order) public  getOrderByCustId;
    // mapping(uint256=>Order) public getOrderBySellerId;

    //validity checkers mapping
    mapping(address => bool) public isCustomer;
    mapping(address => bool) public isSeller;

    //address to ids
    mapping(address => uint256) public getCustomerId;
    mapping(address => uint256) public getSellerId;
    //arrays for all the structs
    Customer[] customers;
    Seller[] sellers;
    Item[] items;
    Order[] orders;

    //functions

    //register
    function registerCustomer(string memory _name) public {
        if (isCustomer[msg.sender]) revert Marketplace_alreadyRegistered();
        Customer memory newCust = Customer({
            customerId: customerIndex,
            name: _name,
            customerAddress: payable(msg.sender)
        });
        getCustomerById[customerIndex] = newCust;
        customers.push(newCust);
        isCustomer[msg.sender] = true;
        getCustomerId[msg.sender] = customerIndex;
        customerIndex++;
    }

    function registerSeller(
        string memory _name,
        string memory _shopAddress
    ) public {
        if (isSeller[msg.sender]) revert Marketplace_alreadyRegistered();
        Seller memory newSeller = Seller({
            sellerId: sellerIndex,
            name: _name,
            sellerAddress: payable(msg.sender),
            shopAddress: _shopAddress
        });

        getSellerById[sellerIndex] = newSeller;
        sellers.push(newSeller);
        isSeller[msg.sender] = true;
        getSellerId[msg.sender] = sellerIndex;
        sellerIndex++;
    }

    function registerItem(
        uint256 _sellerId,
        uint256 _price,
        string memory _name,
        string memory _img,
        string memory _description,
        string memory _category,
        uint256 _stock
    ) public {
        // Create a new item
        if (!isSeller[getSellerById[_sellerId].sellerAddress])
            revert Marketplace_not_A_Seller();

        Item memory newItem = Item({
            itemId: itemIndex,
            sellerId: _sellerId,
            //priceUSD:_price,
            priceETH: _price, //.getUsdToEth(),
            name: _name,
            img: _img,
            description: _description,
            category: _category,
            stock: _stock,
            totalStars: 0,
            totalItemOrdered: 0,
            rating: 0
        });

        getItemById[itemIndex] = newItem;
        items.push(newItem);
        itemIndex++;
    }

    //order item
    function orderItems(
        uint256 _itemId,
        uint256 _qty,
        string memory _deliveryAddress
    ) public payable {
        uint256 _sellId = getItemById[_itemId].sellerId;
        if (!isSeller[getSellerById[_sellId].sellerAddress])
            revert Marketplace_not_A_Seller();
        if (!isCustomer[msg.sender]) revert Marketplace_not_A_Customer();
        if (getItemById[_itemId].stock < _qty)
            revert Marketplace_Out_Of_Stock();

        Order memory newOrder = Order({
            orderId: orderIndex,
            custId: getCustomerId[msg.sender],
            sellId: _sellId,
            itemId: _itemId,
            time: block.timestamp,
            qty: _qty,
            price: 0,
            deliveryAddress: _deliveryAddress,
            isDelivered: false
        });
        uint256 ethAmount = getItemById[_itemId].priceETH * _qty;
        newOrder.price = ethAmount;
        orders.push(newOrder);
        // getOrderByCustId[getCustomerId[msg.sender]]=newOrder;
        // getOrderBySellerId[_sellId]=newOrder;
        getOrderById[orderIndex] = newOrder;
        orderIndex++;

        getItemById[_itemId].stock -= _qty;
        //payment

        //uint256 ethAmount = getItemById[_itemId].priceETH*_qty;
        require(msg.value >= ethAmount, "Not enough Ether sent");

        // Refund any excess ETH sent
        if (msg.value > ethAmount) {
            payable(msg.sender).transfer(msg.value - ethAmount);
        }
    }

    //confirm if order is recieved and send the money to the seller
    function confirmDelivery(uint256 _orderId, uint256 rating) public payable {
        if (getOrderById[_orderId].custId != getCustomerId[msg.sender])
            revert Marketplace_not_your_Order();

        Order storage order = getOrderById[_orderId];
        order.isDelivered = true;

        Item storage item = getItemById[order.itemId];
        item.totalItemOrdered += order.qty;
        item.totalStars += rating;
        item.rating = item.totalStars / item.totalItemOrdered;

        //pay the seller
        (bool callSuccess, ) = payable(
            getSellerById[getOrderById[_orderId].sellId].sellerAddress
        ).call{value: getOrderById[_orderId].price}("");

        require(callSuccess, "Payment Failed");
    }

    function refundRequest(uint256 _orderId) public payable {
        if (getOrderById[_orderId].custId != getCustomerId[msg.sender])
            revert Marketplace_not_your_Order();
        if ((getOrderById[_orderId].time + 3600 * 30 * 24) < block.timestamp)
            revert Marketplace_Wait_30_Days();
        if (getOrderById[_orderId].isDelivered)
            revert Marketplace_already_Delivered();
    }

    // read functions

    function getOrders() public view returns (Order[] memory) {
        return orders;
    }

    function getAllItems() public view returns (Item[] memory) {
        return items;
    }

    function getAllSellers() public view returns (Seller[] memory) {
        return sellers;
    }

    receive() external payable {}

    fallback() external payable {}
}
