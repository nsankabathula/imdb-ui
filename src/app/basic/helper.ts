

export class HelperUtils {

    public static range = function* (start = 0, stop, step = 1) {
        const cur = (stop === undefined) ? 0 : start;
        const max = (stop === undefined) ? start : stop;
        for (let i = cur; step < 0 ? i > max : i < max; i += step) {
            yield i;
        }
    };

    public static split = function splitBy(size, list) {
        return list.reduce((acc, curr, i, self) => {
            if (!(i % size)) {
                return [
                    ...acc,
                    self.slice(i, i + size),
                ];
            }
            return acc;
        }, []);
    };

    public static isArrayOfArray(data): boolean {
        if (!Array.isArray(data)) {
            return false;
        } else {
            return !data.some((element) => {
                return Array.isArray(element) === false;
            });
        }

    }

}
