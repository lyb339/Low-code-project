export const  useblockDragger = (focusData) => {

    let dragStart = {
        startX: 0,
        startY: 0
      }
      const mousemove = (event) => {
        let { clientX: moveX, clientY: moveY } = event
        let druX = moveX - dragStart.startX
        let druY = moveY - dragStart.startY
        focusData.value.focus.forEach((block, index) => {
          block.top = dragStart.startPos[index].top + druY
          block.left = dragStart.startPos[index].left + druX
        })
      }
      const mouseup = (event) => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      const mousedown = (event) => {
        // dragStart.startX = event.clientX
        // dragStart.startY = event.clientY
        dragStart = {
          startX: event.clientX,
          startY: event.clientY,
          startPos: focusData.value.focus.map(({ top, left }) => ({ top, left }))
        }
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
      }

    return {mousemove,mousedown,mouseup}
}



