import {computed,ref} from 'vue'
export const  useFoucer = (data,callback) => {
  const selectIndex = ref(-1) //没有选择的元素
  //最后选择的哪一个
  const lastSelectIndex = computed(()=>{
   data.value.blocks[selectIndex.value]
  })
    const cleanBlockFocus = () => {
        data.value.blocks.forEach(item => 
          item.focus = false
        )
      }
      const handleMouseDown = () => {
        cleanBlockFocus()
        electIndex.value = -1
      }
          //实现获取焦点
          const handleMouseown = (e, block,index) => {
            e.preventDefault()
            e.stopPropagation()
            if (e.shiftKey) {
              if(focusData.value.focus.length <= 1){
                block.focus = true
              }else{
                block.focus = !block.focus
              }
            } else {
              // console.log(e.target.dataset.key)
              if (!block.focus) {
                cleanBlockFocus()
                block.focus = true
              }
            }
            selectIndex.value = index
            callback(e)
          }
      const focusData = computed(() => {
        const focus = []
        const unfocus = []
        data.value.blocks.forEach(blocks => (blocks.focus  ? focus  : unfocus).push(blocks))
        return { focus, unfocus }
      })
      return {
        handleMouseown,focusData,handleMouseDown,lastSelectIndex
      }
}