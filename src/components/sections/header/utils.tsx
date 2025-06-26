export const toggle = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.toggle('hidden');
        targetElement.classList.toggle('flex');
    }
}

export const hide = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.add('hidden');
    }
}