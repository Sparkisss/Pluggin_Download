// светдая/темная тема
const btn = document.querySelector('.styleBtn') as HTMLElement
const wrapper = document.querySelector('.wrapper') as HTMLElement

const lightTheme = '#faebd7';
const darkTheme = '#000';
const defaultTheme = lightTheme;

function init(themeStatus: any) {
    if (wrapper && btn) {
        wrapper.style.backgroundColor = themeStatus;
        btn.style.backgroundColor = themeStatus;
        btn.style.color = themeStatus === lightTheme ? darkTheme : lightTheme;
    }
}

if (btn) {
    btn.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') === darkTheme ? lightTheme : darkTheme;
        localStorage.setItem('theme', currentTheme);
        init(currentTheme);
    });
}

init(localStorage.getItem('theme') || defaultTheme);
