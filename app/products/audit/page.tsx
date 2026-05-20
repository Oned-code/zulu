import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileSearch, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Free Lead Audit | ZuluFun.io',
  description: 'Get a free, comprehensive analysis of your current lead generation strategy.',
};

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="w-16 h-16 bg-zulu-gold/20 text-zulu-gold rounded-2xl flex items-center justify-center mb-6">
              <FileSearch className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zulu-indigo leading-tight">
              Is your website leaking money?
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed">
              Our AuditAI agent will crawl your site, analyze your local SEO, and identify exactly where you are losing customers to your competitors.
            </p>
            
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
              <h3 className="font-bold text-zulu-indigo mb-4">What you get in the free report:</h3>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-700">Conversion Rate Optimization (CRO) teardown.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-700">Local SEO visibility score in your service area.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-700">Competitor benchmark against top local businesses.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-700">Actionable 30-day roadmap to increase leads.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-zinc-200 shadow-xl lg:mt-0">
            <h3 className="text-2xl font-bold text-zulu-indigo mb-6">Request Free Audit</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input id="website" type="url" required placeholder="https://www.yourbusiness.co.za" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="niche">Primary Service/Industry</Label>
                <select id="niche" className="flex h-12 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zulu-gold" required>
                  <option value="">Select industry...</option>
                  <option value="power">Solar & Energy</option>
                  <option value="security">Security Systems</option>
                  <option value="real_estate">Real Estate</option>
                  <option value="automotive">Automotive</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Primary Operating City</Label>
                <Input id="location" required placeholder="e.g. Pretoria" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input id="email" type="email" required placeholder="john@yourbusiness.co.za" />
              </div>
              <Button type="button" className="w-full bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 h-14 text-lg font-bold mt-4">
                Generate My Report
              </Button>
              <p className="text-xs text-center text-zinc-500 mt-4">
                Our AuditAI agent typically completes reports within 15 minutes. It will be emailed to you directly.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
