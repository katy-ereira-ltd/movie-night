<template>
    <b-form v-on:submit.prevent="save" class="m-4">
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">API Key</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" v-model="apiKey" id="apiKey" placeholder="your API key here">
                <small id="passwordHelpInline" class="text-muted">
                    Subscribe to the <a href="https://rapidapi.com/unogs/api/unogs">uNoGS</a> API and add your key here.
                </small>
            </div>
        </div>

        <div class="form-group row">
            <b-button type="submit" variant="primary" class="mb-2" :disabled="saving">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="saving"></span>
                {{ saving && 'Saving...' || 'Save'}}
            </b-button>
        </div>
    </b-form>
</template>

<script>
    import settingsRepository from '../settingsRepository'

    export default {
        name: 'Settings',
        data() {
            return {
                saving: false,
                apiKey: settingsRepository.get('apiKey')
            };
        },
        methods: {
            save() {
                this.saving = true;

                this.think(1000).then(() => {
                    settingsRepository.set('apiKey', this.apiKey);
                    this.saving = false;
                });
            },
            think(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            }
        }
    }
</script>
