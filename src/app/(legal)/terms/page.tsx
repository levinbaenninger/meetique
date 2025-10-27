import { LegalContent } from "@/modules/legal/ui/components/legal-content";
import { LegalHeader } from "@/modules/legal/ui/components/legal-header";
import { LegalHeading } from "@/modules/legal/ui/components/legal-heading";
import { LegalList } from "@/modules/legal/ui/components/legal-list";
import { LegalParagraph } from "@/modules/legal/ui/components/legal-paragraph";
import { LegalSection } from "@/modules/legal/ui/components/legal-section";

export default function TermsOfService() {
  return (
    <div className="space-y-8">
      <LegalHeader title="Terms of Service" />

      <LegalContent>
        <LegalSection>
          <LegalHeading>1. Agreement to Terms</LegalHeading>
          <LegalParagraph>
            By accessing or using Meetique ("Service"), you agree to be bound by
            these Terms of Service. If you disagree with any part of these
            terms, you may not access the Service.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>2. Description of Service</LegalHeading>
          <LegalParagraph>
            Meetique is a video meeting platform that provides:
          </LegalParagraph>
          <LegalList>
            <li>Video conferencing and meeting management</li>
            <li>
              AI-powered meeting agents that can join and participate in
              meetings
            </li>
            <li>Meeting transcription and recording services powered by AI</li>
            <li>Meeting analytics and insights</li>
          </LegalList>
        </LegalSection>

        <LegalSection>
          <LegalHeading>3. User Accounts</LegalHeading>
          <LegalParagraph>You are responsible for:</LegalParagraph>
          <LegalList>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>
              Notifying us immediately of any unauthorized access to your
              account
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection>
          <LegalHeading>4. Acceptable Use</LegalHeading>
          <LegalParagraph>You agree not to:</LegalParagraph>
          <LegalList>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Violate any laws in your jurisdiction</li>
            <li>Transmit any malicious code, viruses, or harmful components</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>
              Attempt to gain unauthorized access to any part of the Service
            </li>
            <li>Use the Service to harass, abuse, or harm another person</li>
            <li>
              Record or transcribe meetings without proper consent from all
              participants
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection>
          <LegalHeading>5. AI Services and Processing</LegalHeading>
          <LegalParagraph>
            Our Service uses AI technologies, including OpenAI's services, to
            provide transcription and meeting analysis features. By using these
            features, you acknowledge that:
          </LegalParagraph>
          <LegalList>
            <li>Meeting content may be processed by third-party AI services</li>
            <li>
              You are responsible for obtaining necessary consents from meeting
              participants
            </li>
            <li>
              AI-generated transcriptions and insights may contain errors or
              inaccuracies
            </li>
            <li>
              You should not rely solely on AI-generated content for critical
              decisions
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection>
          <LegalHeading>6. Intellectual Property</LegalHeading>
          <LegalParagraph>
            The Service and its original content, features, and functionality
            are owned by Meetique and are protected by international copyright,
            trademark, and other intellectual property laws.
          </LegalParagraph>
          <LegalParagraph>
            You retain all rights to the content you create, upload, or share
            through the Service. By using the Service, you grant us a limited
            license to process, store, and display your content as necessary to
            provide the Service.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>7. Payment and Subscriptions</LegalHeading>
          <LegalParagraph>
            Certain features of the Service require payment. Payment processing
            is handled by Polar. By subscribing to a paid plan, you agree to:
          </LegalParagraph>
          <LegalList>
            <li>Pay all fees associated with your subscription</li>
            <li>Provide accurate and complete billing information</li>
            <li>Authorize recurring charges for subscription-based services</li>
          </LegalList>
          <LegalParagraph>
            We reserve the right to change our pricing at any time. You will be
            notified of any price changes in advance.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>8. Termination</LegalHeading>
          <LegalParagraph>
            We may terminate or suspend your account immediately, without prior
            notice, if you breach these Terms. Upon termination, your right to
            use the Service will immediately cease.
          </LegalParagraph>
          <LegalParagraph>
            You may terminate your account at any time by contacting us at{" "}
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
          <LegalHeading>9. Limitation of Liability</LegalHeading>
          <LegalParagraph>
            To the maximum extent permitted by applicable law, Meetique shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages, including loss of profits, data, or other
            intangible losses resulting from your use of the Service.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>10. Disclaimer</LegalHeading>
          <LegalParagraph>
            The Service is provided "AS IS" and "AS AVAILABLE" without
            warranties of any kind, either express or implied, including but not
            limited to implied warranties of merchantability, fitness for a
            particular purpose, or non-infringement.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>11. Governing Law</LegalHeading>
          <LegalParagraph>
            These Terms shall be governed by and construed in accordance with
            the laws of Switzerland, without regard to its conflict of law
            provisions. Any disputes arising from these Terms or the Service
            shall be subject to the exclusive jurisdiction of the courts of
            Switzerland.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>12. Changes to Terms</LegalHeading>
          <LegalParagraph>
            We reserve the right to modify or replace these Terms at any time.
            If a revision is material, we will provide at least 30 days' notice
            before new terms take effect. Continued use of the Service after
            changes become effective constitutes acceptance of the revised
            Terms.
          </LegalParagraph>
        </LegalSection>

        <LegalSection>
          <LegalHeading>13. Contact Information</LegalHeading>
          <LegalParagraph>
            If you have any questions about these Terms, please contact us at:{" "}
            <a
              className="text-primary hover:underline"
              href="mailto:levin@baenninger.me"
            >
              levin@baenninger.me
            </a>
            .
          </LegalParagraph>
        </LegalSection>
      </LegalContent>
    </div>
  );
}
