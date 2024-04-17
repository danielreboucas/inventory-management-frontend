import Product from "./Product";
import Order from "./Order";

interface Supplier {
  id?: number;
  name: string;
  contactInfo: string;
  products: Product[];
  orders: Order[];
}

export default Supplier;
