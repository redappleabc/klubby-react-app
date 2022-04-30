const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    console.log(window.innerHeight);
}
window.addEventListener('resize', appHeight)
window.addEventListener('keyboardDidShow', (ev) => {
    appHeight()
});

window.addEventListener('keyboardDidHide', () => {
    appHeight()
});
appHeight()