import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Activity, ShieldAlert, DollarSign, Bot, Users, Database } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | ZuluFun.io',
  description: 'CEO Overview and Agent Status.',
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 border border-white/10 mb-2">
              <ShieldAlert className="w-3 h-3 text-red-500" />
              <span>CEO Clearance Level</span>
            </div>
            <h1 className="text-3xl font-bold text-white">System Command Center</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 bg-transparent">
              Export Logs
            </Button>
            <Button className="bg-red-600 text-white hover:bg-red-700 font-bold">
              Emergency Halt
            </Button>
          </div>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-zinc-800">
            <p className="text-sm font-medium text-zinc-500 mb-1">Total Daily Revenue</p>
            <h3 className="text-2xl font-bold text-green-400">R 15,967</h3>
            <p className="text-xs text-green-500 mt-2">+2.4% vs yesterday</p>
          </div>
          <div className="bg-[#161b22] p-6 rounded-2xl border border-zinc-800">
            <p className="text-sm font-medium text-zinc-500 mb-1">Active Leads (24h)</p>
            <h3 className="text-2xl font-bold text-white">142</h3>
            <p className="text-xs text-zinc-500 mt-2">100% routing success</p>
          </div>
          <div className="bg-[#161b22] p-6 rounded-2xl border border-zinc-800">
            <p className="text-sm font-medium text-zinc-500 mb-1">B2B Wallet Balances</p>
            <h3 className="text-2xl font-bold text-white">R 412,500</h3>
            <p className="text-xs text-zinc-500 mt-2">Held in escrow</p>
          </div>
          <div className="bg-[#161b22] p-6 rounded-2xl border border-zinc-800">
            <p className="text-sm font-medium text-zinc-500 mb-1">Agent Error Rate</p>
            <h3 className="text-2xl font-bold text-red-400">0.01%</h3>
            <p className="text-xs text-zinc-500 mt-2">2 minor warnings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Agent Status Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#161b22] rounded-2xl border border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-[#0d1117]">
                <h3 className="font-bold text-white flex items-center"><Activity className="w-5 h-5 mr-2 text-zulu-gold"/> Sub-Agent Fleet Status</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-[#0d1117]/50 text-zinc-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 font-semibold">Agent ID</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Current Task</th>
                      <th className="p-4 font-semibold">Uptime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-sm">
                    <tr className="hover:bg-zinc-800/50">
                      <td className="p-4 font-bold text-white flex items-center"><Bot className="w-4 h-4 mr-2 text-blue-400"/> ContentAI</td>
                      <td className="p-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400">ONLINE</span></td>
                      <td className="p-4 text-zinc-400">Writing "Solar Trends 2026"</td>
                      <td className="p-4 text-zinc-500 font-mono">45d 12h</td>
                    </tr>
                    <tr className="hover:bg-zinc-800/50">
                      <td className="p-4 font-bold text-white flex items-center"><Bot className="w-4 h-4 mr-2 text-zulu-gold"/> LeadAI</td>
                      <td className="p-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400">ONLINE</span></td>
                      <td className="p-4 text-zinc-400">Routing Lead #89211</td>
                      <td className="p-4 text-zinc-500 font-mono">112d 4h</td>
                    </tr>
                    <tr className="hover:bg-zinc-800/50">
                      <td className="p-4 font-bold text-white flex items-center"><Bot className="w-4 h-4 mr-2 text-red-400"/> AdAI</td>
                      <td className="p-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-400">OPTIMIZING</span></td>
                      <td className="p-4 text-zinc-400">Adjusting PMax bids (Johannesburg)</td>
                      <td className="p-4 text-zinc-500 font-mono">12d 8h</td>
                    </tr>
                    <tr className="hover:bg-zinc-800/50">
                      <td className="p-4 font-bold text-white flex items-center"><Bot className="w-4 h-4 mr-2 text-purple-400"/> SupportAI</td>
                      <td className="p-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400">ONLINE</span></td>
                      <td className="p-4 text-zinc-400">Resolving Ticket #4412</td>
                      <td className="p-4 text-zinc-500 font-mono">60d 1h</td>
                    </tr>
                    <tr className="hover:bg-zinc-800/50">
                      <td className="p-4 font-bold text-white flex items-center"><Bot className="w-4 h-4 mr-2 text-zinc-400"/> ComplianceAI</td>
                      <td className="p-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400">ONLINE</span></td>
                      <td className="p-4 text-zinc-400">Auditing POPIA logs</td>
                      <td className="p-4 text-zinc-500 font-mono">112d 4h</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="space-y-6">
            <div className="bg-[#161b22] p-6 rounded-2xl border border-zinc-800">
              <h3 className="font-bold text-white mb-4 flex items-center"><Database className="w-4 h-4 mr-2" /> System Health</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Database Load (Supabase)</span>
                    <span className="text-white">12%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[12%]" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">API Rate Limits</span>
                    <span className="text-white">45%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[45%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">OpenRouter API Credits</span>
                    <span className="text-white">$450.21</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[80%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#161b22] p-6 rounded-2xl border border-zinc-800">
              <h3 className="font-bold text-white mb-4">Manual Overrides</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-[#0d1117]">
                  <Database className="w-4 h-4 mr-2" /> Force Supabase Sync
                </Button>
                <Button variant="outline" className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-[#0d1117]">
                  <DollarSign className="w-4 h-4 mr-2" /> Approve Pending Payouts
                </Button>
                <Button variant="outline" className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-[#0d1117]">
                  <Users className="w-4 h-4 mr-2" /> Review Flagged Accounts
                </Button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
