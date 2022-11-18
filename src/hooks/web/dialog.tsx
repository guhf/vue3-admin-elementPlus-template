import { defineComponent } from 'vue';

export default defineComponent({
  setup(props, { slots }){
    return () => (
      <div>弹窗</div>
    )
  }
})

// import('../layout/index.vue')