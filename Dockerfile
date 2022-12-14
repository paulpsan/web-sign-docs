FROM node:16.17.0-alpine as build
WORKDIR /workspace/app

#Ejecutamos esto primero para que la imagen se quede en cache
RUN npm install -g typescript --quiet

#Si no se modifican las dependencias esto tambien queda en cache
COPY package.json /workspace/app 
RUN npm install --quiet

#Copiamos el resto del codigo fuente que puede cambiar mas dinamicamente
COPY src/ /workspace/app/src
COPY README.md /workspace/app
COPY package.json /workspace/app
COPY tsconfig.json /workspace/app
COPY tsconfig.node.json /workspace/app/
COPY keycloak.json /workspace/app/
COPY index.html /workspace/app/

ARG ENVIRONMENT
RUN echo "ENVIRONMENT 1 " $ENVIRONMENT

# Generamos la carpeta dist
RUN npm run build --configuration=$ENVIRONMENT
# Comenzamos la segunda etapa de la construcción
FROM nginx:1.17.3-alpine

ARG ENVIRONMENT
RUN echo "ENVIRONMENT 2 " $ENVIRONMENT

COPY nginx${ENVIRONMENT}.conf /etc/nginx/conf.d/default.conf
VOLUME /etc/nginx/ssl/
RUN sed -i '/http {/a\ \ \ \ client_max_body_size 100M;' /etc/nginx/nginx.conf

# Hacemos referencia a la carpeta dist generada anteriormente
COPY --from=build /workspace/app/dist/ /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]