import { Question } from "../types";
export type { Question };

export const INSPECTION_OPTIONS = ["Conforme", "No conforme", "No aplica (N/A)"];

// =========================================================================
// BANCO DE PREGUNTAS 1: MOTOCICLETA (PREOPERACIONAL Y CONDUCCIÓN)
// =========================================================================
export const QUESTION_BANK_MOTO: Question[] = [
  // --- PREOPERACIONAL: Motocicleta ---
  { id: 101, question: "A1. Nivel de aceite de motor", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 102, question: "A2. Nivel de líquido de frenos (delantero / trasero)", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 103, question: "A3. Nivel de refrigerante (si aplica)", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 104, question: "A4. Tensión, lubricación y estado de la cadena / kit de arrastre", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 105, question: "A5. Ausencia de fugas de aceite o fluidos", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 106, question: "A6. Tapa del depósito de combustible asegurada y sin fugas", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },

  { id: 107, question: "B1. Labrado y profundidad de la llanta delantera", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Ruedas" },
  { id: 108, question: "B2. Labrado y profundidad de la llanta trasera", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Ruedas" },
  { id: 109, question: "B3. Presión de aire (delantera y trasera)", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Ruedas" },
  { id: 110, question: "B4. Estado de rines (sin deformaciones) y tensión de radios (si aplica)", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Ruedas" },

  { id: 111, question: "C1. Luz delantera (Principal / Altas y Bajas)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },
  { id: 112, question: "C2. Luz de stop / Freno (activada por manigueta y pedal)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },
  { id: 113, question: "C3. Direcciónales delanteras y traseras", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },
  { id: 114, question: "C4. Pito / Bocina", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },
  { id: 115, question: "C5. Tablero de instrumentos (velocímetro, testigos e indicador de combustible)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },

  { id: 116, question: "D1. Holgura y respuesta del manubrio / Dirección", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 117, question: "D2. Tacto y tensión del guaya de acelerador (retorno suave)", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 118, question: "D3. Funcionamiento y tensión de manigueta de embrague (clutch)", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 119, question: "D4. Estado y firmeza de espejos retrovisores (izquierdo y derecho)", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 120, question: "D5. Estado de la suspensión delantera (telescópicas) y trasera (monoshock/amortiguadores)", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 121, question: "D6. Placa visible, fija y limpia", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 122, question: "D7. Carenado, reposapiés y soportes en buen estado", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },

  { id: 123, question: "E1. Casco reglamentario (certificado, visera clara, abroche operativo y sin golpes)", options: INSPECTION_OPTIONS, category: "Preoperacional - EPI y Seguridad" },
  { id: 124, question: "E2. Chaleco o prenda reflectiva (uso en horarios requeridos / normativos)", options: INSPECTION_OPTIONS, category: "Preoperacional - EPI y Seguridad" },
  { id: 125, question: "E3. Guantes, chaqueta/protecciones y calzado adecuado", options: INSPECTION_OPTIONS, category: "Preoperacional - EPI y Seguridad" },
  { id: 126, question: "E4. Botiquín de primeros auxilios y herramienta básica", options: INSPECTION_OPTIONS, category: "Preoperacional - EPI y Seguridad" },

  { id: 127, question: "F1. Licencia de conducción (Categoría A1 / A2) vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 128, question: "F2. Licencia de tránsito (Tarjeta de propiedad)", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 129, question: "F3. Seguro Obligatorio (SOAT) vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 130, question: "F4. Revisión Técnico-Mecánica vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },

  // --- CONDUCCIÓN: Motocicleta ---
  { id: 131, question: "A1. Realiza la inspección preoperacional visual rápida antes de abordar", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa a la Marcha" },
  { id: 132, question: "A2. Porta el Equipo de Protección Personal completo y correctamente ajustado (casco, guantes, chaqueta)", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa a la Marcha" },
  { id: 133, question: "A3. Ajusta los espejos retrovisores a su ángulo de visión antes de iniciar la marcha", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa a la Marcha" },
  { id: 134, question: "A4. Adopta la postura correcta (manos en manubrio, pies sobre posapiés, rodillas junto al tanque)", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa a la Marcha" },

  { id: 135, question: "B1. Arranca de forma suave, sin apagar el motor ni jalonar la moto", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 136, question: "B2. Mantiene el equilibrio y buen control a bajas velocidades (slalom / zigzag / giros cerrados)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 137, question: "B3. Realiza cambios de marcha oportunos y progresivos (sin forzar el motor)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 138, question: "B4. Dosifica correctamente los frenos (uso combinado de freno delantero y trasero)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 139, question: "B5. Demuestra control en frenado de emergencia / detención controlada sin bloquear ruedas", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 140, question: "B6. Mantiene una trayectoria estable en curvas sin invadir el carril contrario", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },

  { id: 141, question: "C1. Utiliza las luces direccionales con anticipación para cada maniobra", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 142, question: "C2. Consulta constantemente los espejos antes de frenar, cambiar de carril o girar", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 143, question: "C3. Conserva una distancia de seguridad adecuada con respecto a otros vehículos", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 144, question: "C4. Ocupa el centro del carril y evita transitar por puntos ciegos", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 145, question: "C5. Respeta la señalización vial (semáforos, señales de PARE, ceda el paso, peatones)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 146, question: "C6. Respeta los límites de velocidad establecidos en la zona", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 147, question: "C7. Evita conductas de riesgo (adelantamientos por la derecha, zigzagueo entre carros en movimiento)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" }
];


// =========================================================================
// BANCO DE PREGUNTAS 2: CARRO / CAMIÓN (PREOPERACIONAL Y CONDUCCIÓN)
// =========================================================================
export const QUESTION_BANK_CARRO_CAMION: Question[] = [
  // --- PREOPERACIONAL: Carro o Camión ---
  { id: 201, question: "A1. Nivel de aceite de motor", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 202, question: "A2. Nivel de líquido refrigerante / agua", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 203, question: "A3. Nivel de líquido de frenos", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 204, question: "A4. Agua del limpiaparabrisas / Depósito", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 205, question: "A5. Ausencia de goteos o fugas visibles", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 206, question: "A6. Tapa del depósito de combustible ajustada", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 207, question: "A7. Estado y tensión de la correa / transmisión de accesorios", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },

  { id: 208, question: "B1. Estado y labrado adecuado de llantas principales", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Rodamiento" },
  { id: 209, question: "B2. Presión de aire en llantas", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Rodamiento" },
  { id: 210, question: "B3. Estado, labrado y presión de la llanta de repuesto", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Rodamiento" },
  { id: 211, question: "B4. Ajuste de pernos/tuercas en rines", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Rodamiento" },

  { id: 212, question: "C1. Luces altas y bajas", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 213, question: "C2. Luces direccionales (delanteras y traseras)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 214, question: "C3. Luces de freno y luz de reverso", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 215, question: "C4. Luces estacionarias / de emergencia", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 216, question: "C5. Pito / Bocina", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 217, question: "C6. Tablero de instrumentos (sin alertas encendidas)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },

  { id: 218, question: "D1. Parabrisas / Visor / Paravientos sin fisuras", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },
  { id: 219, question: "D2. Espejos retrovisores (izquierdo y derecho)", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },
  { id: 220, question: "D3. Plumillas del limpiaparabrisas", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },
  { id: 221, question: "D4. Placas legibles y fijas", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },
  { id: 222, question: "D5. Estado de la carrocería / Chasis", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },

  { id: 223, question: "E1. Cinturones de seguridad operativos", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 224, question: "E2. Respuesta del pedal de freno y freno de mano", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 225, question: "E3. Casco o elementos de protección personal (si aplica)", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 226, question: "E4. Extintor cargado, con fecha vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 227, question: "E5. Kit de carretera / Herramienta básica", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 228, question: "E6. Chaleco / Prenda reflectiva y guantes", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 229, question: "E7. Botiquín de primeros auxilios completo y vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },

  { id: 230, question: "F1. Licencia de conducción vigente (B1/C1 o B2/C2 según aplique)", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 231, question: "F2. Licencia de tránsito (Tarjeta de propiedad)", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 232, question: "F3. Seguro Obligatorio (SOAT) vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 233, question: "F4. Revisión Técnico-Mecánica vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },

  // --- CONDUCCIÓN: Carro o Camión ---
  { id: 234, question: "A1. Inspección visual rápida del entorno y del vehículo antes de ingresar", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa y Ergonomía" },
  { id: 235, question: "A2. Graduación correcta del asiento (distancia a pedales y altura) y respaldo", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa y Ergonomía" },
  { id: 236, question: "A3. Ajuste correcto de espejos retrovisores (central e independientes laterales)", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa y Ergonomía" },
  { id: 237, question: "A4. Colocación correcta del cinturón de seguridad (y verificación en pasajeros)", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa y Ergonomía" },

  { id: 238, question: "B1. Encendido correcto del motor y retiro del freno de mano/estacionamiento", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 239, question: "B2. Arrancada suave, coordinando pedales (clutch/acelerador) sin apagar el motor", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 240, question: "B3. Posición de las manos en el volante (técnica 9:15 o 10:10) y sujeción firme", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 241, question: "B4. Cambios de marcha fluidos y sincronizados según las revoluciones (si es mecánico)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 242, question: "B5. Frenado progresivo y suave (sin frenazos bruscos ni bloqueos)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 243, question: "B6. Dominio de arranque en pendiente (sin que el carro se ruede hacia atrás)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 244, question: "B7. Maniobras de parqueo y reversa usando espejos correctamente", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },

  { id: 245, question: "C1. Uso oportuno de direccionales antes de giros, cambios de carril o parqueo", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 246, question: "C2. Verificación constante de espejos y puntos ciegos antes de maniobrar", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 247, question: "C3. Mantenimiento de la distancia de seguridad con el vehículo de adelante", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 248, question: "C4. Posición correcta dentro del carril (sin pisar continuamente las líneas)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 249, question: "C5. Respecto a las señales de tránsito (PARE, semáforos, ceda el paso, pasos peatonales)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 250, question: "C6. Adaptación de la velocidad según los límites permitidos y el flujo del tráfico", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 251, question: "C7. Conducción defensiva y cortesía vial (prioridad al peatón y ciclistas)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" }
];

export function getQuestionsForVehicle(vehicleType: string): { bankName: string; questions: Question[] } {
  const normType = (vehicleType || "").toLowerCase().trim();
  if (normType.includes("moto")) {
    return {
      bankName: "Banco 1 (Motocicleta)",
      questions: QUESTION_BANK_MOTO
    };
  } else {
    return {
      bankName: "Banco 2 (Carro / Camión)",
      questions: QUESTION_BANK_CARRO_CAMION
    };
  }
}

export function getRandomQuestions(count: number = 40, sourceBank?: Question[]): Question[] {
  const bank = sourceBank || QUESTION_BANK_CARRO_CAMION;
  return bank;
}

export const QUESTION_BANK: Question[] = QUESTION_BANK_CARRO_CAMION;
