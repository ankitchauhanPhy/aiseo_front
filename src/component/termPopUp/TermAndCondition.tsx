import React from "react";

const TermsConditionsPage: React.FC = () => {
    return (
        <div className="bg-gray-50 h-full flex flex-col">
            {/* Fixed Header */}
            <div className="px-6 py-4 border-b bg-gray-50 sticky top-0 z-10">
                <h1 className="text-3xl font-bold text-gray-800">Terms & Conditions</h1>
                <p className="text-[#7C3BED] font-medium text-sm mt-1">
                    Last updated: September 15th, 2025
                </p>
            </div>

            {/* Scrollable Content */}
            <div className="px-6 py-4 overflow-y-auto flex-1 space-y-8 rounded-lg ">
                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        1. Introduction
                    </h2>
                    <p>
                        These Terms of Service ("Terms") govern access to and use of the
                        website, platform, and services (the "Services") provided by
                        Pharynx AI ("Company," "we," "us," "our"). By creating an
                        account, starting a free trial, or using the Services, you agree
                        to these Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Who We Are & Contact</h2>
                    <div className="text-gray-600 space-y-1">
                        <p>Entity: Pharynx AI, registered in [Jurisdiction]</p>
                        <p>Registered office: [Address]</p>
                        <p>Email (legal): [legal@domain]</p>
                        <p>Email (support): [support@domain]</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Changes to Terms</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We may update these Terms at any time. We are not obliged to notify users. The latest version published on our website is binding.
                    </p>
                </section>
                {/* ... repeat for other sections ... */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        4. Eligibility & Account
                    </h2>
                    <p>• You must be 18 years or older to use the Services</p>
                    <p>• You must provide accurate and current information</p>
                    <p>• You are responsible for safeguarding your login credentials and all activity under your account</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Free Trials, Beta & Evaluations</h2>
                    <div className="text-gray-600 space-y-1">
                        <p>• We may offer free trials with limited features, duration, or usage</p>
                        <p>• We may modify or withdraw free trials at any time</p>
                        <p>• Beta/early-access features are provided "as is" and may be changed or discontinued</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Subscriptions, Billing & Taxes</h2>
                    <div className="text-gray-600 leading-relaxed">
                        <p>• Subscription details and fees are shown on our Pricing page</p>
                        <p>• Subscriptions auto-renew unless cancelled before renewal</p>
                        <p>• Fees exclude applicable taxes; you are responsible for them</p>
                        <p>• Cancellation: You may cancel anytime in the app; service continues until the end of the billing cycle</p>
                        <p>• Refunds: Unless required by law, no prorated refunds are offered</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Acceptable Use</h2>
                    <div className="text-gray-600 leading-relaxed">
                        <p>• Violate laws or regulations</p>
                        <p>• Infringe intellectual property or privacy rights</p>
                        <p>• Probe, scan, or test systems without authorization</p>
                        <p>• Interfere with or disrupt the Services</p>
                        <p>• Use the Services to generate or disseminate malware, illegal content, or disinformation</p>
                        <p>• Circumvent usage limits</p>
                        <p>• Resell, sublicense, or frame the Services without written consent</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Description of the Services</h2>
                    <p className="text-gray-600 leading-relaxed">
                        The Services consist of an online software platform designed to provide analytics and insights into brand visibility across AI-powered answer engines and large language models (LLMs). Features may include ranking analysis, mention tracking, competitor benchmarking, and optimization recommendations.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Customer Data, AI Outputs & Rights</h2>
                    <div className="space-y-3">
                        <div>
                            <h3 className="font-medium text-gray-700 mb-1">9.1 Definition & Ownership</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                "Customer Data" means information, content, prompts, queries, brands, or results you submit to or generate via the Services. You retain ownership of Customer Data, subject to third-party provider terms.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700 mb-1">9.2 License to Us</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                You grant us a worldwide, royalty-free, non-exclusive license to host, process, display, and transmit Customer Data as necessary to provide, maintain, secure, and improve the Services.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700 mb-1">9.3 Confidentiality</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We will treat Customer Data as confidential and will not disclose it except as required to provide the Services, as permitted by these Terms, as required by law, or with your consent.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Intellectual Property & Feedback</h2>
                    <div className="text-gray-600 space-y-2">
                        <p>• We and our licensors own the Services, software, UI/UX, documentation, and all related IP</p>
                        <p>• You may not copy, modify, or reverse-engineer them</p>
                        <p>• If you provide feedback or suggestions, you grant us a royalty-free, perpetual license to use them</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Security</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We use reasonable technical and organizational measures (encryption, access controls, monitoring, backups). No system is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Limitation of Liability</h2>
                    <div className="text-gray-600 space-y-2">
                        <p>• We are not liable for indirect, incidental, consequential, special, or punitive damages</p>
                        <p>• Our aggregate liability is limited to the fees paid by you in the 12 months before the claim</p>
                        <p>• If you are on a free trial, liability is limited to £0</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">13. Governing Law</h2>
                    <p className="text-gray-600 leading-relaxed">
                        These Terms are governed by the laws of England & Wales. Courts of England & Wales have exclusive jurisdiction.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Providers</h2>
                    <p className="text-gray-600 mb-3">Our Services may integrate with third-party providers including:</p>
                    <div className="text-gray-600 space-y-1 text-sm">
                        <p>• OpenAI (ChatGPT, GPT models)</p>
                        <p>• Anthropic (Claude)</p>
                        <p>• Google (Gemini / Vertex AI)</p>
                        <p>• Perplexity AI</p>
                        <p>• Microsoft (Copilot, Azure OpenAI Service)</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TermsConditionsPage;
