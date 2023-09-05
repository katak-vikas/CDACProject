import React from "react";

function BeneficiaryDto({ formData, handleChange }) {
  const beneficiaryRelationOptions = [
    "SPOUSE",
    "CHILD",
    "PARENT",
    "GUARDIAN",
    "FRIEND",
    "OTHER",
  ];
  const beneficiaryBankOptions = [
    "URVI_BANK",
    "HDFC_BANK",
    "ICICI_BANK",
    "STATE_BANK_OF_INDIA",
    "AXIS_BANK",
    "KOTAK_MAHINDRA_BANK",
    "BANK_OF_BARODA",
    "PUNJAB_NATIONAL_BANK",
    "CANARA_BANK",
    "INDUSIND_BANK",
    "YES_BANK",
    "UNION_BANK_OF_INDIA",
    "IDBI_BANK",
    "BANK_OF_INDIA",
    "CENTRAL_BANK_OF_INDIA",
    "CORPORATION_BANK",
    "INDIAN_OVERSEAS_BANK",
    "UCO_BANK",
    "SYNDICATE_BANK",
    "ORIENTAL_BANK_OF_COMMERCE",
    "ANDHRA_BANK",
    "ALLAHABAD_BANK",
    "UNITED_BANK_OF_INDIA",
    "VIJAYA_BANK",
    "BANK_OF_MAHARASHTRA",
    "DENA_BANK",
    "PUNJAB_AND_SIND_BANK",
    "FEDERAL_BANK",
    "SOUTH_INDIAN_BANK",
    "KARNATAKA_BANK",
    "RATNAKAR_BANK",
    "CITY_UNION_BANK",
    "DHANLAXMI_BANK",
    "JAMMU_AND_KASHMIR_BANK",
    "SARASWAT_BANK",
    "KARUR_VYSYA_BANK",
    "BANDHAN_BANK",
    "SMALL_FINANCE_BANK",
    "PAYTM_PAYMENTS_BANK",
    "AU_SMALL_FINANCE_BANK",
    "ESAF_SMALL_FINANCE_BANK",
    "NORTH_EAST_SMALL_FINANCE_BANK",
    "JANALAKSHMI_FINANCIAL_SERVICES",
    "FINCARE_SMALL_FINANCE_BANK",
    "CAPITAL_SMALL_FINANCE_BANK",
    "UJJIVAN_SMALL_FINANCE_BANK",
    "UTKARSH_SMALL_FINANCE_BANK",
    "SURYODAY_SMALL_FINANCE_BANK",
    "NORTHEAST_SMALL_FINANCE_BANK",
    "JANA_SME_FINANCE",
    "RESERVE_BANK_OF_INDIA",
    "OTHER",
  ];

  return (
    <div>
      <h2> Beneficiary Details </h2>
      <div>
        <label> Beneficiary Name: </label>
        <input
          type="text"
          name="beneficiary.name"
          value={formData.beneficiary.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Beneficiary Account Number: </label>
        <input
          type="text"
          name="beneficiary.accountNumber"
          value={formData.beneficiary.accountNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Beneficiary Bank Name: </label>
        <select
          name="beneficiary.beneficiaryBankName"
          value={formData.beneficiary.beneficiaryBankName}
          onChange={handleChange}
        >
          <option value="">Select Beneficiary Bank Name</option>
          {beneficiaryBankOptions.map((beneficiaryBankName) => (
            <option key={beneficiaryBankName} value={beneficiaryBankName}>
              {beneficiaryBankName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label> Beneficiary Relation: </label>
        <select
          name="beneficiary.relation"
          value={formData.beneficiary.beneficiaryRelation}
          onChange={handleChange}
        >
          <option value="">Select Beneficiary Relation</option>
          {beneficiaryRelationOptions.map((relation) => (
            <option key={relation} value={relation}>
              {relation}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BeneficiaryDto;
