export class Average{
    count = 0;
    constructor(count) {
        this.count = count;
        this.data = [count];
    }

    add(value) {
        if (this.data.length >= this.count) {
            this.data.shift();
        }
        this.data.push(value);
    }

    average() {
        let sum = 0;
        for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i];
        }
        return sum / this.data.length;
    }
}
