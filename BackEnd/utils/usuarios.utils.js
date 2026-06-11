exports.normalizar = (parametro) => {
    let datoNormalizar = parametro.toLowerCase()
    datoNormalizar = datoNormalizar.charAt(0).toUpperCase() + datoNormalizar.slice(1);
    return datoNormalizar
}

exports.normalizarEmail = (parametro) => {
    let datoNormalizar = parametro.toLowerCase()
    return datoNormalizar
}