const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    console.log(window.innerHeight);
}
window.addEventListener('resize', appHeight)
appHeight()