import React from 'react';
import { CompanyData, CompanyType } from '../types';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';

interface CompanyDataFormProps {
  data: CompanyData;
  companyType: CompanyType;
  onChange: (field: keyof CompanyData, value: string) => void;
  onAddressChange: (field: keyof CompanyData['address'], value: string) => void;
}

const CompanyDataForm: React.FC<CompanyDataFormProps> = ({
  data,
  companyType,
  onChange,
  onAddressChange,
}) => {
  // Helper text logic for Reason Social based on Company Type
  const getRazaoSocialHelper = () => {
    if (companyType === CompanyType.LIMITADA) {
      return 'O nome empresarial deve terminar obrigatoriamente com "LTDA", e estará sujeito a consulta de disponibilidade.';
    }
    return (
      <span className="block space-y-1">
        <span className="block">• Deve ter como núcleo o nome civil do titular.</span>
        <span className="block">• Pode ser acrescido de designação da atividade.</span>
        <span className="block">• Não abreviar termos de parentesco (FILHO, NETO, etc).</span>
        <span className="block">• Não excluir partículas (de, da, do).</span>
      </span>
    );
  };

  return (
    <div className="bg-[#0f172a] rounded-xl border border-white/5 p-6 md:p-8 space-y-8">
      
      {/* Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Razão Social"
          placeholder={companyType === CompanyType.LIMITADA ? "Minha Empresa LTDA" : "Nome Civil + Atividade"}
          value={data.razaoSocial}
          onChange={(e) => onChange('razaoSocial', e.target.value)}
          helperText={getRazaoSocialHelper() as any}
          required
        />
        <Input
          label="Nome Fantasia"
          placeholder="Nome comercial da marca"
          value={data.nomeFantasia}
          onChange={(e) => onChange('nomeFantasia', e.target.value)}
          helperText="Opcional. É o nome pelo qual a empresa é conhecida comercialmente."
        />
      </div>

      {/* Contact Info - New Fields */}
      <div className="pt-2 border-t border-white/10">
        <h4 className="text-sm uppercase tracking-wider text-[#10b981] font-bold mb-4">Contato da Empresa</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="E-mail Comercial"
            type="email"
            placeholder="contato@empresa.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            required
          />
          <Input
            label="Telefone Comercial"
            type="tel"
            placeholder="(00) 00000-0000"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Address */}
      <div className="pt-2 border-t border-white/10">
        <h4 className="text-sm uppercase tracking-wider text-[#10b981] font-bold mb-4">Endereço Comercial</h4>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Input
            label="Logradouro"
            value={data.address.logradouro}
            onChange={(e) => onAddressChange('logradouro', e.target.value)}
            className="md:col-span-3"
            required
          />
          <Input
            label="Número"
            value={data.address.numero}
            onChange={(e) => onAddressChange('numero', e.target.value)}
            className="md:col-span-1"
            required
          />
          <Input
            label="Complemento"
            value={data.address.complemento}
            onChange={(e) => onAddressChange('complemento', e.target.value)}
            className="md:col-span-2"
          />
          <Input
            label="Cidade"
            value={data.address.cidade}
            onChange={(e) => onAddressChange('cidade', e.target.value)}
            className="md:col-span-4"
            required
          />
          <Input
            label="Estado"
            value={data.address.estado}
            onChange={(e) => onAddressChange('estado', e.target.value)}
            className="md:col-span-2"
            required
          />
        </div>
      </div>

      {/* Financials & Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Número do IPTU"
          placeholder="000.000.000"
          value={data.iptu}
          onChange={(e) => onChange('iptu', e.target.value)}
          helperText="Caso não possua, digite 0."
          required
        />
        <Input
          label="Capital Social (R$)"
          type="number"
          placeholder="0,00"
          value={data.capitalSocial}
          onChange={(e) => onChange('capitalSocial', e.target.value)}
          helperText="Valor investido inicialmente pelos sócios para o início das atividades."
          required
        />
      </div>

      <TextArea
        label="Descrição das Atividades"
        placeholder="Descreva detalhadamente o que a empresa fará..."
        value={data.activities}
        onChange={(e) => onChange('activities', e.target.value)}
        helperText="Liste todas as atividades econômicas que serão exercidas."
        required
      />
    </div>
  );
};

export default CompanyDataForm;
