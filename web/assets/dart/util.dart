part of dartris;

class Array2d<T> {
    List<List<T>> array;
    T defaultValue = null;

    Array2d(int width, int height, {T this.defaultValue}) {
        array = new List<List<T>>();
        this.width = width;
        this.height = height;
    }

    operator [](int x) => array[x];

    void set width(int v) {
        while (array.length > v) array.removeLast();
        while (array.length < v) {
            List<T> newList = new List<T>();
            if (array.length > 0) {
                for (int y = 0; y < array.first.length; y++) newList.add(defaultValue);
            }
            array.add(newList);
        }
    }

    int get width => array.length;

    void set height(int v) {
        while (array.first.length > v) {
            for (int x = 0; x < array.length; x++) array[x].removeLast();
        }
        while (array.first.length < v) {
            for (int x = 0; x < array.length; x++) array[x].add(defaultValue);
        }
    }

    int get height => array.first.length;

    String toString() {
        String data = "";
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                data += "|${array.elementAt(x).elementAt(y)}";
            }
            data += "|\n";
        }
        return data;
    }
}

class Util {
    static List<int> codeToList(var bit, var mask, int offset) {
        int target = (bit & mask) >> offset;
        if (target == 0) return [0, 0, 0, 0];
        int value = 1;
        bool latch = false;
        while (value < target) {
            value *= 2;
        }
        String output = "";
        while (value >= 1) {
            if (target - value >= 0) {
                target -= value;
                output += latch ? "|1" : "1";
                latch = true;
            } else if (latch) {
                output += "|0";
            }
            value ~/= 2;
        }
        for (int i = output.length; i < 7; i+= 2) {
            output = "0|" + output;
        }
        return stringListToIntList(output.split("|"));
    }

    static List<int> stringListToIntList(List<String> list) {
        List<int> intList = new List<int>();
        for (int i = 0; i < list.length; i++) {
            intList.add(0);
            var value = int.parse(list[i]);
            assert(value is int);
            intList[i] = value;
        }
        return intList;
    }
}
