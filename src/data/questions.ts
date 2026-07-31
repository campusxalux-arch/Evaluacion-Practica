import { Question } from "../types";
export type { Question };

export const INSPECTION_OPTIONS = ["Conforme", "No conforme", "No aplica (N/A)"];

// =========================================================================
// BANCO DE PREGUNTAS 1: MOTOCICLETA (PREOPERACIONAL Y CONDUCCIÓN)
// =========================================================================
export const QUESTION_BANK_MOTO: Question[] = [
  // --- PREOPERACIONAL: Motocicleta ---
  { id: 101, question: "Nivel de aceite de motor", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 102, question: "Nivel de líquido de frenos (delantero / trasero)", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 103, question: "Nivel de refrigerante (si aplica)", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 104, question: "Tensión, lubricación y estado de la cadena / kit de arrastre", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 105, question: "Ausencia de fugas de aceite o fluidos", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },
  { id: 106, question: "Tapa del depósito de combustible asegurada y sin fugas", options: INSPECTION_OPTIONS, category: "Preoperacional - Motor, Transmisión y Fluidos" },

  { id: 107, question: "Labrado y profundidad de la llanta delantera", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Ruedas" },
  { id: 108, question: "Labrado y profundidad de la llanta trasera", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Ruedas" },
  { id: 109, question: "Presión de aire (delantera y trasera)", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Ruedas" },
  { id: 110, question: "Estado de rines (sin deformaciones) y tensión de radios (si aplica)", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Ruedas" },

  { id: 111, question: "Luz delantera (Principal / Altas y Bajas)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },
  { id: 112, question: "Luz de stop / Freno (activada por manigueta y pedal)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },
  { id: 113, question: "Direcciónales delanteras y traseras", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },
  { id: 114, question: "Pito / Bocina", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },
  { id: 115, question: "Tablero de instrumentos (velocímetro, testigos e indicador de combustible)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Sistema Eléctrico" },

  { id: 116, question: "Holgura y respuesta del manubrio / Dirección", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 117, question: "Tacto y tensión del guaya de acelerador (retorno suave)", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 118, question: "Funcionamiento y tensión de manigueta de embrague (clutch)", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 119, question: "Estado y firmeza de espejos retrovisores (izquierdo y derecho)", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 120, question: "Estado de la suspensión delantera (telescópicas) y trasera (monoshock/amortiguadores)", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 121, question: "Placa visible, fija y limpia", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },
  { id: 122, question: "Carenado, reposapiés y soportes en buen estado", options: INSPECTION_OPTIONS, category: "Preoperacional - Controles, Chasis y Suspensión" },

  { id: 123, question: "Casco reglamentario (certificado, visera clara, abroche operativo y sin golpes)", options: INSPECTION_OPTIONS, category: "Preoperacional - EPI y Seguridad" },
  { id: 124, question: "Chaleco o prenda reflectiva (uso en horarios requeridos / normativos)", options: INSPECTION_OPTIONS, category: "Preoperacional - EPI y Seguridad" },
  { id: 125, question: "Guantes, chaqueta/protecciones y calzado adecuado", options: INSPECTION_OPTIONS, category: "Preoperacional - EPI y Seguridad" },
  { id: 126, question: "Botiquín de primeros auxilios y herramienta básica", options: INSPECTION_OPTIONS, category: "Preoperacional - EPI y Seguridad" },

  { id: 127, question: "Licencia de conducción (Categoría A1 / A2) vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 128, question: "Licencia de tránsito (Tarjeta de propiedad)", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 129, question: "Seguro Obligatorio (SOAT) vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 130, question: "Revisión Técnico-Mecánica vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },

  // --- CONDUCCIÓN: Motocicleta ---
  { id: 131, question: "Realiza la inspección preoperacional visual rápida antes de abordar", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa a la Marcha" },
  { id: 132, question: "Porta el Equipo de Protección Personal completo y correctamente ajustado (casco, guantes, chaqueta)", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa a la Marcha" },
  { id: 133, question: "Ajusta los espejos retrovisores a su ángulo de visión antes de iniciar la marcha", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa a la Marcha" },
  { id: 134, question: "Adopta la postura correcta (manos en manubrio, pies sobre posapiés, rodillas junto al tanque)", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa a la Marcha" },

  { id: 135, question: "Arranca de forma suave, sin apagar el motor ni jalonar la moto", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 136, question: "Mantiene el equilibrio y buen control a bajas velocidades (slalom / zigzag / giros cerrados)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 137, question: "Realiza cambios de marcha oportunos y progresivos (sin forzar el motor)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 138, question: "Dosifica correctamente los frenos (uso combinado de freno delantero y trasero)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 139, question: "Demuestra control en frenado de emergencia / detención controlada sin bloquear ruedas", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },
  { id: 140, question: "Mantiene una trayectoria estable en curvas sin invadir el carril contrario", options: INSPECTION_OPTIONS, category: "Conducción - Control y Maniobras" },

  { id: 141, question: "Utiliza las luces direccionales con anticipación para cada maniobra", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 142, question: "Consulta constantemente los espejos antes de frenar, cambiar de carril o girar", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 143, question: "Conserva una distancia de seguridad adecuada con respecto a otros vehículos", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 144, question: "Ocupa el centro del carril y evita transitar por puntos ciegos", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 145, question: "Respeta la señalización vial (semáforos, señales de PARE, ceda el paso, peatones)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 146, question: "Respeta los límites de velocidad establecidos en la zona", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 147, question: "Evita conductas de riesgo (adelantamientos por la derecha, zigzagueo entre carros en movimiento)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" }
];


// =========================================================================
// BANCO DE PREGUNTAS 2: CARRO / CAMIÓN (PREOPERACIONAL Y CONDUCCIÓN)
// =========================================================================
export const QUESTION_BANK_CARRO_CAMION: Question[] = [
  // --- PREOPERACIONAL: Carro o Camión ---
  { id: 201, question: "Nivel de aceite de motor", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 202, question: "Nivel de líquido refrigerante / agua", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 203, question: "Nivel de líquido de frenos", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 204, question: "Agua del limpiaparabrisas / Depósito", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 205, question: "Ausencia de goteos o fugas visibles", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 206, question: "Tapa del depósito de combustible ajustada", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },
  { id: 207, question: "Estado y tensión de la correa / transmisión de accesorios", options: INSPECTION_OPTIONS, category: "Preoperacional - Niveles de Fluidos y Motor" },

  { id: 208, question: "Estado y labrado adecuado de llantas principales", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Rodamiento" },
  { id: 209, question: "Presión de aire en llantas", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Rodamiento" },
  { id: 210, question: "Estado, labrado y presión de la llanta de repuesto", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Rodamiento" },
  { id: 211, question: "Ajuste de pernos/tuercas en rines", options: INSPECTION_OPTIONS, category: "Preoperacional - Llantas y Rodamiento" },

  { id: 212, question: "Luces altas y bajas", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 213, question: "Luces direccionales (delanteras y traseras)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 214, question: "Luces de freno y luz de reverso", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 215, question: "Luces estacionarias / de emergencia", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 216, question: "Pito / Bocina", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },
  { id: 217, question: "Tablero de instrumentos (sin alertas encendidas)", options: INSPECTION_OPTIONS, category: "Preoperacional - Luces y Eléctrico" },

  { id: 218, question: "Parabrisas / Visor / Paravientos sin fisuras", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },
  { id: 219, question: "Espejos retrovisores (izquierdo y derecho)", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },
  { id: 220, question: "Plumillas del limpiaparabrisas", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },
  { id: 221, question: "Placas legibles y fijas", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },
  { id: 222, question: "Estado de la carrocería / Chasis", options: INSPECTION_OPTIONS, category: "Preoperacional - Estado Exterior y Estructura" },

  { id: 223, question: "Cinturones de seguridad operativos", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 224, question: "Respuesta del pedal de freno y freno de mano", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 225, question: "Casco o elementos de protección personal (si aplica)", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 226, question: "Extintor cargado, con fecha vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 227, question: "Kit de carretera / Herramienta básica", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 228, question: "Chaleco / Prenda reflectiva y guantes", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },
  { id: 229, question: "Botiquín de primeros auxilios completo y vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Interior y Seguridad" },

  { id: 230, question: "Licencia de conducción vigente (B1/C1 o B2/C2 según aplique)", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 231, question: "Licencia de tránsito (Tarjeta de propiedad)", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 232, question: "Seguro Obligatorio (SOAT) vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },
  { id: 233, question: "Revisión Técnico-Mecánica vigente", options: INSPECTION_OPTIONS, category: "Preoperacional - Documentación" },

  // --- CONDUCCIÓN: Carro o Camión ---
  { id: 234, question: "Inspección visual rápida del entorno y del vehículo antes de ingresar", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa y Ergonomía" },
  { id: 235, question: "Graduación correcta del asiento (distancia a pedales y altura) y respaldo", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa y Ergonomía" },
  { id: 236, question: "Ajuste correcto de espejos retrovisores (central e independientes laterales)", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa y Ergonomía" },
  { id: 237, question: "Colocación correcta del cinturón de seguridad (y verificación en pasajeros)", options: INSPECTION_OPTIONS, category: "Conducción - Rutina Previa y Ergonomía" },

  { id: 238, question: "Encendido correcto del motor y retiro del freno de mano/estacionamiento", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 239, question: "Arrancada suave, coordinando pedales (clutch/acelerador) sin apagar el motor", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 240, question: "Posición de las manos en el volante (técnica 9:15 o 10:10) y sujeción firme", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 241, question: "Cambios de marcha fluidos y sincronizados según las revoluciones (si es mecánico)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 242, question: "Frenado progresivo y suave (sin frenazos bruscos ni bloqueos)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 243, question: "Dominio de arranque en pendiente (sin que el carro se ruede hacia atrás)", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },
  { id: 244, question: "Maniobras de parqueo y reversa usando espejos correctamente", options: INSPECTION_OPTIONS, category: "Conducción - Control y Dominio" },

  { id: 245, question: "Uso oportuno de direccionales antes de giros, cambios de carril o parqueo", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 246, question: "Verificación constante de espejos y puntos ciegos antes de maniobrar", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 247, question: "Mantenimiento de la distancia de seguridad con el vehículo de adelante", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 248, question: "Posición correcta dentro del carril (sin pisar continuamente las líneas)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 249, question: "Respecto a las señales de tránsito (PARE, semáforos, ceda el paso, pasos peatonales)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 250, question: "Adaptación de la velocidad según los límites permitidos y el flujo del tráfico", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" },
  { id: 251, question: "Conducción defensiva y cortesía vial (prioridad al peatón y ciclistas)", options: INSPECTION_OPTIONS, category: "Conducción - Seguridad Vial y Comportamiento" }
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
