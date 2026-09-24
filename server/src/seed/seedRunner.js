import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { CreatorVerification } from '../models/CreatorVerification.js';
import { Campaign } from '../models/Campaign.js';
import { Milestone } from '../models/Milestone.js';
import { Expense } from '../models/Expense.js';
import { Donation } from '../models/Donation.js';
import { CampaignUpdate } from '../models/CampaignUpdate.js';
import { Impact } from '../models/Impact.js';
import { Comment } from '../models/Comment.js';
import { Report } from '../models/Report.js';
import { Notification } from '../models/Notification.js';
import { seedUsers } from './seedData.js';

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(env.MONGODB_URI);
    console.log('[Seed] Connected successfully.');

    // Clear existing collections
    console.log('[Seed] Purging existing database collections...');
    await Promise.all([
      User.deleteMany(),
      CreatorVerification.deleteMany(),
      Campaign.deleteMany(),
      Milestone.deleteMany(),
      Expense.deleteMany(),
      Donation.deleteMany(),
      CampaignUpdate.deleteMany(),
      Impact.deleteMany(),
      Comment.deleteMany(),
      Report.deleteMany(),
      Notification.deleteMany(),
    ]);

    // Insert Users
    console.log('[Seed] Creating users with secure bcrypt credentials...');
    const createdUsers = [];
    for (const userData of seedUsers) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }

    const adminUser = createdUsers.find((u) => u.role === 'admin');
    const aisha = createdUsers.find((u) => u.email === 'aisha@ruralhealth.org');
    const rajesh = createdUsers.find((u) => u.email === 'rajesh@cleanwater.org');
    const ananya = createdUsers.find((u) => u.email === 'ananya@girlsincode.org');
    const vikram = createdUsers.find((u) => u.email === 'vikram@solarnext.org');
    const priya = createdUsers.find((u) => u.email === 'priya@example.com');
    const rohan = createdUsers.find((u) => u.email === 'rohan@example.com');
    const neha = createdUsers.find((u) => u.email === 'neha@example.com');

    // Insert Creator Verifications
    console.log('[Seed] Creating creator verification records...');
    await CreatorVerification.insertMany([
      {
        userId: aisha._id,
        organizationName: 'Arogya Seva Himalayan Trust',
        documentType: 'Tax / Organization ID',
        documentNumber: 'NGO-UT-2018-884920',
        documentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        status: 'approved',
        adminNotes: 'Government registration and medical licenses verified.',
        reviewedBy: adminUser._id,
        submittedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        reviewedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
      },
      {
        userId: rajesh._id,
        organizationName: 'Maru Jal Foundation',
        documentType: 'National ID',
        documentNumber: 'IND-DL-883719402',
        documentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'approved',
        adminNotes: 'Aadhaar identity and municipal permissions verified.',
        reviewedBy: adminUser._id,
        submittedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
        reviewedAt: new Date(Date.now() - 39 * 24 * 60 * 60 * 1000),
      },
      {
        userId: ananya._id,
        organizationName: 'Girls In Code Academy',
        documentType: 'Passport',
        documentNumber: 'Z8941029',
        documentUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
        status: 'approved',
        adminNotes: 'Passport and institutional credentials verified.',
        reviewedBy: adminUser._id,
        submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        reviewedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000),
      },
      {
        userId: vikram._id,
        organizationName: 'SolarNext AgriTech Labs',
        documentType: 'Driver License',
        documentNumber: 'MH-14-2021-998201',
        documentUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        status: 'pending',
        adminNotes: 'Awaiting secondary address proof verification.',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ]);

    // Insert Realistic Campaigns
    console.log('[Seed] Creating campaigns...');
    const campaignsData = [
      {
        creator: aisha._id,
        title: 'Mobile Medical Clinics for Remote Himalayan Villages',
        slug: 'mobile-medical-clinics-remote-himalayan-villages',
        shortDescription: 'Bringing primary medical care, telemedicine diagnostics, and essential pharmaceuticals to cut-off high-altitude settlements in Uttarakhand.',
        description: `Over 35 high-altitude villages in the Garhwal Himalayas lack basic primary healthcare facilities. During winters and monsoon landslides, roads are frequently blocked, leaving elderly citizens, pregnant mothers, and infants with zero medical access.

Arogya Seva Trust is deploying a 4x4 ruggedized Mobile Clinic Van equipped with point-of-care blood analyzers, ultrasound devices, portable oxygen concentrators, and satellite internet for telemedicine consultations with top specialists in Dehradun and Delhi.

Our medical teams will conduct weekly rounds, providing prenatal checkups, emergency stabilization, routine chronic illness treatments, and preventive pediatric immunizations.

Every rupee raised is allocated with complete transparent tracking on CrowdTrust, with itemized milestone receipts, GPS-verified clinic logs, and patient outcome statistics.`,
        category: 'Medical',
        goalAmount: 500000,
        raisedAmount: 385000,
        currency: 'INR',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
        ],
        location: 'Chamoli & Rudraprayag, Uttarakhand',
        beneficiary: 'Garhwal Valley Rural Communities (Estimated 8,500+ residents)',
        status: 'active',
        verificationStatus: 'verified',
        isFeatured: true,
        donorCount: 142,
        budget: [
          { category: 'Equipment', amount: 220000, description: 'Portable POC diagnostic analyzers, ultrasound, and defibrillator' },
          { category: 'Materials', amount: 110000, description: 'Essential pharmaceuticals, IV fluids, and pediatric vaccines' },
          { category: 'Logistics & Transport', amount: 100000, description: 'Vehicle fuel, 4x4 terrain maintenance, and satellite uplink bandwidth' },
          { category: 'Labor', amount: 70000, description: 'Paramedic and field nurse stipends for 6 months' },
        ],
        story: {
          problem: 'High-altitude mountainous villages are hours away from nearest sub-district hospitals, leading to preventable maternal and critical care deaths.',
          solution: 'A 4WD ruggedized mobile clinic staffed by certified clinicians with satellite telemedicine support.',
          beneficiaries: 'Over 8,500 villagers across 35 cut-off mountain hamlets.',
          expectedImpact: 'Preventative care for 5,000+ patients and reduction in emergency transit delays.',
        },
      },
      {
        creator: rajesh._id,
        title: 'Solar Powered Clean Water Filtration for 10 Drought Villages',
        slug: 'solar-powered-clean-water-filtration-10-drought-villages',
        shortDescription: 'Installing community-owned solar RO and UV filtration kiosks in fluoride-affected arid villages of western Rajasthan.',
        description: `Groundwater in western Rajasthan contains fluoride and salinity levels up to 6x the WHO safety limits, causing severe dental and skeletal fluorosis among growing children.

Our initiative installs community-scale 1,000 LPH solar-powered water filtration plants. The plants operate 100% off-grid with lithium storage batteries, providing 20 liters of certified safe drinking water daily per household for a nominal maintenance fee managed by a local women's self-help group.

Through CrowdTrust, donors can track each village plant from borehole water testing, structural civil work, solar array mounting, to the final flow meter telemetry.`,
        category: 'Environment',
        goalAmount: 350000,
        raisedAmount: 280000,
        currency: 'INR',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        ],
        location: 'Barmer & Jaisalmer, Rajasthan',
        beneficiary: '10 Arid Villages (Approx 4,200 villagers & school children)',
        status: 'active',
        verificationStatus: 'verified',
        isFeatured: true,
        donorCount: 96,
        budget: [
          { category: 'Equipment', amount: 180000, description: '10 Solar RO/UV filtration units and multi-stage media filters' },
          { category: 'Materials', amount: 75000, description: 'Solar PV monocrystalline panels and mounting frames' },
          { category: 'Labor', amount: 55000, description: 'Civil foundation work, plumbing, and electrical grid tie-in' },
          { category: 'Operations', amount: 40000, description: 'Water laboratory quality testing and community training' },
        ],
        story: {
          problem: 'Fluoride contamination in drinking water is crippling children and elderly villagers with skeletal deformities.',
          solution: 'Decentralized solar water kiosks owned and operated by village committees.',
          beneficiaries: '4,200 rural residents across 10 remote villages.',
          expectedImpact: 'Zero fluorosis incidence in children and 20,000 liters of potable water daily.',
        },
      },
      {
        creator: ananya._id,
        title: 'Empowering 500 Underprivileged Girls with Coding & Robotics Labs',
        slug: 'empowering-500-underprivileged-girls-coding-robotics',
        shortDescription: 'Setting up computer science innovation labs, Raspberry Pi hardware kits, and mentorship programs for adolescent girls in municipal schools.',
        description: `Only 14% of technology graduates from lower-income districts in West Bengal are female. Girls In Code bridges this digital divide by setting up hands-on computer science and robotics makerspaces in government schools.

We provide refurbished laptops, Raspberry Pi kits, Python curriculum in local languages, and weekly mentorship sessions led by female software engineers from top tech companies.

Our students build IoT weather stations, simple websites, and algorithmic logic games. The funds raised directly procure equipment and fund stipend support for certified teaching fellows.`,
        category: 'Education',
        goalAmount: 450000,
        raisedAmount: 310000,
        currency: 'INR',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        ],
        location: 'Kolkata & Howrah, West Bengal',
        beneficiary: '500 High School Girls in 6 Government-aided Schools',
        status: 'active',
        verificationStatus: 'verified',
        isFeatured: true,
        donorCount: 118,
        budget: [
          { category: 'Equipment', amount: 240000, description: '30 Refurbished laptops and 50 Raspberry Pi 4 Starter Kits' },
          { category: 'Materials', amount: 80000, description: 'Electronic sensor modules, breadboards, and robotics chassis' },
          { category: 'Labor', amount: 90000, description: 'Honorarium for 3 computer science teaching fellows for 1 academic year' },
          { category: 'Operations', amount: 40000, description: 'Curriculum printing, hackathon prizes, and internet dongles' },
        ],
        story: {
          problem: 'Girls in government schools lack computer access and mentorship, shutting them out of lucrative technology careers.',
          solution: 'Equip school labs with durable computing hardware and run structured coding & robotics curricula.',
          beneficiaries: '500 adolescent girl students across 6 underprivileged schools.',
          expectedImpact: '100% of participants building working software/hardware projects by year-end.',
        },
      },
      {
        creator: vikram._id,
        title: 'Autonomous Solar Ag-Bots for Smallholder Marginal Farmers',
        slug: 'autonomous-solar-ag-bots-smallholder-marginal-farmers',
        shortDescription: 'Building open-source, ultra-low-cost solar powered weeding robots to cut manual labor costs for cotton and soybean farmers.',
        description: `Smallholder farmers with under 3 acres spend up to 40% of their seasonal income on manual weed control and hazardous chemical herbicides.

SolarNext is designing a lightweight, solar-assisted robotic rover that uses vision-based AI models on edge microcontrollers to target weeds mechanically without spraying toxic chemicals.

This campaign funds the fabrication and field testing of 15 prototype units that will be deployed in shared farmer cooperatives in Maharashtra.`,
        category: 'Technology',
        goalAmount: 600000,
        raisedAmount: 195000,
        currency: 'INR',
        deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        coverImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
        ],
        location: 'Pune & Vidarbha, Maharashtra',
        beneficiary: '120 Marginal Farmer Families',
        status: 'active',
        verificationStatus: 'pending',
        isFeatured: false,
        donorCount: 47,
        budget: [
          { category: 'Equipment', amount: 280000, description: 'Brushless motors, CNC chassis parts, solar panels, and battery packs' },
          { category: 'Materials', amount: 150000, description: 'Camera modules, microcontrollers, and precision tillage blades' },
          { category: 'Labor', amount: 120000, description: 'Mechatronics engineering and firmware development' },
          { category: 'Operations', amount: 50000, description: 'Field trial travel, safety testing, and farmer workshops' },
        ],
        story: {
          problem: 'Exorbitant labor costs and toxic herbicide exposure threaten the livelihoods and health of marginal farmers.',
          solution: 'Open-source solar weeding rovers provided via village shared tool libraries.',
          beneficiaries: '120 farmer families across 4 farming clusters.',
          expectedImpact: '60% reduction in weeding costs and zero chemical runoff into local aquifers.',
        },
      },
      {
        creator: aisha._id,
        title: 'Emergency Cyclone Relief & Shelter Rebuilding for Coastal Fishermen',
        slug: 'emergency-cyclone-relief-shelter-rebuilding',
        shortDescription: 'Providing immediate food relief kits, water purification tablets, and roof repair tarpaulins for 300 displaced coastal families.',
        description: `Severe Cyclone Amrit flattened over 250 thatched homes in coastal fishing settlements. Families have lost their fishing gear, stored grains, and have been living in temporary community school halls.

Our emergency response team has mobilized relief provisions: 30-day dry ration hampers, emergency solar lanterns, medical first-aid kits, and heavy-duty weatherproofing tarpaulins for immediate home reconstruction.

All relief procurement receipts, vendor bills, and beneficiary handover logs are verified and audited directly on CrowdTrust.`,
        category: 'Emergency',
        goalAmount: 250000,
        raisedAmount: 250000,
        currency: 'INR',
        deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Completed
        coverImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
        location: 'Sundarbans, West Bengal',
        beneficiary: '300 Fishing Families (1,400 individuals)',
        status: 'completed',
        verificationStatus: 'verified',
        isFeatured: true,
        donorCount: 184,
        budget: [
          { category: 'Materials', amount: 140000, description: '300 Dry food ration kits (Rice, Dal, Oil, Salt, Sugar, Biscuits)' },
          { category: 'Equipment', amount: 50000, description: '300 Solar recharge lanterns and water purification jerrycans' },
          { category: 'Logistics & Transport', amount: 40000, description: 'Boat transport through tidal waterways and distribution truck fuel' },
          { category: 'Operations', amount: 20000, description: 'Emergency medical aid and volunteer safety equipment' },
        ],
        story: {
          problem: 'Devastating cyclone storm surge wiped out homes and food stocks for vulnerable island fishing families.',
          solution: 'Rapid delivery of 30-day nutrition and emergency roof weatherproofing kits.',
          beneficiaries: '300 coastal fishing families.',
          expectedImpact: '100% of target families sheltered and nourished within 48 hours of landfall.',
        },
      },
      {
        creator: rajesh._id,
        title: 'Community Seed Bank & Native Tree Reforestation Initiative',
        slug: 'community-seed-bank-native-tree-reforestation',
        shortDescription: 'Conserving heirloom drought-resilient seed varieties and planting 10,000 indigenous trees along degraded riverbanks.',
        description: `Climate shifts are depleting indigenous biodiversity and eroding riverbanks in semi-arid zones. This project creates a centralized community seed bank preserving 80+ heirloom crop varieties, combined with community nurseries producing 10,000 native saplings.`,
        category: 'Community',
        goalAmount: 180000,
        raisedAmount: 0,
        currency: 'INR',
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        location: 'Ajmer, Rajasthan',
        beneficiary: 'Local Farmer Collectives and School Ecology Clubs',
        status: 'pending_review',
        verificationStatus: 'verified',
        isFeatured: false,
        donorCount: 0,
        budget: [
          { category: 'Equipment', amount: 60000, description: 'Temperature-controlled seed storage containers and moisture meters' },
          { category: 'Materials', amount: 50000, description: 'Nursery potting bags, compost, native seeds, and drip irrigation pipes' },
          { category: 'Labor', amount: 50000, description: 'Nursery caretaker wages and community planting mobilization' },
          { category: 'Operations', amount: 20000, description: 'Seed preservation workshops and educational booklet printing' },
        ],
        story: {
          problem: 'Monocropping and habitat degradation have wiped out traditional drought-hardy agricultural species.',
          solution: 'Community seed vaults and native micro-forest plantations.',
          beneficiaries: '450 local farming households.',
          expectedImpact: '10,000 surviving native trees and preservation of 80 endangered heirloom crop varieties.',
        },
      },
    ];

    const createdCampaigns = await Campaign.insertMany(campaignsData);
    const campMedical = createdCampaigns[0];
    const campWater = createdCampaigns[1];
    const campCode = createdCampaigns[2];
    const campAgBot = createdCampaigns[3];
    const campCyclone = createdCampaigns[4];

    // Create Milestones
    console.log('[Seed] Creating campaign milestones...');
    await Milestone.insertMany([
      // Medical Campaign Milestones
      {
        campaign: campMedical._id,
        title: 'Milestone 1: 4WD Vehicle Procurement & Chassis Customization',
        description: 'Purchase ruggedized all-terrain vehicle and install medical partitions, generator, and roof rack.',
        targetAmount: 150000,
        order: 1,
        status: 'completed',
        dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        completionPercentage: 100,
        evidence: {
          description: 'Vehicle purchased, registered with state RTO, and custom insulated medical cabinetry installed.',
          fileUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
          submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        },
        adminReview: {
          feedback: 'Vehicle registration documents and photos verified by compliance team.',
          reviewedBy: adminUser._id,
          reviewedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
        },
      },
      {
        campaign: campMedical._id,
        title: 'Milestone 2: Diagnostic Equipment & Satellite Telemedicine Suite',
        description: 'Install point-of-care blood analyzer, ultrasound transducer, and portable satellite modem.',
        targetAmount: 180000,
        order: 2,
        status: 'completed',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completionPercentage: 100,
        evidence: {
          description: 'Abbott POC blood analyzer and Mindray ultrasound calibrated. Satellite uplink tested with Dehradun hospital.',
          fileUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        adminReview: {
          feedback: 'Equipment serial numbers and calibration certificates validated.',
          reviewedBy: adminUser._id,
          reviewedAt: new Date(),
        },
      },
      {
        campaign: campMedical._id,
        title: 'Milestone 3: Field Deployment Across First 20 Mountain Villages',
        description: 'Execute initial 3 months of scheduled weekly medical rounds and maternal health clinics.',
        targetAmount: 170000,
        order: 3,
        status: 'active',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        completionPercentage: 45,
      },

      // Water Campaign Milestones
      {
        campaign: campWater._id,
        title: 'Milestone 1: Hydrogeological Testing & Solar Array Installation',
        description: 'Drill and water test source borewells across the first 5 villages, then install 4kW solar arrays.',
        targetAmount: 140000,
        order: 1,
        status: 'completed',
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        completionPercentage: 100,
        evidence: {
          description: 'Water lab report showing TDS levels, and completion photos of 5 village solar arrays.',
          fileUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
          submittedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        },
        adminReview: {
          feedback: 'Lab reports confirm pre-filtration water baseline.',
          reviewedBy: adminUser._id,
          reviewedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        },
      },
      {
        campaign: campWater._id,
        title: 'Milestone 2: RO/UV Filtration Housing & Dispensing Kiosks',
        description: 'Erect brick kiosks and install multi-stage RO and ultraviolet disinfection skids.',
        targetAmount: 120000,
        order: 2,
        status: 'submitted',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        completionPercentage: 100,
        evidence: {
          description: 'Filtration equipment installed in 4 of 5 target locations. Civil housing completed.',
          fileUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          submittedAt: new Date(),
        },
      },
      {
        campaign: campWater._id,
        title: 'Milestone 3: Community Training & Water Committee Handover',
        description: 'Train local women SHGs in filter backwashing, meter logging, and emergency protocol.',
        targetAmount: 90000,
        order: 3,
        status: 'locked',
        dueDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        completionPercentage: 0,
      },

      // Code for Girls Milestones
      {
        campaign: campCode._id,
        title: 'Milestone 1: Laptop & Raspberry Pi Hardware Procurement',
        description: 'Purchase 30 certified refurbished ThinkPads and 50 Raspberry Pi 4 maker packs.',
        targetAmount: 220000,
        order: 1,
        status: 'completed',
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        completionPercentage: 100,
        evidence: {
          description: 'Hardware invoice from authorized Lenovo distributor and unpacking photos.',
          fileUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
          submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        },
        adminReview: {
          feedback: 'Invoices and warranty documentation verified.',
          reviewedBy: adminUser._id,
          reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      },
      {
        campaign: campCode._id,
        title: 'Milestone 2: Lab Setup & Local Language Curriculum Rollout',
        description: 'Network the school labs and train first cohort of 250 students in Python basics.',
        targetAmount: 130000,
        order: 2,
        status: 'active',
        dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        completionPercentage: 60,
      },
      {
        campaign: campCode._id,
        title: 'Milestone 3: Capstone IoT Projects & Regional Showcase',
        description: 'Student teams build weather and sensor projects and present at inter-school STEM expo.',
        targetAmount: 100000,
        order: 3,
        status: 'locked',
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        completionPercentage: 0,
      },
    ]);

    // Create Transparent Expenses with Receipts
    console.log('[Seed] Creating verified transparent expenses...');
    await Expense.insertMany([
      // Medical Campaign Expenses
      {
        campaign: campMedical._id,
        description: 'Force Motors 4x4 Trax Delivery & State Transport Tax',
        category: 'Equipment',
        amount: 145000,
        receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        status: 'approved',
        reviewedBy: adminUser._id,
        reviewedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
        adminNotes: 'Automobile dealership invoice and chassis number verified.',
      },
      {
        campaign: campMedical._id,
        description: 'Point-of-care i-STAT Blood Gas Analyzer & Ultrasound Unit',
        category: 'Equipment',
        amount: 175000,
        receiptUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'approved',
        reviewedBy: adminUser._id,
        reviewedAt: new Date(),
        adminNotes: 'Medical devices distributor tax invoice matched to target milestone.',
      },
      {
        campaign: campMedical._id,
        description: 'Bulk emergency pharmaceuticals, antibiotics, and sterile IV kits',
        category: 'Materials',
        amount: 42000,
        receiptUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'approved',
        reviewedBy: adminUser._id,
        reviewedAt: new Date(),
        adminNotes: 'Pharmaceutical batch numbers and wholesale billing checked.',
      },

      // Water Campaign Expenses
      {
        campaign: campWater._id,
        description: 'Loom Solar 4.4kW Monocrystalline Solar Array & MPPT Charge Controllers',
        category: 'Materials',
        amount: 72000,
        receiptUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        status: 'approved',
        reviewedBy: adminUser._id,
        reviewedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        adminNotes: 'Verified against manufacturer warranty certificates.',
      },
      {
        campaign: campWater._id,
        description: 'Civil Construction: Brick housing shed & steel water storage overhead tank',
        category: 'Labor',
        amount: 48000,
        receiptUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'approved',
        reviewedBy: adminUser._id,
        reviewedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        adminNotes: 'Contractor vouchers and photo proof verified.',
      },
      {
        campaign: campWater._id,
        description: 'Industrial RO Membrane Vessel and UV Sterilizer Skids (Units 1-4)',
        category: 'Equipment',
        amount: 110000,
        receiptUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'pending',
        adminNotes: '',
      },

      // Code for Girls Expenses
      {
        campaign: campCode._id,
        description: 'Lenovo Commercial Refurbished ThinkPad Laptops (Batch of 30)',
        category: 'Equipment',
        amount: 215000,
        receiptUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: 'approved',
        reviewedBy: adminUser._id,
        reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        adminNotes: '30 Serialized IT receipts authenticated.',
      },
    ]);

    // Create Realistic Donations
    console.log('[Seed] Creating donations with payment references...');
    await Donation.insertMany([
      {
        donor: priya._id,
        campaign: campMedical._id,
        amount: 25000,
        currency: 'INR',
        paymentProvider: 'sandbox',
        paymentReference: 'CT-TXN-MED-9941',
        status: 'successful',
        message: 'Blessings to the doctors and nurses serving our remote mountain brothers and sisters!',
        donorName: priya.name,
        donorEmail: priya.email,
        isAnonymous: false,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      },
      {
        donor: rohan._id,
        campaign: campMedical._id,
        amount: 50000,
        currency: 'INR',
        paymentProvider: 'sandbox',
        paymentReference: 'CT-TXN-MED-9942',
        status: 'successful',
        message: 'In honor of Dr. Aisha Patel’s tireless dedication to grassroots healthcare.',
        donorName: rohan.name,
        donorEmail: rohan.email,
        isAnonymous: false,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        donor: neha._id,
        campaign: campMedical._id,
        amount: 15000,
        currency: 'INR',
        paymentProvider: 'sandbox',
        paymentReference: 'CT-TXN-MED-9943',
        status: 'successful',
        message: 'Proud to see the milestone receipts posted transparently.',
        donorName: neha.name,
        donorEmail: neha.email,
        isAnonymous: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        campaign: campMedical._id,
        amount: 10000,
        currency: 'INR',
        paymentProvider: 'sandbox',
        paymentReference: 'CT-TXN-MED-9944',
        status: 'successful',
        message: 'Keep going! Every village deserves access to doctors.',
        donorName: 'Anonymous Supporter',
        isAnonymous: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        donor: priya._id,
        campaign: campWater._id,
        amount: 30000,
        currency: 'INR',
        paymentProvider: 'sandbox',
        paymentReference: 'CT-TXN-WAT-8811',
        status: 'successful',
        message: 'Clean water is a fundamental human right. Amazing initiative Rajesh!',
        donorName: priya.name,
        donorEmail: priya.email,
        isAnonymous: false,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
      {
        donor: rohan._id,
        campaign: campCode._id,
        amount: 40000,
        currency: 'INR',
        paymentProvider: 'sandbox',
        paymentReference: 'CT-TXN-EDU-7711',
        status: 'successful',
        message: 'Excited to see future women engineers code their first algorithms!',
        donorName: rohan.name,
        donorEmail: rohan.email,
        isAnonymous: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ]);

    // Create Campaign Updates
    console.log('[Seed] Creating campaign updates...');
    await CampaignUpdate.insertMany([
      {
        campaign: campMedical._id,
        title: 'Mobile Clinic Van custom fitment complete & Telemedicine uplink tested!',
        content: `We are thrilled to share that the 4WD mobile medical van is fully assembled and certified! The point-of-care blood analyzer and ultrasound equipment have been mounted on vibration-dampened medical racks. Yesterday, we completed our first test video consultation with AIIMS Rishikesh doctors using the roof-mounted satellite modem.

Next week, our medical crew will commence trial health camps across Mana and Bhyundar valleys. Thank you to our 140+ supporters for believing in transparent healthcare!`,
        images: [
          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
        ],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        campaign: campWater._id,
        title: 'Solar arrays powered on in first 4 villages — Water testing shows 94% fluoride reduction',
        content: `Great news from Barmer! The 4kW solar arrays are generating steady power even on hazy days. Independent laboratory tests on filtered samples from Kalu ki Dhani show TDS reduced from 2,100 ppm down to 140 ppm, and fluoride levels safely within WHO drinking standards.`,
        images: [
          'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
        ],
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
      {
        campaign: campCode._id,
        title: '30 Laptops delivered to Howrah Government Girls High School',
        content: `The computer lab at Howrah Girls School is buzzing! 30 ThinkPads have been installed with Ubuntu Linux and Python IDEs. Our first cohort of 60 students learned print statements and turtle graphics today.`,
        images: [
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        ],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ]);

    // Create Measurable Impact Metrics
    console.log('[Seed] Creating impact metrics...');
    await Impact.insertMany([
      {
        campaign: campMedical._id,
        metricName: 'Patients Screened & Treated',
        metricValue: 1420,
        unit: 'patients',
        description: 'Individuals receiving free health checkups, blood tests, and medication.',
      },
      {
        campaign: campMedical._id,
        metricName: 'High-Altitude Villages Reached',
        metricValue: 18,
        unit: 'villages',
        description: 'Mountain hamlets with active weekly telemedicine visits.',
      },
      {
        campaign: campMedical._id,
        metricName: 'Prenatal Ultrasounds Conducted',
        metricValue: 88,
        unit: 'mothers',
        description: 'Expectant mothers receiving vital scans in remote settings.',
      },
      {
        campaign: campWater._id,
        metricName: 'Daily Potable Water Generated',
        metricValue: 8000,
        unit: 'liters/day',
        description: 'Certified fluoride-free drinking water produced daily.',
      },
      {
        campaign: campWater._id,
        metricName: 'Villagers with Clean Water Access',
        metricValue: 2400,
        unit: 'people',
        description: 'Residents with daily access to clean water dispensing stations.',
      },
      {
        campaign: campCode._id,
        metricName: 'Girls Enrolled in STEM Coding',
        metricValue: 250,
        unit: 'students',
        description: 'Female students completing weekly programming labs.',
      },
      {
        campaign: campCode._id,
        metricName: 'Software Projects Completed',
        metricValue: 42,
        unit: 'projects',
        description: 'Working web applications and robotics code written by student teams.',
      },
    ]);

    // Create Comments
    console.log('[Seed] Creating comments...');
    await Comment.insertMany([
      {
        campaign: campMedical._id,
        user: priya._id,
        content: 'Seeing the itemized receipts for the mobile clinic van gives me so much confidence in CrowdTrust. Keep up the phenomenal work Dr. Aisha!',
      },
      {
        campaign: campMedical._id,
        user: rohan._id,
        content: 'The satellite telemedicine capability is a game-changer for mountain communities. Super proud to back this campaign.',
      },
      {
        campaign: campWater._id,
        user: neha._id,
        content: 'Community-owned solar kiosks are the sustainable way forward. Congratulations Rajesh and the Maru Jal team on hitting milestone 1!',
      },
    ]);

    // Create Sample Report for Admin Moderation
    console.log('[Seed] Creating sample moderation report...');
    await Report.insertMany([
      {
        reportedBy: neha._id,
        campaign: campAgBot._id,
        reason: 'Misleading information',
        description: 'Requesting clarification on battery cycle life specifications mentioned in campaign story.',
        status: 'pending',
        adminNotes: '',
      },
    ]);

    // Create Sample In-App Notifications
    console.log('[Seed] Creating notification records...');
    await Notification.insertMany([
      {
        recipient: adminUser._id,
        type: 'CAMPAIGN_APPROVED',
        title: 'New Campaign Pending Review',
        message: `Campaign "Community Seed Bank & Native Tree Reforestation Initiative" requires compliance approval.`,
        link: `/admin/campaigns`,
        read: false,
      },
      {
        recipient: aisha._id,
        type: 'DONATION_RECEIVED',
        title: 'New Donation: ₹50,000',
        message: 'Rohan Gupta made a generous contribution to your campaign.',
        link: `/campaigns/${campMedical.slug}`,
        read: false,
      },
      {
        recipient: priya._id,
        type: 'CAMPAIGN_UPDATE',
        title: 'New update on Himalayan Mobile Medical Clinic',
        message: 'Mobile Clinic Van fitment complete and telemedicine tested!',
        link: `/campaigns/${campMedical.slug}`,
        read: false,
      },
    ]);

    // Add bookmark for Priya
    await User.findByIdAndUpdate(priya._id, {
      $push: { bookmarks: [campMedical._id, campWater._id] },
    });

    console.log('===========================================================');
    console.log('  🎉 CrowdTrust Database Seeded Successfully!');
    console.log('===========================================================');
    console.log('  TEST USER ACCOUNTS:');
    console.log('  ---------------------------------------------------------');
    console.log('  🛡️  Admin:   admin@crowdtrust.org       / Admin@12345#');
    console.log('  👩‍⚕️ Creator: aisha@ruralhealth.org      / Creator@12345#');
    console.log('  💧 Creator: rajesh@cleanwater.org      / Creator@12345#');
    console.log('  👩‍💻 Creator: ananya@girlsincode.org     / Creator@12345#');
    console.log('  💡 Creator: vikram@solarnext.org       / Creator@12345#');
    console.log('  💖 Donor:   priya@example.com          / Donor@12345#');
    console.log('  💼 Donor:   rohan@example.com          / Donor@12345#');
    console.log('  🌿 Donor:   neha@example.com           / Donor@12345#');
    console.log('===========================================================');

    if (process.argv[1].endsWith('seedRunner.js')) {
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    if (process.argv[1].endsWith('seedRunner.js')) {
      process.exit(1);
    }
  }
};

// If run directly via node
if (process.argv[1].endsWith('seedRunner.js')) {
  seedDatabase();
}
