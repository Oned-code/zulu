import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Target, Users, Wallet, TrendingUp, Settings, Filter, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Business Dashboard | ZuluFun.io',
  description: 'Manage your leads, credits, and account settings.',
};

export default function BusinessDashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zulu-indigo">Dashboard</h1>
            <p className="text-zinc-500 mt-1">SunPower Solutions JHB</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-zinc-200 flex items-center space-x-3 shadow-sm">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Available Balance</p>
                <p className="text-sm font-bold text-zulu-indigo">R 2,450.00</p>
              </div>
            </div>
            <Button className="bg-zulu-indigo text-zulu-gold hover:bg-zulu-indigo/90">
              Top Up
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">New Leads (This Week)</p>
              <h3 className="text-2xl font-bold text-zulu-indigo">14</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Total Spent (This Month)</p>
              <h3 className="text-2xl font-bold text-zulu-indigo">R 3,200</h3>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Win Rate</p>
              <h3 className="text-2xl font-bold text-zulu-indigo">38%</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Lead Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <h3 className="font-bold text-zulu-indigo">Latest Matches</h3>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <Filter className="w-3 h-3 mr-2" /> Filter
                </Button>
              </div>
              <div className="divide-y divide-zinc-100">
                
                {/* Lead Item (Purchased) */}
                <div className="p-6 bg-green-50/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zulu-indigo/10 text-zulu-indigo mb-2">
                        Solar Installation
                      </span>
                      <h4 className="font-bold text-zinc-900">Residential 5kW System Setup</h4>
                      <p className="text-xs text-zinc-500 mt-1">Sandton, Johannesburg • Just now</p>
                    </div>
                    <span className="font-bold text-zulu-indigo bg-white px-3 py-1 rounded-lg border border-zinc-200 shadow-sm">
                      Purchased
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm bg-white p-4 rounded-xl border border-zinc-100">
                    <div>
                      <span className="block text-zinc-500 text-xs mb-1">Contact Name</span>
                      <span className="font-medium">Sarah Jenkins</span>
                    </div>
                    <div>
                      <span className="block text-zinc-500 text-xs mb-1">Phone Number</span>
                      <span className="font-medium text-zulu-indigo">082 *** 4567 <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-1">Verified</span></span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700">View Full Details</Button>
                </div>

                {/* Lead Item (Available to Buy) */}
                <div className="p-6 hover:bg-zinc-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zulu-indigo/10 text-zulu-indigo mb-2">
                        Inverter Backup
                      </span>
                      <h4 className="font-bold text-zinc-900">Battery Backup for Small Office</h4>
                      <p className="text-xs text-zinc-500 mt-1">Midrand, Gauteng • 15m ago</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xl font-bold text-zulu-indigo">R 200</span>
                      <span className="text-xs text-zinc-400">Duo Lead (1/2 sold)</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 mb-4 bg-zinc-50 p-3 rounded-lg italic">
                    "Looking to install a 5kW inverter with lithium batteries for our 4-person office. Need it done ASAP."
                  </p>
                  <Button className="w-full bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold">Buy Lead for R 200</Button>
                </div>

              </div>
              <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 text-center">
                <Button variant="link" className="text-zulu-indigo">View All Leads</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Auto-buy settings */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-zulu-indigo">Auto-Buy Filters</h3>
                <Link href="/dashboard/business/settings" className="text-zinc-400 hover:text-zulu-indigo">
                  <Settings className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Status</p>
                    <p className="text-xs text-zinc-500">Currently Active</p>
                  </div>
                  <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-600">Daily Cap</span>
                    <span className="font-medium text-zulu-indigo">R 500 / day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Areas</span>
                    <span className="font-medium text-zulu-indigo">Sandton, Midrand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support / Help */}
            <div className="bg-zinc-900 p-6 rounded-2xl text-white">
              <h3 className="font-bold mb-2">Need assistance?</h3>
              <p className="text-sm text-zinc-400 mb-4">Our SupportAI agent is available 24/7 to help with refunds, account issues, or technical support.</p>
              <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Contact Support
              </Button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
