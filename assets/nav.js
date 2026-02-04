/* ═══════════════════════════════════════════════════════════════
   NAV CONFIG — Single Source of Truth
   All sidebar navigation is generated from this file.
   Paths are relative to the project root (where index.html lives).
   ═══════════════════════════════════════════════════════════════ */

const NAV_CONFIG = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        icon: '🏠',
        items: [
            { title: 'Home', href: 'index.html' },
            { title: 'Delivery Operating Model', href: 'pages/delivery-model/index.html' },
            { title: 'Planning & Project Intake', href: 'pages/planning/index.html' },
        ]
    },
    {
        id: 'phase1',
        title: 'Phase 1 — Log Coverage',
        icon: '📊',
        items: [
            { title: 'Log Coverage & Readiness', href: 'pages/phase1-log-coverage/index.html', badge: 'P1', badgeClass: 'phase-1' },
            { title: 'Universal Onboarding Framework', href: 'pages/universal-onboarding/index.html' },
            { title: 'Decision Guides', href: 'pages/decision-guides/index.html' },
            { title: 'Edge Processor', href: 'pages/decision-guides/edge-processor.html', sub: true },
        ]
    },
    {
        id: 'primary-onboarding',
        title: 'Primary Onboarding',
        icon: '🔌',
        items: [
            { title: 'Overview', href: 'pages/onboarding-primary/index.html' },
            { title: 'Akamai WAF', href: 'pages/onboarding-primary/akamai-waf.html', sub: true },
            { title: 'Authentication / MFA', href: 'pages/onboarding-primary/authentication-mfa.html', sub: true },
            { title: 'Syslog via HF', href: 'pages/onboarding-primary/syslog-hf.html', sub: true },
            { title: 'Endpoint Telemetry', href: 'pages/onboarding-primary/endpoint-telemetry.html', sub: true },
            { title: 'HEC Ingestion', href: 'pages/onboarding-primary/hec-ingestion.html', sub: true },
        ]
    },
    {
        id: 'alternate-onboarding',
        title: 'Alternate Onboarding',
        icon: '🔄',
        items: [
            { title: 'Overview', href: 'pages/onboarding-alternate/index.html' },
            { title: 'Azure Event Hubs', href: 'pages/onboarding-alternate/azure-event-hubs.html', sub: true },
            { title: 'Kafka Connect', href: 'pages/onboarding-alternate/kafka-connect.html', sub: true },
            { title: 'DB Connect', href: 'pages/onboarding-alternate/db-connect.html', sub: true },
            { title: 'Scripted Inputs', href: 'pages/onboarding-alternate/scripted-inputs.html', sub: true },
        ]
    },
    {
        id: 'phase2',
        title: 'Phase 2 — Data Quality',
        icon: '🔍',
        items: [
            { title: 'Data Quality & Normalization', href: 'pages/phase2-data-quality/index.html', badge: 'P2', badgeClass: 'phase-2' },
        ]
    },
    {
        id: 'es-data-layer',
        title: 'ES Data Layer & CIM',
        icon: '⚠️',
        items: [
            { title: 'How ES Uses Data', href: 'pages/es-data-layer/how-es-uses-data.html', sub: true },
            { title: 'CIM Fundamentals for ES', href: 'pages/es-data-layer/cim-fundamentals.html', sub: true },
            { title: 'Data Models Deep Dive', href: 'pages/es-data-layer/data-models-deep-dive.html', sub: true },
            { title: 'Validating ES Data ⛔', href: 'pages/es-data-layer/validating-es-data.html', sub: true },
            { title: 'Missing Fields After Add-ons', href: 'pages/es-data-layer/missing-fields.html', sub: true },
            { title: 'Safe Add-on Tuning', href: 'pages/es-data-layer/safe-addon-tuning.html', sub: true },
            { title: 'Data Model → Correlation', href: 'pages/es-data-layer/safe-correlation-path.html', sub: true },
        ]
    },
    {
        id: 'phase3',
        title: 'Phase 3 — Detection',
        icon: '🎯',
        items: [
            { title: 'Detection Engineering', href: 'pages/phase3-detection/index.html', badge: 'P3', badgeClass: 'phase-3' },
            { title: 'WAF / DDoS Use Cases', href: 'pages/use-cases/waf-ddos.html', sub: true },
            { title: 'MFA / Auth Use Cases', href: 'pages/use-cases/mfa-auth.html', sub: true },
        ]
    },
    {
        id: 'es-content-mgmt',
        title: 'ES Content Management',
        icon: '📦',
        items: [
            { title: 'OOTB Content Reality', href: 'pages/es-content-management/ootb-content.html', sub: true },
            { title: 'OOTB vs Custom Strategy', href: 'pages/es-content-management/ootb-vs-custom.html', sub: true },
            { title: 'Correlation Search Lifecycle', href: 'pages/es-content-management/correlation-lifecycle.html', sub: true },
            { title: 'Tuning & Noise Reduction', href: 'pages/es-content-management/tuning-noise.html', sub: true },
            { title: 'ES Change Management', href: 'pages/es-content-management/change-management.html', sub: true },
            { title: 'Health & Performance', href: 'pages/es-content-management/health-performance.html', sub: true },
            { title: 'Governance & Audit', href: 'pages/es-content-management/governance-audit.html', sub: true },
            { title: 'ESCU Overview', href: 'pages/es-content-management/escu-overview.html', sub: true },
            { title: 'ESCU Operationalize', href: 'pages/es-content-management/escu-operationalize.html', sub: true },
            { title: 'ESCU Log Mapping', href: 'pages/es-content-management/escu-log-mapping.html', sub: true },
        ]
    },
    {
        id: 'es-operations',
        title: 'ES Operations',
        icon: '⚙️',
        items: [
            { title: 'Incident Review & Triage', href: 'pages/es-operations/incident-review.html', sub: true },
            { title: 'Notable Suppression', href: 'pages/es-operations/notable-suppression.html', sub: true },
            { title: 'Investigations & Evidence', href: 'pages/es-operations/investigations-evidence.html', sub: true },
            { title: 'Enablement Mechanics', href: 'pages/es-operations/enablement-mechanics.html', sub: true },
        ]
    },
    {
        id: 'phase4',
        title: 'Phase 4 — Automation',
        icon: '🤖',
        items: [
            { title: 'Automation', href: 'pages/phase4-automation/index.html', badge: 'P4', badgeClass: 'phase-4' },
        ]
    },
    {
        id: 'phase5',
        title: 'Phase 5 — Future',
        icon: '🚀',
        items: [
            { title: 'RBA (Future)', href: 'pages/phase5-rba/index.html', badge: 'P5', badgeClass: 'phase-5' },
        ]
    },
    {
        id: 'appendix',
        title: 'Appendix',
        icon: '📎',
        items: [
            { title: 'Appendix Overview', href: 'pages/appendix/index.html' },
            { title: 'SPL Library', href: 'pages/appendix/spl-library.html', sub: true },
            { title: 'Troubleshooting', href: 'pages/appendix/troubleshooting.html', sub: true },
            { title: 'Master Checklists', href: 'pages/appendix/checklists.html', sub: true },
        ]
    },
];

// Make available globally
if (typeof window !== 'undefined') {
    window.NAV_CONFIG = NAV_CONFIG;
}
