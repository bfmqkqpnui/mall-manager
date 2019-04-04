<template>
  <div>
    <quill-editor 
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor" // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  export default {
    data() {
      return {
        content: '',
        editorOption: {}
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      // 准备编辑器
      onEditorReady(editor) {},
      // 失去焦点事件
      onEditorBlur(){},
      // 获得焦点事件
      onEditorFocus(){},
      // 内容改变事件
      onEditorChange(){},
    },
    components: {
        quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      },
    }
  }
</script>

<style scoped>

</style>