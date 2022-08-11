import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  id: Number,
  name:  String,
  slogan: String,
  description:   String,
  category: String,
  default_price: String,
  features: [{
    feature: String,
    value: String
  }],
  results: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      default: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String
        }
      ],
      skus: {
        sku_id: {
          quantity: Number,
          size: String
        }
      }
    }
  ]
});

const Products = mongoose.model('Product', productSchema);