export default {
  mounted(el: any) {
    const loadImage = () => {
      el.classList.add('active')
    }

    const createIntersectionObserver = () => {
      const options = {
        root: null,
        threshold: 1
      }
      const callback = (entries: any[], observer: { unobserve: (arg0: any) => void }) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage()
            observer.unobserve(el)
          }
        })
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(el)
    }

    if (!window['IntersectionObserver']) {
      loadImage()
    } else {
      createIntersectionObserver()
    }
  },
  name: 'lazyLoad'
}
