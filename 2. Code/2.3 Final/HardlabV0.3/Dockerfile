# Establece la imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY . .

# Instala las dependencias del proyecto
RUN npm install
RUN npm install -g serve


# Copia el resto de los archivos del proyecto al directorio de trabajo

# Compila el proyecto de React.js
RUN npm run build
RUN serve -s build


EXPOSE 3001