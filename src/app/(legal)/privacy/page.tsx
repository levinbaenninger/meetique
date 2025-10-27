import { LegalContent } from "@/modules/legal/ui/components/legal-content";
import { LegalHeader } from "@/modules/legal/ui/components/legal-header";
import { LegalHeading } from "@/modules/legal/ui/components/legal-heading";
import { LegalList } from "@/modules/legal/ui/components/legal-list";
import { LegalParagraph } from "@/modules/legal/ui/components/legal-paragraph";
import { LegalSection } from "@/modules/legal/ui/components/legal-section";

export default function PrivacyPolicy() {
  return (
    <div className="space-y-8">
      <LegalHeader title="Privacy Policy" />

      <LegalContent>
        <LegalSection>
          <LegalHeading>1. Introduction</LegalHeading>
          <LegalParagraph>
            Meetique ("we", "our", or "us") respects your privacy and is
            committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our Service.
          </LegalParagraph>
          <LegalParagraph>
            This policy complies with the Swiss Federal Act on Data Protection
            (FADP) and the EU General Data Protection Regulation (GDPR).
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>2. Information We Collect</LegalHeading>
          <LegalHeading level={3}>2.1 Information You Provide</LegalHeading>
          <LegalList>
            <li>Account information (name, email address, password)</li>
            <li>Profile information and preferences</li>
            <li>Payment information (processed by Polar)</li>
            <li>Communications with us</li>
          </LegalList>

          <LegalHeading level={3}>
            2.2 Automatically Collected Information
          </LegalHeading>
          <LegalList>
            <li>
              Device information (IP address, browser type, operating system)
            </li>
            <li>Usage data (pages visited, features used, time spent)</li>
            <li>Cookies and similar tracking technologies</li>
          </LegalList>

          <LegalHeading level={3}>2.3 Meeting Content and Data</LegalHeading>
          <LegalList>
            <li>Video and audio recordings</li>
            <li>Meeting transcripts generated through our AI services</li>
            <li>Meeting metadata (participants, duration, timestamps)</li>
          </LegalList>
        </LegalSection>

        <LegalSection>
          <LegalHeading>3. How We Use Your Information</LegalHeading>
          <LegalParagraph>We use your information to:</LegalParagraph>
          <LegalList>
            <li>Provide, maintain, and improve our Service</li>
            <li>Process your transactions and manage your subscriptions</li>
            <li>Generate meeting transcripts and AI-powered insights</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your requests and inquiries</li>
            <li>
              Detect, prevent, and address technical issues and security threats
            </li>
            <li>Comply with legal obligations</li>
            <li>Analyze usage patterns to improve user experience</li>
          </LegalList>
        </LegalSection>

        <LegalSection>
          <LegalHeading>4. AI Processing and Third-Party Services</LegalHeading>
          <LegalHeading level={3}>4.1 OpenAI Processing</LegalHeading>
          <LegalParagraph>
            We use OpenAI's services to process meeting transcripts and provide
            AI-powered features. When you use transcription features:
          </LegalParagraph>
          <LegalList>
            <li>
              Transcripts from Stream Video SDK are sent to OpenAI for
              processing
            </li>
            <li>
              OpenAI processes this data in accordance with their own privacy
              policy
            </li>
            <li>
              We do not have control over OpenAI's data processing practices
            </li>
            <li>
              You should review OpenAI's privacy policy for more information
            </li>
          </LegalList>

          <LegalHeading level={3}>4.2 Stream Video SDK</LegalHeading>
          <LegalParagraph>
            We use Stream's Video SDK for video conferencing infrastructure.
            Stream processes video and audio data to enable real-time
            communication.
          </LegalParagraph>

          <LegalHeading level={3}>4.3 Payment Processing</LegalHeading>
          <LegalParagraph>
            Payment information is processed by Polar. We do not store your
            complete payment card details. Please review Polar's privacy policy
            for information on how they handle your payment data.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>5. Data Sharing and Disclosure</LegalHeading>
          <LegalParagraph>We may share your information with:</LegalParagraph>
          <LegalList>
            <li>
              Service providers (OpenAI, Stream, Polar) who assist in operating
              our Service
            </li>
            <li>
              Other meeting participants (as necessary for meeting
              functionality)
            </li>
            <li>
              Law enforcement or regulatory authorities when required by law
            </li>
            <li>
              In connection with a merger, sale, or acquisition (with prior
              notice)
            </li>
          </LegalList>
          <LegalParagraph>
            We do not sell your personal data to third parties.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>6. Data Retention</LegalHeading>
          <LegalParagraph>
            We retain your information for as long as necessary to:
          </LegalParagraph>
          <LegalList>
            <li>Provide our Service to you</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce our agreements</li>
          </LegalList>
          <LegalParagraph>
            You may request deletion of your data at any time by contacting us.
            Some data may be retained in backup systems for a limited period.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>7. Your Rights</LegalHeading>
          <LegalParagraph>
            Under applicable data protection laws, you have the right to:
          </LegalParagraph>
          <LegalList>
            <li>
              <strong>Access:</strong> Request a copy of your personal data
            </li>
            <li>
              <strong>Rectification:</strong> Correct inaccurate or incomplete
              data
            </li>
            <li>
              <strong>Erasure:</strong> Request deletion of your personal data
            </li>
            <li>
              <strong>Restriction:</strong> Limit how we use your data
            </li>
            <li>
              <strong>Portability:</strong> Receive your data in a structured,
              machine-readable format
            </li>
            <li>
              <strong>Objection:</strong> Object to certain types of data
              processing
            </li>
            <li>
              <strong>Withdraw Consent:</strong> Withdraw consent where
              processing is based on consent
            </li>
          </LegalList>
          <LegalParagraph>
            To exercise these rights, contact us at{" "}
            <a
              className="text-primary hover:underline"
              href="mailto:levin@baenninger.me"
            >
              levin@baenninger.me
            </a>
            .
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>8. Data Security</LegalHeading>
          <LegalParagraph>
            We implement appropriate technical and organizational measures to
            protect your personal data, including:
          </LegalParagraph>
          <LegalList>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Secure infrastructure and hosting</li>
          </LegalList>
          <LegalParagraph>
            However, no method of transmission over the internet is 100% secure.
            We cannot guarantee absolute security of your data.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>9. International Data Transfers</LegalHeading>
          <LegalParagraph>
            Your data may be transferred to and processed in countries other
            than Switzerland, including countries that may not provide the same
            level of data protection. When we transfer data internationally, we
            ensure appropriate safeguards are in place, such as standard
            contractual clauses.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>10. Cookies and Tracking</LegalHeading>
          <LegalParagraph>
            We use cookies and similar technologies to:
          </LegalParagraph>
          <LegalList>
            <li>Keep you signed in</li>
            <li>Remember your preferences</li>
            <li>Understand how you use our Service</li>
            <li>Improve your experience</li>
          </LegalList>
          <LegalParagraph>
            You can control cookies through your browser settings. Disabling
            cookies may affect the functionality of our Service.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>11. Children's Privacy</LegalHeading>
          <LegalParagraph>
            Our Service is not intended for children under 16 years of age. We
            do not knowingly collect personal information from children under
            16. If you become aware that a child has provided us with personal
            data, please contact us.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>12. Changes to This Policy</LegalHeading>
          <LegalParagraph>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new policy on this page
            and updating the "Last updated" date. You are advised to review this
            Privacy Policy periodically for any changes.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>13. Contact Us</LegalHeading>
          <LegalParagraph>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </LegalParagraph>
          <LegalParagraph>
            <a
              className="text-primary hover:underline"
              href="mailto:levin@baenninger.me"
            >
              levin@baenninger.me
            </a>
          </LegalParagraph>
          <LegalParagraph>
            If you are not satisfied with our response, you have the right to
            lodge a complaint with the Swiss Federal Data Protection and
            Information Commissioner (FDPIC).
          </LegalParagraph>
        </LegalSection>
      </LegalContent>
    </div>
  );
}
