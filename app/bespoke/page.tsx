import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, Network, Code, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Bespoke AI Services | ZuluFun.io',
  description: 'Custom AI agent development and integration for enterprise clients.',
};

export default function BespokePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-zinc-950 text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-zulu-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zulu-indigo rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Custom AI Agents for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zulu-gold to-yellow-200">Enterprise.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Need something tailored? We engineer and deploy bespoke autonomous systems that integrate directly into your existing infrastructure.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Capabilities"
            title="What we can build for you."
            description="From simple workflow automations to complex multi-agent architectures."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 hover:border-zulu-gold transition-colors">
              <Bot className="w-10 h-10 text-zulu-indigo mb-6" />
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">Customer Support Agents</h3>
              <p className="text-zinc-600 leading-relaxed">AI systems trained on your specific product documentation to handle L1/L2 support tickets autonomously.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 hover:border-zulu-gold transition-colors">
              <Network className="w-10 h-10 text-zulu-indigo mb-6" />
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">Data Scraping & Enrichment</h3>
              <p className="text-zinc-600 leading-relaxed">Custom pipelines that scrape competitor pricing, enrich lead data, and feed directly into your CRM.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 hover:border-zulu-gold transition-colors">
              <Code className="w-10 h-10 text-zulu-indigo mb-6" />
              <h3 className="text-xl font-bold text-zulu-indigo mb-3">Workflow Automation</h3>
              <p className="text-zinc-600 leading-relaxed">Eliminate repetitive tasks by replacing human operators with tireless, error-free AI agents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Sparkles className="w-12 h-12 text-zulu-gold mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-zulu-indigo mb-4">Start a Conversation</h2>
            <p className="text-zinc-600">Tell us about the bottleneck in your business, and we'll design an AI solution to solve it.</p>
          </div>

          <form className="space-y-6 bg-zinc-50 p-8 md:p-12 rounded-3xl border border-zinc-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Corp" className="bg-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="john@acme.com" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget</Label>
              <select id="budget" className="flex h-12 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zulu-gold">
                <option value="">Select a range...</option>
                <option value="10k-50k">R10,000 - R50,000</option>
                <option value="50k-250k">R50,000 - R250,000</option>
                <option value="250k+">R250,000+</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project Details</Label>
              <textarea 
                id="project" 
                rows={5}
                placeholder="Describe the problem you're trying to solve..."
                className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zulu-gold"
              />
            </div>

            <Button type="button" className="w-full bg-zulu-indigo text-zulu-gold hover:bg-zulu-indigo/90 h-14 text-lg font-bold">
              Submit Inquiry
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
