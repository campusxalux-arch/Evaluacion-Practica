/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ExamResultPayload {
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombreCompleto: string;
  edad?: number | string;
  empresa: string;
  antiguedad?: number | string;
  tipoLicencia: string;
  bancoUsado?: string;
  conformeCount?: number;
  noConformeCount?: number;
  noAplicaCount?: number;
  totalEvaluadas?: number;
  correctas: number;
  incorrectas: number;
  puntaje: number;
  resultado: string;
  tiempoEmpleado: string;
  detalles?: Array<{
    pregunta: string;
    elegida: string;
    esCorrecta?: boolean;
  }>;
}

/**
 * Parses spreadsheet ID from a Google Sheet URL or returns the input if it's already an ID.
 */
export function extractSpreadsheetId(urlOrId: string): string {
  if (!urlOrId) return "";
  const match = urlOrId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : urlOrId.trim();
}

/**
 * Helper to determine the block index for a question detail
 */
function getBlockFromDetail(det: any): number {
  const qId = det.preguntaId || 0;
  if (qId >= 1 && qId <= 54) return 1;
  if (qId >= 55 && qId <= 108) return 2;
  if (qId >= 109 && qId <= 147) return 3;

  const cat = (det.category || "").toLowerCase();
  if (cat.includes("mecánica") || cat.includes("mecanica") || cat.includes("bloque 1")) return 1;
  if (cat.includes("situación") || cat.includes("situacion") || cat.includes("vial") || cat.includes("bloque 2")) return 2;
  return 3;
}

/**
 * Writes exam results directly to Google Sheets using the Sheets API.
 * Ensures sheets "Participante" and "Resultados" exist, creating them if necessary.
 * 
 * Hoja 1 "Participante": Datos de registro + resultado global de examen (Aprobado/No aprobado).
 * Hoja 2 "Resultados": Datos del participante + porcentaje por módulo + resultado global.
 */
export async function writeResultsToSheets(
  spreadsheetId: string,
  accessToken: string,
  data: ExamResultPayload
): Promise<{ success: boolean; message: string; details?: any }> {
  const parsedSpreadsheetId = extractSpreadsheetId(spreadsheetId);
  if (!parsedSpreadsheetId) {
    throw new Error("ID de Google Sheet inválido.");
  }

  const now = new Date();
  const fecha = now.toLocaleDateString("es-CO", { timeZone: "America/Bogota" });
  const hora = now.toLocaleTimeString("es-CO", { timeZone: "America/Bogota" });

  const headers = {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    // Step 1: Fetch spreadsheet metadata to check existing sheets
    const metaRes = await fetch(
      `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}`,
      { headers }
    );

    if (!metaRes.ok) {
      const errText = await metaRes.text();
      throw new Error(`No se pudo acceder a la hoja de cálculo: ${errText}`);
    }

    const meta = await metaRes.json();
    const sheetNames = (meta.sheets || []).map((s: any) => s.properties.title);

    const hasParticipante = sheetNames.includes("Participante");
    const hasResultados = sheetNames.includes("Resultados");

    // Step 2: Create sheets if missing
    const requests: any[] = [];
    if (!hasParticipante) {
      requests.push({
        addSheet: {
          properties: { title: "Participante" }
        }
      });
    }
    if (!hasResultados) {
      requests.push({
        addSheet: {
          properties: { title: "Resultados" }
        }
      });
    }

    if (requests.length > 0) {
      console.log("[Sheets] Creando pestañas requeridas ('Participante', 'Resultados')...");
      const createRes = await fetch(
        `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}:batchUpdate`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ requests })
        }
      );

      if (!createRes.ok) {
        console.warn("[Sheets] Advertencia al crear pestañas:", await createRes.text());
      }
    }

    // Step 3: Check if headers exist or if row 1 is empty in "Participante"
    const partHeadCheck = await fetch(
      `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Participante!A1:N1`,
      { headers }
    );
    const partHeadData = partHeadCheck.ok ? await partHeadCheck.json() : null;
    if (!partHeadData || !partHeadData.values || partHeadData.values.length === 0) {
      await fetch(
        `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Participante!A1:N1?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            values: [[
              "FECHA", 
              "HORA", 
              "TIPO IDENTIFICACIÓN", 
              "NÚMERO IDENTIFICACIÓN", 
              "NOMBRE COMPLETO", 
              "EMPRESA", 
              "TIPO LICENCIA", 
              "RESPUESTAS CORRECTAS", 
              "RESPUESTAS INCORRECTAS", 
              "PUNTAJE GLOBAL (%)", 
              "RESULTADO GLOBAL", 
              "TIEMPO EMPLEADO"
            ]]
          })
        }
      );
    }

    // Step 4: Check if headers exist or if row 1 is empty in "Resultados"
    const resHeadCheck = await fetch(
      `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Resultados!A1:N1`,
      { headers }
    );
    const resHeadData = resHeadCheck.ok ? await resHeadCheck.json() : null;
    if (!resHeadData || !resHeadData.values || resHeadData.values.length === 0) {
      await fetch(
        `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Resultados!A1:N1?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            values: [[
              "FECHA", 
              "HORA", 
              "TIPO IDENTIFICACIÓN", 
              "NÚMERO IDENTIFICACIÓN", 
              "NOMBRE COMPLETO", 
              "EMPRESA", 
              "TIPO VEHÍCULO", 
              "BANCO USADO", 
              "PREOPERACIONAL (%)", 
              "CONDUCCIÓN (%)", 
              "PUNTAJE GLOBAL (%)", 
              "DICTAMEN FINAL", 
              "TIEMPO EMPLEADO"
            ]]
          })
        }
      );
    }

    // Step 5: Append row to "Participante" (Sheet 1)
    const participanteRow = [
      fecha,
      hora,
      data.tipoIdentificacion || "",
      data.numeroIdentificacion || "",
      data.nombreCompleto || "",
      data.empresa || "",
      data.tipoLicencia || "",
      Number(data.correctas) || 0,
      Number(data.incorrectas) || 0,
      (Number(data.puntaje) || 0) + "%",
      data.resultado || "No aprobado", // "Aprobado" | "No aprobado"
      data.tiempoEmpleado || "0:00"
    ];

    const appendParticipanteRes = await fetch(
      `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Participante!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          values: [participanteRow]
        })
      }
    );

    if (!appendParticipanteRes.ok) {
      const errText = await appendParticipanteRes.text();
      throw new Error(`Error al agregar fila a Participante: ${errText}`);
    }

    // Step 6: Calculate Preoperacional % and Conducción % for "Resultados" (Sheet 2)
    let preopConforme = 0, preopNoConforme = 0, preopNA = 0;
    let condConforme = 0, condNoConforme = 0, condNA = 0;

    if (data.detalles && Array.isArray(data.detalles)) {
      data.detalles.forEach((det: any) => {
        const cat = (det.category || "").toLowerCase();
        const elegida = (det.elegida || "").toLowerCase();

        const isConforme = elegida.includes("conforme") && !elegida.includes("no conforme");
        const isNoConforme = elegida.includes("no conforme");
        const isNA = elegida.includes("no aplica") || elegida.includes("n/a");

        if (cat.includes("preoperacional")) {
          if (isConforme) preopConforme++;
          else if (isNoConforme) preopNoConforme++;
          else if (isNA) preopNA++;
        } else if (cat.includes("conducción") || cat.includes("conduccion")) {
          if (isConforme) condConforme++;
          else if (isNoConforme) condNoConforme++;
          else if (isNA) condNA++;
        } else {
          // Fallback if category not specified
          if (isConforme) preopConforme++;
          else if (isNoConforme) preopNoConforme++;
          else if (isNA) preopNA++;
        }
      });
    }

    const preopTotalEval = preopConforme + preopNoConforme;
    const preopPct = preopTotalEval > 0 ? Math.round((preopConforme / preopTotalEval) * 100) : 100;

    const condTotalEval = condConforme + condNoConforme;
    const condPct = condTotalEval > 0 ? Math.round((condConforme / condTotalEval) * 100) : 100;

    const totalConforme = preopConforme + condConforme;
    const totalNoConforme = preopNoConforme + condNoConforme;
    const totalNA = preopNA + condNA;
    const totalEval = totalConforme + totalNoConforme;
    const globalScore = totalEval > 0 ? Math.round((totalConforme / totalEval) * 100) : 100;
    const dictamen = globalScore >= 80 ? "APROBADO" : "NO APROBADO";

    // Append row to "Resultados" (Sheet 2)
    const resultadosRow = [
      fecha,
      hora,
      data.tipoIdentificacion || "",
      data.numeroIdentificacion || "",
      data.nombreCompleto || "",
      data.empresa || "",
      data.tipoLicencia || "",
      data.bancoUsado || (data.tipoLicencia === "Motocicleta" ? "Banco 1" : "Banco 2"),
      `${preopPct}% (${preopConforme} C / ${preopNoConforme} NC / ${preopNA} N/A)`,
      `${condPct}% (${condConforme} C / ${condNoConforme} NC / ${condNA} N/A)`,
      `${globalScore}%`,
      dictamen,
      data.tiempoEmpleado || "0:00"
    ];

    const appendResultadosRes = await fetch(
      `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Resultados!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          values: [resultadosRow]
        })
      }
    );

    if (!appendResultadosRes.ok) {
      console.warn("[Sheets] No se pudo agregar la fila a Resultados:", await appendResultadosRes.text());
    }

    return {
      success: true,
      message: "Resultados sincronizados con Google Sheets con éxito en las hojas 'Participante' y 'Resultados'.",
      details: {
        spreadsheetId: parsedSpreadsheetId,
        participanteAgregado: 1,
        resultadosAgregados: 1
      }
    };

  } catch (error) {
    console.error("[Sheets] Error escribiendo resultados a Google Sheets:", error);
    throw error;
  }
}
