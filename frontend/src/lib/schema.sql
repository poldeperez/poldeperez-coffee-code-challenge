CREATE TABLE IF NOT EXISTS coffees (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  price VARCHAR(20) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('arabic', 'robusta')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mock data
INSERT INTO coffees (title, description, image_url, price, type) VALUES
  ('Coffee bag', 'Toasted beans to take home', 'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png', '12.99', 'arabic'),
  ('Espresso', 'Free in the MVST office', 'https://purepng.com/public/uploads/large/purepng.com-cup-mug-coffeecupmufcoffeebean-1411527406201d2571.png', '1.99', 'arabic'),
  ('Cortado', 'Half milk and half coffee. Spanish classic', 'https://purepng.com/public/uploads/large/purepng.com-cup-mug-coffeecupmufcoffeebean-1411527406018xgn16.png', '2.50', 'robusta');