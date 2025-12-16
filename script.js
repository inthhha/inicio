/**
 * ============================================================================
 * SCRIPT PRINCIPAL - GESTOR DE INTERFAZ
 * ============================================================================
 * 1. Configuración y Constantes
 * 2. Funciones de Utilidad (Helpers)
 * 3. Módulo: Menú Lateral (Sidebar)
 * 4. Módulo: Mega Menú (Toolbar)
 * 5. Módulo: Repositorio (Filtros y Paginación)
 * 6. Módulo: Anexos (Directorio)
 * 7. Inicialización Global
 * ============================================================================
 */

// =========================================
// 1. Configuración y Constantes
// =========================================

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
        'apunte': 'Resumenes', 'manual': 'Manual', 'libro': 'Libro', 'protocolo': 'Protocolo', 'guia': 'Guía', 
        'becados': 'Becados', 'RCP': 'RCP/Urgencias', 'link': 'Enlace Web'
    
    },
    anexoEmojis: {
        'laboratorio': '🧪', 'imagenologia': '🩻', 'farmacia-inmunizaciones': '💊',
        'qyf': '👩‍🔬', 'dialisis': '🩸', 'secretarias': '📞', 'sua': '🚨',
        'policlinicos': '🏥', 'cardiologia': '❤️', 'medico': '👨‍⚕️', 'quirurgico': '🩺'
    }
};

// Generador de cache de iconos locales
const localIcons = {};
[
    'hhha', 'ssasur', 'lab', 'test', 'synapse', 'ray', 'pathient', 'onco',
    'sangre', 'inthhha', 'otros', 'firma', 'bacteria', 'urgencia', 'tmt',
    'farmaco', 'embarazo', 'phone'
].forEach(icon => {
    localIcons[icon] = `${CONFIG.imgBasePath}${icon}.png`;
});

// =========================================
// 2. Funciones de Utilidad (Helpers)
// =========================================

/**
 * Crea un elemento DOM para un icono.
 * Intenta cargar una imagen y si falla, muestra texto (fallback).
 */
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

/**
 * Obtiene el emoji correspondiente a una categoría de anexos.
 */
const getEmojiForCategory = (category) => {
    const catKey = Array.isArray(category) ? category[0] : category;
    return CONFIG.anexoEmojis[catKey] || '📞';
};

// =========================================
// 3. Módulo: Menú Lateral (Sidebar)
// =========================================

const initSidebarMenu = () => {
    const menuContainer = document.getElementById('menu-container');
    
    if (!menuContainer) return; // Salir si no existe el contenedor en esta página
    if (typeof menuStructure === 'undefined') {
        console.error("Error: menuStructure no definido. Carga js/menuStructure.js");
        return;
    }

    menuContainer.innerHTML = '';

    menuStructure.forEach(item => {
        // Caso 1: Separador
        if (item.separator) {
            const separator = document.createElement('div');
            separator.className = 'separator-hhha with-text';
            separator.innerHTML = `<div class="separator-text-hhha">${item.separator}</div>`;
            menuContainer.appendChild(separator);
            return;
        }

        // Caso 2: Ítem con Submenú
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

            // Lógica de acordeón
            mainItem.addEventListener('click', (e) => {
                e.preventDefault();
                // Cerrar otros abiertos
                document.querySelectorAll('.submenu-hhha.open, .sidebar-item-hhha.open').forEach(el => {
                    if (el !== submenuContainer && el !== mainItem) el.classList.remove('open');
                });
                submenuContainer.classList.toggle('open');
                mainItem.classList.toggle('open');
            });

            menuContainer.append(mainItem, submenuContainer);
        } 
        // Caso 3: Enlace directo
        else {
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

// =========================================
// 4. Módulo: Mega Menú (Toolbar)
// =========================================

const initMegaMenu = () => {
    const toolbarRoot = document.getElementById('toolbar-menu-root');
    const headerContainer = document.querySelector('.main-header-container');

    if (!toolbarRoot || !headerContainer) return;
    if (typeof megaStructure === 'undefined') {
        console.warn("megaStructure no definido. El menú superior no se cargará.");
        return;
    }

    // Limpieza previa
    toolbarRoot.innerHTML = '';
    document.querySelector('.megamenu-panel')?.remove();
    document.querySelector('.megamenu-overlay')?.remove();

    // Crear Estructura DOM
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

    // Helper interno
    const renderIcon = (obj) => obj.img ? `<img src="${obj.img}" alt="icon" class="mega-custom-icon">` : (obj.icon || '');

    const closePanel = () => {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelectorAll('.megamenu-tab').forEach(t => t.classList.remove('active'));
        activeTabId = null;
    };

    const openPanel = (tabData) => {
        const contentContainer = panel.querySelector('.megamenu-content');
        contentContainer.innerHTML = '';

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
                
                if (item.url && item.url !== '#' && !item.url.startsWith('javascript')) {
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

    // Generar Tabs
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

    // --- AJUSTES DE CÓDIGO PARA SMARTPHONE ---
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = tabsContainer.classList.contains('show-mobile');
            
            // Toggle clase
            if (isOpen) {
                tabsContainer.classList.remove('show-mobile');
                mobileToggle.querySelector('span').innerHTML = '☰';
            } else {
                tabsContainer.classList.add('show-mobile');
                mobileToggle.querySelector('span').innerHTML = '&#10005;'; // X bonita
            }
        });

        // Cerrar menú automáticamente al hacer click en una opción del menú
        const tabButtons = tabsContainer.querySelectorAll('.megamenu-tab');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabsContainer.classList.remove('show-mobile');
                mobileToggle.querySelector('span').innerHTML = '☰';
            });
        });
    }
    // Event Listeners Globales
    overlay.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });
};

// =========================================
// 5. Módulo: Repositorio (Filtros y Paginación)
// =========================================

const initRepository = () => {
    const resultsContainer = document.getElementById('repo-results');
    if (!resultsContainer) return;

    const tabs = document.querySelectorAll('.repo-tab');
    const searchInput = document.getElementById('repo-search');
    const typeFilter = document.getElementById('filter-type');
    const yearFilter = document.getElementById('filter-year');
    const orderFilter = document.getElementById('filter-order');
    const paginationContainer = document.getElementById('repo-pagination');
    const searchBtn = document.querySelector('.repo-search-btn');
    const mobileSelect = document.getElementById('mobile-repo-category');

    // Estado local
    let currentCategory = 'cirugia';
    let currentPage = 1;

    // Métodos Auxiliares
    const updateTypeFilterOptions = () => {
        const currentValue = typeFilter.value;
        typeFilter.innerHTML = '<option value="">Todos los tipos</option>';
        
        const types = CONFIG.repoCategoryTypes[currentCategory] || [];
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = CONFIG.repoTypeLabels[type] || type;
            typeFilter.appendChild(option);
        });

        typeFilter.value = types.includes(currentValue) ? currentValue : '';
    };

    const renderPagination = (totalItems) => {
        if (!paginationContainer) return;
        
        const totalPages = Math.ceil(totalItems / CONFIG.repoItemsPerPage);
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        const createBtn = (text, onClick, disabled, isActive = false) => {
            const btn = document.createElement('button');
            btn.className = `pagination-btn ${isActive ? 'active' : ''}`;
            btn.innerHTML = text;
            btn.disabled = disabled;
            btn.addEventListener('click', onClick);
            return btn;
        };

        paginationContainer.appendChild(createBtn('&laquo; Anterior', () => {
            currentPage--;
            renderResources();
        }, currentPage === 1));

        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(createBtn(i, () => {
                currentPage = i;
                renderResources();
            }, false, i === currentPage));
        }

        paginationContainer.appendChild(createBtn('Siguiente &raquo;', () => {
            currentPage++;
            renderResources();
        }, currentPage === totalPages));

        const info = document.createElement('span');
        info.className = 'pagination-info';
        info.textContent = `Página ${currentPage} de ${totalPages} (${totalItems} docs)`;
        paginationContainer.appendChild(info);
    };

    // --- FUNCIÓN RENDER PRINCIPAL (CORREGIDA) ---
    const renderResources = () => {
        if (typeof resourcesDB === 'undefined') {
            resultsContainer.innerHTML = '<div class="error">Error: resourcesDB no cargada.</div>';
            return;
        }

        // 1. Filtrado
        const searchText = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        const selectedYear = yearFilter.value;
        const selectedOrder = orderFilter.value;

        let filtered = resourcesDB.filter(item => {
            return item.category === currentCategory &&
                   item.title.toLowerCase().includes(searchText) &&
                   (!selectedType || item.type === selectedType) &&
                   (!selectedYear || item.year === selectedYear);
        });

        // 2. Ordenamiento (MODIFICADO: A-Z por defecto)
        if (selectedOrder === 'year' || selectedOrder === 'recent') {
            // Ordenar por año (descendente)
            filtered.sort((a, b) => {
                const yearA = isNaN(a.year) ? -1 : parseInt(a.year);
                const yearB = isNaN(b.year) ? -1 : parseInt(b.year);
                return yearB - yearA;
            });
        } else {
            // POR DEFECTO: Orden Alfabético (A-Z)
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        // 3. Paginación
        const totalPages = Math.ceil(filtered.length / CONFIG.repoItemsPerPage);
        if (currentPage > totalPages) currentPage = 1;
        
        const start = (currentPage - 1) * CONFIG.repoItemsPerPage;
        const itemsToShow = filtered.slice(start, start + CONFIG.repoItemsPerPage);

        // 4. Renderizado DOM
        resultsContainer.innerHTML = '';
        if (itemsToShow.length === 0) {
            resultsContainer.innerHTML = `
                <div class="repo-empty-state">
                    No hay documentos para <strong>${currentCategory.toUpperCase()}</strong> con estos filtros.
                </div>`;
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

    // --- EVENT LISTENERS ---

    // 1. Tabs de Categoría (Escritorio)
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Actualizar variables
            currentCategory = tab.dataset.cat;
            
            // Sincronizar visualmente el Select Móvil
            if(mobileSelect) mobileSelect.value = currentCategory;

            currentPage = 1;
            updateTypeFilterOptions();
            renderResources();
        });
    });

    // 2. Select de Categoría (Móvil)
    if (mobileSelect) {
        mobileSelect.addEventListener('change', (e) => {
            const selectedCat = e.target.value;
            // Buscar el botón correspondiente y simular click
            const targetTab = document.querySelector(`.repo-tab[data-cat="${selectedCat}"]`);
            if (targetTab) {
                targetTab.click();
            }
        });
    }

    // 3. Filtros y Búsqueda
    const triggerUpdate = () => { currentPage = 1; renderResources(); };

    searchInput.addEventListener('input', triggerUpdate);
    searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') triggerUpdate(); });
    if(searchBtn) searchBtn.addEventListener('click', triggerUpdate);
    
    typeFilter.addEventListener('change', triggerUpdate);
    yearFilter.addEventListener('change', triggerUpdate);
    orderFilter.addEventListener('change', triggerUpdate);

    // Inicialización
    if(orderFilter.querySelector('option[value="az"]')) {
        orderFilter.value = 'az'; 
    }
    
    updateTypeFilterOptions();
    renderResources();
};

// =========================================
// 6. Módulo: Anexos (Directorio)
// =========================================

const initAnexosDirectory = () => {
    const anexosGrid = document.getElementById('anexos-grid');
    if (!anexosGrid) return; // Solo ejecutar si existe el contenedor

    const tabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('anexos-search');
    const searchBtn = document.querySelector('.search-btn');

    let currentFilter = 'todos';

    const renderAnexos = () => {
        if (typeof anexosDB === 'undefined') {
            anexosGrid.innerHTML = 'Error: anexosDB no cargada.';
            return;
        }

        const searchText = searchInput.value.toLowerCase();
        
        const filtered = anexosDB.filter(anexo => {
            const matchFilter = currentFilter === 'todos' || 
                (Array.isArray(anexo.category) ? anexo.category.includes(currentFilter) : anexo.category === currentFilter);
            
            const matchSearch = !searchText || 
                anexo.title.toLowerCase().includes(searchText) || 
                anexo.number.includes(searchText);

            return matchFilter && matchSearch;
        });

        anexosGrid.innerHTML = '';

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
    };

    // Event Listeners
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            renderAnexos();
        });
    });

    const performSearch = () => renderAnexos();
    
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') performSearch(); });
    if(searchBtn) searchBtn.addEventListener('click', performSearch);

    renderAnexos();
};

// =========================================
// 7. Inicialización Global
// =========================================

const initApp = () => {
    console.log('Iniciando Aplicación HHHA...');
    initSidebarMenu();
    initMegaMenu();
    initRepository();
    initAnexosDirectory();
};

document.addEventListener('DOMContentLoaded', initApp);
