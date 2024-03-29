
CREATE TABLE IF NOT EXISTS organization (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) CHECK (type IN ('perishable', 'non-perishable')) NOT NULL,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pricing (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organization(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES item(id) ON DELETE CASCADE,
  zone VARCHAR(20) NOT NULL,
  base_distance_in_km INTEGER CHECK (base_distance_in_km > 0) NOT NULL,
  km_price NUMERIC(10, 2) CHECK (km_price > 0) NOT NULL,
  fix_price NUMERIC(10, 2) CHECK (fix_price > 0) NOT NULL
);
