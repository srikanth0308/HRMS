import { useState } from 'react';
import { Mail, CreditCard, User, Plus } from 'lucide-react';

interface EmployeeDetails {
  id: number;
  name: string;
  email: string;
  designation: string;
  department: string;
  location: string;
  dateOfJoining: string;
  pan: string;
  bankName: string;
  bankAccount: string;
  pfAccount: string;
  uanNumber: string;
  ifsc: string;
}

interface SalaryDetails {
  monthYear: string;
  daysWorked: number;
  payDate: string;
  basic: number;
  hra: number;
  specialAllowance: number;
  statutoryBonus: number;
  ltaAllowance: number;
  variablePay: number;
  pf: number;
  esi: number;
  professionTax: number;
  incomeTax: number;
  reimbursement1: number;
  reimbursement2: number;
  netPay?: number;
}

const formatCurrency = (amount: number) =>
  amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });

const Payslip: React.FC<{
  companyName: string;
  companyAddress: string;
  employee: EmployeeDetails;
  salary: SalaryDetails;
}> = ({ companyName, companyAddress, employee, salary }) => {
  const earnings = [
    salary.basic,
    salary.hra,
    salary.specialAllowance,
    salary.statutoryBonus,
    salary.ltaAllowance,
    salary.variablePay
  ].reduce((sum, val) => sum + val, 0);

  const deductions = [
    salary.pf,
    salary.esi,
    salary.professionTax,
    salary.incomeTax
  ].reduce((sum, val) => sum + val, 0);

  const reimbursements = salary.reimbursement1 + salary.reimbursement2;
  const netPay = earnings - deductions + reimbursements;

  return (
    <div className="p-4 border rounded-lg mb-4 bg-white bg-opacity-90 shadow-sm">
      <div className="grid grid-cols-2 mb-4">
        <div>
          <h2 className="text-xl font-bold">{companyName}</h2>
          <p className="text-sm text-gray-600">{companyAddress}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Payslip for {salary.monthYear}</p>
          <p className="text-sm">Pay Date: {salary.payDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-bold mb-2">Employee Details</h3>
          <p>Name: {employee.name}</p>
          <p>Designation: {employee.designation}</p>
          <p>Employee ID: {employee.id}</p>
          <p>Department: {employee.department}</p>
          <p>Location: {employee.location}</p>
          <p>Date of Joining: {employee.dateOfJoining}</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Bank Details</h3>
          <p>Bank: {employee.bankName}</p>
          <p>Account: {employee.bankAccount}</p>
          <p>IFSC: {employee.ifsc}</p>
          <p>PF Account: {employee.pfAccount}</p>
          <p>UAN: {employee.uanNumber}</p>
          <p>PAN: {employee.pan}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-bold mb-2">Earnings</h4>
          <p>Basic: {formatCurrency(salary.basic)}</p>
          <p>HRA: {formatCurrency(salary.hra)}</p>
          <p>Special Allowance: {formatCurrency(salary.specialAllowance)}</p>
          <p>Statutory Bonus: {formatCurrency(salary.statutoryBonus)}</p>
          <p>LTA: {formatCurrency(salary.ltaAllowance)}</p>
          <p>Variable Pay: {formatCurrency(salary.variablePay)}</p>
          <p className="font-bold mt-2">Total Earnings: {formatCurrency(earnings)}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-bold mb-2">Deductions</h4>
          <p>PF: {formatCurrency(salary.pf)}</p>
          <p>ESI: {formatCurrency(salary.esi)}</p>
          <p>Profession Tax: {formatCurrency(salary.professionTax)}</p>
          <p>Income Tax: {formatCurrency(salary.incomeTax)}</p>
          <p className="font-bold mt-2">Total Deductions: {formatCurrency(deductions)}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-bold mb-2">Reimbursements</h4>
          <p>Reimbursement 1: {formatCurrency(salary.reimbursement1)}</p>
          <p>Reimbursement 2: {formatCurrency(salary.reimbursement2)}</p>
          <p className="font-bold mt-2">Total Reimbursements: {formatCurrency(reimbursements)}</p>
          <div className="mt-4 p-2 bg-blue-50 rounded">
            <p className="font-bold text-lg">Net Pay: {formatCurrency(netPay)}</p>
            <p className="text-sm">Days Worked: {salary.daysWorked}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PayslipGenerator = () => {
  const [employees, setEmployees] = useState<EmployeeDetails[]>([]);
  const [salaries, setSalaries] = useState<{ [key: number]: SalaryDetails }>({});
  const [newEmployee, setNewEmployee] = useState<Partial<EmployeeDetails>>({});
  const company = {
    name: "Tech Corp International",
    address: "123 Tech Park, Bengaluru - 560001"
  };

  const handleEmployeeChange = (field: keyof EmployeeDetails, value: string) => {
    setNewEmployee(prev => ({ ...prev, [field]: value }));
  };

  const addEmployee = () => {
    if (Object.values(newEmployee).every(v => v?.toString().trim()) && newEmployee.id) {
      setEmployees([...employees, newEmployee as EmployeeDetails]);
      setNewEmployee({});
    } else {
      alert('Please fill all employee fields');
    }
  };

  const handleSalaryChange = (id: number, field: keyof SalaryDetails, value: string) => {
    const numericValue = field === 'monthYear' || field === 'payDate' ? value : Number(value);
    const current = salaries[id] || {} as SalaryDetails;
    const updated = { ...current, [field]: numericValue };

    const earnings = [
      updated.basic || 0,
      updated.hra || 0,
      updated.specialAllowance || 0,
      updated.statutoryBonus || 0,
      updated.ltaAllowance || 0,
      updated.variablePay || 0
    ].reduce((sum, val) => sum + val, 0);

    const deductions = [
      updated.pf || 0,
      updated.esi || 0,
      updated.professionTax || 0,
      updated.incomeTax || 0
    ].reduce((sum, val) => sum + val, 0);

    const reimbursements = (updated.reimbursement1 || 0) + (updated.reimbursement2 || 0);
    updated.netPay = earnings - deductions + reimbursements;

    setSalaries(prev => ({ ...prev, [id]: updated }));
  };

  const sendPayslip = (employee: EmployeeDetails) => {
    const salaryData = salaries[employee.id];
    if (!salaryData) return;

    alert(`Payslip for ${employee.name} sent to ${employee.email}`);
    console.log('Payslip Data:', { employee, salary: salaryData });
  };

  return (
    <div className="min-h-screen bg-[url('https://img.freepik.com/free-vector/modern-dynamic-motion-curvy-light-trail-dark-banner-design_1017-59036.jpg?semt=ais_hybrid&w=740')] bg-cover bg-center bg-no-repeat p-6">
      <div className="max-w-7xl mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="text-purple-600" />
            Payslip Management System
          </h1>
          <p className="text-gray-700 mt-2">Manage employee salaries and generate detailed payslips</p>
        </header>

        <section className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { field: 'id', label: 'Employee ID', type: 'number' },
              { field: 'name', label: 'Full Name' },
              { field: 'email', label: 'Email', type: 'email' },
              { field: 'designation', label: 'Designation' },
              { field: 'department', label: 'Department' },
              { field: 'location', label: 'Location' },
              { field: 'dateOfJoining', label: 'Join Date', type: 'date' },
              { field: 'pan', label: 'PAN Number' },
              { field: 'bankName', label: 'Bank Name' },
              { field: 'bankAccount', label: 'Account Number' },
              { field: 'ifsc', label: 'IFSC Code' },
              { field: 'pfAccount', label: 'PF Account' },
              { field: 'uanNumber', label: 'UAN Number' },
            ].map(({ field, label, type }) => (
              <input
                key={field}
                type={type || 'text'}
                placeholder={label}
                className="input input-bordered"
                value={(newEmployee[field as keyof EmployeeDetails] as string) || ''}
                onChange={(e) => handleEmployeeChange(field as keyof EmployeeDetails, e.target.value)}
              />
            ))}
          </div>
          <button
            onClick={addEmployee}
            className="btn btn-primary mt-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </button>
        </section>

        {employees.map(emp => (
          <section key={emp.id} className="bg-white bg-opacity-90 p-4 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="text-blue-500" />
                  {emp.name} ({emp.designation})
                </h3>
                <p className="text-sm text-gray-600">{emp.department} • {emp.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Employee ID: {emp.id}</p>
                <p className="text-sm">Joined: {emp.dateOfJoining}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[
                { field: 'monthYear', label: 'Month/Year', type: 'month' },
                { field: 'payDate', label: 'Pay Date', type: 'date' },
                { field: 'daysWorked', label: 'Days Worked', type: 'number' },
                { field: 'basic', label: 'Basic Pay', type: 'number' },
                { field: 'hra', label: 'HRA', type: 'number' },
                { field: 'specialAllowance', label: 'Special Allowance', type: 'number' },
                { field: 'statutoryBonus', label: 'Statutory Bonus', type: 'number' },
                { field: 'ltaAllowance', label: 'LTA', type: 'number' },
                { field: 'variablePay', label: 'Variable Pay', type: 'number' },
                { field: 'pf', label: 'PF Contribution', type: 'number' },
                { field: 'esi', label: 'ESI', type: 'number' },
                { field: 'professionTax', label: 'Profession Tax', type: 'number' },
                { field: 'incomeTax', label: 'Income Tax', type: 'number' },
                { field: 'reimbursement1', label: 'Reimbursement 1', type: 'number' },
                { field: 'reimbursement2', label: 'Reimbursement 2', type: 'number' },
              ].map(({ field, label, type }) => (
                <input
                  key={field}
                  type={type}
                  placeholder={label}
                  className="input input-bordered input-sm"
                  value={salaries[emp.id]?.[field as keyof SalaryDetails] || ''}
                  onChange={(e) => handleSalaryChange(emp.id, field as keyof SalaryDetails, e.target.value)}
                />
              ))}
            </div>

            {salaries[emp.id]?.netPay && (
              <>
                <Payslip
                  companyName={company.name}
                  companyAddress={company.address}
                  employee={emp}
                  salary={salaries[emp.id]}
                />

                <button
                  className="btn btn-secondary mt-4"
                  onClick={() => sendPayslip(emp)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Payslip to {emp.email}
                </button>
              </>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default PayslipGenerator;
