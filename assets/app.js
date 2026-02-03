/* ═══════════════════════════════════════════════════════════════
   SPLUNK ES DETECTION ENGINEERING HANDBOOK
   JavaScript Functionality
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCopyButtons();
    initChecklists();
    initCollapsibles();
    initTabs();
    initMermaid();
    highlightCurrentNav();
});

/* ═══════════════════════════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════════════════════════ */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggle && sidebar) {
        toggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            this.innerHTML = sidebar.classList.contains('open') ? '✕' : '☰';
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024 && 
                !sidebar.contains(e.target) && 
                !toggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                toggle.innerHTML = '☰';
            }
        });
    }
}

/* ═══════════════════════════════════════════════════════════════
   COPY BUTTONS FOR CODE BLOCKS
   ═══════════════════════════════════════════════════════════════ */
function initCopyButtons() {
    document.querySelectorAll('.code-block').forEach(block => {
        const copyBtn = block.querySelector('.copy-btn');
        const code = block.querySelector('code');
        
        if (copyBtn && code) {
            copyBtn.addEventListener('click', async function() {
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    this.textContent = 'Copied!';
                    this.classList.add('copied');
                    setTimeout(() => {
                        this.textContent = 'Copy';
                        this.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        }
    });
    
    // Also handle pre blocks without .code-block wrapper
    document.querySelectorAll('pre:not(.code-block pre)').forEach(pre => {
        if (!pre.querySelector('.copy-btn')) {
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.textContent = 'Copy';
            btn.style.position = 'absolute';
            btn.style.top = '0.5rem';
            btn.style.right = '0.5rem';
            pre.style.position = 'relative';
            pre.appendChild(btn);
            
            btn.addEventListener('click', async function() {
                try {
                    const code = pre.querySelector('code') || pre;
                    await navigator.clipboard.writeText(code.textContent);
                    this.textContent = 'Copied!';
                    this.classList.add('copied');
                    setTimeout(() => {
                        this.textContent = 'Copy';
                        this.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        }
    });
}

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE CHECKLISTS
   ═══════════════════════════════════════════════════════════════ */
function initChecklists() {
    const storageKey = 'splunk-handbook-checklists';
    let savedState = {};
    
    try {
        savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (e) {
        savedState = {};
    }
    
    document.querySelectorAll('.checklist-checkbox').forEach((checkbox, index) => {
        const pageKey = window.location.pathname;
        const itemKey = `${pageKey}-${index}`;
        
        // Restore state
        if (savedState[itemKey]) {
            checkbox.classList.add('checked');
        }
        
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            
            // Save state
            if (this.classList.contains('checked')) {
                savedState[itemKey] = true;
            } else {
                delete savedState[itemKey];
            }
            
            try {
                localStorage.setItem(storageKey, JSON.stringify(savedState));
            } catch (e) {
                console.warn('Could not save checklist state');
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   COLLAPSIBLE SECTIONS
   ═══════════════════════════════════════════════════════════════ */
function initCollapsibles() {
    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('open');
            const content = this.nextElementSibling;
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
    document.querySelectorAll('.tabs').forEach(tabContainer => {
        const buttons = tabContainer.querySelectorAll('.tab-btn');
        const panels = tabContainer.querySelectorAll('.tab-panel');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.dataset.tab;
                
                // Update buttons
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update panels
                panels.forEach(p => {
                    p.classList.remove('active');
                    if (p.id === targetId) {
                        p.classList.add('active');
                    }
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
                primaryColor: '#58a6ff',
                primaryTextColor: '#e6edf3',
                primaryBorderColor: '#30363d',
                lineColor: '#8b949e',
                secondaryColor: '#21262d',
                tertiaryColor: '#161b22',
                background: '#0d1117',
                mainBkg: '#21262d',
                nodeBorder: '#30363d',
                clusterBkg: '#161b22',
                clusterBorder: '#30363d',
                titleColor: '#e6edf3',
                edgeLabelBackground: '#161b22',
                nodeTextColor: '#e6edf3'
            },
            flowchart: {
                useMaxWidth: false,
                htmlLabels: true,
                curve: 'basis'
            },
            securityLevel: 'loose'
        });
    }
}

/* ═══════════════════════════════════════════════════════════════
   HIGHLIGHT CURRENT NAV ITEM
   ═══════════════════════════════════════════════════════════════ */
function highlightCurrentNav() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href) {
            // Normalize paths for comparison
            const itemPath = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
            const normalizedCurrent = currentPath.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
            
            if (itemPath === normalizedCurrent || 
                (currentPath.includes(itemPath) && itemPath !== '/' && itemPath !== '/index.html')) {
                item.classList.add('active');
            }
        }
    });
}

/* ═══════════════════════════════════════════════════════════════
   SPL SYNTAX HIGHLIGHTING (Basic)
   ═══════════════════════════════════════════════════════════════ */
function highlightSPL(code) {
    const keywords = ['search', 'index', 'sourcetype', 'source', 'host', 'stats', 'eval', 'where', 
                      'table', 'fields', 'rename', 'sort', 'dedup', 'rex', 'spath', 'lookup',
                      'join', 'append', 'union', 'transaction', 'bucket', 'timechart', 'chart',
                      'eventstats', 'streamstats', 'inputlookup', 'outputlookup', 'by', 'as',
                      'NOT', 'AND', 'OR', 'earliest', 'latest', 'span', 'count', 'sum', 'avg',
                      'min', 'max', 'values', 'list', 'dc', 'first', 'last', 'tstats', 'from',
                      'datamodel', 'prestats', 'summariesonly'];
    
    let highlighted = code;
    
    // Highlight strings
    highlighted = highlighted.replace(/"([^"]+)"/g, '<span class="spl-string">"$1"</span>');
    
    // Highlight keywords
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
        highlighted = highlighted.replace(regex, '<span class="spl-keyword">$1</span>');
    });
    
    // Highlight fields (word=)
    highlighted = highlighted.replace(/(\w+)=/g, '<span class="spl-field">$1</span>=');
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="spl-number">$1</span>');
    
    return highlighted;
}

/* ═══════════════════════════════════════════════════════════════
   UTILITY: Get Base Path
   ═══════════════════════════════════════════════════════════════ */
function getBasePath() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    if (depth <= 1) return './';
    return '../'.repeat(depth - 1);
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH FUNCTIONALITY (Local)
   ═══════════════════════════════════════════════════════════════ */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (query && !text.includes(query)) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
    });
}
