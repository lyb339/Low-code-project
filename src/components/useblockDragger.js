import { reactive } from "vue"

export const  useblockDragger = (focusData,lastSelectblock) => {

    let dragStart = {
        startX: 0,
        startY: 0
      }
      let markLine = reactive({
        x:null,
        y:null
      })
      const mousemove = (event) => {
        let { clientX: moveX, clientY: moveY } = event
        //计算元素当前最新得left和top
        let left = moveX - dragStart.startX + dragStart.startLeft
        let top = moveY - dragStart.startY + dragStart.startTop
        let y = null
        let x= null
        for(let i=0; i< dragStart.lines.y.length; i++){
          const {top:t,showTop:s}=dragStart.lines.y[i];
          if(Math.abs(t- top)<5){
            // 如果小于五说明接近了// 线要现实的位置
            y = s
            moveY=dragStart.startY-dragStart.startTop +t
            //实现快速和这个元素贴在一起// 获取每一根线if(Math.abs(t= top)<5){// 如果小于五说明接近了y=s;// 线要现实的位置moveY=dragStart.startY-dragStart.startTop+t//实现快速和这个元素贴在一起
               break;
            //找到一根线后就跳出循环
              }
          }
          for(let i=0; i< dragStart.lines.x.length; i++){
            const {left:l,showLeft:s}=dragStart.lines.x[i];
            if(Math.abs(l- left)<5){
              // 如果小于五说明接近了// 线要现实的位置
              x = s
              moveX=dragStart.startX-dragStart.startLeft + l
              //实现快速和这个元素贴在一起// 获取每一根线if(Math.abs(t= top)<5){// 如果小于五说明接近了y=s;// 线要现实的位置moveY=dragStart.startY-dragStart.startTop+t//实现快速和这个元素贴在一起
                 break;
              //找到一根线后就跳出循环
                }
            }
            markLine.x= x
            markLine.y = y 
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
        
        const {width:Bwidth,height:Bheight} = lastSelectblock.value
        dragStart = {
          startX: event.clientX,
          startY: event.clientY,
          startLeft: lastSelectblock.value.left,
          startTop: lastSelectblock.value.top,
          startPos: focusData.value.focus.map(({ top, left }) => ({ top, left })),
          lines:(()=>{
            //获取其他的没选中的以他们的位置作为辅助线
            const {unfocus} = focusData.value
            let lines = {x:[],y:[]}
            unfocus.forEach((block)=>{
              const {left:Aleft,height:Aheight,width:Awidth,top:Atop} = block
              lines.y.push({showTop:Atop,top:Atop})
              lines.y.push({showTop:Atop,top:Atop- Bheight})
              lines.y.push({showTop:Atop + Aheight/2,top:Atop- Aheight/2 - Bheight/2})
              lines.y.push({showTop:Atop + Aheight,top:Atop + Aheight})
              lines.y.push({showTop:Atop + Aheight,top:Atop + Aheight - Bheight})
              lines.x.push({showLeft:Aleft,left:Aleft})
              lines.x.push({showLeft:Aleft + Awidth,left:Aleft + Awidth})
              lines.x.push({showLeft:Aleft + Awidth/2,left:Aleft + Awidth/2 - Bwidth/2})
              lines.x.push({showLeft:Aleft + Awidth,left:Aleft + Awidth - Bwidth})
              lines.x.push({showLeft:Aleft,left:Aleft - Bwidth})
            })
            return lines
          })()
        }
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
      }

    return {mousemove,mousedown,mouseup,markLine}
}



