export enum CompanyType {
  INDIVIDUAL = 'INDIVIDUAL',
  LIMITADA = 'LIMITADA'
}

export enum MaritalStatus {
  SOLTEIRO = 'Solteiro(a)',
  CASADO = 'Casado(a)',
  VIUVO = 'Viúvo(a)',
  DIVORCIADO = 'Divorciado(a)'
}

export enum PropertyRegime {
  COMUNHAO_PARCIAL = 'Comunhão Parcial de Bens',
  COMUNHAO_UNIVERSAL = 'Comunhão Universal de Bens',
  SEPARACAO_TOTAL = 'Separação Total de Bens',
  PARTICIPACAO_FINAL = 'Participação Final nos Aquestos'
}

export interface Address {
  logradouro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
}

export interface Partner {
  id: string;
  fullName: string;
  birthDate: string;
  cpf: string;
  rg: string;
  rgIssueDate: string;
  profession: string;
  email: string;
  phone: string;
  motherName: string;
  fatherName: string;
  address: Address;
  maritalStatus: MaritalStatus;
  propertyRegime?: PropertyRegime; // Optional, only if married
}

export interface CompanyData {
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  phone: string;
  address: Address;
  iptu: string;
  activities: string;
  capitalSocial: string;
}

export interface FormData {
  companyType: CompanyType;
  partners: Partner[];
  companyData: CompanyData;
}
