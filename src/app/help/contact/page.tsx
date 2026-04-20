'use client';
import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    // Simulate submission
    await new Promise(r => setTimeout(r, 1200));
    toast.success('Your message has been sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <Container className="py-12 md:py-20 max-w-5xl">
      <div className="flex flex-col gap-10">

        <div className="space-y-4 text-center">
          <Title className="text-3xl md:text-5xl font-bold">Contact Us</Title>
          <p className="text-gray-500 font-medium max-w-xl mx-auto">
            Have a question or need help? Our friendly support team is here for you — reach out anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left: Contact details */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Get In Touch</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Email</p>
                  <p className="text-sm text-gray-600 mt-0.5">support@babyshop.com</p>
                  <p className="text-xs text-gray-400 mt-1">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="bg-green-100 text-green-600 p-3 rounded-xl shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600 mt-0.5">1-800-BABYSHOP</p>
                  <p className="text-xs text-gray-400 mt-1">Mon–Fri, 9am–6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl shrink-0">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Live Chat</p>
                  <p className="text-sm text-gray-600 mt-0.5">Chat with us in real time</p>
                  <p className="text-xs text-gray-400 mt-1">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="bg-orange-100 text-orange-600 p-3 rounded-xl shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Address</p>
                  <p className="text-sm text-gray-600 mt-0.5">123 Baby Street</p>
                  <p className="text-sm text-gray-600">Child City, BC 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-gray-200 text-gray-600 p-3 rounded-xl shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Business Hours</p>
                  <p className="text-sm text-gray-600 mt-0.5">Mon–Fri: 9am – 6pm EST</p>
                  <p className="text-sm text-gray-600">Sat: 10am – 4pm EST</p>
                  <p className="text-sm text-gray-500">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-babyshopSky focus:ring-2 focus:ring-babyshopSky/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-babyshopSky focus:ring-2 focus:ring-babyshopSky/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-babyshopSky focus:ring-2 focus:ring-babyshopSky/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message <span className="text-red-400">*</span></label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your issue or question in detail..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-babyshopSky focus:ring-2 focus:ring-babyshopSky/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-babyshopSky hover:bg-babyshopSky/90 text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
