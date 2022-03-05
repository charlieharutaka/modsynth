import { atom } from 'jotai'

const context = new AudioContext({
  latencyHint: 'interactive',
})

const contextAtom = atom(context)

export { contextAtom as default }
