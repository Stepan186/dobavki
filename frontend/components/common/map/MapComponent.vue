<template>
    <div ref="map"
         class="map"
    />
</template>

<script>
/* eslint-disable no-undef */
export default {
    name: 'MapComponent',
    props: {
        coords: {
            type: Array,
            default: null,
        },
        balloonText: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            d_map: null,
            d_placeMark: null,
        };
    },
    watch: {
        coords() {
            this.showPlacemark(this.coords, this.balloonText);
        },
    },
    methods: {
        initMap() {
            this.d_map = new window.ymaps.Map(this.$refs.map, {
                center: this.coords,
                zoom: 15,
                controls: [],
            });
            this.showPlacemark(this.coords, this.balloonText);
        },
        createPlacemark(coords, text) {
            const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                `
                    <div class="balloon">
                        <div>` + text + `</div>
                    </div>
                    `,
            );

            return new ymaps.Placemark(coords, {}, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: false,
                balloonContentLayout: BalloonContentLayout,
            });
        },
        showPlacemark(coords, text) {
            this.d_placeMark = this.createPlacemark(coords, text);
            this.d_map.geoObjects.add(this.d_placeMark);

            this.d_map.setCenter(coords);
        },
    },
    head() {
        return {
            script: [
                {
                    hid: 'stripe',
                    src: 'https://api-maps.yandex.ru/2.1/?apikey=4dc8d814-d9b9-4702-8f72-762542d03619&lang=ru_RU',
                    defer: true,
                    callback: () => {
                        window.ymaps.ready(this.initMap);
                    },
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.map {
    height: 400px;
    width: 100%;

    .balloon {
        .h5 {
            font-size: 18px;
        }

        input {
            padding: 3px 7px;
        }
    }
}
</style>
