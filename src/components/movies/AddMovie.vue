<template>
    <div>
        <b-form v-on:submit.prevent="add" class="m-4">
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="title" id="title" placeholder="Movie title">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Synopsis</label>
                <div class="col-sm-10">
                    <textarea class="form-control" v-model="synopsis" id="synopsis"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Release year</label>
                <div class="col-sm-2">
                    <input type="number" maxlength="4" min="1900" :max="(new Date()).getFullYear()" class="form-control" v-model="released" id="released">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Runtime</label>
                <div class="input-group col-sm-3">
                    <input type="number" max="9" class="form-control" v-model="runtime.hours" id="runtime-hours">
                    <div class="input-group-append">
                        <span class="input-group-text">hours</span>
                    </div>
                </div>
                <div class="input-group col-sm-3">
                    <input type="number" max="59" maxlength="2" class="form-control" v-model="runtime.minutes" id="runtime-minutes" v-on:change="fixRuntime()">
                    <div class="input-group-append">
                        <span class="input-group-text">minutes</span>
                    </div>
                </div>
            </div>
            <EditableMovieRating :max="10" :rating.sync="rating"></EditableMovieRating>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Cover image</label>
                <div class="col-sm-10">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <i class="input-group-text material-icons md-18 btn">link</i>
                        </div>
                        <input type="url" class="form-control" v-model="image" id="image">
                    </div>
                    <small id="passwordHelpInline" class="text-muted">
                        Input an image URL
                    </small>
                </div>
            </div>

            <div class="form-group row">
                <b-button type="submit" variant="primary" class="mb-2" v-if="!adding">Add</b-button>
                <b-button variant="primary" class="mb-2" disabled v-if="adding">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Adding...
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    import moviesRepository from '../../moviesRepository'
    import uuidv4 from 'uuid/v4';
    import EditableMovieRating from "../movie/EditableMovieRating";

    export default {
        name: 'AddMovie',
        components: {
            EditableMovieRating
        },
        data: () => {
            return {
                adding: false,
                title: null,
                synopsis: null,
                runtime: {
                    hours: 0,
                    minutes: 0,
                },
                released: null,
                rating: 0,
                image: null,
            };
        },
        methods: {
            fixRuntime() {
              if (this.runtime.minutes > 60) {
                  const hours = Math.floor(this.runtime.minutes / 60);

                  this.runtime.hours = Math.floor(this.runtime.minutes / 60);
                  this.runtime.minutes -= hours * 60;
              }
            },
            add() {
                this.adding = true;

                const runtimeHours = this.runtime.hours && `${this.runtime.hours}h` || '';
                const runtimeMinutes = this.runtime.minutes && `${this.runtime.minutes}m` || '';

                const result = {
                    id: uuidv4(),
                    title: this.title,
                    synopsis: this.synopsis,
                    runtime: `${runtimeHours}${runtimeMinutes}`,
                    rating: parseInt(this.rating),
                    released: this.released,
                    image: this.image,
                };

                setTimeout(() => {
                    moviesRepository.add(result);
                    this.reset();
                }, 1000);
            },
            reset() {
                this.adding = false;
                this.title = null;
                this.synopsis = null;
                this.runtime = {
                    hours: null,
                    minutes: null,
                };
                this.rating = 0;
                this.released = null;
                this.image = null;
            }
        }
    }
</script>