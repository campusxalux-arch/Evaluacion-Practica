/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GOOGLE APPS SCRIPT - SCRIPT DE SINCRONIZACIÓN
 * 
 * Este script se debe pegar en el editor de extensiones de Google Sheets (Extensiones > Apps Script).
 * Permite leer el banco de preguntas desde Google Docs y escribir los resultados del examen en Google Sheets.
 * 
 * REQUISITOS:
 * 1. Crear un documento de Google Docs con las preguntas.
 * 2. Configurar los IDs de Documento y Hoja de Cálculo en este script.
 * 3. Desplegar como "Aplicación web" con acceso para "Cualquiera" (Anyone).
 */

// CONFIGURACIÓN - REEMPLAZA CON TUS PROPIOS IDS SI ES NECESARIO
const GOOGLE_DOC_URL = "https://docs.google.com/document/d/14-Joj8-p_t9DkgKRb7Og23Xh_XrXDSqd3RZIEwhCOD4/edit";
const GOOGLE_DOC_ID = "14-Joj8-p_t9DkgKRb7Og23Xh_XrXDSqd3RZIEwhCOD4";

/**
 * Función principal para responder a peticiones HTTP GET (Lectura de Preguntas)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === "getQuestions") {
      const questions = fetchQuestionsFromDoc();
      return ContentService.createTextOutput(JSON.stringify(questions))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Si no se especifica acción, retornar estado del servicio
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "online", 
      message: "Servidor de Evaluación Teórica Activo",
      docId: GOOGLE_DOC_ID 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función principal para responder a peticiones HTTP POST (Guardado de Resultados)
 */
function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      throw new Error("No se recibieron datos de formulario.");
    }
    
    const data = JSON.parse(e.postData.contents);
    const result = saveResultsToSheets(data);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: "Resultados guardados con éxito",
      result: result 
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Obtiene e interpreta las preguntas desde un documento de Google Docs
 */
function fetchQuestionsFromDoc() {
  const questions = [];
  
  try {
    const doc = DocumentApp.openById(GOOGLE_DOC_ID);
    const body = doc.getBody();
    const text = body.getText();
    
    // Método 1: Intentar leer de tablas primero si el documento está estructurado como tabla
    const tables = body.getTables();
    if (tables.length > 0) {
      const table = tables[0];
      const numRows = table.getNumberOfRows();
      
      // Asumiendo que la fila 0 es cabecera (Pregunta, Opción A, Opción B, Opción C, Opción D, Correcta)
      for (let i = 1; i < numRows; i++) {
        const row = table.getRow(i);
        if (row.getNumberOfCells() >= 6) {
          const qText = row.getCell(0).getText().trim();
          const opA = row.getCell(1).getText().trim();
          const opB = row.getCell(2).getText().trim();
          const opC = row.getCell(3).getText().trim();
          const opD = row.getCell(4).getText().trim();
          let correctStr = row.getCell(5).getText().trim().toLowerCase();
          
          let correctAnswer = 0;
          if (correctStr.includes("b") || correctStr === "1") correctAnswer = 1;
          else if (correctStr.includes("c") || correctStr === "2") correctAnswer = 2;
          else if (correctStr.includes("d") || correctStr === "3") correctAnswer = 3;
          
          if (qText) {
            questions.push({
              id: i,
              question: qText,
              options: [opA, opB, opC, opD],
              correctAnswer: correctAnswer,
              category: "General"
            });
          }
        }
      }
    }
    
    // Método 2: Si no hay tablas o están vacías, procesar texto plano estructurado
    if (questions.length === 0) {
      const paragraphs = body.getParagraphs();
      let currentQuestion = null;
      let qId = 1;
      
      for (let i = 0; i < paragraphs.length; i++) {
        const pText = paragraphs[i].getText().trim();
        if (!pText) continue;
        
        // Detecta pregunta: comienza con número, ej: "1. ¿Qué..." o "¿Qué..."
        const isQuestionMatch = pText.match(/^(\d+)[\.\s]+(.*)/) || pText.startsWith("¿") || pText.endsWith("?");
        
        if (isQuestionMatch && !pText.match(/^[a-d\)]/i)) {
          // Guardar pregunta anterior
          if (currentQuestion && currentQuestion.options.length >= 2) {
            questions.push(currentQuestion);
          }
          
          let cleanQText = pText;
          const match = pText.match(/^(\d+)[\.\s]+(.*)/);
          if (match) cleanQText = match[2];
          
          currentQuestion = {
            id: qId++,
            question: cleanQText,
            options: [],
            correctAnswer: 0,
            category: "General"
          };
        } else if (currentQuestion) {
          // Detectar opciones: ej. "a) Opción", "b) Opción", "A. Opción" o "*c) Opción"
          const isOptionMatch = pText.match(/^[\*\s]*([a-dA-D])[\.\)\s]+(.*)/);
          if (isOptionMatch) {
            let optionText = isOptionMatch[2].trim();
            const optionLetter = isOptionMatch[1].toLowerCase();
            
            // Si tiene un asterisco al inicio o al final, es la respuesta correcta
            const isCorrect = pText.includes("*") || pText.toLowerCase().includes("(correcta)");
            optionText = optionText.replace(/\*/g, "").replace(/\(correcta\)/gi, "").trim();
            
            currentQuestion.options.push(optionText);
            
            if (isCorrect) {
              currentQuestion.correctAnswer = currentQuestion.options.length - 1;
            }
          }
        }
      }
      
      // Añadir la última pregunta
      if (currentQuestion && currentQuestion.options.length >= 2) {
        questions.push(currentQuestion);
      }
    }
    
  } catch (error) {
    Logger.log("Error al leer Google Doc: " + error);
  }
  
  // Si por alguna razón el documento no se pudo leer o no tiene formato compatible,
  // devolvemos un banco estático predeterminado para que nunca falle la app
  if (questions.length === 0) {
    return getFallbackQuestions();
  }
  
  return questions;
}

/**
 * Guarda los resultados del examen en Google Sheets
 */
function saveResultsToSheets(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Obtener o administrar Hoja 1: "Participante"
  let partSheet = ss.getSheetByName("Participante");
  if (!partSheet) {
    // Si existe una hoja por defecto ("Hoja 1", "Sheet1" o la única hoja existente), la renombramos
    const defaultSheet = ss.getSheetByName("Hoja 1") || ss.getSheetByName("Sheet1") || (ss.getSheets().length === 1 ? ss.getSheets()[0] : null);
    if (defaultSheet) {
      partSheet = defaultSheet;
      partSheet.setName("Participante");
    } else {
      partSheet = ss.insertSheet("Participante");
    }
  }

  // Definir cabeceras oficiales para Hoja 1 "Participante"
  const partHeaders = [
    "FECHA", 
    "HORA", 
    "TIPO IDENTIFICACIÓN", 
    "NÚMERO IDENTIFICACIÓN", 
    "NOMBRE COMPLETO", 
    "EDAD", 
    "EMPRESA", 
    "AÑOS ANTIGÜEDAD", 
    "TIPO LICENCIA", 
    "RESPUESTAS CORRECTAS", 
    "RESPUESTAS INCORRECTAS", 
    "PUNTAJE GLOBAL (%)", 
    "RESULTADO GLOBAL", 
    "TIEMPO EMPLEADO"
  ];

  // Garantizar cabecera en la fila 1 de "Participante"
  if (partSheet.getLastRow() === 0) {
    partSheet.appendRow(partHeaders);
    partSheet.getRange(1, 1, 1, partHeaders.length).setFontWeight("bold").setBackground("#1e3a8a").setFontColor("white");
  } else {
    const valA1 = String(partSheet.getRange(1, 1).getValue()).trim().toUpperCase();
    if (valA1 !== "FECHA") {
      partSheet.insertRowBefore(1);
      partSheet.getRange(1, 1, 1, partHeaders.length).setValues([partHeaders]);
      partSheet.getRange(1, 1, 1, partHeaders.length).setFontWeight("bold").setBackground("#1e3a8a").setFontColor("white");
    }
  }

  // 2. Obtener o administrar Hoja 2: "Resultados"
  let resSheet = ss.getSheetByName("Resultados");
  if (!resSheet) {
    resSheet = ss.insertSheet("Resultados");
  }

  // Definir cabeceras oficiales para Hoja 2 "Resultados"
  const resHeaders = [
    "FECHA", 
    "HORA", 
    "IDENTIFICACIÓN", 
    "NOMBRE COMPLETO", 
    "EMPRESA", 
    "TIPO VEHÍCULO", 
    "BANCO USADO", 
    "PREOPERACIONAL (%)", 
    "CONDUCCIÓN (%)", 
    "PUNTAJE GLOBAL (%)", 
    "DICTAMEN FINAL", 
    "TIEMPO EMPLEADO"
  ];

  // Garantizar cabecera en la fila 1 de "Resultados"
  if (resSheet.getLastRow() === 0) {
    resSheet.appendRow(resHeaders);
    resSheet.getRange(1, 1, 1, resHeaders.length).setFontWeight("bold").setBackground("#0f766e").setFontColor("white");
  }

  // Extraer y sanitizar datos numéricos
  const fecha = data.fecha || new Date().toLocaleDateString("es-CO");
  const hora = data.hora || new Date().toLocaleTimeString("es-CO");
  const correctas = Number(data.correctas) || 0;
  const incorrectas = Number(data.incorrectas) || 0;
  const puntaje = Number(data.puntaje) || 0;
  const edad = Number(data.edad) || 0;
  const antiguedad = Number(data.antiguedad) || 0;

  // Escribir fila limpia en Hoja 1 "Participante"
  partSheet.appendRow([
    fecha,
    hora,
    data.tipoIdentificacion || "",
    data.numeroIdentificacion || data.identificacion || "",
    data.nombreCompleto || data.nombre || "",
    edad,
    data.empresa || "",
    antiguedad,
    data.tipoLicencia || "",
    correctas,
    incorrectas,
    puntaje + "%",
    data.resultado || data.dictamen || "No aprobado",
    data.tiempoEmpleado || "0:00"
  ]);

  // Calcular porcentajes por módulo para Hoja 2 "Resultados"
  let preopTotal = 0, preopCorrect = 0;
  let condTotal = 0, condCorrect = 0;

  if (data.detalles && Array.isArray(data.detalles)) {
    data.detalles.forEach(function(det) {
      const cat = (det.category || "").toLowerCase();
      const isCorrect = det.esCorrecta === true || det.esCorrecta === "SÍ" || det.esCorrecta === "SI" || det.elegida === "Conforme";
      const isNA = det.elegida === "No aplica (N/A)";

      if (!isNA) {
        if (cat.indexOf("preoperacional") !== -1) {
          preopTotal++;
          if (isCorrect) preopCorrect++;
        } else if (cat.indexOf("conducción") !== -1 || cat.indexOf("conduccion") !== -1) {
          condTotal++;
          if (isCorrect) condCorrect++;
        }
      }
    });
  }

  const preopPct = preopTotal > 0 ? Math.round((preopCorrect / preopTotal) * 100) : (data.preoperacionalPct || 0);
  const condPct = condTotal > 0 ? Math.round((condCorrect / condTotal) * 100) : (data.conduccionPct || 0);

  // Escribir fila limpia en Hoja 2 "Resultados"
  resSheet.appendRow([
    fecha,
    hora,
    data.numeroIdentificacion || data.identificacion || "",
    data.nombreCompleto || data.nombre || "",
    data.empresa || "",
    data.tipoLicencia || "",
    data.bancoUsado || (data.tipoLicencia === "Motocicleta" ? "Banco 1" : "Banco 2"),
    preopPct + "%",
    condPct + "%",
    puntaje + "%",
    data.resultado || data.dictamen || "NO APROBADO",
    data.tiempoEmpleado || "0:00"
  ]);

  return {
    participanteAdded: 1,
    resultadosAdded: 1
  };
}

/**
 * Preguntas de contingencia en caso de que falle la lectura del documento
 */
function getFallbackQuestions() {
  return [
    {
      id: 1,
      question: "¿Cuál es el límite de velocidad máximo permitido en zonas escolares?",
      options: ["50 km/h", "30 km/h", "40 km/h", "20 km/h"],
      correctAnswer: 1,
      category: "Límites de velocidad"
    },
    {
      id: 2,
      question: "¿Qué indica una doble línea continua amarilla en el centro de la vía?",
      options: [
        "Adelantamiento permitido en ambas direcciones", 
        "Prohibido adelantar en ambos sentidos", 
        "Carril exclusivo para emergencias", 
        "Estacionamiento permitido"
      ],
      correctAnswer: 1,
      category: "Señalización"
    },
    {
      id: 3,
      question: "¿Cuál es el nivel de alcohol en sangre permitido para conductores de servicio público?",
      options: ["0.3 g/l", "0.5 g/l", "0.0 g/l (Tolerancia Cero)", "0.1 g/l"],
      correctAnswer: 2,
      category: "Leyes y sanciones"
    }
  ];
}
