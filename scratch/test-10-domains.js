// Automated 10-Domain Regression & Accuracy Test Runner
import { generateFullIntelligenceModel } from '../src/services/intelligenceEngine.js';

const TEST_CASES = [
  {
    domain: 'Healthcare (Telemedicine & AI Symptom Assessment)',
    prompt: 'Patients register, book doctor appointments, upload medical reports, doctors view patient info, and AI performs preliminary symptom assessment and triage.',
    domainHint: 'healthcare',
    forbiddenTechs: ['YOLO', 'OpenCV', 'WebRTC', 'ChromaDB / FAISS'],
    requiredCaps: ['relational_acid_persistence', 'file_upload_storage', 'ai_symptom_triage'],
    checkDockerNotRequired: true
  },
  {
    domain: 'Cybersecurity (Intrusion Detection & Packet Analysis)',
    prompt: 'Network security engineers capture live network packets, analyze protocol headers, and flag intrusion attack signatures in real-time.',
    domainHint: 'security',
    expectedTechKeywords: ['Snort', 'Scapy'],
    requiredCaps: ['network_packet_inspection', 'intrusion_detection']
  },
  {
    domain: 'WebRTC (Peer-to-Peer Video Call & Screen Sharing)',
    prompt: 'Users create meeting rooms, exchange signaling metadata, and conduct direct peer-to-peer audio/video streaming and screen sharing.',
    domainHint: 'webrtc',
    expectedTechKeywords: ['WebRTC', 'Socket.io'],
    requiredCaps: ['realtime_video_audio', 'realtime_messaging']
  },
  {
    domain: 'AI / RAG (Document Search & Q&A Assistant)',
    prompt: 'Users upload legal PDF documents, system splits text into embeddings, stores vectors in a database, and answers user questions using RAG.',
    domainHint: 'rag',
    expectedTechKeywords: ['FAISS', 'LangChain'],
    requiredCaps: ['rag_semantic_search', 'vector_indexing']
  },
  {
    domain: 'Computer Vision (Industrial PPE Helmet Detection)',
    prompt: 'A factory camera captures live video streams, extracts frames, and detects whether workers are wearing safety helmets and reflective vests using object detection.',
    domainHint: 'cv',
    expectedTechKeywords: ['OpenCV', 'YOLO'],
    requiredCaps: ['computer_vision_inference']
  },
  {
    domain: 'E-Commerce (Storefront, Product Catalog & Checkout)',
    prompt: 'Shoppers browse products, manage shopping cart items, process credit card payments via Stripe checkout, and track shipment status.',
    domainHint: 'ecommerce',
    expectedTechKeywords: ['Stripe', 'PostgreSQL'],
    requiredCaps: ['ecommerce_payment_processing']
  },
  {
    domain: 'IoT (Smart Agriculture Sensor Telemetry)',
    prompt: 'Soil moisture and temperature sensors transmit low-bandwidth telemetry packets over MQTT to an edge broker and visual dashboard.',
    domainHint: 'iot',
    expectedTechKeywords: ['MQTT'],
    requiredCaps: ['iot_telemetry_pubsub']
  },
  {
    domain: 'Machine Learning (Customer Churn Prediction)',
    prompt: 'Data scientists train a machine learning classification model on historical telecom customer records to predict churn probability.',
    domainHint: 'ml',
    expectedTechKeywords: ['Scikit-Learn', 'Python'],
    requiredCaps: ['machine_learning_tabular']
  },
  {
    domain: 'Mobile Application (Cross-Platform Habit Tracker)',
    prompt: 'Users track daily habits and log progress on an iOS and Android mobile app with offline local storage and push notifications.',
    domainHint: 'mobile',
    expectedAnyOfTechKeywords: ['Flutter', 'React Native'],
    requiredCaps: ['mobile_native_client']
  },
  {
    domain: 'Academic Software Engineering (Simple Student Records CRUD)',
    prompt: 'Faculty administrators manage student enrollments, record course grades, and export semester grade reports.',
    domainHint: 'swe',
    expectedTechKeywords: ['PostgreSQL', 'FastAPI', 'React'],
    forbiddenTechs: ['YOLO', 'OpenCV', 'WebRTC', 'MQTT', 'Snort', 'LangChain']
  }
];

console.log('='.repeat(80));
console.log('🧪 LEARNBUILD AI — 10-DOMAIN REGRESSION & VALIDATION TEST SUITE');
console.log('='.repeat(80));

let allPassed = true;
let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    allPassed = false;
    console.log(`  ❌ FAIL: ${message}`);
  }
}

TEST_CASES.forEach((tc, index) => {
  console.log(`\n[Test Case ${index + 1}/10]: ${tc.domain}`);
  const model = generateFullIntelligenceModel(tc.prompt, tc.domainHint, 'academic');
  
  const techNames = model.technologyDecisions.map(t => t.name);
  const activeTechs = model.technologyDecisions.filter(t => t.technology_necessity === 'REQUIRED' || t.technology_necessity === 'RECOMMENDED');
  const activeNames = activeTechs.map(t => t.name);

  // 1. Minimum Stack Size Check (bounded between 4 and 8)
  assert(activeTechs.length >= 4 && activeTechs.length <= 8, `Stack bounded to minimum sufficient set (actual: ${activeTechs.length} technologies)`);

  // 2. Traceability: Every tech must have evidence and supported capabilities
  const untraceableTechs = activeTechs.filter(t => !t.evidence || t.evidence.length === 0 || !t.supported_capabilities || t.supported_capabilities.length === 0);
  assert(untraceableTechs.length === 0, `All active technologies possess grounded evidence and supported capabilities`);

  // 3. No Duplicate Evidence across Stack
  const allEv = [];
  let hasDuplicateEvidence = false;
  activeTechs.forEach(t => {
    (t.evidence || []).forEach(e => {
      if (allEv.includes(e)) hasDuplicateEvidence = true;
      allEv.push(e);
    });
  });
  assert(!hasDuplicateEvidence, `Zero duplicate evidence items across active technologies in stack`);

  // 4. Forbidden Technologies Check (Anti-Hallucination Gate)
  if (tc.forbiddenTechs) {
    tc.forbiddenTechs.forEach(forbidden => {
      const found = activeNames.some(n => n.toLowerCase().includes(forbidden.toLowerCase()));
      assert(!found, `Anti-Hallucination Gate successfully rejected unrelated tech [${forbidden}]`);
    });
  }

  // 5. Expected Technology Keywords Check
  if (tc.expectedTechKeywords) {
    tc.expectedTechKeywords.forEach(expected => {
      const found = activeNames.some(n => n.toLowerCase().includes(expected.toLowerCase()));
      assert(found, `Correctly identified and recommended required domain technology [${expected}]`);
    });
  }

  if (tc.expectedAnyOfTechKeywords) {
    const foundAny = tc.expectedAnyOfTechKeywords.some(expected => activeNames.some(n => n.toLowerCase().includes(expected.toLowerCase())));
    assert(foundAny, `Correctly identified and recommended cross-platform client [${tc.expectedAnyOfTechKeywords.join(' or ')}]`);
  }

  // 6. Capability Necessity vs Technology Necessity Check
  activeTechs.forEach(t => {
    assert(['REQUIRED', 'RECOMMENDED'].includes(t.capability_necessity), `Valid capability_necessity for ${t.name}: ${t.capability_necessity}`);
    assert(['REQUIRED', 'RECOMMENDED', 'OPTIONAL'].includes(t.technology_necessity), `Valid technology_necessity for ${t.name}: ${t.technology_necessity}`);
  });

  // 7. Docker Check: Docker must NOT be forced as REQUIRED unless requested
  if (tc.checkDockerNotRequired) {
    const docker = activeTechs.find(t => t.name.toLowerCase().includes('docker'));
    if (docker) {
      assert(docker.technology_necessity !== 'REQUIRED', `Docker is RECOMMENDED/OPTIONAL, NOT forced as REQUIRED`);
    }
  }

  // 8. Dynamic Architecture Component Necessity Check
  assert(model.architectureLayers.length >= 3 && model.architectureLayers.length <= 5, `Architecture layers dynamically trimmed (layers: ${model.architectureLayers.length})`);
});

console.log('\n' + '='.repeat(80));
console.log(`SUMMARY: ${passedChecks}/${totalChecks} checks passed.`);
if (allPassed) {
  console.log('🎉 ALL 10 DOMAIN REGRESSION TESTS PASSED WITH 100% SUCCESS!');
} else {
  console.log('⚠️ SOME CHECKS FAILED. PLEASE REVIEW LOGS ABOVE.');
}
console.log('='.repeat(80));
