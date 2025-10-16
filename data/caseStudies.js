export const caseStudies = [
  {
    slug: 'real-estate-rossi-realty',
    industry: 'Real Estate',
    title: 'How Rossi Realty Doubled Viewings in 30 Days',
    primaryMetric: '+€30K',
    primaryMetricLabel: 'in commissions',
    supportingMetrics: [
      { icon: '📞', value: '120', label: 'inquiries handled' },
      { icon: '🕒', value: '200', label: 'AI-minutes used' },
      { icon: '💼', value: '0', label: 'extra headcount' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    client: {
      name: 'Rossi Realty',
      location: 'Milan, Italy',
      revenue: '€2 – 5 million',
      teamSize: '5 agents'
    },
    challenge: {
      description: 'Before engaging Automis.ai, Rossi Realty was:',
      points: [
        'Missing 30% of inbound property-tour inquiries (an average of 90 missed calls per month)',
        'Relying on two full-time staff members spending 20 hours/week on manual follow-up emails and call-backs',
        'Suffering a 25% no-show rate for scheduled viewings'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Audit & Discovery (Week 1)',
          items: [
            'Conducted a 2-hour kickoff with CEO Marco Rossi and the sales team',
            'Mapped the entire inquiry funnel: ad click → landing page form → call routing → agent follow-up',
            'Identified three bottlenecks: No 24/7 call coverage, Manual transfer of form data into Pipedrive (average 4 hours/day), No automated reminders for booked viewings'
          ]
        },
        {
          title: 'AI Receptionist Build (Week 2)',
          items: [
            'Scripted and deployed a white-labeled Voice AI agent',
            'Handled 24/7 inbound calls, qualified callers ("Budget? ✔️" / "Preferred neighborhood? ✔️"), and offered available viewing slots',
            'Transferred high-intent leads directly to live agents during business hours'
          ]
        },
        {
          title: 'System Integrations (Week 2)',
          items: [
            'Calendly ↔ Pipedrive Sync: Automated creation of "Tour" events in Pipedrive with complete contact data',
            'Zapier Workflow: On each booking, triggered SMS and email reminders 24 hours and 1 hour before the appointment'
          ]
        },
        {
          title: 'Automated Follow-Up (Ongoing from Week 3)',
          items: [
            'For no-response leads, launched a 3-step nurture sequence:',
            'Immediate email recap of property details',
            'SMS reminder after 12 hours',
            'Personalized WhatsApp message after 48 hours'
          ]
        }
      ]
    },
    results: {
      title: 'The Results (First 30 Days)',
      metrics: [
        { label: 'Inbound Calls Answered', before: '210/month', after: '330/month', improvement: '+57%' },
        { label: 'Missed-Call Rate', before: '30% (90 calls)', after: '0%', improvement: '–100%' },
        { label: 'Scheduled Viewings', before: '40/month', after: '65/month', improvement: '+62.5%' },
        { label: 'No-Show Rate', before: '25% (10 no-shows)', after: '10% (6 no-shows)', improvement: '–60%' },
        { label: 'Agent Follow-Up Time', before: '80 hours/week', after: '20 hours/week', improvement: '–75%' },
        { label: 'Estimated New Commission Pipeline', before: '€15,000/month', after: '€45,000/month', improvement: '+300%' }
      ]
    },
    testimonial: {
      quote: 'Automis.ai transformed how we handle inquiries—every lead is captured, qualified, and booked. Our agents focus on closing, not chasing calls.',
      author: 'Marco Rossi',
      title: 'Managing Director, Rossi Realty'
    }
  },
  {
    slug: 'dental-clinic-smilebright',
    industry: 'Dental Clinic',
    title: 'SmileBright Dental Achieved 18% Missed-Call Recovery',
    primaryMetric: '+€4K',
    primaryMetricLabel: 'monthly revenue',
    supportingMetrics: [
      { icon: '📞', value: '150', label: 'recovered calls' },
      { icon: '🕑', value: '50', label: 'AI-minutes used' },
      { icon: '😀', value: '90%', label: 'show-rate' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    client: {
      name: 'SmileBright Dental',
      location: 'Sunnybank Hills, Australia',
      revenue: '€1–2 million',
      teamSize: '3 dentists, 2 hygienists'
    },
    challenge: {
      description: 'SmileBright Dental faced:',
      points: [
        'Missed 30% of inbound appointment calls (around 200 calls/month)',
        'Manual call-back process that consumed 25 hours/week of administrative time',
        'A low call-to-booking rate of just 52%',
        'A 20% no-show rate on scheduled appointments'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Audit & Discovery (Week 1)',
          items: [
            '90-minute kickoff with the clinic manager and front-desk team',
            'Mapped patient journey: website form → phone inquiry → manual scheduling',
            'Identified key gaps: no off-hours coverage, fragmented data between phone system and scheduling software, no automated reminders'
          ]
        },
        {
          title: 'AI Receptionist Build (Week 2)',
          items: [
            'Deployed a custom Voice AI agent that answers calls 24/7, capturing patient name, procedure interest, and insurance details',
            'Offers available slots based on real-time calendar data',
            'Hands off complex queries to live staff during business hours'
          ]
        },
        {
          title: 'System Integrations (Week 2)',
          items: [
            'Calendly ↔ Clinic Management System (Dentrix) Sync: Automatically created patient records and booked appointments',
            'Zapier Workflow: Sent SMS and email reminders 48 hours and 2 hours before appointments to reduce no-shows'
          ]
        },
        {
          title: 'Automated Follow-Up (Ongoing from Week 3)',
          items: [
            'Patients who didn\'t book immediately received personalized email with service details',
            'SMS reminder after 24 hours',
            'WhatsApp message offering a convenient callback slot'
          ]
        }
      ]
    },
    results: {
      title: 'The Results (First 30 Days)',
      metrics: [
        { label: 'Inbound Calls Answered', before: '140/month', after: '290/month', improvement: '+107%' },
        { label: 'Missed-Call Recovery', before: '0%', after: '18% (≈150 calls)', improvement: '+18 pts' },
        { label: 'Call-to-Booking Rate', before: '52% (73 bookings)', after: '70% (203 bookings)', improvement: '+18 pts' },
        { label: 'No-Show Rate', before: '20% (15 no-shows)', after: '10% (20 no-shows)', improvement: '–50%' },
        { label: 'Admin Follow-Up Time', before: '25 hours/week', after: '5 hours/week', improvement: '–80%' },
        { label: 'Estimated New Monthly Revenue', before: '€1,500', after: '€5,500', improvement: '+367%' }
      ],
      highlights: [
        '150 recovered calls handled by AI',
        '97 AI-minutes used for call qualification',
        '90% show-rate on AI-scheduled appointments'
      ]
    },
    testimonial: {
      quote: 'Automis.ai\'s Voice AI receptionist meant we never miss a patient call again. Our front desk went from drowning in callbacks to focusing on care—and our revenue jumped by €4K/month.',
      author: 'Dr. Andrew Tate',
      title: 'Clinic Marketing Manager, SmileBright Dental'
    }
  },
  {
    slug: 'medspa-glow-go-aesthetics',
    industry: 'Medical Spa',
    title: 'Glow & Go Aesthetics Recovered 120 Missed Consultations',
    primaryMetric: '+267%',
    primaryMetricLabel: 'incremental revenue',
    supportingMetrics: [
      { icon: '📞', value: '120', label: 'inquiries recovered' },
      { icon: '📈', value: '+20pt', label: 'booking rate' },
      { icon: '⏰', value: '73%', label: 'less admin time' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    client: {
      name: 'Glow & Go Aesthetics',
      location: 'Rome, Italy',
      revenue: '€1.5 – 3 million',
      teamSize: '4 aesthetic specialists, 2 front-desk coordinators'
    },
    challenge: {
      description: 'Glow & Go Aesthetics was struggling with:',
      points: [
        '25% of consultation requests going unanswered outside office hours (≈120 missed inquiries/month)',
        'Front-desk team spending 30 hours/week confirming and rescheduling treatments',
        'A booking conversion rate of only 48% from inquiries to scheduled consultations',
        'A 15% no-show rate, leading to wasted time slots and lost revenue'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Audit & Discovery (Week 1)',
          items: [
            '90-minute kickoff with the clinic manager and two coordinators',
            'Mapped the inquiry journey: website form → automated email → phone callback → booking',
            'Identified bottlenecks: no after-hours support, manual appointment reminders, and fragmented data between booking systems'
          ]
        },
        {
          title: 'AI Receptionist Build (Week 2)',
          items: [
            'Developed a branded Voice AI agent that answers calls 24/7, captures client name, desired treatment, and preferred date/time',
            'Suggests available slots based on the live schedule in Acuity Scheduling',
            'Escalates complex questions to live staff during business hours'
          ]
        },
        {
          title: 'System Integrations (Week 2)',
          items: [
            'Acuity Scheduling ↔ Pipedrive Sync: Automated creation of prospect records and treatment appointments',
            'Automated Reminders: SMS and email notifications sent 48 hours and 2 hours before appointments'
          ]
        },
        {
          title: 'Automated Follow-Up (Ongoing from Week 3)',
          items: [
            'Clients who didn\'t immediately book received a personalized "Thank you" email with treatment details',
            'SMS reminder after 24 hours',
            'WhatsApp message offering a complimentary skincare guide and callback link'
          ]
        }
      ]
    },
    results: {
      title: 'The Results (First 30 Days)',
      metrics: [
        { label: 'Consult Inquiry Coverage', before: '75%', after: '100%', improvement: '+25 pts' },
        { label: 'Missed-Request Recovery', before: '0%', after: '18% (≈120 requests)', improvement: '+18 pts' },
        { label: 'Booking Conversion Rate', before: '48% (144 bookings)', after: '68% (382 bookings)', improvement: '+20 pts' },
        { label: 'No-Show Rate', before: '15%', after: '6%', improvement: '–60%' },
        { label: 'Front-Desk Admin Hours', before: '30 hrs/week', after: '8 hrs/week', improvement: '–73%' },
        { label: 'Incremental Revenue', before: '€4,800/month', after: '€12,800/month', improvement: '+267%' }
      ],
      highlights: [
        '120 missed inquiries recovered by AI',
        '40 AI-minutes used daily for qualification and booking',
        '94% show-rate on AI-scheduled appointments'
      ]
    },
    testimonial: {
      quote: 'Automis.ai\'s solution felt like hiring two extra coordinators—without the payroll. We recovered over 100 consultations in a month and our specialists focus solely on client care.',
      author: 'Laura Bianchi',
      title: 'Owner & Lead Aesthetician'
    }
  },
  {
    slug: 'home-services-coolhome-hvac',
    industry: 'Home Services',
    title: 'CoolHome HVAC Increased Appointments by 120%',
    primaryMetric: '+120%',
    primaryMetricLabel: 'appointments booked',
    supportingMetrics: [
      { icon: '📊', value: '+7pt', label: 'lead rate' },
      { icon: '📅', value: '110', label: 'monthly bookings' },
      { icon: '⏱️', value: '-80%', label: 'scheduling time' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    client: {
      name: 'CoolHome HVAC',
      location: 'Turin, Italy',
      revenue: '€1 – 3 million',
      serviceArea: 'Residential installations & emergency repairs'
    },
    challenge: {
      description: 'CoolHome HVAC struggled with:',
      points: [
        'Low ad ROI: Meta ads generated 1,200 clicks/month but only 60 qualified leads (5% lead rate)',
        'Missed After-Hours Calls: 40% of emergency requests came outside business hours, leading to lost revenue',
        'Manual Scheduling: Office staff spent 15 hours/week coordinating appointments and follow-ups'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Targeted Advertising (Weeks 1–2)',
          items: [
            'Refined Meta campaigns toward high-intent audiences (homeowners within 5 km radius)',
            'A/B tested 3 ad creatives (emergency repair, seasonal maintenance, new installation)',
            'Increased lead rate from 5% → 12% within two weeks'
          ]
        },
        {
          title: 'AI Receptionist & Voice Automation (Week 2)',
          items: [
            'Deployed a 24/7 Voice AI agent to answer emergency and routine inquiries',
            'Script captured service type, location, and urgency, then offered slots or escalated to on-call technicians'
          ]
        },
        {
          title: 'Workflow Automations (Week 3)',
          items: [
            'CRM Integration: Leads from ads and calls auto-logged in Pipedrive',
            'Appointment Flows: Immediate SMS confirmation upon booking, Reminder SMS 2 hours before service, Follow-up email requesting feedback and reviews'
          ]
        },
        {
          title: 'Ongoing Optimization (Weeks 4–6)',
          items: [
            'Weekly ad-budget adjustments to favor top-performing audiences',
            'AI-driven nurture sequence for leads who didn\'t book immediately (email → SMS → WhatsApp)'
          ]
        }
      ]
    },
    results: {
      title: 'The Results (First 30 Days)',
      metrics: [
        { label: 'Qualified Lead Rate', before: '5% (60 of 1,200)', after: '12% (180 of 1,500)', improvement: '+7 pts' },
        { label: 'Inquiries Handled', before: '180/month', after: '310/month', improvement: '+72%' },
        { label: 'AI-Minutes Used', before: '—', after: '120 minutes', improvement: '—' },
        { label: 'Appointments Scheduled', before: '50/month', after: '110/month', improvement: '+120%' },
        { label: 'Admin Scheduling Time', before: '15 hrs/week', after: '3 hrs/week', improvement: '–80%' },
        { label: 'Estimated New Revenue', before: '€8,000/month', after: '€18,000/month', improvement: '+125%' }
      ]
    },
    testimonial: {
      quote: 'By combining smart ads, AI automations, and our Voice AI receptionist, Automis.ai doubled our scheduled jobs in a month—without hiring extra staff.',
      author: 'Marco Bianchi',
      title: 'Operations Manager, CoolHome HVAC'
    }
  }
];