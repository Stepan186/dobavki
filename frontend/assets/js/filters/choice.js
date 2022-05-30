/**
 * Выбирает склонение числа, соответствующее числу
 * пример использования f_choiceNominative(13, 'точка', 'точки', 'точек')
 * @param {Number} value
 * @param {String} a 1, 21, 31... единица
 * @param {String} b 2, 3, 4, 22... единицы
 * @param {String} c 5, 6, 7, 8, 9... единиц
 * */
export default function(value, a, b, c) {
    if (value >= 20) {
        value = value % 10;
    }
    if (value === 1) {
        return a;
    }
    if (value !== 0 && value < 5) {
        return b;
    }
    return c;
}
