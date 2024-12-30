export function menuDrage(contentRef, data) {
    let currentComponent = null
    const dragenter = (e) => {
      // console.log(e)
      e.dataTransfer.dropEffect = 'move'
    }
    const dragover = (e) => {
      e.preventDefault()
    }
    const drop = (e) => {
      let vblocks = data.value.blocks
      data.value = {
        ...data.value,
        blocks: [
          ...vblocks,
          {
            left: e.offsetX,
            top: e.offsetY,
            zIndex: 1,
            key: currentComponent.key,
            alignCenter: true
          }
        ]
      }
      currentComponent = null
    }
    const dragleave = (e) => {
      e.dataTransfer.dropEffect = 'none'
    }
    const dragEnd = (e) => {
      contentRef.value.removeEventListener('dragenter', dragenter)
      contentRef.value.removeEventListener('dragover', dragover)
      contentRef.value.removeEventListener('dragleave', dragleave)
      contentRef.value.removeEventListener('drop', drop)
    }
    const dragstart = (e, component) => {
      currentComponent = component
      //dragenter 进入元素中 添加一个移动标识
      //dragover 在目标元素上经过 必须要阻止默认行为 否则不触发drop
      //draleave 离开元素 需要增加一个禁用标识
      //drop 松手的时候 根据拖拽的元素生成一个block对象
      contentRef.value.addEventListener('dragenter', dragenter)
      contentRef.value.addEventListener('dragover', dragover)
      contentRef.value.addEventListener('dragleave', dragleave)
      contentRef.value.addEventListener('drop', drop)
    }
    return {
        dragstart, dragEnd
    }
}