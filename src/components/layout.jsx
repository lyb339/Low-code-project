import { defineComponent, computed, inject, ref } from 'vue'
import Eblock from './layout-block.jsx'
import { menuDrage } from './menuDrage'
import { useFoucer } from './useFoucer'
import { useblockDragger } from './useblockDragger'
export default defineComponent({
  props: {
    modelValue: { type: Object }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = computed({
      get() {
        return props.modelValue
      },
      set(newValue) {
        ctx.emit('update:modelValue', newValue)
      }
    })
    const contentStyles = computed(() => ({
      width: data.value.content.width + 'px',
      height: data.value.content.height + 'px'
    }))
    const config = inject('config')

    let { handleMouseown, focusData, handleMouseDown } = useFoucer(data, (event) => {
      //获取焦点后
      mousedown(event)
    })
    //实现组件拖拽
    let { mousedown } = useblockDragger(focusData)
    const contentRef = ref(null)
    //实现菜单拖拽功能
    const { dragstart, dragEnd } = menuDrage(contentRef, data)
    //实现获取焦点

    //实现拖拽多个元素
    //实现拖拽
    return () => (
      <div class="whole">
        <div class="whole-left">
          {/* //根据注册列表渲染对应的内容 可以实现拖拽 */}
          <div class="whole-left-content">
            {config.componentList.map((component) => (
              <div
                class="whole-left-item"
                draggable
                onDragstart={(e) => dragstart(e, component)}
                onDragEnd={dragEnd}
              >
                <span> {component.label}</span>
                <div>{component.preview()}</div>
              </div>
            ))}
          </div>
        </div>
        <div class="whole-header">1</div>
        <div class="whole-right">右侧设置区</div>
        <div class="whole-center">
          <div class="whole-center-canvas">
            <div
              class="whole-center-canvas-centent"
              style={contentStyles.value}
              ref={contentRef}
              onMousedown={handleMouseDown}
            >
              {data.value.blocks.map((block, index) => (
                <Eblock
                  block={block}
                  onMousedown={(e) => handleMouseown(e, block, index)}
                  class={block.focus ? 'block_down' : ''}
                ></Eblock>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
