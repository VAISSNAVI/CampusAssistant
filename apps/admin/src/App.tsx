import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Bot,
  Building2,
  FileText,
  ClipboardList,
  Users,
  Bell,
  Calendar,
  Bookmark,
  User as UserIcon,
  ShieldCheck,
  Menu,
  X,
  Send,
  Plus,
  Trash2,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  BookOpen,
  Bus,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Smartphone,
  Maximize2,
  Minimize2,
  CheckSquare,
  Square,
  QrCode,
  ShieldAlert,
  ChevronLeft,
  Info,
  Award,
  Cpu,
  Layers,
  HelpCircle,
  LogIn,
  LogOut,
  UserPlus,
  Edit3,
  Check,
  Key,
  AlertCircle,
  Copy,
  Briefcase,
} from 'lucide-react';

// Official KRCE Assets
const KRCE_LOGO = 'https://www.krce.ac.in/images5/logo3.png';
const NAAC_LOGO = 'https://www.krce.ac.in/nac.png';
const NBA_LOGO = 'https://www.krce.ac.in/nba.png';

interface CarouselSlide {
  image: string;
  kicker: string;
  title: string;
  subtitle: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: 'https://www.krce.ac.in/images5/m1.jpg',
    kicker: 'KRCE AUTONOMOUS CAMPUS',
    title: '30-Acre Panoramic Campus',
    subtitle: 'State-of-the-art engineering education in Samayapuram, Trichy',
  },
  {
    image: 'https://www.krce.ac.in/images/g11.jpg',
    kicker: 'CENTRAL LIBRARY & DIGITAL LAB',
    title: '2,412 Sq.M Knowledge Hub',
    subtitle: '45,000+ volumes, IEEE digital access & air-conditioned study halls',
  },
  {
    image: 'https://www.krce.ac.in/img/AIDS.jpg',
    kicker: 'ADVANCED COMPUTING',
    title: 'AI & Data Science Labs',
    subtitle: 'Industry-collaborative high-performance research labs',
  },
  {
    image: 'https://www.krce.ac.in/img/krc/3.jpg',
    kicker: 'TRAINING & PLACEMENT',
    title: 'Elite Corporate Recruitment',
    subtitle: 'Comprehensive skill-based training and foreign language coaching',
  },
  {
    image: 'https://www.krce.ac.in/img/e76.jpg',
    kicker: 'CAMPUS INFRASTRUCTURE',
    title: 'Sports Complex & Gym',
    subtitle: 'Indoor stadium, modern gymnasium & holistic wellness centers',
  },
];

type ScreenType =
  | 'home'
  | 'departments'
  | 'library'
  | 'procedures'
  | 'transport'
  | 'contacts'
  | 'notices'
  | 'search'
  | 'saved'
  | 'profile';

export type UserRole = 'student' | 'faculty' | 'staff';

export interface BaseUserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  bloodGroup: string;
  emergencyContact: string;
  registeredDate: string;
}

export interface StudentProfile extends BaseUserProfile {
  role: 'student';
  rollNo: string;
  registerNo: string;
  department: string;
  degree: string;
  year: string;
  semester: string;
  section: string;
  cgpa: string;
  attendance: string;
  residentialType: 'Hostel' | 'Day Scholar';
  hostelRoom?: string;
  busRoute?: string;
  mentorName: string;
}

export interface FacultyProfile extends BaseUserProfile {
  role: 'faculty';
  staffId: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  cabinLocation: string;
  intercomExt: string;
  officeHours: string;
  coursesHandled: string[];
  assignedMentees: number;
}

export interface StaffProfile extends BaseUserProfile {
  role: 'staff';
  staffId: string;
  wing: string;
  designation: string;
  dutyShift: string;
  deskLocation: string;
  extensionNumber: string;
  responsibilities: string[];
}

export type AnyUserProfile = StudentProfile | FacultyProfile | StaffProfile;

export const DEMO_STUDENT: StudentProfile = {
  id: 'usr-stud-001',
  role: 'student',
  fullName: 'ARUN KUMAR R',
  email: 'arunkumar.cse24@krce.ac.in',
  phone: '+91 94431 88201',
  bloodGroup: 'O+ve',
  emergencyContact: 'Mr. Radhakrishnan (Father) - +91 94431 88200',
  registeredDate: 'Aug 2024',
  rollNo: '2024-CSE-042',
  registerNo: '920422104042',
  department: 'Computer Science & Engineering',
  degree: 'B.E. Computer Science & Engg.',
  year: '3rd Year',
  semester: 'Semester 6',
  section: 'Section A',
  cgpa: '8.84',
  attendance: '92.4%',
  residentialType: 'Hostel',
  hostelRoom: 'Block B Kaveri Hostel, Room 312',
  busRoute: 'Route #7 (Srirangam Central Bus Stand)',
  mentorName: 'Dr. P. Ramesh, Ph.D. (Assoc. Professor / CSE)',
};

export const DEMO_FACULTY: FacultyProfile = {
  id: 'usr-fac-002',
  role: 'faculty',
  fullName: 'DR. P. RAMESH, Ph.D.',
  email: 'ramesh.p@krce.ac.in',
  phone: '+91 94432 11902',
  bloodGroup: 'B+ve',
  emergencyContact: 'Mrs. S. Meenakshi (Spouse) - +91 94432 11900',
  registeredDate: 'Jun 2018',
  staffId: 'KRCE-FAC-CSE-108',
  department: 'Computer Science & Engineering',
  designation: 'Associate Professor & Research Lead',
  qualification: 'Ph.D. (Information & Comm. Engg), M.E. (CSE)',
  specialization: 'Artificial Intelligence, Deep Learning & Vision',
  cabinLocation: 'Tech Park Block 3, 2nd Floor, Room 204',
  intercomExt: 'Ext. 412',
  officeHours: 'Mon - Fri: 02:30 PM - 04:30 PM',
  coursesHandled: [
    'CS8691 Artificial Intelligence & Expert Systems',
    'CS8080 Deep Learning & Neural Networks Lab',
    'CS8792 Cryptography and Network Security',
  ],
  assignedMentees: 24,
};

export const DEMO_STAFF: StaffProfile = {
  id: 'usr-stf-003',
  role: 'staff',
  fullName: 'K. SUNDARAM',
  email: 'sundaram.coe@krce.ac.in',
  phone: '+91 94880 34512',
  bloodGroup: 'A+ve',
  emergencyContact: 'Mrs. K. Vasanthi - +91 94880 34510',
  registeredDate: 'Jan 2015',
  staffId: 'KRCE-STF-COE-024',
  wing: 'Controller of Examinations (COE Office)',
  designation: 'Senior Office Superintendent',
  dutyShift: 'General Shift (08:30 AM - 05:00 PM)',
  deskLocation: 'Admin Block Wing A, Ground Floor, Counter 2',
  extensionNumber: 'Ext. 104',
  responsibilities: [
    'Autonomous Semester Examination Hall Ticket Processing',
    'Revaluation & Review Application Verification',
    'Degree & Consolidated Mark Sheet Verification',
    'Anna University Transcript Attestation',
  ],
};

export default function App() {
  const [deviceMode, setDeviceMode] = useState<'framed' | 'fullscreen'>('framed');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [botOpen, setBotOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

  // Carousel
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Saved Bookmarks
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('krce-saved-v3') || '["dept-cse", "proc-reval"]');
    } catch {
      return ['dept-cse', 'proc-reval'];
    }
  });

  // Interactive Document Checklist tracking for procedures
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({
    'proc-admission-0': true,
    'proc-admission-1': true,
  });

  // Selected Department Filter in Departments view
  const [selectedDeptId, setSelectedDeptId] = useState<string>('dept-cse');

  // Bot Messages
  const [botMessages, setBotMessages] = useState<
    Array<{
      role: 'assistant' | 'user';
      text: string;
      contacts?: Array<{ name: string; phone: string; email: string }>;
    }>
  >([
    {
      role: 'assistant',
      text: 'Vanakkam! I am your KRCE Campus AI Bot. How can I help you today? You can ask about admissions, departments, library timings, exam revaluation, bus routes, or campus helplines.',
    },
  ]);
  const [botInput, setBotInput] = useState('');

  // User Profile & Multi-role Auth State
  const [allUsers, setAllUsers] = useState<AnyUserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('krce-all-users-v3');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [DEMO_STUDENT, DEMO_FACULTY, DEMO_STAFF];
  });

  const [currentUser, setCurrentUser] = useState<AnyUserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('krce-active-user-v3');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEMO_STUDENT;
  });

  // Edit Profile Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    phone: '',
    email: '',
    emergencyContact: '',
    bloodGroup: '',
    locationDetail: '',
  });

  // Auth Screen State
  const [isAuthViewActive, setIsAuthViewActive] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authRole, setAuthRole] = useState<UserRole>('student');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [copiedIdCard, setCopiedIdCard] = useState(false);

  // Login Form Inputs
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration Form Inputs
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBloodGroup, setRegBloodGroup] = useState('O+ve');
  const [regEmergency, setRegEmergency] = useState('');

  // Student Reg
  const [regRollNo, setRegRollNo] = useState('');
  const [regRegisterNo, setRegRegisterNo] = useState('');
  const [regDepartment, setRegDepartment] = useState('Computer Science & Engineering');
  const [regDegree, setRegDegree] = useState('B.E. Computer Science & Engg.');
  const [regYear, setRegYear] = useState('1st Year');
  const [regTransitType, setRegTransitType] = useState<'Day Scholar' | 'Hostel'>('Day Scholar');
  const [regBusRoute, setRegBusRoute] = useState('Route #1 (Trichy Central Bus Stand)');
  const [regHostelRoom, setRegHostelRoom] = useState('Block A, Room 102');

  // Faculty Reg
  const [regStaffId, setRegStaffId] = useState('');
  const [regFacultyDesignation, setRegFacultyDesignation] = useState('Assistant Professor');
  const [regQualification, setRegQualification] = useState('M.E., Ph.D.');
  const [regSpecialization, setRegSpecialization] = useState('Artificial Intelligence');
  const [regCabin, setRegCabin] = useState('Tech Park Block 2, Room 104');
  const [regIntercom, setRegIntercom] = useState('Ext. 302');

  // Staff Reg
  const [regStaffWing, setRegStaffWing] = useState('Controller of Examinations (COE Office)');
  const [regStaffDesignation, setRegStaffDesignation] = useState('Junior Assistant / Office Staff');
  const [regDeskLocation, setRegDeskLocation] = useState('Admin Block, Ground Floor, Counter 1');
  const [regDutyShift, setRegDutyShift] = useState('General Shift (08:30 AM - 05:00 PM)');
  const [regExtension, setRegExtension] = useState('Ext. 102');

  // Sync to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('krce-active-user-v3', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('krce-active-user-v3');
      }
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('krce-all-users-v3', JSON.stringify(allUsers));
    } catch {}
  }, [allUsers]);

  // Auth & Profile Action Handlers
  const handleQuickSwitch = (role: UserRole) => {
    const matched = allUsers.find((u) => u.role === role);
    if (matched) {
      setCurrentUser(matched);
    } else {
      if (role === 'student') setCurrentUser(DEMO_STUDENT);
      else if (role === 'faculty') setCurrentUser(DEMO_FACULTY);
      else setCurrentUser(DEMO_STAFF);
    }
    setIsAuthViewActive(false);
    setAuthError('');
    setAuthSuccess('');
  };

  const handleOpenEditModal = () => {
    if (!currentUser) return;
    let locationVal = '';
    if (currentUser.role === 'student') {
      locationVal = currentUser.residentialType === 'Hostel' ? currentUser.hostelRoom || '' : currentUser.busRoute || '';
    } else if (currentUser.role === 'faculty') {
      locationVal = currentUser.cabinLocation;
    } else {
      locationVal = currentUser.deskLocation;
    }

    setEditForm({
      phone: currentUser.phone,
      email: currentUser.email,
      emergencyContact: currentUser.emergencyContact,
      bloodGroup: currentUser.bloodGroup,
      locationDetail: locationVal,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser: AnyUserProfile = {
      ...currentUser,
      phone: editForm.phone.trim() || currentUser.phone,
      email: editForm.email.trim() || currentUser.email,
      emergencyContact: editForm.emergencyContact.trim() || currentUser.emergencyContact,
      bloodGroup: editForm.bloodGroup.trim() || currentUser.bloodGroup,
    };

    if (updatedUser.role === 'student') {
      if (updatedUser.residentialType === 'Hostel') {
        updatedUser.hostelRoom = editForm.locationDetail || updatedUser.hostelRoom;
      } else {
        updatedUser.busRoute = editForm.locationDetail || updatedUser.busRoute;
      }
    } else if (updatedUser.role === 'faculty') {
      updatedUser.cabinLocation = editForm.locationDetail || updatedUser.cabinLocation;
    } else if (updatedUser.role === 'staff') {
      updatedUser.deskLocation = editForm.locationDetail || updatedUser.deskLocation;
    }

    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setIsEditModalOpen(false);
    setAuthSuccess('Profile updated successfully!');
    setTimeout(() => setAuthSuccess(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const query = loginIdentifier.toLowerCase().trim();
    if (!query) {
      setAuthError('Please enter your Email or Roll No / Staff ID.');
      return;
    }

    const matched = allUsers.find((u) => {
      if (u.role !== authRole) return false;
      if (u.email.toLowerCase() === query) return true;
      if (u.role === 'student' && (u.rollNo.toLowerCase() === query || u.registerNo.toLowerCase() === query)) return true;
      if ((u.role === 'faculty' || u.role === 'staff') && u.staffId.toLowerCase() === query) return true;
      return false;
    });

    if (matched) {
      setCurrentUser(matched);
      setIsAuthViewActive(false);
      setAuthSuccess(`Welcome back, ${matched.fullName}! Logged in as ${matched.role.toUpperCase()}.`);
      setTimeout(() => setAuthSuccess(''), 3500);
      setLoginIdentifier('');
      setLoginPassword('');
    } else {
      setAuthError(`No registered ${authRole} account found for "${loginIdentifier}". Please check your credentials or click a Quick Demo account.`);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!regFullName.trim() || !regEmail.trim()) {
      setAuthError('Please enter Full Name and Official Email address.');
      return;
    }

    const id = `usr-${authRole}-${Date.now().toString().slice(-4)}`;
    let newUser: AnyUserProfile;

    if (authRole === 'student') {
      const roll = regRollNo.trim() || `2026-CSE-${Math.floor(100 + Math.random() * 900)}`;
      const regNo = regRegisterNo.trim() || `920424104${Math.floor(100 + Math.random() * 900)}`;
      newUser = {
        id,
        role: 'student',
        fullName: regFullName.trim().toUpperCase(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim() || '+91 94431 00000',
        bloodGroup: regBloodGroup,
        emergencyContact: regEmergency.trim() || 'Parent / Guardian Contact',
        registeredDate: 'Today',
        rollNo: roll,
        registerNo: regNo,
        department: regDepartment,
        degree: regDegree,
        year: regYear,
        semester: regYear === '1st Year' ? 'Semester 1' : 'Semester 3',
        section: 'Section A',
        cgpa: '8.50',
        attendance: '95.0%',
        residentialType: regTransitType,
        hostelRoom: regTransitType === 'Hostel' ? regHostelRoom : undefined,
        busRoute: regTransitType === 'Day Scholar' ? regBusRoute : undefined,
        mentorName: 'Dr. P. Ramesh, Ph.D. (Assoc. Prof / CSE)',
      };
    } else if (authRole === 'faculty') {
      const staffId = regStaffId.trim() || `KRCE-FAC-${Math.floor(100 + Math.random() * 900)}`;
      newUser = {
        id,
        role: 'faculty',
        fullName: regFullName.trim().toUpperCase(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim() || '+91 94432 00000',
        bloodGroup: regBloodGroup,
        emergencyContact: regEmergency.trim() || 'Emergency Contact',
        registeredDate: 'Today',
        staffId,
        department: regDepartment,
        designation: regFacultyDesignation,
        qualification: regQualification.trim() || 'M.E., Ph.D.',
        specialization: regSpecialization.trim() || 'Engineering & Research',
        cabinLocation: regCabin.trim() || 'Academic Block 2, Room 104',
        intercomExt: regIntercom.trim() || 'Ext. 302',
        officeHours: 'Mon - Fri: 02:00 PM - 04:00 PM',
        coursesHandled: [`CS8691 Special Topics in ${regDepartment}`],
        assignedMentees: 20,
      };
    } else {
      const staffId = regStaffId.trim() || `KRCE-STF-${Math.floor(100 + Math.random() * 900)}`;
      newUser = {
        id,
        role: 'staff',
        fullName: regFullName.trim().toUpperCase(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim() || '+91 94880 00000',
        bloodGroup: regBloodGroup,
        emergencyContact: regEmergency.trim() || 'Emergency Contact',
        registeredDate: 'Today',
        staffId,
        wing: regStaffWing,
        designation: regStaffDesignation,
        dutyShift: regDutyShift,
        deskLocation: regDeskLocation.trim() || 'Main Admin Office, Ground Floor',
        extensionNumber: regExtension.trim() || 'Ext. 102',
        responsibilities: [
          'Campus Administrative Workflow & Documentation',
          'Student Query Assistance & Service Desk',
          'Institutional Records Verification',
        ],
      };
    }

    setAllUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthViewActive(false);
    setAuthSuccess(`Registration successful! Digital Identity created for ${newUser.fullName} (${authRole.toUpperCase()}).`);
    setTimeout(() => setAuthSuccess(''), 4000);

    // Reset reg fields
    setRegFullName('');
    setRegEmail('');
    setRegPassword('');
    setRegPhone('');
    setRegRollNo('');
    setRegStaffId('');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsAuthViewActive(true);
    setAuthMode('login');
    setAuthError('');
    setAuthSuccess('You have signed out. Sign in or register an account.');
  };

  const handleCopyCardData = () => {
    if (!currentUser) return;
    const cardData = `[KRCE DIGITAL ID]\nName: ${currentUser.fullName}\nRole: ${currentUser.role.toUpperCase()}\nID/Roll: ${currentUser.role === 'student' ? (currentUser as StudentProfile).rollNo : (currentUser as any).staffId}\nEmail: ${currentUser.email}\nPhone: ${currentUser.phone}\nBlood Group: ${currentUser.bloodGroup}\nStatus: Active Verified Campus Member`;
    navigator.clipboard?.writeText(cardData);
    setCopiedIdCard(true);
    setTimeout(() => setCopiedIdCard(false), 2500);
  };

  // Auto rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('krce-saved-v3', JSON.stringify(savedIds));
    } catch {}
  }, [savedIds]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((x) => x !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  // Standardized Chatbot Response Engine (No external API calls, instantaneous & accurate)
  const getStandardizedResponse = (rawText: string) => {
    const q = rawText.toLowerCase().trim();

    // 1. General Greetings & Conversational Interactions
    if (
      q === 'hi' ||
      q === 'hello' ||
      q === 'hey' ||
      q === 'hola' ||
      q === 'vanakkam' ||
      q === 'namaste' ||
      q.startsWith('hi ') ||
      q.startsWith('hello ')
    ) {
      return {
        text: 'Hello! Welcome to K. Ramakrishnan College of Engineering (KRCE) Campus Hub. How can I assist you today? You can ask about admissions, courses, library hours, exam schedules, or campus offices.',
      };
    }

    if (q.includes('good morning') || q.includes('morning')) {
      return {
        text: 'Good morning! Wishing you a productive day at KRCE. How may I assist with your campus information today?',
      };
    }

    if (q.includes('good afternoon')) {
      return {
        text: 'Good afternoon! Welcome to the KRCE student assistant. What information do you need today?',
      };
    }

    if (q.includes('good evening') || q.includes('evening')) {
      return {
        text: 'Good evening! Hope you had a great day at KRCE. How can I assist you tonight?',
      };
    }

    if (q.includes('how are you') || q.includes('how r u') || q.includes("how's it going")) {
      return {
        text: "I'm doing great, thank you for asking! I'm ready to assist you with all information regarding KRCE campus, academics, procedures, and facilities.",
      };
    }

    if (q.includes('who are you') || q.includes('what are you') || q.includes('what can you do') || q === 'help') {
      return {
        text: 'I am KRCE Mate, your interactive campus assistant. I provide verified information directly from official KRCE records regarding:\n• Admissions & TNEA Counselling (Code: 3814)\n• Academic Departments & Curriculum\n• Central Library facilities & working hours\n• Controller of Examinations (COE) & revaluation\n• Campus bus transport routes & schedules\n• Hostel facilities & office helplines',
      };
    }

    if (
      q.includes('thank') ||
      q.includes('thanks') ||
      q.includes('thx') ||
      q.includes('appreciate it') ||
      q === 'ok' ||
      q === 'okay' ||
      q === 'cool' ||
      q === 'great' ||
      q === 'awesome'
    ) {
      return {
        text: "You're very welcome! If there's anything else you need to know about KRCE, just ask anytime.",
      };
    }

    if (q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('take care')) {
      return {
        text: 'Goodbye! Have a wonderful day ahead. Keep rocking at KRCE!',
      };
    }

    // Campus Profile, Identity & Registration Responses
    if (
      q.includes('profile') ||
      q.includes('id card') ||
      q.includes('identity') ||
      q.includes('digital id') ||
      q.includes('student id') ||
      q.includes('faculty id') ||
      q.includes('staff id') ||
      q.includes('smart card')
    ) {
      return {
        text: 'KRCE Multi-Role Profile Management:\n• Students: Digital Smart ID with QR code, Roll & AU Register numbers, Attendance record (92.4%), CGPA metrics (8.84), Transit passes & Faculty Mentor allocation.\n• Faculty: Staff ID, Academic rank, cabin location, intercom extension, courses taught, and mentee roster.\n• Staff: Operational wing (COE/Admin/Transport), counter location, duty shift, and daily responsibilities.\n\nYou can access your profile, switch roles, or edit details from the Profile tab in the top header.',
      };
    }

    if (
      q.includes('login') ||
      q.includes('sign in') ||
      q.includes('register') ||
      q.includes('registration') ||
      q.includes('create account') ||
      q.includes('new user')
    ) {
      return {
        text: 'KRCE Profile Access & Registration:\n• You can register a new profile as a Student, Faculty member, or Staff personnel.\n• Switch to the Profile page and select "Create Account" to register with your official details, or sign in with your email/ID.\n• Instant 1-click Demo logins are also provided for fast role previewing (Student, Faculty, Staff).',
      };
    }

    // 2. Specific Campus Domains
    if (
      q.includes('admission') ||
      q.includes('join') ||
      q.includes('tnea') ||
      q.includes('counselling') ||
      q.includes('code') ||
      q.includes('apply') ||
      q.includes('seat')
    ) {
      return {
        text: 'KRCE Admissions for 2026–2027 are currently open! \n• Anna University TNEA Counselling Code: 3814\n• Programmes: B.E., B.Tech, M.E., and MBA\n• Eligibility: 10+2 with Physics, Chemistry, and Mathematics for UG; Bachelor degree in relevant branch for PG.\n• Verification: Direct reporting with original 10th/12th marksheets, TC, Community Certificate, and Aadhaar.\n\nYou can reach our admissions desk directly:',
        contacts: [
          { name: 'Admissions Office', phone: '+91 90038 29977', email: 'admissions@krce.ac.in' },
          { name: 'Admissions Helpdesk 2', phone: '+91 73732 84777', email: 'admissions@krce.ac.in' },
        ],
      };
    }

    if (
      q.includes('library') ||
      q.includes('book') ||
      q.includes('journal') ||
      q.includes('delnet') ||
      q.includes('ieee') ||
      q.includes('reading')
    ) {
      return {
        text: 'KRCE Central Library Overview:\n• Area: 2,412 Square Metres\n• Collections: 45,000+ printed volumes and textbook archives\n• Digital Library: 60+ internet-enabled research terminals\n• E-Subscriptions: DELNET, IEEE, ScienceDirect e-journals\n• Working Hours: Monday to Saturday: 8:30 AM – 6:30 PM\n• Borrowing Limits: UG Students: 4 books for 14 days; PG Students: 6 books.',
        contacts: [{ name: 'Central Library Desk', phone: '+91 98429 91377', email: 'info@krce.ac.in' }],
      };
    }

    if (
      q.includes('exam') ||
      q.includes('coe') ||
      q.includes('reval') ||
      q.includes('result') ||
      q.includes('timetable') ||
      q.includes('hall ticket') ||
      q.includes('photocopy')
    ) {
      return {
        text: 'Autonomous Controller of Examinations (COE) Information:\n• End-semester assessments are conducted as per autonomous Anna University regulations.\n• Revaluation: Students may apply within 7 days of results declaration.\n• Revaluation Fee: Rs. 500 per subject\n• Answer Script Photocopy: Rs. 300 per subject\n• Processing Timeline: 10–15 business days through the COE cell.',
        contacts: [{ name: 'Controller of Examinations (COE)', phone: '+91 98429 91377', email: 'coe@krce.ac.in' }],
      };
    }

    if (
      q.includes('bus') ||
      q.includes('transport') ||
      q.includes('route') ||
      q.includes('van') ||
      q.includes('pickup')
    ) {
      return {
        text: 'Campus Bus Transport Fleet:\n• KRCE operates a fleet of over 50 buses connecting Tiruchirappalli city and surrounding districts.\n• Routes Cover: Central Bus Stand, Railway Junction, Chathiram, Srirangam, Thanjavur, Karur, Pudukkottai, and Perambalur.\n• Morning Arrival: 8:30 AM at Campus\n• Evening Departure: 4:45 PM from Campus\n• Bus passes can be renewed at the Transport Office at the start of each semester.',
        contacts: [{ name: 'Transport Office', phone: '+91 98429 91377', email: 'info@krce.ac.in' }],
      };
    }

    if (
      q.includes('hostel') ||
      q.includes('mess') ||
      q.includes('warden') ||
      q.includes('room') ||
      q.includes('stay') ||
      q.includes('food')
    ) {
      return {
        text: 'Hostel & Residential Facilities:\n• Separate modern hostels for boys and girls inside the safe 30-acre campus.\n• Amenities: RO purified water, Wi-Fi connectivity, recreation and television halls, 24/7 medical clinic.\n• Mess: Hygienic and nutritious vegetarian & non-vegetarian multi-cuisine dining.\n• Chief Warden Office is available at the hostel main gate for leave requests and outpasses.',
        contacts: [{ name: 'Hostel Chief Warden', phone: '+91 98429 91388', email: 'hostel@krce.ac.in' }],
      };
    }

    if (
      q.includes('placement') ||
      q.includes('job') ||
      q.includes('company') ||
      q.includes('salary') ||
      q.includes('package') ||
      q.includes('recruiter')
    ) {
      return {
        text: 'Training & Corporate Placement Highlights:\n• Dean - Training and Placement coordinates campus recruitment with top multinational corporations.\n• Training Modules: Full-stack coding, data structures, aptitude, and foreign language training in Japanese, German, and French.\n• Top Recruiters: TCS, Cognizant, Infosys, Wipro, Virtusa, Zoho, HCL, and prominent core engineering firms.',
        contacts: [{ name: 'Training & Placement Cell', phone: '+91 98428 29977', email: 'placement@krce.ac.in' }],
      };
    }

    if (
      q.includes('location') ||
      q.includes('where') ||
      q.includes('address') ||
      q.includes('samayapuram') ||
      q.includes('reach')
    ) {
      return {
        text: 'Campus Location & Address:\n• K. Ramakrishnan College of Engineering (Autonomous)\n• Address: NH 45, Samayapuram, Tiruchirappalli, Tamil Nadu 621112\n• Landmark: Near Samayapuram Tollgate and the famous Shri Samayapuram Mariamman Temple\n• Distance: 15 km from Trichy Chathiram Bus Stand, 22 km from Central Railway Junction.',
        contacts: [{ name: 'KRCE Main Office', phone: '+91 98429 91377', email: 'info@krce.ac.in' }],
      };
    }

    if (
      q.includes('department') ||
      q.includes('course') ||
      q.includes('branch') ||
      q.includes('cse') ||
      q.includes('it') ||
      q.includes('aids') ||
      q.includes('mech') ||
      q.includes('ece') ||
      q.includes('eee')
    ) {
      return {
        text: 'KRCE Academic Departments:\n1. Computer Science and Engineering (CSE - NBA Accredited)\n2. Artificial Intelligence and Data Science (AI&DS)\n3. Information Technology (IT)\n4. Electronics and Communication Engineering (ECE)\n5. Electrical and Electronics Engineering (EEE)\n6. Mechanical Engineering (MECH)\n7. Computer Science and Business Systems (CSBS)\n8. MBA (Master of Business Administration)\n\nYou can explore any department on the "Departments & Labs" page.',
      };
    }

    if (q.includes('chairman') || q.includes('principal') || q.includes('management') || q.includes('kuppusamy')) {
      return {
        text: 'College Leadership:\n• Chairman: Dr. K. Ramakrishnan – A vibrant visionary committed to transforming rural youth into global technocrats.\n• Executive Director: Dr. S. Kuppusamy – Driving academic excellence and institutional growth.\n• Principal: Dr. D. Srinivasan – Dynamic leader pioneering autonomous curricula and research innovations.',
        contacts: [{ name: 'Principal Secretariat', phone: '+91 98429 91377', email: 'info@krce.ac.in' }],
      };
    }

    // Default polite campus response
    return {
      text: 'I understand your query. K. Ramakrishnan College of Engineering (KRCE) provides comprehensive academic, administrative, and student support services. For immediate assistance with this topic, feel free to call our main helpdesk or admissions cell:',
      contacts: [
        { name: 'Main Helpdesk', phone: '+91 98429 91377', email: 'info@krce.ac.in' },
        { name: 'Admissions Office', phone: '+91 90038 29977', email: 'admissions@krce.ac.in' },
      ],
    };
  };

  const handleSendBot = (queryText?: string) => {
    const text = (queryText || botInput).trim();
    if (!text) return;

    setBotMessages((prev) => [...prev, { role: 'user', text }]);
    setBotInput('');

    // Instant standardized response
    const reply = getStandardizedResponse(text);
    setBotMessages((prev) => [...prev, { role: 'assistant', text: reply.text, contacts: reply.contacts }]);
  };

  // Departments Scraped Data
  const departmentsData = [
    {
      id: 'dept-cse',
      name: 'Computer Science and Engineering',
      code: 'CSE',
      degree: 'B.E. (UG) & M.E. (PG)',
      image: 'https://www.krce.ac.in/images5/j19.jpg',
      accreditation: 'NBA Accredited • Established 2008',
      summary:
        'The Department of Computer Science and Engineering delivers quality computing education with specialized focus on Artificial Intelligence, Data Science, Cyber Security, Cloud Computing, and Software Engineering.',
      faculty: 'Supported by Wipro-certified and Virtusa-certified experienced professors.',
      labs: [
        'Advanced Computing & Cloud DevOps Laboratory',
        'AI, Machine Learning & Deep Learning Lab',
        'Cyber Security & Network Testing Center',
        'Open Source Software & Full-Stack Development Lab',
      ],
      highlights: [
        'Global certifications in AWS, Microsoft Azure, ServiceNow, PEGA, Java, and .NET',
        'Japanese foreign language training for international career opportunities',
        'MoUs with leading IT multinationals and active ICT Academy partnership',
        'Extensive student internship programs and live capstone projects',
      ],
    },
    {
      id: 'dept-aids',
      name: 'Artificial Intelligence and Data Science',
      code: 'AI&DS',
      degree: 'B.Tech',
      image: 'https://www.krce.ac.in/img/AIDS.jpg',
      accreditation: 'Industry 4.0 Center of Excellence',
      summary:
        'Dedicated to equipping engineers with cutting-edge skills in machine learning algorithms, deep neural networks, big data analytics, computer vision, and cognitive computing.',
      faculty: 'Faculty with research publications in IEEE, Springer, and Elsevier.',
      labs: [
        'High-Performance GPU Computing Lab',
        'Big Data Analytics & Hadoop Cluster Lab',
        'Computer Vision & NLP Research Center',
      ],
      highlights: [
        'Curriculum aligned with contemporary AI research and industry practices',
        'Specialized workshops on generative AI, neural networks, and Python data pipelines',
        'High placement conversion in analytics and data science roles',
      ],
    },
    {
      id: 'dept-it',
      name: 'Information Technology',
      code: 'IT',
      degree: 'B.Tech',
      image: 'https://www.krce.ac.in/images5/j20.jpg',
      accreditation: 'Autonomous Curriculum',
      summary:
        'Focuses on modern software development, full-stack enterprise systems, cloud architecture, IoT networks, and secure distributed databases.',
      faculty: 'Industry veterans and certified cloud practitioners.',
      labs: [
        'Web and Mobile Application Development Lab',
        'Internet of Things (IoT) & Embedded Systems Center',
        'Database & Data Engineering Lab',
      ],
      highlights: [
        'Hackathon bootcamps and agile software engineering training',
        'Collaborative projects with IT firms in Chennai, Bangalore, and Coimbatore',
      ],
    },
    {
      id: 'dept-ece',
      name: 'Electronics and Communication Engineering',
      code: 'ECE',
      degree: 'B.E. & M.E.',
      image: 'https://www.krce.ac.in/images5/j21.jpg',
      accreditation: 'NBA Accredited',
      summary:
        'Provides rigorous education in VLSI design, embedded microcontrollers, wireless communications, digital signal processing, and robotics.',
      faculty: 'Specialists in semiconductor design and RF systems.',
      labs: [
        'VLSI Design & Cadence Simulation Lab',
        'Embedded Systems & Microcontroller Lab',
        'Optical Communication & Microwave Lab',
      ],
      highlights: [
        'Hardware-software co-design workshops and robotics clubs',
        'Strong track record in core electronics and telecom placements',
      ],
    },
    {
      id: 'dept-eee',
      name: 'Electrical and Electronics Engineering',
      code: 'EEE',
      degree: 'B.E. & M.E.',
      image: 'https://www.krce.ac.in/img/e78.jpg',
      accreditation: 'NBA Accredited',
      summary:
        'Prepares students for smart power grids, electric vehicle technologies, renewable solar and wind systems, and industrial electrical automation.',
      faculty: 'Experienced consultants in power electronics and energy audits.',
      labs: [
        'Power Systems Simulation & Smart Grid Lab',
        'Electric Vehicle & Battery Management Lab',
        'Industrial Automation & PLC Lab',
      ],
      highlights: [
        'Hands-on training with rooftop campus solar power generation',
        'Core recruitment in power generation, EV, and automation industries',
      ],
    },
    {
      id: 'dept-mech',
      name: 'Mechanical Engineering',
      code: 'MECH',
      degree: 'B.E.',
      image: 'https://www.krce.ac.in/img/e79.jpg',
      accreditation: 'NBA Accredited',
      summary:
        'Offers advanced training in computer-aided design and manufacturing (CAD/CAM), thermal engineering, modern robotics, and automotive systems.',
      faculty: 'Practitioners with extensive industrial design background.',
      labs: [
        'CNC Machines & Modern Manufacturing Workshop',
        'CAD/CAM/CAE Modeling Simulation Lab',
        'Thermal Engineering & IC Engines Testing Lab',
      ],
      highlights: [
        'Participation in national Go-Kart and BAJA SAE student racing competitions',
        'Collaborations with major manufacturing and automotive industries',
      ],
    },
    {
      id: 'dept-csbs',
      name: 'Computer Science and Business Systems',
      code: 'CSBS',
      degree: 'B.Tech',
      image: 'https://www.krce.ac.in/images5/j22.jpg',
      accreditation: 'Industry Partnered',
      summary:
        'Curriculum designed in close collaboration with Tata Consultancy Services (TCS) to produce business-ready engineering leaders proficient in financial systems and tech consulting.',
      faculty: 'Dual certified in computing and business strategy.',
      labs: ['Business Analytics Lab', 'FinTech & Enterprise Solutions Lab'],
      highlights: [
        'Blends core computing algorithms with enterprise business strategy',
        'Direct project mentoring by corporate technology consultants',
      ],
    },
    {
      id: 'dept-mba',
      name: 'Department of Management Studies',
      code: 'MBA',
      degree: 'M.B.A. (Postgraduate)',
      image: 'https://www.krce.ac.in/images5/j23.jpg',
      accreditation: 'AICTE Approved',
      summary:
        'Equips future corporate executives with strategic management skills across Marketing, Finance, Human Resource Management, Operations, and Business Analytics.',
      faculty: 'Corporate leaders and management doctorate holders.',
      labs: ['Management Simulation Center', 'Executive Communication Lab'],
      highlights: [
        'Annual HR Conclaves with chief human resource officers across India',
        'Comprehensive summer internships and live managerial case studies',
      ],
    },
  ];

  // Scraped Procedures
  const procedures = [
    {
      id: 'proc-admission',
      title: 'B.E. / B.Tech Admission Procedure',
      category: 'Admissions',
      processingTime: 'Same day verification',
      fees: 'Government prescribed TNEA / Autonomous norms',
      eligibility: '10+2 with Physics, Chemistry, and Mathematics (TNEA Code 3814).',
      checklist: [
        '10th Standard Original Mark Sheet',
        '12th Standard Original Mark Sheet',
        'Transfer Certificate (TC)',
        'Community Certificate',
        'TNEA Allotment Order copy',
        'Aadhaar Card copy & 5 Passport Photographs',
      ],
      steps: [
        'Check TNEA Counselling rank or visit the KRCE Admissions Cell for management registration.',
        'Submit the required certificates for verification at the Administrative Block.',
        'Obtain fee receipt, identity credentials, and welcome handbook.',
      ],
    },
    {
      id: 'proc-reval',
      title: 'Exam Photocopy & Revaluation Application',
      category: 'Examinations',
      processingTime: '10–15 business days',
      fees: 'Photocopy: Rs. 300 | Revaluation: Rs. 500 per subject',
      eligibility: 'Any registered student who took the recent autonomous end-semester examination.',
      checklist: [
        'Register Number & Hall Ticket copy',
        'COE Revaluation Requisition Form',
        'Fee payment receipt from Cash Counter',
        'HOD recommendation signature',
      ],
      steps: [
        'Check the results on the student terminal and collect the COE application form within 7 days.',
        'Select paper code, obtain signature from your Department Advisor / HOD, and pay the fee.',
        'Submit to the COE office and receive confirmation slip.',
      ],
    },
    {
      id: 'proc-bonafide',
      title: 'Bonafide Certificate Requisition',
      category: 'Administration',
      processingTime: '24–48 hours',
      fees: 'Free of charge',
      eligibility: 'Currently enrolled regular students of KRCE.',
      checklist: ['Student ID Card copy', 'Requisition application with Class Advisor signature'],
      steps: [
        'Submit a signed application stating the purpose (Bank Loan, Passport, Bus Pass, Scholarship).',
        'Class Advisor and HOD verify regular attendance.',
        'Collect the official sealed certificate from the Principal Secretariat.',
      ],
    },
    {
      id: 'proc-hostel',
      title: 'Hostel Admission & Leave Application',
      category: 'Hostel',
      processingTime: 'Immediate upon warden review',
      fees: 'Hostel mess & caution deposit as per room type',
      eligibility: 'Enrolled students requiring on-campus residential boarding.',
      checklist: [
        'Hostel Admission Application Form',
        'Parent / Guardian Undertaking Letter',
        'Medical Fitness Certificate',
        'Passport Size Photographs of Student & Local Guardian',
      ],
      steps: [
        'Collect the hostel allotment form from the Chief Warden Office at the Hostel Gate.',
        'Select room preference (2-sharing, 3-sharing, or 4-sharing) with mess registration.',
        'Submit parent undertaking and collect hostel ID card and room keys.',
      ],
    },
  ];

  // Scraped Bus Routes
  const busRoutes = [
    {
      routeNumber: 'Route 1',
      title: 'Central Bus Stand & Railway Junction',
      stops: 'Central Bus Stand -> Palakkarai -> Cantonment -> Head Post Office -> Samayapuram KRCE',
      morningDeparture: '7:40 AM',
      eveningArrival: '5:35 PM',
      driverContact: '+91 98429 91377 (Transport In-charge)',
    },
    {
      routeNumber: 'Route 2',
      title: 'Chathiram Bus Stand & Srirangam',
      stops: 'Chathiram Bus Stand -> Mambalasalai -> Srirangam Temple Rajagopuram -> No 1 Tollgate -> KRCE',
      morningDeparture: '8:05 AM',
      eveningArrival: '5:15 PM',
      driverContact: '+91 98429 91377 (Transport In-charge)',
    },
    {
      routeNumber: 'Route 3',
      title: 'Thanjavur & Vallam Sector',
      stops: 'Thanjavur Old Bus Stand -> Vallam -> NIT Trichy Roundabout -> Tiruverumbur -> Samayapuram KRCE',
      morningDeparture: '7:15 AM',
      eveningArrival: '6:00 PM',
      driverContact: '+91 98429 91377 (Transport In-charge)',
    },
    {
      routeNumber: 'Route 4',
      title: 'Karur & Kulithalai',
      stops: 'Karur New Bus Stand -> Mayanur -> Kulithalai -> Pettavaithalai -> Jeeyapuram -> KRCE',
      morningDeparture: '7:00 AM',
      eveningArrival: '6:15 PM',
      driverContact: '+91 98429 91377 (Transport In-charge)',
    },
    {
      routeNumber: 'Route 5',
      title: 'Perambalur & Padalur',
      stops: 'Perambalur New Bus Stand -> Siruvachur -> Padalur -> Samayapuram Tollgate -> KRCE',
      morningDeparture: '7:30 AM',
      eveningArrival: '5:45 PM',
      driverContact: '+91 98429 91377 (Transport In-charge)',
    },
    {
      routeNumber: 'Route 6',
      title: 'Pudukkottai & Keeranur',
      stops: 'Pudukkottai New Bus Stand -> Keeranur -> Mathur Roundabout -> Airport -> Samayapuram KRCE',
      morningDeparture: '7:10 AM',
      eveningArrival: '6:10 PM',
      driverContact: '+91 98429 91377 (Transport In-charge)',
    },
  ];

  // Scraped Contacts List
  const contactsList = [
    {
      name: 'Admissions Office (TNEA Code 3814)',
      role: 'UG & PG Admissions, TNEA counselling verification, and fee guidance',
      phone: '+91 90038 29977',
      email: 'admissions@krce.ac.in',
      location: 'Administrative Block, Ground Floor',
      hours: '8:30 AM - 5:30 PM (Mon - Sat)',
    },
    {
      name: 'Main Administrative Office',
      role: 'General college administration, student affairs, and certificates',
      phone: '+91 98429 91377',
      email: 'info@krce.ac.in',
      location: 'NH 45, Samayapuram, Tiruchirappalli',
      hours: '9:00 AM - 5:00 PM',
    },
    {
      name: 'Controller of Examinations (COE)',
      role: 'Autonomous exams, results declaration, grade cards, and revaluations',
      phone: '+91 98429 91377',
      email: 'coe@krce.ac.in',
      location: 'COE Wing, First Floor, Main Building',
      hours: '9:00 AM - 4:45 PM',
    },
    {
      name: 'Training & Corporate Placement Cell',
      role: 'Campus recruitment drives, internships, and corporate partnerships',
      phone: '+91 98428 29977',
      email: 'placement@krce.ac.in',
      location: 'Placement & Career Guidance Block, 2nd Floor',
      hours: '8:45 AM - 5:15 PM',
    },
    {
      name: 'Hostel Chief Warden Office',
      role: 'Boys and girls residential hostel admissions, mess, and student welfare',
      phone: '+91 98429 91388',
      email: 'hostel@krce.ac.in',
      location: 'Campus Hostel Complex Main Office',
      hours: '24 Hours On-Call Support',
    },
    {
      name: 'Central Library Helpdesk',
      role: 'Book borrowing, digital IEEE subscriptions, and study hall assistance',
      phone: '+91 98429 91377',
      email: 'info@krce.ac.in',
      location: 'Central Library Building',
      hours: '8:30 AM - 6:30 PM',
    },
  ];

  // Scraped Notices
  const notices = [
    {
      id: 'not-adm',
      title: 'Admissions Open for 2026–2027 Academic Year',
      date: '15 Oct 2026',
      tag: 'Admissions',
      content:
        'Online and in-person registration is open for B.E., B.Tech, and M.E. courses for academic year 2026–2027. Early reporting is advised for scholarship consideration under Anna University TNEA Code 3814.',
    },
    {
      id: 'not-coe',
      title: 'Autonomous End-Semester Examination Schedule',
      date: '12 Oct 2026',
      tag: 'Examinations',
      content:
        'Controller of Examinations has published the revised timetable for autonomous semester assessments. Hall tickets will be distributed through department advisors.',
    },
    {
      id: 'not-tech',
      title: 'National Level Technical Symposium - KRCE TECHFEST',
      date: '08 Oct 2026',
      tag: 'Symposium',
      content:
        'Departments of CSE and IT invite students across engineering colleges for paper presentations, robotics challenges, and hackathons.',
    },
    {
      id: 'not-placement',
      title: 'Campus Recruitment Drive - Tier-1 Tech Corporates',
      date: '03 Oct 2026',
      tag: 'Placements',
      content:
        'Placement Cell announces the upcoming campus recruitment schedule for 2026 graduating batches. Registered students must attend the pre-placement talk in the main auditorium.',
    },
  ];

  const currentSlide = CAROUSEL_SLIDES[carouselIndex];
  const activeDept = departmentsData.find((d) => d.id === selectedDeptId) || departmentsData[0];

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'departments':
        return 'Departments & Labs';
      case 'library':
        return 'Central Library';
      case 'procedures':
        return 'Administrative Procedures';
      case 'transport':
        return 'Bus Routes';
      case 'contacts':
        return 'Contacts & Directory';
      case 'notices':
        return 'Circulars & Notices';
      case 'search':
        return 'Search Campus';
      case 'saved':
        return 'Saved Bookmarks';
      case 'profile':
        if (!currentUser || isAuthViewActive) return 'Campus Identity Portal';
        return `${currentUser.role.toUpperCase()} PROFILE`;
      default:
        return 'Campusmate';
    }
  };

  return (
    <div className={`desktop-preview-container ${deviceMode === 'fullscreen' ? 'fullscreen-mode' : ''}`}>
      {/* Top Device Viewport Switcher */}
      <div className="device-toggle-bar">
        <Smartphone size={14} />
        <span>Mobile App Experience</span>
        <button
          className={`device-toggle-btn ${deviceMode === 'framed' ? 'active' : ''}`}
          onClick={() => setDeviceMode('framed')}
        >
          Phone Frame
        </button>
        <button
          className={`device-toggle-btn ${deviceMode === 'fullscreen' ? 'active' : ''}`}
          onClick={() => setDeviceMode('fullscreen')}
        >
          {deviceMode === 'fullscreen' ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          <span style={{ marginLeft: '4px' }}>Full Screen</span>
        </button>
      </div>

      {/* Main Mobile App Frame */}
      <div className="mobile-device-shell">
        {/* Status Bar */}
        <div className="mobile-status-bar">
          <span>9:41</span>
          <div className="dynamic-island">
            <div className="dynamic-island-camera" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px' }}>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Mobile App Header */}
        <header className="app-header">
          <div className="app-brand">
            {currentScreen !== 'home' ? (
              <button
                style={{ background: 'transparent', border: 0, padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', color: '#1d536b' }}
                onClick={() => setCurrentScreen('home')}
              >
                <ChevronLeft size={22} />
              </button>
            ) : (
              <button
                style={{ background: 'transparent', border: 0, padding: '4px', cursor: 'pointer' }}
                onClick={() => setDrawerOpen(true)}
              >
                <Menu size={22} color="#1d536b" />
              </button>
            )}

            <img src={KRCE_LOGO} alt="KRCE Logo" className="app-brand-logo" />
            <div className="app-brand-text">
              <strong>{getScreenTitle()}</strong>
              <small>K. RAMAKRISHNAN COLLEGE OF ENGG.</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              style={{
                background: currentScreen === 'search' ? '#206b85' : '#f0f5f7',
                border: 0,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentScreen('search')}
            >
              <Search size={15} color={currentScreen === 'search' ? '#fff' : '#1d536b'} />
            </button>
            <button
              style={{
                background: currentScreen === 'profile' ? '#206b85' : '#f0f5f7',
                border: 0,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setCurrentScreen('profile');
                setIsAuthViewActive(false);
              }}
              title="Campus Profile & Digital ID"
            >
              {currentUser?.role === 'faculty' ? (
                <Briefcase size={15} color={currentScreen === 'profile' ? '#fff' : '#0e5b4b'} />
              ) : currentUser?.role === 'staff' ? (
                <ShieldCheck size={15} color={currentScreen === 'profile' ? '#fff' : '#243447'} />
              ) : (
                <GraduationCap size={15} color={currentScreen === 'profile' ? '#fff' : '#1d536b'} />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Viewport Scroll Area */}
        <div className="app-viewport">
          {/* ============================================================ */}
          {/* 1. SEPARATE PAGE: HOME / OVERVIEW                            */}
          {/* ============================================================ */}
          {currentScreen === 'home' && (
            <div>
              {/* Interactive Image Carousel */}
              <div
                className="carousel-card"
                onClick={() => setLightboxImage({ url: currentSlide.image, title: currentSlide.title })}
                style={{ cursor: 'pointer' }}
              >
                <div className="carousel-slide">
                  <img src={currentSlide.image} alt={currentSlide.title} className="carousel-img" />
                  <div className="carousel-overlay">
                    <div className="carousel-kicker">{currentSlide.kicker}</div>
                    <h3>{currentSlide.title}</h3>
                    <p>{currentSlide.subtitle}</p>
                  </div>
                </div>

                <div className="carousel-dots" onClick={(e) => e.stopPropagation()}>
                  {CAROUSEL_SLIDES.map((_, idx) => (
                    <div
                      key={idx}
                      className={`carousel-dot ${carouselIndex === idx ? 'active' : ''}`}
                      onClick={() => setCarouselIndex(idx)}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Action Pills Strip */}
              <div className="quick-action-strip">
                <div className="action-pill" onClick={() => setCurrentScreen('departments')}>
                  <div className="action-pill-icon">
                    <Building2 size={18} />
                  </div>
                  <span>Departments</span>
                </div>

                <div className="action-pill" onClick={() => setCurrentScreen('library')}>
                  <div className="action-pill-icon">
                    <BookOpen size={18} />
                  </div>
                  <span>Library</span>
                </div>

                <div className="action-pill" onClick={() => setCurrentScreen('procedures')}>
                  <div className="action-pill-icon">
                    <ClipboardList size={18} />
                  </div>
                  <span>Procedures</span>
                </div>

                <div className="action-pill" onClick={() => setCurrentScreen('transport')}>
                  <div className="action-pill-icon">
                    <Bus size={18} />
                  </div>
                  <span>Bus Routes</span>
                </div>
              </div>

              {/* Campus Highlights Grid */}
              <div className="app-section-header">
                <h2>Explore Campus Facilities</h2>
                <button onClick={() => setCurrentScreen('departments')}>
                  <span>All Depts</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {departmentsData.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="campus-card"
                  onClick={() => {
                    setSelectedDeptId(item.id);
                    setCurrentScreen('departments');
                  }}
                >
                  <div className="campus-card-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage({ url: item.image, title: item.name });
                      }}
                    />
                    <div className="campus-card-tag">{item.degree}</div>
                  </div>
                  <div className="campus-card-body">
                    <div className="campus-card-title">{item.name}</div>
                    <div className="campus-card-snippet">{item.summary}</div>
                    <div className="campus-card-footer">
                      <span className="card-view-btn">
                        <span>View labs & curriculum</span>
                        <ArrowRight size={12} />
                      </span>
                      <button
                        style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
                        onClick={(e) => toggleBookmark(item.id, e)}
                      >
                        <Bookmark
                          size={16}
                          fill={savedIds.includes(item.id) ? '#206b85' : 'none'}
                          color="#206b85"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Latest Circulars & Notices */}
              <div className="app-section-header">
                <h2>Campus Notices</h2>
                <button onClick={() => setCurrentScreen('notices')}>
                  <span>All Notices</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {notices.map((n) => (
                <div
                  key={n.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5edef',
                    borderRadius: '12px',
                    padding: '14px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedDetail(n)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#206b85', textTransform: 'uppercase' }}>
                      {n.tag}
                    </span>
                    <span style={{ fontSize: '10px', color: '#8fa0a8' }}>{n.date}</span>
                  </div>
                  <strong style={{ fontSize: '13px', color: '#193744', display: 'block', marginBottom: '4px' }}>
                    {n.title}
                  </strong>
                  <p style={{ fontSize: '11.5px', color: '#68828f', margin: 0 }}>{n.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. SEPARATE PAGE: DEPARTMENTS & LABS                          */}
          {/* ============================================================ */}
          {currentScreen === 'departments' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                  Departments & Laboratories
                </h2>
                <p style={{ fontSize: '12px', color: '#6f8691', margin: 0 }}>
                  Select any branch to view research labs, faculty, and industry programs.
                </p>
              </div>

              {/* Horizontal Department Pill Switcher */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  overflowX: 'auto',
                  paddingBottom: '8px',
                  marginBottom: '14px',
                  whiteSpace: 'nowrap',
                }}
              >
                {departmentsData.map((d) => (
                  <button
                    key={d.id}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: selectedDeptId === d.id ? '#1d536b' : '#dfe8eb',
                      background: selectedDeptId === d.id ? '#1d536b' : '#ffffff',
                      color: selectedDeptId === d.id ? '#ffffff' : '#3e5864',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    onClick={() => setSelectedDeptId(d.id)}
                  >
                    {d.code}
                  </button>
                ))}
              </div>

              {/* Active Department Profile Card */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e5edef', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ position: 'relative', height: '170px' }}>
                  <img
                    src={activeDept.image}
                    alt={activeDept.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setLightboxImage({ url: activeDept.image, title: activeDept.name })}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(29, 83, 107, 0.88)',
                      backdropFilter: 'blur(4px)',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 800,
                    }}
                  >
                    {activeDept.degree} &bull; {activeDept.accreditation}
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ font: '800 17px Manrope', color: '#193744', margin: '0 0 6px', flex: 1 }}>
                      {activeDept.name}
                    </h3>
                    <button
                      style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: '4px' }}
                      onClick={(e) => toggleBookmark(activeDept.id, e)}
                    >
                      <Bookmark
                        size={18}
                        fill={savedIds.includes(activeDept.id) ? '#206b85' : 'none'}
                        color="#206b85"
                      />
                    </button>
                  </div>

                  <p style={{ fontSize: '12.5px', color: '#55707d', lineHeight: '1.6', margin: '0 0 14px' }}>
                    {activeDept.summary}
                  </p>

                  <div style={{ background: '#f5f9fa', padding: '12px', borderRadius: '10px', marginBottom: '14px' }}>
                    <strong style={{ fontSize: '11px', color: '#1d536b', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                      <Award size={14} /> Faculty Profile
                    </strong>
                    <div style={{ fontSize: '11.5px', color: '#557280' }}>{activeDept.faculty}</div>
                  </div>

                  {/* Laboratories List */}
                  <div style={{ marginBottom: '14px' }}>
                    <strong style={{ fontSize: '12px', color: '#193744', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Cpu size={14} color="#206b85" /> Research & Training Laboratories
                    </strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {activeDept.labs.map((lab, lidx) => (
                        <div
                          key={lidx}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #e7eff2',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '11.5px',
                            color: '#365360',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <CheckCircle2 size={13} color="#10b981" />
                          <span>{lab}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Department Highlights */}
                  <div>
                    <strong style={{ fontSize: '12px', color: '#193744', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Layers size={14} color="#206b85" /> Key Initiatives & Certifications
                    </strong>
                    <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '11.5px', color: '#5b7482', lineHeight: '1.6' }}>
                      {activeDept.highlights.map((hl, hidx) => (
                        <li key={hidx} style={{ marginBottom: '4px' }}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. SEPARATE PAGE: CENTRAL LIBRARY                            */}
          {/* ============================================================ */}
          {currentScreen === 'library' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                  Central Library & Digital Archives
                </h2>
                <p style={{ fontSize: '12px', color: '#6f8691', margin: 0 }}>
                  2,412 Sq.Metre modern learning hub with digital research facilities.
                </p>
              </div>

              {/* Main Photo */}
              <div
                className="campus-card"
                onClick={() => setLightboxImage({ url: 'https://www.krce.ac.in/images/g11.jpg', title: 'Central Library Main Hall' })}
                style={{ marginBottom: '14px' }}
              >
                <div className="campus-card-img-wrap" style={{ height: '170px' }}>
                  <img src="https://www.krce.ac.in/images/g11.jpg" alt="Library Reading Hall" />
                  <div className="campus-card-tag">Fully Air-Conditioned Knowledge Center</div>
                </div>
              </div>

              {/* Key Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e5edef', padding: '12px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '18px', color: '#1d536b', display: 'block' }}>45,000+</strong>
                  <span style={{ fontSize: '11px', color: '#7a929e' }}>Textbooks & Reference Books</span>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e5edef', padding: '12px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '18px', color: '#1d536b', display: 'block' }}>60+ Terminals</strong>
                  <span style={{ fontSize: '11px', color: '#7a929e' }}>High-Speed Digital Lab</span>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e5edef', padding: '12px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '18px', color: '#1d536b', display: 'block' }}>8:30 - 18:30</strong>
                  <span style={{ fontSize: '11px', color: '#7a929e' }}>Operating Hours (Mon - Sat)</span>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e5edef', padding: '12px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '18px', color: '#1d536b', display: 'block' }}>IEEE / DELNET</strong>
                  <span style={{ fontSize: '11px', color: '#7a929e' }}>E-Journals Consortium</span>
                </div>
              </div>

              {/* Digital Library Terminal Section */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px', border: '1px solid #e5edef', marginBottom: '14px' }}>
                <strong style={{ fontSize: '14px', color: '#193744', display: 'block', marginBottom: '8px' }}>
                  Digital Library & Electronic Resources
                </strong>
                <p style={{ fontSize: '12px', color: '#68828f', lineHeight: '1.6', margin: '0 0 10px' }}>
                  Equipped with dedicated high-speed optical fiber terminals providing campus-wide access to IEEE Xplore, ScienceDirect, DELNET, NPTEL video lectures, and national digital archives.
                </p>

                <div style={{ height: '130px', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px', cursor: 'pointer' }}>
                  <img
                    src="https://www.krce.ac.in/images/g12.jpg"
                    alt="Digital Library Terminals"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onClick={() => setLightboxImage({ url: 'https://www.krce.ac.in/images/g12.jpg', title: '60+ Digital Workstations' })}
                  />
                </div>

                <div style={{ fontSize: '11.5px', color: '#4d6976' }}>
                  <strong>Borrowing Privileges:</strong> Undergraduates: 4 books for 14 days (renewable). Postgraduates: 6 books. Barcoded automated issue/return system.
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. SEPARATE PAGE: ADMINISTRATIVE PROCEDURES                  */}
          {/* ============================================================ */}
          {currentScreen === 'procedures' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                  Administrative Procedures
                </h2>
                <p style={{ fontSize: '12px', color: '#6f8691', margin: 0 }}>
                  Interactive checklist & guidelines for admissions, revaluation, bonafide certificates, and hostels.
                </p>
              </div>

              {procedures.map((proc) => (
                <div
                  key={proc.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5edef',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#206b85', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {proc.category} &bull; Processing Time: {proc.processingTime}
                  </div>
                  <strong style={{ fontSize: '15px', color: '#193744', display: 'block', marginBottom: '6px' }}>
                    {proc.title}
                  </strong>
                  <div style={{ fontSize: '11px', color: '#57727f', marginBottom: '12px' }}>
                    <strong>Fees: </strong> {proc.fees}
                  </div>

                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#193744', marginBottom: '8px' }}>
                    Required Document Checklist (Tap to tick):
                  </div>
                  {proc.checklist.map((docName, didx) => {
                    const checkKey = `${proc.id}-${didx}`;
                    const isChecked = !!checkedDocs[checkKey];
                    return (
                      <div
                        key={didx}
                        className={`checklist-item ${isChecked ? 'checked' : ''}`}
                        onClick={() => setCheckedDocs({ ...checkedDocs, [checkKey]: !isChecked })}
                      >
                        {isChecked ? <CheckSquare size={16} color="#10b981" /> : <Square size={16} color="#8aa1ad" />}
                        <span>{docName}</span>
                      </div>
                    );
                  })}

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f0f4f6' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#193744', marginBottom: '6px' }}>
                      Procedure Steps:
                    </div>
                    <ol style={{ paddingLeft: '18px', fontSize: '11.5px', color: '#5b7482', lineHeight: '1.6', margin: 0 }}>
                      {proc.steps.map((st, sidx) => (
                        <li key={sidx} style={{ marginBottom: '4px' }}>{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* 5. SEPARATE PAGE: BUS ROUTES                                  */}
          {/* ============================================================ */}
          {currentScreen === 'transport' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                  Campus Bus Transport Routes
                </h2>
                <p style={{ fontSize: '12px', color: '#6f8691', margin: 0 }}>
                  Fleet of over 50 buses operating throughout Tiruchirappalli and neighboring districts.
                </p>
              </div>

              {busRoutes.map((rt, ridx) => (
                <div
                  key={ridx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5edef',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, background: '#eaf5f8', color: '#1d6079', padding: '3px 8px', borderRadius: '6px' }}>
                      {rt.routeNumber}
                    </span>
                    <span style={{ fontSize: '11px', color: '#206b85', fontWeight: 700 }}>
                      Depart: {rt.morningDeparture}
                    </span>
                  </div>

                  <strong style={{ fontSize: '14px', color: '#193744', display: 'block', marginBottom: '6px' }}>
                    {rt.title}
                  </strong>

                  <div style={{ fontSize: '11.5px', color: '#5e7987', lineHeight: '1.5', marginBottom: '10px' }}>
                    <strong>Key Stops:</strong> {rt.stops}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#889da7', paddingTop: '8px', borderTop: '1px solid #f2f5f7' }}>
                    <span>Evening Return: {rt.eveningArrival}</span>
                    <a href="tel:+919842991377" style={{ color: '#206b85', fontWeight: 700 }}>
                      Contact Transport Desk
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* 6. SEPARATE PAGE: CONTACTS & DIRECTORY                        */}
          {currentScreen === 'contacts' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                  Contacts & Office Directory
                </h2>
                <p style={{ fontSize: '12px', color: '#6f8691', margin: 0 }}>
                  1-Tap calling and emailing for all college helplines and administrative heads.
                </p>
              </div>

              {contactsList.map((con, cidx) => (
                <div
                  key={cidx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5edef',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <strong style={{ fontSize: '14.5px', color: '#193744', display: 'block', marginBottom: '3px' }}>
                    {con.name}
                  </strong>
                  <div style={{ fontSize: '11.5px', color: '#6f8691', marginBottom: '12px' }}>{con.role}</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a
                      href={`tel:${con.phone}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#f0f7f9',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        color: '#1d6079',
                        fontWeight: 700,
                        fontSize: '12px',
                      }}
                    >
                      <Phone size={14} />
                      <span>Call: {con.phone}</span>
                    </a>

                    <a
                      href={`mailto:${con.email}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#f5f7f8',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        color: '#466472',
                        fontSize: '12px',
                      }}
                    >
                      <Mail size={14} />
                      <span>Email: {con.email}</span>
                    </a>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#889da7', padding: '2px 4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} />
                        <span>{con.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        <span>{con.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* 7. SEPARATE PAGE: NOTICES & CIRCULARS                         */}
          {/* ============================================================ */}
          {currentScreen === 'notices' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                  Circulars & Academic Notices
                </h2>
                <p style={{ fontSize: '12px', color: '#6f8691', margin: 0 }}>
                  Official notifications from the Principal and Controller of Examinations.
                </p>
              </div>

              {notices.map((n) => (
                <div
                  key={n.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5edef',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#206b85', textTransform: 'uppercase' }}>
                      {n.tag}
                    </span>
                    <span style={{ fontSize: '10px', color: '#8fa0a8' }}>{n.date}</span>
                  </div>
                  <strong style={{ fontSize: '14px', color: '#193744', display: 'block', marginBottom: '6px' }}>
                    {n.title}
                  </strong>
                  <p style={{ fontSize: '12px', color: '#68828f', lineHeight: '1.6' }}>{n.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* 8. SEPARATE PAGE: SEARCH CAMPUS                              */}
          {/* ============================================================ */}
          {currentScreen === 'search' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                  Search Campus Information
                </h2>
                <p style={{ fontSize: '12px', color: '#6f8691', margin: 0 }}>
                  Real-time lookup across departments, procedures, bus routes, and library.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', background: '#ffffff', border: '1px solid #d8e5ea', borderRadius: '12px', padding: '10px 14px', marginBottom: '14px' }}>
                <Search size={18} color="#7b939e" />
                <input
                  style={{ flex: 1, border: 0, outline: 'none', fontSize: '13px', color: '#193744' }}
                  placeholder="Search CSE, library hours, revaluation, bus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button style={{ border: 0, background: 'transparent', cursor: 'pointer' }} onClick={() => setSearchQuery('')}>
                    <X size={16} />
                  </button>
                )}
              </div>

              {departmentsData
                .filter((i) => `${i.name} ${i.summary} ${i.code}`.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item) => (
                  <div
                    key={item.id}
                    className="campus-card"
                    onClick={() => {
                      setSelectedDeptId(item.id);
                      setCurrentScreen('departments');
                    }}
                  >
                    <div className="campus-card-body">
                      <div className="campus-card-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '6px' }}>
                        {item.degree}
                      </div>
                      <div className="campus-card-title">{item.name}</div>
                      <div className="campus-card-snippet">{item.summary}</div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* 9. SEPARATE PAGE: SAVED BOOKMARKS                            */}
          {/* ============================================================ */}
          {currentScreen === 'saved' && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                  Saved Bookmarks
                </h2>
                <p style={{ fontSize: '12px', color: '#6f8691', margin: 0 }}>
                  Items bookmarked for offline and quick access.
                </p>
              </div>

              {savedIds.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8ca0a8' }}>
                  <Bookmark size={36} color="#adc0c8" style={{ marginBottom: '10px' }} />
                  <strong style={{ display: 'block', fontSize: '15px', color: '#274350' }}>No Saved Items Yet</strong>
                  <p style={{ fontSize: '12px', marginTop: '4px' }}>
                    Tap the bookmark icon on any card to save it here.
                  </p>
                </div>
              ) : (
                departmentsData
                  .filter((i) => savedIds.includes(i.id))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="campus-card"
                      onClick={() => {
                        setSelectedDeptId(item.id);
                        setCurrentScreen('departments');
                      }}
                    >
                      <div className="campus-card-body">
                        <div className="campus-card-title">{item.name}</div>
                        <div className="campus-card-snippet">{item.summary}</div>
                        <button
                          style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            marginTop: '8px',
                          }}
                          onClick={(e) => toggleBookmark(item.id, e)}
                        >
                          Remove from bookmarks
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 10. MULTI-ROLE PROFILE MANAGEMENT & REGISTRATION (STUDENT / FACULTY / STAFF) */}
          {/* ============================================================ */}
          {currentScreen === 'profile' && (
            <div>
              {/* Alert Feedback Toast */}
              {authSuccess && (
                <div
                  style={{
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #a7f3d0',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle2 size={16} color="#059669" />
                  <span>{authSuccess}</span>
                </div>
              )}

              {authError && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    color: '#991b1b',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #fecaca',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <AlertCircle size={16} color="#dc2626" />
                  <span>{authError}</span>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* CASE A: USER LOGGED IN - ROLE-BASED DASHBOARD & ID  */}
              {/* ---------------------------------------------------- */}
              {currentUser && !isAuthViewActive ? (
                <div>
                  {/* Quick Role Switcher Bar */}
                  <div className="role-quick-bar">
                    <button
                      className={`role-quick-btn ${currentUser.role === 'student' ? 'active' : ''}`}
                      onClick={() => handleQuickSwitch('student')}
                    >
                      <GraduationCap size={13} />
                      <span>Student</span>
                    </button>
                    <button
                      className={`role-quick-btn ${currentUser.role === 'faculty' ? 'active' : ''}`}
                      onClick={() => handleQuickSwitch('faculty')}
                    >
                      <Briefcase size={13} />
                      <span>Faculty</span>
                    </button>
                    <button
                      className={`role-quick-btn ${currentUser.role === 'staff' ? 'active' : ''}`}
                      onClick={() => handleQuickSwitch('staff')}
                    >
                      <ShieldCheck size={13} />
                      <span>Staff</span>
                    </button>
                    <button
                      className="role-quick-btn"
                      style={{ color: '#e11d48' }}
                      onClick={handleSignOut}
                      title="Sign Out / Register New Account"
                    >
                      <LogOut size={13} />
                      <span>Logout</span>
                    </button>
                  </div>

                  {/* Header Title */}
                  <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                        {currentUser.role === 'student'
                          ? 'Digital Student Identity'
                          : currentUser.role === 'faculty'
                          ? 'Faculty & Research Profile'
                          : 'Administrative Staff Identity'}
                      </h2>
                      <p style={{ fontSize: '11.5px', color: '#6f8691', margin: 0 }}>
                        Official KRCE Autonomous digital credentials & campus clearances.
                      </p>
                    </div>
                    <span className={`role-badge ${currentUser.role}`}>
                      {currentUser.role === 'student' && <GraduationCap size={12} />}
                      {currentUser.role === 'faculty' && <Briefcase size={12} />}
                      {currentUser.role === 'staff' && <ShieldCheck size={12} />}
                      {currentUser.role}
                    </span>
                  </div>

                  {/* Role-Themed Digital Smart ID Card */}
                  <div className={`digital-id-card theme-${currentUser.role}`}>
                    {/* ID Header */}
                    <div className="id-header">
                      <div>
                        <strong style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                          K. RAMAKRISHNAN COLLEGE OF ENGG.
                        </strong>
                        <div style={{ fontSize: '9px', color: '#a6d7e2' }}>
                          Autonomous • Affiliated to Anna University • NBA & NAAC 'A'
                        </div>
                      </div>
                      <img src={KRCE_LOGO} alt="KRCE" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                    </div>

                    {/* Role Header Banner inside Card */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className={`role-badge-card ${currentUser.role}`}>
                        {currentUser.role === 'student' && '🎓 KRCE STUDENT SMART CARD'}
                        {currentUser.role === 'faculty' && '👨‍🏫 KRCE FACULTY & RESEARCH ID'}
                        {currentUser.role === 'staff' && '👔 KRCE ADMINISTRATIVE STAFF ID'}
                      </span>
                      <small style={{ fontSize: '9px', color: '#e0f2fe', letterSpacing: '0.4px', fontWeight: 700 }}>
                        TNEA CODE: 3814
                      </small>
                    </div>

                    {/* ID Body */}
                    <div className="id-body">
                      <div
                        style={{
                          width: '74px',
                          height: '92px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.95)',
                          display: 'grid',
                          placeItems: 'center',
                          color: currentUser.role === 'student' ? '#1d536b' : currentUser.role === 'faculty' ? '#064e3b' : '#1e293b',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                          flexShrink: 0,
                        }}
                      >
                        {currentUser.role === 'student' && <GraduationCap size={40} />}
                        {currentUser.role === 'faculty' && <Award size={40} />}
                        {currentUser.role === 'staff' && <ShieldCheck size={40} />}
                      </div>

                      <div className="id-info" style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ fontSize: '15px', color: '#ffffff', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                          {currentUser.fullName}
                        </strong>

                        {/* Student Specific Fields */}
                        {currentUser.role === 'student' && (
                          <>
                            <small>Roll No: {(currentUser as StudentProfile).rollNo}</small>
                            <small>Reg No: {(currentUser as StudentProfile).registerNo}</small>
                            <small>Degree: {(currentUser as StudentProfile).degree}</small>
                            <small>
                              Dept: {(currentUser as StudentProfile).department} &bull; {(currentUser as StudentProfile).year}
                            </small>
                            <small>Blood: {currentUser.bloodGroup} &bull; Valid: 2024–2028</small>
                          </>
                        )}

                        {/* Faculty Specific Fields */}
                        {currentUser.role === 'faculty' && (
                          <>
                            <small>Staff ID: {(currentUser as FacultyProfile).staffId}</small>
                            <small>Rank: {(currentUser as FacultyProfile).designation}</small>
                            <small>Dept: {(currentUser as FacultyProfile).department}</small>
                            <small>Cabin: {(currentUser as FacultyProfile).cabinLocation}</small>
                            <small>Blood: {currentUser.bloodGroup} &bull; Intercom: {(currentUser as FacultyProfile).intercomExt}</small>
                          </>
                        )}

                        {/* Staff Specific Fields */}
                        {currentUser.role === 'staff' && (
                          <>
                            <small>Staff ID: {(currentUser as StaffProfile).staffId}</small>
                            <small>Section: {(currentUser as StaffProfile).wing}</small>
                            <small>Designation: {(currentUser as StaffProfile).designation}</small>
                            <small>Counter: {(currentUser as StaffProfile).deskLocation}</small>
                            <small>Blood: {currentUser.bloodGroup} &bull; Shift: General</small>
                          </>
                        )}
                      </div>
                    </div>

                    {/* ID Footer Bar */}
                    <div
                      style={{
                        marginTop: '14px',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(255,255,255,0.18)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#cbe4ee' }}>
                        <QrCode size={15} />
                        <span>VERIFIED SMART ID</span>
                      </div>
                      <span style={{ fontSize: '9.5px', color: '#fff', background: 'rgba(255,255,255,0.18)', padding: '2px 8px', borderRadius: '12px' }}>
                        Autonomous Anna Univ Pass
                      </span>
                    </div>
                  </div>

                  {/* ID Actions Toolbar */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
                    <button
                      onClick={handleOpenEditModal}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 12px',
                        background: '#ffffff',
                        border: '1px solid #d4e2e8',
                        borderRadius: '10px',
                        color: '#1d536b',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                      }}
                    >
                      <Edit3 size={14} />
                      <span>Edit Profile</span>
                    </button>

                    <button
                      onClick={handleCopyCardData}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 12px',
                        background: '#ffffff',
                        border: '1px solid #d4e2e8',
                        borderRadius: '10px',
                        color: '#1d536b',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                      }}
                    >
                      {copiedIdCard ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                      <span>{copiedIdCard ? 'Copied ID Data!' : 'Copy Digital Pass'}</span>
                    </button>
                  </div>

                  {/* Role-Specific Metrics Grid */}
                  <div className="profile-metrics-grid">
                    {currentUser.role === 'student' && (
                      <>
                        <div className="profile-metric-tile">
                          <small>Attendance Record</small>
                          <strong>{(currentUser as StudentProfile).attendance}</strong>
                          <span className="metric-subtext">✓ Eligible for Exams</span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Cumulative CGPA</small>
                          <strong>{(currentUser as StudentProfile).cgpa} / 10</strong>
                          <span className="metric-subtext">First Class with Distinction</span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Semester & Year</small>
                          <strong>{(currentUser as StudentProfile).semester}</strong>
                          <span style={{ fontSize: '10px', color: '#688594', fontWeight: 600 }}>
                            {(currentUser as StudentProfile).year}
                          </span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Library Clearance</small>
                          <strong>0 Overdue</strong>
                          <span className="metric-subtext">3 Books Borrowed</span>
                        </div>
                      </>
                    )}

                    {currentUser.role === 'faculty' && (
                      <>
                        <div className="profile-metric-tile">
                          <small>Teaching Load</small>
                          <strong>18 Hrs / Wk</strong>
                          <span className="metric-subtext">Theory + Research Lab</span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Assigned Courses</small>
                          <strong>{(currentUser as FacultyProfile).coursesHandled.length} Courses</strong>
                          <span className="metric-subtext">Active Semester 6</span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Advisee Mentees</small>
                          <strong>{(currentUser as FacultyProfile).assignedMentees} Students</strong>
                          <span className="metric-subtext">Batch 2024–2028</span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Research Index</small>
                          <strong>14 Scopus</strong>
                          <span className="metric-subtext">IEEE Senior Member</span>
                        </div>
                      </>
                    )}

                    {currentUser.role === 'staff' && (
                      <>
                        <div className="profile-metric-tile">
                          <small>Operational Wing</small>
                          <strong style={{ fontSize: '13px' }}>{(currentUser as StaffProfile).wing.split('(')[0]}</strong>
                          <span className="metric-subtext">Ground Floor</span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Service Station</small>
                          <strong>Counter #2</strong>
                          <span className="metric-subtext">Verification Wing</span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Duty Shift</small>
                          <strong>08:30 – 17:00</strong>
                          <span className="metric-subtext">General Shift</span>
                        </div>
                        <div className="profile-metric-tile">
                          <small>Queries Handled</small>
                          <strong>42 Today</strong>
                          <span className="metric-subtext">✓ All Cleared</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Role-Specific Detail Card */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px', border: '1px solid #e5edef', marginBottom: '16px' }}>
                    <strong style={{ fontSize: '14px', color: '#193744', display: 'block', marginBottom: '12px' }}>
                      {currentUser.role === 'student' && 'Campus Transit & Mentorship'}
                      {currentUser.role === 'faculty' && 'Academic Roster & Office Hours'}
                      {currentUser.role === 'staff' && 'Desk Responsibilities & Roster'}
                    </strong>

                    {currentUser.role === 'student' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f2f6f8' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Transit Allocation:</span>
                          <strong style={{ fontSize: '12px', color: '#193744', textAlign: 'right' }}>
                            {(currentUser as StudentProfile).residentialType === 'Hostel'
                              ? `🏢 Hostel: ${(currentUser as StudentProfile).hostelRoom}`
                              : `🚌 Bus: ${(currentUser as StudentProfile).busRoute}`}
                          </strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f2f6f8' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Assigned Faculty Mentor:</span>
                          <strong style={{ fontSize: '12px', color: '#193744', textAlign: 'right' }}>
                            {(currentUser as StudentProfile).mentorName}
                          </strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f2f6f8' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Emergency Contact:</span>
                          <strong style={{ fontSize: '12px', color: '#193744' }}>{currentUser.emergencyContact}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Registered Mobile:</span>
                          <strong style={{ fontSize: '12px', color: '#193744' }}>{currentUser.phone}</strong>
                        </div>
                      </div>
                    )}

                    {currentUser.role === 'faculty' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f2f6f8' }}>
                          <span style={{ fontSize: '12px', color: '#567280', display: 'block', marginBottom: '4px' }}>
                            Courses in Current Semester:
                          </span>
                          {(currentUser as FacultyProfile).coursesHandled.map((c, i) => (
                            <div key={i} style={{ fontSize: '12px', fontWeight: 700, color: '#193744', marginBottom: '3px' }}>
                              &bull; {c}
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f2f6f8' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Office Consultation Hours:</span>
                          <strong style={{ fontSize: '12px', color: '#10b981' }}>{(currentUser as FacultyProfile).officeHours}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f2f6f8' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Research Area:</span>
                          <strong style={{ fontSize: '12px', color: '#193744' }}>{(currentUser as FacultyProfile).specialization}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Direct Ext / Mobile:</span>
                          <strong style={{ fontSize: '12px', color: '#193744' }}>
                            {(currentUser as FacultyProfile).intercomExt} &bull; {currentUser.phone}
                          </strong>
                        </div>
                      </div>
                    )}

                    {currentUser.role === 'staff' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f2f6f8' }}>
                          <span style={{ fontSize: '12px', color: '#567280', display: 'block', marginBottom: '4px' }}>
                            Counter Operational Responsibilities:
                          </span>
                          {(currentUser as StaffProfile).responsibilities.map((r, i) => (
                            <div key={i} style={{ fontSize: '12px', fontWeight: 600, color: '#193744', marginBottom: '3px' }}>
                              &bull; {r}
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f2f6f8' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Service Desk Location:</span>
                          <strong style={{ fontSize: '12px', color: '#193744' }}>{(currentUser as StaffProfile).deskLocation}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#567280' }}>Intercom & Mobile:</span>
                          <strong style={{ fontSize: '12px', color: '#193744' }}>
                            {(currentUser as StaffProfile).extensionNumber} &bull; {currentUser.phone}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Switch to Registration / Sign In View Button */}
                  <button
                    onClick={() => {
                      setIsAuthViewActive(true);
                      setAuthMode('register');
                    }}
                    style={{
                      width: '100%',
                      padding: '11px',
                      background: '#eaf4f7',
                      border: '1px dashed #206b85',
                      borderRadius: '10px',
                      color: '#1a5b70',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      marginBottom: '16px',
                    }}
                  >
                    <UserPlus size={15} />
                    <span>Register Another Profile or Switch Account</span>
                  </button>

                  {/* Quick Shortcuts */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px', border: '1px solid #e5edef' }}>
                    <strong style={{ fontSize: '14px', color: '#193744', display: 'block', marginBottom: '12px' }}>
                      Campus Shortcuts
                    </strong>

                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f4f6', cursor: 'pointer' }}
                      onClick={() => setCurrentScreen('saved')}
                    >
                      <span style={{ fontSize: '13px', color: '#44616e' }}>Saved Bookmarks</span>
                      <strong style={{ color: '#1d6079', fontSize: '13px' }}>{savedIds.length} Items</strong>
                    </div>

                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f4f6', cursor: 'pointer' }}
                      onClick={() => setCurrentScreen('procedures')}
                    >
                      <span style={{ fontSize: '13px', color: '#44616e' }}>Administrative Procedures</span>
                      <strong style={{ color: '#1d6079', fontSize: '13px' }}>Reval & Leaves</strong>
                    </div>

                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f4f6', cursor: 'pointer' }}
                      onClick={() => setCurrentScreen('transport')}
                    >
                      <span style={{ fontSize: '13px', color: '#44616e' }}>Campus Bus Schedule</span>
                      <strong style={{ color: '#1d6079', fontSize: '13px' }}>6 Routes</strong>
                    </div>

                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', cursor: 'pointer' }}
                      onClick={() => setCurrentScreen('contacts')}
                    >
                      <span style={{ fontSize: '13px', color: '#44616e' }}>Campus Office Directory</span>
                      <strong style={{ color: '#1d6079', fontSize: '13px' }}>6 Helplines</strong>
                    </div>
                  </div>
                </div>
              ) : (
                /* ---------------------------------------------------- */
                /* CASE B: AUTHENTICATION & REGISTRATION GATEWAY        */
                /* ---------------------------------------------------- */
                <div className="auth-container-card">
                  {currentUser && (
                    <button
                      onClick={() => setIsAuthViewActive(false)}
                      style={{
                        background: 'transparent',
                        border: 0,
                        color: '#206b85',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '12px',
                        padding: 0,
                      }}
                    >
                      <ChevronLeft size={16} />
                      <span>Back to active {currentUser.role} profile</span>
                    </button>
                  )}

                  <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                    <img src={KRCE_LOGO} alt="KRCE" style={{ width: '42px', height: '42px', objectFit: 'contain', margin: '0 auto 8px' }} />
                    <h2 style={{ font: '800 18px Manrope', color: '#193744', margin: '0 0 4px' }}>
                      KRCE Campus Profile Gateway
                    </h2>
                    <p style={{ fontSize: '12px', color: '#688491', margin: 0 }}>
                      Official Identity & Management System for Students, Faculty & Staff
                    </p>
                  </div>

                  {/* Mode Switcher: Sign In vs Register */}
                  <div className="auth-mode-switch">
                    <button
                      className={`auth-mode-btn ${authMode === 'login' ? 'active' : ''}`}
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError('');
                      }}
                    >
                      <LogIn size={14} />
                      <span>Sign In</span>
                    </button>
                    <button
                      className={`auth-mode-btn ${authMode === 'register' ? 'active' : ''}`}
                      onClick={() => {
                        setAuthMode('register');
                        setAuthError('');
                      }}
                    >
                      <UserPlus size={14} />
                      <span>Create Account (Register)</span>
                    </button>
                  </div>

                  {/* Role Selector Tabs */}
                  <div style={{ marginBottom: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#3d5967', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                      Select Your Campus Role:
                    </label>
                  </div>
                  <div className="role-selector-pills">
                    <button
                      className={`role-pill-btn ${authRole === 'student' ? 'active' : ''}`}
                      onClick={() => setAuthRole('student')}
                    >
                      <GraduationCap size={18} />
                      <span>Student</span>
                    </button>
                    <button
                      className={`role-pill-btn ${authRole === 'faculty' ? 'active' : ''}`}
                      onClick={() => setAuthRole('faculty')}
                    >
                      <Briefcase size={18} />
                      <span>Faculty</span>
                    </button>
                    <button
                      className={`role-pill-btn ${authRole === 'staff' ? 'active' : ''}`}
                      onClick={() => setAuthRole('staff')}
                    >
                      <ShieldCheck size={18} />
                      <span>Staff</span>
                    </button>
                  </div>

                  {/* FORM 1: SIGN IN FORM */}
                  {authMode === 'login' ? (
                    <form onSubmit={handleLogin}>
                      <div className="profile-input-group">
                        <label>
                          {authRole === 'student'
                            ? 'Email or Roll Number / Reg No'
                            : 'Official KRCE Email or Staff ID'}
                        </label>
                        <input
                          className="profile-input-field"
                          placeholder={
                            authRole === 'student'
                              ? 'e.g. arunkumar.cse24@krce.ac.in or 2024-CSE-042'
                              : authRole === 'faculty'
                              ? 'e.g. ramesh.p@krce.ac.in or KRCE-FAC-CSE-108'
                              : 'e.g. sundaram.coe@krce.ac.in or KRCE-STF-COE-024'
                          }
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                        />
                      </div>

                      <div className="profile-input-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="profile-input-field"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>

                      <button type="submit" className="profile-submit-btn">
                        <LogIn size={16} />
                        <span>Sign In as {authRole.toUpperCase()}</span>
                      </button>

                      {/* Quick 1-Click Demo Accounts */}
                      <div className="demo-account-box">
                        <div className="demo-account-title">
                          <Sparkles size={13} color="#206b85" />
                          <span>Instant 1-Click Demo Accounts:</span>
                        </div>
                        <div className="demo-btn-row">
                          <button
                            type="button"
                            className="demo-login-chip"
                            onClick={() => handleQuickSwitch('student')}
                          >
                            🎓 Demo Student
                          </button>
                          <button
                            type="button"
                            className="demo-login-chip"
                            onClick={() => handleQuickSwitch('faculty')}
                          >
                            👨‍🏫 Demo Faculty
                          </button>
                          <button
                            type="button"
                            className="demo-login-chip"
                            onClick={() => handleQuickSwitch('staff')}
                          >
                            👔 Demo Staff
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    /* FORM 2: ROLE-TAILORED REGISTRATION FORM */
                    <form onSubmit={handleRegister}>
                      <div className="profile-input-group">
                        <label>Full Name (as per official KRCE records)</label>
                        <input
                          className="profile-input-field"
                          placeholder="e.g. K. Praveen Kumar"
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="profile-input-group">
                        <label>Official Email Address</label>
                        <input
                          type="email"
                          className="profile-input-field"
                          placeholder={
                            authRole === 'student'
                              ? 'e.g. studentname@krce.ac.in'
                              : authRole === 'faculty'
                              ? 'e.g. facultyname@krce.ac.in'
                              : 'e.g. staffname@krce.ac.in'
                          }
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        <div className="profile-input-group">
                          <label>Mobile Number</label>
                          <input
                            type="tel"
                            className="profile-input-field"
                            placeholder="+91 98429 00000"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                          />
                        </div>
                        <div className="profile-input-group">
                          <label>Blood Group</label>
                          <select
                            className="profile-input-field"
                            value={regBloodGroup}
                            onChange={(e) => setRegBloodGroup(e.target.value)}
                          >
                            <option value="O+ve">O+ve</option>
                            <option value="A+ve">A+ve</option>
                            <option value="B+ve">B+ve</option>
                            <option value="AB+ve">AB+ve</option>
                            <option value="O-ve">O-ve</option>
                            <option value="A-ve">A-ve</option>
                            <option value="B-ve">B-ve</option>
                            <option value="AB-ve">AB-ve</option>
                          </select>
                        </div>
                      </div>

                      {/* --- Dynamic Fields: STUDENT --- */}
                      {authRole === 'student' && (
                        <>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            <div className="profile-input-group">
                              <label>Roll Number</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. 2026-CSE-095"
                                value={regRollNo}
                                onChange={(e) => setRegRollNo(e.target.value)}
                              />
                            </div>
                            <div className="profile-input-group">
                              <label>AU Register No</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. 920424104095"
                                value={regRegisterNo}
                                onChange={(e) => setRegRegisterNo(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="profile-input-group">
                            <label>Department / Branch</label>
                            <select
                              className="profile-input-field"
                              value={regDepartment}
                              onChange={(e) => setRegDepartment(e.target.value)}
                            >
                              <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                              <option value="Artificial Intelligence & Data Science">AI & Data Science (AI&DS)</option>
                              <option value="Information Technology">Information Technology (IT)</option>
                              <option value="Electronics & Communication Engg">Electronics & Communication (ECE)</option>
                              <option value="Electrical & Electronics Engg">Electrical & Electronics (EEE)</option>
                              <option value="Mechanical Engineering">Mechanical Engineering</option>
                              <option value="Computer Science & Business Systems">Computer Science & Business Systems (CSBS)</option>
                              <option value="Master of Business Administration">MBA (Management Studies)</option>
                            </select>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            <div className="profile-input-group">
                              <label>Degree & Year</label>
                              <select
                                className="profile-input-field"
                                value={regYear}
                                onChange={(e) => setRegYear(e.target.value)}
                              >
                                <option value="1st Year">1st Year (Freshman)</option>
                                <option value="2nd Year">2nd Year (Sophomore)</option>
                                <option value="3rd Year">3rd Year (Junior)</option>
                                <option value="4th Year">4th Year (Senior)</option>
                              </select>
                            </div>
                            <div className="profile-input-group">
                              <label>Transit Mode</label>
                              <select
                                className="profile-input-field"
                                value={regTransitType}
                                onChange={(e) => setRegTransitType(e.target.value as any)}
                              >
                                <option value="Day Scholar">Day Scholar (College Bus)</option>
                                <option value="Hostel">Hostel Resident</option>
                              </select>
                            </div>
                          </div>

                          {regTransitType === 'Day Scholar' ? (
                            <div className="profile-input-group">
                              <label>Bus Route</label>
                              <select
                                className="profile-input-field"
                                value={regBusRoute}
                                onChange={(e) => setRegBusRoute(e.target.value)}
                              >
                                <option value="Route #1 (Trichy Central Bus Stand)">Route #1 - Central Bus Stand</option>
                                <option value="Route #2 (Thillai Nagar - Tollgate)">Route #2 - Thillai Nagar</option>
                                <option value="Route #3 (KK Nagar - Kattur)">Route #3 - KK Nagar</option>
                                <option value="Route #4 (Lalgudi - Samayapuram)">Route #4 - Lalgudi</option>
                                <option value="Route #5 (Thuvakudi - NIT Trichy)">Route #5 - Thuvakudi</option>
                                <option value="Route #6 (Manachanallur - Campus)">Route #6 - Manachanallur</option>
                                <option value="Route #7 (Srirangam Bus Stand)">Route #7 - Srirangam</option>
                              </select>
                            </div>
                          ) : (
                            <div className="profile-input-group">
                              <label>Hostel Block & Room No</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. Block B Kaveri Hostel, Room 204"
                                value={regHostelRoom}
                                onChange={(e) => setRegHostelRoom(e.target.value)}
                              />
                            </div>
                          )}
                        </>
                      )}

                      {/* --- Dynamic Fields: FACULTY --- */}
                      {authRole === 'faculty' && (
                        <>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            <div className="profile-input-group">
                              <label>Staff Employee ID</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. KRCE-FAC-CSE-112"
                                value={regStaffId}
                                onChange={(e) => setRegStaffId(e.target.value)}
                              />
                            </div>
                            <div className="profile-input-group">
                              <label>Designation</label>
                              <select
                                className="profile-input-field"
                                value={regFacultyDesignation}
                                onChange={(e) => setRegFacultyDesignation(e.target.value)}
                              >
                                <option value="Professor & Head">Professor & Head (HOD)</option>
                                <option value="Professor">Professor</option>
                                <option value="Associate Professor">Associate Professor</option>
                                <option value="Assistant Professor">Assistant Professor</option>
                                <option value="Adjunct Faculty">Adjunct Faculty</option>
                              </select>
                            </div>
                          </div>

                          <div className="profile-input-group">
                            <label>Department</label>
                            <select
                              className="profile-input-field"
                              value={regDepartment}
                              onChange={(e) => setRegDepartment(e.target.value)}
                            >
                              <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                              <option value="Artificial Intelligence & Data Science">AI & Data Science (AI&DS)</option>
                              <option value="Information Technology">Information Technology (IT)</option>
                              <option value="Electronics & Communication Engg">Electronics & Communication (ECE)</option>
                              <option value="Electrical & Electronics Engg">Electrical & Electronics (EEE)</option>
                              <option value="Mechanical Engineering">Mechanical Engineering</option>
                              <option value="Management Studies">MBA Department</option>
                            </select>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            <div className="profile-input-group">
                              <label>Qualifications</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. Ph.D., M.E. (CSE)"
                                value={regQualification}
                                onChange={(e) => setRegQualification(e.target.value)}
                              />
                            </div>
                            <div className="profile-input-group">
                              <label>Specialization</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. AI & Cloud"
                                value={regSpecialization}
                                onChange={(e) => setRegSpecialization(e.target.value)}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            <div className="profile-input-group">
                              <label>Cabin Location</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. Tech Park 3, Room 204"
                                value={regCabin}
                                onChange={(e) => setRegCabin(e.target.value)}
                              />
                            </div>
                            <div className="profile-input-group">
                              <label>Intercom Ext.</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. Ext. 412"
                                value={regIntercom}
                                onChange={(e) => setRegIntercom(e.target.value)}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- Dynamic Fields: STAFF --- */}
                      {authRole === 'staff' && (
                        <>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            <div className="profile-input-group">
                              <label>Staff ID</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. KRCE-STF-028"
                                value={regStaffId}
                                onChange={(e) => setRegStaffId(e.target.value)}
                              />
                            </div>
                            <div className="profile-input-group">
                              <label>Office Wing / Division</label>
                              <select
                                className="profile-input-field"
                                value={regStaffWing}
                                onChange={(e) => setRegStaffWing(e.target.value)}
                              >
                                <option value="Controller of Examinations (COE Office)">COE Office</option>
                                <option value="Main Administrative Office">Administrative Office</option>
                                <option value="Central Library & Knowledge Hub">Central Library</option>
                                <option value="Campus Transport & Logistics">Transport Division</option>
                                <option value="Training & Corporate Relations">Placement Cell</option>
                                <option value="Physical Education & Sports">Sports Division</option>
                              </select>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            <div className="profile-input-group">
                              <label>Designation / Role</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. Office Superintendent"
                                value={regStaffDesignation}
                                onChange={(e) => setRegStaffDesignation(e.target.value)}
                              />
                            </div>
                            <div className="profile-input-group">
                              <label>Desk / Counter</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. Ground Floor, Counter 2"
                                value={regDeskLocation}
                                onChange={(e) => setRegDeskLocation(e.target.value)}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            <div className="profile-input-group">
                              <label>Duty Shift</label>
                              <select
                                className="profile-input-field"
                                value={regDutyShift}
                                onChange={(e) => setRegDutyShift(e.target.value)}
                              >
                                <option value="General Shift (08:30 AM - 05:00 PM)">General (8:30 AM - 5:00 PM)</option>
                                <option value="Morning Shift (07:00 AM - 03:00 PM)">Morning (7:00 AM - 3:00 PM)</option>
                                <option value="Evening Shift (01:00 PM - 09:00 PM)">Evening (1:00 PM - 9:00 PM)</option>
                              </select>
                            </div>
                            <div className="profile-input-group">
                              <label>Intercom Ext.</label>
                              <input
                                className="profile-input-field"
                                placeholder="e.g. Ext. 104"
                                value={regExtension}
                                onChange={(e) => setRegExtension(e.target.value)}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="profile-input-group">
                        <label>Emergency Contact Person & Phone</label>
                        <input
                          className="profile-input-field"
                          placeholder="e.g. Parent / Spouse - +91 94431 00000"
                          value={regEmergency}
                          onChange={(e) => setRegEmergency(e.target.value)}
                        />
                      </div>

                      <button type="submit" className="profile-submit-btn">
                        <UserPlus size={16} />
                        <span>Create Official {authRole.toUpperCase()} Profile</span>
                      </button>

                      <div style={{ textAlign: 'center', marginTop: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setAuthMode('login')}
                          style={{
                            background: 'transparent',
                            border: 0,
                            color: '#206b85',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Already have a registered account? Sign In here
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating AI Bot Pill (Omnipresent) */}
        <button className="floating-bot-pill" onClick={() => setBotOpen(true)}>
          <div className="bot-avatar-glow">
            <Bot size={16} />
          </div>
          <span>Campus AI</span>
        </button>

        {/* Slide-out Mobile Navigation Drawer */}
        {drawerOpen && (
          <div className="mobile-drawer-scrim" onClick={() => setDrawerOpen(false)}>
            <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="drawer-header">
                <div className="drawer-header-top">
                  <div className="drawer-logo-wrap">
                    <img src={KRCE_LOGO} alt="KRCE" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                    <div>
                      <strong style={{ fontSize: '15px' }}>Campusmate</strong>
                      <small style={{ fontSize: '9px', display: 'block', color: '#a6d7e2' }}>KRCE CAMPUS PORTAL</small>
                    </div>
                  </div>
                  <button
                    style={{ background: 'transparent', border: 0, color: '#fff', cursor: 'pointer' }}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                {currentUser ? (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.14)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#1d536b',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 800,
                        fontSize: '14px',
                        flexShrink: 0,
                      }}
                    >
                      {currentUser.role === 'student' ? '🎓' : currentUser.role === 'faculty' ? '👨‍🏫' : '👔'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.fullName}
                      </div>
                      <div style={{ fontSize: '10px', color: '#aae1ee', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>{currentUser.role}</span>
                        <span>&bull;</span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '10.5px', color: '#c7e6ee', lineHeight: '1.4' }}>
                    K. Ramakrishnan College of Engineering • Samayapuram, Trichy
                  </div>
                )}
              </div>

              <div className="drawer-body">
                <div className="drawer-group-label">WORKSPACE</div>
                <button
                  className={`drawer-item ${currentScreen === 'home' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('home');
                    setDrawerOpen(false);
                  }}
                >
                  <Compass size={17} />
                  <span>Overview</span>
                </button>
                <button
                  className={`drawer-item ${currentScreen === 'search' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('search');
                    setDrawerOpen(false);
                  }}
                >
                  <Search size={17} />
                  <span>Search Campus</span>
                </button>

                {/* CAMPUS TAXONOMY SECTION (ALL SEPARATE PAGES) */}
                <div className="drawer-group-label">CAMPUS TAXONOMY</div>
                <button
                  className={`drawer-item ${currentScreen === 'departments' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('departments');
                    setDrawerOpen(false);
                  }}
                >
                  <Building2 size={17} />
                  <span>Departments & Labs</span>
                </button>
                <button
                  className={`drawer-item ${currentScreen === 'library' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('library');
                    setDrawerOpen(false);
                  }}
                >
                  <BookOpen size={17} />
                  <span>Central Library</span>
                </button>
                <button
                  className={`drawer-item ${currentScreen === 'procedures' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('procedures');
                    setDrawerOpen(false);
                  }}
                >
                  <ClipboardList size={17} />
                  <span>Administrative Procedures</span>
                </button>
                <button
                  className={`drawer-item ${currentScreen === 'transport' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('transport');
                    setDrawerOpen(false);
                  }}
                >
                  <Bus size={17} />
                  <span>Bus Routes</span>
                </button>
                <button
                  className={`drawer-item ${currentScreen === 'contacts' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('contacts');
                    setDrawerOpen(false);
                  }}
                >
                  <Phone size={17} />
                  <span>Contacts & Directory</span>
                </button>
                <button
                  className={`drawer-item ${currentScreen === 'notices' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('notices');
                    setDrawerOpen(false);
                  }}
                >
                  <Bell size={17} />
                  <span>Circulars & Notices</span>
                </button>

                <div className="drawer-group-label">CAMPUS IDENTITY & PROFILE</div>
                <button
                  className={`drawer-item ${currentScreen === 'profile' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('profile');
                    setIsAuthViewActive(false);
                    setDrawerOpen(false);
                  }}
                >
                  {currentUser?.role === 'faculty' ? (
                    <Briefcase size={17} />
                  ) : currentUser?.role === 'staff' ? (
                    <ShieldCheck size={17} />
                  ) : (
                    <GraduationCap size={17} />
                  )}
                  <span>
                    {currentUser
                      ? `My ${currentUser.role.toUpperCase()} Profile & ID`
                      : 'Sign In / Register Profile'}
                  </span>
                </button>
                <button
                  className={`drawer-item ${currentScreen === 'saved' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentScreen('saved');
                    setDrawerOpen(false);
                  }}
                >
                  <Bookmark size={17} />
                  <span>Saved Bookmarks ({savedIds.length})</span>
                </button>

                {currentUser ? (
                  <button
                    className="drawer-item"
                    style={{ color: '#e11d48', marginTop: '6px' }}
                    onClick={() => {
                      handleSignOut();
                      setCurrentScreen('profile');
                      setDrawerOpen(false);
                    }}
                  >
                    <LogOut size={17} />
                    <span>Sign Out ({currentUser.role})</span>
                  </button>
                ) : (
                  <button
                    className="drawer-item"
                    style={{ color: '#206b85', marginTop: '6px' }}
                    onClick={() => {
                      setIsAuthViewActive(true);
                      setAuthMode('login');
                      setCurrentScreen('profile');
                      setDrawerOpen(false);
                    }}
                  >
                    <LogIn size={17} />
                    <span>Sign In or Register</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Floating AI Bot Slide-up Sheet */}
        {botOpen && (
          <div className="bot-sheet-overlay" onClick={() => setBotOpen(false)}>
            <div className="bot-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="bot-sheet-header">
                <div className="bot-sheet-title">
                  <div className="bot-avatar-glow" style={{ width: '32px', height: '32px' }}>
                    <Bot size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#193744', display: 'block' }}>
                      KRCE Campus Assistant
                    </strong>
                    <small style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                      Online • Verified Campus Knowledge
                    </small>
                  </div>
                </div>
                <button
                  style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
                  onClick={() => setBotOpen(false)}
                >
                  <X size={20} color="#7a929d" />
                </button>
              </div>

              {/* Bot Message History */}
              <div className="bot-sheet-messages">
                {botMessages.map((m, idx) => (
                  <div key={idx} className={`bot-msg ${m.role}`}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>

                    {m.contacts && m.contacts.length > 0 && (
                      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {m.contacts.map((c, cidx) => (
                          <div
                            key={cidx}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #dbe6ec',
                              borderRadius: '8px',
                              padding: '8px 10px',
                            }}
                          >
                            <div style={{ fontWeight: 700, fontSize: '11px', color: '#193744' }}>{c.name}</div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                              <a
                                href={`tel:${c.phone}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  background: '#eaf5f8',
                                  color: '#1d6079',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                }}
                              >
                                <Phone size={11} />
                                <span>{c.phone}</span>
                              </a>
                              <a
                                href={`mailto:${c.email}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  background: '#f1f5f7',
                                  color: '#466472',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                }}
                              >
                                <Mail size={11} />
                                <span>Email</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Prompt Chips */}
              <div className="bot-suggestion-chips">
                <button className="bot-chip" onClick={() => handleSendBot('Hello')}>
                  👋 Hello
                </button>
                <button className="bot-chip" onClick={() => handleSendBot('Admissions helpline and TNEA code')}>
                  📞 Admissions (Code: 3814)
                </button>
                <button className="bot-chip" onClick={() => handleSendBot('Central library timings and facilities')}>
                  📚 Library Hours
                </button>
                <button className="bot-chip" onClick={() => handleSendBot('Exam revaluation fees and procedure')}>
                  📝 Exam Revaluation
                </button>
                <button className="bot-chip" onClick={() => handleSendBot('Campus bus transport routes')}>
                  🚌 Bus Routes
                </button>
                <button className="bot-chip" onClick={() => handleSendBot('Hostel warden contact and mess')}>
                  🏢 Hostel Rules
                </button>
              </div>

              {/* Chat Input */}
              <form
                className="bot-input-bar"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendBot();
                }}
              >
                <input
                  placeholder="Ask anything (e.g. Hi, admissions, library, bus)..."
                  value={botInput}
                  onChange={(e) => setBotInput(e.target.value)}
                />
                <button type="submit">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Lightbox High-Resolution Full-Screen Modal */}
        {lightboxImage && (
          <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
              <X size={20} />
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={lightboxImage.url} alt={lightboxImage.title} className="lightbox-img" />
              <div className="lightbox-caption">{lightboxImage.title}</div>
            </div>
          </div>
        )}

        {/* Edit Profile Information Slide-up Modal */}
        {isEditModalOpen && (
          <div className="modal-scrim" onClick={() => setIsEditModalOpen(false)}>
            <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <strong style={{ fontSize: '15px', color: '#193744' }}>Edit Profile Information</strong>
                  <small style={{ fontSize: '11px', color: '#688491', display: 'block' }}>
                    Update your verified campus contact and transit records
                  </small>
                </div>
                <button
                  style={{ background: 'transparent', border: 0, cursor: 'pointer', color: '#526e7c' }}
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit}>
                <div className="profile-input-group">
                  <label>Official Phone Number</label>
                  <input
                    className="profile-input-field"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="profile-input-group">
                  <label>Official Email Address</label>
                  <input
                    type="email"
                    className="profile-input-field"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="profile-input-group">
                  <label>Blood Group</label>
                  <select
                    className="profile-input-field"
                    value={editForm.bloodGroup}
                    onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                  >
                    <option value="O+ve">O+ve</option>
                    <option value="A+ve">A+ve</option>
                    <option value="B+ve">B+ve</option>
                    <option value="AB+ve">AB+ve</option>
                    <option value="O-ve">O-ve</option>
                    <option value="A-ve">A-ve</option>
                    <option value="B-ve">B-ve</option>
                    <option value="AB-ve">AB-ve</option>
                  </select>
                </div>

                <div className="profile-input-group">
                  <label>
                    {currentUser?.role === 'student'
                      ? 'Hostel Room or Bus Stop Route'
                      : currentUser?.role === 'faculty'
                      ? 'Cabin / Research Lab Location'
                      : 'Desk / Counter Station'}
                  </label>
                  <input
                    className="profile-input-field"
                    value={editForm.locationDetail}
                    onChange={(e) => setEditForm({ ...editForm, locationDetail: e.target.value })}
                  />
                </div>

                <div className="profile-input-group">
                  <label>Emergency Contact Person & Phone</label>
                  <input
                    className="profile-input-field"
                    value={editForm.emergencyContact}
                    onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                  />
                </div>

                <button type="submit" className="profile-submit-btn">
                  <Check size={16} />
                  <span>Save Profile Updates</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
