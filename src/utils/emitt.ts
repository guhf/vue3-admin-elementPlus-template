import mitt from 'mitt'
import type { Emitter } from 'mitt'

const emitter: Emitter<MittType> = mitt<MittType>()

export default emitter
