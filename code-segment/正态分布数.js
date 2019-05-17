function getWeight() {
    //正态分布函数
      function gaussianRandom(start, end) {
        return Math.floor(start + gaussianRand() * (end - start + 1));
       //更偏向于中间的值乘以前后的差，加上前面的值，得到更偏向于中间的最终值
      }
    function gaussianRand() {
      var rand = 0;
      for (var i = 0; i < 6; i += 1) {
        rand += Math.random();
      }
      return rand / 6;
    } // 六个随机数取平均值得一个更偏向于中间的值。
    ////////////////////////////

    let leftWeights = [];
    let rightWeights = [];

    //形成反向的正态分布
    for (let i = 0; i < 10; i++) {
      leftWeights.push(gaussianRandom(0, 2000));
      rightWeights.push(gaussianRandom(0, 2000));
    }

    // 得到多个近似于正态分布的值，然后排序。
    leftWeights = leftWeights.sort((a, b) => {
      return b - a;
    });

    rightWeights = rightWeights.sort((a, b) => {
      return a - b;
    });

    this.weights = leftWeights.concat(rightWeights);
  }