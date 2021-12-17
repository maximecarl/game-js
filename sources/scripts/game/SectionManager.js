class SectionManager {
    static openSection(idSection) {
        document.querySelectorAll('section').forEach(section => {
            if (section.id !== idSection) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        })
    }
}

export { SectionManager };