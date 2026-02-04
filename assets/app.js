/* ═══════════════════════════════════════════════════════════════
   SPLUNK ES DETECTION ENGINEERING HANDBOOK
   Application JavaScript — Sidebar Engine + Utilities
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
    renderSidebar();
    renderBreadcrumbs();
    initSidebarCollapse();
    initSidebarAccordion();
    initMobileMenu();
    initCopyButtons();
    initChecklists();
    initCollapsibles();
    initTabs();
    initMermaid();
});

/* ═══════════════════════════════════════════════════════════════
   PATH UTILITIES
   ═══════════════════════════════════════════════════════════════ */

function getBasePath() {
    var path = window.location.pathname;
    var segments = path.split('/').filter(Boolean);
    var pagesIdx = segments.lastIndexOf('pages');
    if (pagesIdx === -1) return '';
    var depth = segments.length - pagesIdx;
    var result = '';
    for (var i = 0; i < depth; i++) result += '../';
    return result;
}

function normalizePath(p) {
    return p.replace(/[?#].*$/, '').replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
}

function isActivePage(href) {
    var base = getBasePath();
    var fullHref = base + href;
    try {
        var linkUrl = new URL(fullHref, window.location.href);
        var currentUrl = new URL(window.location.href);
        return normalizePath(linkUrl.pathname) === normalizePath(currentUrl.pathname);
    } catch (e) {
        return false;
    }
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR RENDERING
   ═══════════════════════════════════════════════════════════════ */

function renderSidebar() {
    var container = document.getElementById('sidebar');
    if (!container || typeof NAV_CONFIG === 'undefined') return;

    var base = getBasePath();
    var collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    var groupState = {};
    try { groupState = JSON.parse(localStorage.getItem('sidebarGroupState') || '{}'); } catch (e) { groupState = {}; }

    var activeGroupId = null;
    for (var g = 0; g < NAV_CONFIG.length; g++) {
        for (var i = 0; i < NAV_CONFIG[g].items.length; i++) {
            if (isActivePage(NAV_CONFIG[g].items[i].href)) {
                activeGroupId = NAV_CONFIG[g].id;
                break;
            }
        }
        if (activeGroupId) break;
    }

    var html = '';

    // Header
    html += '<div class="sidebar-header">'
        + '<a href="' + base + 'index.html" class="sidebar-logo">'
        + '<div class="sidebar-logo-icon">ES</div>'
        + '<div class="sidebar-logo-text-wrap">'
        + '<div class="sidebar-logo-text">Detection Engineering</div>'
        + '<div class="sidebar-logo-subtitle">Delivery Handbook</div>'
        + '</div></a>'
        + '<button class="sidebar-collapse-btn" id="sidebarCollapseBtn" title="Collapse sidebar" aria-label="Toggle sidebar">'
        + '<svg class="collapse-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">'
        + '<path d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"/>'
        + '</svg></button></div>';

    // Nav
    html += '<div class="sidebar-nav">';

    for (var g = 0; g < NAV_CONFIG.length; g++) {
        var group = NAV_CONFIG[g];
        var isActiveGroup = (group.id === activeGroupId);
        var savedVal = groupState[group.id];
        var isOpen = isActiveGroup ? true : (savedVal !== undefined ? savedVal : true);

        html += '<div class="nav-section" data-group-id="' + group.id + '">'
            + '<button class="nav-section-title' + (isOpen ? ' open' : '') + '" aria-expanded="' + isOpen + '" data-group="' + group.id + '">'
            + '<span class="nav-section-icon">' + group.icon + '</span>'
            + '<span class="nav-section-label">' + group.title + '</span>'
            + '<svg class="nav-chevron" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">'
            + '<path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>'
            + '</svg></button>';

        html += '<div class="nav-section-items' + (isOpen ? ' open' : '') + '">';
        for (var i = 0; i < group.items.length; i++) {
            var item = group.items[i];
            var active = isActivePage(item.href);
            var cls = 'nav-item';
            if (item.sub) cls += ' nav-item-sub';
            if (active) cls += ' active';

            html += '<a href="' + base + item.href + '" class="' + cls + '">'
                + '<span class="nav-item-label">' + item.title + '</span>';
            if (item.badge) {
                html += '<span class="nav-phase-badge ' + (item.badgeClass || '') + '">' + item.badge + '</span>';
            }
            html += '</a>';
        }
        html += '</div></div>';
    }

    html += '</div>';
    container.innerHTML = html;

    if (collapsed) {
        container.classList.add('collapsed');
        var main = document.querySelector('.main-content');
        if (main) main.classList.add('sidebar-collapsed');
    }

    // Scroll active item into view
    setTimeout(function () {
        var active = container.querySelector('.nav-item.active');
        if (active) active.scrollIntoView({ block: 'center', behavior: 'auto' });
    }, 50);
}

/* ═══════════════════════════════════════════════════════════════
   BREADCRUMBS
   ═══════════════════════════════════════════════════════════════ */

function renderBreadcrumbs() {
    var container = document.getElementById('breadcrumbs');
    if (!container || typeof NAV_CONFIG === 'undefined') return;

    var base = getBasePath();
    var crumbs = [{ title: 'Home', href: base + 'index.html' }];

    for (var g = 0; g < NAV_CONFIG.length; g++) {
        var group = NAV_CONFIG[g];
        for (var i = 0; i < group.items.length; i++) {
            var item = group.items[i];
            if (isActivePage(item.href)) {
                if (group.id !== 'getting-started') {
                    var groupLink = group.items[0] ? base + group.items[0].href : '#';
                    crumbs.push({ title: group.title.replace(/ — .*$/, ''), href: groupLink });
                }
                if (item.href !== 'index.html') {
                    crumbs.push({ title: item.title, href: null });
                } else {
                    crumbs[0].href = null;
                }
                break;
            }
        }
    }

    var html = '';
    for (var c = 0; c < crumbs.length; c++) {
        if (c > 0) html += '<span class="separator">/</span>';
        if (crumbs[c].href) {
            html += '<a href="' + crumbs[c].href + '">' + crumbs[c].title + '</a>';
        } else {
            html += '<span class="current">' + crumbs[c].title + '</span>';
        }
    }
    container.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR COLLAPSE (Full sidebar toggle)
   ═══════════════════════════════════════════════════════════════ */

function initSidebarCollapse() {
    var btn = document.getElementById('sidebarCollapseBtn');
    var sidebar = document.getElementById('sidebar');
    var main = document.querySelector('.main-content');
    if (!btn || !sidebar) return;

    btn.addEventListener('click', function () {
        var willCollapse = !sidebar.classList.contains('collapsed');
        sidebar.classList.toggle('collapsed');
        if (main) main.classList.toggle('sidebar-collapsed');
        localStorage.setItem('sidebarCollapsed', String(willCollapse));
    });
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR ACCORDION
   ═══════════════════════════════════════════════════════════════ */

function initSidebarAccordion() {
    var groupState = {};
    try { groupState = JSON.parse(localStorage.getItem('sidebarGroupState') || '{}'); } catch (e) { groupState = {}; }

    document.querySelectorAll('.nav-section-title').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var groupId = this.dataset.group;
            var items = this.nextElementSibling;
            var isOpen = this.classList.contains('open');

            this.classList.toggle('open');
            if (items) items.classList.toggle('open');
            this.setAttribute('aria-expanded', String(!isOpen));

            groupState[groupId] = !isOpen;
            try { localStorage.setItem('sidebarGroupState', JSON.stringify(groupState)); } catch (e) { /* silent */ }
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════════════════════════ */

function initMobileMenu() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    if (!toggle || !sidebar) return;

    function closeMenu() {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        sidebar.classList.add('open');
        if (overlay) overlay.classList.add('open');
        toggle.innerHTML = '✕';
        toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
        sidebar.classList.contains('open') ? closeMenu() : openMenu();
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) closeMenu();
    });
}

/* ═══════════════════════════════════════════════════════════════
   COPY BUTTONS FOR CODE BLOCKS
   ═══════════════════════════════════════════════════════════════ */

function initCopyButtons() {
    document.querySelectorAll('.code-block').forEach(function (block) {
        var copyBtn = block.querySelector('.copy-btn');
        var code = block.querySelector('code');
        if (copyBtn && code) {
            copyBtn.addEventListener('click', async function () {
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    this.textContent = 'Copied!';
                    this.classList.add('copied');
                    var self = this;
                    setTimeout(function () { self.textContent = 'Copy'; self.classList.remove('copied'); }, 2000);
                } catch (err) { console.error('Failed to copy:', err); }
            });
        }
    });

    document.querySelectorAll('pre:not(.code-block pre)').forEach(function (pre) {
        if (!pre.querySelector('.copy-btn')) {
            var btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.textContent = 'Copy';
            btn.style.position = 'absolute';
            btn.style.top = '0.5rem';
            btn.style.right = '0.5rem';
            pre.style.position = 'relative';
            pre.appendChild(btn);
            btn.addEventListener('click', async function () {
                try {
                    var code = pre.querySelector('code') || pre;
                    await navigator.clipboard.writeText(code.textContent);
                    this.textContent = 'Copied!';
                    this.classList.add('copied');
                    var self = this;
                    setTimeout(function () { self.textContent = 'Copy'; self.classList.remove('copied'); }, 2000);
                } catch (err) { console.error('Failed to copy:', err); }
            });
        }
    });
}

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE CHECKLISTS
   ═══════════════════════════════════════════════════════════════ */

function initChecklists() {
    var storageKey = 'splunk-handbook-checklists';
    var savedState = {};
    try { savedState = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (e) { savedState = {}; }

    document.querySelectorAll('.checklist-checkbox').forEach(function (checkbox, index) {
        var pageKey = window.location.pathname;
        var itemKey = pageKey + '-' + index;
        if (savedState[itemKey]) checkbox.classList.add('checked');
        checkbox.addEventListener('click', function () {
            this.classList.toggle('checked');
            if (this.classList.contains('checked')) savedState[itemKey] = true;
            else delete savedState[itemKey];
            try { localStorage.setItem(storageKey, JSON.stringify(savedState)); } catch (e) { /* silent */ }
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   COLLAPSIBLE SECTIONS (in-content)
   ═══════════════════════════════════════════════════════════════ */

function initCollapsibles() {
    document.querySelectorAll('.collapsible-header').forEach(function (header) {
        header.addEventListener('click', function () {
            this.classList.toggle('open');
            var content = this.nextElementSibling;
            if (content && content.classList.contains('collapsible-content')) {
                content.classList.toggle('open');
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   TAB NAVIGATION
   ═══════════════════════════════════════════════════════════════ */

function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabContainer) {
        var buttons = tabContainer.querySelectorAll('.tab-btn');
        var panels = tabContainer.querySelectorAll('.tab-panel');
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = this.dataset.tab;
                buttons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                panels.forEach(function (p) {
                    p.classList.remove('active');
                    if (p.id === targetId) p.classList.add('active');
                });
            });
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   MERMAID DIAGRAM INITIALIZATION
   ═══════════════════════════════════════════════════════════════ */

function initMermaid() {
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                primaryColor: '#58a6ff', primaryTextColor: '#e6edf3', primaryBorderColor: '#30363d',
                lineColor: '#8b949e', secondaryColor: '#21262d', tertiaryColor: '#161b22',
                background: '#0d1117', mainBkg: '#21262d', nodeBorder: '#30363d',
                clusterBkg: '#161b22', clusterBorder: '#30363d', titleColor: '#e6edf3',
                edgeLabelBackground: '#161b22', nodeTextColor: '#e6edf3'
            },
            flowchart: { useMaxWidth: false, htmlLabels: true, curve: 'basis' },
            securityLevel: 'loose'
        });
    }
}

/* ═══════════════════════════════════════════════════════════════
   SPL SYNTAX HIGHLIGHTING (Basic)
   ═══════════════════════════════════════════════════════════════ */

function highlightSPL(code) {
    var keywords = [
        'search', 'index', 'sourcetype', 'source', 'host', 'stats', 'eval', 'where',
        'table', 'fields', 'rename', 'sort', 'dedup', 'rex', 'spath', 'lookup',
        'join', 'append', 'union', 'transaction', 'bucket', 'timechart', 'chart',
        'eventstats', 'streamstats', 'inputlookup', 'outputlookup', 'by', 'as',
        'NOT', 'AND', 'OR', 'earliest', 'latest', 'span', 'count', 'sum', 'avg',
        'min', 'max', 'values', 'list', 'dc', 'first', 'last', 'tstats', 'from',
        'datamodel', 'prestats', 'summariesonly'
    ];
    var highlighted = code;
    highlighted = highlighted.replace(/"([^"]+)"/g, '<span class="spl-string">"$1"</span>');
    keywords.forEach(function (kw) {
        var regex = new RegExp('\\b(' + kw + ')\\b', 'gi');
        highlighted = highlighted.replace(regex, '<span class="spl-keyword">$1</span>');
    });
    highlighted = highlighted.replace(/(\w+)=/g, '<span class="spl-field">$1</span>=');
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="spl-number">$1</span>');
    return highlighted;
}
