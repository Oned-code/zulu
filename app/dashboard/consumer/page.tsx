import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Home, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Consumer Dashboard | ZuluFun.io',
  description: 'Manage your quote requests and find trusted professionals.',
};

export default function ConsumerDashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zulu-indigo">My Requests</h1>
            <p className="text-zinc-500 mt-1">Manage your quotes and connected professionals.</p>
          </div>
          <Button asChild className="bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold">
            <Link href="/quotes">New Request</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Request Card */}
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-zulu-indigo/10 rounded-lg">
                    <Home className="w-5 h-5 text-zulu-indigo" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zulu-indigo">Solar Panel Installation</h3>
                    <p className="text-xs text-zinc-500">Requested on Oct 24, 2026</p>
                  </div>
                </div>
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>Active</span>
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-zinc-900 text-sm">Matched Professionals (2/4)</h4>
                  <span className="text-xs text-zinc-500 flex items-center"><Clock className="w-3 h-3 mr-1"/> Waiting for 2 more...</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-zinc-100 rounded-xl hover:border-zulu-gold/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-500">SP</div>
                      <div>
                        <h5 className="font-bold text-zinc-900 text-sm">SunPower Solutions JHB</h5>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Installer
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">View Contact Info</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-zinc-100 rounded-xl hover:border-zulu-gold/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-500">EE</div>
                      <div>
                        <h5 className="font-bold text-zinc-900 text-sm">EcoEnergy Africa</h5>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Installer
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">View Contact Info</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Request Card */}
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden opacity-75">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-zinc-100 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-700">Home Alarm System</h3>
                    <p className="text-xs text-zinc-400">Requested on Sep 12, 2026</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-semibold rounded-full">
                  Completed
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-zinc-500">You connected with 3 professionals for this request.</p>
                <Button variant="link" className="text-zulu-indigo p-0 h-auto mt-2">View details</Button>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="font-bold text-zulu-indigo mb-4">Profile Completeness</h3>
              <div className="h-2 w-full bg-zinc-100 rounded-full mb-2 overflow-hidden">
                <div className="h-full bg-green-500 w-[85%]" />
              </div>
              <p className="text-xs text-zinc-500 mb-4">85% Complete</p>
              <Button variant="outline" className="w-full text-sm">Complete Profile</Button>
            </div>

            <div className="bg-zulu-indigo p-6 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,183,64,0.2)_0%,_transparent_60%)]" />
              <h3 className="font-bold text-zulu-gold mb-2 relative z-10">Need a different service?</h3>
              <p className="text-sm text-zinc-300 mb-4 relative z-10">We have thousands of verified pros ready to help.</p>
              <Button className="w-full bg-white text-zulu-indigo hover:bg-zinc-100 font-bold relative z-10">
                Browse Categories
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
