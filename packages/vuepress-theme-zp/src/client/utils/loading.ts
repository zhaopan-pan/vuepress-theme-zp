export const removeLoading = (): void => {
  const loadingDom = document.querySelector<HTMLDivElement>('#loading-wrapper')
  if (!loadingDom) return
  // Cancel the animation if it hasn't started yet
  loadingDom.style.animation = 'none'
  loadingDom.style.opacity = '0'
  setTimeout(() => {
    loadingDom.style.zIndex = '-1'
  }, 500)
}
