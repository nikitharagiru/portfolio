// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Set Current Year in Footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    // Animate Skills Bar on load
    animateSkills();
});

// NAVIGATION EFFECTS
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');

// Scroll Shrink & Active Class spy
window.addEventListener('scroll', () => {
    // Shrink Navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active spy
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Mobile Hamburg Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('mobile-active');
});

// Close Mobile Menu on link click
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('mobile-active');
    });
});

// MOCK DATA FOR API PLAYGROUND
const mockApiResponses = {
    'get-profile': {
        "status": 200,
        "data": {
            "name": "Nikhitha Ragiru",
            "role": "Quality Assurance Analyst",
            "location": "Hyderabad, TS, India",
            "experience": [
                "QA Analyst at Axiora Global Solutions (March 2026 - Present)",
                "QA Engineer / Analyst at Priacc Innovations Pvt Ltd. (June 2025 - Feb 2026)"
            ],
            "contact": {
                "phone": "+917730977900",
                "email": "nikhitha.ragiru123@gmail.com",
                "linkedin": "linkedin.com/in/ragiru-nikhitha-4547461aa"
            },
            "summary": "Quality-focused QA Analyst with experience in manual, API, and workflow testing for enterprise web applications."
        }
    },
    'get-skills': {
        "status": 200,
        "data": {
            "testing_quality": [
                "Functional Testing", "Regression Testing", "Smoke Testing", 
                "Sanity Testing", "Exploratory Testing", "UAT Testing", 
                "End-to-End Workflow Testing", "Risk-Based Testing"
            ],
            "api_automation": [
                "API Testing", "Swagger UI", "Postman", 
                "Request/Response Validation", "Authentication Testing", 
                "Basic Playwright Automation", "Basic Selenium WebDriver"
            ],
            "tools_technologies": [
                "Jira", "Jira Defect Tracking", "SQL Basic Queries", "TestNG", "Git"
            ],
            "methodologies": [
                "SDLC", "STLC", "Agile Scrum", "Sprint Testing", "Release Validation"
            ]
        }
    },
    'get-projects': {
        "status": 200,
        "data": [
            {
                "name": "Axiora Pulse",
                "role": "QA Analyst",
                "type": "Survey Management Platform",
                "modules_tested": ["Survey Creation", "Questionnaire Flows", "Analytics Engine", "Notifications Module"],
                "testing_types": ["Regression Testing", "UAT Testing", "API Schema Validation"],
                "tools": ["Swagger", "Postman", "Jira"]
            },
            {
                "name": "Nexora Prism",
                "role": "QA Analyst",
                "type": "Business Operations & Analytics Platform",
                "modules_tested": ["Dashboards", "Operational Reporting", "Workflow Management", "Role-Based Access (RBAC)"],
                "testing_types": ["Data Integrity Validation", "Security & Access Testing", "Defect Prevention"],
                "tools": ["Postman", "Jira", "SQL Queries"]
            },
            {
                "name": "TeamHub",
                "role": "QA Engineer / Analyst",
                "type": "Real-time Collaboration Platform",
                "modules_tested": ["Workspace Creation", "Instant Messaging", "Notification Triggers", "File-Sharing & Tasks"],
                "testing_types": ["WebSocket Validation", "Cross-browser Testing", "User Roles (RBAC)"],
                "tools": ["Jira", "WebSockets", "Chrome DevTools"]
            }
        ]
    }
};

// API PLAYGROUND INTERACTION
const apiSelect = document.getElementById('apiSelect');
const apiMethod = document.getElementById('apiMethod');
const apiSendBtn = document.getElementById('apiSendBtn');
const apiOutput = document.getElementById('apiOutput');
const postBodyContainer = document.getElementById('postBodyContainer');
const postPayload = document.getElementById('postPayload');

// Adjust UI based on selected API method
apiSelect.addEventListener('change', () => {
    const selectedOption = apiSelect.options[apiSelect.selectedIndex];
    const method = selectedOption.getAttribute('data-method');
    apiMethod.textContent = method;
    
    if (method === 'POST') {
        apiMethod.className = 'api-method post';
        postBodyContainer.style.display = 'block';
    } else {
        apiMethod.className = 'api-method';
        postBodyContainer.style.display = 'none';
    }
});

// Trigger API Mock request
apiSendBtn.addEventListener('click', () => {
    const endpoint = apiSelect.value;
    const method = apiMethod.textContent;
    
    // Clear display & print request initiation
    apiOutput.innerHTML = `<span style="color: var(--text-muted);">// Sending request...</span>\n`;
    apiSendBtn.disabled = true;
    apiSendBtn.textContent = 'Sending...';

    setTimeout(() => {
        if (method === 'GET') {
            const response = mockApiResponses[endpoint];
            if (response) {
                renderApiResponse(response.status, response.data);
            } else {
                renderApiResponse(404, { "error": "Endpoint not found" });
            }
        } else if (method === 'POST' && endpoint === 'post-bug') {
            try {
                // Parse the user payload to make sure it's valid JSON
                const payloadText = postPayload.value;
                const parsed = JSON.parse(payloadText);
                
                const responseData = {
                    "message": "Defect successfully reported to Jiraboard",
                    "status": "Created",
                    "defect_details": parsed,
                    "incident_response": {
                        "ticket_id": `JIRA-${Math.floor(10000 + Math.random() * 90000)}`,
                        "severity_score": parsed.severity === 'High' ? 1 : 2,
                        "created_at": new Date().toISOString(),
                        "owner": "Nikhitha Ragiru (Assigned QA Analyst)",
                        "auto_trigger": "Playwright sanity checks pipeline: QUEUED"
                    }
                };
                renderApiResponse(201, responseData);
            } catch (err) {
                renderApiResponse(400, { 
                    "error": "Bad Request", 
                    "message": "Malformed JSON payload provided.",
                    "details": err.message 
                });
            }
        }
        
        apiSendBtn.disabled = false;
        apiSendBtn.textContent = 'Send';
    }, 450);
});

function renderApiResponse(status, data) {
    let statusColor = 'var(--success)';
    if (status >= 400) statusColor = 'var(--error)';
    if (status === 201) statusColor = 'var(--accent-purple)';

    const header = `// HTTP/1.1 <span style="color: ${statusColor}; font-weight: bold;">${status} ${getStatusText(status)}</span>
// Content-Type: application/json
// Date: ${new Date().toUTCString()}
// X-Powered-By: Axiora-Quality-Verification-Engine
\n`;

    const jsonBody = JSON.stringify(data, null, 2);
    apiOutput.innerHTML = header + syntaxHighlight(jsonBody);
}

function getStatusText(status) {
    switch(status) {
        case 200: return 'OK';
        case 201: return 'Created';
        case 400: return 'Bad Request';
        case 404: return 'Not Found';
        default: return 'Unknown';
    }
}

// JSON syntax highlighter utility
function syntaxHighlight(json) {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
        var cls = '#a5d6ff'; // string color
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'var(--accent-primary)'; // key color
            }
        } else if (/true|false/.test(match)) {
            cls = 'var(--warning)'; // boolean color
        } else if (/null/.test(match)) {
            cls = 'var(--text-muted)'; // null color
        } else {
            cls = 'var(--accent-purple)'; // number color
        }
        return '<span style="color:' + cls + '">' + match + '</span>';
    });
}


// PLAYWRIGHT SIMULATION LOGIC
const runnerBtn = document.getElementById('runnerBtn');
const runnerLogs = document.getElementById('runnerLogs');

const playwrightSimLogs = [
    { text: "Executing test suite: 'Release_Sanity.spec.js'", type: 'info' },
    { text: "npx playwright test --project=chromium --headed", type: 'info' },
    { text: "───────────────────────────────────────────────────────", type: 'info' },
    { text: "[Chromium] Launching headless browser instance...", type: 'info' },
    { text: "[Browser] Navigated to Axiora Pulse App: https://pulse.axiora.com", type: 'info' },
    { text: "[Test Step 1] Verification of Login Authenticator Session", type: 'step' },
    { text: "» Action: Inject Session Token into LocalStorage", type: 'info' },
    { text: "» Action: Reload Dashboard context page", type: 'info' },
    { text: "✓ Assertion: expect(page.url()).toContain('/dashboard') - PASSED (142ms)", type: 'success' },
    { text: "✓ Assertion: expect(page.locator('.sidebar-nav')).toBeVisible() - PASSED (54ms)", type: 'success' },
    { text: "[Test Step 2] Validation of Survey Creation Wizard", type: 'step' },
    { text: "» Action: Click locator('button:has-text(\"New Survey\")')", type: 'info' },
    { text: "» Action: Fill input[name=\"surveyName\"] with \"Q3 Operational Audit\"", type: 'info' },
    { text: "» Action: Choose dropdownOption select[name=\"theme\"] as \"Teal Modern\"", type: 'info' },
    { text: "» Action: Click locator('button:has-text(\"Save Questionnaire\")')", type: 'info' },
    { text: "✓ Assertion: expect(page.locator('.toast-success')).toHaveText('Survey Saved!') - PASSED (280ms)", type: 'success' },
    { text: "[Test Step 3] Analytics Dashboard Grid Validation", type: 'step' },
    { text: "» Action: Navigation to '/analytics/reports'", type: 'info' },
    { text: "» Action: Wait for page load state 'networkidle'", type: 'info' },
    { text: "✓ Assertion: expect(chartContainer).toBeVisible() - PASSED (450ms)", type: 'success' },
    { text: "✓ Assertion: expect(gridCells.count()).toBeGreaterThan(5) - PASSED (20ms)", type: 'success' },
    { text: "[Test Step 4] Validation of RBAC Security Assertions", type: 'step' },
    { text: "» Action: Attempt HTTP GET bypass of Admin API endpoint '/api/v1/admin/billing'", type: 'info' },
    { text: "✓ Assertion: expect(response.status()).toBe(403) [Forbidden Access] - PASSED (110ms)", type: 'success' },
    { text: "───────────────────────────────────────────────────────", type: 'info' },
    { text: "[Result] Playwright Sanity Verification complete.", type: 'success' },
    { text: "» Total Tests: 4 Passed | 0 Failed | 0 Skipped", type: 'success' },
    { text: "» Duration: 2.84s (Execution Engine: Playwright v1.45)", type: 'info' }
];

runnerBtn.addEventListener('click', () => {
    // Disable button & Reset logs
    runnerBtn.disabled = true;
    runnerBtn.innerHTML = `<i data-lucide="loader" style="width: 14px; height: 14px; animation: rotate-glow 2s linear infinite;"></i> Running...`;
    lucide.createIcons();
    runnerLogs.innerHTML = '';
    
    let currentIndex = 0;
    
    function printNextLog() {
        if (currentIndex < playwrightSimLogs.length) {
            const log = playwrightSimLogs[currentIndex];
            const logLine = document.createElement('div');
            logLine.className = `log-line ${log.type}`;
            logLine.textContent = log.text;
            runnerLogs.appendChild(logLine);
            
            // Scroll to bottom
            runnerLogs.scrollTop = runnerLogs.scrollHeight;
            
            currentIndex++;
            
            // Define variable delay to make log delivery look like a real environment test execution
            let delay = 100;
            if (log.type === 'step') delay = 350;
            if (log.text.startsWith('✓')) delay = 200;
            
            setTimeout(printNextLog, delay);
        } else {
            // Re-enable runner controls
            runnerBtn.disabled = false;
            runnerBtn.innerHTML = `<i data-lucide="play-circle" style="width: 14px; height: 14px;"></i> Run Test Suite`;
            lucide.createIcons();
        }
    }
    
    printNextLog();
});


// SKILLS MATRIX FILTERING & LEVEL ANIMATIONS
const skillsTabBtns = document.querySelectorAll('.skills-tab-btn');
const skillCards = document.querySelectorAll('.skill-card');

skillsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle Active state on buttons
        skillsTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter elements
        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'flex';
                // Trigger reflow for animations
                card.style.animation = 'fade-in 0.3s forwards';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Re-trigger progress bar widths when filtering
        animateSkills();
    });
});

function animateSkills() {
    const fills = document.querySelectorAll('.skill-level-fill');
    fills.forEach(fill => {
        // Reset width first (especially helpful on filter tab changes)
        fill.style.width = '0%';
        
        const level = fill.getAttribute('data-level');
        // Small delay to ensure browser register style reset
        setTimeout(() => {
            fill.style.width = level;
        }, 50);
    });
}


// CONTACT FORM HANDLING & VALIDATION
const contactForm = document.getElementById('contactForm');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const formStatusMessage = document.getElementById('formStatusMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Retrieve values
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();
        
        // Verify details (HTML5 validation does most work, but double check programmatically)
        if (!name || !email || !subject || !message) {
            showFormStatus('All form fields are mandatory.', 'var(--error)');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormStatus('Please input a valid email address.', 'var(--error)');
            return;
        }

        // Trigger Loading submit UI
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `<i data-lucide="loader" style="width: 14px; height: 14px; animation: rotate-glow 2s linear infinite;"></i> Sending...`;
        lucide.createIcons();
        
        // Perform actual fetch POST request to FormSubmit AJAX endpoint
        fetch('https://formsubmit.co/ajax/nikhitha.ragiru123@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to send message.');
            }
        })
        .then(data => {
            showFormStatus(`Thank you, ${name}! Your message has been sent successfully. Nikhitha will respond shortly.`, 'var(--success)');
            contactForm.reset();
        })
        .catch(error => {
            showFormStatus('Failed to send message. Please try again or email directly.', 'var(--error)');
            console.error('Error sending form:', error);
        })
        .finally(() => {
            // Restore button
            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = `<i data-lucide="send" style="width: 14px; height: 14px;"></i> Send Message`;
            lucide.createIcons();
        });
    });
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function showFormStatus(text, color) {
    formStatusMessage.innerHTML = text;
    formStatusMessage.style.color = color;
    formStatusMessage.style.display = 'block';
    
    // Auto-hide error messages after 5 seconds but leave success visible
    if (color === 'var(--error)') {
        setTimeout(() => {
            formStatusMessage.style.display = 'none';
        }, 5000);
    }
}
