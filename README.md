# Bot Venom

Ejecutar el proyecto

    $ npm i

    $ node index.js

## Comandos para Ejecución

Ejecutar instrucción para monitoreo 

    $ sudo npm install pm2 -g

    $ pm2 start index.js

    $ pm2 install pm2-logrotate

    # pm2 start index.js -o logs/pm2.log -e logs/error.log

    $ pm2 set pm2-logrotate:max_size 1K (1KB)
    
    $ pm2 set pm2-logrotate:compress true (compress logs when rotated)

    $ pm2 set pm2-logrotate:rotateInterval '0 0 * * sun'

