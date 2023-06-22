export default {
  mounted(el) {
    const loadImage = () => {
      el.classList.add("active");
    };

    const createIntersectionObserver = () => {
      const options = {
        root: null,
        threshold: 1,
      };
      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(el);
          }
         
        });
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);
    };

    if (!window["IntersectionObserver"]) {
      loadImage();
    } else {
      createIntersectionObserver();
    }
  },
  name: "lazyLoad",
};
