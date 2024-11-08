<template>
    <div>
        <h4><a href="../assets/Ayuda/ManualdeUsuario.pdf" target="_blank">Help</a></h4>
        <h4><a @click="exportLogs">Export Logs</a></h4>
        <h4><a href="https://horus-pagina-web.vercel.app/" target="_blank">Contacts</a></h4>
    </div>
</template>

<script setup>
import JSZip from 'jszip'

const exportLogs = async() => {
    try {
        const res = await fetch("http://localhost:3000/api/allLogs");
        const logs = await res.json();
        const zip = new JSZip();
        logs.forEach((log, index) => {
            zip.file(`log_${index + 1}.txt`, JSON.stringify(log, null, 2));
        });

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = 'horus_logs.zip';
        link.click();
    } catch (err) {
        alert('Server Connection Error')
    }
}
</script>

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
        cursor: pointer
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