# Establece la imagen base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto en el que el servidor Express.js se ejecuta (por defecto, el puerto 3000)
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
