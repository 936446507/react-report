export function scrollToUp() {
  const scrollToptimer = setInterval(function () {
    const top = document.body.scrollTop || document.documentElement.scrollTop
    const speed = top / 4;
    if (top !== 0) {
      document.body.scrollTop = document.documentElement.scrollTop -= speed;
    }
    if (top === 0) {
      clearInterval(scrollToptimer)
    }
  }, 30)
}
