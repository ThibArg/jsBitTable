jsBitTable
==========

A BitTable in JavaScript

Classes: `BitTableArr`, `BitTableStr` and `BitTable`



### Principles
A BitTable is a table of bits. Each bit is set to 0 or 1. Using a bit table can be very useful in several situations. For example (and jsBitTable was developed with this purpose in mind), to keep track of the selected lines in a grid, when this grid can hold hundred, thousands, millions of rows. For each selected row, the BitTable just set the corresponding bit to 1.

There are 2 different implementations:
* `BitTableArr` uses an array of 32-bit integer and the bit-operators of JavaScript
* `BitTableStr` uses a string. Each character of the string is set to `0` or `1`.

Obviously, `BitTableStr` uses much more memory than `BitTableArr`: for n elements in the `BitTable`...
* `BitTableArr` will uses n/8 bytes
* `BitTableStr` will uses n * 2 bytes (remind JavaScript strings are UTF-16)

Note that I'm taking my dreams for reality ;->. The notion of 32-bit integers does not exist in JS which only knows numbers, 8 bytes. So, the memory used is 8 bytes every 32 values. Still much lower than strings (64 bytes each 32 values)

The fact is: I first developed the string kind, for handling only max 1,000 rows. But my testing with millions of rows shows that it was a bit slow. Not that slow, I admit (max some milliseconds for some routines such as countOnValues()), but too slow for me. So, I developped `BitTableArr`, which handles an array of number, 32 values for each number, and using bitwise operators (`&`, `|`, `^` and `~`).

In the end, both classes implement the exact same routines and a generic one, `BitTable handle both (developer selects the type he/she wants).

`BitTableStr` is faster in reading (`isOn()`, `countOnValues()`, ...)  because it uses native APIs such as `charAt()` and `indexOf()`. As JavaScript strings are not mutable (can't be modified: We must create a copy of the string), writting a "bit" is slower in `BitTableStr` than in `BitTableArr`.

*But*, again, we are talking of differences when looping hundred of thousand times (and up to 10 millions in one test case). Which means that a basic use (calls to `set()`, `setRange()`, `isOn()`, ... made not that often) will not lead to perfomance issue for the end user: Use the implementation you prefer. If you know you'll use millions of bits, a `BitTableArr probably a better choice.

### API
* **Introduction**
  * Bit value: true/false
    * Even if, internally, values are sored as 0s or 1s, you use a boolean to set a bit: `true` or `false`.
    * When a value is expected, the parameter is named `inValue`. In all cases:
      * If the parameter is omitted, undefined or `null`, it is set to `false`
      * Else it is set the `true` if it is *truly*, to `false` if it is *falsy*
    * We recommand you explicitely pass a boolean value.
  * Bits are numbered from 0 to (bit count -1). Just like arrays.
  * Routines that expect a start and end parameter (generally named inFirst and inLast) use *inclusive* limits: inLast is part of the call. For example:
    * `setRange(10, 20, true);` sets bit #10 to bit #20 to true: 21 bit modified, not 20
    * The same occurs for routines such as `countOnValues(10, 20);`, which returns 21 if all bit are set to true, not 20.

* **Chain**
  * When it makes sense, routines return the `this` object , which lets you to chain calls such as:
```
var bt = new BitTableArr(3000);
. . .
bt.changeAll(true).setRange(0, 100, false).set(4, true).set(5, true);
```

* **Constructor**
  * `var bt = new BitTableArr(inBitCount)` or `var bt = new BitTableStr(inBitCount)` both create a bittable with `inBitCount` elements, all set to false
  * `inBitCount` is optionnal (0 by default)

* **`reset(inNewCount, inValue)`**
  * Resize the bit table, and change all the values to `inValue`.
  * `inValue` is optionnal (`false` by default)

* **`resize(inNewCount, inValue)`** resizes the bit table:
  * If `inNewCount` < current count, the bittable is just reduced, and reminding elements arte not modified
  * If `inNewCount` > current count, new elements are added and set to `inValue`, which is is optionnal (`false` by default)

* **`addOne(inValue)`**
  * As its name states. `inValue` is optionnal (`false` by default)

* **`getSize()`** returns the count of bits

* **`changeAll(inValue)`** sets all the bits to `inValue` (optionnal, `false` by default)

* **`isOn(inBitNum)`**
  * Returns `true` if the bit number `inBitNum` is set, `false` if it is set to 0
  * Returns false if `inBitNum` is invalid (< 0 or >= count of bit) 

* **`set(inBitNum, inValue)`**
  * Sets bit bit number `inBitNum` to `inValue` (optionnal, `false` by default)
  * Does nothing is if `inBitNum` is invalid (< 0 or >= count of bit) 

* **`setRange(inFirst, inLast, inValue)`**
  * Changes values of bits #`inFirst` to #`inLast`, inclusive.
  * Values are re-aligned:
    * If `inFirst` < 0, it is reset to 0
    * If `inLast` >= count of bit, it is reset to the count of bit
    * `inValue` is optionnal (`false` by default).

* **`setForRows(inRows, inValue)`**
  * `inRows` is an array of row numbers. Each bit #`inRows[n]` is set to `inValue`.
  * `inValue` is optionnal (`false` by default).

* **`toggle(inBitNum, inValue)`**
  * Set bit #`inBitNum` to `true` if it was `false`, ot to `false` if it was `true`
  * Does nothing is if `inBitNum` is invalid (< 0 or >= count of bit) 

* **`countOnValues(inFirst, inLast)`**
  * Returns the count of bits set to `true`.
  * `inFirst` and `inLast` are optionnal:
    * If `inFirst` < 0, it is reset to 0
    * If `inLast` >= count of bit, it is reset to the count of bits - 1

* **`getOnValues(inFirst, inLast)`**
  * Returns an array of bit numbers which are `true` in the BitTable.
  * `inFirst` and `inLast` are optionnal:
    * If `inFirst` < 0, it is reset to 0
    * If `inLast` >= count of bit, it is reset to the count of bits - 1
  * **WARNING**
  If there are a lot bit set to `true`, this routine can take a lot of time to execute and return a big, big array. This may eve fail (say you have dozen of millions of bits, all set to `true`)

* **`some(inFirst, inLast)`**
 * Returns `true` if at least one bit is to `true`
  * `inFirst` and `inLast` are optionnal:
    * If `inFirst` < 0, it is reset to 0
    * If `inLast` >= count of bit, it is reset to the count of bits - 1

* **`toString()`**
  * Returns a string filled with '0' and '1'
  * Note that:
    * This routine will be fast with `BitTableStr` (fast means immediate here), because the routine will just return the internal string.
    * **BUT** with `BitTableArr`, the function can take a lot of time and even fail because of memory if there are millions of bits (no problem with some hundred of thousands.)

* **Generic `BitTable`**, which encapsulate either `BitTableArr` or `BitTableStr`
  * Convenience class
  * Constructor accepts tow arguments, the count of bit and the kind of BitTable to use: 'array' or 'string'. By default, it will be 'array'



### A Note About Code Style
At the time this code was written I did not like to write code with opening `{` on the same line as the declaration. For example:
```
function doIt() {
	...
}
```
Or
```
for(var i = 0; i < max; ++i) {
	...
}
```
Or
```
if(someCondition || otherCondition) {
	. . .
} else {
	. . .
}
```
So, I wrote:
```
function doIt()
{
	...
}

for(var i = 0; i < max; ++i)
{
	...
}

if(someCondition || otherCondition)
{
	. . .
}
else
{
	. . .
}
```
I used to use `{` in the line only for `if` statements that use one single line:
```
if(something) {
	doThat();
} else {
	doThis();
}
```

If you are hysterical about that, I'm really sorry. Even if now (2014-07-16), I don't mind and, even more, I use to put `{` on the same line, I don't think it requests to change the code just for this.



### Licensing

Copyright (C) 2011 by 4D SAS (www.4D.com / www.wakanda.org)

Original author: Thibaud Arguillere. First implementation: july 2011

Source code under the MIT license:

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
