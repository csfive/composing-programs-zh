<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState, Compartment } from '@codemirror/state'
import { defaultKeymap } from '@codemirror/commands'
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'
import { scheme } from '@codemirror/legacy-modes/mode/scheme'
import { StreamLanguage } from '@codemirror/language'
import { useSchemePageSession } from '../composables/useSchemePageSession'

const props = defineProps({
  index: { type: Number, required: true },
  off: { type: Boolean, default: false },
  code: { type: String, required: true },
})

const session = useSchemePageSession()
const editorHost = ref(null)
const output = ref('')
const outputError = ref(false)
const running = ref(false)

let view = null
const readOnlyCompartment = new Compartment()

const source = ref(props.code)

watch(
  () => props.code,
  (value) => {
    source.value = value
    if (view) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      })
    }
  },
)

const setOutput = (text, isError = false) => {
  output.value = text
  outputError.value = isError
}

const setRunning = (value) => {
  running.value = value
}

const getSource = () => view?.state.doc.toString() ?? source.value

const handle = {
  index: props.index,
  off: props.off,
  getSource,
  setOutput,
  setRunning,
}

const setEditable = (editable) => {
  if (!view) return
  view.dispatch({
    effects: readOnlyCompartment.reconfigure(EditorState.readOnly.of(!editable)),
  })
}

const buildExtensions = () => [
  keymap.of([...defaultKeymap]),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  StreamLanguage.define(scheme),
  readOnlyCompartment.of(EditorState.readOnly.of(true)),
  EditorView.lineWrapping,
  EditorView.theme({
    '&': { fontSize: '0.92em' },
    '.cm-scroller': { fontFamily: 'var(--vp-font-family-mono)' },
  }),
  EditorView.domEventHandlers({
    focus: () => {
      if (!props.off) setEditable(true)
    },
    blur: () => {
      if (!props.off) {
        setEditable(false)
        session.rerunFrom(props.index)
      }
    },
  }),
]

onMounted(() => {
  if (!editorHost.value) return

  view = new EditorView({
    state: EditorState.create({
      doc: source.value,
      extensions: buildExtensions(),
    }),
    parent: editorHost.value,
  })

  if (props.off) {
    setEditable(false)
  }

  if (!props.off) {
    session.register(handle)
    session.scheduleBootstrap()
  }
})

onUnmounted(() => {
  if (!props.off) session.unregister(handle)
  view?.destroy()
  view = null
})
</script>

<template>
  <div
    class="scheme-run-block"
    :class="{ 'scheme-run-block--off': off, 'scheme-run-block--running': running }"
  >
    <div ref="editorHost" class="scheme-run-block__editor" />
    <pre
      v-if="!off && (output || running)"
      class="scheme-run-block__output"
      :class="{ 'scheme-run-block__output--error': outputError }"
      >{{ running && !output ? '…' : output }}</pre
    >
  </div>
</template>
