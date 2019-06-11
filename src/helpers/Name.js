export default class Name {
    static titleizeArea(name) {
        return name.split('_').map(str => {
            return str[0].toUpperCase() + str.slice(1)
        }).join(' ')
    }

}