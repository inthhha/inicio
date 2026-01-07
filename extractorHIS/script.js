// ===== EXTRACTOR DE LABORATORIO - VERSIÓN SIMPLIFICADA =====

let extractor = new SimpleExtractor();
let currentExams = new Map();
let examCounter = 1;
let extractorLab = null;

class ExtractorLabWeb {
    constructor() {
        this.results = '';
        this.activePanel = null;
        this.allSelected = true;
        
        this.initializeElements();
        this.bindEvents();
        this.setupAutoTheme(); // Cambiado a tema automático
        
        // Configuración predeterminada - SOLO los parámetros principales seleccionados
        setTimeout(() => {
            this.setDefaultSelection();
            this.loadSavedSettings(); // Cargar después de establecer defaults
            this.extractFromAllExams();
        }, 100);
    }

    initializeElements() {
        // Botones principales
        this.mainParameterItems = document.querySelectorAll('.main-parameter-item');
        this.detailsButtons = document.querySelectorAll('.details-btn');
        
        // Paneles avanzados
        this.advancedPanelsContainer = document.getElementById('advancedPanelsContainer');
        this.allPanels = document.querySelectorAll('.advanced-panel');
        
        // Checkboxes y formatos
        this.fechaCheckbox = document.getElementById('fechaCheckbox');
        this.formatHb = document.getElementById('formatHb');
        this.formatMayusculas = document.getElementById('formatMayusculas');
        this.formatDosPuntos = document.getElementById('formatDosPuntos');
        this.formatSaltos = document.getElementById('formatSaltos');
        this.dateFormatSelect = document.getElementById('dateFormatSelect');
        
        // Botones de control
        this.selectAllBtn = document.getElementById('selectAllBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.copyHtmlBtn = document.getElementById('copyHtmlBtn');
        this.copySummernoteBtn = document.getElementById('copySummernoteBtn');
        this.addNewExamBtn = document.getElementById('addNewExamBtn');
        this.clearAllExamsBtn = document.getElementById('clearAllExamsBtn');
        
        // Elementos de resultados
        this.resultsContent = document.getElementById('results');
        this.resultsStatus = document.getElementById('resultsStatus');
        this.copyArea = document.getElementById('copyArea');
        this.notification = document.getElementById('notification');
        
        // Examen checkboxes
        this.examCheckboxes = [];
        
        // Botón de fuente
        this.sourceLink = document.getElementById('sourceLink');
        this.chromeExtensionBtn = document.getElementById('chromeExtensionBtn');
    }

    bindEvents() {
        // Eventos de botones de detalles
        this.detailsButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const category = button.getAttribute('data-category');
                this.togglePanel(category, button);
            });
        });

        // Eventos de formatos
        const formatOptions = [this.formatHb, this.formatMayusculas, this.formatDosPuntos, this.formatSaltos, this.dateFormatSelect];
        formatOptions.forEach(option => {
            if (option) option.addEventListener('change', () => {
                this.handleFormatChange();
            });
        });

        // Eventos de checkboxes (se agregan dinámicamente)
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('selection-checkbox')) {
                this.handleCheckboxChange();
            }
        });

        // Eventos de botones de control
        if (this.selectAllBtn) this.selectAllBtn.addEventListener('click', () => this.toggleAllExams());
        if (this.clearAllBtn) this.clearAllBtn.addEventListener('click', () => this.clearAllExams());
        if (this.copyBtn) this.copyBtn.addEventListener('click', () => this.copyResults());
        if (this.copyHtmlBtn) this.copyHtmlBtn.addEventListener('click', () => this.copyResultsHTML());
        if (this.copySummernoteBtn) this.copySummernoteBtn.addEventListener('click', () => this.copyResultsSummernote());
        
        // Eventos de botones de exámenes
        if (this.addNewExamBtn) this.addNewExamBtn.addEventListener('click', agregarNuevoExamen);
        if (this.clearAllExamsBtn) this.clearAllExamsBtn.addEventListener('click', limpiarTodosLosExamenes);
        
        // Cerrar paneles al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.details-btn') && 
                !e.target.closest('.advanced-panel')) {
                this.closeAllPanels();
            }
        });
    }

    // Configurar tema automático basado en preferencias del sistema
    setupAutoTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Función para aplicar el tema
        const applyTheme = (isDark) => {
            if (isDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        };
        
        // Aplicar tema inicial
        applyTheme(prefersDark.matches);
        
        // Escuchar cambios en las preferencias
        prefersDark.addEventListener('change', (e) => {
            applyTheme(e.matches);
        });
    }

    // Nueva función para establecer la selección predeterminada
    setDefaultSelection() {
        // Solo seleccionar los checkboxes principales
        const mainCheckboxes = document.querySelectorAll('.main-checkbox');
        mainCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Deseleccionar TODOS los parámetros avanzados
        const advancedCheckboxes = document.querySelectorAll('.advanced-option input[type="checkbox"]:not(.main-checkbox)');
        advancedCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Deseleccionar también los subopciones de renal (VFG, Urea, etc.)
        const renalSuboptions = document.querySelectorAll('.advanced-suboption input[type="checkbox"]');
        renalSuboptions.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Fecha siempre seleccionada por defecto
        if (this.fechaCheckbox) {
            this.fechaCheckbox.checked = true;
        }
        
        this.collectCheckboxes();
        this.updateSelectAllButton();
    }

    togglePanel(category, button) {
        const panelId = `panel-${category}`;
        const panel = document.getElementById(panelId);
        
        if (this.activePanel === panel) {
            // Si ya está abierto, cerrarlo
            this.closeAllPanels();
            return;
        }
        
        // Cerrar panel activo
        this.closeAllPanels();
        
        // Mostrar el nuevo panel
        if (panel) {
            panel.style.display = 'block';
            button.classList.add('active');
            button.closest('.main-parameter-item').classList.add('active');
            this.activePanel = panel;
            
            // Recopilar checkboxes del panel
            this.collectCheckboxes();
            
            // Asegurar que el panel sea visible
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    closeAllPanels() {
        // Ocultar todos los paneles
        this.allPanels.forEach(panel => {
            panel.style.display = 'none';
        });
        
        // Remover clase active de todos los botones
        this.detailsButtons.forEach(button => {
            button.classList.remove('active');
            button.closest('.main-parameter-item').classList.remove('active');
        });
        
        this.activePanel = null;
    }

    collectCheckboxes() {
        // Incluir TODOS los checkboxes: principales, avanzados y subopciones
        this.examCheckboxes = Array.from(document.querySelectorAll('.selection-checkbox'));
    }

    handleCheckboxChange() {
        this.saveSettings();
        this.updateSelectAllButton();
        this.extractFromAllExams();
    }

    handleFormatChange() {
        this.saveSettings();
        this.extractFromAllExams();
    }

    updateSelectAllButton() {
        this.collectCheckboxes();
        const allChecked = this.examCheckboxes.length > 0 && 
                          this.examCheckboxes.every(cb => cb.checked);
        
        if (allChecked) {
            this.selectAllBtn.innerHTML = 'Deseleccionar Todo';
            this.allSelected = true;
        } else {
            this.selectAllBtn.innerHTML = 'Seleccionar Todo';
            this.allSelected = false;
        }
    }

    toggleAllExams() {
        this.collectCheckboxes();
        const shouldSelect = !this.allSelected;
        
        this.examCheckboxes.forEach(cb => {
            cb.checked = shouldSelect;
        });
        
        this.allSelected = shouldSelect;
        this.saveSettings();
        this.updateSelectAllButton();
        this.extractFromAllExams();
        
        const action = shouldSelect ? 'seleccionados' : 'deseleccionados';
        this.showNotification(`Todos los parámetros ${action}`, 'success');
    }

    clearAllExams() {
        this.collectCheckboxes();
        this.examCheckboxes.forEach(cb => cb.checked = false);
        this.allSelected = false;
        this.saveSettings();
        this.updateSelectAllButton();
        this.showResultsPlaceholder('Selecciona los parámetros que deseas extraer');
        this.showNotification('Selección borrada', 'info');
    }

    getSelectedExams() {
        this.collectCheckboxes();
        return this.examCheckboxes
            .filter(cb => cb.checked)
            .map(cb => cb.value);
    }

    getFormatOptions() {
        return {
            usarDosPuntos: this.formatDosPuntos ? this.formatDosPuntos.checked : true,
            usarMayusculas: this.formatMayusculas ? this.formatMayusculas.checked : false,
            usarSaltosLinea: this.formatSaltos ? this.formatSaltos.checked : true,
            usarHb: this.formatHb ? this.formatHb.checked : true,
            dateFormat: this.dateFormatSelect ? this.dateFormatSelect.value : 'dd/mm/yyyy'
        };
    }

    mapExamToExtractor(exam) {
        const mapping = {
            'Fecha': 'Fecha',
            'Hemograma': 'Hemograma',
            'Hcto': 'Hcto',
            'VCM': 'VCM',
            'CHCM': 'CHCM',
            'RDW': 'RDW',
            'Reticulocitos': 'Reticulocitos',
            'Linfocitos': 'Linfocitos',
            'RAN': 'RAN',
            'RAL': 'RAL',
            'PCR': 'PCR',
            'Renal': 'Renal',
            'VFG': 'VFG',
            'Urea': 'Urea',
            'Electrolitos': 'Electrolitos',
            'Magnesio': 'Magnesio',
            'AcidoUrico': 'AcidoUrico',
            'Ácido Úrico': 'AcidoUrico',
            'Hepático': 'Hepatico',
            'Coagulación': 'Coagulacion',
            'INR': 'INR',
            'TP': 'TP',
            'Gases': 'Gases',
            'Nutricional': 'Nutricional',
            'Proteínas': 'Proteinas',
            'Lípidos': 'Lipidos',
            'Bioquímico': 'Bioquimico'
        };
        
        return mapping[exam] || exam;
    }

    extractFromAllExams() {
        const textosExamenes = obtenerTextosExamenes();
        const exams = this.getSelectedExams();
        const formatOptions = this.getFormatOptions();
        
        if (textosExamenes.length === 0) {
            this.showResultsPlaceholder('Pega el texto de al menos un examen para continuar');
            return;
        }

        if (exams.length === 0 || (exams.length === 1 && exams[0] === 'Fecha')) {
            this.showResultsPlaceholder('Selecciona al menos un examen para extraer');
            return;
        }

        try {
            extractor.setFormatOptions(formatOptions);
            
            // Agregar fecha si está seleccionada
            let extractorParams = [];
            if (this.fechaCheckbox && this.fechaCheckbox.checked) {
                extractorParams.push('Fecha');
            }
            
            // Para Bioquímico, necesitamos incluir PCR, Renal y Hepático
            exams.forEach(exam => {
                const mapped = this.mapExamToExtractor(exam);
                if (mapped) {
                    if (mapped === 'Bioquimico') {
                        // Si se selecciona Bioquímico, incluir sus componentes por defecto
                        if (!extractorParams.includes('PCR')) extractorParams.push('PCR');
                        if (!extractorParams.includes('Renal')) extractorParams.push('Renal');
                        if (!extractorParams.includes('Hepatico')) extractorParams.push('Hepatico');
                    } else if (!extractorParams.includes(mapped)) {
                        extractorParams.push(mapped);
                    }
                }
            });
            
            let resultadosFinales = [];
            
            textosExamenes.forEach(examen => {
                const resultado = extractor.procesar(examen.texto, extractorParams);
                
                if (resultado && resultado.trim()) {
                    if (textosExamenes.length > 1) {
                        resultadosFinales.push(`=== EXAMEN #${examen.id} ===\n${resultado}`);
                    } else {
                        resultadosFinales.push(resultado);
                    }
                } else {
                    if (textosExamenes.length > 1) {
                        resultadosFinales.push(`=== EXAMEN #${examen.id} ===\nNo se encontraron datos`);
                    }
                }
            });

            if (resultadosFinales.length > 0) {
                const resultadoFinal = resultadosFinales.join('\n\n');
                this.showResults(resultadoFinal);
            } else {
                this.showResultsPlaceholder('No se encontraron datos en ningún examen');
            }
        } catch (error) {
            console.error('Error procesando texto:', error);
            this.showResultsPlaceholder('Error al procesar el texto');
        }
    }

    showResults(result) {
        this.results = result;
        
        if (this.resultsStatus) this.resultsStatus.style.display = 'none';
        if (this.resultsContent) {
            this.resultsContent.style.display = 'block';
            this.resultsContent.textContent = result;
            this.resultsContent.setAttribute('data-original-text', result);
        }
        if (this.copyArea) this.copyArea.style.display = 'flex';
    }

    showResultsPlaceholder(message) {
        if (this.resultsStatus) {
            this.resultsStatus.style.display = 'block';
            const statusText = this.resultsStatus.querySelector('.status-text');
            if (statusText) statusText.textContent = message;
        }
        if (this.resultsContent) {
            this.resultsContent.style.display = 'none';
        }
        if (this.copyArea) {
            this.copyArea.style.display = 'none';
        }
        this.results = '';
    }

    async copyResults() {
        if (!this.results) {
            this.showNotification('No hay resultados para copiar', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(this.results);
            this.showNotification('Resultados copiados al portapapeles', 'success');
        } catch (error) {
            console.error('Error copiando resultados:', error);
            this.showNotification('Error al copiar resultados', 'error');
        }
    }

    async copyResultsHTML() {
        if (!this.results) {
            this.showNotification('No hay resultados para copiar', 'error');
            return;
        }

        const htmlResult = this.results.replace(/\n/g, '<br>');
        const htmlWithP = `<p>${htmlResult}</p>`;

        try {
            if (navigator.clipboard.write) {
                const clipboardItem = new ClipboardItem({
                    'text/html': new Blob([htmlWithP], { type: 'text/html' }),
                    'text/plain': new Blob([this.results], { type: 'text/plain' })
                });

                await navigator.clipboard.write([clipboardItem]);
                this.showNotification('HTML copiado al portapapeles', 'success');
            } else {
                await navigator.clipboard.writeText(this.results);
                this.showNotification('Resultados copiados como texto', 'info');
            }
        } catch (error) {
            console.error('Error copiando HTML:', error);
            this.showNotification('Error al copiar HTML', 'error');
        }
    }

    async copyResultsSummernote() {
        if (!this.results) {
            this.showNotification('No hay resultados para copiar', 'error');
            return;
        }

        const lines = this.results.split('\n');
        let htmlContent = '';

        if (lines.length > 0) {
            if (lines[0] && lines[0].trim()) {
                htmlContent += `<p><strong>${lines[0].trim()}</strong></p>`;
            }

            const remainingLines = lines.slice(1).filter(line => line.trim());
            if (remainingLines.length > 0) {
                htmlContent += `<p>${remainingLines.join('<br>')}</p>`;
            }
        }

        try {
            await navigator.clipboard.writeText(htmlContent);
            this.showNotification('HTML para Summernote copiado', 'success');
        } catch (error) {
            console.error('Error copiando para Summernote:', error);
            this.showNotification('Error al copiar para Summernote', 'error');
        }
    }

    showNotification(message, type = 'info') {
        if (!this.notification) return;
        
        this.notification.textContent = message;
        this.notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }

    saveSettings() {
        const settings = {
            formatHb: this.formatHb ? this.formatHb.checked : true,
            formatMayusculas: this.formatMayusculas ? this.formatMayusculas.checked : false,
            formatDosPuntos: this.formatDosPuntos ? this.formatDosPuntos.checked : true,
            formatSaltos: this.formatSaltos ? this.formatSaltos.checked : true,
            dateFormat: this.dateFormatSelect ? this.dateFormatSelect.value : 'dd/mm/yyyy',
            allSelected: this.allSelected
        };

        const examStates = {};
        this.examCheckboxes.forEach(cb => {
            examStates[cb.value] = cb.checked;
        });

        localStorage.setItem('extractorLabSettings', JSON.stringify(settings));
        localStorage.setItem('extractorLabExamStates', JSON.stringify(examStates));
    }

    loadSavedSettings() {
        try {
            const savedSettings = localStorage.getItem('extractorLabSettings');
            const savedExamStates = localStorage.getItem('extractorLabExamStates');
            
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                
                if (this.formatHb) this.formatHb.checked = settings.formatHb !== false;
                if (this.formatMayusculas) this.formatMayusculas.checked = settings.formatMayusculas || false;
                if (this.formatDosPuntos) this.formatDosPuntos.checked = settings.formatDosPuntos !== false;
                if (this.formatSaltos) this.formatSaltos.checked = settings.formatSaltos !== false;
                if (this.dateFormatSelect && settings.dateFormat) this.dateFormatSelect.value = settings.dateFormat;
                if (this.fechaCheckbox) this.fechaCheckbox.checked = settings.formatFecha !== false;
                
                this.allSelected = settings.allSelected !== false;
            }

            // Cargar estados de checkboxes
            this.collectCheckboxes();
            if (savedExamStates) {
                const examStates = JSON.parse(savedExamStates);
                this.examCheckboxes.forEach(cb => {
                    if (examStates[cb.value] !== undefined) {
                        cb.checked = examStates[cb.value];
                    }
                });
            }
            
            this.updateSelectAllButton();
        } catch (error) {
            console.error('Error cargando configuraciones:', error);
        }
    }
}

// ===== FUNCIONES PARA MÚLTIPLES EXÁMENES =====

function obtenerTextosExamenes() {
    const textosExamenes = [];
    currentExams.forEach((texto, examId) => {
        if (texto.trim()) {
            textosExamenes.push({ id: examId, texto });
        }
    });
    return textosExamenes;
}

function agregarNuevoExamen() {
    examCounter++;
    const examId = examCounter;

    const examItem = document.createElement('div');
    examItem.className = 'exam-item';
    examItem.setAttribute('data-exam-id', examId);

    examItem.innerHTML = `
        <div class="exam-header">
            <span class="exam-title">Examen #${examId}</span>
            <div class="exam-controls">
                <button class="exam-paste-btn" title="Pegar texto">
                    <span class="btn-icon">📋</span>
                </button>
                <button class="exam-clear-btn" title="Limpiar texto">
                    <span class="btn-icon">🗑️</span>
                </button>
                <button class="exam-remove-btn" title="Eliminar examen">
                    <span class="btn-icon">✕</span>
                </button>
            </div>
        </div>
        <div class="exam-input">
            <textarea class="exam-textarea" 
                    placeholder="1. En la página pdf del examen presiona: Ctrl + A para seleccionar todo el texto&#10;2. Copia el texto mediante: Ctrl + C&#10;3. Pega el texto aquí mediante: Ctrl + V"></textarea>
        </div>
    `;

    const examsContainer = document.getElementById('examsContainer');
    examsContainer.appendChild(examItem);

    setupExamEventListeners(examItem, examId);
    updateRemoveButtons();

    const textarea = examItem.querySelector('.exam-textarea');
    textarea.focus();

    currentExams.set(examId, '');

    if (extractorLab) {
        extractorLab.showNotification(`Examen #${examId} agregado`, 'success');
    }
}

function setupExamEventListeners(examItem, examId) {
    const textarea = examItem.querySelector('.exam-textarea');
    const pasteBtn = examItem.querySelector('.exam-paste-btn');
    const clearBtn = examItem.querySelector('.exam-clear-btn');
    const removeBtn = examItem.querySelector('.exam-remove-btn');

    let extractTimeout;
    textarea.addEventListener('input', function () {
        const texto = this.value.trim();
        currentExams.set(examId, texto);

        clearTimeout(extractTimeout);
        extractTimeout = setTimeout(() => {
            if (extractorLab) {
                extractorLab.extractFromAllExams();
            }
        }, 300);
    });

    textarea.addEventListener('paste', function () {
        setTimeout(() => {
            currentExams.set(examId, this.value.trim());
            if (extractorLab) {
                extractorLab.extractFromAllExams();
            }
        }, 100);
    });

    pasteBtn.addEventListener('click', function () {
        pegarTextoEnExamen(examId, textarea);
    });

    clearBtn.addEventListener('click', function () {
        limpiarTextoExamen(examId, textarea);
    });

    removeBtn.addEventListener('click', function () {
        eliminarExamen(examId, examItem);
    });
}

function pegarTextoEnExamen(examId, textarea) {
    if (!navigator.clipboard) {
        if (extractorLab) extractorLab.showNotification('Tu navegador no soporta la funcionalidad de portapapeles', 'error');
        return;
    }

    navigator.clipboard.readText()
        .then(text => {
            if (text.trim()) {
                textarea.value = text;
                currentExams.set(examId, text.trim());
                if (extractorLab) {
                    extractorLab.extractFromAllExams();
                    extractorLab.showNotification(`Texto pegado en Examen #${examId}`, 'success');
                }
            } else {
                if (extractorLab) extractorLab.showNotification('El portapapeles está vacío', 'error');
            }
        })
        .catch(err => {
            console.error('Error al leer del portapapeles:', err);
            if (extractorLab) extractorLab.showNotification('No se pudo acceder al portapapeles', 'error');
        });
}

function limpiarTextoExamen(examId, textarea) {
    textarea.value = '';
    currentExams.set(examId, '');
    if (extractorLab) {
        extractorLab.extractFromAllExams();
        extractorLab.showNotification(`Examen #${examId} limpiado`, 'info');
    }
}

function eliminarExamen(examId, examItem) {
    examItem.remove();
    currentExams.delete(examId);
    updateRemoveButtons();
    if (extractorLab) {
        extractorLab.extractFromAllExams();
        extractorLab.showNotification(`Examen #${examId} eliminado`, 'info');
    }
}

function updateRemoveButtons() {
    const examItems = document.querySelectorAll('.exam-item');
    const showRemoveButtons = examItems.length > 1;

    examItems.forEach(item => {
        const removeBtn = item.querySelector('.exam-remove-btn');
        removeBtn.style.display = showRemoveButtons ? 'flex' : 'none';
    });
}

function limpiarTodosLosExamenes() {
    const examItems = document.querySelectorAll('.exam-item');

    if (examItems.length === 0) {
        if (extractorLab) extractorLab.showNotification('No hay exámenes para limpiar', 'error');
        return;
    }

    examItems.forEach((item, index) => {
        if (index === 0) {
            const textarea = item.querySelector('.exam-textarea');
            textarea.value = '';
            const examId = parseInt(item.getAttribute('data-exam-id'));
            currentExams.set(examId, '');
        } else {
            const examId = parseInt(item.getAttribute('data-exam-id'));
            currentExams.delete(examId);
            item.remove();
        }
    });

    updateRemoveButtons();
    if (extractorLab) {
        extractorLab.extractFromAllExams();
        extractorLab.showNotification('Todos los exámenes limpiados', 'info');
    }
}

// ===== INICIALIZACIÓN =====

document.addEventListener('DOMContentLoaded', function () {
    extractorLab = new ExtractorLabWeb();
    
    // Configurar primer examen
    const firstExamItem = document.querySelector('.exam-item[data-exam-id="1"]');
    if (firstExamItem) {
        setupExamEventListeners(firstExamItem, 1);
        currentExams.set(1, '');
    }
    
    // Ejecutar extracción inicial
    extractorLab.extractFromAllExams();
});
