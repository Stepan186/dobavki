export default {
    methods: {
        can(...abilities) {
            const permissions = this.$store.state.auth.user ? this.$store.state.auth.user.permissions : [];
            return checkAbilities(abilities, permissions);
        },
    },
};

export function checkAbilities(abilities, inArray) {
    const abilitiesArray = abilities.reduce((acc, item) => {
        if (Array.isArray(item)) {
            acc.push(...item);
        } else {
            acc.push(item);
        }
        return acc;
    }, []);

    try {
        return abilitiesArray.every(item => inArray.includes(item));
    } catch (e) {
        return false;
    }
}
