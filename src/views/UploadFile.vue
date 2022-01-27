<template>
    <div class="flex flex-col items-center">
        <choose-file @VitekId="getVitekId" @AddFile="getFile"/>
        <button @click="uploadFile" :disabled="!file || !vitek_id" :class="{ 'opacity-50 cursor-not-allowed': !file || !vitek_id }" class="bg-blue-2 text-white-1 font-semibold py-2 px-6 m-2 rounded">Upload</button>
        <!-- <file-upload-log/> -->
    </div>
</template>

<script>
import ChooseFile from '../components/ChooseFile.vue'
// import FileUploadLog from '../components/FileUploadLog.vue'

export default {
    name: 'UploadFile',
    components: {
        ChooseFile,
        // FileUploadLog,
    },
    data() {
        return {
            file: null,
            vitek_id: null,
        }
    },
    methods: {
        getVitekId(vitek_id) {
            this.vitek_id = vitek_id;
            // console.log(this.vitek_id)
        },
        getFile(file) {
            this.file = file;
            // console.log(this.file)
        }
    }
}
</script>

<style scoped>

</style>