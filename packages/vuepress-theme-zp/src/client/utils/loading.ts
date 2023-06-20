export const removeLoading = (): void => {
  const loadingDom = document.querySelector<HTMLDivElement>('#loading-wrapper')
  if (!loadingDom) return
  loadingDom.style.opacity = '0'
  setTimeout(() => {
    loadingDom.style.zIndex = '-1'
  }, 500)
}
