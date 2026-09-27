/**
 * CrowdTrust Comprehensive Campaigns Dataset
 * Realistic Indian Crowdfunding Campaigns across 8 core categories + All
 */

export const CAMPAIGNS_DATA = [
  // ==========================================
  // CATEGORY 1: EDUCATION
  // ==========================================
  {
    id: 'edu-001',
    _id: '674f1001e4b0000000000001',
    slug: 'empowering-500-girls-coding-robotics-labs',
    category: 'Education',
    title: 'Empowering 500 Underprivileged Girls with Coding & Robotics Labs',
    location: 'Kolkata & Howrah, West Bengal',
    shortDescription:
      'Setting up computer science innovation labs, Raspberry Pi hardware kits, and mentorship programs for adolescent girls.',
    fullDescription:
      'Over 500 bright young girls in suburban Kolkata and Howrah government-aided schools lack access to basic computer labs and hands-on STEM education. This initiative builds fully equipped digital innovation centers featuring 40 low-power Raspberry Pi computing stations, Arduino robotics starter packs, internet connectivity, and weekly project-based coding workshops in Scratch, Python, and web development. Through CrowdTrust’s transparent milestone tracking, donors receive verified equipment purchase receipts, attendance audit logs, and student showcase videos.',
    description:
      'Over 500 bright young girls in suburban Kolkata and Howrah government-aided schools lack access to basic computer labs and hands-on STEM education. This initiative builds fully equipped digital innovation centers featuring 40 low-power Raspberry Pi computing stations, Arduino robotics starter packs, internet connectivity, and weekly project-based coding workshops in Scratch, Python, and web development. Through CrowdTrust’s transparent milestone tracking, donors receive verified equipment purchase receipts, attendance audit logs, and student showcase videos.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1500000,
    raisedAmount: 1120000,
    donorCount: 248,
    daysLeft: 24,
    daysRemaining: 24,
    deadline: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Arundhati Roychowdhury',
    creatorOrganization: 'Vidya Shiksha Mission',
    createdDate: '2026-08-15T10:00:00.000Z',
    createdAt: '2026-08-15T10:00:00.000Z',
    beneficiary: '500+ Middle and High School Girls in Howrah District',
    isFeatured: true,
    budget: [
      { category: 'Hardware', amount: 750000, description: '40 Raspberry Pi 5 desktop kits with monitors and keyboards' },
      { category: 'Robotics Kits', amount: 350000, description: 'Arduino sensor kits, servo motors, and breadboards' },
      { category: 'Connectivity & Training', amount: 250000, description: 'Broadband routers, LMS licensing, and trainer honorarium' },
      { category: 'Operations & Maintenance', amount: 150000, description: 'Lab electrical setup, backup UPS, and ongoing tech support' },
    ],
  },
  {
    id: 'edu-002',
    _id: '674f1001e4b0000000000002',
    slug: 'digital-classrooms-rural-government-schools',
    category: 'Education',
    title: 'Digital Classrooms for Rural Government Schools',
    location: 'Dharwad, Karnataka',
    shortDescription:
      'Providing smart classroom equipment, projectors, internet connectivity, and digital learning resources to rural schools.',
    fullDescription:
      'Rural government schools in Dharwad district struggle with outdated textbooks and insufficient visual learning aids. We are transforming 12 rural schools into interactive smart classrooms equipped with ultra-short-throw projectors, solar-powered battery inverters, regional Kannada and English multimedia learning software, and teacher enablement workshops.',
    description:
      'Rural government schools in Dharwad district struggle with outdated textbooks and insufficient visual learning aids. We are transforming 12 rural schools into interactive smart classrooms equipped with ultra-short-throw projectors, solar-powered battery inverters, regional Kannada and English multimedia learning software, and teacher enablement workshops.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 800000,
    raisedAmount: 640000,
    donorCount: 135,
    daysLeft: 18,
    daysRemaining: 18,
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Dr. Ramesh Patil',
    creatorOrganization: 'Grameena Vikas Trust',
    createdDate: '2026-08-20T09:30:00.000Z',
    createdAt: '2026-08-20T09:30:00.000Z',
    beneficiary: '12 Rural Primary & High Schools (2,400+ students)',
    isFeatured: false,
    budget: [
      { category: 'Hardware', amount: 480000, description: '12 Digital smart projectors, screens, and audio speakers' },
      { category: 'Solar Backup', amount: 180000, description: 'Solar inverters and battery backup units for power outages' },
      { category: 'Content & Training', amount: 140000, description: 'Curriculum software licenses and teacher training workshops' },
    ],
  },
  {
    id: 'edu-003',
    _id: '674f1001e4b0000000000003',
    slug: 'scholarships-first-generation-college-students',
    category: 'Education',
    title: 'Scholarships for First-Generation College Students',
    location: 'Patna, Bihar',
    shortDescription:
      'Supporting talented students from low-income families with tuition, books, accommodation, and examination expenses.',
    fullDescription:
      'Countless first-generation college aspirants from agrarian families in Bihar drop out due to rising hostel, book, and semester fees. This scholarship endowment provides comprehensive financial backing, laptops, and career guidance to 60 underprivileged scholars admitted to accredited engineering, sciences, and commerce degree programs.',
    description:
      'Countless first-generation college aspirants from agrarian families in Bihar drop out due to rising hostel, book, and semester fees. This scholarship endowment provides comprehensive financial backing, laptops, and career guidance to 60 underprivileged scholars admitted to accredited engineering, sciences, and commerce degree programs.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1200000,
    raisedAmount: 1200000,
    donorCount: 310,
    daysLeft: 0,
    daysRemaining: 0,
    deadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Siddharth Kumar',
    creatorOrganization: 'Pragati Foundation',
    createdDate: '2026-06-10T14:00:00.000Z',
    createdAt: '2026-06-10T14:00:00.000Z',
    beneficiary: '60 First-Generation College Undergraduates',
    isFeatured: false,
    budget: [
      { category: 'Tuition Grants', amount: 720000, description: 'Direct college semester fee disbursements' },
      { category: 'Hostel & Food', amount: 300000, description: 'Subsidized room, board, and meal stipends' },
      { category: 'Laptops & Books', amount: 180000, description: 'Refurbished laptops and academic reference books' },
    ],
  },

  // ==========================================
  // CATEGORY 2: MEDICAL
  // ==========================================
  {
    id: 'med-001',
    _id: '674f1001e4b0000000000004',
    slug: 'mobile-medical-clinics-remote-himalayan-villages',
    category: 'Medical',
    title: 'Mobile Medical Clinics for Remote Himalayan Villages',
    location: 'Chamoli & Rudraprayag, Uttarakhand',
    shortDescription:
      'Bringing primary medical care, telemedicine diagnostics, and essential pharmaceutical support to remote high-altitude settlements.',
    fullDescription:
      'Over 35 high-altitude Himalayan hamlets are isolated from primary health centers due to rough terrain and winter blockades. Arogya Seva Trust deploys customized 4x4 Mobile Clinic Vans equipped with point-of-care blood analyzers, ECG machines, ultrasound devices, and satellite telemedicine to deliver doorstep doctor consultations and lifesaving pharmaceuticals.',
    description:
      'Over 35 high-altitude Himalayan hamlets are isolated from primary health centers due to rough terrain and winter blockades. Arogya Seva Trust deploys customized 4x4 Mobile Clinic Vans equipped with point-of-care blood analyzers, ECG machines, ultrasound devices, and satellite telemedicine to deliver doorstep doctor consultations and lifesaving pharmaceuticals.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1800000,
    raisedAmount: 1450000,
    donorCount: 360,
    daysLeft: 32,
    daysRemaining: 32,
    deadline: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Dr. Aisha Farooq',
    creatorOrganization: 'Arogya Seva Trust',
    createdDate: '2026-08-01T11:00:00.000Z',
    createdAt: '2026-08-01T11:00:00.000Z',
    beneficiary: '8,500+ Residents across 35 Mountain Hamlets',
    isFeatured: true,
    budget: [
      { category: 'Equipment', amount: 800000, description: 'POC diagnostic analyzers, portable ultrasound, and oxygen units' },
      { category: 'Medicines', amount: 450000, description: 'Essential prescription medicines and pediatric vaccines' },
      { category: 'Vehicle & Satellite', amount: 350000, description: '4WD clinic van maintenance and satellite data uplink' },
      { category: 'Staff Stipends', amount: 200000, description: 'Doctor, nurse, and paramedic field honorariums' },
    ],
  },
  {
    id: 'med-002',
    _id: '674f1001e4b0000000000005',
    slug: 'free-pediatric-heart-surgery-program',
    category: 'Medical',
    title: 'Free Pediatric Heart Surgery Program',
    location: 'Chennai, Tamil Nadu',
    shortDescription:
      'Funding critical heart surgeries and post-operative care for children from financially disadvantaged families.',
    fullDescription:
      'Congenital heart disease affects thousands of newborn children each year in Southern India whose families cannot afford open-heart surgery. In partnership with accredited pediatric cardiac hospitals, Little Hearts Trust sponsors surgical operations, ICU post-op monitoring, and follow-up cardiac rehabilitation for 25 critically ill infants and children.',
    description:
      'Congenital heart disease affects thousands of newborn children each year in Southern India whose families cannot afford open-heart surgery. In partnership with accredited pediatric cardiac hospitals, Little Hearts Trust sponsors surgical operations, ICU post-op monitoring, and follow-up cardiac rehabilitation for 25 critically ill infants and children.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 2500000,
    raisedAmount: 1980000,
    donorCount: 420,
    daysLeft: 15,
    daysRemaining: 15,
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Dr. K. Senthil Nathan',
    creatorOrganization: 'Little Hearts Medical Trust',
    createdDate: '2026-08-10T12:00:00.000Z',
    createdAt: '2026-08-10T12:00:00.000Z',
    beneficiary: '25 Children with Critical Congenital Heart Defects',
    isFeatured: true,
    budget: [
      { category: 'Surgical Operations', amount: 1600000, description: '25 Open-heart and catheterization surgical procedures' },
      { category: 'ICU & Recovery', amount: 600000, description: 'Post-operative pediatric intensive care hospitalization' },
      { category: 'Medications', amount: 300000, description: 'Cardio-protective medications and follow-up echo screenings' },
    ],
  },
  {
    id: 'med-003',
    _id: '674f1001e4b0000000000006',
    slug: 'cancer-screening-camps-for-rural-women',
    category: 'Medical',
    title: 'Cancer Screening Camps for Rural Women',
    location: 'Nashik, Maharashtra',
    shortDescription:
      'Organizing mobile screening camps for early detection of breast and cervical cancer in underserved communities.',
    fullDescription:
      'Early detection saves lives, yet rural women in the tribal belts of Nashik frequently present with advanced stage 3 and 4 cancers due to stigma, lack of awareness, and zero local screening facilities. Sneh Seva Sanstha operates specialized mobile mammography and pap smear screening clinics, providing counseling, early detection tests, and direct hospital referrals.',
    description:
      'Early detection saves lives, yet rural women in the tribal belts of Nashik frequently present with advanced stage 3 and 4 cancers due to stigma, lack of awareness, and zero local screening facilities. Sneh Seva Sanstha operates specialized mobile mammography and pap smear screening clinics, providing counseling, early detection tests, and direct hospital referrals.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 950000,
    raisedAmount: 720000,
    donorCount: 185,
    daysLeft: 28,
    daysRemaining: 28,
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Dr. Vandana Deshmukh',
    creatorOrganization: 'Sneh Seva Sanstha',
    createdDate: '2026-08-18T10:15:00.000Z',
    createdAt: '2026-08-18T10:15:00.000Z',
    beneficiary: '3,000+ Women in Tribal and Rural Nashik',
    isFeatured: false,
    budget: [
      { category: 'Screening Kits & Lab', amount: 500000, description: 'Pap smear kits, portable ultrasound, and biopsy processing' },
      { category: 'Camp Logistics', amount: 250000, description: 'Mobile medical van fuel, tents, and patient counseling materials' },
      { category: 'Referral Fund', amount: 200000, description: 'Emergency financial aid for confirmed oncology referrals' },
    ],
  },

  // ==========================================
  // CATEGORY 3: EMERGENCY
  // ==========================================
  {
    id: 'emg-001',
    _id: '674f1001e4b0000000000007',
    slug: 'flood-relief-emergency-supplies-assam-villages',
    category: 'Emergency',
    title: 'Flood Relief & Emergency Supplies for Assam Villages',
    location: 'Dibrugarh & Majuli, Assam',
    shortDescription:
      'Providing emergency food, drinking water, hygiene kits, temporary shelters, and essential supplies to flood-affected families.',
    fullDescription:
      'Severe monsoon flooding along the Brahmaputra River basin has submerged over 40 villages in Majuli and Dibrugarh, displacing thousands of families. Our disaster response team is on the ground deploying motorized rescue boats, distributing family survival dry-ration kits, water purification tablets, solar lamps, mosquito nets, and tarpaulin shelters.',
    description:
      'Severe monsoon flooding along the Brahmaputra River basin has submerged over 40 villages in Majuli and Dibrugarh, displacing thousands of families. Our disaster response team is on the ground deploying motorized rescue boats, distributing family survival dry-ration kits, water purification tablets, solar lamps, mosquito nets, and tarpaulin shelters.',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1600000,
    raisedAmount: 1380000,
    donorCount: 512,
    daysLeft: 9,
    daysRemaining: 9,
    deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Bipul Saikia',
    creatorOrganization: 'Brahmaputra Disaster Relief Force',
    createdDate: '2026-09-01T08:00:00.000Z',
    createdAt: '2026-09-01T08:00:00.000Z',
    beneficiary: '1,200 Displaced Flood Survivor Households',
    isFeatured: true,
    budget: [
      { category: 'Rations & Nutrition', amount: 800000, description: '1,200 15-day family food kits (rice, dal, oil, baby food)' },
      { category: 'Clean Water & Hygiene', amount: 350000, description: 'Chlorine purification tablets, jerrycans, and hygiene kits' },
      { category: 'Shelter Materials', amount: 300000, description: 'Heavy-duty waterproof tarpaulins, rope, and solar lanterns' },
      { category: 'Boat Fuel & Rescue', amount: 150000, description: 'Motorized inflatable boat logistics and volunteer safety gear' },
    ],
  },
  {
    id: 'emg-002',
    _id: '674f1001e4b0000000000008',
    slug: 'emergency-ambulance-support-rural-communities',
    category: 'Emergency',
    title: 'Emergency Ambulance Support for Rural Communities',
    location: 'Gaya, Bihar',
    shortDescription:
      'Providing a community ambulance and emergency transport services for villages located far from hospitals.',
    fullDescription:
      'In rural Gaya, critical patients and expectant mothers facing labor complications frequently travel hours in slow bullock carts or open auto-rickshaws to reach emergency care. This campaign funds a dedicated, 24/7 basic life support community ambulance, staffed by certified emergency medical technicians and equipped with oxygen and automated defibrillators.',
    description:
      'In rural Gaya, critical patients and expectant mothers facing labor complications frequently travel hours in slow bullock carts or open auto-rickshaws to reach emergency care. This campaign funds a dedicated, 24/7 basic life support community ambulance, staffed by certified emergency medical technicians and equipped with oxygen and automated defibrillators.',
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1100000,
    raisedAmount: 890000,
    donorCount: 204,
    daysLeft: 21,
    daysRemaining: 21,
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Anil Sharma',
    creatorOrganization: 'Jeevan Raksha Mission',
    createdDate: '2026-08-25T14:30:00.000Z',
    createdAt: '2026-08-25T14:30:00.000Z',
    beneficiary: '18 Isolated Villages in Gaya District',
    isFeatured: false,
    budget: [
      { category: 'Vehicle Purchase', amount: 750000, description: 'Modified Force Trax ambulance chassis' },
      { category: 'Medical Equipment', amount: 200000, description: 'Oxygen delivery system, stretcher, and emergency AED kit' },
      { category: 'Fuel & Driver', amount: 150000, description: 'First 6 months fuel reserve and emergency driver stipend' },
    ],
  },
  {
    id: 'emg-003',
    _id: '674f1001e4b0000000000009',
    slug: 'rebuilding-homes-after-coastal-cyclone',
    category: 'Emergency',
    title: 'Rebuilding Homes After Coastal Cyclone',
    location: 'Balasore, Odisha',
    shortDescription:
      'Helping affected families rebuild damaged homes and replace essential household supplies after severe cyclone damage.',
    fullDescription:
      'Tropical Cyclone Yaas decimated coastal fishing hamlets in Balasore, flattening thatched mud dwellings and washing away livelihood fishing nets. Utkal Punarnirman Relief successfully constructed 45 disaster-resilient brick-and-tin roof housing units with reinforced bamboo framework, solar roof lanterns, and sanitation toilet blocks.',
    description:
      'Tropical Cyclone Yaas decimated coastal fishing hamlets in Balasore, flattening thatched mud dwellings and washing away livelihood fishing nets. Utkal Punarnirman Relief successfully constructed 45 disaster-resilient brick-and-tin roof housing units with reinforced bamboo framework, solar roof lanterns, and sanitation toilet blocks.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 2200000,
    raisedAmount: 2200000,
    donorCount: 490,
    daysLeft: 0,
    daysRemaining: 0,
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Manoj Mohapatra',
    creatorOrganization: 'Utkal Punarnirman Relief',
    createdDate: '2026-05-15T09:00:00.000Z',
    createdAt: '2026-05-15T09:00:00.000Z',
    beneficiary: '45 Coastal Fisherfolk Families',
    isFeatured: false,
    budget: [
      { category: 'Building Materials', amount: 1400000, description: 'Reinforced CGI roofing sheets, bricks, cement, and treated wood' },
      { category: 'Sanitation Blocks', amount: 500000, description: '45 Twin-pit pour-flush eco-sanitation toilets' },
      { category: 'Livelihood Tool Kits', amount: 300000, description: 'Replacement fishing nets, floats, and repair supplies' },
    ],
  },

  // ==========================================
  // CATEGORY 4: ENVIRONMENT
  // ==========================================
  {
    id: 'env-001',
    _id: '674f1001e4b0000000000010',
    slug: 'restoring-50-acres-native-forest',
    category: 'Environment',
    title: 'Restoring 50 Acres of Native Forest',
    location: 'Western Ghats, Kerala',
    shortDescription:
      'Restoring degraded land using native tree species and creating community-managed forest restoration zones.',
    fullDescription:
      'Unchecked deforestation and monoculture plantations in the Western Ghats have eroded vital biodiversity corridors and worsened landslide vulnerabilities. Sahyadri Ecology Conservation works with indigenous tribal communities to reforest 50 acres of degraded slopes with 25,000 endemic rainforest species (Myristica, Hopea, and Dipterocarpus), providing long-term soil stability and carbon sequestration.',
    description:
      'Unchecked deforestation and monoculture plantations in the Western Ghats have eroded vital biodiversity corridors and worsened landslide vulnerabilities. Sahyadri Ecology Conservation works with indigenous tribal communities to reforest 50 acres of degraded slopes with 25,000 endemic rainforest species (Myristica, Hopea, and Dipterocarpus), providing long-term soil stability and carbon sequestration.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1400000,
    raisedAmount: 1050000,
    donorCount: 275,
    daysLeft: 35,
    daysRemaining: 35,
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Ananya Menon',
    creatorOrganization: 'Sahyadri Ecology Conservation',
    createdDate: '2026-08-05T10:00:00.000Z',
    createdAt: '2026-08-05T10:00:00.000Z',
    beneficiary: 'Western Ghats Biodiversity Reserve & Local Adivasi Families',
    isFeatured: true,
    budget: [
      { category: 'Sapling Propagation', amount: 650000, description: 'Nursery raising of 25,000 native endemic rainforest saplings' },
      { category: 'Community Wages', amount: 450000, description: 'Direct daily wages for planting, pitting, and weeding by tribal youth' },
      { category: 'Bio-Fencing & Mulch', amount: 200000, description: 'Organic mulching, cattle protection fencing, and bio-manure' },
      { category: 'GPS & Drone Audits', amount: 100000, description: 'Geo-tagged photographic survival tracking for CrowdTrust escrow' },
    ],
  },
  {
    id: 'env-002',
    _id: '674f1001e4b0000000000011',
    slug: 'clean-river-initiative',
    category: 'Environment',
    title: 'Clean River Initiative',
    location: 'Yamuna River Communities, Delhi',
    shortDescription:
      'Supporting community-led river cleanup, waste collection, awareness programs, and responsible waste management.',
    fullDescription:
      'Solid non-biodegradable plastics and religious offerings choke the Yamuna riverbanks across the National Capital Region. This project mobilizes 1,500 local citizen volunteers and waste-picker collectives, deploying floating trash barriers, daily river surface cleanup boats, and establishing community composting and plastic upcycling stations.',
    description:
      'Solid non-biodegradable plastics and religious offerings choke the Yamuna riverbanks across the National Capital Region. This project mobilizes 1,500 local citizen volunteers and waste-picker collectives, deploying floating trash barriers, daily river surface cleanup boats, and establishing community composting and plastic upcycling stations.',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 750000,
    raisedAmount: 580000,
    donorCount: 160,
    daysLeft: 19,
    daysRemaining: 19,
    deadline: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Rajiv Verma',
    creatorOrganization: 'Yamuna Jal Swachhata Abhiyan',
    createdDate: '2026-08-12T16:00:00.000Z',
    createdAt: '2026-08-12T16:00:00.000Z',
    beneficiary: 'Yamuna River Catchment Ecosystem & Ghat Communities',
    isFeatured: false,
    budget: [
      { category: 'Trash Skimmer Boat', amount: 350000, description: 'Surface debris boom skimmer operations and fuel' },
      { category: 'Protective Gear', amount: 200000, description: 'Heavy-duty gloves, waders, and safety vests for 150 volunteers' },
      { category: 'Recycling Processing', amount: 200000, description: 'Sorting station logistics and material recovery tie-ins' },
    ],
  },
  {
    id: 'env-003',
    _id: '674f1001e4b0000000000012',
    slug: 'solar-water-pumps-drought-affected-farms',
    category: 'Environment',
    title: 'Solar Water Pumps for Drought-Affected Farms',
    location: 'Marathwada, Maharashtra',
    shortDescription:
      'Installing solar-powered water pumps and efficient irrigation systems for smallholder farmers.',
    fullDescription:
      'In the arid belt of Marathwada, erratic grid power and soaring diesel pump costs push debt-burdened smallholder farmers to the brink. Krishi Jal Vikas Trust installs 3HP and 5HP solar photovoltaic pumping systems paired with micro-drip irrigation lines, enabling reliable daytime irrigation while slashing operational fuel expenses to zero.',
    description:
      'In the arid belt of Marathwada, erratic grid power and soaring diesel pump costs push debt-burdened smallholder farmers to the brink. Krishi Jal Vikas Trust installs 3HP and 5HP solar photovoltaic pumping systems paired with micro-drip irrigation lines, enabling reliable daytime irrigation while slashing operational fuel expenses to zero.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1850000,
    raisedAmount: 1420000,
    donorCount: 295,
    daysLeft: 40,
    daysRemaining: 40,
    deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Rajesh Patil',
    creatorOrganization: 'Krishi Jal Vikas Trust',
    createdDate: '2026-08-01T15:00:00.000Z',
    createdAt: '2026-08-01T15:00:00.000Z',
    beneficiary: '30 Marginal Farming Households (120+ acres irrigated)',
    isFeatured: true,
    budget: [
      { category: 'Solar Panels & Pumps', amount: 1200000, description: '15 High-efficiency DC submersible solar pumps and PV arrays' },
      { category: 'Drip Irrigation Lines', amount: 450000, description: 'Micro-tubing, drippers, and sand filtration units' },
      { category: 'Installation & Civil', amount: 200000, description: 'Mounting structures, earthing, and farmer training' },
    ],
  },

  // ==========================================
  // CATEGORY 5: TECHNOLOGY
  // ==========================================
  {
    id: 'tech-001',
    _id: '674f1001e4b0000000000013',
    slug: 'autonomous-solar-ag-bots-smallholder-farmers',
    category: 'Technology',
    title: 'Autonomous Solar Ag-Bots for Smallholder Marginal Farmers',
    location: 'Pune & Vidarbha, Maharashtra',
    shortDescription:
      'Building open-source, ultra-low-cost solar-powered agricultural robots to reduce manual labor costs for farmers.',
    fullDescription:
      'Rising farm labor costs and scorching daytime heat make manual de-weeding and pesticide spraying unsustainable for marginal 1-to-2 acre farmers. AgriTech Open Innovations designs and builds ruggedized, solar-rechargeable electric rovers with computer-vision weed targeting and automated precision drip sprayers at 1/5th the commercial market cost.',
    description:
      'Rising farm labor costs and scorching daytime heat make manual de-weeding and pesticide spraying unsustainable for marginal 1-to-2 acre farmers. AgriTech Open Innovations designs and builds ruggedized, solar-rechargeable electric rovers with computer-vision weed targeting and automated precision drip sprayers at 1/5th the commercial market cost.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1200000,
    raisedAmount: 940000,
    donorCount: 198,
    daysLeft: 26,
    daysRemaining: 26,
    deadline: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Nikhil Joshi',
    creatorOrganization: 'AgriTech Open Innovations',
    createdDate: '2026-08-14T11:20:00.000Z',
    createdAt: '2026-08-14T11:20:00.000Z',
    beneficiary: '150+ Cotton and Soybean Farmers in Vidarbha',
    isFeatured: true,
    budget: [
      { category: 'Hardware & Motors', amount: 550000, description: 'BLDC planetary hub motors, chassis steel, and solar cells' },
      { category: 'AI Edge Compute', amount: 350000, description: 'Embedded vision compute boards and camera sensors' },
      { category: 'Field Trials & Testing', amount: 200000, description: '50-acre farmer field trials and reliability tuning' },
      { category: 'Open-Source Release', amount: 100000, description: 'Hardware schematics, assembly manuals, and CAD files' },
    ],
  },
  {
    id: 'tech-002',
    _id: '674f1001e4b0000000000014',
    slug: 'ai-learning-lab-rural-students',
    category: 'Technology',
    title: 'AI Learning Lab for Rural Students',
    location: 'Jaipur, Rajasthan',
    shortDescription:
      'Creating an affordable technology lab where students can learn programming, artificial intelligence, robotics, and digital skills.',
    fullDescription:
      'Rural semi-urban students in Rajasthan often lack practical exposure to modern artificial intelligence, machine learning concepts, and algorithmic problem-solving. Thar Tech Literacy Foundation creates a solar-backed learning facility equipped with GPU workstations, robotics kits, and bilingual foundational AI curricula.',
    description:
      'Rural semi-urban students in Rajasthan often lack practical exposure to modern artificial intelligence, machine learning concepts, and algorithmic problem-solving. Thar Tech Literacy Foundation creates a solar-backed learning facility equipped with GPU workstations, robotics kits, and bilingual foundational AI curricula.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 900000,
    raisedAmount: 680000,
    donorCount: 145,
    daysLeft: 30,
    daysRemaining: 30,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Meera Rathore',
    creatorOrganization: 'Thar Tech Literacy Foundation',
    createdDate: '2026-08-22T13:45:00.000Z',
    createdAt: '2026-08-22T13:45:00.000Z',
    beneficiary: '300+ Rural High School & Polytechnic Students',
    isFeatured: false,
    budget: [
      { category: 'Workstations', amount: 500000, description: '10 Entry GPU compute nodes with dual displays' },
      { category: 'Robotics Sensors', amount: 250000, description: 'Vision sensor modules, micro-controllers, and AI kits' },
      { category: 'Curriculum & Mentors', amount: 150000, description: 'Interactive course material and student mentorship stipends' },
    ],
  },
  {
    id: 'tech-003',
    _id: '674f1001e4b0000000000015',
    slug: 'open-source-assistive-technology-disabilities',
    category: 'Technology',
    title: 'Open-Source Assistive Technology for People with Disabilities',
    location: 'Bengaluru, Karnataka',
    shortDescription:
      'Developing affordable open-source assistive devices using 3D printing and accessible electronics.',
    fullDescription:
      'Commercial prosthetic limbs and specialized tactile communication devices cost tens of thousands of rupees, making them inaccessible for low-income families. EnableTech Lab develops modular 3D-printed bionic hands, sip-and-puff wheelchair navigation controllers, and open-source braille e-readers at under 10% of commercial prices.',
    description:
      'Commercial prosthetic limbs and specialized tactile communication devices cost tens of thousands of rupees, making them inaccessible for low-income families. EnableTech Lab develops modular 3D-printed bionic hands, sip-and-puff wheelchair navigation controllers, and open-source braille e-readers at under 10% of commercial prices.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1500000,
    raisedAmount: 1150000,
    donorCount: 260,
    daysLeft: 22,
    daysRemaining: 22,
    deadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Karthik Ramaswamy',
    creatorOrganization: 'EnableTech Lab',
    createdDate: '2026-08-16T10:00:00.000Z',
    createdAt: '2026-08-16T10:00:00.000Z',
    beneficiary: '120+ Individuals with Limb Differences & Visual Impairments',
    isFeatured: false,
    budget: [
      { category: '3D Printers & Materials', amount: 600000, description: 'Industrial FDM/SLA 3D printers, carbon-fiber nylon, and medical silicone' },
      { category: 'Electronics & EMG', amount: 500000, description: 'Myoelectric EMG muscle sensors, micro-linear actuators, and PCB runs' },
      { category: 'Clinical Fittings', amount: 400000, description: 'Orthopedic clinician fitting sessions and patient rehabilitation' },
    ],
  },

  // ==========================================
  // CATEGORY 6: COMMUNITY
  // ==========================================
  {
    id: 'com-001',
    _id: '674f1001e4b0000000000016',
    slug: 'community-water-purification-center',
    category: 'Community',
    title: 'Community Water Purification Center',
    location: 'Anantapur, Andhra Pradesh',
    shortDescription:
      'Installing a community-scale water purification system to provide safe drinking water to local households.',
    fullDescription:
      'High fluoride levels in the groundwater of rural Anantapur have caused widespread skeletal deformities and kidney ailments among local village elders and schoolchildren. Rayalaseema Samrudhi Sangham is installing a decentralized 2,000 liters/hour multi-stage RO and mineral restoration water plant powered by solar panels.',
    description:
      'High fluoride levels in the groundwater of rural Anantapur have caused widespread skeletal deformities and kidney ailments among local village elders and schoolchildren. Rayalaseema Samrudhi Sangham is installing a decentralized 2,000 liters/hour multi-stage RO and mineral restoration water plant powered by solar panels.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 850000,
    raisedAmount: 710000,
    donorCount: 172,
    daysLeft: 14,
    daysRemaining: 14,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Venkatesh Rao',
    creatorOrganization: 'Rayalaseema Samrudhi Sangham',
    createdDate: '2026-08-19T08:30:00.000Z',
    createdAt: '2026-08-19T08:30:00.000Z',
    beneficiary: '850 Rural Families across 4 Villages',
    isFeatured: true,
    budget: [
      { category: 'Purification Plant', amount: 500000, description: 'Commercial RO membranes, UV sterilizer, and mineralizer unit' },
      { category: 'Civil Building', amount: 200000, description: 'Clean room kiosk enclosure, stainless storage tanks, and water ATM' },
      { category: 'Quality Testing', amount: 150000, description: 'Monthly NABL accredited water lab certifications for 1 year' },
    ],
  },
  {
    id: 'com-002',
    _id: '674f1001e4b0000000000017',
    slug: 'women-led-community-skill-development-center',
    category: 'Community',
    title: 'Women-Led Community Skill Development Center',
    location: 'Lucknow, Uttar Pradesh',
    shortDescription:
      'Creating a training center where women can learn tailoring, digital skills, bookkeeping, and small-business management.',
    fullDescription:
      'Pragati Mahila Kalyan Samiti establishes a dedicated vocational and micro-enterprise academy in peri-urban Lucknow. Over 200 homemakers and young women from low-income households receive certified training in Chikankari embroidery, modern tailoring, computerized invoicing, and digital payments to establish independent self-help businesses.',
    description:
      'Pragati Mahila Kalyan Samiti establishes a dedicated vocational and micro-enterprise academy in peri-urban Lucknow. Over 200 homemakers and young women from low-income households receive certified training in Chikankari embroidery, modern tailoring, computerized invoicing, and digital payments to establish independent self-help businesses.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1100000,
    raisedAmount: 880000,
    donorCount: 215,
    daysLeft: 27,
    daysRemaining: 27,
    deadline: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Farida Begum',
    creatorOrganization: 'Pragati Mahila Kalyan Samiti',
    createdDate: '2026-08-11T12:00:00.000Z',
    createdAt: '2026-08-11T12:00:00.000Z',
    beneficiary: '200 Women Artisans & Micro-Entrepreneurs',
    isFeatured: false,
    budget: [
      { category: 'Sewing Machinery', amount: 550000, description: '25 Industrial sewing machines, overlock machines, and cutting tables' },
      { category: 'Computer Lab', amount: 300000, description: '8 Computer stations for digital invoicing and financial literacy' },
      { category: 'Raw Materials', amount: 250000, description: 'Fabrics, threads, embroidery kits, and workshop honorariums' },
    ],
  },
  {
    id: 'com-003',
    _id: '674f1001e4b0000000000018',
    slug: 'community-library-learning-center',
    category: 'Community',
    title: 'Community Library & Learning Center',
    location: 'Ranchi, Jharkhand',
    shortDescription:
      'Building a neighborhood library and study center with books, computers, internet access, and educational programs.',
    fullDescription:
      'In marginalized neighborhoods of Ranchi, students living in cramped single-room dwellings have no quiet space or books for study and exam preparation. Birsa Munda Youth Trust constructs a vibrant community library with 3,000 books, competitive exam guides, solar power backup, high-speed WiFi, and evening peer mentorship sessions.',
    description:
      'In marginalized neighborhoods of Ranchi, students living in cramped single-room dwellings have no quiet space or books for study and exam preparation. Birsa Munda Youth Trust constructs a vibrant community library with 3,000 books, competitive exam guides, solar power backup, high-speed WiFi, and evening peer mentorship sessions.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 650000,
    raisedAmount: 520000,
    donorCount: 128,
    daysLeft: 38,
    daysRemaining: 38,
    deadline: new Date(Date.now() + 38 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Hemant Soren',
    creatorOrganization: 'Birsa Munda Youth Trust',
    createdDate: '2026-08-28T09:10:00.000Z',
    createdAt: '2026-08-28T09:10:00.000Z',
    beneficiary: '400+ Local Students and Competitive Exam Aspirants',
    isFeatured: false,
    budget: [
      { category: 'Books & Reference', amount: 300000, description: '3,000 Academic, competitive exam, and regional literature books' },
      { category: 'Furniture & Study Desks', amount: 200000, description: 'Reading desks, ergonomic chairs, and book display racks' },
      { category: 'Computers & Solar', amount: 150000, description: '4 Research computers, solar inverter, and broadband link' },
    ],
  },

  // ==========================================
  // CATEGORY 7: CREATIVE PROJECTS
  // ==========================================
  {
    id: 'crt-001',
    _id: '674f1001e4b0000000000019',
    slug: 'preserving-traditional-indian-handicrafts',
    category: 'Creative Projects',
    title: 'Preserving Traditional Indian Handicrafts',
    location: 'Jaipur, Rajasthan',
    shortDescription:
      'Supporting local artisans through workshops, documentation, product development, and digital marketplaces.',
    fullDescription:
      'Generations-old hand-block printing (Bagru & Sanganeri) and blue pottery traditions in Rajasthan face extinction from industrial synthetic fabrics and mass-produced ceramics. Virasat Craft Guild documents master artisan techniques, supplies non-toxic natural indigo dyes and eco-clay, and equips 80 hereditary artisan families with direct e-commerce channels.',
    description:
      'Generations-old hand-block printing (Bagru & Sanganeri) and blue pottery traditions in Rajasthan face extinction from industrial synthetic fabrics and mass-produced ceramics. Virasat Craft Guild documents master artisan techniques, supplies non-toxic natural indigo dyes and eco-clay, and equips 80 hereditary artisan families with direct e-commerce channels.',
    image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 950000,
    raisedAmount: 730000,
    donorCount: 154,
    daysLeft: 33,
    daysRemaining: 33,
    deadline: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Gayatri Devi',
    creatorOrganization: 'Virasat Craft Guild',
    createdDate: '2026-08-08T15:00:00.000Z',
    createdAt: '2026-08-08T15:00:00.000Z',
    beneficiary: '80 Hereditary Craft Artisan Families in Bagru & Sanganer',
    isFeatured: true,
    budget: [
      { category: 'Natural Dyes & Raw Clay', amount: 450000, description: 'Bulk procurement of natural indigo, madder root, and pottery clay' },
      { category: 'Workshops & Documentation', amount: 300000, description: 'Master craftsman training modules and digital video archives' },
      { category: 'Exhibition & Direct Sales', amount: 200000, description: 'Fair-trade market booths, packaging, and digital storefront setup' },
    ],
  },
  {
    id: 'crt-002',
    _id: '674f1001e4b0000000000020',
    slug: 'independent-documentary-rural-artists',
    category: 'Creative Projects',
    title: 'Independent Documentary on Rural Artists',
    location: 'Kutch, Gujarat',
    shortDescription:
      'Producing a documentary that documents the lives, traditions, and creative work of rural artists.',
    fullDescription:
      'Across the salt desert hamlets of Kutch, nomadic folk musicians, Rogan fabric painters, and leather craftswomen practice endangered folk art forms. Kala Sangam Cinema Collective is filming a feature-length independent documentary to preserve their stories, oral histories, and folk melodies in 4K resolution with international festival distribution.',
    description:
      'Across the salt desert hamlets of Kutch, nomadic folk musicians, Rogan fabric painters, and leather craftswomen practice endangered folk art forms. Kala Sangam Cinema Collective is filming a feature-length independent documentary to preserve their stories, oral histories, and folk melodies in 4K resolution with international festival distribution.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 700000,
    raisedAmount: 540000,
    donorCount: 118,
    daysLeft: 20,
    daysRemaining: 20,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Devendra Jadeja',
    creatorOrganization: 'Kala Sangam Cinema Collective',
    createdDate: '2026-08-24T17:15:00.000Z',
    createdAt: '2026-08-24T17:15:00.000Z',
    beneficiary: 'Folk Artists & Cultural Preservation of Kutch Heritage',
    isFeatured: false,
    budget: [
      { category: 'Field Production', amount: 350000, description: 'Camera equipment rental, sound engineering, and desert travel logistics' },
      { category: 'Artist Honorarium', amount: 200000, description: 'Direct compensation for participating traditional folk performers' },
      { category: 'Post-Production', amount: 150000, description: 'Color grading, sound mixing, multilingual subtitling, and licensing' },
    ],
  },
  {
    id: 'crt-003',
    _id: '674f1001e4b0000000000021',
    slug: 'community-art-public-mural-project',
    category: 'Creative Projects',
    title: 'Community Art & Public Mural Project',
    location: 'Mumbai, Maharashtra',
    shortDescription:
      'Creating public murals and community art spaces that involve local students and artists.',
    fullDescription:
      'Transforming neglected public alleyways and community walls into vibrant cultural landmarks, Dharavi Art Room Collective engaged 300 local youth and street artists to paint 15 large-scale murals depicting stories of resilience, biodiversity, and local heritage.',
    description:
      'Transforming neglected public alleyways and community walls into vibrant cultural landmarks, Dharavi Art Room Collective engaged 300 local youth and street artists to paint 15 large-scale murals depicting stories of resilience, biodiversity, and local heritage.',
    image: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 500000,
    raisedAmount: 500000,
    donorCount: 130,
    daysLeft: 0,
    daysRemaining: 0,
    deadline: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Pooja Sawant',
    creatorOrganization: 'Dharavi Art Room Collective',
    createdDate: '2026-06-01T11:00:00.000Z',
    createdAt: '2026-06-01T11:00:00.000Z',
    beneficiary: '300 Neighborhood Children & Local Community Residents',
    isFeatured: false,
    budget: [
      { category: 'Weatherproof Paints', amount: 250000, description: 'Anti-fungal exterior acrylic paints, primer, and sealants' },
      { category: 'Scaffolding & Safety', amount: 150000, description: 'Bamboo staging, ladders, brushes, and protective gear' },
      { category: 'Student Art Kits', amount: 100000, description: 'Individual sketchbooks, paint sets, and refreshment stipends' },
    ],
  },

  // ==========================================
  // CATEGORY 8: STARTUP
  // ==========================================
  {
    id: 'stp-001',
    _id: '674f1001e4b0000000000022',
    slug: 'affordable-solar-cold-storage-small-farmers',
    category: 'Startup',
    title: 'Affordable Solar Cold Storage for Small Farmers',
    location: 'Nashik, Maharashtra',
    shortDescription:
      'Developing modular solar-powered cold storage units that help farmers reduce food waste and improve market access.',
    fullDescription:
      'Perishable crops like tomatoes, grapes, and leafy greens spoil within days under hot climatic conditions, forcing farmers into distress sales at rock-bottom prices. KrishiCool Technologies develops micro-scale 5-metric-ton cold storage micro-units powered by thermal ice-storage batteries and solar rooftop arrays, extending produce shelf life from 2 days to 28 days.',
    description:
      'Perishable crops like tomatoes, grapes, and leafy greens spoil within days under hot climatic conditions, forcing farmers into distress sales at rock-bottom prices. KrishiCool Technologies develops micro-scale 5-metric-ton cold storage micro-units powered by thermal ice-storage batteries and solar rooftop arrays, extending produce shelf life from 2 days to 28 days.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 2000000,
    raisedAmount: 1550000,
    donorCount: 310,
    daysLeft: 25,
    daysRemaining: 25,
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Vikram Shinde',
    creatorOrganization: 'KrishiCool Technologies',
    createdDate: '2026-08-04T09:45:00.000Z',
    createdAt: '2026-08-04T09:45:00.000Z',
    beneficiary: '85 Horticultural Farmers in Niphad & Dindori',
    isFeatured: true,
    budget: [
      { category: 'Compressor & Thermal Storage', amount: 950000, description: 'Phase change material thermal cooling banks and DC inverter compressors' },
      { category: 'Solar Array & Inverter', amount: 650000, description: '10kW Monocrystalline solar panels and hybrid inverter' },
      { category: 'Modular Insulated Container', amount: 400000, description: 'PIR insulated sandwich panels and airtight cold-room doors' },
    ],
  },
  {
    id: 'stp-002',
    _id: '674f1001e4b0000000000023',
    slug: 'low-cost-water-monitoring-technology',
    category: 'Startup',
    title: 'Low-Cost Water Monitoring Technology',
    location: 'Hyderabad, Telangana',
    shortDescription:
      'Building affordable IoT-based water-quality monitoring systems for communities and small municipalities.',
    fullDescription:
      'Industrial effluents and chemical runoffs often silently contaminate peri-urban lakes and drinking water pipelines before lab tests reveal the danger. AquaSense IoT Labs engineers real-time optical and electrochemical probe sensors that stream continuous pH, turbidity, TDS, and dissolved oxygen data to an open public dashboard and SMS alert network.',
    description:
      'Industrial effluents and chemical runoffs often silently contaminate peri-urban lakes and drinking water pipelines before lab tests reveal the danger. AquaSense IoT Labs engineers real-time optical and electrochemical probe sensors that stream continuous pH, turbidity, TDS, and dissolved oxygen data to an open public dashboard and SMS alert network.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1350000,
    raisedAmount: 980000,
    donorCount: 205,
    daysLeft: 31,
    daysRemaining: 31,
    deadline: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Praneeth Reddy',
    creatorOrganization: 'AquaSense IoT Labs',
    createdDate: '2026-08-17T11:30:00.000Z',
    createdAt: '2026-08-17T11:30:00.000Z',
    beneficiary: '25 Residential Lake Communities & Urban Watersheds',
    isFeatured: false,
    budget: [
      { category: 'Optical Sensor R&D', amount: 600000, description: 'Spectrophotometric sensor probe calibration and microfluidic chip runs' },
      { category: 'Telemetry Hardware', amount: 450000, description: 'Solar buoys, 4G/LoRaWAN modules, and weather-resistant enclosures' },
      { category: 'Cloud Dashboard & Alerts', amount: 300000, description: 'Public open-data API and automated SMS notification gateway' },
    ],
  },
  {
    id: 'stp-003',
    _id: '674f1001e4b0000000000024',
    slug: 'local-artisan-marketplace-platform',
    category: 'Startup',
    title: 'Local Artisan Marketplace Platform',
    location: 'Bhubaneswar, Odisha',
    shortDescription:
      'Building a digital marketplace that helps local artisans sell handmade products directly to customers.',
    fullDescription:
      'Middlemen and commercial distributors retain up to 80% of the retail markup on indigenous Pattachitra paintings, Dhokra metal casting, and handloom sarees. KarigarBazaar Innovations is an ethical digital marketplace platform offering zero-commission onboarding, vernacular voice-assisted product cataloging, and escrow-verified payouts directly to artisan bank accounts.',
    description:
      'Middlemen and commercial distributors retain up to 80% of the retail markup on indigenous Pattachitra paintings, Dhokra metal casting, and handloom sarees. KarigarBazaar Innovations is an ethical digital marketplace platform offering zero-commission onboarding, vernacular voice-assisted product cataloging, and escrow-verified payouts directly to artisan bank accounts.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
    coverImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=800&q=80',
    ],
    goalAmount: 1100000,
    raisedAmount: 820000,
    donorCount: 165,
    daysLeft: 42,
    daysRemaining: 42,
    deadline: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    verified: true,
    verificationStatus: 'verified',
    creatorName: 'Debashish Mohanty',
    creatorOrganization: 'KarigarBazaar Innovations',
    createdDate: '2026-08-26T10:00:00.000Z',
    createdAt: '2026-08-26T10:00:00.000Z',
    beneficiary: '150+ Rural Odisha Artisans & Weavers',
    isFeatured: false,
    budget: [
      { category: 'Mobile App Development', amount: 500000, description: 'Vernacular Odia/Hindi voice-assisted seller mobile app' },
      { category: 'Photography & Logistics', amount: 350000, description: 'Village photo-cataloging studios and eco-friendly packaging inventory' },
      { category: 'Artisan Onboarding', amount: 250000, description: 'Field literacy training, banking linkage, and digital onboarding' },
    ],
  },
];

/**
 * Filter and search helper for campaigns dataset
 */
export const filterCampaigns = (
  campaigns = CAMPAIGNS_DATA,
  {
    search = '',
    category = 'All',
    status = 'active',
    verifiedOnly = false,
    location = '',
    sort = 'recent',
    page = 1,
    limit = 9,
  } = {}
) => {
  let filtered = [...campaigns];

  // Category filter
  if (category && category !== 'All') {
    filtered = filtered.filter(
      (c) => c.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // Status filter
  if (status && status !== 'all') {
    filtered = filtered.filter(
      (c) => c.status?.toLowerCase() === status.toLowerCase()
    );
  }

  // Verified Only filter
  if (verifiedOnly) {
    filtered = filtered.filter(
      (c) => c.verified === true || c.verificationStatus === 'verified'
    );
  }

  // Location filter (searches city, state, region substring)
  if (location && location.trim()) {
    const locLower = location.trim().toLowerCase();
    filtered = filtered.filter((c) =>
      c.location?.toLowerCase().includes(locLower)
    );
  }

  // Text search (search title, descriptions, creator, beneficiary)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.shortDescription?.toLowerCase().includes(q) ||
        c.fullDescription?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.beneficiary?.toLowerCase().includes(q) ||
        c.creatorName?.toLowerCase().includes(q) ||
        c.creatorOrganization?.toLowerCase().includes(q) ||
        c.location?.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sort === 'most_funded') {
    filtered.sort((a, b) => (b.raisedAmount || 0) - (a.raisedAmount || 0));
  } else if (sort === 'ending_soon') {
    filtered.sort((a, b) => {
      const aDays = a.daysLeft ?? a.daysRemaining ?? 999;
      const bDays = b.daysLeft ?? b.daysRemaining ?? 999;
      return aDays - bDays;
    });
  } else if (sort === 'highest_goal') {
    filtered.sort((a, b) => (b.goalAmount || 0) - (a.goalAmount || 0));
  } else {
    // recent
    filtered.sort(
      (a, b) =>
        new Date(b.createdDate || b.createdAt || 0) -
        new Date(a.createdDate || a.createdAt || 0)
    );
  }

  const total = filtered.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 9);
  const totalPages = Math.max(1, Math.ceil(total / limitNum));
  const skip = (pageNum - 1) * limitNum;
  const paginated = filtered.slice(skip, skip + limitNum);

  return {
    campaigns: paginated,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
    },
  };
};

export default CAMPAIGNS_DATA;
