import React, { useState } from 'react';
import Header from './components/Header';
import { CompanyType, Partner, CompanyData, MaritalStatus, FormData } from './types';
import PartnerForm from './components/PartnerForm';
import CompanyDataForm from './components/CompanyDataForm';
import { PlusIcon } from './components/Icons';

// Initial state helpers
const createEmptyPartner = (): Partner => ({
  id: crypto.randomUUID(),
  fullName: '',
  birthDate: '',
  cpf: '',
  rg: '',
  rgIssueDate: '',
  profession: '',
  email: '',
  phone: '',
  motherName: '',
  fatherName: '',
  address: { logradouro: '', numero: '', complemento: '', cidade: '', estado: '' },
  maritalStatus: MaritalStatus.SOLTEIRO,
});

const initialCompanyData: CompanyData = {
  razaoSocial: '',
  nomeFantasia: '',
  email: '',
  phone: '',
  address: { logradouro: '', numero: '', complemento: '', cidade: '', estado: '' },
  iptu: '',
  activities: '',
  capitalSocial: '',
};

const App: React.FC = () => {
  const [companyType, setCompanyType] = useState<CompanyType>(CompanyType.INDIVIDUAL);
  const [partners, setPartners] = useState<Partner[]>([createEmptyPartner()]);
  const [companyData, setCompanyData] = useState<CompanyData>(initialCompanyData);

  // Handlers for Company Type
  const handleTypeChange = (type: CompanyType) => {
    setCompanyType(type);
    if (type === CompanyType.INDIVIDUAL && partners.length > 1) {
      // If switching to Individual, keep only the first partner
      setPartners([partners[0]]);
    }
  };

  // Handlers for Partners
  const handleAddPartner = () => {
    setPartners([...partners, createEmptyPartner()]);
  };

  const handleRemovePartner = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id));
  };

  const handlePartnerUpdate = (id: string, field: keyof Partner, value: any) => {
    setPartners(partners.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handlePartnerAddressUpdate = (id: string, field: keyof Partner['address'], value: string) => {
    setPartners(
      partners.map((p) =>
        p.id === id ? { ...p, address: { ...p.address, [field]: value } } : p
      )
    );
  };

  // Handlers for Company Data
  const handleCompanyUpdate = (field: keyof CompanyData, value: string) => {
    setCompanyData({ ...companyData, [field]: value });
  };

  const handleCompanyAddressUpdate = (field: keyof CompanyData['address'], value: string) => {
    setCompanyData({
      ...companyData,
      address: { ...companyData.address, [field]: value },
    });
  };

  // Generate Email HTML
  const generateEmailHtml = (data: FormData) => {
    const tableStyle = "width: 100%; border-collapse: collapse; margin-bottom: 20px; color: #cbd5e1;";
    const thStyle = "text-align: left; padding: 12px; border-bottom: 1px solid #334155; color: #10b981;";
    const tdStyle = "padding: 12px; border-bottom: 1px solid #1e293b;";
    const sectionTitleStyle = "color: #10b981; font-size: 18px; font-weight: bold; margin-top: 30px; margin-bottom: 10px; border-bottom: 2px solid #10b981; padding-bottom: 5px;";

    let partnersHtml = '';
    data.partners.forEach((p, index) => {
      partnersHtml += `
        <h3 style="${sectionTitleStyle}">Sócio ${index + 1}: ${p.fullName}</h3>
        <table style="${tableStyle}">
          <tr><th style="${thStyle}">Nome</th><td style="${tdStyle}">${p.fullName}</td></tr>
          <tr><th style="${thStyle}">CPF</th><td style="${tdStyle}">${p.cpf}</td></tr>
          <tr><th style="${thStyle}">RG</th><td style="${tdStyle}">${p.rg} (${p.rgIssueDate})</td></tr>
          <tr><th style="${thStyle}">Nascimento</th><td style="${tdStyle}">${p.birthDate}</td></tr>
          <tr><th style="${thStyle}">Profissão</th><td style="${tdStyle}">${p.profession}</td></tr>
          <tr><th style="${thStyle}">Email</th><td style="${tdStyle}">${p.email}</td></tr>
          <tr><th style="${thStyle}">Telefone</th><td style="${tdStyle}">${p.phone}</td></tr>
          <tr><th style="${thStyle}">Mãe</th><td style="${tdStyle}">${p.motherName}</td></tr>
          <tr><th style="${thStyle}">Pai</th><td style="${tdStyle}">${p.fatherName}</td></tr>
          <tr><th style="${thStyle}">Estado Civil</th><td style="${tdStyle}">${p.maritalStatus}</td></tr>
          ${p.propertyRegime ? `<tr><th style="${thStyle}">Regime de Bens</th><td style="${tdStyle}">${p.propertyRegime}</td></tr>` : ''}
          <tr><th style="${thStyle}">Endereço</th><td style="${tdStyle}">${p.address.logradouro}, ${p.address.numero} ${p.address.complemento} - ${p.address.cidade}/${p.address.estado}</td></tr>
        </table>
      `;
    });

    return `
      <div style="background-color: #020a1c; color: #cbd5e1; font-family: sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #ffffff; margin: 0;">ABERTURA DE EMPRESA</h1>
          <h2 style="color: #10b981; margin: 5px 0;">${data.companyData.razaoSocial}</h2>
        </div>

        <h3 style="${sectionTitleStyle}">Dados da Empresa</h3>
        <table style="${tableStyle}">
          <tr><th style="${thStyle}">Tipo</th><td style="${tdStyle}">${data.companyType}</td></tr>
          <tr><th style="${thStyle}">Razão Social</th><td style="${tdStyle}">${data.companyData.razaoSocial}</td></tr>
          <tr><th style="${thStyle}">Nome Fantasia</th><td style="${tdStyle}">${data.companyData.nomeFantasia}</td></tr>
          <tr><th style="${thStyle}">Email Comercial</th><td style="${tdStyle}">${data.companyData.email}</td></tr>
          <tr><th style="${thStyle}">Telefone Comercial</th><td style="${tdStyle}">${data.companyData.phone}</td></tr>
          <tr><th style="${thStyle}">Endereço</th><td style="${tdStyle}">${data.companyData.address.logradouro}, ${data.companyData.address.numero} ${data.companyData.address.complemento} - ${data.companyData.address.cidade}/${data.companyData.address.estado}</td></tr>
          <tr><th style="${thStyle}">IPTU</th><td style="${tdStyle}">${data.companyData.iptu}</td></tr>
          <tr><th style="${thStyle}">Capital Social</th><td style="${tdStyle}">R$ ${data.companyData.capitalSocial}</td></tr>
          <tr><th style="${thStyle}">Atividades</th><td style="${tdStyle}">${data.companyData.activities}</td></tr>
        </table>

        ${partnersHtml}
        
        <div style="margin-top: 40px; padding: 20px; background-color: #0f172a; border-radius: 8px; text-align: center; border: 1px solid #1e293b;">
          <p style="color: #94a3b8; font-size: 12px;">Enviado automaticamente pelo sistema Vírgula Contábil.</p>
        </div>
      </div>
    `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: FormData = { companyType, partners, companyData };
    const emailHtml = generateEmailHtml(formData);
    
    // Simulation of sending email via environment variables
    console.log("--- START EMAIL SIMULATION ---");
    console.log(`Connecting to ${process.env.MAIL_SERVER}:${process.env.MAIL_PORT}`);
    console.log(`Auth User: ${process.env.MAIL_USERNAME}`);
    console.log(`Sending to: ${process.env.MAIL_PORT2}`); // Using MAIL_PORT2 as recipient per instruction
    console.log(`Subject: ABERTURA DE EMPRESA - ${companyData.razaoSocial}`);
    console.log("Body:", emailHtml);
    console.log("--- END EMAIL SIMULATION ---");

    alert("Solicitação enviada com sucesso! Uma cópia dos dados foi gerada (verifique o console para simulação do envio).");
  };

  return (
    <div className="min-h-screen bg-[#020a1c] text-slate-300 font-sans selection:bg-[#10b981] selection:text-[#020a1c]">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Abertura de <span className="text-[#10b981]">Empresa</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Preencha os dados abaixo para darmos início ao processo de legalização do seu negócio de forma rápida e segura.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Grupo 1: Tipo de Empresa */}
          <section>
            <div className="flex items-center space-x-4 mb-6">
              <span className="w-8 h-8 rounded-full bg-[#10b981] text-[#020a1c] font-bold flex items-center justify-center">1</span>
              <h2 className="text-2xl font-bold text-white">Tipo de Empresa</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label 
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 group ${
                  companyType === CompanyType.INDIVIDUAL 
                    ? 'border-[#10b981] bg-[#0f172a] shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                    : 'border-gray-700 bg-[#0f172a]/50 hover:border-gray-500'
                }`}
              >
                <input 
                  type="radio" 
                  name="companyType" 
                  value={CompanyType.INDIVIDUAL} 
                  checked={companyType === CompanyType.INDIVIDUAL}
                  onChange={() => handleTypeChange(CompanyType.INDIVIDUAL)}
                  className="sr-only" 
                />
                <div className="flex flex-col">
                  <span className={`text-lg font-bold mb-2 ${companyType === CompanyType.INDIVIDUAL ? 'text-[#10b981]' : 'text-white'}`}>Empresa Individual</span>
                  <p className="text-sm text-gray-400">Para empreendedores que atuam sozinhos, sem sócios. (Patrimônio pessoal se confunde com o da empresa.)</p>
                </div>
              </label>

              <label 
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 group ${
                  companyType === CompanyType.LIMITADA 
                    ? 'border-[#10b981] bg-[#0f172a] shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                    : 'border-gray-700 bg-[#0f172a]/50 hover:border-gray-500'
                }`}
              >
                <input 
                  type="radio" 
                  name="companyType" 
                  value={CompanyType.LIMITADA} 
                  checked={companyType === CompanyType.LIMITADA}
                  onChange={() => handleTypeChange(CompanyType.LIMITADA)}
                  className="sr-only" 
                />
                <div className="flex flex-col">
                  <span className={`text-lg font-bold mb-2 ${companyType === CompanyType.LIMITADA ? 'text-[#10b981]' : 'text-white'}`}>Sociedade Limitada</span>
                  <p className="text-sm text-gray-400">Para negócios compostos por um ou mais sócios. (Protege o patrimônio pessoal dos sócios.)</p>
                </div>
              </label>
            </div>
          </section>

          {/* Grupo 2: Dados dos Sócios */}
          <section>
            <div className="flex items-center space-x-4 mb-6">
              <span className="w-8 h-8 rounded-full bg-[#10b981] text-[#020a1c] font-bold flex items-center justify-center">2</span>
              <h2 className="text-2xl font-bold text-white">
                {companyType === CompanyType.INDIVIDUAL ? 'Dados do Empresário' : 'Dados dos Sócios'}
              </h2>
            </div>

            <div className="space-y-6">
              {partners.map((partner, index) => (
                <PartnerForm
                  key={partner.id}
                  index={index}
                  partner={partner}
                  showRemove={companyType === CompanyType.LIMITADA && partners.length > 1}
                  onUpdate={handlePartnerUpdate}
                  onUpdateAddress={handlePartnerAddressUpdate}
                  onRemove={handleRemovePartner}
                />
              ))}
            </div>

            {companyType === CompanyType.LIMITADA && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleAddPartner}
                  className="flex items-center space-x-2 bg-[#1e293b] hover:bg-[#334155] text-white font-semibold py-3 px-6 rounded-lg border border-dashed border-gray-500 hover:border-[#10b981] hover:text-[#10b981] transition-all"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span>Adicionar Sócio</span>
                </button>
              </div>
            )}
          </section>

          {/* Grupo 3: Dados da Empresa */}
          <section>
            <div className="flex items-center space-x-4 mb-6">
              <span className="w-8 h-8 rounded-full bg-[#10b981] text-[#020a1c] font-bold flex items-center justify-center">3</span>
              <h2 className="text-2xl font-bold text-white">Dados da Empresa</h2>
            </div>

            <CompanyDataForm
              data={companyData}
              companyType={companyType}
              onChange={handleCompanyUpdate}
              onAddressChange={handleCompanyAddressUpdate}
            />
          </section>

          {/* Gov.Br Disclaimer */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 text-yellow-200">
            <div className="p-3 bg-yellow-500/20 rounded-full shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-bold text-yellow-400 text-lg mb-1">Atenção Necessária</h4>
              <p className="text-sm opacity-90">
                Para conclusão da abertura da empresa será solicitada via <strong>WhatsApp</strong> ou <strong>E-mail</strong> a sua senha do <strong>Gov.Br</strong>. 
                Certifique-se que sua conta Gov.Br seja de nível <strong>Prata</strong> ou <strong>Ouro</strong>.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="bg-[#10b981] hover:bg-[#059669] text-[#020a1c] font-bold text-lg py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1 transition-all duration-200 w-full md:w-auto text-center"
            >
              Finalizar Cadastro
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default App;
