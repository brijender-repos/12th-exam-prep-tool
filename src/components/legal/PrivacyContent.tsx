export function PrivacyContent() {
  return (
    <div className="space-y-8">
      <div className="border-b pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-4 text-lg text-gray-600">Last updated: January 2024</p>
      </div>

      <div className="prose prose-primary max-w-none">
        <h2 className="text-2xl font-semibold text-primary">1. Information We Collect</h2>
        <p className="text-gray-600">We collect information that you provide directly to us, including:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Name and contact information</li>
          <li>Account credentials</li>
          <li>Educational information</li>
          <li>Usage data and test results</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mt-8">2. How We Use Your Information</h2>
        <p className="text-gray-600">We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Provide and maintain our services</li>
          <li>Improve and personalize your experience</li>
          <li>Analyze usage patterns and trends</li>
          <li>Communicate with you about our services</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mt-8">3. Information Sharing</h2>
        <p className="text-gray-600">We do not sell or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and safety</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mt-8">4. Data Security</h2>
        <p className="text-gray-600">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

        <h2 className="text-2xl font-semibold text-primary mt-8">5. Your Rights</h2>
        <p className="text-gray-600">You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mt-8">6. Contact Us</h2>
        <div className="bg-gray-50 p-6 rounded-lg mt-4">
          <p className="text-gray-600">If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="text-primary font-medium mt-2">privacy@cbsescholars.in</p>
        </div>
      </div>
    </div>
  );
}