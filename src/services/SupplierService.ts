import Supplier from "@/types/Supplier";
import api from "./api";

const baseSupplierUrl = "supplier";

export async function createSupplier(supplier: Supplier): Promise<Supplier> {
  const response = await api.post(baseSupplierUrl, supplier);

  return response.data;
}

export async function getSupplier(id: number): Promise<Supplier> {
  const response = await api.get(baseSupplierUrl + `/${id}`);

  return response.data;
}

export async function getAllSuppliers(): Promise<{
  data: Supplier[];
  total: number;
}> {
  const response = await api.get(baseSupplierUrl);

  return response.data;
}

export async function editSupplier(
  // TODO: remove undefined
  id: number | undefined,
  supplier: Supplier
): Promise<Supplier> {
  const response = await api.patch(baseSupplierUrl + `/${id}`, supplier);

  return response.data;
}

export async function deleteSupplier(ids: number[]): Promise<number> {
  const response = await api.delete(baseSupplierUrl, { data: { ids: ids } });

  return response.data;
}
