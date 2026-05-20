import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Code2, Terminal, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Zulu API | ZuluFun.io',
  description: 'Enterprise-grade API access to our complete African business dataset and real-time lead feeds.',
};

export default function APIPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full text-sm font-mono text-zinc-400 border border-white/10 mb-6">
                <Code2 className="w-4 h-4 text-zulu-gold" />
                <span>v1.0.0 Stable</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono tracking-tight">
                Connect to the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zulu-gold to-yellow-200">Engine.</span>
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                Build internal tools, enrich your CRM, or pipe our real-time lead feed directly into your custom software using the Zulu API.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200 font-bold h-14 px-8 font-mono">
                  <Link href="/bespoke">Request API Key</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-bold h-14 px-8 font-mono bg-transparent">
                  <Link href="#docs">View Docs</Link>
                </Button>
              </div>
            </div>

            {/* Code Snippet Block */}
            <div className="bg-[#0d1117] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden hidden lg:block">
              <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-zinc-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto text-xs font-mono text-zinc-500">fetch-leads.js</div>
              </div>
              <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                <pre>
                  <span className="text-pink-400">const</span> fetch = <span className="text-blue-400">require</span>(<span className="text-green-300">'node-fetch'</span>);{'\n\n'}
                  <span className="text-pink-400">async function</span> <span className="text-blue-300">getLatestLeads</span>() {'{\n'}
                  {'  '}<span className="text-pink-400">const</span> response = <span className="text-pink-400">await</span> <span className="text-blue-300">fetch</span>(<span className="text-green-300">'https://api.zulufun.io/v1/leads'</span>, {'{\n'}
                  {'    '}headers: {'{\n'}
                  {'      '}<span className="text-green-300">'Authorization'</span>: <span className="text-green-300">'Bearer YOUR_API_KEY'</span>,{'\n'}
                  {'      '}<span className="text-green-300">'Content-Type'</span>: <span className="text-green-300">'application/json'</span>{'\n'}
                  {'    }\n'}
                  {'  });\n'}
                  {'  '}<span className="text-pink-400">const</span> data = <span className="text-pink-400">await</span> response.<span className="text-blue-300">json</span>();{'\n'}
                  {'  '}<span className="text-zinc-500">// Returns strictly verified, scored leads</span>{'\n'}
                  {'  '}<span className="text-pink-400">return</span> data.leads;{'\n'}
                  {'}\n'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Terminal className="w-8 h-8 text-zulu-gold mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">RESTful Architecture</h3>
              <p className="text-zinc-400 leading-relaxed">Predictable, resource-oriented URLs. JSON-encoded responses with standard HTTP response codes.</p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Database className="w-8 h-8 text-zulu-gold mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Webhooks</h3>
              <p className="text-zinc-400 leading-relaxed">Subscribe to real-time events. Get HTTP POST payloads instantly when a lead matches your criteria.</p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
              <ShieldCheck className="w-8 h-8 text-zulu-gold mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">99.9% Uptime SLA</h3>
              <p className="text-zinc-400 leading-relaxed">Enterprise-grade reliability built on distributed architecture to ensure you never miss a lead.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
