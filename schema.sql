DROP DATABASE IF EXISTS overview;
CREATE DATABASE overview;

\c overview;

CREATE TABLE IF NOT EXISTS products (
  /* Describe your table here.*/
  id serial PRIMARY KEY,
  name text,
  slogan text,
  description text,
  category text,
  default_price text
);

CREATE TABLE IF NOT EXISTS product_features (
  product_id int NOT NULL,
  feature_id serial NOT NULL,
  feature text,
  value text,
  PRIMARY KEY (feature_id),
  FOREIGN KEY (product_id)
    REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS product_styles (
  product_id int NOT NULL,
  style_id serial NOT NULL,
  name text,
  original_price text,
  sale_price text,
  "defaults?" boolean,
  PRIMARY KEY (style_id),
  FOREIGN KEY (product_id)
    REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS styles_photos (
  style_id int NOT NULL,
  thumbnail_url text,
  url text,
  FOREIGN KEY (style_id)
    REFERENCES product_styles (style_id)
);

CREATE TABLE IF NOT EXISTS styles_sku (
  style_id int NOT NULL,
  sku_id serial NOT NULL,
  quantity int,
  size text,
  PRIMARY KEY (sku_id),
  FOREIGN KEY (style_id)
    REFERENCES product_styles (style_id)
);