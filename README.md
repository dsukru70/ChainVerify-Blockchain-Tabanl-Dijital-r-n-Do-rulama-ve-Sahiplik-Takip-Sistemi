🔗 ChainVerify: Blockchain Tabanlı Dijital Ürün Doğrulama ve Sahiplik Takip Sistemi hr
📌 Proje Özeti
ChainVerify, fiziksel ve dijital ürünlerin tedarik zincirindeki hareketlerini, orijinalliğini ve sahiplik geçmişini (history) şeffaf, değiştirilemez ve güvenli bir şekilde takip etmek için geliştirilmiş bir Web3 & IoT entegrasyonuna hazır doğrulama sistemidir. Özellikle ikinci el piyasasındaki güven sorununu ve sahteciliği önlemek amacıyla; her ürün bir NFT (ERC-721) mantığıyla blockchain'e kaydedilir. Sistem, son kullanıcıların kripto cüzdanı (MetaMask vb.) kullanmasına gerek kalmadan, Web2.5 mimarisiyle arka planda merkezi bir cüzdan üzerinden işlem yapmasına olanak tanır.

📑 İçerik Haritası
Temel Özellikler

Sistem Mimarisi ve Teknolojiler

Kurulum ve Çalıştırma

Kullanım Senaryosu

Gelecek Vizyonu (Yol Haritası)

🔥 Temel Özellikler
Değiştirilemez Ürün Kimliği: Her ürüne ait veriler (üretici, model, seri no) özetlenerek (Hash) akıllı kontrata yazılır.

Otonom Sahiplik Geçmişi: Ürün her el değiştirdiğinde bu işlem blockchain'e işlenir. Geçmişteki tüm sahipler şeffafça görüntülenebilir.

Gas-Fee Abstraksiyonu (Web2.5 Deneyimi): Kullanıcıların işlem ücreti (Gas Fee) ödemesine gerek yoktur. Python backend, yetkili cüzdan üzerinden işlemleri arka planda otonom olarak halleder.

Modern ve Dinamik Arayüz: Kullanıcılara güven veren, mobil uyumlu ve "Glassmorphism" tasarımlı QR/ID sorgulama ekranı.

🛠️ Sistem Mimarisi ve Teknolojiler
Proje üç ana modülden oluşmaktadır:

Smart Contract (Blockchain Katmanı)

Dil: Solidity (v0.8.20+)

Framework: Hardhat

Standart: ERC-721 (OpenZeppelin)

Backend (API ve Web3 Köprüsü)

Dil/Framework: Python, Flask

Web3 İletişimi: Web3.py

Veritabanı: SQLite (Önbellek ve Off-chain eşleşmeler için)

Frontend (Kullanıcı Arayüzü)

Yapı: HTML5, Vanilla JavaScript (Fetch API)

Stil: Tailwind CSS

🚀 Kurulum ve Çalıştırma
Projeyi yerel ortamınızda (localhost) uçtan uca çalıştırmak için aşağıdaki adımları izleyin.

1. Blockchain Ağını Başlatma
Bash
cd contracts
npm install
# Yerel test ağını başlatın
npx hardhat node
2. Akıllı Kontratı Deploy Etme
Yeni bir terminal açın ve kontratı yerel ağa yükleyin:

Bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
# Çıkan kontrat adresini kopyalayın
3. Backend (Flask) Sunucusunu Ayağa Kaldırma
Bash
cd backend
# Sanal ortam oluşturun ve aktif edin
python -m venv venv
source venv/bin/activate  # Windows için: venv\Scripts\activate

# Gerekli paketleri kurun
pip install -r requirements.txt

# .env dosyasını oluşturun ve CONTRACT_ADDRESS ile PRIVATE_KEY bilgilerinizi girin
python app.py
4. Frontend Arayüzünü Başlatma
Bash
cd frontend
# Basit bir HTTP sunucusu ile arayüzü başlatın
python -m http.server 3000
Tarayıcınızdan http://localhost:3000 adresine giderek sistemi test edebilirsiniz!

📱 Kullanım Senaryosu
Üretici (Admin): /admin.html paneline girer. Yeni ürettiği ürünün bilgilerini yazar ve "Blockchain'e Kaydet" butonuna basar. Sistem bir işlem Hash'i ve benzersiz Ürün ID'si üretir.

Son Kullanıcı (Müşteri): index.html ana sayfasına gelir. Satın almak istediği ürünün üzerindeki ID'yi sisteme girer.

Doğrulama: Sistem saniyeler içinde ürünün orijinal olup olmadığını, ne zaman üretildiğini ve daha önce kimlerin elinden geçtiğini yeşil bir güven ekranıyla kullanıcıya sunar.

🗺️ Gelecek Vizyonu (Yol Haritası)
[ ] QR / NFC Entegrasyonu: Dinamik QR kodlar ve kopyalanamaz NFC (NTAG424) etiketleri ile donanım güvenliği sağlanması.

[ ] Layer 2 Geçişi: Projenin Ethereum mainnet yerine Polygon (MATIC) veya Arbitrum gibi düşük maliyetli ağlara taşınması.

[ ] IoT (Üretim Bandı) Otomasyonu: ESP32 kameralar ile üretim bandından geçen ürünlerin otonom olarak blockchain'e kaydedilmesi.

Bu proje, blockchain teknolojisinin spekülatif finans dışında, gerçek dünya problemlerini (Real World Assets - RWA) çözmek için nasıl kullanılabileceğini göstermek amacıyla geliştirilmiştir.
