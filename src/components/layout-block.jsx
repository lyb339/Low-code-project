import { computed, defineComponent, inject, onMounted, ref } from 'vue'
export default defineComponent({
  props: {
    block: { type: Object }
  },
  setup(props) {
    const blockStyles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
      zIndex: `${props.block.zIndex}`
    }))
    const config = inject('config')
    const blockRef = ref(null)
    onMounted(() => {
      let { offsetWidth, offsetHeight } = blockRef.value
      if (props.block.alignCenter) {
        props.block.left = props.block.left - offsetWidth / 2
        props.block.top = props.block.top - offsetHeight / 2
        props.block.alignCenter = false
      }
      props.block.width = offsetWidth
      props.block.height = offsetHeight
    })
    return () => {
      //获取通过block的key属性获取到对应的组件
      const components = config.componentMap[props.block.key]
      //获取组件的render函数
      const renderComponent = components.render()
      return (
        <div class="layout-block" style={blockStyles.value} ref={blockRef}>
          {renderComponent}
        </div>
      )
    }
  }
})
