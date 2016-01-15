export default class Sample {
   constructor(value) {
     this.value = value;
   }
   get() {
     return this.value;
   }
   set(value) {
     this.value = value;
   }
   static create(value) {
     return new Sample(value);
   }
 }