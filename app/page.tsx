// app/page.tsx

import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Let's Grow Your Business Together
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with us today and discover how we can help you capture
            more leads and automate your sales process.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Contact Us
          </h2>
          <ContactForm />
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            🔒 Your information is secure and will never be shared
          </p>
        </div>
      </div>
    </main>
  );
}
