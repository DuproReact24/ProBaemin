--- bảng nhà hàng
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    image VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    menu_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    total INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending', -- Trạng thái đơn hàng (Pending, Confirmed, Delivered, Canceled)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);
-- Bảng chi tiết đơn hàng
CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL, -- Giá của món ăn tại thời điểm đặt hàng
    total DECIMAL(10,2) NOT NULL, -- quantity * price
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);


INSERT INTO restaurants (name, address, phone, image) VALUES
('Nhà hàng A', '123 Đường Lê Lợi, TP.HCM', '0987654321', 'a.jpg'),
('Nhà hàng B', '456 Đường Nguyễn Trãi, Hà Nội', '0912345678', 'b.jpg'),
('Nhà hàng C', '789 Đường Võ Văn Kiệt, Đà Nẵng', '0909876543', 'c.jpg');


INSERT INTO menus (restaurant_id, name, description) VALUES
(1, 'Menu Trưa', 'Các món ăn dành cho buổi trưa'),
(1, 'Menu Tối', 'Các món ăn dành cho buổi tối'),
(2, 'Menu Đặc Biệt', 'Menu chỉ có tại nhà hàng B'),
(3, 'Menu Hải Sản', 'Chuyên về hải sản tươi sống');


INSERT INTO foods (menu_id, name, price, description, image) VALUES
(1, 'Cơm gà', 50000, 'Cơm gà chiên giòn', 'com_ga.jpg'),
(1, 'Canh chua cá lóc', 60000, 'Canh chua nấu với cá lóc', 'canh_chua.jpg'),
(2, 'Bò lúc lắc', 75000, 'Bò xào rau củ', 'bo_luc_lac.jpg'),
(3, 'Tôm hùm nướng', 200000, 'Tôm hùm nướng phô mai', 'tom_hum.jpg'),
(4, 'Mực hấp gừng', 90000, 'Mực hấp cùng gừng và sả', 'muc_hap.jpg');



INSERT INTO users (full_name, email, phone, address) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', '0987654321', 'Quận 1, TP.HCM'),
('Trần Thị B', 'tranthib@example.com', '0912345678', 'Quận 3, TP.HCM'),
('Lê Văn C', 'levanc@example.com', '0909876543', 'Quận 5, TP.HCM');


INSERT INTO orders (user_id, restaurant_id, total, total_price, status) VALUES
(1, 1, 2, 110000, 'Confirmed'), -- Đơn hàng từ user 1 tại nhà hàng 1
(2, 2, 1, 200000, 'Pending'),   -- Đơn hàng từ user 2 tại nhà hàng 2
(3, 3, 3, 350000, 'Delivered'); -- Đơn hàng từ user 3 tại nhà hàng 3


INSERT INTO order_details (order_id, food_id, quantity, price, total) VALUES
(1, 1, 1, 50000, 50000), -- User 1 đặt 1 phần cơm gà
(1, 2, 1, 60000, 60000), -- User 1 đặt 1 phần canh chua cá lóc
(2, 4, 1, 200000, 200000), -- User 2 đặt 1 phần tôm hùm nướng
(3, 3, 2, 75000, 150000), -- User 3 đặt 2 phần bò lúc lắc
(3, 5, 2, 90000, 180000); -- User 3 đặt 2 phần mực hấp gừng
