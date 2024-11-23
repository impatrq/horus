<div align="center">
    
# [HORUS APP](https://linktr.ee/agro_horus)

<img src="/horus_app/frontend/src/assets/LoGO.png" height="450" width="450" />

&nbsp;

</div>

## ¿Qué es HorusAPP?
HorusAPP es la aplicación que se usa en conjunto con Horus para que el usuario pueda interactua con él y el sistema

<img src="/horus_app/frontend/src/assets/Home.png" height="450" width="900" />

## Funcionalidades
* Mapa Interactivo
    * Elegir la ubicación del campo a registrar, desplazarse sobre el mapa
    * Visualizar la ubicación de uno o más robots Horus mediante un mapa
    * Insertar y visualizar ubicaciones de trampas de feromonas colocadas por los responsables del campo
    * Insertar y visualizar ubicaciones de áreas de detección que el usuario quiere que cada robot siga
    * Visualizar los reconocimientos de plaga detectados por todos los robots, y filtrar por ellos
    * Todos los marcadores tienen información sobre los mismos al presionarlos
    * Aquellos que se pueden insertar, pueden ser eliminados del sistema con doble click
    * Sistema de guardado offline para su uso en zonas sin conexión a internet
* Base de Datos que permite:
    * Guardar y exportar todos los reconocimientos hechos por todos los robots
    * Visualizar y mantener registro de cada robot, incluida su ubicación, batería y ID
    * Importar imágenes del sistema de almacenamiento externo de cada robot y hacerle zoom
    * Exportar imágenes guardadas en la base de datos como archivo comprimido
    * Filtrar y ordenar los reconocimientos hechos por los diferentes parámetros detectados:
        * Dia
        * Hora
        * Coordenadas
        * Tipo de Plaga
        * ID de Robot
        * ID de Imagen
        * Trampa de feromona
* Modos offline y online para comunicación de datos con el o los robots:
    * Online: cuando el usuario registre un robot, el servidor tratará de usar el módulo comunicador para transmitir por antena hasta conectar con un robot.
    * Offline: el usuario deberá tomar el sistema de almacenamiento externo al robot e importar los archivos de reconocimiento manualmente a la aplicación.

<img src="/horus_app/frontend/src/assets/robots.png" height="450" width="900" />

## Requerimientos y dependencias
* 2GB de almacenamiento en la computadora (puede escalar según el uso de la base de datos)
* 1GB de memoria
* Windows 11+, Linux o Mac
* MongoDB Compass v1.44.5
* NodeJS v20.11.1
* Dependencias: 
    * leaflet v1.9.4
    * body-parser v1.20.2
    * cors v2.8.5
    * express v4.19.2
    * mongoose v8.4.0
    * path v0.12.7
    * serialport v12.0.0
    * dotenv v16.4.5
    * @serialport/parser-readline v12.0.0
    * idb v8.0.0
    * jszip v3.10.1
    * vue v3.2.13
    * vue-router v4.0.3
    * @vue/cli-plugin-babel v5.0.0
    * @vue/cli-plugin-router v5.0.0
    * @vue/cli-service v5.0.0
    * concurrently v8.2.2
    * electron v20.2.0
    * wait-on v6.0.1 


<img src="/horus_app/frontend/src/assets/Data.png" height="450" width="900" />

## Instrucciones de instalación
Ingrese a la página de github de [Horus](https://github.com/impatrq/horus) y descargue el último lanzamiento. Dentro de la carpeta de horus_app, si su sistema operativo es windows, ejecute (doble click) el archivo Horus.bat; si se encuentra en Linux o Mac, ejecute el archivo Horus.sh. Para su comodidad, cree un acceso directo del archivo ejecutable (ya sea .bat o .sh) para poder acceder más fácilmente al archivo desde su escritorio.

<img src="/horus_app/frontend/src/assets/gallery.png" height="450" width="900" />

