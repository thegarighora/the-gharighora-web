import {
  BadgeCheck,
  CarFront,
  ClipboardList,
  Handshake,
  MapPinned,
  ScrollText,
  Star,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/landing/section";
import { ArrowLink } from "@/components/landing/site-link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { routes } from "@/lib/site-config";

/**
 * Stepper, tabbed by audience. Uses the shadcn Tabs primitive, so arrow-key
 * navigation between tabs and focus management come for free.
 */

type Step = { icon: LucideIcon; title: string; body: string };

const passengerSteps: Step[] = [
  {
    icon: ClipboardList,
    title: "Search or request",
    body: "Pick Rental Car or Return Car, then enter from, to, date and time. Add a vehicle type and any notes — bags, AC, a child seat.",
  },
  {
    icon: Handshake,
    title: "Compare offers",
    body: "Verified drivers respond with a fare. Counter once if you want; there is a cap on rounds so nobody gets stuck negotiating.",
  },
  {
    icon: MapPinned,
    title: "Book and ride",
    body: "Accept an offer and the booking is confirmed. You see your driver, the vehicle and the pickup point, and can follow the car on the day.",
  },
  {
    icon: Star,
    title: "Pay after the trip, then rate",
    body: "Hand the agreed fare to the driver in cash when the trip is finished — never before. Then rate each other.",
  },
];

const driverSteps: Step[] = [
  {
    icon: BadgeCheck,
    title: "Register and get verified",
    body: "Sign up with your phone, then submit your NID, driving licence and vehicle registration. Verification happens before you can accept trips.",
  },
  {
    icon: CarFront,
    title: "Take a rental or post a return trip",
    body: "Offer on passenger requests, publish rental availability, or post the empty leg of a trip you have already completed as a Return Car trip.",
  },
  {
    icon: ScrollText,
    title: "Run the trip",
    body: "Your Gari Bhai calls to confirm pickup details with both sides. Start the trip in the app, complete it when you arrive.",
  },
  {
    icon: Wallet,
    title: "Get paid and rated",
    body: "Collect the fare in cash from the passenger. The platform commission is recorded against the trip for you to settle later.",
  },
];

export function HowItWorks({ moreLink = true }: { moreLink?: boolean } = {}) {
  return (
    <Section id="how-it-works" tone="surface" aria-labelledby="how-heading">
      <SectionHeading
        id="how-heading"
        eyebrow="How it works"
        title="Four steps, whichever side you are on"
        description="The same booking, seen from both ends. Nothing happens by phone call alone — every offer, booking and completion is recorded in the app."
      />

      <Tabs defaultValue="passengers" className="mt-10 gap-6 lg:mt-14">
        <TabsList className="mx-auto h-auto w-full max-w-md rounded-xl p-1 sm:h-10">
          <TabsTrigger value="passengers" className="h-9 rounded-lg">
            For Passengers
          </TabsTrigger>
          <TabsTrigger value="drivers" className="h-9 rounded-lg">
            For Drivers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="passengers">
          <Stepper steps={passengerSteps} />
        </TabsContent>
        <TabsContent value="drivers">
          <Stepper steps={driverSteps} />
        </TabsContent>
      </Tabs>

      {moreLink ? (
        <div className="mt-8 flex justify-center">
          <ArrowLink href={routes.howItWorks}>
            See the full walkthrough
          </ArrowLink>
        </div>
      ) : null}
    </Section>
  );
}

function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative flex flex-col gap-3 rounded-2xl border border-brand-hairline bg-brand-surface-raised p-5 shadow-brand-sm"
        >
          {/* Connector between steps on wide screens. */}
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="road-dashes absolute top-9 -right-3 hidden h-px w-6 text-brand-primary-300 lg:block"
            />
          ) : null}

          <div className="flex items-center justify-between gap-2">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-cta text-brand-on-brand shadow-brand-sm">
              <step.icon aria-hidden="true" className="size-5" />
            </span>
            <span className="text-sm font-semibold text-brand-ink-muted">
              Step {index + 1}
            </span>
          </div>
          <h3 className="text-base font-semibold tracking-tight text-brand-ink">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-brand-ink-muted">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
