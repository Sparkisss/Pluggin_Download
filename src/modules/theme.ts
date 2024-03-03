// светдая/темная тема
const btn = document.querySelector('.styleBtn') as HTMLElement
const wrapper = document.querySelector('.wrapper') as HTMLElement

function init(themeStatus: string) {
    wrapper.style.backgroundColor = themeStatus;
    btn.style.backgroundColor = themeStatus;

    if (themeStatus=== '#faebd7') {
        btn.style.color = '#000'
    } else btn.style.color = '#fff'
}

btn?.addEventListener('click', () => {
    if (localStorage.getItem('theme') === '#000') {
        localStorage.setItem('theme', '#faebd7')
        init(localStorage.getItem('theme') || '#faebd7');
    } else {
        localStorage.setItem('theme', '#000')
        init(localStorage.getItem('theme') || '#faebd7');
    }   
})
 init(localStorage.getItem('theme') || '#faebd7');