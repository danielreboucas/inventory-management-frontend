import Product from "@/types/Product";
import api from "./api";

const baseProductUrl = "product";

export async function createProduct(product: Product): Promise<Product> {
  const response = await api.post(baseProductUrl, product);

  return response.data;
}

export async function getProduct(id: number): Promise<Product> {
  const response = await api.get(baseProductUrl + `/${id}`);

  return response.data;
}

export async function getAllProducts(): Promise<{
  data: Product[];
  total: number;
}> {
  const response = await api.get(baseProductUrl);

  return response.data;
}

export async function editProduct(
  // TODO: remove undefined
  id: number | undefined,
  product: Product
): Promise<Product> {
  const response = await api.patch(baseProductUrl + `/${id}`, product);

  return response.data;
}

export async function deleteProduct(ids: number[]): Promise<number> {
  const response = await api.delete(baseProductUrl, { data: { ids: ids } });

  return response.data;
}
