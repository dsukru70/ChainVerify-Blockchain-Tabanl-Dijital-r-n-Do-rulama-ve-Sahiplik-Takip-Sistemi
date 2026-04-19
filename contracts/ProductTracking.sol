// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductTracking is Ownable {
    struct Product {
        string manufacturer;
        string model;
        uint256 timestamp;
        address currentOwner;
        bool isMinted;
    }

    // Ürün seri numarası veya benzersiz ID ile ürün verisini eşleştirir
    mapping(string => Product) public products;

    // Log (Olay) kayıtları
    event ProductMinted(string productId, string manufacturer, string model, address initialOwner);
    event ProductTransferred(string productId, address oldOwner, address newOwner);

    // Başlangıçta kontratı kuranı "owner" olarak ayarla
    constructor() Ownable(msg.sender) {}

    // Yeni ürün ekleme (Sadece yönetici/backend Private Key'i çalıştırabilir)
    function addProduct(string memory _productId, string memory _manufacturer, string memory _model) public onlyOwner {
        require(!products[_productId].isMinted, "Product with this ID already exists!");

        products[_productId] = Product({
            manufacturer: _manufacturer,
            model: _model,
            timestamp: block.timestamp,
            currentOwner: msg.sender, // Başlangıç sahibi olarak üretici (backend cüzdanı) atanıyor
            isMinted: true
        });

        emit ProductMinted(_productId, _manufacturer, _model, msg.sender);
    }

    // Ürünün varlığını ve orijinalliğini doğrulama
    function verifyProduct(string memory _productId) public view returns (
        bool exists, 
        string memory manufacturer, 
        string memory model, 
        uint256 timestamp, 
        address currentOwner
    ) {
        Product memory p = products[_productId];
        if (!p.isMinted) {
            return (false, "", "", 0, address(0));
        }
        return (true, p.manufacturer, p.model, p.timestamp, p.currentOwner);
    }

    // Ürün sahipliğini devretme süreci (şimdilik opsiyonel kullanılabilir)
    function transferOwnership(string memory _productId, address _newOwner) public {
        require(products[_productId].isMinted, "Product does not exist.");
        // Geliştirilmiş bir senaryoda bu kullanıcıların kendi MetaMask cüzdanlarıyla yönetilebilir
        // Ancak bu aşamada admin veya mevcut sahip devredebilir şeklinde kurgulanabilir.
        require(products[_productId].currentOwner == msg.sender || msg.sender == owner(), "Not authorized to transfer.");

        address oldOwner = products[_productId].currentOwner;
        products[_productId].currentOwner = _newOwner;

        emit ProductTransferred(_productId, oldOwner, _newOwner);
    }
}
