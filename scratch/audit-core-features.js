import http from 'http';
import https from 'https';
import { URL } from 'url';

// Import services and knowledge graphs
import { generateFullIntelligenceModel } from '../src/services/intelligenceEngine.js';
import { generate50CategorizedQuestions, generateDynamicAssessmentQuestions, generateDynamicLearningResources } from '../src/services/aiEngine.js';
import { LEARNING_RESOURCES } from '../src/data/learningResources.js';
import { QUESTION_BANK } from '../src/data/questionBank.js';

const DOMAINS_TO_TEST = [
  {
    id: 'TEST-DOM-01',
    domain: 'Healthcare',
    title: 'Hospital Patient Appointment & Medical Records Management System',
    prompt: 'A secure healthcare management platform for patients and doctors with appointment booking, medical records upload, doctor schedules, and patient triage.',
    domainHint: 'healthcare',
    expectedMustHave: ['PostgreSQL', 'React', 'FastAPI'],
    forbidden: ['OpenCV', 'YOLO', 'WebRTC', 'Solidity', 'MQTT']
  },
  {
    id: 'TEST-DOM-02',
    domain: 'Hospitality / Cafe Page',
    title: 'Cafe Delight Landing & Table Reservation Page',
    prompt: 'I Decide To Create A Cafe Page for showcasing artisanal coffee, breakfast food menu, table reservation booking, customer reviews, and operating hours.',
    domainHint: 'swe',
    expectedMustHave: ['React', 'PostgreSQL'],
    forbidden: ['OpenCV', 'YOLO', 'PyTorch', 'TensorFlow', 'LangChain', 'Solidity', 'WebRTC']
  },
  {
    id: 'TEST-DOM-03',
    domain: 'Cybersecurity',
    title: 'Automated Phishing URL Detection and Threat Intelligence Gateway',
    prompt: 'Automated enterprise security tool to detect malicious URLs, analyze phishing email headers, inspect suspicious domains, and trigger automated quarantine alerts.',
    domainHint: 'cybersecurity',
    expectedMustHave: ['FastAPI', 'PostgreSQL'],
    forbidden: ['OpenCV', 'YOLO', 'React Native', 'Flutter', 'Solidity']
  },
  {
    id: 'TEST-DOM-04',
    domain: 'E-Commerce / Retail',
    title: 'Online Fashion Apparel Store with Shopping Cart and Stripe Checkout',
    prompt: 'Modern e-commerce online store featuring product catalog browsing, size/color variant selection, shopping cart, Stripe payment checkout, and order tracking.',
    domainHint: 'ecommerce',
    expectedMustHave: ['React', 'PostgreSQL'],
    forbidden: ['OpenCV', 'YOLO', 'WebRTC', 'Solidity', 'PyTorch', 'TensorFlow']
  },
  {
    id: 'TEST-DOM-05',
    domain: 'IoT & Smart Agriculture',
    title: 'Smart Greenhouse Soil Moisture & Temperature Monitoring System',
    prompt: 'IoT-enabled greenhouse automation system with ESP32 soil moisture and ambient temperature sensors sending real-time telemetry over MQTT to trigger automated water pumps.',
    domainHint: 'iot',
    expectedMustHave: ['MQTT', 'PostgreSQL'],
    forbidden: ['OpenCV', 'YOLO', 'React Native', 'Solidity']
  },
  {
    id: 'TEST-DOM-06',
    domain: 'Computer Vision',
    title: 'Industrial Manufacturing Defect Detection on Assembly Line',
    prompt: 'Real-time high-speed video camera inspection system using YOLO and OpenCV to detect surface cracks, scratches, and structural defects on automotive parts on a conveyor belt.',
    domainHint: 'cv',
    expectedMustHave: ['OpenCV', 'YOLO'],
    forbidden: ['Solidity', 'MQTT', 'WebRTC']
  },
  {
    id: 'TEST-DOM-07',
    domain: 'Real-Time Communications / WebRTC',
    title: 'Browser Peer-to-Peer Encrypted Video Calling and Whiteboard',
    prompt: 'Low-latency browser video conferencing and collaborative whiteboard application with peer-to-peer WebRTC video/audio streaming, STUN/TURN traversal, and WebSocket signaling.',
    domainHint: 'webrtc',
    expectedMustHave: ['WebRTC', 'WebSocket'],
    forbidden: ['OpenCV', 'YOLO', 'Solidity', 'PyTorch']
  },
  {
    id: 'TEST-DOM-08',
    domain: 'Machine Learning / Data Science',
    title: 'Customer Churn Prediction and Risk Scoring Dashboard for SaaS',
    prompt: 'Predictive analytics pipeline using scikit-learn and pandas to analyze subscriber usage logs, compute customer churn probability scores, and display risk insights on a dashboard.',
    domainHint: 'ml',
    expectedMustHave: ['scikit-learn', 'PostgreSQL'],
    forbidden: ['OpenCV', 'YOLO', 'WebRTC', 'Solidity']
  },
  {
    id: 'TEST-DOM-09',
    domain: 'Blockchain / Web3',
    title: 'Decentralized Crowdfunding Platform with Smart Contracts',
    prompt: 'Ethereum-based decentralized crowdfunding platform using Solidity smart contracts for transparent escrow, milestone-based fund releases, and Web3 wallet connections.',
    domainHint: 'blockchain',
    expectedMustHave: ['Solidity', 'Ethereum'],
    forbidden: ['OpenCV', 'YOLO', 'WebRTC', 'MQTT']
  },
  {
    id: 'TEST-DOM-10',
    domain: 'EdTech / Learning Management',
    title: 'Adaptive Student Learning Management System with Quiz Grading',
    prompt: 'Interactive student learning portal with course video modules, downloadable lecture notes, automated multiple-choice quiz assessments, and student progress tracking.',
    domainHint: 'education',
    expectedMustHave: ['React', 'PostgreSQL'],
    forbidden: ['OpenCV', 'YOLO', 'Solidity', 'MQTT']
  }
];

// Helper to probe live URL
function checkUrl(targetUrl, timeoutMs = 6000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(
        targetUrl,
        {
          method: 'HEAD',
          timeout: timeoutMs,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        },
        (res) => {
          resolve({ url: targetUrl, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
        }
      );
      req.on('timeout', () => {
        req.destroy();
        resolve({ url: targetUrl, status: 408, error: 'TIMEOUT', ok: false });
      });
      req.on('error', (err) => {
        resolve({ url: targetUrl, status: 0, error: err.message, ok: false });
      });
      req.end();
    } catch (e) {
      resolve({ url: targetUrl, status: 0, error: e.message, ok: false });
    }
  });
}

async function runAudit() {
  console.log('================================================================');
  console.log('LEARNBUILD AI — AUTOMATED CORE QUALITY AUDIT (10 DOMAINS)');
  console.log('================================================================\n');

  const auditResults = {
    techStack: [],
    assessments: [],
    resources: [],
    consistency: []
  };

  // -------------------------------------------------------------------------
  // SECTION A: TECH STACK AUDIT
  // -------------------------------------------------------------------------
  console.log('>>> [A] AUDITING TECHNOLOGY STACK RECOMMENDATION ACROSS 10 DOMAINS...');
  for (const testCase of DOMAINS_TO_TEST) {
    const model = generateFullIntelligenceModel(testCase.prompt, testCase.domainHint, 'academic');
    const primaryStack = model.technologyDecisions || [];
    const blueprint = model.layeredBlueprintTable || [];

    const techNames = primaryStack.map(t => t.name);
    const blueprintTechs = blueprint.map(b => b.technology);
    const allEvalTechs = [...new Set([...techNames, ...blueprintTechs])];

    const hallucinatedForbidden = testCase.forbidden.filter(f => allEvalTechs.some(t => t.toLowerCase().includes(f.toLowerCase())));
    const missingMustHave = testCase.expectedMustHave.filter(m => !allEvalTechs.some(t => t.toLowerCase().includes(m.toLowerCase())));

    // Check evidence traceability
    const unevidencedTechs = primaryStack.filter(t => {
      const ev = Array.isArray(t.evidence) ? t.evidence.join(' ') : String(t.evidence || '');
      const why = String(t.why_selected || t.why || '');
      return ev.trim().length === 0 && why.trim().length === 0;
    });

    const isPass = hallucinatedForbidden.length === 0 && missingMustHave.length === 0 && unevidencedTechs.length === 0;

    auditResults.techStack.push({
      id: testCase.id,
      domain: testCase.domain,
      title: testCase.title,
      pass: isPass,
      techCount: primaryStack.length,
      technologies: techNames,
      missingMustHave,
      hallucinatedForbidden,
      unevidencedTechs: unevidencedTechs.map(t => t.name)
    });

    console.log(`  [${isPass ? 'PASS' : 'FAIL'}] ${testCase.id} (${testCase.domain}): ${primaryStack.length} techs recommended.`);
    if (!isPass) {
      if (hallucinatedForbidden.length > 0) console.log(`     HALLUCINATED: ${hallucinatedForbidden.join(', ')}`);
      if (missingMustHave.length > 0) console.log(`     MISSING: ${missingMustHave.join(', ')}`);
      if (unevidencedTechs.length > 0) console.log(`     NO EVIDENCE: ${unevidencedTechs.map(t => t.name).join(', ')}`);
    }
  }

  // -------------------------------------------------------------------------
  // SECTION B: QUESTION & ASSESSMENT AUDIT
  // -------------------------------------------------------------------------
  console.log('\n>>> [B] AUDITING QUESTION GENERATION & ASSESSMENTS ACROSS 10 DOMAINS...');
  for (const testCase of DOMAINS_TO_TEST) {
    const model = generateFullIntelligenceModel(testCase.prompt, testCase.domainHint, 'academic');
    const primaryStack = model.technologyDecisions || [];
    const blueprint = model.layeredBlueprintTable || [];

    // Synthesize project object as passed to KnowledgeAssessment
    const project = {
      title: testCase.title,
      domain: model.semantics.identity.primaryDomain,
      techStack: {
        frontend: blueprint.find(t => t.layer === 'Frontend')?.technology || primaryStack.find(t => t.category === 'frontend')?.name || 'React',
        backend: blueprint.find(t => t.layer === 'Backend')?.technology || primaryStack.find(t => t.category === 'backend')?.name || 'FastAPI',
        database: blueprint.find(t => t.layer === 'Database')?.technology || primaryStack.find(t => t.category === 'database')?.name || 'PostgreSQL',
        aiModels: blueprint.find(t => t.layer === 'AI / ML' || t.layer === 'AI/ML' || t.layer === 'Computer Vision')?.technology || primaryStack.find(t => t.category === 'ai_ml')?.name || 'N/A',
        container: blueprint.find(t => t.layer === 'Containerization')?.technology || primaryStack.find(t => t.category === 'devops')?.name || 'Docker'
      }
    };

    // Test attempt 1 and attempt 2 (Set 1 and Set 2)
    const questionsAttempt1 = generateDynamicAssessmentQuestions(project, 1);
    const questionsAttempt2 = generateDynamicAssessmentQuestions(project, 2);

    const issues = [];

    // 1. Check if AI questions appear for projects with NO AI
    const hasAiInStack = project.techStack.aiModels !== 'N/A';
    const aiQuestionsInA1 = questionsAttempt1.filter(q => q.category === 'AI Architecture' || q.skill.includes('RAG') || q.skill.includes('CNN') || q.skill.includes('Vector'));

    if (!hasAiInStack && aiQuestionsInA1.length > 0) {
      issues.push({
        type: 'UNALIGNED_AI_QUESTIONS',
        severity: 'HIGH',
        message: `Project has no AI in tech stack (aiModels='N/A'), but ${aiQuestionsInA1.length} AI/ML/RAG questions were generated: "${aiQuestionsInA1[0].question.substring(0, 60)}..."`
      });
    }

    // 2. Check for nonsensical / joke distractors
    const jokeDistractorRegex = /sound files|delete bad spelling|vowels in a word|download speeds|restart the physical computer|format frontend CSS layouts automatically|turn database data into sound files|freezing the user computer mouse cursor|opening 5 popup windows|blank white screen|translating English into Spanish|CPU temperature|bank accounts|Google Drive/i;
    let jokeDistractorCount = 0;
    questionsAttempt1.forEach(q => {
      q.options.forEach(opt => {
        if (jokeDistractorRegex.test(opt)) {
          jokeDistractorCount++;
        }
      });
    });
    if (jokeDistractorCount > 0) {
      issues.push({
        type: 'LOW_QUALITY_DISTRACTORS',
        severity: 'MEDIUM',
        message: `Found ${jokeDistractorCount} implausible or nonsensical distractors (e.g., sound files, mouse freezing).`
      });
    }

    // 3. Check factual answer accuracy & index bounds
    let invalidAnswers = 0;
    questionsAttempt1.forEach(q => {
      if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) {
        invalidAnswers++;
      }
    });
    if (invalidAnswers > 0) {
      issues.push({
        type: 'CORRUPT_ANSWER_INDEX',
        severity: 'CRITICAL',
        message: `${invalidAnswers} questions have invalid answer indices.`
      });
    }

    // 4. Check duplicate questions between Attempt 1 and Attempt 2
    const set1Ids = new Set(questionsAttempt1.map(q => q.question));
    const duplicateAcrossSets = questionsAttempt2.filter(q => set1Ids.has(q.question));
    if (duplicateAcrossSets.length > 0) {
      issues.push({
        type: 'DUPLICATE_QUESTIONS_ACROSS_SETS',
        severity: 'HIGH',
        message: `${duplicateAcrossSets.length} duplicate questions found between Set 1 and Set 2.`
      });
    }

    const isPass = issues.length === 0;
    auditResults.assessments.push({
      id: testCase.id,
      domain: testCase.domain,
      pass: isPass,
      questionCount: questionsAttempt1.length,
      hasAiInStack,
      aiQuestionsCount: aiQuestionsInA1.length,
      issues
    });

    console.log(`  [${isPass ? 'PASS' : 'WARN/FAIL'}] ${testCase.id} (${testCase.domain}): ${issues.length} issues identified.`);
    issues.forEach(iss => console.log(`     - [${iss.severity}] ${iss.message}`));
  }

  // -------------------------------------------------------------------------
  // SECTION C: LEARNING CONTENT & RESOURCE RECOMMENDATIONS AUDIT
  // -------------------------------------------------------------------------
  console.log('\n>>> [C] AUDITING LEARNING RESOURCES & EXTERNAL LINKS (HTTP HEAD PROBES)...');

  // Test static resources from learningResources.js
  const staticUrls = [
    { source: 'learningResources.js:FastAPI', url: LEARNING_RESOURCES.FastAPI?.docUrl },
    { source: 'learningResources.js:LangChain', url: LEARNING_RESOURCES['LangChain & Vector DB']?.docUrl },
    { source: 'learningResources.js:React', url: LEARNING_RESOURCES.React?.docUrl },
    { source: 'learningResources.js:Docker', url: LEARNING_RESOURCES.Docker?.docUrl }
  ];

  console.log('  Probing static docUrls from learningResources.js...');
  for (const item of staticUrls) {
    if (!item.url) continue;
    const probe = await checkUrl(item.url);
    console.log(`    ${item.source} -> ${item.url} [Status: ${probe.status || probe.error}] -> ${probe.ok ? 'OK' : 'FAIL/REDIRECT'}`);
    auditResults.resources.push({
      source: item.source,
      url: item.url,
      status: probe.status,
      error: probe.error,
      ok: probe.ok
    });
  }

  // Audit dynamic resources generated across the 10 domains
  console.log('\n  Auditing dynamically generated learning resources across 10 domains...');
  for (const testCase of DOMAINS_TO_TEST) {
    const model = generateFullIntelligenceModel(testCase.prompt, testCase.domainHint, 'academic');
    const primaryStack = model.technologyDecisions || [];
    const blueprint = model.layeredBlueprintTable || [];

    const project = {
      title: testCase.title,
      domain: model.semantics.identity.primaryDomain,
      techStack: {
        frontend: blueprint.find(t => t.layer === 'Frontend')?.technology || primaryStack.find(t => t.category === 'frontend')?.name || 'React',
        backend: blueprint.find(t => t.layer === 'Backend')?.technology || primaryStack.find(t => t.category === 'backend')?.name || 'FastAPI',
        database: blueprint.find(t => t.layer === 'Database')?.technology || primaryStack.find(t => t.category === 'database')?.name || 'PostgreSQL',
        aiModels: blueprint.find(t => t.layer === 'AI / ML' || t.layer === 'AI/ML' || t.layer === 'Computer Vision')?.technology || primaryStack.find(t => t.category === 'ai_ml')?.name || 'N/A',
        container: blueprint.find(t => t.layer === 'Containerization')?.technology || primaryStack.find(t => t.category === 'devops')?.name || 'Docker'
      }
    };

    const resources = generateDynamicLearningResources(project);
    const resourceKeys = Object.keys(resources);
    const issues = [];

    // Check if resources include technologies NOT in the project stack
    // e.g. does it lack Flutter/WebRTC/Solidity topics if those are in stack?
    for (const tech of primaryStack) {
      const techFirstWord = tech.name.split(' ')[0];
      if (tech.necessity === 'Required' && !resources[techFirstWord] && !resources[tech.name]) {
        // e.g., Solidity or WebRTC or MQTT missing in study guides
        issues.push({
          type: 'MISSING_TECH_STUDY_GUIDE',
          severity: 'MEDIUM',
          tech: tech.name,
          message: `Required technology ${tech.name} does not have an elaborated study guide or resources generated.`
        });
      }
    }

    // Check if YouTube search query URLs are generated
    for (const [key, resData] of Object.entries(resources)) {
      if (resData.youtubeVideos) {
        for (const vid of resData.youtubeVideos) {
          if (!vid.youtubeUrl || !vid.youtubeUrl.startsWith('https://www.youtube.com/')) {
            issues.push({
              type: 'INVALID_VIDEO_URL',
              severity: 'HIGH',
              url: vid.youtubeUrl,
              message: `Invalid video URL in ${key}: ${vid.youtubeUrl}`
            });
          }
        }
      }
    }

    auditResults.resources.push({
      id: testCase.id,
      domain: testCase.domain,
      resourceKeys,
      issues
    });
    console.log(`  [${issues.length === 0 ? 'PASS' : 'WARN'}] ${testCase.id} (${testCase.domain}): Available resources: [${resourceKeys.join(', ')}]. ${issues.length} warnings.`);
  }

  // -------------------------------------------------------------------------
  // SECTION D: END-TO-END TRACEABILITY AUDIT
  // -------------------------------------------------------------------------
  console.log('\n>>> [D] AUDITING END-TO-END TRACEABILITY (PROBLEM -> TECH -> CONCEPTS -> RESOURCES -> QUESTIONS)...');
  for (const testCase of DOMAINS_TO_TEST) {
    const model = generateFullIntelligenceModel(testCase.prompt, testCase.domainHint, 'academic');
    const primaryStack = model.technologyDecisions || [];
    const blueprint = model.layeredBlueprintTable || [];

    const project = {
      title: testCase.title,
      domain: model.semantics.identity.primaryDomain,
      techStack: {
        frontend: blueprint.find(t => t.layer === 'Frontend')?.technology || primaryStack.find(t => t.category === 'frontend')?.name || 'React',
        backend: blueprint.find(t => t.layer === 'Backend')?.technology || primaryStack.find(t => t.category === 'backend')?.name || 'FastAPI',
        database: blueprint.find(t => t.layer === 'Database')?.technology || primaryStack.find(t => t.category === 'database')?.name || 'PostgreSQL',
        aiModels: blueprint.find(t => t.layer === 'AI / ML' || t.layer === 'AI/ML' || t.layer === 'Computer Vision')?.technology || primaryStack.find(t => t.category === 'ai_ml')?.name || 'N/A',
        container: blueprint.find(t => t.layer === 'Containerization')?.technology || primaryStack.find(t => t.category === 'devops')?.name || 'Docker'
      }
    };

    const questions = generateDynamicAssessmentQuestions(project, 1);
    const resources = generateDynamicLearningResources(project);

    // Verify consistency:
    // 1. Are all question categories traceable to primary stack?
    const qCategories = [...new Set(questions.map(q => q.category))];
    const untraceableCats = qCategories.filter(cat => {
      if (cat === 'Docker') return true; // Docker is container
      if (cat === 'AI Architecture' && project.techStack.aiModels === 'N/A') return false; // Untraceable!
      return true;
    });

    const brokenChain = project.techStack.aiModels === 'N/A' && qCategories.includes('AI Architecture');

    auditResults.consistency.push({
      id: testCase.id,
      domain: testCase.domain,
      pass: !brokenChain,
      chainBrokenReason: brokenChain ? 'Assessment tests AI Architecture, but project requires no AI.' : null
    });

    console.log(`  [${!brokenChain ? 'PASS' : 'FAIL'}] ${testCase.id} (${testCase.domain}): Traceability chain ${brokenChain ? 'BROKEN (AI asked on non-AI project)' : 'INTACT'}.`);
  }

  console.log('\n================================================================');
  console.log('AUDIT COMPLETED.');
  console.log('================================================================');
}

runAudit();
