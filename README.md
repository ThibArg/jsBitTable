jsBitTable
==========

A BitTable in JavaScript

Classes: `BitTableArr`, `BitTableStr` and `BitTable`

## Licensing

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

# A Note About Code Style
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
