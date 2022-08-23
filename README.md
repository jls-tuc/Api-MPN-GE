#Ejecutar el desarrollo de la API

1.clonar el repositorio
2.Ejecutar

```
npm install
```

3. Tener instalado docker

```
docker --version
```

```
docker images
```

```
docker run -p portExterior 8080 : puerto del contenedor 3001 <nombre del contenedor>

```

4. Intalar el Docker compose

```
https://docs.docker.com/compose/install/compose-desktop/
```

5. Usar el docker-Compose

```
docker-compose --version
```

```
docker-compose up -d
```

6 Iniciar la Base de datos

```
docker exec -it mongo-db  sh -c 'mongodump --uri=mongodb://<Copiar .env Arsat> --gzip --archive > dump_`date "+%Y-%m-%d"`.gz'
```

```
docker exec -i mongo-db  sh -c 'mongorestore -d elecciones --gzip --archive=<dump-file>.gz'
```
