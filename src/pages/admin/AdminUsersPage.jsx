import React, { useState } from 'react';
import { Users, Shield, Plus, CheckCircle2 } from 'lucide-react';

export const AdminUsersPage = () => {
  const [users] = useState([
    {
      id: 'USR-1',
      name: 'Chief Tax Policy Administrator',
      email: 'admin@taxbd.gov.bd',
      role: 'super_admin',
      department: 'NBR Tax Policy Unit',
      lastLogin: 'Active Now',
    },
    {
      id: 'USR-2',
      name: 'Senior Tax Accounting Officer',
      email: 'officer@taxbd.gov.bd',
      role: 'tax_officer',
      department: 'Statutory Research & Gazettes',
      lastLogin: 'Today, 11:30 AM',
    },
    {
      id: 'USR-3',
      name: 'Compliance Auditor',
      email: 'audit@taxbd.gov.bd',
      role: 'auditor',
      department: 'External Audit & Verification',
      lastLogin: 'Yesterday',
    },
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Role-Based Access Control
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
          Admin Users & Permissions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage administrative credentials and role-based permissions (super_admin, tax_officer, auditor).
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Admin Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Assigned Role</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4 text-right">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 font-bold text-slate-900">{u.name}</td>
                  <td className="py-4 px-4 text-slate-600">{u.email}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-xs">{u.department}</td>
                  <td className="py-4 px-4 text-right text-slate-400 text-xs">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
