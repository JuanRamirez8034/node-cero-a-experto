
abstract class CustomErrorModel {
  abstract readonly message: string;
  abstract readonly statusCode: number;
}

/**
 * Clase representadora del error personalizado
 */
export class CustomError extends Error implements CustomErrorModel {

  public readonly message: string;
  public readonly statusCode: number;

  /**
   * Crear nuevo error personalizado para manejar el error de las respuestas
   * @param message string
   * @param statusCode number
   */
  constructor( message: string, statusCode: number ){
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

}