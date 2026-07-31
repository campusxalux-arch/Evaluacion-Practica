/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TipoIdentificacion = 
  | "Cédula de ciudadanía"
  | "Cédula de extranjería"
  | "Pasaporte"
  | "Permiso Especial";

export type TipoLicencia =
  | "Motocicleta"
  | "Automóvil"
  | "Camión"
  | string;

export interface UserRegistration {
  tipoIdentificacion: TipoIdentificacion | "";
  numeroIdentificacion: string;
  nombreCompleto: string;
  edad?: number | "";
  empresa: string;
  antiguedad?: number | "";
  tipoLicencia: TipoLicencia | "";
  bancoUsado?: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[]; // ["Conforme", "No conforme", "No aplica (N/A)"]
  correctAnswer?: number;
  category: string;
}

export interface AnswerDetail {
  preguntaId: number;
  pregunta: string;
  elegida: string; // "Conforme", "No conforme", or "No aplica (N/A)"
  correcta?: string;
  esCorrecta?: boolean;
  category?: string;
  comentario?: string;
}

export interface ExamResult {
  fecha: string;
  hora: string;
  tipoIdentificacion: TipoIdentificacion;
  numeroIdentificacion: string;
  nombreCompleto: string;
  edad?: number;
  empresa: string;
  antiguedad?: number;
  tipoLicencia: TipoLicencia;
  bancoUsado?: string;
  conformeCount?: number;
  noConformeCount?: number;
  noAplicaCount?: number;
  totalEvaluadas?: number;
  correctas: number;
  incorrectas: number;
  puntaje: number; // 0 to 100
  resultado: "Aprobado" | "No aprobado";
  tiempoEmpleado: string; // MM:SS format
  detalles: AnswerDetail[];
}

export interface SyncStatus {
  status: "idle" | "syncing" | "success" | "error";
  message?: string;
  savedLocal?: boolean;
}
