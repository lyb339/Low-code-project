//物料区
//映射区域
function createWholeConfig() {
  const componentList = []
  const componentMap = {}
  return {
    componentList,
    componentMap,
    regiter: (component) => {
      componentList.push(component)
      componentMap[component.key] = component
    }
  }
}

export let wholeConfig = createWholeConfig()

wholeConfig.regiter({
  label: '按钮',
  preview: () => <a-button>预览按钮</a-button>,
  render: () => <a-button>渲染按钮</a-button>,
  key: 'button'
})
wholeConfig.regiter({
  label: '文本',
  preview: () => '预览文本',
  render: () => '渲染文本',
  key: 'text'
})
wholeConfig.regiter({
  label: '输入框',
  preview: () => <a-input placeholder="预览输入框" />,
  render: () => <a-input placeholder="渲染输入框" />,
  key: 'input'
})
