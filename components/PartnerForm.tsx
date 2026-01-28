import React from 'react';
import { Partner, MaritalStatus, PropertyRegime } from '../types';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { TrashIcon } from './Icons';

interface PartnerFormProps {
  partner: Partner;
  index: number;
  showRemove: boolean;
  onUpdate: (id: string, field: keyof Partner | 'address', value: any) => void;
  onUpdateAddress: (id: string, field: keyof Partner['address'], value: string) => void;
  onRemove: (id: string) => void;
}

const PartnerForm: React.FC<PartnerFormProps> = ({
  partner,
  index,
  showRemove,
  onUpdate,
  onUpdateAddress,
  onRemove,
}) => {
  const maritalOptions = Object.values(MaritalStatus).map((status) => ({
    value: status,
    label: status,
  }));

  const regimeOptions = Object.values(PropertyRegime).map((regime) => ({
    value: regime,
    label: regime,
  }));

  return (
    <div className="bg-[#0f172a] rounded-xl border border-white/5 p-6 md:p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <span className="bg-[#10b981] text-[#020a1c] text-xs font-bold px-2 py-1 rounded mr-3">
            #{index + 1}
          </span>
          {index === 0 ? 'Sócio Administrador / Titular' : 'Sócio'}
        </h3>
        {showRemove && (
          <button
            onClick={() => onRemove(partner.id)}
            className="text-red-500 hover:text-red-400 p-2 transition-colors"
            title="Remover sócio"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Info Row 1 */}
        <Input
          label="Nome Completo"
          placeholder="Ex: João da Silva"
          value={partner.fullName}
          onChange={(e) => onUpdate(partner.id, 'fullName', e.target.value)}
          required
        />
        
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          value={partner.cpf}
          onChange={(e) => onUpdate(partner.id, 'cpf', e.target.value)}
          required
        />

        <Input
          label="Data de Nascimento"
          type="date"
          value={partner.birthDate}
          onChange={(e) => onUpdate(partner.id, 'birthDate', e.target.value)}
          required
        />

        {/* Personal Info Row 2 - New Fields */}
        <Input
          label="RG"
          placeholder="00.000.000-0"
          value={partner.rg}
          onChange={(e) => onUpdate(partner.id, 'rg', e.target.value)}
          required
        />

        <Input
          label="Data de Expedição"
          type="date"
          value={partner.rgIssueDate}
          onChange={(e) => onUpdate(partner.id, 'rgIssueDate', e.target.value)}
          required
        />

        <Input
          label="Profissão"
          placeholder="Ex: Administrador"
          value={partner.profession}
          onChange={(e) => onUpdate(partner.id, 'profession', e.target.value)}
          required
        />

        {/* Contact Info - New Fields */}
        <Input
          label="E-mail"
          type="email"
          placeholder="exemplo@email.com"
          value={partner.email}
          onChange={(e) => onUpdate(partner.id, 'email', e.target.value)}
          required
        />

        <Input
          label="Telefone/Celular"
          type="tel"
          placeholder="(00) 00000-0000"
          value={partner.phone}
          onChange={(e) => onUpdate(partner.id, 'phone', e.target.value)}
          required
        />

        {/* Marital Status */}
        <Select
          label="Estado Civil"
          options={maritalOptions}
          value={partner.maritalStatus}
          onChange={(e) => onUpdate(partner.id, 'maritalStatus', e.target.value)}
          required
        />

        {partner.maritalStatus === MaritalStatus.CASADO && (
          <div className="lg:col-span-3 animate-fadeIn">
            <Select
              label="Regime de Bens"
              options={regimeOptions}
              value={partner.propertyRegime || ''}
              onChange={(e) => onUpdate(partner.id, 'propertyRegime', e.target.value)}
              required
            />
          </div>
        )}

        {/* Parents - New Fields */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nome da Mãe"
            placeholder="Nome completo da mãe"
            value={partner.motherName}
            onChange={(e) => onUpdate(partner.id, 'motherName', e.target.value)}
            required
          />

          <Input
            label="Nome do Pai"
            placeholder="Nome completo do pai"
            value={partner.fatherName}
            onChange={(e) => onUpdate(partner.id, 'fatherName', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h4 className="text-sm uppercase tracking-wider text-[#10b981] font-bold mb-4">Endereço Residencial</h4>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Input
            label="Logradouro"
            placeholder="Rua, Avenida..."
            value={partner.address.logradouro}
            onChange={(e) => onUpdateAddress(partner.id, 'logradouro', e.target.value)}
            className="md:col-span-3"
            required
          />
          <Input
            label="Número"
            value={partner.address.numero}
            onChange={(e) => onUpdateAddress(partner.id, 'numero', e.target.value)}
            className="md:col-span-1"
            required
          />
          <Input
            label="Complemento"
            placeholder="Apto, Bloco..."
            value={partner.address.complemento}
            onChange={(e) => onUpdateAddress(partner.id, 'complemento', e.target.value)}
            className="md:col-span-2"
          />
          <Input
            label="Cidade"
            value={partner.address.cidade}
            onChange={(e) => onUpdateAddress(partner.id, 'cidade', e.target.value)}
            className="md:col-span-4"
            required
          />
          <Input
            label="Estado"
            placeholder="UF"
            value={partner.address.estado}
            onChange={(e) => onUpdateAddress(partner.id, 'estado', e.target.value)}
            className="md:col-span-2"
            maxLength={2}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerForm;
