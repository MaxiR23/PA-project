const generateId = () => {
    /* substring cortamos las primeras dos que por lo gral es 0. */
    const random = Math.random().toString(32).substring(2);
    /* Radix es un término que se usa para describir la cantidad de dígitos utilizados en un sistema numérico posicional antes de "pasar" al lugar del siguiente dígito. */
    const date   = Date.now().toString(32); 

    return random + date;
}

export default generateId;