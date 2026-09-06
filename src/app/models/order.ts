export type ShippingInformation = {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type ShippingInformationResponse = ShippingInformation & {
  id: number;
  created_at: string;
};

export type OrderManageResponse = {
  id: number;
  items: number;
  total_price: number;
  payment_status: boolean;
  payment_mode: string;
  shipping_id: number;
  created_at: string;
  user_id: number;
};
