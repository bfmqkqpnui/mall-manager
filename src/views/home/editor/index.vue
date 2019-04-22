<template>
  <div>
    <div class="editBody">
      <quill-editor 
        v-model="content" 
        ref="myQuillEditor" 
        :options="editorOption" 
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
      </quill-editor>
    </div>
    <div class="btn">
      <el-button type="primary" @click="save" :disabled="!canSaveFlag">保存</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 1.只需要填写功能名的
加粗 - bold；
斜体 - italic
下划线 - underline
删除线 - strike
引用- blockquote
代码块 - code-block
公式 - formula
图片 - image
视频 - video
清除字体样式- clean
这一类的引用 直接['name','name']这种格式就好了

2.需要有默认值的
标题 - header  
[{ 'header': 1 }, { 'header': 2 }] 值字体大小

列表 - list 
[{ 'list': 'ordered'}, { 'list': 'bullet' }], 值ordered，bullet

上标/下标 - script 
 [{ 'script': 'sub'}, { 'script': 'super' }],  值sub，super

缩进 - indent
[{ 'indent': '-1'}, { 'indent': '+1' }], 值-1，+1等

文本方向 - direction
[{ 'direction': 'rtl' }],    值rtl
3.有多个值 以下拉列表形式显示

大小 - size
 [{ 'size': ['small', false, 'large', 'huge'] }],  

标题 - header
[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
4.有系统默认值的功能只需填写一个空数组 就会有出现默认的选项
颜色 - color
背景颜色 - background
字体 - font
文本对齐 - align
他们的格式都是
[{ 'color': [] }, { 'background': [] }], 
[{ 'font': [] }],
[{ 'align': [] }]
这种格式
toolbar自定义工具栏就是这样咯 剩下的就是根据填写功能到options的modules里就可以了 
 */
import { quillEditor } from "vue-quill-editor" // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  export default {
    data() {
      return {
        content: '',
        canSaveFlag: false,
        editorOption: {
          placeholder: '请输入文本...',
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike','image'],        // toggled buttons
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }], 
            ]
          }
        }
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
      // 保存富文本内容
      save() {
        console.log(111, this.content)
      }
    },
    components: {
        quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      },
    },
    watch: {
      content() {
        this.content ? this.canSaveFlag = true : this.canSaveFlag = false
      }
    }
  }
</script>

<style scoped>
.quill-editor {
  height: 20rem;
}
.btn {
  margin: 5rem auto;
}
</style>