import Product from "./Product";

interface Order {
  id?: number;
  name: string;
  value: number;
  discountedValue: number;
  date: string;
  products: Product[];
  contactId: number;
  supplierId: number;
}

export default Order;
