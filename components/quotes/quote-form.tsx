'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface QuoteFormProps {
  niche: string;
}

export function QuoteForm({ niche }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ businessesNotified: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const locationValue = String(formData.get('location') || '');

    const payload = {
      niche,
      title: formData.get('serviceType') === 'general'
        ? `General ${niche} inquiry`
        : `${formData.get('serviceType')} — ${niche}`,
      description: formData.get('details') || '',
      requirements: formData.get('details') || '',
      location: locationValue,
      city: locationValue.split(',')[0]?.trim() || '',
      province: '',
      budget_min: null,
      budget_max: null,
      timeline: formData.get('timeline') || 'asap',
      preferred_contact: 'email',
      consumer_name: `${formData.get('firstName')} ${formData.get('lastName')}`.trim(),
      consumer_email: formData.get('email') || '',
      consumer_phone: formData.get('phone') || '',
    };

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      setResult(data);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-green-100">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-zulu-indigo mb-2">Request Received!</h3>
        <p className="text-zinc-600 mb-2">
          Your quote request has been submitted successfully.
        </p>
        {result?.businessesNotified ? (
          <p className="text-sm text-green-600 font-medium mb-4">
            ✓ {result.businessesNotified} business{result.businessesNotified !== 1 ? 'es' : ''} notified in your area
          </p>
        ) : null}
        <p className="text-sm text-zinc-500 mb-6">
          Check your email for confirmation. Businesses will contact you directly.
        </p>
        <Button onClick={() => window.location.href = '/dashboard'} className="w-full bg-zulu-indigo text-zulu-gold hover:bg-zulu-indigo/90">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-zinc-100">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-zulu-indigo">
          {step === 1 ? 'Project Details' : 'Contact Information'}
        </h3>
        <span className="text-sm font-medium text-zinc-400">Step {step} of 2</span>
      </div>

      <div className="h-1 w-full bg-zinc-100 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-zulu-gold transition-all duration-300"
          style={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit}>
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Specific Service Needed</Label>
              <select
                id="serviceType"
                name="serviceType"
                className="flex h-12 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zulu-gold focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select a service...</option>
                {niche === 'power' && (
                  <>
                    <option value="solar_panels">Solar Panels Installation</option>
                    <option value="inverter">Inverter & Battery Backup</option>
                    <option value="maintenance">Maintenance & Repairs</option>
                  </>
                )}
                {niche === 'security' && (
                  <>
                    <option value="cctv">CCTV Camera System</option>
                    <option value="alarm">Alarm System</option>
                    <option value="access">Access Control</option>
                  </>
                )}
                {niche === 'real_estate' && (
                  <>
                    <option value="buy">Buying Property</option>
                    <option value="sell">Selling Property</option>
                    <option value="rental">Rental / Letting</option>
                    <option value="valuation">Property Valuation</option>
                  </>
                )}
                {niche === 'automotive' && (
                  <>
                    <option value="service">Full Service</option>
                    <option value="repairs">Repairs & Diagnostics</option>
                    <option value="brakes">Brake Replacement</option>
                    <option value="suspension">Suspension Work</option>
                  </>
                )}
                {niche === 'education' && (
                  <>
                    <option value="maths_tutor">Maths Tutor</option>
                    <option value="science_tutor">Science Tutor</option>
                    <option value="online_tutoring">Online Tutoring</option>
                    <option value="homework_help">Homework Help</option>
                  </>
                )}
                {niche === 'crypto' && (
                  <>
                    <option value="exchange">Exchange Integration</option>
                    <option value="wallet">Wallet Development</option>
                    <option value="consulting">Blockchain Consulting</option>
                  </>
                )}
                <option value="general">General Inquiry</option>
                <option value="custom">Custom Requirement</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <select
                id="timeline"
                name="timeline"
                className="flex h-12 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zulu-gold focus-visible:border-transparent"
                required
              >
                <option value="">When do you need this?</option>
                <option value="asap">As soon as possible</option>
                <option value="1_month">Within 1 month</option>
                <option value="3_months">Within 3 months</option>
                <option value="planning">Just planning/researching</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <textarea
                id="details"
                name="details"
                rows={4}
                className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zulu-gold focus-visible:border-transparent"
                placeholder="Tell us more about your project..."
              />
            </div>

            <Button type="submit" className="w-full bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 h-12 text-lg font-semibold">
              Next Step
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" required placeholder="082 123 4567" />
              <p className="text-xs text-zinc-500">We'll send a PIN to verify your number.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">City / Suburb</Label>
              <Input id="location" name="location" required placeholder="Sandton, Johannesburg" />
            </div>

            <div className="flex items-start space-x-3 mt-4 mb-6">
              <input type="checkbox" id="terms" name="terms" required className="mt-1 h-4 w-4 rounded border-zinc-300 text-zulu-gold focus:ring-zulu-gold" />
              <label htmlFor="terms" className="text-xs text-zinc-600 leading-relaxed">
                I agree to the Terms of Service and Privacy Policy. I understand that up to 4 service providers may contact me regarding my request.
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3 h-12 border-zinc-200">
                Back
              </Button>
              <Button type="submit" disabled={loading} className="w-2/3 bg-zulu-indigo text-zulu-gold hover:bg-zulu-indigo/90 h-12 text-lg font-semibold">
                {loading ? 'Submitting...' : 'Get Quotes Now'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
