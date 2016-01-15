import Sample from './sample';
var sample1 = new Sample(1);
var sample2 = Sample.create(2);
console.log(sample1.get());
console.log(sample2.get());
sample2.set(22);
console.log(sample2.get());