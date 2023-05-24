export const useCopyBtn = (): { initCopyBtn: () => void } => {
  console.log('useCopyBtn')

  const initCopyBtn = (): void => {
    // 给div的class元素前缀是language-的节点添加添加鼠标hover监听事件
    document
      .querySelectorAll("div[class*='language-']")
      .forEach((item: Element) => {
        item.addEventListener('mouseover', () => {
          const hasBtn = item.lastElementChild?.classList.contains('copy-btn')
          const showStyle = `${
            getOldStyle(item)?.replaceAll('visibility:hidden;', '') || ''
          } visibility:inherit;`

          if (hasBtn) {
            item.lastElementChild?.setAttribute('style', showStyle)
          } else {
            const copyBtn = document.createElement('button')
            copyBtn.className = 'copy-btn'
            copyBtn.innerHTML = '复制'
            copyBtn.style.position = 'absolute'
            copyBtn.style.top = '0'
            copyBtn.style.right = '0'
            copyBtn.style.zIndex = '999'
            item.appendChild(copyBtn)
            copyBtn.addEventListener('click', () => {
              console.log('-----------click------------')
              const codeText = item.innerHTML
              console.log(codeText)
              setClipboard(codeText)
            })
          }
        })

        item.addEventListener('mouseout', () => {
          const hiddenStyle = `${
            getOldStyle(item)?.replaceAll('visibility:inherit;', '') || ''
          } visibility:hidden;`
          item.lastElementChild?.setAttribute('style', hiddenStyle)
        })
      })
  }

  return { initCopyBtn }
}

const getOldStyle = (node: Element): string | null => {
  if (node.lastElementChild?.classList.contains('copy-btn')) {
    return node.lastElementChild?.getAttribute('style') || ''
  }
  return ''
}

function setClipboard(text: string): void {
  const data = new ClipboardItem({
    'text/html': text,
  })
  navigator.clipboard.write([data]).then(
    function () {
      /* success */
      console.log('copy-success')
    },
    function () {
      /* failure */
      console.log('copy-fail')
    }
  )
}
