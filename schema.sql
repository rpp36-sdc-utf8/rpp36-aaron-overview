DROP DATABASE IF EXISTS overview;
CREATE DATABASE overview;

\c overview;
\timing

CREATE TABLE IF NOT EXISTS products (
  /* Describe your table here.*/
  id int PRIMARY KEY,
  name text,
  slogan text,
  description text,
  category text,
  default_price text
);

COPY products FROM '/Users/aaronwang/Desktop/SDC Data/product.csv' csv header;

CREATE TABLE IF NOT EXISTS product_features (
  id int NOT NULL,
  product_id int NOT NULL,
  feature text,
  value text,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES products (id),
  UNIQUE (id, product_id)
);

COPY product_features FROM '/Users/aaronwang/Desktop/SDC Data/features.csv' csv header;
CREATE INDEX product_feature ON product_features(product_id);

CREATE TABLE IF NOT EXISTS product_styles (
  id int NOT NULL,
  productId int NOT NULL,
  name text,
  sale_price text,
  original_price text,
  default_style boolean,
  PRIMARY KEY (id),
  FOREIGN KEY (productId)
    REFERENCES products (id),
  UNIQUE (id, productId)
);

COPY product_styles FROM '/Users/aaronwang/Desktop/SDC Data/styles.csv' csv header;
CREATE INDEX product_style ON product_styles(productId);


CREATE TABLE IF NOT EXISTS styles_photos (
  id int NOT NULL,
  styleId int NOT NULL,
  thumbnail_url text,
  url text,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId)
    REFERENCES product_styles (id),
  UNIQUE (id, styleId)
);

COPY styles_photos FROM '/Users/aaronwang/Desktop/SDC Data/photos.csv' csv header;

CREATE TABLE IF NOT EXISTS styles_sku (
  id int NOT NULL,
  styleId int NOT NULL,
  size text,
  quantity int,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId)
    REFERENCES product_styles (id),
  UNIQUE (id, styleId)
);

COPY styles_sku FROM '/Users/aaronwang/Desktop/SDC Data/skus.csv' csv header;