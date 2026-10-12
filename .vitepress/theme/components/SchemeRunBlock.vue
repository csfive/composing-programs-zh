<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState, Compartment } from '@codemirror/state'
import { defaultKeymap } from '@codemirror/commands'
import { HighlightStyle, StreamLanguage, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import { scheme } from '@codemirror/legacy-modes/mode/scheme'
import { useSchemePageSession } from '../composables/useSchemePageSession'

const props = defineProps({
  index: { type: Number, required: true },
  code: { type: String, required: true },
})

const session = useSchemePageSession()

const editorHost = ref(null)
const source = ref(props.code)
const output = ref('')
const outputError = ref(false)
const running = ref(false)
const focused = ref(false)

let view = null
const readOnly = new Compartment()

const highlightStyle = HighlightStyle.define([
  { tag: tags.comment, color: 'var(--vp-c-text-3)' },
  { tag: tags.string, color: 'var(--vp-c-green-1)' },
  { tag: tags.keyword, color: 'var(--vp-c-brand-1)' },
  { tag: [tags.number, tags.bool, tags.null], color: 'var(--vp-c-purple-1)' },
  { tag: tags.atom, color: 'var(--vp-c-brand-2)' },
  { tag: tags.propertyName, color: 'var(--vp-c-text-1)' },
  { tag: tags.definition(tags.variableName), color: 'var(--vp-c-text-1)' },
  { tag: tags.variableName, color: 'var(--vp-c-text-1)' },
  { tag: tags.separator, color: 'var(--vp-c-text-3)' },
])

const getSource = () => view?.state.doc.toString() ?? source.value
const setOutput = (text, isError = false) => {
  output.value = text
  outputError.value = isError
}
const setRunning = (value) => {
  running.value = value
}
const setEditable = (editable) => {
  view?.dispatch({ effects: readOnly.reconfigure(EditorState.readOnly.of(!editable)) })
}

const handle = { index: props.index, getSource, setOutput, setRunning }

const editorExtensions = () => [
  keymap.of([...defaultKeymap]),
  syntaxHighlighting(highlightStyle, { fallback: true }),
  StreamLanguage.define(scheme),
  readOnly.of(EditorState.readOnly.of(true)),
  EditorView.lineWrapping,
  EditorView.theme({
    '&': { caretColor: 'var(--vp-c-text-1)' },
    '&.cm-focused .cm-cursor, .cm-cursor': {
      borderLeft: '2px solid var(--vp-c-text-1)',
      opacity: 1,
      display: 'block',
    },
    '.cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: 'color-mix(in srgb, var(--vp-c-brand-1) 28%, transparent)',
    },
  }),
  EditorView.domEventHandlers({
    focus: () => {
      focused.value = true
      setEditable(true)
    },
    blur: () => {
      focused.value = false
      setEditable(false)
      session.rerun()
    },
  }),
]

watch(
  () => props.code,
  (value) => {
    source.value = value
    view?.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } })
  },
)

onMounted(() => {
  if (!editorHost.value) return

  view = new EditorView({
    state: EditorState.create({ doc: source.value, extensions: editorExtensions() }),
    parent: editorHost.value,
  })

  session.register(handle)
  session.scheduleBootstrap()
})

onUnmounted(() => {
  session.unregister(handle)
  view?.destroy()
  view = null
})
</script>

<template>
  <div
    class="scheme-run-block"
    :class="{ 'scheme-run-block--running': running, 'scheme-run-block--focused': focused }"
  >
    <div ref="editorHost" class="scheme-run-block__editor" />
    <pre
      v-if="output || running"
      class="scheme-run-block__output"
      :class="{ 'scheme-run-block__output--error': outputError }"
      >{{ running && !output ? '…' : output }}</pre>
    <span class="scheme-run-block__hint" aria-hidden="true">点击编辑</span>
  </div>
</template>
