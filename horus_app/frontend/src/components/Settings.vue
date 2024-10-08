<template>
    <div>
        <h4><a download="Manual de Usuario.txt" href="./assets/Ayuda/Manual-de-Usuario-Prop.txt">Ayuda</a></h4>
        <h4><a download="Detection Logs.txt" href="./assets/Ayuda/Detection-Logs.txt">Exportar Logs</a></h4>
        <h4><a download="Contacto.txt" href="./assets/Ayuda/ContactoProp.txt">Contactos</a></h4>
    </div>
</template>

<style scoped>
    h3{
        text-align: center;
    }
    
    a{
        font-weight: bold;
        color: #2c3e50;
    }
    a:hover {
        color: #42b983;
        text-decoration: underline;
    }

    div{
        width: 15%;
        height: auto;
        background-image: linear-gradient(to bottom, #ffffff,#f0f0f0);
        opacity: 100%;
        padding: 1rem;
        float: right;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>