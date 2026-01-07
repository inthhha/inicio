/**
 * ============================================================================
 * SCRIPT PRINCIPAL - GESTOR DE INTERFAZ
 * ============================================================================
 * ÚLTIMA REVISIÓN 23/12/2025
 * 1. CONFIGURACIONES GENERALES
 * 2. HELPERS
 * 3. REEMPLAZO AUTOMÁTICO DE EMOJIS (NUEVO)
 * 4. MENU LATERAL
 * 5. MEGAMENU
 * 6. REPOSITORIO
 * 7. ANEXOS
 * 8. INDICACIONES
 * 9. INICIALIZACIÓN GLOBAL
 * ============================================================================
 */
 
/* =========================================
 * 1. CONFIGURACIONES GENERALES
 * ========================================= */

const CONFIG = {
    imgBasePath: 'images/',
    repoItemsPerPage: 8,
    repoCategoryTypes: {
        'cirugia': ['apunte', 'manual', 'libro', 'protocolo', 'becados', 'RCP', 'link'],
        'medicina': ['apunte', 'Repartos', 'libro', 'protocolo', 'Salas/Turnos', 'Otros recursos', 'link'],
        'ginecologia': ['apunte', 'Diagramas de Flujos', 'Guias', 'libro', 'Poli-DAN', 'MMF', 'Protocolos-ARO', 'Protocolos-Ginecología', 'Protocolos-Puerperio', 'Protocolos-Recien Nacido', 'Protocolos-MMF', 'Protocolos-Otros', 'Formularios', 'Pautas', 'Otros recursos', 'link'],
        'pediatria': ['apunte', 'Guias', 'libro', 'Ingresos', 'Turnos', 'Otros recursos', 'link']
    },
    repoTypeLabels: {
        'apunte': 'Resúmenes', 'manual': 'Manual', 'libro': 'Libro', 'protocolo': 'Protocolo', 'guia': 'Guía', 
        'becados': 'Becados', 'RCP': 'RCP/Urgencias', 'link': 'Enlace Web'
    },
    anexoEmojis: {
        'laboratorio': '🧪', 'imagenologia': '🩻', 'farmacia-inmunizaciones': '💊',
        'qyf': '👩‍🔬', 'dialisis': '🩸', 'secretarias': '📞', 'sua': '🚨',
        'policlinicos': '🏥', 'cardiologia': '❤️', 'medico': '👨‍⚕️', 'quirurgico': '🩺'
    }
};

const localIcons = {};
[
    'hhha', 'ssasur', 'lab', 'test', 'synapse', 'ray', 'pathient', 'onco',
    'sangre', 'inthhha', 'otros', 'firma', 'bacteria', 'urgencia', 'tmt',
    'farmaco', 'embarazo', 'phone'
].forEach(icon => {
    localIcons[icon] = `${CONFIG.imgBasePath}${icon}.png`;
});

/* =========================================
 * 2. HELPERS
 * ========================================= */
 
const createIcon = (iconName, iconKey, isSubmenu = false) => {
    const container = document.createElement('div');
    container.className = isSubmenu ? 'submenu-item-icon-hhha' : 'sidebar-item-icon-hhha';

    if (iconKey && localIcons[iconKey]) {
        const img = new Image();
        img.src = localIcons[iconKey];
        img.alt = iconName;
        container.classList.add('icon-loading');

        img.onload = () => container.classList.remove('icon-loading');
        img.onerror = () => {
            container.textContent = iconName;
            container.classList.remove('icon-loading');
        };
        container.appendChild(img);
    } else {
        container.textContent = iconName;
    }
    return container;
};

const getEmojiForCategory = (category) => {
    const catKey = Array.isArray(category) ? category[0] : category;
    return CONFIG.anexoEmojis[catKey] || '📞';
};

/* =========================================
 * 3. REEMPLAZO AUTOMÁTICO DE EMOJIS POR ICONIFY (NUEVO)
 * ========================================= */

const replaceEmojisWithFluent = () => {
    // Solo ejecutar si Iconify está cargado
    if (typeof Iconify === 'undefined') {
        setTimeout(replaceEmojisWithFluent, 100);
        return;
    }
    
    // Mapa de emojis a códigos Fluent Emoji
    const emojiMap = {
        '🧪': 'test-tube',
        '🩻': 'x-ray',
        '💊': 'pill',
        '👩‍🔬': 'woman-scientist',
        '🩸': 'drop-of-blood',
        '📞': 'telephone',
        '🚨': 'police-car-light',
        '🏥': 'hospital',
        '❤️': 'red-heart',
        '👨‍⚕️': 'man-health-worker',
        '🩺': 'stethoscope',
        '📱': 'mobile-phone',
        '🧠': 'brain',
        '❓': 'question-mark',
        '📄': 'page-with-curl',
        '🔒': 'locked-with-key',
        '💉': 'syringe',
        '👨‍💻': 'man-technologist',
        '🔍': 'magnifying-glass',
        '📋': 'clipboard',
        '🎵': 'musical-notes',
        '⚙️': 'gear'
    };
    
    // Buscar y reemplazar emojis
    document.querySelectorAll('button, span, div, a, p, li').forEach(el => {
        // Saltar elementos que ya tienen iconify
        if (el.querySelector('iconify-icon') || el.tagName === 'ICONIFY-ICON') return;
        
        const html = el.innerHTML;
        let newHtml = html;
        
        for (const [emoji, code] of Object.entries(emojiMap)) {
            if (html.includes(emoji)) {
                const iconHTML = `<iconify-icon icon="fluent-emoji-flat:${code}" class="fluent-emoji" style="display:inline-flex;vertical-align:middle;font-size:1em"></iconify-icon>`;
                newHtml = newHtml.replace(new RegExp(emoji, 'g'), iconHTML);
            }
        }
        
        if (newHtml !== html) {
            el.innerHTML = newHtml;
        }
    });
};

// Inicializar reemplazo de emojis
const initEmojiReplacement = () => {
    // Esperar a que Iconify se cargue
    if (typeof Iconify !== 'undefined') {
        replaceEmojisWithFluent();
    } else {
        const checkIconify = setInterval(() => {
            if (typeof Iconify !== 'undefined') {
                clearInterval(checkIconify);
                replaceEmojisWithFluent();
            }
        }, 100);
        
        setTimeout(() => clearInterval(checkIconify), 5000);
    }
    
    // Observar cambios en el DOM para contenido dinámico
    const observer = new MutationObserver(() => {
        setTimeout(replaceEmojisWithFluent, 50);
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

/* =========================================
 * 4. MENU LATERAL
 * ========================================= */
 
const initSidebarMenu = () => {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer || typeof menuStructure === 'undefined') return;

    menuContainer.textContent = '';

    menuStructure.forEach(item => {
        if (item.separator) {
            const separator = document.createElement('div');
            separator.className = 'separator-hhha with-text';
            const textDiv = document.createElement('div');
            textDiv.className = 'separator-text-hhha';
            textDiv.textContent = item.separator;
            separator.appendChild(textDiv);
            menuContainer.appendChild(separator);
            return;
        }

        if (item.submenu) {
            const mainItem = document.createElement('div');
            mainItem.className = 'sidebar-item-hhha has-submenu';
            const textDiv = document.createElement('div');
            textDiv.className = 'sidebar-item-text-hhha';
            textDiv.textContent = item.text;

            mainItem.append(createIcon(item.icon, item.iconKey), textDiv);
            
            const submenuContainer = document.createElement('div');
            submenuContainer.className = 'submenu-hhha';

            item.submenu.forEach(subItem => {
                const link = document.createElement('a');
                link.className = 'submenu-item-hhha';
                link.href = subItem.url || '#';
                if (subItem.url) link.target = '_blank';

                const subText = document.createElement('div');
                subText.className = 'submenu-item-text-hhha';
                subText.textContent = subItem.text;

                link.append(createIcon(subItem.icon, subItem.iconKey, true), subText);
                submenuContainer.appendChild(link);
            });

            mainItem.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.submenu-hhha.open, .sidebar-item-hhha.open').forEach(el => {
                    if (el !== submenuContainer && el !== mainItem) el.classList.remove('open');
                });
                submenuContainer.classList.toggle('open');
                mainItem.classList.toggle('open');
            });

            menuContainer.append(mainItem, submenuContainer);
        } else {
            const link = document.createElement('a');
            link.className = 'sidebar-item-hhha';
            link.href = item.url || '#';
            if (item.url) link.target = '_blank';

            const textDiv = document.createElement('div');
            textDiv.className = 'sidebar-item-text-hhha';
            textDiv.textContent = item.text;

            link.append(createIcon(item.icon, item.iconKey), textDiv);
            menuContainer.appendChild(link);
        }
    });
};

/* =========================================
 * 5. MEGAMENU
 * ========================================= */
 
const initMegaMenu = () => {
    const toolbarRoot = document.getElementById('toolbar-menu-root');
    const headerContainer = document.querySelector('.main-header-container');

    if (!toolbarRoot || !headerContainer || typeof megaStructure === 'undefined') return;

    toolbarRoot.textContent = '';
    document.querySelector('.megamenu-panel')?.remove();
    document.querySelector('.megamenu-overlay')?.remove();

    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'toolbar-tabs-container';

    const panel = document.createElement('div');
    panel.className = 'megamenu-panel';
    panel.innerHTML = '<div class="megamenu-content"></div>';
    headerContainer.appendChild(panel);

    const overlay = document.createElement('div');
    overlay.className = 'megamenu-overlay';
    document.body.appendChild(overlay);

    let activeTabId = null;

    const renderIcon = (obj) => obj.img ? `<img src="${obj.img}" alt="icon" class="mega-custom-icon">` : (obj.icon || '');

    const closePanel = () => {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelectorAll('.megamenu-tab').forEach(t => t.classList.remove('active'));
        activeTabId = null;
    };

    const openPanel = (tabData) => {
        const contentContainer = panel.querySelector('.megamenu-content');
        contentContainer.textContent = '';

        tabData.sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'megamenu-section';

            const header = document.createElement('div');
            header.className = 'megamenu-section-header';
            header.innerHTML = `<span>${renderIcon(section)}</span> ${section.title}`;

            const itemsDiv = document.createElement('div');
            itemsDiv.className = 'megamenu-items';

            section.items.forEach(item => {
                const link = document.createElement('a');
                link.className = 'megamenu-item';
                link.href = (item.url && item.url !== '#') ? item.url : 'javascript:void(0)';
                
                if (item.url && item.url !== '#' && !item.url.startsWith('javascript') && !item.sameTab) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }

                link.innerHTML = `
                    <div class="megamenu-item-icon">${renderIcon(item)}</div>
                    <div class="megamenu-item-content">
                        <span class="megamenu-item-title">${item.text}</span>
                        <span class="megamenu-item-desc">${item.desc}</span>
                    </div>
                `;

                link.addEventListener('click', () => setTimeout(closePanel, 150));
                itemsDiv.appendChild(link);
            });

            sectionDiv.append(header, itemsDiv);
            contentContainer.appendChild(sectionDiv);
        });

        requestAnimationFrame(() => {
            panel.classList.add('active');
            overlay.classList.add('active');
        });
    };

    megaStructure.forEach(tab => {
        const tabBtn = document.createElement('div');
        tabBtn.className = 'megamenu-tab';
        tabBtn.innerHTML = `<span>${renderIcon(tab)}</span> ${tab.text}`;

        tabBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeTabId === tab.id) {
                closePanel();
            } else {
                document.querySelectorAll('.megamenu-tab').forEach(t => t.classList.remove('active'));
                tabBtn.classList.add('active');
                activeTabId = tab.id;
                openPanel(tab);
            }
        });
        tabsContainer.appendChild(tabBtn);
    });

    toolbarRoot.appendChild(tabsContainer);

    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = tabsContainer.classList.toggle('show-mobile');
            mobileToggle.querySelector('span').innerHTML = isOpen ? '&#10005;' : '☰';
        });

        tabsContainer.querySelectorAll('.megamenu-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                tabsContainer.classList.remove('show-mobile');
                mobileToggle.querySelector('span').innerHTML = '☰';
            });
        });
    }

    overlay.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });
};

/* =========================================
 * 6. REPOSITORIO
 * ========================================= */
 
const initRepository = () => {
    const resultsContainer = document.getElementById('repo-results');
    if (!resultsContainer) return;

    const tabs = document.querySelectorAll('.repo-tab');
    const searchInput = document.getElementById('repo-search');
    const typeFilter = document.getElementById('filter-type');
    const yearFilter = document.getElementById('filter-year');
    const orderFilter = document.getElementById('filter-order');
    const paginationContainer = document.getElementById('repo-pagination');
    const mobileSelect = document.getElementById('mobile-repo-category');

    let currentCategory = 'cirugia';
    let currentPage = 1;

    const updateTypeFilterOptions = () => {
        const currentValue = typeFilter.value;
        typeFilter.innerHTML = '<option value="">Todos los tipos</option>';
        
        (CONFIG.repoCategoryTypes[currentCategory] || []).forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = CONFIG.repoTypeLabels[type] || type;
            typeFilter.appendChild(option);
        });
        typeFilter.value = (CONFIG.repoCategoryTypes[currentCategory] || []).includes(currentValue) ? currentValue : '';
    };

    const renderResources = () => {
        if (typeof resourcesDB === 'undefined') {
            resultsContainer.innerHTML = '<div class="error">Error: resourcesDB no cargada.</div>';
            return;
        }

        const searchText = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        const selectedYear = yearFilter.value;
        const selectedOrder = orderFilter.value;

        let filtered = resourcesDB.filter(item => 
            item.category === currentCategory &&
            item.title.toLowerCase().includes(searchText) &&
            (!selectedType || item.type === selectedType) &&
            (!selectedYear || item.year === selectedYear)
        );

        const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        if (selectedOrder === 'year' || selectedOrder === 'recent') {
            filtered.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
        } else {
            filtered.sort((a, b) => collator.compare(a.title, b.title));
        }

        const totalPages = Math.ceil(filtered.length / CONFIG.repoItemsPerPage);
        if (currentPage > totalPages) currentPage = 1;
        
        const start = (currentPage - 1) * CONFIG.repoItemsPerPage;
        const itemsToShow = filtered.slice(start, start + CONFIG.repoItemsPerPage);

        resultsContainer.textContent = '';
        if (itemsToShow.length === 0) {
            resultsContainer.innerHTML = `<div class="repo-empty-state">No hay documentos para <strong>${currentCategory.toUpperCase()}</strong>.</div>`;
        } else {
            itemsToShow.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'repo-item';
                itemDiv.innerHTML = `
                    <div class="repo-icon ${item.format}">${item.format.toUpperCase()}</div>
                    <div class="repo-info">
                        <span class="repo-title">${item.title}</span>
                        <span class="repo-meta">Año: ${item.year} | Tipo: ${CONFIG.repoTypeLabels[item.type] || item.type}</span>
                    </div>
                    <a href="${item.url}" class="repo-btn" target="_blank">Ver / Descargar</a>
                `;
                resultsContainer.appendChild(itemDiv);
            });
        }
        renderPagination(filtered.length);
    };

    const renderPagination = (totalItems) => {
        if (!paginationContainer) return;
        const totalPages = Math.ceil(totalItems / CONFIG.repoItemsPerPage);
        paginationContainer.textContent = '';
        if (totalPages <= 1) return;

        const createBtn = (text, onClick, disabled, isActive = false) => {
            const btn = document.createElement('button');
            btn.className = `pagination-btn ${isActive ? 'active' : ''}`;
            btn.innerHTML = text;
            btn.disabled = disabled;
            btn.onclick = onClick;
            return btn;
        };

        paginationContainer.appendChild(createBtn('&laquo; Anterior', () => { currentPage--; renderResources(); }, currentPage === 1));
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(createBtn(i, () => { currentPage = i; renderResources(); }, false, i === currentPage));
        }
        paginationContainer.appendChild(createBtn('Siguiente &raquo;', () => { currentPage++; renderResources(); }, currentPage === totalPages));
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.cat;
            if(mobileSelect) mobileSelect.value = currentCategory;
            currentPage = 1;
            updateTypeFilterOptions();
            renderResources();
        });
    });

    if (mobileSelect) {
        mobileSelect.addEventListener('change', (e) => {
            document.querySelector(`.repo-tab[data-cat="${e.target.value}"]`)?.click();
        });
    }

    const triggerUpdate = () => { currentPage = 1; renderResources(); };
    searchInput.addEventListener('input', triggerUpdate);
    [typeFilter, yearFilter, orderFilter].forEach(f => f.addEventListener('change', triggerUpdate));

    if(orderFilter.querySelector('option[value="az"]')) orderFilter.value = 'az';
    updateTypeFilterOptions();
    renderResources();
};

/* =========================================
 * 7. ANEXOS
 * ========================================= */
 
const initAnexosDirectory = () => {
    const anexosGrid = document.getElementById('anexos-grid');
    if (!anexosGrid) return;

    const tabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('anexos-search');
    const mobileSelect = document.getElementById('mobile-filter-select');

    let currentFilter = 'todos';

    const renderAnexos = () => {
        if (typeof anexosDB === 'undefined') return;

        const searchText = searchInput.value.toLowerCase();
        const filtered = anexosDB.filter(anexo => {
            const matchFilter = currentFilter === 'todos' || 
                (Array.isArray(anexo.category) ? anexo.category.includes(currentFilter) : anexo.category === currentFilter);
            const matchSearch = !searchText || anexo.title.toLowerCase().includes(searchText) || anexo.number.includes(searchText);
            return matchFilter && matchSearch;
        });

        anexosGrid.textContent = '';
        if (filtered.length === 0) {
            anexosGrid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">No se encontraron anexos.</div>`;
            return;
        }

        filtered.forEach(anexo => {
            const card = document.createElement('div');
            card.className = 'anexo-card';
            card.innerHTML = `
                <div class="anexo-icon">${getEmojiForCategory(anexo.category)}</div>
                <span class="anexo-minititle">${anexo.title}</span>
                <p class="anexo-number">${anexo.number}</p>
            `;
            anexosGrid.appendChild(card);
        });
        
        // Reemplazar emojis con Iconify después de renderizar
        setTimeout(replaceEmojisWithFluent, 10);
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            if (mobileSelect) mobileSelect.value = currentFilter;
            renderAnexos();
        });
    });

    if (mobileSelect) {
        mobileSelect.addEventListener('change', (e) => {
            document.querySelector(`.filter-tab[data-filter="${e.target.value}"]`)?.click();
        });
    }

    searchInput.addEventListener('input', renderAnexos);
    renderAnexos();
};

/* =========================================
 * 8. INDICACIONES
 * ========================================= */
 
const initIndicaciones = () => {
    const listaIndicaciones = document.getElementById('lista-indicaciones');
    if (!listaIndicaciones || typeof indicacionesDB === 'undefined') return;

    const contenidoIndicacion = document.getElementById('contenido-indicacion');
    const tituloIndicacion = document.getElementById('titulo-indicacion');
    const btnCopiar = document.getElementById('btn-copiar');
    const buscadorInput = document.getElementById('buscador-indicaciones');
    const filtrosTabs = document.querySelectorAll('.indicaciones-tab');
    
    let tipoSeleccionado = 'urgencia';
    let indicacionSeleccionada = null;
    
    const seleccionarIndicacion = (id) => {
        indicacionSeleccionada = indicacionesDB.find(ind => ind.id === id);
        document.querySelectorAll('.item-indicacion').forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.id) === id);
        });
        
        tituloIndicacion.textContent = indicacionSeleccionada.titulo;
        contenidoIndicacion.innerHTML = `<pre>${indicacionSeleccionada.contenido}</pre>`;
        btnCopiar.disabled = false;
        btnCopiar.innerHTML = '<iconify-icon icon="fluent-emoji-flat:clipboard" class="fluent-emoji"></iconify-icon> Copiar';
    };

    const filtrarIndicaciones = () => {
        const textoBusqueda = buscadorInput.value.toLowerCase();
        const filtradas = indicacionesDB.filter(ind => 
            ind.tipo === tipoSeleccionado && 
            (ind.titulo.toLowerCase().includes(textoBusqueda) || ind.contenido.toLowerCase().includes(textoBusqueda))
        ).sort((a, b) => a.titulo.localeCompare(b.titulo));

        listaIndicaciones.textContent = '';
        if (filtradas.length === 0) {
            listaIndicaciones.innerHTML = '<div class="lista-vacia">No hay resultados.</div>';
            return;
        }
        
        filtradas.forEach(ind => {
            const item = document.createElement('div');
            item.className = `item-indicacion ${indicacionSeleccionada?.id === ind.id ? 'active' : ''}`;
            item.dataset.id = ind.id;
            item.innerHTML = `<div class="item-icon">📋</div><div class="item-text">${ind.titulo}</div>`;
            item.onclick = () => seleccionarIndicacion(ind.id);
            listaIndicaciones.appendChild(item);
        });
        
        // Reemplazar emojis con Iconify después de renderizar
        setTimeout(replaceEmojisWithFluent, 10);
    };
    
    btnCopiar.onclick = () => {
        if (!indicacionSeleccionada) return;
        navigator.clipboard.writeText(indicacionSeleccionada.contenido).then(() => {
            const original = btnCopiar.innerHTML;
            btnCopiar.innerHTML = '<iconify-icon icon="fluent-emoji-flat:check-mark" class="fluent-emoji"></iconify-icon> ¡Copiado!';
            setTimeout(() => btnCopiar.innerHTML = original, 2000);
        });
    };
    
    filtrosTabs.forEach(tab => {
        tab.onclick = () => {
            filtrosTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            tipoSeleccionado = tab.dataset.tipo;
            indicacionSeleccionada = null;
            tituloIndicacion.textContent = 'Seleccione una indicación';
            contenidoIndicacion.innerHTML = '<div class="detalle-vacio">Seleccione de la lista.</div>';
            btnCopiar.disabled = true;
            filtrarIndicaciones();
        };
    });

    buscadorInput.oninput = filtrarIndicaciones;
    filtrarIndicaciones();
    setTimeout(() => listaIndicaciones.querySelector('.item-indicacion')?.click(), 100);
};

/* =========================================
 * 9. INICIALIZACIÓN GLOBAL
 * ========================================= */

const initApp = () => {
    initSidebarMenu();
    initMegaMenu();
    initRepository();
    initAnexosDirectory();
    initIndicaciones();
    
    // Inicializar reemplazo de emojis (NUEVO)
    initEmojiReplacement();
    
    if (typeof initEasterEgg === 'function') initEasterEgg(); 
};

document.addEventListener('DOMContentLoaded', initApp);
