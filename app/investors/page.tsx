import { SectionHeader } from '@/components/shared/section-header';
import { TrendingUp, BarChart3, PieChart, LineChart } from 'lucide-react';

export const metadata = {
  title: 'Investor Relations | ZuluFun.io',
  description: 'Company metrics, growth data, and investor information.',
};

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-zulu-indigo text-white py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Investor <span className="text-zulu-gold">Relations</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Transparent metrics and growth data for the autonomous engine powering Africa's B2B marketplace.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zulu-indigo/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-zulu-indigo" />
              </div>
              <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+145%</span>
            </div>
            <h4 className="text-zinc-500 font-medium mb-1">Monthly Recurring Revenue</h4>
            <p className="text-3xl font-extrabold text-zulu-indigo">R479k</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zulu-gold/20 rounded-xl">
                <PieChart className="w-6 h-6 text-zulu-gold" />
              </div>
              <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+210%</span>
            </div>
            <h4 className="text-zinc-500 font-medium mb-1">Active B2B Clients</h4>
            <p className="text-3xl font-extrabold text-zulu-indigo">230</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zulu-red/10 rounded-xl">
                <BarChart3 className="w-6 h-6 text-zulu-red" />
              </div>
              <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+85%</span>
            </div>
            <h4 className="text-zinc-500 font-medium mb-1">Monthly Leads Processed</h4>
            <p className="text-3xl font-extrabold text-zulu-indigo">1,530</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zinc-100 rounded-xl">
                <LineChart className="w-6 h-6 text-zinc-600" />
              </div>
              <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">-2.1%</span>
            </div>
            <h4 className="text-zinc-500 font-medium mb-1">Client Churn Rate</h4>
            <p className="text-3xl font-extrabold text-zulu-indigo">8%</p>
          </div>
        </div>

        {/* Growth Table */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden mb-20">
          <div className="p-8 border-b border-zinc-200">
            <h3 className="text-2xl font-bold text-zulu-indigo">Revenue Trajectory (First 6 Months)</h3>
            <p className="text-zinc-500">Projected vs Actual growth model.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 text-zinc-500 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Month</th>
                  <th className="p-4 font-semibold">B2B Leads</th>
                  <th className="p-4 font-semibold">SaaS/Ads</th>
                  <th className="p-4 font-semibold">Total Revenue</th>
                  <th className="p-4 font-semibold">Daily Avg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {[
                  { m: '1', b2b: 'R5,000', saas: 'R2,500', total: 'R7,500', daily: 'R250' },
                  { m: '2', b2b: 'R25,000', saas: 'R18,000', total: 'R43,000', daily: 'R1,433' },
                  { m: '3', b2b: 'R80,000', saas: 'R58,000', total: 'R138,000', daily: 'R4,600' },
                  { m: '4', b2b: 'R160,000', saas: 'R100,000', total: 'R260,000', daily: 'R8,667' },
                  { m: '5', b2b: 'R230,000', saas: 'R139,000', total: 'R369,000', daily: 'R12,300' },
                  { m: '6 (Target)', b2b: 'R299,000', saas: 'R180,000', total: 'R479,000', daily: 'R15,967' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-4 font-medium text-zulu-indigo">Month {row.m}</td>
                    <td className="p-4 text-zinc-600">{row.b2b}</td>
                    <td className="p-4 text-zinc-600">{row.saas}</td>
                    <td className="p-4 font-bold text-zulu-indigo">{row.total}</td>
                    <td className="p-4 text-zulu-gold font-semibold">{row.daily}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="bg-zulu-indigo rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,183,64,0.15)_0%,_transparent_60%)]" />
          <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Access the Investor Portal</h3>
          <p className="text-zinc-300 max-w-lg mx-auto mb-8 relative z-10">
            Accredited investors can request access to our real-time data room, cap table, and live agent performance metrics.
          </p>
          <a href="mailto:invest@zulufun.io" className="inline-block bg-zulu-gold text-zulu-indigo px-8 py-4 rounded-xl font-bold text-lg hover:bg-zulu-gold/90 transition-all relative z-10 shadow-lg shadow-zulu-gold/20">
            Request Access
          </a>
        </div>

      </div>
    </div>
  );
}
