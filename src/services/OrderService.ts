import Order from "@/types/Order";
import api from "./api";

const baseOrderUrl = "order";

export async function createOrder(order: Order): Promise<Order> {
  const response = await api.post(baseOrderUrl, order);

  return response.data;
}

export async function getOrder(id: number): Promise<Order> {
  const response = await api.get(baseOrderUrl + `/${id}`);

  return response.data;
}

export async function getAllOrders(): Promise<{
  data: Order[];
  total: number;
}> {
  const response = await api.get(baseOrderUrl);

  return response.data;
}

export async function editOrder(
  // TODO: remove undefined
  id: number | undefined,
  order: Order
): Promise<Order> {
  const response = await api.patch(baseOrderUrl + `/${id}`, order);

  return response.data;
}

export async function deleteOrder(ids: number[]): Promise<number> {
  const response = await api.delete(baseOrderUrl, { data: { ids: ids } });

  return response.data;
}
