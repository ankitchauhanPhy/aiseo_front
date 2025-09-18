import React from "react";

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="bg-gray-50 h-full flex flex-col">
            {/* Fixed Header */}
            <div className="px-6 py-4 border-b bg-gray-50 sticky top-0 z-10">
                <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
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
                        This Privacy Policy explains how [Company Legal Name] (“we,”
                        “us,” “our”) collects, uses, shares, and protects personal data
                        when you use our website, platform, and services (the
                        “Services”). It also describes your rights under UK GDPR, EU
                        GDPR, and US state privacy laws (including CPRA/CCPA, VCDPA,
                        CPA, CTDPA, UCPA).
                    </p>
                    <p className="mt-2">
                        For information on how we use cookies and similar technologies,
                        see our separate Cookie Policy.
                    </p>
                    <p className="mt-2">
                        The latest version published on this website is binding. We may
                        update this Policy at any time without obligation to notify
                        users.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Controller & Contact</h2>
                    <div className="text-gray-600 space-y-1">
                        <p>Entity: Pharynx AI, registered in [Jurisdiction]</p>
                        <p>Registered office: [Address]</p>
                        <p>Email (legal): [legal@domain]</p>
                        <p>Email (support): [support@domain]</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        3. What We Collect
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Account data – name, email, password hash, company, role</li>
                        <li>
                            Billing data – payment method tokens, billing address,
                            VAT/tax IDs (via payment processors)
                        </li>
                        <li>
                            Usage data – logs, device/browser info, IP address, crash
                            diagnostics
                        </li>
                        <li>Content data – prompts, queries, analyses you run</li>
                        <li>Support/Comms data – requests, feedback, survey responses</li>
                        <li>Marketing data – email preferences, campaign interactions</li>
                    </ul>
                </section>
                {/* ... repeat for other sections ... */}

                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        4. Purposes & Legal Bases (UK/EU GDPR)
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Provide the Services – contractual necessity</li>
                        <li>Secure and improve the Services – legitimate interests</li>
                        <li>
                            Communicate with you about account/service matters – legitimate
                            interests/contract
                        </li>
                        <li>Send marketing communications – consent</li>
                        <li>Comply with legal obligations – legal obligation</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        5. How We Use AI/LLM Integrations
                    </h2>
                    <p>
                        When you run analyses, your queries and prompts may be processed
                        by third-party large language models (LLMs) or answer engines.
                        Outputs are probabilistic and may be inaccurate. Do not include
                        confidential or special category data unless strictly necessary.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        6. Sharing & Recipients
                    </h2>
                    <p>We may share data with:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                        <li>Processors/sub-processors – hosting, analytics, payments, authentication</li>
                        <li>Affiliates – where necessary to operate the Services</li>
                        <li>Authorities – where required by law</li>
                        <li>Business transfers – in the event of a merger, acquisition, or sale</li>
                    </ul>
                    <p className="mt-2">
                        A current list of sub-processors is available here [link].
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        7. International Transfers
                    </h2>
                    <p>
                        Where personal data is transferred outside the UK/EEA, we use
                        Standard Contractual Clauses (SCCs) and/or the UK IDTA and
                        appropriate safeguards.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        8. Retention
                    </h2>
                    <p>
                        We retain personal data as long as needed to provide the Services
                        and as required by law. After account closure, data is deleted or
                        anonymized within 6 months, subject to backup retention cycles.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        9. Security
                    </h2>
                    <p>
                        We apply technical and organizational measures such as
                        encryption, access controls, monitoring, and backups. No method is
                        100% secure.
                    </p>
                </section>

                  <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                10. Your Rights
              </h2>
              <p className="font-medium mt-2">UK/EU</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Access, rectify, erase, restrict, port, object, and withdraw consent</li>
              </ul>
              <p className="font-medium mt-3">US State Privacy Laws</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Access, correct, delete, and port personal information</li>
                <li>
                  Opt out of the “sale”/“sharing” of data, targeted advertising, and
                  certain profiling
                </li>
              </ul>
              <p className="mt-2">
                We do not sell personal data. Where we “share” personal data (e.g.,
                for targeted advertising), you may opt out via our Do Not Sell/Share
                link or by sending a Global Privacy Control (GPC) signal.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                11. Children & Age Restriction
              </h2>
              <p>
                Our Services are intended for business users only. You must be at
                least 18 years old to use our Services. We do not knowingly collect
                personal data from anyone under 18.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                12. Changes
              </h2>
              <p>
                We may update this Privacy Policy at any time. We are not obliged to
                inform users. The latest version published on this site is binding.
              </p>
            </section>

              <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                13. Severability
              </h2>
              <p>
                If any provision of this Policy is held invalid, the remaining
                provisions remain in full effect.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                14. Contact
              </h2>
              <p>[Company Legal Name], [Address]</p>
              <p>[privacy@domain]</p>
            </section>

            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
