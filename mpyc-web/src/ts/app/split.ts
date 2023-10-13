
import Split from 'split.js'

export function makeSplitJS(selectors: string[]) {
    var sizesJSON = localStorage.getItem('split-sizes')
    var sizes: number[];
    if (sizesJSON) {
        sizes = JSON.parse(sizesJSON)
    } else {
        sizes = [50, 50] // default sizes
    }

    Split(selectors, {
        sizes: sizes,
        direction: 'vertical',
        gutterSize: 18,
        onDragEnd: function (sizes) {
            localStorage.setItem('split-sizes', JSON.stringify(sizes))
        },
    });
}