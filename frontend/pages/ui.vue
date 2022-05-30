<template>
    <div class="container">
        <section class="section">
            <h1 class="section__title">
                Цвета
            </h1>
            <div class="colors">
                <div v-for="color in ['primary','secondary','light','dark','gray','danger','warning']"
                     :key="color"
                     :class="`colors__item colors__item_${color}`"
                >
                    <div class="colors__circle" />
                </div>
            </div>
        </section>
        <section class="section">
            <h1 class="section__title">
                Типография
            </h1>
            <h1>Заголовок первого уровня как правило представлен всего один раз на странице</h1>
            <h2>Заголовок второго уровня</h2>
            <h3>Заголовок третьего уровня</h3>
            <h4>Заголовок четвертого уровня</h4>
            <h5>Заголовок пятого уровня</h5>
            <p>
                В целом, конечно, начало повседневной работы по формированию позиции однозначно фиксирует необходимость
                существующих финансовых и административных условий. Равным образом, новая модель организационной
                деятельности способствует повышению качества кластеризации усилий! С учётом сложившейся международной
                обстановки, консультация с широким активом обеспечивает широкому кругу (специалистов) участие в
                формировании экспериментов, поражающих по своей масштабности и грандиозности. Противоположная точка
                зрения подразумевает, что представители современных социальных резервов неоднозначны и будут
                обнародованы! Представители современных социальных резервов будут призваны к ответу.
            </p>
            <p>
                Но граница обучения кадров предоставляет широкие возможности для поэтапного и последовательного развития
                общества. Сложно сказать, почему стремящиеся вытеснить традиционное производство, нанотехнологии
                формируют глобальную экономическую сеть и при этом - обнародованы.
            </p>
        </section>
        <section class="section">
            <h1 class="section__title">
                Элементы
            </h1>
            <div class="mb-3">
                <v-button schema="primary"
                          class="mr-3"
                >
                    Кнопка
                </v-button>
                <v-button schema="primary"
                          class="mr-3"
                          :outline="true"
                >
                    Кнопка
                </v-button>
                <v-button schema="light"
                          class="mr-3"
                >
                    Кнопка
                </v-button>
                <v-button schema="light"
                          class="mr-3"
                          :outline="true"
                >
                    Кнопка
                </v-button>
            </div>
            <div class="d-flex mb-3">
                <v-checkbox label="Чекбокс"
                            class="mr-3"
                />
                <v-radio label="Радио"
                         class="mr-3"
                />
                <v-switch label="Переключатель" />
            </div>
            <loading-component class="mb-3" />
            <div class="mb-3">
                <v-button @click.native="d_showModal = true">
                    Открыть модальное окно
                </v-button>
                <v-modal v-if="d_showModal"
                         title="Заголовок"
                         @close="d_showModal = false"
                >
                    <p>
                        В целом, конечно, начало повседневной работы по формированию позиции однозначно фиксирует
                        необходимость существующих финансовых и административных условий. Равным образом, новая модель
                        организационной деятельности способствует повышению качества кластеризации усилий! С учётом
                        сложившейся международной обстановки, консультация с широким активом обеспечивает широкому кругу
                        (специалистов) участие в формировании экспериментов, поражающих по своей масштабности и
                        грандиозности. Противоположная точка зрения подразумевает, что представители современных
                        социальных
                        резервов неоднозначны и будут обнародованы! Представители современных социальных резервов будут
                        призваны к ответу.
                    </p>
                    <p>
                        Но граница обучения кадров предоставляет широкие возможности для поэтапного и последовательного
                        развития общества. Сложно сказать, почему стремящиеся вытеснить традиционное производство,
                        нанотехнологии формируют глобальную экономическую сеть и при этом - обнародованы.
                    </p>
                </v-modal>
            </div>
            <div class="mb-4">
                <v-button @click.native="d_showOverlay = true">
                    Открыть оверлей
                </v-button>
                <v-overlay v-if="d_showOverlay"
                           title="Заголовок"
                           @close="d_showOverlay = false"
                >
                    <p>
                        В целом, конечно, начало повседневной работы по формированию позиции однозначно фиксирует
                        необходимость существующих финансовых и административных условий. Равным образом, новая модель
                        организационной деятельности способствует повышению качества кластеризации усилий! С учётом
                        сложившейся международной обстановки, консультация с широким активом обеспечивает широкому кругу
                        (специалистов) участие в формировании экспериментов, поражающих по своей масштабности и
                        грандиозности. Противоположная точка зрения подразумевает, что представители современных
                        социальных
                        резервов неоднозначны и будут обнародованы! Представители современных социальных резервов будут
                        призваны к ответу.
                    </p>
                    <p>
                        Но граница обучения кадров предоставляет широкие возможности для поэтапного и последовательного
                        развития общества. Сложно сказать, почему стремящиеся вытеснить традиционное производство,
                        нанотехнологии формируют глобальную экономическую сеть и при этом - обнародованы.
                    </p>
                </v-overlay>
            </div>
            <v-tabs :tabs="['Вкладка 1', 'Вкладка 2', 'Вкладка 3']"
                    class="mb-5"
            />
            <tiptap class="mb-3"
                    value="Визуальный редактор текста"
            />
            <v-input v-model="d_input"
                     label="Строка ввода"
                     class="mb-3"
            />
            <v-select v-model="d_selectMultiple"
                      class="mb-3"
                      placeholder="Множественный выбор из списка"
                      :multiple="true"
                      :options="['Один', 'Два', 'Три']"
            />
            <v-select v-model="d_select"
                      class="mb-3"
                      placeholder="Выбор из списка"
                      :options="['Один', 'Два', 'Три']"
            />
            <v-textarea v-model="d_textarea"
                        label="Поле ввода"
                        class="mb-3"
            />
            <div>
                <v-notify schema="primary"
                          class="mb-3"
                >
                    Уведомление
                </v-notify>
                <v-notify schema="error"
                          class="mb-3"
                >
                    Уведомление
                </v-notify>
                <v-notify schema="warning"
                          class="mb-3"
                >
                    Уведомление
                </v-notify>
                <v-notify schema="info"
                          class="mb-3"
                >
                    Уведомление
                </v-notify>
                <v-notify schema="success"
                          class="mb-3"
                >
                    Уведомление
                </v-notify>
                <v-notify :confirm="true"
                          schema="success"
                >
                    Уведомление с подтверждением
                </v-notify>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Ui',
    data() {
        return {
            d_showModal: false,
            d_showOverlay: false,
            d_select: null,
            d_selectMultiple: [],
            d_input: null,
            d_textarea: null,
        };
    },
};
</script>

<style scoped lang="scss">
.section__title {
    font-size: 72px;
    font-weight: 900;
    color: $gray;
}

.colors {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 30px;

    .colors__item {
        display: grid;
        grid-gap: 15px;
        justify-content: center;
        text-align: center;
    }

    .colors__circle {
        width: 100px;
        height: 100px;
        border-radius: 999px;
        border: 1px solid $gray;
    }

    @each $name, $hex in $theme-colors {
        .colors__item_#{$name} {
            &:before {
                content: quote($name);
            }

            &:after {
                content: quote($hex);
            }

            .colors__circle {
                background: $hex;
            }
        }
    }
}
</style>
