<template>
    <div>
        <h4><a href="../assets/Ayuda/ManualdeUsuario.pdf" target="_blank">Help</a></h4>
        <input type="file" @change="importLogs" id="fileInput" style="display:none"></input>
        <label for="fileInput">Import Logs</label>
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

const importLogs = async(event) => {
    const file = event.target.files[0];
    console.log('Imported')

    if (file && file.type === "application/json") {
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: file
            }
            const response = await fetch(`http://localhost:3000/api/offline`, requestOptions)

            const blob = await response.blob();
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = 'rx.json';
            link.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            alert("Server Connection Error")
        }
    }
}
</script>

<style scoped>
    label {
        font-size: 1rem;
        font-weight: bold;
        margin: 0.5rem 0;
        line-height: 1rem
    }
    a{
        font-weight: bold;
        color: #2c3e50;
    }
    a:hover, label:hover {
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
        border-radius: 5px;
        border: 2px solid #EEEEEE; 
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2)
    }
</style>