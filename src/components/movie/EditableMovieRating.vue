<template>
    <div class="form-group row">
        <label class="col-sm-2 col-form-label">Rating</label>
        <div v-if="!this.stars.length" @mouseover="initialiseStars" class="col-sm-10 mt-2">
            <i v-for="i in max" v-bind:key="i + '-empty'" class="material-icons md-18">
                star_border
            </i>
        </div>
        <div v-if="this.stars.length" class="col-sm-10 mt-2">
            <i v-for="star in stars"
               v-bind:key="star.number"
               class="material-icons md-18"
               @mouseover="showStars(star.number)"
               @mouseout="showStars(rating)"
               v-on:click="rate(star.number)"
            >
                {{ star.state }}
            </i>
        </div>
        <input type="hidden" :value="rating">
    </div>
</template>

<script>
    export default {
        name: 'EditableMovieRating',
        props: {
            max: Number,
            rating: Number,
        },
        data() {
            return {
                stars: [],
            }
        },
        watch: {
            rating: function (value) {
                this.showStars(value);
            }
        },
        methods: {
            initialiseStars() {
                this.stars = [];

                for (var i = 1; i <= this.max; i++) {
                    this.stars.push({
                        number: i,
                        state: 'star_border'
                    });
                }
            },
            showStars(number) {
                if (!this.stars.length) {
                    this.initialiseStars();
                }

                this.stars.forEach(star => {
                    star.state = star.number > number ? 'star_border' : 'star';
                });
            },
            rate(value) {
                this.$emit('update:rating', value === this.rating ? 0 : value)
            }
        }
    };
</script>
