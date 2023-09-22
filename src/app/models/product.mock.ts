import { faker } from '@faker-js/faker';
import { Product } from './product.model';

const generateOneProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    images: [faker.image.url(), faker.image.url()],
    description: faker.commerce.productDescription(),
    category: {
      id: faker.number.int(),
      name: faker.commerce.department()
    }
  }
};

const generateManyProducts = (size = 10): Product[] => {
  return Array.from({ length: size }, generateOneProduct);
}

export { generateOneProduct, generateManyProducts };