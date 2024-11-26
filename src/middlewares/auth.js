import jwt from 'jsonwebtoken';

// Usamos la clave secreta desde las variables de entorno
const secretKey = process.env.JWT_SECRET_KEY || 'secret_key_default'; // Si no está definida en .env, usamos un valor por defecto

// Crear el token
const createToken = (userInfo) => {
    return jwt.sign(userInfo, secretKey, { expiresIn: '1d' });
}

// Verificar el token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "Token no encontrado o formato incorrecto" });
    }

    const token = authHeader.split(' ')[1]; // Extraemos el token

    jwt.verify(token, 'secret_key_default', (err, decoded) => {
        if (err) {
            return res.status(403).json({ 
                msg: "Fallo al autenticar", 
                error: err.message // Devuelvo el mensaje del error para mayor detalle 
            });
        }

        req.user = decoded; // Guardamos la información decodificada del token
        next(); // Continuamos con la ejecución
    });
}

export { createToken, verifyToken };
