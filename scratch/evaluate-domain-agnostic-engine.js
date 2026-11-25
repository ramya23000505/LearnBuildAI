/**
 * DOMAIN-AGNOSTIC REQUIREMENT INTELLIGENCE & ACCURACY EVALUATION BENCHMARK
 * Evaluates LearnBuild AI's global intelligence engine across 10 diverse domains.
 */

import { generateFullIntelligenceModel } from '../src/services/intelligenceEngine.js';

const BENCHMARK_SUITE = [
  {
    domain: 'Healthcare',
    title: 'Smart Healthcare Clinic & Patient Triage Platform',
    prompt: 'Develop an intelligent healthcare clinic web portal where patients can register, book doctor appointments, and upload medical lab reports. Doctors can review patient records, conduct preliminary risk assessments, and prescribe medications. The platform requires secure role-based access for patients and doctors, SMS/email appointment confirmations, and automated symptom/risk categorization before doctor consultation.',
    expectedCapabilities: ['responsive_web_ui', 'restful_api_services', 'relational_acid_persistence', 'secure_token_auth', 'secure_file_storage', 'tabular_supervised_ml', 'notification_delivery', 'containerized_deployment'],
    forbiddenCapabilities: ['computer_vision_inference', 'smart_contract_consensus', 'p2p_realtime_media', 'telemetry_iot_ingestion']
  },
  {
    domain: 'E-Commerce',
    title: 'Multi-Vendor Artisan Marketplace',
    prompt: 'Build an online multi-vendor e-commerce platform where artisans can list handmade products and customers can browse catalogs, add items to cart, and checkout with credit card payments via Stripe. Customers receive email order receipts and notifications when orders ship. System needs relational order tracking and containerized deployment.',
    expectedCapabilities: ['responsive_web_ui', 'restful_api_services', 'relational_acid_persistence', 'payment_processing_gateway', 'notification_delivery', 'containerized_deployment'],
    forbiddenCapabilities: ['computer_vision_inference', 'smart_contract_consensus', 'robot_hardware_control']
  },
  {
    domain: 'IoT / Agriculture',
    title: 'Autonomous Greenhouse Climate Controller',
    prompt: 'Create an automated greenhouse sensor telemetry platform where IoT sensor nodes transmit soil moisture, temperature, and humidity readings over MQTT. An edge service persists time-series telemetry into a database, flags drought threshold alerts via SMS notifications, and provides a web dashboard for farmers.',
    expectedCapabilities: ['responsive_web_ui', 'telemetry_iot_ingestion', 'relational_acid_persistence', 'notification_delivery', 'containerized_deployment'],
    forbiddenCapabilities: ['smart_contract_consensus', 'payment_processing_gateway']
  },
  {
    domain: 'Cybersecurity',
    title: 'Real-Time Network Threat & Packet Inspection Console',
    prompt: 'Build a cybersecurity packet capture and intrusion detection system. The tool inspects network packets in real-time, extracts IP/port traffic logs, matches malicious signatures against threat intelligence feeds, triggers security alerts, and visualizes packet trends in a web console.',
    expectedCapabilities: ['network_packet_inspection', 'high_performance_microservice', 'responsive_web_ui', 'containerized_deployment'],
    forbiddenCapabilities: ['payment_processing_gateway', 'smart_contract_consensus']
  },
  {
    domain: 'Computer Vision',
    title: 'Industrial Construction Site Helmet & PPE Detector',
    prompt: 'Develop an automated computer vision safety monitoring application. The system connects to site RTSP cameras, analyzes video streams in real-time to detect worker hardhats and high-visibility safety vests using bounding box object detection, logs safety violations to a database, and alerts supervisors.',
    expectedCapabilities: ['computer_vision_inference', 'responsive_web_ui', 'relational_acid_persistence', 'containerized_deployment'],
    forbiddenCapabilities: ['smart_contract_consensus', 'payment_processing_gateway']
  },
  {
    domain: 'WebRTC / Real-Time Collaboration',
    title: 'Low-Latency Virtual Classroom Video Collaboration Tool',
    prompt: 'Create a browser-based interactive classroom web application supporting peer-to-peer audio and video calling between students and teachers, screen sharing, and real-time chat with session persistence.',
    expectedCapabilities: ['p2p_realtime_media', 'realtime_event_streaming', 'responsive_web_ui', 'relational_acid_persistence', 'containerized_deployment'],
    forbiddenCapabilities: ['smart_contract_consensus', 'telemetry_iot_ingestion']
  },
  {
    domain: 'FinTech / Blockchain',
    title: 'Decentralized Escrow & Milestone Payment dApp',
    prompt: 'Develop a decentralized freelance escrow application using smart contracts on Ethereum where funds are locked until client and freelancer sign off on milestone delivery using cryptographic wallet signatures.',
    expectedCapabilities: ['smart_contract_consensus', 'responsive_web_ui', 'containerized_deployment'],
    forbiddenCapabilities: ['telemetry_iot_ingestion', 'computer_vision_inference']
  },
  {
    domain: 'Machine Learning / Data Science',
    title: 'Banking Customer Credit Risk & Default Predictor',
    prompt: 'Build a predictive machine learning pipeline that ingests historical customer financial data, handles feature engineering, trains classification models (Random Forest, Logistic Regression) to predict loan default probability, and exposes REST endpoints for credit scoring.',
    expectedCapabilities: ['tabular_supervised_ml', 'restful_api_services', 'responsive_web_ui', 'containerized_deployment'],
    forbiddenCapabilities: ['smart_contract_consensus', 'p2p_realtime_media']
  },
  {
    domain: 'Education / EdTech',
    title: 'Adaptive Learning Quiz & Student Mastery Tracker',
    prompt: 'Create an online adaptive learning platform where students answer technical quizzes, receive personalized skill gap diagnostics, and view interactive curriculum roadmaps. Instructors manage course modules and view progress dashboards.',
    expectedCapabilities: ['responsive_web_ui', 'restful_api_services', 'relational_acid_persistence', 'secure_token_auth', 'containerized_deployment'],
    forbiddenCapabilities: ['smart_contract_consensus', 'computer_vision_inference']
  },
  {
    domain: 'Generative AI / Enterprise',
    title: 'Enterprise Technical Documentation RAG Assistant',
    prompt: 'Implement an intelligent RAG (Retrieval-Augmented Generation) assistant that parses internal enterprise PDF manuals, stores embeddings in a vector database, performs semantic similarity search, and answers employee queries with cited sources.',
    expectedCapabilities: ['rag_semantic_search', 'responsive_web_ui', 'secure_file_storage', 'containerized_deployment'],
    forbiddenCapabilities: ['smart_contract_consensus', 'telemetry_iot_ingestion']
  }
];

function runBenchmark() {
  console.log('='.repeat(80));
  console.log('🚀 LEARNBUILD AI — GLOBAL DOMAIN-AGNOSTIC EVALUATION BENCHMARK');
  console.log('='.repeat(80));
  console.log(`Evaluating ${BENCHMARK_SUITE.length} distinct technical domains...\n`);

  let totalPrecisionSum = 0;
  let totalRecallSum = 0;
  let totalF1Sum = 0;
  let totalForbiddenViolations = 0;
  let totalTraceabilityChecked = 0;
  let totalTraceabilityValid = 0;
  let totalArchLayersChecked = 0;
  let totalArchLayersConsistent = 0;

  const results = [];

  BENCHMARK_SUITE.forEach((test, idx) => {
    const startTime = Date.now();
    const model = generateFullIntelligenceModel(test.prompt, null, 'academic');
    const elapsed = Date.now() - startTime;

    // Check Capabilities
    const actualCapIds = model.capabilities.map(c => c.id);
    const expectedSet = new Set(test.expectedCapabilities);
    const forbiddenSet = new Set(test.forbiddenCapabilities);

    const truePositives = actualCapIds.filter(id => expectedSet.has(id)).length;
    const falsePositives = actualCapIds.filter(id => !expectedSet.has(id)).length;
    const falseNegatives = test.expectedCapabilities.filter(id => !actualCapIds.includes(id)).length;

    const precision = truePositives / (truePositives + falsePositives || 1);
    const recall = truePositives / (truePositives + falseNegatives || 1);
    const f1 = (2 * precision * recall) / (precision + recall || 1);

    // Check Anti-Hallucination & Forbidden Techs
    const violations = actualCapIds.filter(id => forbiddenSet.has(id));
    totalForbiddenViolations += violations.length;

    // Check Traceability Chain (Every tech must trace back to requirement)
    let techTraceValid = true;
    model.technologyDecisions.forEach(tech => {
      totalTraceabilityChecked++;
      if (tech.evidence && tech.evidence.length > 0 && tech.supported_capabilities?.length > 0) {
        totalTraceabilityValid++;
      } else {
        techTraceValid = false;
      }
    });

    // Check Dynamic Architecture Consistency
    if (model.architectureLayers && model.architectureLayers.length >= 3) {
      totalArchLayersConsistent++;
    }
    totalArchLayersChecked++;

    totalPrecisionSum += precision;
    totalRecallSum += recall;
    totalF1Sum += f1;

    results.push({
      domain: test.domain,
      requirementsCount: (model.semantics.requirements.functional || []).length,
      entitiesCount: (model.semantics.entities || []).length,
      capabilitiesCount: actualCapIds.length,
      technologiesCount: model.technologies.length,
      precision: (precision * 100).toFixed(1),
      recall: (recall * 100).toFixed(1),
      f1: (f1 * 100).toFixed(1),
      violations: violations.length,
      elapsedMs: elapsed,
      tableRows: model.layeredBlueprintTable.length
    });
  });

  // Print Summary Table
  console.log('| Domain | Reqs | Entities | Caps | Techs | Table Rows | Precision | Recall | F1 Score | Anti-Hallucination | Time |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');
  results.forEach(r => {
    console.log(`| ${r.domain.padEnd(16)} | ${String(r.requirementsCount).padStart(4)} | ${String(r.entitiesCount).padStart(8)} | ${String(r.capabilitiesCount).padStart(4)} | ${String(r.technologiesCount).padStart(5)} | ${String(r.tableRows).padStart(10)} | ${r.precision.padStart(8)}% | ${r.recall.padStart(5)}% | ${r.f1.padStart(7)}% | ${r.violations === 0 ? '✅ 0 Hallucinations' : '❌ ' + r.violations + ' Hallucinations'} | ${r.elapsedMs}ms |`);
  });

  const N = BENCHMARK_SUITE.length;
  const avgPrecision = ((totalPrecisionSum / N) * 100).toFixed(2);
  const avgRecall = ((totalRecallSum / N) * 100).toFixed(2);
  const avgF1 = ((totalF1Sum / N) * 100).toFixed(2);
  const unnecessaryTechRate = (totalForbiddenViolations / N).toFixed(2);
  const traceabilityScore = ((totalTraceabilityValid / totalTraceabilityChecked) * 100).toFixed(1);
  const archConsistency = ((totalArchLayersConsistent / totalArchLayersChecked) * 100).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log('📊 EMPIRICAL EVALUATION METRICS REPORT');
  console.log('='.repeat(80));
  console.log(`• Mean Precision:             ${avgPrecision}%`);
  console.log(`• Mean Recall:                ${avgRecall}%`);
  console.log(`• Mean F1 Score:              ${avgF1}%`);
  console.log(`• Unnecessary Technology Rate: ${unnecessaryTechRate}% (Target: 0.0%)`);
  console.log(`• Traceability Compliance:    ${traceabilityScore}%`);
  console.log(`• Architecture Consistency:   ${archConsistency}%`);
  console.log('='.repeat(80));

  // Also print the exact Healthcare Blueprint Table for verification
  console.log('\n🩺 HEALTHCARE CLINIC LAYERED BLUEPRINT TABLE VERIFICATION:');
  const hcModel = generateFullIntelligenceModel(BENCHMARK_SUITE[0].prompt, 'healthcare', 'academic');
  console.log('| Layer | Technology | Necessity | Why |');
  console.log('|---|---|---|---|');
  hcModel.layeredBlueprintTable.forEach(row => {
    console.log(`| ${row.layer} | **${row.technology}** | ${row.necessity} | ${row.why} |`);
  });
  console.log('\n');
}

runBenchmark();
