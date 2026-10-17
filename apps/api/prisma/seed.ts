import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const initialCampusData = {
  categories: [
    { id: 'academics', name: 'Academics', description: 'Departments, syllabus and academic resources' },
    { id: 'administration', name: 'Administration', description: 'Office contacts and administrative procedures' },
    { id: 'examinations', name: 'Examinations', description: 'Timetables, results and exam procedures' },
    { id: 'campus', name: 'Campus Life', description: 'Campus ceremonies and student events' },
    { id: 'hostel', name: 'Hostel', description: 'Residential facilities and student support' },
    { id: 'library', name: 'Library', description: 'Library facilities and digital resources' },
    { id: 'placements', name: 'Placements', description: 'Career development and placement support' },
    { id: 'transport', name: 'Transport', description: 'Transport services and bus information' },
  ],
  departments: [
    { id: 'dept-cse', name: 'Computer Science and Engineering', code: 'CSE' },
    { id: 'dept-it', name: 'Information Technology', code: 'IT' },
    { id: 'dept-aids', name: 'Artificial Intelligence & Data Science', code: 'AI&DS' },
    { id: 'dept-ece', name: 'Electronics and Communication Engineering', code: 'ECE' },
    { id: 'dept-eee', name: 'Electrical and Electronics Engineering', code: 'EEE' },
    { id: 'dept-mech', name: 'Mechanical Engineering', code: 'MECH' },
  ],
  documents: [
    {
      id: 'about-krce',
      source: 'https://www.krce.ac.in/about-college.html',
      title: 'About K. Ramakrishnan College of Engineering',
      category: 'academics',
      content:
        'K. Ramakrishnan College of Engineering (KRCE) was established in 2008 and is located at Samayapuram, Tiruchirappalli, Tamil Nadu. The official website describes a 30-acre campus with state-of-the-art infrastructure, autonomous status, and NBA/NAAC accreditation with affiliation to Anna University, Chennai.',
      status: 'published',
    },
    {
      id: 'admissions',
      source: 'https://www.krce.ac.in/krce-admissions.html',
      title: 'Admissions and eligibility information',
      category: 'administration',
      content:
        'KRCE publishes admissions information and programme details on its official website. Confirm current eligibility, deadlines, fees, TNEA counselling codes (KRCE Code: 3814), and scholarship conditions from the latest official admissions page.',
      status: 'published',
    },
    {
      id: 'cse-department',
      source: 'https://krce.ac.in/computer-science-and-engineering.html',
      title: 'Computer Science and Engineering',
      category: 'academics',
      content:
        'The CSE department was established in 2008. Its official page describes UG (B.E. CSE) and PG (M.E. CSE) programmes and research focus areas including Artificial Intelligence, Data Science, Cyber Security, Cloud Computing, and Modern Software Engineering.',
      status: 'published',
    },
    {
      id: 'exam-portal',
      source: 'https://www.krce.ac.in/COE.html',
      title: 'Controller of Examinations',
      category: 'examinations',
      content:
        'The KRCE examination cell publishes end-semester exam updates, internal assessment timetables, hall ticket distribution schedules, and autonomous grade results. Use the official page for current schedules, revaluation instructions, and grade sheets.',
      status: 'published',
    },
    {
      id: 'facilities',
      source: 'https://krce.ac.in/infrastructure.html',
      title: 'Campus facilities & Hostel',
      category: 'hostel',
      content:
        'The official KRCE infrastructure page highlights residential hostel buildings for boys and girls with RO purified water, Wi-Fi connectivity, recreation halls, modern hygienic mess facilities, sports grounds, modern gymnasium, and round-the-clock medical health centre.',
      status: 'published',
    },
    {
      id: 'it-department',
      source: 'https://krce.ac.in/information-technology.html',
      title: 'Information Technology department',
      category: 'academics',
      content:
        'The KRCE IT department curriculum provides specialized training in full-stack web and mobile application development, cloud DevOps, machine learning, IoT embedded systems, and enterprise cybersecurity.',
      status: 'published',
    },
    {
      id: 'library-overview',
      source: 'https://krce.ac.in/library.html',
      title: 'Central Library overview & Digital Resources',
      category: 'library',
      content:
        'KRCE Central Library covers 2,412 square metres with extensive reading halls, air-conditioned digital library section with over 60 high-speed internet-enabled workstations, DELNET/IEEE subscriptions, 45,000+ printed volumes, and audio-visual archives.',
      status: 'published',
    },
    {
      id: 'transport-info',
      source: 'https://krce.ac.in/transport.html',
      title: 'Campus Bus Transport Services',
      category: 'transport',
      content:
        'KRCE operates a fleet of over 50 buses connecting Tiruchirappalli city, Thanjavur, Pudukkottai, Karur, Perambalur, Musiri, and surrounding rural sectors. Bus passes are issued per academic year through the transport office.',
      status: 'published',
    },
  ],
  faqs: [
    {
      id: 'faq-contact',
      source: 'https://www.krce.ac.in/contact.html',
      question: 'How can I contact KRCE?',
      answer:
        'You can contact KRCE main office at +91 98429 91377 or email info@krce.ac.in. Admissions cell can be reached at +91 90038 29977.',
      category: 'administration',
      status: 'published',
    },
    {
      id: 'faq-library',
      source: 'https://krce.ac.in/library.html',
      question: 'Where can I find library details and hours?',
      answer:
        'The Central Library is open on working days from 8:30 AM to 6:30 PM. Digital resources and IEEE e-journals are accessible via the campus intranet.',
      category: 'library',
      status: 'published',
    },
    {
      id: 'faq-location',
      source: 'https://www.krce.ac.in/contact.html',
      question: 'Where is KRCE located?',
      answer:
        'K. Ramakrishnan College of Engineering is located on NH 45, Samayapuram, Tiruchirappalli, Tamil Nadu 621112, easily accessible by college bus and public transport.',
      category: 'administration',
      status: 'published',
    },
    {
      id: 'faq-counselling',
      source: 'https://www.krce.ac.in/krce-admissions.html',
      question: 'What is the TNEA Counselling Code for KRCE?',
      answer:
        'The Anna University TNEA counselling code for K. Ramakrishnan College of Engineering (Autonomous) is 3814.',
      category: 'administration',
      status: 'published',
    },
  ],
  contacts: [
    {
      id: 'contact-admissions',
      name: 'Admissions Office',
      phone: '+91 90038 29977',
      email: 'admissions@krce.ac.in',
      location: 'Administrative Block, Ground Floor, KRCE',
      designation: 'Admissions enquiries and counseling guidance',
      source: 'https://www.krce.ac.in/contact.html',
      status: 'published',
    },
    {
      id: 'contact-exams',
      name: 'Controller of Examinations',
      phone: '+91 98429 91377',
      email: 'coe@krce.ac.in',
      location: 'COE Block, First Floor, KRCE campus',
      designation: 'Autonomous Examination and Grade Sheets',
      source: 'https://www.krce.ac.in/COE.html',
      status: 'published',
    },
    {
      id: 'contact-main',
      name: 'KRCE Main Office',
      phone: '+91 98429 91377',
      email: 'info@krce.ac.in',
      location: 'NH 45, Samayapuram, Tiruchirappalli, Tamil Nadu 621112',
      designation: 'College Administrative Secretariat',
      source: 'https://www.krce.ac.in/contact.html',
      status: 'published',
    },
    {
      id: 'contact-placement',
      name: 'Training & Placement Cell',
      phone: '+91 98428 29977',
      email: 'placement@krce.ac.in',
      location: 'Placement & Career Guidance Block, 2nd Floor',
      designation: 'Campus Recruitment and Industry Relations',
      source: 'https://krce.ac.in/placement.html',
      status: 'published',
    },
    {
      id: 'contact-hostel-warden',
      name: 'Hostel Chief Warden Office',
      phone: '+91 98429 91388',
      email: 'hostel@krce.ac.in',
      location: 'Boys & Girls Hostel Main Gate Office',
      designation: 'Student Accommodation and Mess Affairs',
      source: 'https://krce.ac.in/infrastructure.html',
      status: 'published',
    },
  ],
  procedures: [
    {
      id: 'procedure-admission',
      title: 'Admission enquiry & enrolment',
      description: 'Follow the official admissions verification pipeline for B.E., B.Tech, and M.E. courses at KRCE.',
      category: 'administration',
      eligibility: '10+2 with Physics, Chemistry, Maths for UG; Bachelor degree in relevant branch for PG.',
      documentsRequired: [
        '10th & 12th Standard Mark Sheets',
        'Transfer Certificate (TC)',
        'Community Certificate',
        'TNEA Allotment Order (if via Counselling)',
        'Passport Size Photographs (5 Nos)',
        'Aadhaar Card copy',
      ],
      fees: 'Confirm directly with admissions office as per regulation',
      processingTime: 'Same day verification upon reporting',
      steps: [
        'Review the official admissions page on krce.ac.in.',
        'Check course eligibility and register for TNEA counselling (Code: 3814) or contact Management quota desk.',
        'Obtain original document checklist and verification slip from Admissions Cell.',
        'Complete fee payment receipt and collect identity credentials and class schedule.',
      ],
      source: 'https://www.krce.ac.in/krce-admissions.html',
      status: 'published',
    },
    {
      id: 'procedure-revaluation',
      title: 'Exam revaluation or photocopy enquiry',
      description: 'Request for answer script photocopy and revaluation for autonomous semester examinations.',
      category: 'examinations',
      eligibility: 'Any registered student who appeared for the recent semester examination.',
      documentsRequired: [
        'Register Number & Semester Exam Hall Ticket copy',
        'Filled COE Revaluation Form',
        'Fee receipt from College Cash Counter',
      ],
      fees: 'Rs. 300 for photocopy, Rs. 500 for revaluation (confirm in current COE circular)',
      processingTime: '10 to 15 working days following deadline',
      steps: [
        'Open the official Controller of Examinations notice board on krce.ac.in/COE.html.',
        'Download the official Revaluation / Photocopy requisition form within 7 days of results declaration.',
        'Get approval from respective Department HOD and pay the prescribed fee.',
        'Submit completed form to COE office and monitor status on the student portal.',
      ],
      source: 'https://www.krce.ac.in/COE.html',
      status: 'published',
    },
    {
      id: 'procedure-bonafide',
      title: 'Bonafide Certificate Requisition',
      description: 'Apply for official Bonafide Certificate for passport, bank loan, bus pass, or scholarship purposes.',
      category: 'administration',
      eligibility: 'Currently enrolled regular students of KRCE.',
      documentsRequired: ['Student ID Card copy', 'Requisition application signed by Class Advisor'],
      fees: 'Free of charge',
      processingTime: '24 to 48 hours',
      steps: [
        'Collect Bonafide application form from the department office.',
        'Fill purpose of request (Bank Loan, Passport, Scholarship, Bus Pass) and obtain Class Advisor signature.',
        'Submit to College Administrative Office in the Main Block.',
        'Collect attested Principal certificate with college seal.',
      ],
      source: 'https://www.krce.ac.in/contact.html',
      status: 'published',
    },
    {
      id: 'procedure-office',
      title: 'Contact a campus office',
      description: 'Standard protocol for visiting or telephoning campus offices during working hours.',
      category: 'administration',
      eligibility: 'Students seeking campus assistance, transcripts, or certificates.',
      documentsRequired: ['Student Identity Card'],
      fees: 'Not applicable',
      processingTime: 'During regular working hours (9:00 AM - 4:45 PM)',
      steps: [
        'Identify the relevant office (Principal, COE, Dean, Transport, or Hostel).',
        'Confirm working hours (Monday to Saturday, 9:00 AM - 4:45 PM).',
        'Carry physical Student ID card and relevant reference numbers.',
      ],
      source: 'https://www.krce.ac.in/contact.html',
      status: 'published',
    },
  ],
  notices: [
    {
      id: 'notice-admissions',
      title: 'Admissions Open for 2026–2027 Academic Year',
      category: 'administration',
      content:
        'The KRCE admissions portal is now accepting online inquiries and applications for B.E., B.Tech, and M.E. programmes for the academic session 2026–2027. Early registration is encouraged for merit scholarships.',
      publishedAt: '2026-06-01',
      source: 'https://www.krce.ac.in/',
      status: 'published',
    },
    {
      id: 'notice-results',
      title: 'Autonomous Examination Results & Grade Sheet Updates',
      category: 'examinations',
      content:
        'Controller of Examinations (COE) has published semester examination results on the college portal. Applications for photocopy and revaluation are open until the published circular deadline.',
      publishedAt: '2026-05-15',
      source: 'https://www.krce.ac.in/COE.html',
      status: 'published',
    },
    {
      id: 'notice-symposium',
      title: 'National Level Technical Symposium - KRCE TECHFEST',
      category: 'academics',
      content:
        'Departments of CSE and IT invite students across engineering institutions to present papers, participate in hackathons, and compete in robotics challenges.',
      publishedAt: '2026-07-10',
      source: 'https://www.krce.ac.in/',
      status: 'published',
    },
  ],
  events: [
    {
      id: 'event-graduation',
      title: '14th Graduation Day Ceremony 2026',
      description: 'Annual graduation ceremony conferring degrees to university rank holders and graduating batches.',
      category: 'campus',
      location: 'KRCE Open Auditorium & Live Broadcast',
      date: '2026-06-01',
      source: 'https://www.krce.ac.in/',
      status: 'published',
    },
    {
      id: 'event-hr-conclave',
      title: 'Industry HR Conclave & Placement Drive',
      description: 'Senior HR directors and technical leaders visit KRCE for leadership keynotes and recruitment drives.',
      category: 'placements',
      location: 'KRCE Seminar Hall 1 & Campus Placement Centre',
      date: '2026-10-01',
      source: 'https://www.krce.ac.in/',
      status: 'published',
    },
  ],
};

async function main() {
  console.log('Seeding KRCE Campus database...');

  // Create or upsert Admin and Student users
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('Admin@12345', salt);
  const studentPasswordHash = await bcrypt.hash('Student@12345', salt);

  try {
    await prisma.user.upsert({
      where: { email: 'admin@krce.ac.in' },
      update: { passwordHash: adminPasswordHash },
      create: {
        name: 'KRCE Administrator',
        email: 'admin@krce.ac.in',
        passwordHash: adminPasswordHash,
        role: 'ADMIN',
      },
    });

    await prisma.user.upsert({
      where: { email: 'student@krce.ac.in' },
      update: { passwordHash: studentPasswordHash },
      create: {
        name: 'Arun Kumar',
        email: 'student@krce.ac.in',
        passwordHash: studentPasswordHash,
        role: 'STUDENT',
        year: 3,
      },
    });

    // Seed Categories
    for (const cat of initialCampusData.categories) {
      await prisma.category.upsert({
        where: { id: cat.id },
        update: { name: cat.name, description: cat.description },
        create: { id: cat.id, name: cat.name, description: cat.description },
      });
    }

    // Seed Departments
    for (const dept of initialCampusData.departments) {
      await prisma.department.upsert({
        where: { code: dept.code },
        update: { name: dept.name },
        create: { id: dept.id, name: dept.name, code: dept.code },
      });
    }

    // Seed Documents
    for (const doc of initialCampusData.documents) {
      await prisma.document.upsert({
        where: { id: doc.id },
        update: {
          title: doc.title,
          content: doc.content,
          categoryId: doc.category,
          source: doc.source,
          status: 'published',
        },
        create: {
          id: doc.id,
          title: doc.title,
          content: doc.content,
          categoryId: doc.category,
          source: doc.source,
          status: 'published',
        },
      });
    }

    // Seed FAQs
    for (const faq of initialCampusData.faqs) {
      await prisma.faq.upsert({
        where: { id: faq.id },
        update: {
          question: faq.question,
          answer: faq.answer,
          categoryId: faq.category,
          source: faq.source,
          status: 'published',
        },
        create: {
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          categoryId: faq.category,
          source: faq.source,
          status: 'published',
        },
      });
    }

    // Seed Contacts
    for (const con of initialCampusData.contacts) {
      await prisma.contact.upsert({
        where: { id: con.id },
        update: {
          name: con.name,
          designation: con.designation,
          phone: con.phone,
          email: con.email,
          location: con.location,
          source: con.source,
          status: 'published',
        },
        create: {
          id: con.id,
          name: con.name,
          designation: con.designation,
          phone: con.phone,
          email: con.email,
          location: con.location,
          source: con.source,
          status: 'published',
        },
      });
    }

    // Seed Procedures
    for (const proc of initialCampusData.procedures) {
      await prisma.procedure.upsert({
        where: { id: proc.id },
        update: {
          title: proc.title,
          description: proc.description,
          categoryId: proc.category,
          eligibility: proc.eligibility,
          documentsRequired: JSON.stringify(proc.documentsRequired),
          fees: proc.fees,
          processingTime: proc.processingTime,
          source: proc.source,
          status: 'published',
        },
        create: {
          id: proc.id,
          title: proc.title,
          description: proc.description,
          categoryId: proc.category,
          eligibility: proc.eligibility,
          documentsRequired: JSON.stringify(proc.documentsRequired),
          fees: proc.fees,
          processingTime: proc.processingTime,
          source: proc.source,
          status: 'published',
        },
      });
    }

    // Seed Notices
    for (const notice of initialCampusData.notices) {
      await prisma.notice.upsert({
        where: { id: notice.id },
        update: {
          title: notice.title,
          content: notice.content,
          categoryId: notice.category,
          source: notice.source,
          status: 'published',
        },
        create: {
          id: notice.id,
          title: notice.title,
          content: notice.content,
          categoryId: notice.category,
          source: notice.source,
          status: 'published',
        },
      });
    }

    // Seed Events
    for (const ev of initialCampusData.events) {
      await prisma.event.upsert({
        where: { id: ev.id },
        update: {
          title: ev.title,
          description: ev.description,
          categoryId: ev.category,
          location: ev.location,
          source: ev.source,
          status: 'published',
          startsAt: new Date(ev.date),
        },
        create: {
          id: ev.id,
          title: ev.title,
          description: ev.description,
          categoryId: ev.category,
          location: ev.location,
          source: ev.source,
          status: 'published',
          startsAt: new Date(ev.date),
        },
      });
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.warn('Prisma DB seeding note: Database connection not active, mock store will serve data.', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(0);
  });
}
