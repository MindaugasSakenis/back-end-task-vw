interface CompanyData {
  name: string;
  phone: string;
}

interface CustomerData {
  firstName?: string;
  lastName?: string;
  zipCode?: string;
  mail?: string;
}

export interface CheckoutData {
  id: string;
  companyData: CompanyData;
  customerData?: CustomerData;
}
