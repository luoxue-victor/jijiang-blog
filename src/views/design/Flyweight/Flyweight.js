var sizeof = require('object-sizeof');
// 用来储存 Div
const divStore = [];
// 创建外部 div 类
class CreateOuterDiv {
    constructor() {
        this.width = 100;
        this.height = 100;
    }
}
class CreateInnerDiv {
    constructor() {
        this.color = this.randomColor();
    }
    // 随机颜色
    randomColor() {
        const color = ['red', 'green', 'blue', 'white', 'black'];
        return color[Math.floor(Math.random() * color.length)];
    }
}
// 创建外部 div
const outerDiv = new CreateOuterDiv();
let innerDiv;
const store = [];
let count = 100;
while (count--) {
    // 创建内部 div
    innerDiv = new CreateInnerDiv();
    divStore.push({
        outer: outerDiv,
        innter: innerDiv
    });
    store.push(Object.assign({}, outerDiv, innerDiv));
}
// 验证：100 * innerDiv + outerDiv）= 5690 与上面算的 5800 很接近，可以认为这个方法是准确的
console.log(100 * (sizeof(innerDiv) + sizeof(outerDiv))); // 5690
// 100 * innerDiv + outerDiv = 1638
console.log(100 * sizeof(innerDiv) + sizeof(outerDiv)); // 1638
console.log(sizeof(divStore));
console.log(sizeof(store));
// interface Div {
//   width: number;
//   height: number;
//   color: string;
// }
// const divStore: Div[] = [];
// class CreateDiv {
//   public width = 100;
//   public height = 100;
//   public color = this.randomColor()
//   // 随机颜色
//   private randomColor () {
//     const color = ['red', 'green', 'blue', 'white', 'black'];
//     return color[Math.floor(Math.random() * color.length)];
//   }
// }
// let count = 100;
// while (count--) {
//   const innerDiv = new CreateDiv();
//   divStore.push(innerDiv);
// }
// 折腾了半天，看起来跟原来没什么两样，但是其实已经减少了很大的内存，
// 因为我们多有 divStore 内的对象中 outerDiv 其实只有一个，都是它的引用而已
// 我们的内存占用是 100 * innerDiv + outerDiv
// 而不使用享元模式的空间是 100 * (innerDiv + outerDiv)
