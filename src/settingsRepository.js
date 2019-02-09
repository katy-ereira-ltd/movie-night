const settingsRepository = {
    values: {
        apiKey: '',
    },
    mount() {
        if (localStorage.settings) {
            this.values = JSON.parse(localStorage.settings);
        }
    },
    persist() {
        localStorage.settings = JSON.stringify(this.values);
    },
    get(key) {
        return this.values[key];
    },
    set(key, value) {
        this.values[key] = value;

        this.persist();
    }
};

settingsRepository.mount();

export default settingsRepository;