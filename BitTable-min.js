BitTableStr=function BitTableStr(inBitsCount)
{var _strLen=0,_str='';function _createString(inSize,inValue)
{var str='';if(inValue)
{for(var i=0;i<inSize;++i)
{str+='1';}}
else
{for(var i=0;i<inSize;++i)
{str+='0';}}
return str;}
function _realignFirstLast(inFirst,inLast)
{if(inFirst<0){inFirst=0;}else if(inFirst>=_strLen){inFirst=_strLen-1;}
if(inLast<0){inLast=0;}else if(inLast>=_strLen){inLast=_strLen-1;}
return{first:inFirst,last:inLast};}
this.reset=function(inNewCount,inValue)
{_strLen=0;_str='';if(arguments.length>0&&typeof inNewCount==='number'&&inNewCount>0)
{_strLen=inNewCount;_str=_createString(_strLen,inValue?true:false);}
return this;}
this.resize=function(inNewCount,inValue)
{var oldLen;inNewCount=inNewCount||0;if(_strLen!==inNewCount)
{oldLen=_strLen;_strLen=inNewCount;if(_strLen===0)
{_str='';}
else if(oldLen>_strLen)
{_str=_str.substring(0,_strLen);}
else
{inValue=inValue||false;if(inValue)
{for(var i=0,max=_strLen-oldLen;i<max;++i)
{_str+='1';}}
else
{for(var i=0,max=_strLen-oldLen;i<max;++i)
{_str+='0';}}}}
return this;}
this.addOne=function(inValue)
{++_strLen;_str+=inValue?'1':'0';return this;}
this.getSize=function()
{return _strLen;}
this.changeAll=function(inValue)
{this.reset(_strLen,inValue);return this;}
this.isOn=function(inBitNum)
{if(_strLen>0&&inBitNum>=0&&inBitNum<_strLen)
{return _str.charAt(inBitNum)!=='0';}
return false;}
this.set=function(inBitNum,inValue)
{if(_strLen>0&&inBitNum>=0&&inBitNum<_strLen)
{_str=_str.substr(0,inBitNum)+(inValue?'1':'0')+_str.substr(inBitNum+1);}
return this;}
this.setRange=function(inFirst,inLast,inValue)
{if(arguments.length>2&&inFirst>-1&&inLast>-1&&inFirst<=inLast)
{if(inLast>=_strLen){inLast=_strLen-1;}
if(inFirst>inLast){inFirst=inLast;}
_str=_str.substr(0,inFirst)+_createString(inLast-inFirst+1,inValue?true:false)+_str.substr(inLast+1);}
return this;}
this.setForRows=function(inArray,inValue)
{if(inValue){inValue=true;}else{inValue:false;}
for(var i=0,max=inArray.length;i<max;++i)
{this.set(inArray[i],inValue);}
return this;}
this.toggle=function(inBitNum)
{if(_strLen>0&&inBitNum>=0&&inBitNum<_strLen)
{var val=_str.charAt(inBitNum);if(val==='0'){_str=_str.substr(0,inBitNum)+'1'+_str.substr(inBitNum+1);}else{_str=_str.substr(0,inBitNum)+'0'+_str.substr(inBitNum+1);}}
return this;}
this.countOnValues=function(inFirst,inLast)
{var count=0,range;switch(arguments.length)
{case 0:inFirst=0;inLast=_strLen-1;break;case 1:inLast=_strLen-1;break;}
range=_realignFirstLast(inFirst,inLast);if(range.first<=range.last){for(var i=range.first;i<=range.last;++i)
{if(_str.charAt(i)!=='0'){++count;}}}
return count;}
this.getOnValues=function(inFirst,inLast)
{var result=[],count=0,range;switch(arguments.length)
{case 0:inFirst=0;inLast=_strLen-1;break;case 1:inLast=_strLen-1;break;}
range=_realignFirstLast(inFirst,inLast);if(range.first<=range.last)
{for(var i=range.first;i<=range.last;++i)
{if(_str.charAt(i)!=='0'){result[count++]=i;}}}
return result;}
this.some=function(inFirst,inLast)
{switch(arguments.length)
{case 0:inFirst=0;inLast=_strLen-1;break;case 1:inLast=_strLen-1;break;}
range=_realignFirstLast(inFirst,inLast);if(range.first<=range.last)
{if(range.first===0&&range.last===(_strLen-1))
{return _str.indexOf('1')>-1;}
else
{for(var i=range.first;i<=range.last;++i)
{if(_str.charAt(i)!=='0'){return true;}}}}
return false;}
this.toString=function()
{return _str;}
this.reset(inBitsCount,false);}

BitTableArr=function BitTableArr(inBitsCount)
{var _bitsCount=0,_array=[],_arraySize=0,_bitsMask=[],_ALL_OFF=0,_ALL_ON=-1;for(var i=0;i<32;++i)
{_bitsMask[i]=parseInt(1<<i);}
function _realignFirstLast(inFirst,inLast)
{if(inFirst<0){inFirst=0;}else if(inFirst>=_bitsCount){inFirst=_bitsCount-1;}
if(inLast<0){inLast=0;}else if(inLast>=_bitsCount){inLast=_bitsCount-1;}
return{first:inFirst,last:inLast};}
function _fillArray(inFirst,inLast,inValue)
{var val=_ALL_OFF
if(inLast>_arraySize){inLast=_arraySize;}
if(inValue){val=_ALL_ON;}
for(var i=inFirst;i<inLast;++i)
{_array[i]=val;}}
function _calculateRanges(inFirst,inLast)
{var result={firstBitStart:null,firstBitEnd:null,arrayStart:null,arrayEnd:null,lastBitStart:null,lastBitEnd:null};if(inLast>=_bitsCount){inLast=_bitsCount-1;}
if(inFirst>inLast){inFirst=inLast;}
if(inFirst===0&&inLast===(_bitsCount-1))
{result.arrayStart=0;result.arrayEnd=_arraySize-1;result.arrayEnd--;if(result.arrayEnd===0)
{result.lastBitStart=32;}
else
{result.lastBitStart=32*(result.arrayEnd+1);}
result.lastBitEnd=inLast;}
else if((inLast-inFirst)<100)
{result.firstBitStart=inFirst;result.firstBitEnd=inLast;}
else
{result.arrayStart=parseInt(inFirst/32);result.arrayEnd=parseInt(inLast/32);if((inFirst%32)>0)
{result.firstBitStart=inFirst;result.firstBitEnd=inFirst;do{++result.firstBitEnd;}while((result.firstBitEnd%32)>0);result.arrayStart++;}
if((inLast%32)>0){result.arrayEnd--;result.lastBitStart=result.firstBitEnd+(result.arrayEnd-result.arrayStart+1)*32;result.lastBitEnd=inLast;}}
return result;}
this.reset=function(inNewCount,inValue)
{var arraySize=0;_bitsCount=0;_arraySize=0;_array=[];if(arguments.length>0&&typeof inNewCount==='number'&&inNewCount>0)
{_bitsCount=inNewCount;_arraySize=parseInt(_bitsCount/32)+1;_fillArray(0,_arraySize,inValue)}
return this;}
this.resize=function(inNewCount,inValue)
{var oldCount,oldSize;inNewCount=inNewCount||0;if(_bitsCount!==inNewCount)
{oldCount=_bitsCount;oldSize=_arraySize;_bitsCount=inNewCount;_arraySize=parseInt(_bitsCount/32)+1;if(_bitsCount===0)
{_array=[];}
else if(oldCount>_bitsCount)
{_array.splice(_arraySize+1);}
else
{_fillArray(oldSize+1,_arraySize,inValue)}}
return this;}
this.addOne=function(inValue)
{var newSize;inValue=inValue||false;_bitsCount++;newSize=parseInt(_bitsCount/32)+1;if(newSize>_arraySize)
{_arraySize=newSize;_array.push(_ALL_OFF);}
this.setValue(_bitsCount,inValue);return this;}
this.getSize=function()
{return _bitsCount;}
this.changeAll=function(inValue)
{_fillArray(0,_arraySize,inValue);return this;}
this.isOn=function(inBitNum)
{var idx,bitNumOn32;if(_bitsCount>0&&inBitNum>=0&&inBitNum<_bitsCount)
{idx=parseInt(inBitNum/32);bitNumOn32=inBitNum%32;return(_array[idx]&_bitsMask[bitNumOn32])!=0;}
return false;}
this.set=function(inBitNum,inValue)
{var idx,bitNumOn32;if(_bitsCount>0&&inBitNum>=0&&inBitNum<_bitsCount)
{idx=parseInt(inBitNum/32);bitNumOn32=inBitNum%32;if(inValue){_array[idx]|=_bitsMask[bitNumOn32];}else{_array[idx]&=~_bitsMask[bitNumOn32];}}
return this;}
this.setRange=function(inFirst,inLast,inValue)
{var idxStart,idxEnd,ranges;if(arguments.length>2&&inFirst>-1&&inLast>-1&&inFirst<=inLast)
{if(inLast>=_bitsCount){inLast=_bitsCount-1;}
if(inFirst>inLast){inFirst=inLast;}
if(inValue){inValue=true;}else{inValue=false;}
if(inFirst===0&&inLast===(_bitsCount-1))
{_fillArray(0,_arraySize,inValue);}
else
{ranges=_calculateRanges(inFirst,inLast);if(ranges.firstBitStart!=null&&ranges.firstBitEnd!=null)
{for(var i=ranges.firstBitStart;i<=ranges.firstBitEnd;++i)
{this.set(i,inValue);}}
if(ranges.arrayStart!=null&&ranges.arrayEnd!=null)
{_fillArray(ranges.arrayStart,ranges.arrayEnd+1,inValue);}
if(ranges.lastBitStart!=null&&ranges.lastBitEnd!=null)
{for(var i=ranges.lastBitStart;i<=ranges.lastBitEnd;++i)
{this.set(i,inValue);}}}}
return this;}
this.setForRows=function(inArray,inValue)
{if(inValue){inValue=true;}else{inValue:false;}
for(var i=0,max=inArray.length;i<max;++i)
{this.set(inArray[i],inValue);}
return this;}
this.toggle=function(inBitNum)
{var idx,bitNumOn32;if(_bitsCount>0&&inBitNum>=0&&inBitNum<_bitsCount)
{idx=parseInt(inBitNum/32);bitNumOn32=inBitNum%32;_array[idx]^=_bitsMask[bitNumOn32];}
return this;}
this.countOnValues=function(inFirst,inLast)
{var count=0,range,el;switch(arguments.length)
{case 0:inFirst=0;inLast=_bitsCount-1;break;case 1:inLast=_bitsCount-1;break;}
range=_realignFirstLast(inFirst,inLast);if(range.first<=range.last)
{ranges=_calculateRanges(range.first,range.last);if(ranges.firstBitStart!=null&&ranges.firstBitEnd!=null)
{for(var i=ranges.firstBitStart;i<=ranges.firstBitEnd;++i)
{if((_array[parseInt(i/32)]&_bitsMask[i%32])!=0){++count;}}}
if(ranges.arrayStart!=null&&ranges.arrayEnd!=null)
{for(var i=ranges.arrayStart;i<=ranges.arrayEnd;++i)
{el=_array[i];switch(el)
{case _ALL_ON:count+=32;break;case _ALL_OFF:break;default:for(var bit=0;bit<32;++bit)
{if((el&_bitsMask[bit])!=0){++count;};}
break;}}}
if(ranges.lastBitStart!=null&&ranges.lastBitEnd!=null)
{for(var i=ranges.lastBitStart;i<=ranges.lastBitEnd;++i)
{if((_array[parseInt(i/32)]&_bitsMask[i%32])!=0){++count;}}}}
return count;}
this.getOnValues=function(inFirst,inLast)
{var result=[],count=0,range,el;switch(arguments.length)
{case 0:inFirst=0;inLast=_bitsCount-1;break;case 1:inLast=_bitsCount-1;break;}
range=_realignFirstLast(inFirst,inLast);if(range.first<=range.last)
{ranges=_calculateRanges(range.first,range.last);if(ranges.firstBitStart!=null&&ranges.firstBitEnd!=null)
{for(var i=ranges.firstBitStart;i<=ranges.firstBitEnd;++i)
{if((_array[parseInt(i/32)]&_bitsMask[i%32])!=0){result.push(count);}
++count;}}
if(ranges.arrayStart!=null&&ranges.arrayEnd!=null)
{for(var i=ranges.arrayStart;i<=ranges.arrayEnd;++i)
{el=_array[i];switch(el)
{case _ALL_ON:for(var bit=0;bit<32;++bit)
{result.push(count);++count;}
break;case _ALL_OFF:count+=32;break;default:for(var bit=0;bit<32;++bit)
{if((el&_bitsMask[bit])!=0){result.push(count);};++count;}
break;}}}
if(ranges.lastBitStart!=null&&ranges.lastBitEnd!=null)
{for(var i=ranges.lastBitStart;i<=ranges.lastBitEnd;++i)
{if((_array[parseInt(i/32)]&_bitsMask[i%32])!=0){result.push(count);}
++count;}}}
return result;}
this.some=function(inFirst,inLast)
{switch(arguments.length)
{case 0:inFirst=0;inLast=_bitsCount-1;break;case 1:inLast=_bitsCount-1;break;}
range=_realignFirstLast(inFirst,inLast);if(range.first<=range.last)
{ranges=_calculateRanges(range.first,range.last);if(ranges.firstBitStart!=null&&ranges.firstBitEnd!=null)
{for(var i=ranges.firstBitStart;i<=ranges.firstBitEnd;++i)
{if((_array[parseInt(i/32)]&_bitsMask[i%32])!=0){return true;}}}
if(ranges.arrayStart!=null&&ranges.arrayEnd!=null)
{for(var i=ranges.arrayStart;i<=ranges.arrayEnd;++i)
{el=_array[i];switch(el)
{case _ALL_ON:return true;break;case _ALL_OFF:count+=32;break;default:for(var bit=0;bit<32;++bit)
{if((el&_bitsMask[bit])!=0){return true;};}
break;}}}
if(ranges.lastBitStart!=null&&ranges.lastBitEnd!=null)
{for(var i=ranges.lastBitStart;i<=ranges.lastBitEnd;++i)
{if((_array[parseInt(i/32)]&_bitsMask[i%32])!=0){return true;}}}}
return false;}
this.toString=function()
{var str='',ranges;for(var i=0;i<_bitsCount;++i)
{if((_array[parseInt(i/32)]&_bitsMask[i%32])!=0){str+='1';}else{str+='0';}}
return str;}
this.reset(inBitsCount);}

BitTable=function BitTable(inSize,inKind)
{var _bt;if(typeof inSize!=='number'){inSize=0;}
if(typeof inKind!=='string'){inKind='array';}
if(inKind==='string')
{_bt=new BitTableStr(0);}
else
{_bt=new BitTableArr(0);}
function _realignParam(inP,inValue)
{if(typeof inP==='undefined'||inP===null)
{return inValue;}
return inP;}
this.reset=function(inNewCount,inValue)
{return _bt.reset(_realignParam(inNewCount,0),_realignParam(inValue,false));}
this.resize=function(inNewCount,inValue)
{return _bt.resize(_realignParam(inNewCount,0),_realignParam(inValue,false));}
this.addOne=function(inValue)
{return _bt.addOne(_realignParam(inValue,false));}
this.getSize=function()
{return _bt.getSize();}
this.changeAll=function(inValue)
{return _bt.changeAll(_realignParam(inValue,false));}
this.isOn=function(inBitNum)
{return _bt.isOn(_realignParam(inBitNum,-1));}
this.set=function(inBitNum,inValue)
{return _bt.set(_realignParam(inBitNum,-1),_realignParam(inValue,true));}
this.setRange=function(inFirst,inLast,inValue)
{return _bt.setRange(_realignParam(inFirst,0),_realignParam(inLast,this.getSize()),_realignParam(inValue,false));}
this.setForRows=function(inArray,inValue)
{return _bt.setForRows(_realignParam(inArray,[]),_realignParam(inValue,false));}
this.toggle=function(inBitNum)
{return _bt.toggle(_realignParam(inBitNum,-1));}
this.countOnValues=function(inFirst,inLast)
{return _bt.countOnValues(_realignParam(inFirst,0),_realignParam(inLast,this.getSize()));}
this.getOnValues=function(inFirst,inLast)
{return _bt.getOnValues(_realignParam(inFirst,0),_realignParam(inLast,this.getSize()));}
this.some=function(inFirst,inLast)
{return _bt.some(_realignParam(inFirst,0),_realignParam(inLast,this.getSize()));}
this.toString=function()
{return _bt.toString();}
this.reset(inSize);}