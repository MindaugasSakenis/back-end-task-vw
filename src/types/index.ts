interface CompanyData {
  name: string;
  phone: number;
}

interface CustomerData {
  firstName?: string;
  lastName?: string;
  zipCode?: number;
  mail?: string;
}

export interface CheckoutData {
  id: string;
  companyData: CompanyData;
  customerData?: CustomerData;
}
