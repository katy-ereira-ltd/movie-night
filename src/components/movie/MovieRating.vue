<template>
    <div class="row">
        <dt class="col-sm-3">Rating</dt>
        <dd class="col-sm-6" >
            <div v-if="rating" v-b-tooltip.hover :title="valueString">
                <i v-for="n in stars.full" v-bind:key="n + '-full-'" class="material-icons md-18">star</i>
                <i v-for="n in stars.half" v-bind:key="n + '-half-'" class="material-icons md-18">star_half</i>
                <i v-for="n in stars.empty" v-bind:key="n + '-none-'" class="material-icons md-18">star_border</i>
            </div>
            <div v-if="!rating" v-b-tooltip.hover title="unknown">
                <i v-for="n in 10" v-bind:key="n + '-unknown-'" class="material-icons md-18">star_border</i>
            </div>
        </dd>
    </div>
</template>

<script>
    export default {
        name: 'MovieRating',
        props: {
            rating: Number,
            max: Number,
        },
        computed: {
            valueString() {
                if (!this.rating) {
                    return 'unknown';
                }

                const max = this.max || 10;

                return `${this.rating}/${max}`;
            },
            stars() {
                const full = Math.floor(this.rating);
                const half = Math.round(this.rating - full);
                const empty = Math.floor((this.max || 10) - full - half);

                return {
                    full,
                    half,
                    empty,
                }
            }
        }
    };
</script>
