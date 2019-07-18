// export class UtilCss {
//
//     static isObsoleteCss(date: Date): string {
//         const dateAsDate = new Date(date);
//         if (dateAsDate.getTime() <= Date.now()) {
//             return 'obsolete';
//         } else {
//             const nowPlusOneYear: Date = new Date(Date.now());
//             nowPlusOneYear.setFullYear(nowPlusOneYear.getFullYear() + 1);
//             if (dateAsDate <= nowPlusOneYear) {
//                 return 'obsolete1y';
//             }
//         }
//     }
//
// }

export const utilCss = {

    isObsoleteCss(date: Date): string {
        const dateAsDate = new Date(date);
        if (dateAsDate.getTime() <= Date.now()) {
            return 'obsolete';
        } else {
            const nowPlusOneYear: Date = new Date(Date.now());
            nowPlusOneYear.setFullYear(nowPlusOneYear.getFullYear() + 1);
            if (dateAsDate <= nowPlusOneYear) {
                return 'obsolete1y';
            }
        }
    }

}

export const isObsoleteCss = (date: Date): string => {
    const dateAsDate = new Date(date);
    if (dateAsDate.getTime() <= Date.now()) {
        return 'obsolete';
    } else {
        const nowPlusOneYear: Date = new Date(Date.now());
        nowPlusOneYear.setFullYear(nowPlusOneYear.getFullYear() + 1);
        if (dateAsDate <= nowPlusOneYear) {
            return 'obsolete1y';
        }
    }
};
