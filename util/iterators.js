export function arrayIteratorCreator(data) {
    let counter = 0;
    return {
        getItem() {
            if(counter < data.length) {
                const item = data[counter];
                counter++;
                return {
                    item,
                    isEnded: counter === data.length
                }
            } else {
                return {item: {}, isEnded: true}
            }
        },
        reset() {
            counter = 0;
        }
    }
}