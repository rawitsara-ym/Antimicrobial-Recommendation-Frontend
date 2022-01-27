<template>
    <div class="flex flex-col items-center w-full">
        <p class="text-2xl font-semibold my-8">Uplaod File</p>
        <div @dragover.prevent @drop.prevent @drop="dragFile" class="flex flex-col items-center w-3/6 border-dashed border-2 rounded p-4">
            <p class="text-gray-1 text-center">Drag and Drop a File here</p>
            <label class="flex flex-col items-center mt-8 mb-4">
                <span class="bg-yellow-1 text-gray-1 font-semibold py-2 px-6 cursor-pointer rounded">Choose a File</span>
                <input type="file" @change="handleFileChange" class="hidden"/>
            </label>
            <span class="text-gray-2" v-if="file">{{file.name}}</span>
        </div>
        <div class="flex m-4">
            <div class="mx-4">
                <input @change="emitVitekId" type="radio" id="gn" value="GN" v-model="vitek_id" class="mx-2 cursor-pointer">
                <label for="gn">GN</label>
            </div>
            <div class="mx-4">
                <input @change="emitVitekId" type="radio" id="gp" value="GP" v-model="vitek_id" class="mx-2 cursor-pointer">
                <label for="gp">GP</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChooseFile',
    data() {
        return {
            file: null,
            vitek_id: null,
        }
    },
    methods: {
        handleFileChange(e) {
            this.file = e.target.files[0];
            this.$emit('AddFile', e.target.files[0]);
        },
        dragFile(e) {
            this.file = e.dataTransfer.files[0];
            this.$emit('AddFile', e.target.files[0]);
        },
        emitVitekId() {
            this.$emit('VitekId', this.vitek_id)
        }
    }
}
</script>
