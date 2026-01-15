export interface Paciente{ // descripcion del objeto empleado, proveniente de los atributos de la tabla empleados
    id_paciente?: number,    //atributo es opcional.
    expediente_paciente: string,
    nombre_paciente: string,
    apellido_paterno: string,  
    apellido_materno: string,
    sexo_paciente: string,
    edad_paciente: number,
    nacionalidad: string,
    domicilio: string,
    ingreso_programa?: string,
    ultima_modificacion? : string,
    colonia: string,
    alcaldia_municipio: string,
    entidadFederativa: string,
    diagnostico: string,
    parentesco_con_cuidador: string, //nueva columna
    tipoPrograma: string,
    observaciones?: string,
    recomendaciones?: string,
    id_cuidador_paciente?: number; // Nuevo campo para el id del cuidador
}