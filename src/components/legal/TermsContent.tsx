export function TermsContent() {
  return (
    <div className="space-y-8">
      <div className="border-b pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-4 text-lg text-gray-600">Last updated: January 2024</p>
      </div>

      <div className="prose prose-primary max-w-none">
        <h2 className="text-2xl font-semibold text-primary">1. Acceptance of Terms</h2>
        <p className="text-gray-600">By accessing and using CBSE Scholars, you accept and agree to be bound by these Terms of Service.</p>

        <h2 className="text-2xl font-semibold text-primary mt-8">2. User Accounts</h2>
        <p className="text-gray-600">You are responsible for:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Maintaining the confidentiality of your account</li>
          <li>All activities that occur under your account</li>
          <li>Notifying us of any unauthorized use</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mt-8">3. Content and Conduct</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600 font-medium mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Share account credentials</li>
            <li>Distribute or copy content without permission</li>
            <li>Use the service for unauthorized purposes</li>
            <li>Attempt to circumvent any security measures</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-primary mt-8">4. Intellectual Property</h2>
        <p className="text-gray-600">All content, features, and functionality are owned by CBSE Scholars and are protected by copyright and other intellectual property laws.</p>

        <h2 className="text-2xl font-semibold text-primary mt-8">5. Payment Terms</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Payments are non-refundable unless otherwise stated</li>
            <li>We reserve the right to modify pricing with notice</li>
            <li>Subscription terms are subject to change</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-primary mt-8">6. Termination</h2>
        <p className="text-gray-600">We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any violation of these Terms.</p>

        <h2 className="text-2xl font-semibold text-primary mt-8">7. Disclaimer</h2>
        <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
          <p className="text-gray-600">The service is provided "as is" without warranties of any kind, either express or implied.</p>
        </div>

        <h2 className="text-2xl font-semibold text-primary mt-8">8. Contact Information</h2>
        <div className="bg-gray-50 p-6 rounded-lg mt-4">
          <p className="text-gray-600">For any questions about these Terms, please contact us at:</p>
          <p className="text-primary font-medium mt-2">legal@cbsescholars.in</p>
        </div>
      </div>
    </div>
  );
}