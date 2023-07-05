# Establece la imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .


# Expone el puerto en el que el servidor Express.js se ejecuta (por defecto, el puerto 3000)
EXPOSE 4000

# Define el comando para iniciar el servidor
CMD [ "npm", "start" ]
