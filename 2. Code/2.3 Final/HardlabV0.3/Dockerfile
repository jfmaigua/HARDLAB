# Establece la imagen base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila el proyecto de React.js
RUN npm run build
# RUN npm install -g serve

# Expone el puerto del contenedor
EXPOSE 3000

CMD ["npm","start"]
